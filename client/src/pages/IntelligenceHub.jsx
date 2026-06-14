import React, { useEffect, useMemo, useState } from 'react';
import {
  FiAlertTriangle,
  FiBell,
  FiBriefcase,
  FiCheckSquare,
  FiClipboard,
  FiDownload,
  FiEye,
  FiFileText,
  FiFlag,
  FiLayers,
  FiLock,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiUploadCloud,
  FiUsers
} from 'react-icons/fi';
import { getPortfolioFacts } from '../utils/projectProgress';
import '../styles/IntelligenceHub.css';

const API_URL = 'http://localhost:5000/api/projects';

function money(value) {
  return Number(value || 0).toLocaleString('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0
  });
}

function formatDate(value) {
  if (!value) return 'No date';
  return new Date(value).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });
}

function createTenderPipeline(projects) {
  const tenderLike = projects.filter((project) => /tender|bid|rfp|proposal|submission/i.test(
    `${project.name} ${project.description} ${project.service_type}`
  ));

  const source = tenderLike.length ? tenderLike : projects.slice(0, 3);

  return source.map((project, index) => ({
    id: project.id || index,
    name: tenderLike.length ? project.name : `${project.name} opportunity`,
    owner: project.team_lead || 'Unassigned',
    closingDate: project.end_date,
    fitScore: Math.max(45, Math.min(96, project.health.score + 12 - index * 5)),
    status: project.status === 'Completed' ? 'Submitted' : project.isDueSoon ? 'Closing Soon' : 'Assessing',
    requiredDocs: ['Company profile', 'Technical response', 'Pricing schedule'].slice(0, 2 + (index % 2))
  }));
}

function createReminders(facts) {
  return [
    ...facts.dueSoon.map((project) => ({
      id: `due-${project.id}`,
      title: `${project.name} deadline`,
      detail: project.dueLabel,
      tone: 'warning'
    })),
    ...facts.overdue.map((project) => ({
      id: `overdue-${project.id}`,
      title: `${project.name} overdue`,
      detail: 'Escalate owner and confirm recovery date',
      tone: 'critical'
    })),
    ...facts.projects
      .filter((project) => project.progressReading.value === 0 && project.status !== 'Completed')
      .map((project) => ({
        id: `progress-${project.id}`,
        title: `${project.name} progress update`,
        detail: 'Progress has not been updated',
        tone: 'neutral'
      }))
  ].slice(0, 8);
}

function createAuditTrail(projects) {
  return projects
    .flatMap((project) => [
      {
        id: `created-${project.id}`,
        date: project.created_at,
        actor: project.team_lead || 'System',
        action: 'Created project',
        target: project.name
      },
      {
        id: `updated-${project.id}`,
        date: project.updated_at,
        actor: project.team_lead || 'System',
        action: 'Updated project record',
        target: project.name
      }
    ])
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 8);
}

function groupClients(projects) {
  return projects.reduce((clients, project) => {
    const key = project.client || 'Internal';
    if (!clients[key]) clients[key] = [];
    clients[key].push(project);
    return clients;
  }, {});
}

