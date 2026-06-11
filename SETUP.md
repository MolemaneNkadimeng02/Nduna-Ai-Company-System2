# Nduna AI Project Monitoring System - Setup & Installation Guide

## Overview

This is a complete project monitoring and dashboard system built for Nduna AI. It consists of a React frontend and Node.js Express backend with SQLite database.

## System Requirements

- **Node.js**: 16 or higher
- **npm**: 8 or higher
- **Operating System**: Windows, macOS, or Linux
- **RAM**: 2GB minimum
- **Disk Space**: 500MB for installation

## Installation Steps

### Step 1: Prerequisites

Ensure you have Node.js installed:
```bash
node --version
npm --version
```

If not installed, download from https://nodejs.org/

### Step 2: Project Setup

Navigate to the project directory:
```bash
cd "c:\Users\Admin\Documents\Nduna AI\Nduna Ai Company System"
```

### Step 3: Install Dependencies

**Option A: Install All at Once**
```bash
npm run install-all
```

**Option B: Install Separately**

Install backend dependencies:
```bash
cd server
npm install
cd ..
```

Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

### Option 1: Run Both Server and Client Together

From the root directory:
```bash
npm run dev
```

This will start:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### First Time Setup

When you first run the application:
1. The database will be automatically created
2. All required tables will be initialized
3. Backend API will be ready at http://localhost:5000
4. Frontend will open at http://localhost:3000

## Configuration

### Backend Configuration (.env)

Create or edit `.env` file in the `server` directory:

```
PORT=5000
NODE_ENV=development
```

### Frontend Configuration (.env)

Create or edit `.env` file in the `client` directory:

```
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
Nduna Ai Company System/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── server/                 # Express backend
│   ├── controllers/       # Business logic
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── database.js
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── database/              # SQLite database
│   └── nduna_ai.db
│
├── package.json           # Root package.json
├── README.md
└── .gitignore
```

## Available Commands

### Root Directory

```bash
npm run install-all       # Install all dependencies
npm run dev              # Start both server and client
npm run server           # Start only backend
npm run client           # Start only frontend
npm run build            # Build frontend
```

### Server Directory

```bash
npm run dev              # Start server with auto-reload
npm start                # Start server
```

### Client Directory

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Features Overview

### Dashboard
- Real-time project statistics
- Project status distribution chart
- Progress tracking visualization
- Recent projects list
- Key metrics display

### Projects
- View all projects
- Create new projects
- Edit project details
- Update project status and progress
- Delete projects
- Track team leads and budgets

### Team Management
- View all team members
- Add new team members
- Manage member roles and expertise
- Track member status (Active, On Leave, Inactive)
- Remove members

### Analytics
- Project success rate
- Average project duration
- Resource utilization metrics
- Client satisfaction ratings
- Performance insights

## API Endpoints

### Health Check
```
GET http://localhost:5000/api/health
```

### Projects
```
GET    /api/projects              - Get all projects
GET    /api/projects/stats        - Get project statistics
GET    /api/projects/:id          - Get specific project
POST   /api/projects              - Create new project
PUT    /api/projects/:id          - Update project
DELETE /api/projects/:id          - Delete project
```

### Team
```
GET    /api/team                  - Get all team members
GET    /api/team/:id              - Get specific team member
POST   /api/team                  - Add team member
PUT    /api/team/:id              - Update team member
DELETE /api/team/:id              - Remove team member
```

### Milestones
```
GET    /api/milestones/project/:projectId - Get project milestones
POST   /api/milestones                     - Create milestone
PUT    /api/milestones/:id                - Update milestone
DELETE /api/milestones/:id                - Delete milestone
```

### Status Updates
```
GET    /api/status/project/:projectId     - Get project updates
GET    /api/status/recent                 - Get recent updates
POST   /api/status                        - Create status update
```

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**For Backend (change port 5000):**
Edit `server/.env`:
```
PORT=5001
```

**For Frontend (Vite auto-detects):**
The frontend will automatically use the next available port.

### Database Issues

If you encounter database errors:
1. Delete `database/nduna_ai.db`
2. Restart the backend server
3. The database will be recreated automatically

### Dependencies Issues

Clean install:
```bash
# Remove node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors

Clear build cache:
```bash
cd client
rm -r dist
npm run build
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

1. Use the production build for deployment
2. Clear browser cache if seeing old data
3. Ensure backend is running before using frontend
4. Close unused browser tabs for better performance

## Security Notes

- Never commit `.env` files with sensitive data
- Use `.env.example` for template
- Change default PORT if deploying
- Enable HTTPS in production

## Development vs Production

### Development
```bash
npm run dev
```
- Hot reload enabled
- Source maps available
- Development APIs

### Production Build
```bash
npm run build
npm start
```
- Optimized bundle size
- No source maps
- Production APIs

## Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Vite Documentation](https://vitejs.dev)
- [Recharts Documentation](https://recharts.org)

## Support

For issues or questions:
- **Email**: nathi@nduna.site
- **Phone**: +27 (0) 83 925 0702
- **Location**: Johannesburg, Gauteng

## License

© 2026 Nduna AI. All rights reserved.
