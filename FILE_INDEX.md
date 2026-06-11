# File Index & Reference Guide

## 📂 Complete File Structure with Descriptions

### Root Level Documentation

```
README.md                         - Main project documentation
                                 - Overview of entire system
                                 - Features and structure
                                 - Tech stack details
                                 - Deployment guide
```

```
SETUP.md                          - Comprehensive setup guide
                                 - Prerequisites and requirements
                                 - Step-by-step installation
                                 - Configuration details
                                 - Troubleshooting section
```

```
QUICKSTART.md                     - Quick 5-minute setup
                                 - Fast installation commands
                                 - First steps checklist
                                 - Common tasks
```

```
GETTING_STARTED.md                - Step-by-step beginner guide
                                 - Visual ASCII diagrams
                                 - First project creation
                                 - Team management walkthrough
                                 - API testing examples
```

```
ARCHITECTURE.md                   - Technical deep dive
                                 - System design details
                                 - Database schema
                                 - API reference
                                 - Data flow diagrams
```

```
PROJECT_SUMMARY.md                - Project completion summary
                                 - What was built
                                 - Feature overview
                                 - Project structure
                                 - Next steps
```

```
INSTALLATION_CHECKLIST.md         - Verification checklist
                                 - Component verification
                                 - Installation steps
                                 - Testing checklist
                                 - Success indicators
```

```
package.json                      - Root npm configuration
                                 - Scripts for running app
                                 - Dependency management
                                 - install-all command
```

```
.gitignore                        - Git ignore file
                                 - Excludes node_modules
                                 - Ignores .env files
                                 - Ignores build outputs
```

### Server Directory

#### Main Files

```
server/index.js                   - Express server entry point
                                 - Initializes database
                                 - Sets up middleware
                                 - Defines routes
                                 - Starts server on port 5000
```

```
server/database.js                - SQLite database setup
                                 - Creates tables on startup
                                 - Query helper functions
                                 - Database initialization
```

#### Configuration

```
server/.env                       - Environment variables
                                 - PORT=5000
                                 - NODE_ENV=development
```

```
server/.env.example               - Example env template
                                 - Shows all available variables
                                 - For reference
```

```
server/package.json               - Backend dependencies
                                 - npm scripts
                                 - Project metadata
```

#### Controllers (Business Logic)

```
server/controllers/
projectController.js              - Project operations
                                 - GET all projects
                                 - GET project by ID
                                 - POST new project
                                 - PUT update project
                                 - DELETE project
                                 - GET statistics
```

```
server/controllers/
teamController.js                 - Team member operations
                                 - GET all members
                                 - GET member by ID
                                 - POST new member
                                 - PUT update member
                                 - DELETE member
```

```
server/controllers/
milestoneController.js            - Milestone operations
                                 - GET project milestones
                                 - POST create milestone
                                 - PUT update milestone
                                 - DELETE milestone
```

```
server/controllers/
statusController.js               - Status update operations
                                 - GET project updates
                                 - GET recent updates
                                 - POST create update
```

#### Models (Data Access Layer)

```
server/models/
projectModel.js                   - Project data operations
                                 - getAllProjects()
                                 - getProjectById()
                                 - createProject()
                                 - updateProject()
                                 - deleteProject()
                                 - getProjectStats()
```

```
server/models/
teamModel.js                      - Team member data operations
                                 - getAllTeamMembers()
                                 - getTeamMemberById()
                                 - createTeamMember()
                                 - updateTeamMember()
                                 - deleteTeamMember()
```

```
server/models/
milestoneModel.js                 - Milestone data operations
                                 - getMilestonesByProject()
                                 - createMilestone()
                                 - updateMilestone()
                                 - deleteMilestone()
```

```
server/models/
statusModel.js                    - Status update data operations
                                 - getStatusUpdatesByProject()
                                 - createStatusUpdate()
                                 - getRecentUpdates()
```

#### Routes (API Endpoints)

