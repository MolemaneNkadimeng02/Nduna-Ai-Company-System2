import React from 'react';
import { getProgressReading, getProjectHealth } from '../utils/projectProgress';
import './ProjectCard.css';

export default function ProjectCard({ project, onEdit, onDelete }) {
  const progressReading = getProgressReading(project);
  const health = getProjectHealth(project);
  const statusColors = {
    'Planning': '#4facfe',
    'In Progress': '#1e90ff',
    'On Hold': '#f093fb',
    'Completed': '#43e97b',
    'At Risk': '#fa709a'
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{project.name}</h3>
        <span 
          className="status-badge" 
          style={{ backgroundColor: statusColors[project.status] || '#1e90ff' }}
        >
          {project.status}
        </span>
      </div>

      <p className="project-client">Client: {project.client}</p>
      <p className="project-description">{project.description}</p>

      <div className={`health-strip health-${health.tone}`}>
        <span>{health.label}</span>
        <strong>{health.score}/100</strong>
        <em>{health.reason}</em>
      </div>

      <div className="project-progress">
        <div className="progress-label">
          <span>Progress</span>
          <span className="progress-value">{progressReading.label}</span>
        </div>
        <div className="progress-bar" aria-label={progressReading.label}>
          <div 
            className="progress-fill" 
            style={{ width: `${progressReading.value}%` }}
          ></div>
        </div>
      </div>

      <div className="project-meta">
        <span className="meta-item">
          <strong>Service:</strong> {project.service_type || 'N/A'}
        </span>
        <span className="meta-item">
          <strong>Lead:</strong> {project.team_lead || 'Unassigned'}
        </span>
      </div>

      <div className="project-actions">
        <button className="btn btn-primary" onClick={() => onEdit(project)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(project.id)}>Delete</button>
      </div>
    </div>
  );
}