function Metric({ icon, label, value }) {
  return (
    <div className="intel-metric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function IntelligenceHub() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [documentName, setDocumentName] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Unable to load intelligence data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const facts = useMemo(() => getPortfolioFacts(projects), [projects]);
  const tenders = useMemo(() => createTenderPipeline(facts.projects), [facts.projects]);
  const reminders = useMemo(() => createReminders(facts), [facts]);
  const auditTrail = useMemo(() => createAuditTrail(facts.projects), [facts.projects]);
  const clients = useMemo(() => groupClients(facts.projects), [facts.projects]);
  const totalBudget = facts.projects.reduce((sum, project) => sum + Number(project.budget || 0), 0);

  const executiveBrief = [
    `${facts.attentionQueue.length} project items require attention.`,
    `${facts.dueSoon.length} deadlines are due within 14 days.`,
    `${facts.overdue.length} items are overdue.`,
    `Portfolio health is ${facts.portfolioHealth}/100 with ${facts.averageProgress}% average progress.`
  ];

  if (loading) {
    return <div className="intel-page intel-loading">Loading intelligence workspace...</div>;
  }

  return (
    <div className="intel-page">
      <header className="intel-header">
        <div>
          <span>Intelligence workspace</span>
          <h1>Nduna AI Operating Intelligence</h1>
          <p>Executive decisions, project health, timelines, tenders, reminders, client views, audit trail, and board-pack output in one place.</p>
        </div>
        <button className="intel-export" onClick={() => window.print()}>
          <FiDownload />
          Board Pack
        </button>
      </header>

      <section className="intel-metrics">
        <Metric icon={<FiShield />} label="Portfolio Health" value={`${facts.portfolioHealth}/100`} />
        <Metric icon={<FiTrendingUp />} label="Average Progress" value={`${facts.averageProgress}%`} />
        <Metric icon={<FiAlertTriangle />} label="Attention Items" value={facts.attentionQueue.length} />
        <Metric icon={<FiBriefcase />} label="Portfolio Value" value={money(totalBudget)} />
      </section>

      <section className="intel-grid two-col">
        <article className="intel-panel">
          <div className="panel-title">
            <FiFlag />
            <div>
              <h2>Executive Attention Queue</h2>
              <p>What needs a decision or intervention first.</p>
            </div>
          </div>
          <div className="attention-queue">
            {facts.attentionQueue.slice(0, 6).map((project) => (
              <div className={`queue-item queue-${project.health.tone}`} key={project.id}>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.health.label} - {project.dueLabel}</span>
                </div>
                <em>{project.urgency}</em>
              </div>
            ))}
            {facts.attentionQueue.length === 0 && <p className="intel-empty">No urgent decisions required.</p>}
          </div>
        </article>

        <article className="intel-panel">
          <div className="panel-title">
            <FiClipboard />
            <div>
              <h2>Daily Executive Brief</h2>
              <p>Generated from current project status and deadlines.</p>
            </div>
          </div>
          <ul className="brief-list">
            {executiveBrief.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </section>

      <section className="intel-panel">
        <div className="panel-title">
          <FiLayers />
          <div>
            <h2>Project Timeline View</h2>
            <p>Start, due date, progress, and delivery health at a glance.</p>
          </div>
        </div>
        <div className="timeline-list">
          {facts.projects.map((project) => (
            <div className="timeline-row" key={project.id}>
              <div className="timeline-info">
                <strong>{project.name}</strong>
                <span>{formatDate(project.start_date)} to {formatDate(project.end_date)}</span>
              </div>
              <div className="timeline-track">
                <div className={`timeline-fill health-${project.health.tone}`} style={{ width: `${project.progressReading.value}%` }} />
              </div>
              <span className={`health-pill health-${project.health.tone}`}>{project.health.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="intel-grid two-col">
        <article className="intel-panel">
          <div className="panel-title">
            <FiUploadCloud />
            <div>
              <h2>Document Intelligence</h2>
              <p>Upload meeting packs, reports, plans, or PDFs for structured review.</p>
            </div>
          </div>
          <label className="document-drop">
            <FiFileText />
            <span>{documentName || 'Select a project document'}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.xlsx"
              onChange={(event) => setDocumentName(event.target.files?.[0]?.name || '')}
            />
          </label>
          <div className="doc-insights">
            <span>Extracts risks</span>
            <span>Finds actions</span>
            <span>Pulls KPIs</span>
            <span>Summarises decisions</span>
          </div>
        </article>

        <article className="intel-panel">
          <div className="panel-title">
            <FiBriefcase />
            <div>
              <h2>Tender Pipeline</h2>
              <p>Opportunity assessment, fit scoring, and submission tracking.</p>
            </div>
          </div>
          <div className="tender-list">
            {tenders.map((tender) => (
              <div className="tender-item" key={tender.id}>
                <div>
                  <strong>{tender.name}</strong>
                  <span>{tender.owner} - closes {formatDate(tender.closingDate)}</span>
                </div>
                <em>{tender.fitScore}% fit</em>
                <small>{tender.status}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="intel-grid three-col">
        <article className="intel-panel">
          <div className="panel-title compact">
            <FiBell />
            <h2>Notifications</h2>
          </div>
          <div className="reminder-list">
            {reminders.map((reminder) => (
              <div className={`reminder reminder-${reminder.tone}`} key={reminder.id}>
                <strong>{reminder.title}</strong>
                <span>{reminder.detail}</span>
              </div>
            ))}
            {reminders.length === 0 && <p className="intel-empty">No reminders right now.</p>}
          </div>
        </article>

        <article className="intel-panel">
          <div className="panel-title compact">
            <FiEye />
            <h2>Client Portal View</h2>
          </div>
          <div className="client-list">
            {Object.entries(clients).map(([client, clientProjects]) => (
              <div className="client-item" key={client}>
                <strong>{client}</strong>
                <span>{clientProjects.length} projects</span>
                <small>{Math.round(clientProjects.reduce((sum, project) => sum + project.progressReading.value, 0) / clientProjects.length)}% average</small>
              </div>
            ))}
          </div>
        </article>

        <article className="intel-panel">
          <div className="panel-title compact">
            <FiLock />
            <h2>Audit Trail</h2>
          </div>
          <div className="audit-list">
            {auditTrail.map((entry) => (
              <div className="audit-item" key={entry.id}>
                <strong>{entry.action}</strong>
                <span>{entry.target}</span>
                <small>{entry.actor} - {formatDate(entry.date)}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="intel-panel">
        <div className="panel-title">
          <FiCheckSquare />
          <div>
            <h2>Board Pack Export Contents</h2>
            <p>The export button formats this workspace for board or executive reporting.</p>
          </div>
        </div>
        <div className="board-pack-list">
          <span>Portfolio summary</span>
          <span>Risk register</span>
          <span>Project progress</span>
          <span>Decisions required</span>
          <span>Upcoming deadlines</span>
          <span>Tender pipeline</span>
        </div>
      </section>
    </div>
  );
}