```
server/routes/
projects.js                       - Project endpoints
                                 - GET /api/projects
                                 - GET /api/projects/stats
                                 - GET /api/projects/:id
                                 - POST /api/projects
                                 - PUT /api/projects/:id
                                 - DELETE /api/projects/:id
```

```
server/routes/
team.js                           - Team endpoints
                                 - GET /api/team
                                 - GET /api/team/:id
                                 - POST /api/team
                                 - PUT /api/team/:id
                                 - DELETE /api/team/:id
```

```
server/routes/
milestones.js                     - Milestone endpoints
                                 - GET /api/milestones/project/:id
                                 - POST /api/milestones
                                 - PUT /api/milestones/:id
                                 - DELETE /api/milestones/:id
```

```
server/routes/
status.js                         - Status update endpoints
                                 - GET /api/status/project/:id
                                 - GET /api/status/recent
                                 - POST /api/status
```

#### Documentation

```
server/README.md                  - Backend documentation
                                 - API setup and running
                                 - Endpoint reference
                                 - Database information
```

```
server/CLIENT_README.md           - Backend info file
                                 - Redirects to main docs
```

### Client Directory

#### Main Files

```
client/index.html                 - HTML entry point
                                 - Loads React app
                                 - Sets up root element
                                 - Page metadata
```

```
client/vite.config.js             - Vite build configuration
                                 - Dev server settings
                                 - API proxy setup
                                 - Build options
```

#### Configuration

```
client/.env                       - Frontend environment
                                 - VITE_API_URL for API
```

```
client/.env.example               - Example env template
```

```
client/package.json               - Frontend dependencies
                                 - React, Vite, etc.
                                 - npm scripts
```

#### Styles

```
client/src/styles/
Dashboard.css                     - Dashboard page styles
                                 - Stats grid layout
                                 - Charts styling
                                 - Responsive design
```

```
client/src/styles/
Projects.css                      - Projects page styles
                                 - Project grid
                                 - Forms and modals
                                 - Create button styles
```

```
client/src/styles/
Team.css                          - Team page styles
                                 - Team member cards
                                 - Add member form
                                 - Status badges
```

```
client/src/styles/
Analytics.css                     - Analytics page styles
                                 - Metric cards
                                 - Insights section
```

#### Components

```
client/src/components/
Navbar.jsx                        - Navigation component
                                 - Links to all pages
                                 - Mobile menu
                                 - Logo and branding
```

```
client/src/components/
Navbar.css                        - Navigation styles
                                 - Gradient background
                                 - Responsive menu
```

```
client/src/components/
Charts.jsx                        - Data visualization
                                 - StatsCard component
                                 - ProjectStatusChart
                                 - ProgressChart
                                 - TrendChart
                                 - Recharts integration
```

```
client/src/components/
StatsCard.css                     - Stats card styling
                                 - Hover effects
                                 - Trend indicators
```

```
client/src/components/
ProjectCard.jsx                   - Project display card
                                 - Status badge
                                 - Progress bar
                                 - Edit/Delete buttons
                                 - Action buttons
```

```
client/src/components/
ProjectCard.css                   - Project card styling
                                 - Responsive layout
                                 - Interactive elements
```

#### Pages

```
client/src/pages/
Dashboard.jsx                     - Dashboard page
                                 - Statistics display
                                 - Charts rendering
                                 - Recent projects
                                 - Data fetching
```

```
client/src/pages/
Projects.jsx                      - Projects management page
                                 - Project list
                                 - Create form modal
                                 - Edit functionality
                                 - Delete confirmation
                                 - CRUD operations
```

```
client/src/pages/
Team.jsx                          - Team management page
                                 - Team member list
                                 - Add member form
                                 - Member cards
                                 - Remove functionality
                                 - Role selection
```

```
client/src/pages/
Analytics.jsx                     - Analytics page
                                 - Performance metrics
                                 - Key insights
                                 - Nduna AI achievements
                                 - Static insights
```

