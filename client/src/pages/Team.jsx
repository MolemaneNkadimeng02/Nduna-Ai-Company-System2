import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS_DATA } from '../data/companyData';
import '../styles/Team.css';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    expertise: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/team');
      const data = await response.json();
      // Use company team data if API returns empty
      if (data && data.length > 0) {
        setTeamMembers(data);
      } else {
        setTeamMembers(TEAM_MEMBERS_DATA);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Load default Nduna AI team if API fails
      setTeamMembers(TEAM_MEMBERS_DATA);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await fetch('http://localhost:5000/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      fetchTeamMembers();
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        role: '',
        expertise: '',
        status: 'Active'
      });
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await fetch(`http://localhost:5000/api/team/${id}`, {
          method: 'DELETE'
        });
        fetchTeamMembers();
      } catch (error) {
        console.error('Error deleting team member:', error);
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
    return <div className="team-loading">Loading team members...</div>;
  }

  const roles = [
    'Founder & CEO',
    'Senior AI Integration Specialist',
    'AI Solutions Engineer',
    'AI Ethical Engineer & Security Lead',
    'Project Manager',
    'Technical Lead',
    'Developer'
  ];

  return (
    <div className="team">
      <div className="team-header">
        <div className="team-title">
          <h1>Nduna AI Team</h1>
          <p>Certified AI integration specialists focused on enterprise outcomes</p>
        </div>
        <button 
          className="btn-add"
          onClick={() => setShowForm(true)}
        >
          + Add Team Member
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-overlay" onClick={() => setShowForm(false)}></div>
          <form className="team-form" onSubmit={handleSubmit}>
            <h2>Add Team Member</h2>
            
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <input
              type="text"
              name="expertise"
              placeholder="Area of Expertise"
              value={formData.expertise}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="form-actions">
              <button type="submit" className="btn-submit">Add Member</button>
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

      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-card">
            <div className="member-avatar">{member.name.charAt(0)}</div>
            <h3>{member.name}</h3>
            <p className="member-role">{member.role}</p>
            <p className="member-email">{member.email}</p>
            {member.expertise && <p className="member-expertise">{member.expertise}</p>}
            {member.bio && <p className="member-bio">{member.bio}</p>}
            <p className={`member-status ${member.status.toLowerCase().replace(' ', '-')}`}>
              {member.status}
            </p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(member.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="team-info">
        <h2>About Our Team</h2>
        <p>Nduna AI brings together certified AI specialists with extensive experience in enterprise integration. Our team combines strategic leadership, technical expertise, and commitment to security and compliance.</p>
        <div className="team-values">
          <div className="value-item">
            <h4>🎯 Outcomes-Focused</h4>
            <p>Every project prioritizes measurable business value and strategic alignment</p>
          </div>
          <div className="value-item">
            <h4>🔒 Security & Compliance</h4>
            <p>Enterprise-grade security standards built into every implementation</p>
          </div>
          <div className="value-item">
            <h4>🚀 Innovation</h4>
            <p>Leveraging latest AI technologies with proven methodologies</p>
          </div>
          <div className="value-item">
            <h4>📊 Risk Management</h4>
            <p>Structured delivery approach that minimizes implementation risk</p>
          </div>
        </div>
      </div>

      {teamMembers.length === 0 && (
        <div className="empty-state">
          <p>No team members added yet. Add your first team member!</p>
        </div>
      )}
    </div>
  );
}
