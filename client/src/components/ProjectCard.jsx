import React from 'react';
import './ProjectCard.css';

export default function ProjectCard({ project, onEdit, onDelete }) {
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

      <div className="project-progress">
        <div className="progress-label">
          <span>Progress</span>
          <span className="progress-value">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${project.progress}%` }}
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
