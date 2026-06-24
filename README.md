# Nduna AI Operations App

An installable web app for Nduna AI operations. It brings project monitoring, team management, analytics, command centres, and AI agent oversight into a mobile-friendly React app backed by an Express and SQLite API.

## Features

- **Installable App**: Browser-installable PWA shell with app metadata, icon, theme color, and offline fallback
- **Dashboard**: Real-time overview of all projects with key metrics and visualizations
- **Project Management**: Create, update, and track AI integration projects with detailed status
- **Team Management**: Manage team members and their assignments
- **Analytics**: Performance metrics and project insights
- **Status Updates**: Track project progress with real-time updates
- **Milestones**: Manage project milestones and deliverables
- **Command Views**: Command centre, intelligence hub, operations suite, and AI agent monitoring screens

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx        # Main app component
│   │   └── index.jsx      # Entry point
│   ├── index.html         # HTML template
│   └── package.json       # Frontend dependencies
│
├── server/                 # Node.js backend
│   ├── controllers/       # Business logic
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── database.js        # Database setup
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
│
└── database/              # SQLite database files
```

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Recharts for data visualization
- React Icons for UI icons
- Vite for build tooling

### Backend
- Node.js with Express
- SQLite for data persistence
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. **Install all dependencies**
```bash
npm run install-all
```

Or install separately:
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Development

**Start both server and client concurrently:**
```bash
npm run dev
```

**Or start separately:**
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client
```

App frontend will be available at: `http://localhost:3000`
Backend API will be at: `http://localhost:5000`

### Build

Build the frontend for production:
```bash
npm run build
```

Preview the production app:
```bash
npm run preview
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/stats` - Get project statistics

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member details
- `POST /api/team` - Add team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Remove team member

### Milestones
- `GET /api/milestones/project/:projectId` - Get project milestones
- `POST /api/milestones` - Create milestone
- `PUT /api/milestones/:id` - Update milestone
- `DELETE /api/milestones/:id` - Delete milestone

### Status Updates
- `GET /api/status/project/:projectId` - Get project updates
- `GET /api/status/recent` - Get recent updates
- `POST /api/status` - Create status update

## Database Schema

### Projects Table
- id (INTEGER, PRIMARY KEY)
- name (TEXT)
- description (TEXT)
- client (TEXT)
- status (TEXT) - Planning, In Progress, On Hold, Completed, At Risk
- service_type (TEXT)
- start_date (TEXT)
- end_date (TEXT)
- progress (INTEGER) - 0-100
- budget (REAL)
- team_lead (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)

### Team Members Table
- id (INTEGER, PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- role (TEXT)
- expertise (TEXT)
- status (TEXT) - Active, On Leave, Inactive
- created_at (DATETIME)

## Features Details

### Dashboard
- Total projects count
- Active projects tracking
- Completed projects
- Average project progress
- Project status distribution chart
- Project progress bar chart
- Completion trend visualization
- Recent projects list

### Project Management
- Create new projects with full details
- Update project status and progress
- Set project timeline and budget
- Assign team leads
- Delete projects
- Filter by status

### Team Management
- Add team members with roles and expertise
- Track team member status
- Assign members to projects
- Manage team specializations

### Analytics
- Project success rate metrics
- Average project duration
- Resource utilization tracking
- Client satisfaction ratings
- AI integration achievements
- Enterprise compliance tracking

## Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

## Deployment

### Frontend Deployment (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy the dist folder
```

### Backend Deployment
- Ensure Node.js environment
- Set environment variables
- Run: `npm start`

## Contributing

Guidelines for contributing to the project:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

© 2026 Nduna AI. All rights reserved.

## Support

For support or questions:
- Email: nathi@nduna.site
- Phone: +27 (0) 83 925 0702
- Location: Johannesburg, Gauteng
