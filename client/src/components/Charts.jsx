import React from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './StatsCard.css';

export function StatsCard({ title, value, icon, color, trend }) {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ color }}>{icon}</div>
      <div className="stats-content">
        <p className="stats-title">{title}</p>
        <p className="stats-value">{value}</p>
        {trend && <span className={`trend ${trend > 0 ? 'positive' : 'negative'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>}
      </div>
    </div>
  );
}

export function ProjectStatusChart({ data }) {
  const COLORS = ['#1e90ff', '#0b5ed7', '#f093fb', '#4facfe'];
  
  return (
    <div className="chart-container">
      <h3>Project Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProgressChart({ data }) {
  return (
    <div className="chart-container">
      <h3>Project Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="progress" fill="#1e90ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendChart({ data }) {
  return (
    <div className="chart-container">
      <h3>Project Completion Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="completed" stroke="#1e90ff" strokeWidth={2} />
          <Line type="monotone" dataKey="active" stroke="#0b5ed7" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
