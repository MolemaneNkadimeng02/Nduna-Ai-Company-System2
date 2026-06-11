# Nduna AI Project Monitoring System - Complete Documentation

## System Architecture

### Overview
The system is built as a modern full-stack web application with:
- **Frontend**: React Single Page Application (SPA) with Vite bundler
- **Backend**: RESTful API built with Express.js
- **Database**: SQLite for data persistence
- **Communication**: HTTP/REST over JSON

### Technology Stack

#### Frontend
- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **React Router v6**: Client-side routing
- **Recharts**: Data visualization charts
- **React Icons**: Icon library
- **Axios**: HTTP client (for future use)

#### Backend
- **Node.js**: JavaScript runtime
- **Express 4**: Web framework
- **SQLite3**: Lightweight database
- **CORS**: Cross-origin request support
- **Dotenv**: Environment configuration
- **JWT**: Token-based authentication (prepared)

## Detailed Features

### 1. Dashboard
**Purpose**: Provide at-a-glance overview of all projects

**Components**:
- Statistics cards showing:
  - Total projects
  - Active projects
  - Completed projects
  - Average progress
- Charts:
  - Pie chart: Project status distribution
  - Bar chart: Project progress
  - Line chart: Completion trends
- Recent projects list

**Data Flow**:
1. Page loads
2. Fetch `/api/projects/stats` for statistics
3. Fetch `/api/projects` for all projects
4. Render statistics cards with project data
5. Generate charts from status data

### 2. Project Management
**Purpose**: Create, read, update, and delete projects

**Features**:
- Create new projects with all details
- Update project information
- Track project progress (0-100%)
- Monitor project status lifecycle
- Delete completed projects
- Assign team leads

**Project Status States**:
- Planning: Initial stage
- In Progress: Currently being worked on
- On Hold: Temporarily stopped
- Completed: Finished successfully
- At Risk: Facing issues

**Project Data Fields**:
```javascript
{
  id: Integer,
  name: String,
  description: String,
  client: String,
  status: String,
  service_type: String,
  start_date: Date,
  end_date: Date,
  progress: Integer (0-100),
  budget: Float,
  team_lead: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

### 3. Team Management
**Purpose**: Manage team members and their assignments

**Features**:
- Add new team members
- Track member roles and expertise
- Monitor member availability status
- Remove team members

**Member Roles** (Nduna AI specific):
- Founder & CEO
- Senior AI Integration Specialist
- AI Solutions Engineer
- AI Ethical Engineer & Security Lead
- Project Manager
- Technical Lead
- Developer

**Member Status States**:
- Active: Available for projects
- On Leave: Temporarily unavailable
- Inactive: Not currently working

**Team Member Data**:
```javascript
{
  id: Integer,
  name: String,
  email: String,
  role: String,
  expertise: String,
  projects_count: Integer,
  status: String,
  created_at: DateTime
}
```

### 4. Status Updates & Milestones
**Purpose**: Track detailed project progress

**Status Updates**:
- Create progress updates for projects
- Include title, description, and progress percentage
- Track who made the update
- View update timeline

**Milestones**:
- Create project milestones
- Track milestone completion status
- Set due dates
- Mark as completed

### 5. Analytics & Reporting
**Purpose**: Provide insights into project performance

**Metrics Displayed**:
- Project success rate: % of projects completed on time
- Average project duration: Typical time to complete
- Resource utilization: % of team actively assigned
- Client satisfaction: Rating out of 5
- AI integrations delivered: 30+ projects
- Enterprise clients: 10+ companies
- Certified specialists: 5+ team members

**Key Insights**:
- Enterprise security compliance status
- Measurable outcomes achieved
- Technology stack utilization
- Risk mitigation strategies

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  client TEXT NOT NULL,
  status TEXT DEFAULT 'Planning',
  service_type TEXT,
  start_date TEXT,
  end_date TEXT,
  progress INTEGER DEFAULT 0,
  budget REAL,
  team_lead TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Team Members Table
```sql
CREATE TABLE team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT NOT NULL,
  expertise TEXT,
  projects_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Milestones Table
```sql
CREATE TABLE milestones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Pending',
  due_date TEXT,
  completed_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### Status Updates Table
```sql
CREATE TABLE status_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT,
  progress INTEGER,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### Risks Table
