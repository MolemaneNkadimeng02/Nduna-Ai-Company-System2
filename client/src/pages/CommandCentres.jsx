import React, { useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiAlertCircle,
  FiBarChart,
  FiBriefcase,
  FiClock,
  FiDatabase,
  FiLayers,
  FiPieChart,
  FiTarget,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi';
import { getProgressReading } from '../utils/projectProgress';
import '../styles/CommandCentre.css';

const API_URL = 'http://localhost:5000/api/projects';
const DUE_SOON_DAYS = 14;

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value || 0)));
}

function daysUntil(dateValue) {
  if (!dateValue) return null;
  const today = new Date();
  const dueDate = new Date(dateValue);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (Number.isNaN(dueDate.getTime())) return null;
  return Math.ceil((dueDate - today) / 86400000);
}

function getTone(value, inverse = false) {
  const healthValue = inverse ? 100 - value : value;
  if (healthValue >= 75) return 'good';
  if (healthValue >= 55) return 'watch';
  return 'risk';
}

function average(projects) {
  if (!projects.length) return 0;
  return projects.reduce((sum, project) => sum + getProgressReading(project).value, 0) / projects.length;
}

function buildProjectFacts(projects) {
  const activeProjects = projects.filter((project) => project.status !== 'Completed');
  const completedProjects = projects.filter((project) => project.status === 'Completed');
  const atRiskProjects = projects.filter((project) => project.status === 'At Risk');
  const dueSoonProjects = activeProjects.filter((project) => {
    const days = daysUntil(project.end_date);
    return days !== null && days >= 0 && days <= DUE_SOON_DAYS;
  });
  const overdueProjects = activeProjects.filter((project) => {
    const days = daysUntil(project.end_date);
    return days !== null && days < 0;
  });
  const urgentProjects = activeProjects
    .map((project) => {
      const days = daysUntil(project.end_date);
      const isAtRisk = project.status === 'At Risk';
      const isDueSoon = days !== null && days >= 0 && days <= DUE_SOON_DAYS;
      const isOverdue = days !== null && days < 0;
      const progressReading = getProgressReading(project);
      const progressGap = 100 - progressReading.value;
      const urgency = (isAtRisk ? 60 : 0) + (isOverdue ? 45 : 0) + (isDueSoon ? 28 : 0) + progressGap;

      return { ...project, progressReading, daysUntilDue: days, isAtRisk, isDueSoon, isOverdue, urgency };
    })
    .filter((project) => project.isAtRisk || project.isDueSoon || project.isOverdue)
    .sort((a, b) => b.urgency - a.urgency)
    .slice(0, 6);

  const teamLeads = new Set(activeProjects.map((project) => project.team_lead).filter(Boolean));
  const avgProgress = average(projects);
  const activeAvgProgress = average(activeProjects);
  const completionRate = projects.length ? (completedProjects.length / projects.length) * 100 : 0;
  const atRiskRate = projects.length ? (atRiskProjects.length / projects.length) * 100 : 0;
  const dueSoonRate = activeProjects.length ? (dueSoonProjects.length / activeProjects.length) * 100 : 0;
  const overdueRate = activeProjects.length ? (overdueProjects.length / activeProjects.length) * 100 : 0;
  const riskIndex = clamp((atRiskRate * 0.45) + (dueSoonRate * 0.25) + (overdueRate * 0.30));
  const portfolioHealth = clamp((avgProgress * 0.55) + (completionRate * 0.25) + ((100 - riskIndex) * 0.20));
  const projectStatus = clamp(activeAvgProgress || avgProgress);
  const financialHealth = clamp(100 - (atRiskRate * 0.65) - (overdueRate * 0.45));
  const tenderProjects = projects.filter((project) => /tender|bid|rfp|proposal/i.test(`${project.name} ${project.service_type} ${project.description}`));

  return {
    activeProjects,
    atRiskProjects,
    dueSoonProjects,
    overdueProjects,
    urgentProjects,
    teamLeadCount: teamLeads.size,
    avgProgress: clamp(avgProgress),
    activeAvgProgress: clamp(activeAvgProgress),
    completionRate: clamp(completionRate),
    atRiskRate: clamp(atRiskRate),
    dueSoonRate: clamp(dueSoonRate),
    overdueRate: clamp(overdueRate),
    riskIndex,
    portfolioHealth,
    projectStatus,
    financialHealth,
    tenderPipeline: tenderProjects.length ? clamp(average(tenderProjects)) : clamp(100 - dueSoonRate - atRiskRate),
    teamProductivity: clamp(activeAvgProgress),
    activityHeat: clamp((activeProjects.length ? 65 : 0) + Math.min(activeProjects.length * 4, 25) - overdueRate),
    activeUsers: clamp(teamLeads.size ? Math.min(100, teamLeads.size * 18) : activeProjects.length ? 50 : 0),
    inactiveUsers: clamp(100 - Math.min(100, teamLeads.size ? teamLeads.size * 18 : activeProjects.length ? 50 : 0)),
    workloadDistribution: clamp(100 - Math.max(0, (activeProjects.length - teamLeads.size) * 10)),
    resourceUtilisation: clamp(activeProjects.length ? 60 + Math.min(activeProjects.length * 5, 30) - atRiskRate : 0)
  };
}

