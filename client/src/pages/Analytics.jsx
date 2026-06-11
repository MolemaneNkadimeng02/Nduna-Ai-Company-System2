import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COMPANY_STATS } from '../data/companyData';
import '../styles/Analytics.css';

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const projects = await response.json();
      
      // Calculate project status distribution
      const statusCounts = {};
      projects.forEach(project => {
        statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
      });

      const statusData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status,
        value: count
      }));

      setStats({
        projects,
        statusData: statusData.length > 0 ? statusData : [{ name: 'No data', value: 1 }],
        total: projects.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  const COLORS = ['#1e90ff', '#0b5ed7', '#43e97b', '#f093fb', '#fa709a'];

  // Sample data for progress over time
  const progressData = [
    { month: 'Jan', completed: 2, inProgress: 1, planning: 1 },
    { month: 'Feb', completed: 3, inProgress: 2, planning: 1 },
    { month: 'Mar', completed: 4, inProgress: 3, planning: 2 },
    { month: 'Apr', completed: 6, inProgress: 2, planning: 1 },
    { month: 'May', completed: 8, inProgress: 3, planning: 1 },
    { month: 'Jun', completed: 10, inProgress: 1, planning: 0 }
  ];

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Project Analytics & Performance Metrics</h1>
        <p>Nduna AI Enterprise Integration Platform Performance Dashboard</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🚀</div>
          <div className="metric-content">
            <div className="metric-label">Total AI Integrations</div>
            <div className="metric-value">{COMPANY_STATS.integrations}</div>
            <div className="metric-subtitle">Delivered across enterprise clients</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-label">Active Clients</div>
            <div className="metric-value">{COMPANY_STATS.clients}</div>
            <div className="metric-subtitle">Enterprise organizations</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👨‍💼</div>
          <div className="metric-content">
            <div className="metric-label">Specialists</div>
            <div className="metric-value">{COMPANY_STATS.specialists}</div>
            <div className="metric-subtitle">Certified AI experts</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-label">Success Rate</div>
            <div className="metric-value">{COMPANY_STATS.successRate}</div>
            <div className="metric-subtitle">Project completion success</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <h2>Project Status Distribution</h2>
        <div className="charts-grid">
          <div className="chart-container">
            <h3>Status Breakdown</h3>
            {stats.statusData && stats.statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No project data available</div>
            )}
          </div>

          <div className="chart-container">
            <h3>Project Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Assessment', value: 8 },
                  { name: 'Pilot', value: 6 },
                  { name: 'Advisory', value: 16 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1e90ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <h2>Implementation Timeline</h2>
        <div className="chart-container full-width">
          <h3>Project Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#43e97b" 
                name="Completed"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="inProgress" 
                stroke="#f093fb" 
                name="In Progress"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="planning" 
                stroke="#fa709a" 
                name="Planning"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights-section">
        <h2>Key Performance Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🎯 Success Metrics</h3>
            <ul>
              <li><strong>Success Rate:</strong> {COMPANY_STATS.successRate}</li>
              <li><strong>Active Projects:</strong> {stats.total}</li>
              <li><strong>Client Satisfaction:</strong> 4.8/5 rating</li>
            </ul>
          </div>

          <div className="insight-card">
            <h3>📈 Growth Trends</h3>
            <ul>
              <li><strong>YoY Growth:</strong> +150%</li>
              <li><strong>New Clients:</strong> 5+ per quarter</li>
              <li><strong>Market Penetration:</strong> Enterprise segment</li>
            </ul>
          </div>

          <div className="insight-card">
            <h3>🏆 Achievements</h3>
            <ul>
              <li><strong>Integrations Delivered:</strong> {COMPANY_STATS.integrations}</li>
              <li><strong>Team Size:</strong> {COMPANY_STATS.specialists}+ specialists</li>
              <li><strong>Industry Recognition:</strong> Leading AI integrator</li>
            </ul>
          </div>

          <div className="insight-card">
            <h3>⚡ Operational Excellence</h3>
            <ul>
              <li><strong>Avg Duration:</strong> 4.5 months per project</li>
              <li><strong>Team Utilization:</strong> 92%</li>
              <li><strong>Risk Mitigation:</strong> Structured methodology</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="company-summary">
        <h2>Nduna AI - Enterprise AI Integration Excellence</h2>
        <p>
          Nduna AI delivers outcomes-based AI integration solutions to enterprise organizations. 
          Our certified specialists bring strategic leadership, technical expertise, and commitment 
          to security and compliance to every engagement. We focus on measurable business value and 
          risk mitigation across all AI implementations.
        </p>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-number">{COMPANY_STATS.integrations}</span>
            <span className="stat-label">AI Solutions Integrated</span>
          </div>
          <div className="stat">
            <span className="stat-number">{COMPANY_STATS.clients}</span>
            <span className="stat-label">Enterprise Clients</span>
          </div>
          <div className="stat">
            <span className="stat-number">{COMPANY_STATS.specialists}</span>
            <span className="stat-label">Certified Specialists</span>
          </div>
          <div className="stat">
            <span className="stat-number">{COMPANY_STATS.successRate}</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
