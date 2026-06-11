import https from 'https';
import { allQuery, getQuery, runQuery } from '../database.js';

const DEFAULT_DAILY_TIME = '08:00';
const LOOKBACK_DAYS = Number(process.env.AGENT_LOOKBACK_DAYS || 7);

let schedulerStarted = false;

function startOfToday() {
  return new Date(new Date().toDateString());
}

function dateOnly(value) {
  if (!value) return null;
  return new Date(value).toISOString().slice(0, 10);
}

function daysFromToday(value) {
  if (!value) return null;
  const today = startOfToday();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Math.ceil((date - today) / (1000 * 60 * 60 * 24));
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || 'Unknown';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function calculateMonitoringSignals(snapshot) {
  const overdueMilestones = snapshot.milestones.filter((milestone) => {
    const days = daysFromToday(milestone.due_date);
    return days !== null && days < 0 && milestone.status !== 'Completed';
  });

  const dueSoonMilestones = snapshot.milestones.filter((milestone) => {
    const days = daysFromToday(milestone.due_date);
    return days !== null && days >= 0 && days <= 7 && milestone.status !== 'Completed';
  });

  const atRiskProjects = snapshot.projects.filter((project) => {
    const status = String(project.status || '').toLowerCase();
    return status.includes('risk') || status.includes('hold') || Number(project.progress || 0) < 25;
  });

  const staleProjects = snapshot.projects.filter((project) => {
    const lastUpdate = snapshot.statusUpdates.find((update) => update.project_id === project.id);
    const updatedDaysAgo = daysFromToday(project.updated_at);
    const statusUpdateDaysAgo = lastUpdate ? daysFromToday(lastUpdate.created_at) : null;
    const staleByProject = updatedDaysAgo !== null && updatedDaysAgo < -LOOKBACK_DAYS;
    const staleByStatus = statusUpdateDaysAgo === null || statusUpdateDaysAgo < -LOOKBACK_DAYS;
    return project.status !== 'Completed' && (staleByProject || staleByStatus);
  });

  const openRisks = snapshot.risks.filter((risk) => String(risk.status || '').toLowerCase() !== 'closed');
  const inactiveTeamMembers = snapshot.teamMembers.filter((member) => member.status !== 'Active');

  return {
    overdueMilestones,
    dueSoonMilestones,
    atRiskProjects,
    staleProjects,
    openRisks,
    inactiveTeamMembers
  };
}

function calculateMetrics(snapshot, signals) {
  const activeProjects = snapshot.projects.filter((project) => project.status !== 'Completed');
  const completedProjects = snapshot.projects.filter((project) => project.status === 'Completed');
  const totalBudget = snapshot.projects.reduce((sum, project) => sum + Number(project.budget || 0), 0);
  const averageProgress = snapshot.projects.length
    ? Math.round(snapshot.projects.reduce((sum, project) => sum + Number(project.progress || 0), 0) / snapshot.projects.length)
    : 0;

  return {
    totals: {
      projects: snapshot.projects.length,
      activeProjects: activeProjects.length,
      completedProjects: completedProjects.length,
      teamMembers: snapshot.teamMembers.length,
      milestones: snapshot.milestones.length,
      statusUpdates: snapshot.statusUpdates.length,
      risks: snapshot.risks.length,
      totalBudget
    },
    health: {
      averageProgress,
      atRiskProjects: signals.atRiskProjects.length,
      staleProjects: signals.staleProjects.length,
      overdueMilestones: signals.overdueMilestones.length,
      dueSoonMilestones: signals.dueSoonMilestones.length,
      openRisks: signals.openRisks.length,
      inactiveTeamMembers: signals.inactiveTeamMembers.length
    },
    distributions: {
      projectStatus: groupBy(snapshot.projects, 'status'),
      milestoneStatus: groupBy(snapshot.milestones, 'status'),
      teamStatus: groupBy(snapshot.teamMembers, 'status'),
      riskSeverity: groupBy(snapshot.risks, 'severity')
    }
  };
}

function fallbackSummary(snapshot, metrics, signals) {
  const lines = [
    `Daily system monitor: ${metrics.totals.projects} projects, ${metrics.totals.activeProjects} active, ${metrics.totals.completedProjects} completed.`,
    `Average progress is ${metrics.health.averageProgress}%. The system has ${metrics.totals.teamMembers} team members, ${metrics.totals.milestones} milestones, ${metrics.totals.statusUpdates} status updates, and ${metrics.totals.risks} logged risks.`
  ];

  if (signals.atRiskProjects.length) {
    lines.push(`Attention: ${signals.atRiskProjects.length} project(s) need review: ${signals.atRiskProjects.map((p) => p.name).join(', ')}.`);
  }

  if (signals.overdueMilestones.length) {
    lines.push(`Overdue milestones: ${signals.overdueMilestones.map((m) => `${m.project_name || 'Project'} - ${m.title}`).join('; ')}.`);
  }

  if (signals.dueSoonMilestones.length) {
    lines.push(`Due in the next 7 days: ${signals.dueSoonMilestones.map((m) => `${m.project_name || 'Project'} - ${m.title} (${dateOnly(m.due_date)})`).join('; ')}.`);
  }

  if (signals.openRisks.length) {
    lines.push(`Open risks: ${signals.openRisks.length}. Highest severities: ${signals.openRisks.slice(0, 5).map((r) => `${r.severity}: ${r.title}`).join('; ')}.`);
  }

  if (signals.staleProjects.length) {
    lines.push(`Projects without recent movement: ${signals.staleProjects.map((p) => p.name).join(', ')}.`);
  }

  if (!signals.atRiskProjects.length && !signals.overdueMilestones.length && !signals.openRisks.length) {
    lines.push('No critical project, milestone, or risk alerts were detected today.');
  }

  return lines.join('\n\n');
}

function requestOpenAIReport(payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_DAILY_AGENT_MODEL;

  if (!apiKey || !model) {
    return Promise.resolve(null);
  }

  const body = JSON.stringify({
    model,
    input: [
      {
        role: 'system',
        content: 'You are Nduna AI company system monitoring agent. Produce a concise daily executive update. Cover projects, team capacity, milestones, risks, stale work, and required actions. Be specific and operational.'
      },
      {
        role: 'user',
        content: JSON.stringify(payload)
      }
    ]
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/responses',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    },
    timeout: 30000
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve(null);
          return;
        }

        try {
          const parsed = JSON.parse(data);
          if (parsed.output_text) {
            resolve(parsed.output_text);
            return;
          }

          const text = parsed.output
            ?.flatMap((item) => item.content || [])
            ?.filter((content) => content.type === 'output_text' || content.text)
            ?.map((content) => content.text)
            ?.join('\n')
            ?.trim();

          resolve(text || null);
        } catch (error) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
    req.write(body);
    req.end();
  });
}

