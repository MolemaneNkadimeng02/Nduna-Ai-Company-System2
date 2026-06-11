import React, { useState, useEffect } from 'react';
import { SERVICE_TYPES } from '../data/companyData';
import ProjectCard from '../components/ProjectCard';
import '../styles/Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    status: 'Planning',
    service_type: 'AI Readiness Assessment',
    start_date: '',
    end_date: '',
    progress: 0,
    budget: '',
    team_lead: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        await fetch(`http://localhost:5000/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('http://localhost:5000/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      fetchProjects();
      setShowForm(false);
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        client: '',
        status: 'Planning',
        service_type: 'AI Readiness Assessment',
        start_date: '',
        end_date: '',
        progress: 0,
        budget: '',
        team_lead: ''
      });
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`http://localhost:5000/api/projects/${id}`, {
          method: 'DELETE'
        });
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  return (
    <div className="projects">
      <div className="projects-header">
        <div className="projects-title">
          <h1>AI Integration Projects</h1>
          <p>Track all Nduna AI enterprise solutions and deployments</p>
        </div>
        <button 
          className="btn-create"
          onClick={() => {
            setEditingProject(null);
            setFormData({
              name: '',
              description: '',
              client: '',
              status: 'Planning',
              service_type: 'AI Readiness Assessment',
              start_date: '',
              end_date: '',
              progress: 0,
              budget: '',
              team_lead: ''
            });
            setShowForm(true);
          }}
        >
          + New Project
        </button>
      </div>

      {showForm && (
        <div className="project-form-container">
          <div className="form-overlay" onClick={() => setShowForm(false)}></div>
          <form className="project-form" onSubmit={handleSubmit}>
            <h2>{editingProject ? 'Edit Project' : 'Create New AI Integration Project'}</h2>
            
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="client"
                placeholder="Client / Company"
                value={formData.client}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="description"
              placeholder="Project Description & AI Integration Details"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>

            <div className="form-row">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
                <option value="At Risk">At Risk</option>
              </select>
              <select
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
              >
                <option value="">Select Service Type</option>
                {SERVICE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="number"
                name="progress"
                placeholder="Progress %"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
              />
              <input
                type="number"
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="team_lead"
              placeholder="Assigned Team Lead"
              value={formData.team_lead}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingProject ? 'Update' : 'Create'} Project
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="empty-state">
          <h3>No Projects Yet</h3>
          <p>Create your first AI integration project to get started!</p>
          <p>Track Nduna AI's AI Readiness Assessments, Pilot Programs, and Strategic Advisory engagements.</p>
        </div>
      )}
    </div>
  );
}
