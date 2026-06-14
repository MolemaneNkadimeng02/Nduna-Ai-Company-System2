import React, { useState, useEffect } from 'react';
import { StatsCard, ProjectStatusChart, ProgressChart, TrendChart } from '../components/Charts';
import { getProgressReading } from '../utils/projectProgress';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, projectsRes] = await Promise.all([
        fetch('http://localhost:5000/api/projects/stats'),
        fetch('http://localhost:5000/api/projects')
      ]);
      
      const statsData = await statsRes.json();
      const projectsData = await projectsRes.json();
      
      setStats(statsData);
      setProjects(projectsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  const statusData = stats?.byStatus?.map(s => ({
    name: s.status,
    value: s.count
  })) || [];

  const progressData = projects.map(project => ({
    name: project.name.substring(0, 15),
    progress: getProgressReading(project).value
  })).slice(0, 5) || [];

  const averageProgress = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + getProgressReading(project).value, 0) / projects.length)
    : 0;

  const trendData = [
    { month: 'Jan', completed: 2, active: 3 },
    { month: 'Feb', completed: 3, active: 4 },
    { month: 'Mar', completed: 5, active: 5 },
    { month: 'Apr', completed: 7, active: 6 },
    { month: 'May', completed: 10, active: 8 }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1>Enterprise AI Integration Platform</h1>
          <p>Monitor and track AI solution deployments for enterprise clients</p>
          <p className="hero-subtitle">Nduna AI - Outcomes-based AI solutions provider</p>
        </div>
      </div>

      <div className="company-stats">
        <div className="stat-card">
          <div className="stat-number">30+</div>
          <div className="stat-label">AI Integrations Delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">10+</div>
          <div className="stat-label">Enterprise Clients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5+</div>
          <div className="stat-label">Certified AI Specialists</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Enterprise-Grade Security</div>
        </div>
      </div>

      <div className="dashboard-header">
        <h2>Project Monitoring Dashboard</h2>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Projects"
          value={stats?.total || 0}
          icon="📊"
          color="#1e90ff"
          trend={5}
        />
        <StatsCard
          title="Active Projects"
          value={projects.filter(p => p.status === 'In Progress').length}
          icon="🚀"
          color="#0b5ed7"
          trend={12}
        />
        <StatsCard
          title="Completed"
          value={projects.filter(p => p.status === 'Completed').length}
          icon="✅"
          color="#43e97b"
          trend={8}
        />
        <StatsCard
          title="Average Progress"
          value={`${averageProgress}%`}
          icon="📈"
          color="#f093fb"
        />
      </div>

      <div className="charts-grid">
        {statusData.length > 0 && <ProjectStatusChart data={statusData} />}
        {progressData.length > 0 && <ProgressChart data={progressData} />}
        <TrendChart data={trendData} />
      </div>

      <div className="dashboard-section">
        <h2>Recent Projects</h2>
        <div className="recent-projects">
          {projects.slice(0, 5).map(project => {
            const progressReading = getProgressReading(project);

            return (
              <div key={project.id} className="recent-project-item">
                <div className="item-header">
                  <h3>{project.name}</h3>
                  <span className="status">{project.status}</span>
                </div>
                <p>{project.client}</p>
                <div className="item-progress">
                  <div className="progress-bar-small" aria-label={progressReading.label}>
                    <div style={{ width: `${progressReading.value}%` }} className="progress-fill-small"></div>
                  </div>
                  <span>{progressReading.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="company-info">
        <h2>About Nduna AI</h2>
        <div className="company-description">
          <p><strong>Outcomes-based AI integration for enterprise organizations</strong></p>
          <p>Nduna AI specializes in helping enterprises deploy AI that delivers measurable business value. Based in Johannesburg, Gauteng, we prioritize structured delivery, security compliance, and seamless integration over technology for its own sake.</p>
          
          <div className="company-highlights">
            <div className="highlight">
              <h4>Our Approach</h4>
              <ul>
                <li>Assess AI readiness and capabilities</li>
                <li>Pilot solutions with defined metrics</li>
                <li>Integrate with existing systems</li>
                <li>Minimize implementation risk</li>
              </ul>
            </div>
            <div className="highlight">
              <h4>Partnerships</h4>
              <ul>
                <li>University of Johannesburg - Research validation</li>
                <li>Google Cloud - Enterprise infrastructure</li>
                <li>Security compliance standards</li>
                <li>Enterprise-grade solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