export async function collectSystemSnapshot() {
  const [projects, teamMembers, milestones, statusUpdates, risks] = await Promise.all([
    allQuery('SELECT * FROM projects ORDER BY updated_at DESC'),
    allQuery('SELECT * FROM team_members ORDER BY name'),
    allQuery(`
      SELECT milestones.*, projects.name as project_name
      FROM milestones
      LEFT JOIN projects ON projects.id = milestones.project_id
      ORDER BY due_date ASC
    `),
    allQuery(`
      SELECT status_updates.*, projects.name as project_name
      FROM status_updates
      LEFT JOIN projects ON projects.id = status_updates.project_id
      ORDER BY status_updates.created_at DESC
    `),
    allQuery(`
      SELECT risks.*, projects.name as project_name
      FROM risks
      LEFT JOIN projects ON projects.id = risks.project_id
      ORDER BY risks.created_at DESC
    `)
  ]);

  const snapshot = {
    generatedAt: new Date().toISOString(),
    projects,
    teamMembers,
    milestones,
    statusUpdates,
    risks
  };

  const signals = calculateMonitoringSignals(snapshot);
  const metrics = calculateMetrics(snapshot, signals);

  return { snapshot, metrics, signals };
}

export async function generateDailyReport(options = {}) {
  const { snapshot, metrics, signals } = await collectSystemSnapshot();
  const llmSummary = await requestOpenAIReport({ snapshot, metrics, signals });
  const summary = llmSummary || fallbackSummary(snapshot, metrics, signals);
  const report = {
    generatedAt: snapshot.generatedAt,
    generatedBy: llmSummary ? 'openai' : 'system-fallback',
    summary,
    metrics,
    signals,
    snapshot
  };

  const result = await runQuery(
    `INSERT INTO agent_reports (report_date, generated_by, summary, report_json)
     VALUES (?, ?, ?, ?)`,
    [dateOnly(snapshot.generatedAt), report.generatedBy, summary, JSON.stringify(report)]
  );

  return { id: result.id, ...report, trigger: options.trigger || 'manual' };
}

export async function getLatestReport() {
  const row = await getQuery('SELECT * FROM agent_reports ORDER BY created_at DESC, id DESC LIMIT 1');
  if (!row) return null;
  return {
    ...row,
    report: JSON.parse(row.report_json)
  };
}

export async function getReportHistory(limit = 14) {
  const rows = await allQuery(
    'SELECT id, report_date, generated_by, summary, created_at FROM agent_reports ORDER BY created_at DESC, id DESC LIMIT ?',
    [limit]
  );
  return rows;
}

function millisecondsUntilDailyRun(timeValue) {
  const [hour = 8, minute = 0] = String(timeValue || DEFAULT_DAILY_TIME).split(':').map(Number);
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  return next - now;
}

export function startDailyAgentScheduler() {
  if (schedulerStarted || process.env.ENABLE_DAILY_AGENT !== 'true') {
    return;
  }

  schedulerStarted = true;
  const runAgent = async (trigger) => {
    try {
      const report = await generateDailyReport({ trigger });
      console.log(`Daily monitoring agent generated report ${report.id}`);
    } catch (error) {
      console.error('Daily monitoring agent failed:', error.message);
    }
  };

  if (process.env.AGENT_RUN_ON_STARTUP === 'true') {
    runAgent('startup');
  }

  const scheduleNext = () => {
    setTimeout(async () => {
      await runAgent('schedule');
      setInterval(() => runAgent('schedule'), 24 * 60 * 60 * 1000);
    }, millisecondsUntilDailyRun(process.env.AGENT_DAILY_REPORT_TIME));
  };

  scheduleNext();
}