function getDashboards(facts) {
  return [
    {
      name: 'Nathi Shabalala Executive Command Centre',
      purpose: "What requires Nathi's attention today?",
      type: 'executive',
      metrics: [
        { label: 'Portfolio Health', value: facts.portfolioHealth, tone: getTone(facts.portfolioHealth), icon: FiPieChart },
        { label: 'Financial Health', value: facts.financialHealth, tone: getTone(facts.financialHealth), icon: FiTrendingUp },
        { label: 'Project Status', value: facts.projectStatus, tone: getTone(facts.projectStatus), icon: FiTarget },
        { label: 'Tender Pipeline', value: facts.tenderPipeline, tone: getTone(facts.tenderPipeline), icon: FiBriefcase },
        { label: 'Risk Index', value: facts.riskIndex, tone: getTone(facts.riskIndex, true), icon: FiAlertCircle, inverse: true }
      ],
      focus: [
        `${facts.atRiskProjects.length} projects at risk`,
        `${facts.dueSoonProjects.length} due in ${DUE_SOON_DAYS} days`,
        `${facts.overdueProjects.length} overdue`
      ]
    },
    {
      name: 'Team Command Centre',
      purpose: 'How is the organisation performing today?',
      type: 'team',
      metrics: [
        { label: 'Team Productivity', value: facts.teamProductivity, tone: getTone(facts.teamProductivity), icon: FiBarChart },
        { label: 'Activity Heat Maps', value: facts.activityHeat, tone: getTone(facts.activityHeat), icon: FiActivity },
        { label: 'Active Users', value: facts.activeUsers, tone: getTone(facts.activeUsers), icon: FiUsers },
        { label: 'Inactive Users', value: facts.inactiveUsers, tone: getTone(facts.inactiveUsers, true), icon: FiClock, inverse: true },
        { label: 'Workload Distribution', value: facts.workloadDistribution, tone: getTone(facts.workloadDistribution), icon: FiLayers },
        { label: 'Resource Utilisation', value: facts.resourceUtilisation, tone: getTone(facts.resourceUtilisation), icon: FiDatabase }
      ],
      focus: [
        `${facts.teamLeadCount} active team leads`,
        `${facts.activeProjects.length} active projects`,
        `${facts.atRiskRate}% portfolio at risk`
      ]
    }
  ];
}

function dueLabel(project) {
  if (project.daysUntilDue === null) return 'No due date';
  if (project.daysUntilDue < 0) return `${Math.abs(project.daysUntilDue)} days overdue`;
  if (project.daysUntilDue === 0) return 'Due today';
  return `Due in ${project.daysUntilDue} days`;
}

function Needle({ metric }) {
  const Icon = metric.icon;
  const rotation = -90 + (metric.value * 1.8);
  const healthValue = metric.inverse ? 100 - metric.value : metric.value;
  const status = healthValue >= 75 ? 'Stable' : healthValue >= 55 ? 'Watch' : 'Escalate';

  return (
    <div className={`needle-card tone-${metric.tone}`}>
      <div className="needle-title">
        <Icon />
        <span>{metric.label}</span>
      </div>
      <div className="needle-gauge" style={{ '--needle-rotation': `${rotation}deg` }}>
        <span className="needle-pointer" />
        <strong>{metric.value}%</strong>
      </div>
      <div className="needle-footer">
        <span>{status}</span>
        <span>{metric.inverse ? 'lower is better' : 'higher is better'}</span>
      </div>
    </div>
  );
}

export default function CommandCentres() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Unable to load project data');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const facts = useMemo(() => buildProjectFacts(projects), [projects]);
  const dashboards = useMemo(() => getDashboards(facts), [facts]);

  if (loading) {
    return <div className="command-page command-loading">Loading command centre data...</div>;
  }

  return (
    <div className="command-page">
      <section className="command-header">
        <div>
          <span className="command-kicker">Live command centres</span>
          <h1>Command Centre Dashboards</h1>
          <p>
            Dashboard needles now follow the real project percentages, risk status,
            estimated progress where updates are missing, overdue work, and projects due in the next {DUE_SOON_DAYS} days.
          </p>
        </div>
      </section>

      {error && <div className="command-error">{error}</div>}

      <section className="attention-panel">
        <div className="attention-heading">
          <FiAlertCircle />
          <div>
            <h2>Projects Requiring Attention</h2>
            <p>At-risk projects with close or missed due dates are prioritised first.</p>
          </div>
        </div>

        {facts.urgentProjects.length > 0 ? (
          <div className="attention-list">
            {facts.urgentProjects.map((project) => (
              <article
                className={`attention-item ${project.isOverdue || project.isAtRisk ? 'attention-critical' : ''}`}
                key={project.id}
              >
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.client || 'No client listed'} - {project.team_lead || 'No owner assigned'}</p>
                </div>
                <div className="attention-meta">
                  <span>{project.status}</span>
                  <strong>{project.progressReading.label}</strong>
                  <em>{dueLabel(project)}</em>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="attention-empty">No at-risk, overdue, or due-soon projects found.</div>
        )}
      </section>

      <section className="dashboard-stack">
        {dashboards.map((dashboard, index) => (
          <article className={`command-dashboard dashboard-${dashboard.type}`} key={dashboard.name}>
            <div className="dashboard-heading">
              <div>
                <span>Dashboard {index + 1}</span>
                <h2>{dashboard.name}</h2>
                <p>{dashboard.purpose}</p>
              </div>
            </div>

            <div className="needle-grid">
              {dashboard.metrics.map((metric) => (
                <Needle key={metric.label} metric={metric} />
              ))}
            </div>

            <div className="command-focus">
              <h3>Today&apos;s focus</h3>
              <div>
                {dashboard.focus.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