#### Main App Files

```
client/src/
App.jsx                           - Main app component
                                 - Route definitions
                                 - Layout structure
                                 - State management
```

```
client/src/
App.css                           - Global app styles
                                 - Layout structure
                                 - Global rules
```

```
client/src/
index.jsx                         - React entry point
                                 - Renders App component
                                 - Sets up React DOM
```

```
client/src/
index.css                         - Global styles
                                 - Font settings
                                 - Base styling
                                 - Accessibility
```

#### Documentation

```
client/README.md                  - Frontend documentation
                                 - Features overview
                                 - Setup instructions
                                 - Project structure
                                 - Dependencies list
```

### Database Directory

```
database/
nduna_ai.db                       - SQLite database file
                                 - Created automatically
                                 - Stores all project data
                                 - Contains 5 tables:
                                   - projects
                                   - team_members
                                   - milestones
                                   - status_updates
                                   - risks
```

## 🗺️ File Navigation Guide

### For Frontend Development
Start with: `client/src/App.jsx`
- Components: `client/src/components/`
- Pages: `client/src/pages/`
- Styles: `client/src/styles/`

### For Backend Development
Start with: `server/index.js`
- Routes: `server/routes/`
- Controllers: `server/controllers/`
- Models: `server/models/`
- Database: `server/database.js`

### For Documentation
- Quick reference: `QUICKSTART.md`
- Full setup: `SETUP.md`
- Step-by-step: `GETTING_STARTED.md`
- Technical details: `ARCHITECTURE.md`

### For Configuration
- Frontend: `client/.env`
- Backend: `server/.env`
- Root: `package.json`

## 📝 File Naming Conventions

### JavaScript Files
- Components: PascalCase (e.g., `Navbar.jsx`)
- Functions: camelCase (e.g., `projectController.js`)
- Models: camelCase with Model suffix (e.g., `projectModel.js`)
- Routes: camelCase plural (e.g., `projects.js`)

### CSS Files
- Match component names (e.g., `Navbar.css`)
- Page styles (e.g., `Dashboard.css`)
- Utility styles (e.g., `StatsCard.css`)

### Documentation
- UPPERCASE.md (e.g., `README.md`, `SETUP.md`)
- Descriptive names with hyphens (e.g., `INSTALLATION_CHECKLIST.md`)

## 🔗 File Dependencies

### Frontend File Flow
```
index.html
    ↓
index.jsx
    ↓
App.jsx
    ├─ Navbar.jsx
    ├─ Dashboard.jsx
    │   └─ Charts.jsx
    ├─ Projects.jsx
    │   └─ ProjectCard.jsx
    ├─ Team.jsx
    └─ Analytics.jsx
```

### Backend File Flow
```
index.js
    ├─ database.js
    ├─ routes/projects.js
    │   └─ controllers/projectController.js
    │       └─ models/projectModel.js
    ├─ routes/team.js
    │   └─ controllers/teamController.js
    │       └─ models/teamModel.js
    ├─ routes/milestones.js
    ├─ routes/status.js
    └─ middleware/
```

## 📦 Total File Count

- Root level: 9 files
- Server directory: 15 files
- Client directory: 21 files
- Total source files: 45 files
- Database: 1 file (auto-created)

## 🎯 Quick File Reference

### I want to:
- **Change dashboard layout** → Edit `client/src/pages/Dashboard.jsx` and `client/src/styles/Dashboard.css`
- **Add new API endpoint** → Add in `server/routes/*.js` and create controller
- **Change colors** → Edit CSS files in `client/src/styles/` and `client/src/components/`
- **Add new page** → Create in `client/src/pages/`, add route to `App.jsx`
- **Modify database** → Edit `server/database.js`
- **Change API URLs** → Edit `client/.env` and backend `server/.env`
- **Understand architecture** → Read `ARCHITECTURE.md`

---

**Last Updated**: June 5, 2026
**Files Created**: 45
**Ready for Development**: ✅
