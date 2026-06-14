import React, { useEffect, useMemo, useState } from 'react';
import {
  FiActivity,
  FiAlertTriangle,
  FiBell,
  FiCheckSquare,
  FiDollarSign,
  FiLock,
  FiMessageSquare,
  FiMic,
  FiPlus,
  FiSend,
  FiShield,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi';
import { getPortfolioFacts } from '../utils/projectProgress';
import '../styles/OperationsSuite.css';

const API_URL = 'http://localhost:5000/api/projects';

const roles = ['Executive', 'Project Manager', 'Team Member', 'Client'];

const permissions = {
  Executive: ['Command dashboards', 'Decision approvals', 'Financial view', 'Board pack'],
  'Project Manager': ['Project updates', 'Risk register', 'Milestones', 'Meetings'],
  'Team Member': ['Assigned actions', 'Progress updates', 'Meeting follow-ups'],
  Client: ['Client portal', 'Project progress', 'Approved milestones']
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function money(value) {
  return Number(value || 0).toLocaleString('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0
  });
}

function Panel({ icon, title, subtitle, children }) {
  return (
    <section className="ops-panel">
      <div className="ops-panel-title">
        {icon}
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="ops-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function OperationsSuite() {
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState('Executive');
  const [updates, setUpdates] = useState([]);
  const [risks, setRisks] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatLog, setChatLog] = useState([
    { from: 'ai', text: 'Ask me what needs attention, which projects are slipping, or to prepare an executive update.' }
  ]);

  const [updateForm, setUpdateForm] = useState({ projectId: '', note: '', blocker: '', nextAction: '', owner: '', dueDate: today() });
  const [riskForm, setRiskForm] = useState({ projectId: '', title: '', severity: 'Medium', probability: 'Medium', impact: 'Medium', mitigation: '', owner: '', status: 'Open' });
  const [decisionForm, setDecisionForm] = useState({ title: '', options: '', recommendation: '', owner: '', status: 'Needed' });
  const [meetingForm, setMeetingForm] = useState({ title: '', attendees: '', decisions: '', actions: '', followUp: today() });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Unable to load operations data:', error);
      }
    }

    fetchProjects();
  }, []);

  const facts = useMemo(() => getPortfolioFacts(projects), [projects]);
  const selectedProject = projects.find((project) => String(project.id) === String(updateForm.projectId)) || projects[0];

  const milestoneColumns = useMemo(() => {
    const enriched = facts.projects;
    return {
      'Not Started': enriched.filter((project) => project.progressReading.value === 0 && project.status !== 'Completed'),
      'In Progress': enriched.filter((project) => project.progressReading.value > 0 && project.progressReading.value < 80),
      Blocked: enriched.filter((project) => ['At Risk', 'Critical'].includes(project.health.label)),
      Done: enriched.filter((project) => project.status === 'Completed')
    };
  }, [facts.projects]);

  const notifications = [
    ...facts.overdue.map((project) => `${project.name} is overdue and needs escalation.`),
    ...facts.dueSoon.map((project) => `${project.name} is ${project.dueLabel.toLowerCase()}.`),
    ...risks.filter((risk) => risk.status === 'Open').map((risk) => `${risk.severity} risk open: ${risk.title}`),
    ...decisions.filter((decision) => decision.status === 'Needed').map((decision) => `Decision needed: ${decision.title}`)
  ].slice(0, 8);

  const activity = [
    ...updates.map((item) => ({ type: 'Update', text: item.note, date: item.createdAt })),
    ...risks.map((item) => ({ type: 'Risk', text: item.title, date: item.createdAt })),
    ...decisions.map((item) => ({ type: 'Decision', text: item.title, date: item.createdAt })),
    ...meetings.map((item) => ({ type: 'Meeting', text: item.title, date: item.createdAt }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  const financialRows = facts.projects.map((project) => {
    const budget = Number(project.budget || 0);
    const estimatedSpend = Math.round(budget * (project.progressReading.value / 100));
    const remaining = Math.max(0, budget - estimatedSpend);
    const marginRisk = project.health.tone === 'critical' ? 'High' : project.health.tone === 'risk' ? 'Medium' : 'Low';

    return { ...project, budget, estimatedSpend, remaining, marginRisk };
  });

  function addUpdate(event) {
    event.preventDefault();
    setUpdates((items) => [{ ...updateForm, id: Date.now(), createdAt: new Date().toISOString(), projectName: selectedProject?.name || 'Project' }, ...items]);
    setUpdateForm({ projectId: '', note: '', blocker: '', nextAction: '', owner: '', dueDate: today() });
  }

  function addRisk(event) {
    event.preventDefault();
    const project = projects.find((item) => String(item.id) === String(riskForm.projectId));
    setRisks((items) => [{ ...riskForm, id: Date.now(), createdAt: new Date().toISOString(), projectName: project?.name || 'Portfolio' }, ...items]);
    setRiskForm({ projectId: '', title: '', severity: 'Medium', probability: 'Medium', impact: 'Medium', mitigation: '', owner: '', status: 'Open' });
  }

  function addDecision(event) {
    event.preventDefault();
    setDecisions((items) => [{ ...decisionForm, id: Date.now(), createdAt: new Date().toISOString() }, ...items]);
    setDecisionForm({ title: '', options: '', recommendation: '', owner: '', status: 'Needed' });
  }

  function addMeeting(event) {
    event.preventDefault();
    setMeetings((items) => [{ ...meetingForm, id: Date.now(), createdAt: new Date().toISOString() }, ...items]);
    setMeetingForm({ title: '', attendees: '', decisions: '', actions: '', followUp: today() });
  }

  function askAi(event) {
    event.preventDefault();
    if (!chatQuestion.trim()) return;

    const q = chatQuestion.toLowerCase();
    let answer = `Portfolio health is ${facts.portfolioHealth}/100. ${facts.attentionQueue.length} items need attention.`;
    if (q.includes('attention') || q.includes('today')) {
      answer = facts.attentionQueue.length
        ? `Today focus: ${facts.attentionQueue.slice(0, 3).map((project) => `${project.name} (${project.health.label}, ${project.dueLabel})`).join('; ')}.`
        : 'Nothing urgent is currently flagged.';
    }
    if (q.includes('slipping') || q.includes('risk')) {
      answer = facts.atRisk.length
        ? `Slipping projects: ${facts.atRisk.map((project) => `${project.name} - ${project.health.reason}`).join('; ')}.`
        : 'No high-risk projects are currently detected.';
    }
    if (q.includes('board')) {
      answer = `Board update: ${facts.projects.length} projects, ${facts.completed.length} completed, ${facts.averageProgress}% average progress, ${facts.overdue.length} overdue, ${facts.dueSoon.length} due soon.`;
    }

    setChatLog((items) => [...items, { from: 'user', text: chatQuestion }, { from: 'ai', text: answer }]);
    setChatQuestion('');
  }

  return (
    <div className="ops-page">
      <header className="ops-header">
        <div>
          <span>Operating system</span>
          <h1>Operations Control Suite</h1>
          <p>Role access, updates, risks, milestones, decisions, meetings, notifications, AI chat, finance, and activity tracking.</p>
        </div>
      </header>

      <Panel icon={<FiLock />} title="Login and Role-Based Access" subtitle="Prototype role view for executive, manager, team, and client access.">
        <div className="role-switcher">
          {roles.map((item) => (
            <button className={role === item ? 'active' : ''} key={item} onClick={() => setRole(item)}>
              <FiUserCheck />
              {item}
            </button>
          ))}
        </div>
        <div className="permission-list">
          {permissions[role].map((item) => <span key={item}>{item}</span>)}
        </div>
      </Panel>

      <div className="ops-grid two">
        <Panel icon={<FiMessageSquare />} title="Real Project Updates" subtitle="Post progress, blockers, next actions, owners, and due dates.">
          <form className="ops-form" onSubmit={addUpdate}>
            <Field label="Project">
              <select value={updateForm.projectId} onChange={(e) => setUpdateForm({ ...updateForm, projectId: e.target.value })}>
                <option value="">Select project</option>
                {projects.map((project) => <option value={project.id} key={project.id}>{project.name}</option>)}
              </select>
            </Field>
            <Field label="Update">
              <textarea required value={updateForm.note} onChange={(e) => setUpdateForm({ ...updateForm, note: e.target.value })} />
            </Field>
            <div className="ops-form-row">
              <Field label="Blocker">
                <input value={updateForm.blocker} onChange={(e) => setUpdateForm({ ...updateForm, blocker: e.target.value })} />
              </Field>
              <Field label="Owner">
                <input value={updateForm.owner} onChange={(e) => setUpdateForm({ ...updateForm, owner: e.target.value })} />
              </Field>
            </div>
            <Field label="Next Action">
              <input value={updateForm.nextAction} onChange={(e) => setUpdateForm({ ...updateForm, nextAction: e.target.value })} />
            </Field>
            <button className="ops-submit"><FiPlus /> Add Update</button>
          </form>
        </Panel>

        <Panel icon={<FiShield />} title="Risk Register" subtitle="Severity, probability, impact, mitigation, owner, and status.">
          <form className="ops-form" onSubmit={addRisk}>
            <Field label="Risk Title">
              <input required value={riskForm.title} onChange={(e) => setRiskForm({ ...riskForm, title: e.target.value })} />
            </Field>
            <Field label="Project">
              <select value={riskForm.projectId} onChange={(e) => setRiskForm({ ...riskForm, projectId: e.target.value })}>
                <option value="">Portfolio risk</option>
                {projects.map((project) => <option value={project.id} key={project.id}>{project.name}</option>)}
              </select>
            </Field>
            <div className="ops-form-row">
              <Field label="Severity">
                <select value={riskForm.severity} onChange={(e) => setRiskForm({ ...riskForm, severity: e.target.value })}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </select>
              </Field>
              <Field label="Owner">
                <input value={riskForm.owner} onChange={(e) => setRiskForm({ ...riskForm, owner: e.target.value })} />
              </Field>
            </div>
            <Field label="Mitigation">
              <textarea value={riskForm.mitigation} onChange={(e) => setRiskForm({ ...riskForm, mitigation: e.target.value })} />
            </Field>
            <button className="ops-submit"><FiPlus /> Add Risk</button>
          </form>
        </Panel>
      </div>

      <Panel icon={<FiCheckSquare />} title="Milestone Board" subtitle="Kanban-style delivery board generated from project progress and health.">
        <div className="milestone-board">
          {Object.entries(milestoneColumns).map(([column, items]) => (
            <div className="milestone-column" key={column}>
              <h3>{column}</h3>
              {items.map((project) => (
                <div className={`milestone-card health-${project.health.tone}`} key={project.id}>
                  <strong>{project.name}</strong>
                  <span>{project.progressReading.label}</span>
                  <small>{project.dueLabel}</small>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Panel>

      <div className="ops-grid two">
        <Panel icon={<FiFlagIcon />} title="Decision Log" subtitle="Decision needed, options, recommendation, owner, and status.">
          <form className="ops-form" onSubmit={addDecision}>
            <Field label="Decision Needed">
              <input required value={decisionForm.title} onChange={(e) => setDecisionForm({ ...decisionForm, title: e.target.value })} />
            </Field>
            <Field label="Options">
              <textarea value={decisionForm.options} onChange={(e) => setDecisionForm({ ...decisionForm, options: e.target.value })} />
            </Field>
            <Field label="Recommendation">
              <input value={decisionForm.recommendation} onChange={(e) => setDecisionForm({ ...decisionForm, recommendation: e.target.value })} />
            </Field>
            <button className="ops-submit"><FiPlus /> Add Decision</button>
          </form>
        </Panel>

        <Panel icon={<FiMic />} title="Meeting Tracker" subtitle="Capture attendees, decisions, actions, and follow-ups.">
          <form className="ops-form" onSubmit={addMeeting}>
            <Field label="Meeting">
              <input required value={meetingForm.title} onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })} />
            </Field>
            <Field label="Attendees">
              <input value={meetingForm.attendees} onChange={(e) => setMeetingForm({ ...meetingForm, attendees: e.target.value })} />
            </Field>
            <Field label="Decisions and Actions">
              <textarea value={`${meetingForm.decisions}${meetingForm.actions ? `\n${meetingForm.actions}` : ''}`} onChange={(e) => setMeetingForm({ ...meetingForm, decisions: e.target.value })} />
            </Field>
            <button className="ops-submit"><FiPlus /> Add Meeting</button>
          </form>
        </Panel>
      </div>

      <div className="ops-grid two">
        <Panel icon={<FiBell />} title="Real Notifications" subtitle="Deadline, stale update, risk, and decision reminders.">
          <div className="ops-list">
            {notifications.map((item) => <div className="ops-list-item" key={item}>{item}</div>)}
            {notifications.length === 0 && <p className="ops-empty">No active notifications.</p>}
          </div>
        </Panel>

        <Panel icon={<FiSend />} title="AI Chat Over Projects" subtitle="Ask operational questions over the current portfolio.">
          <div className="chat-box">
            {chatLog.map((item, index) => <div className={`chat-message ${item.from}`} key={`${item.from}-${index}`}>{item.text}</div>)}
          </div>
          <form className="chat-form" onSubmit={askAi}>
            <input value={chatQuestion} onChange={(e) => setChatQuestion(e.target.value)} placeholder="Ask what needs attention today..." />
            <button><FiSend /></button>
          </form>
        </Panel>
      </div>

      <Panel icon={<FiDollarSign />} title="Financial Dashboard" subtitle="Budget, estimated spend, remaining budget, and margin risk.">
        <div className="finance-table">
          {financialRows.map((row) => (
            <div className="finance-row" key={row.id}>
              <strong>{row.name}</strong>
              <span>Budget {money(row.budget)}</span>
              <span>Spend {money(row.estimatedSpend)}</span>
              <span>Remaining {money(row.remaining)}</span>
              <em>{row.marginRisk} risk</em>
            </div>
          ))}
        </div>
      </Panel>

      <Panel icon={<FiActivity />} title="Live Activity Feed" subtitle="Recent project updates, risks, decisions, and meetings.">
        <div className="activity-feed">
          {activity.map((item, index) => (
            <div className="activity-item" key={`${item.type}-${index}`}>
              <span>{item.type}</span>
              <strong>{item.text}</strong>
              <em>{new Date(item.date).toLocaleString()}</em>
            </div>
          ))}
          {activity.length === 0 && <p className="ops-empty">No activity captured yet.</p>}
        </div>
      </Panel>

    </div>
  );
}

function FiFlagIcon(props) {
  return <FiAlertTriangle {...props} />;
}