```sql
CREATE TABLE risks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'Medium',
  status TEXT DEFAULT 'Open',
  mitigation_plan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Projects Endpoints

#### Get All Projects
```
GET /projects
Response: Array of project objects
```

#### Get Project Statistics
```
GET /projects/stats
Response: {
  total: number,
  byStatus: Array,
  avgProgress: number
}
```

#### Get Specific Project
```
GET /projects/:id
Response: Project object
```

#### Create Project
```
POST /projects
Body: {
  name: string,
  description: string,
  client: string,
  status: string,
  service_type: string,
  start_date: date,
  end_date: date,
  progress: number,
  budget: number,
  team_lead: string
}
Response: { id: number, message: string }
```

#### Update Project
```
PUT /projects/:id
Body: { ...updated fields }
Response: { message: string }
```

#### Delete Project
```
DELETE /projects/:id
Response: { message: string }
```

### Team Endpoints

#### Get All Team Members
```
GET /team
Response: Array of team member objects
```

#### Get Specific Member
```
GET /team/:id
Response: Team member object
```

#### Add Team Member
```
POST /team
Body: {
  name: string,
  email: string,
  role: string,
  expertise: string,
  status: string
}
Response: { id: number, message: string }
```

#### Update Member
```
PUT /team/:id
Body: { ...updated fields }
Response: { message: string }
```

#### Remove Member
```
DELETE /team/:id
Response: { message: string }
```

### Milestones Endpoints

#### Get Project Milestones
```
GET /milestones/project/:projectId
Response: Array of milestone objects
```

#### Create Milestone
```
POST /milestones
Body: {
  project_id: number,
  title: string,
  description: string,
  status: string,
  due_date: date
}
Response: { id: number, message: string }
```

#### Update Milestone
```
PUT /milestones/:id
Body: { ...updated fields }
Response: { message: string }
```

#### Delete Milestone
```
DELETE /milestones/:id
Response: { message: string }
```

### Status Updates Endpoints

#### Get Project Updates
```
GET /status/project/:projectId
Response: Array of status update objects
```

#### Get Recent Updates
```
GET /status/recent?limit=10
Response: Array of status update objects
```

#### Create Status Update
```
POST /status
Body: {
  project_id: number,
  title: string,
  description: string,
  status: string,
  progress: number,
  created_by: string
}
Response: { id: number, message: string }
```

## User Interface Flow

### Dashboard
```
Home Page
├── Statistics Section
│   ├── Total Projects Card
│   ├── Active Projects Card
│   ├── Completed Projects Card
│   └── Average Progress Card
├── Charts Section
│   ├── Status Distribution (Pie Chart)
│   ├── Progress Overview (Bar Chart)
│   └── Trend Analysis (Line Chart)
└── Recent Projects Section
    └── Project List Preview
```

### Projects Page
```
Projects Page
├── Header with Create Button
├── Project Cards Grid
│   └── Each Card Shows
│       ├── Project Name & Status
│       ├── Client Info
│       ├── Progress Bar
│       ├── Service Type & Team Lead
│       └── Edit/Delete Buttons
└── Modal Form for Create/Edit
    ├── Project Details
    ├── Timeline
    ├── Budget & Team
    └── Status & Progress
```

### Team Page
```
Team Page
├── Header with Add Button
├── Team Cards Grid
│   └── Each Card Shows
│       ├── Member Avatar
│       ├── Name
│       ├── Role
│       ├── Email
│       ├── Expertise
│       ├── Status Badge
│       └── Remove Button
└── Modal Form for Adding
    ├── Personal Details
    ├── Role Selection
    ├── Expertise
    └── Initial Status
```

### Analytics Page
```
Analytics Page
├── Metric Cards
│   ├── Success Rate
│   ├── Avg Duration
│   ├── Utilization
│   └── Satisfaction Rating
└── Insights Section
    ├── AI Integration Count
    ├── Enterprise Clients
    ├── Certified Specialists
    └── Security Compliance
```

## Error Handling

### HTTP Status Codes
- 200: Success
- 201: Created successfully
- 400: Bad request (invalid data)
- 404: Resource not found
- 500: Server error

### Error Response Format
```javascript
{
  error: "Error message description"
}
```

## Security Considerations

### Current Implementation
- CORS enabled for development
- Environment variables for configuration
- No sensitive data in frontend

### Production Recommendations
1. Enable HTTPS/TLS
2. Restrict CORS origins
3. Implement authentication (JWT)
4. Add rate limiting
5. Validate and sanitize inputs
6. Use password hashing (bcryptjs)
7. Implement logging
8. Regular security audits

## Performance Optimization

### Frontend
- Lazy loading for routes
- Memoization of components
- Efficient re-renders
- CSS optimization

### Backend
- Database indexing
- Connection pooling (for MySQL migration)
- API response caching
- Query optimization

## Deployment Guide

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables
4. Configure API URL for production

### Backend Deployment
1. Use Node.js hosting (Heroku, DigitalOcean, AWS)
2. Set environment variables
3. Use production database (upgrade from SQLite)
4. Enable HTTPS
5. Set up monitoring and logging

## Maintenance

### Regular Tasks
- Monitor database size
- Backup database regularly
- Review logs for errors
- Update dependencies
- Clear old data as needed

### Database Maintenance
```bash
# Backup database
cp database/nduna_ai.db database/nduna_ai.db.backup

# Check integrity
sqlite3 database/nduna_ai.db "PRAGMA integrity_check;"
```

## Troubleshooting Guide

### Common Issues

**1. Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**2. Database Issues**
```bash
# Delete and recreate
rm database/nduna_ai.db
# Restart backend
```

**3. CORS Errors**
- Ensure backend is running
- Check CORS configuration in server
- Verify API URL in frontend

**4. Hot Reload Not Working**
- Restart dev server
- Clear browser cache
- Check file watching permissions

## Future Enhancements

### Planned Features
1. User authentication and authorization
2. Real-time notifications
3. File attachments for projects
4. Email alerts for milestones
5. Advanced reporting and exports
6. Mobile app (React Native)
7. Integration with external tools
8. Advanced analytics and forecasting
9. Resource allocation optimizer
10. Risk management dashboard

### Scalability Improvements
1. Migrate to PostgreSQL
2. Implement caching layer (Redis)
3. Add message queue (RabbitMQ)
4. Microservices architecture
5. Docker containerization
6. Kubernetes orchestration

## Support & Maintenance

**Company Contact**:
- Email: nathi@nduna.site
- Phone: +27 (0) 83 925 0702
- Location: Johannesburg, Gauteng

**Development Team**:
- Nathi Tshabalala (Founder & CEO)
- Thabang Molemane (Senior AI Integration Specialist)
- Ntokozo Khumalo (AI Solutions Engineer)
- Mpho Khuzwayo (AI Ethical Engineer & Security Lead)

## License

© 2026 Nduna AI. All rights reserved.

---

**Last Updated**: June 5, 2026
**Version**: 1.0.0
**Status**: Production Ready
