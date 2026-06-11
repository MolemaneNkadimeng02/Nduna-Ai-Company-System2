import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './database.js';
import { startDailyAgentScheduler } from './services/monitoringAgentService.js';
import projectRoutes from './routes/projects.js';
import teamRoutes from './routes/team.js';
import milestoneRoutes from './routes/milestones.js';
import statusRoutes from './routes/status.js';
import agentRoutes from './routes/agent.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initializeDatabase();

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/agent', agentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Database initialized successfully');
  startDailyAgentScheduler();
});
