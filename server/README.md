# Nduna AI Project Monitoring System

Backend API server for project monitoring and team management.

## Setup

```bash
npm install
```

## Run

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Projects
- GET /api/projects - List all projects
- GET /api/projects/:id - Get project details
- POST /api/projects - Create new project
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project
- GET /api/projects/stats - Get project statistics

### Team
- GET /api/team - List all team members
- GET /api/team/:id - Get team member details
- POST /api/team - Add team member
- PUT /api/team/:id - Update team member
- DELETE /api/team/:id - Remove team member

### Milestones
- GET /api/milestones/project/:projectId - Get project milestones
- POST /api/milestones - Create milestone
- PUT /api/milestones/:id - Update milestone
- DELETE /api/milestones/:id - Delete milestone

### Status Updates
- GET /api/status/project/:projectId - Get project status updates
- GET /api/status/recent - Get recent updates
- POST /api/status - Create status update
