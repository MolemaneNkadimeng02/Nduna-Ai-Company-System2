# Nduna AI Backend

Express.js backend server for the Nduna AI Project Monitoring System.

## Features

- RESTful API endpoints
- SQLite database
- Project management
- Team management
- Status tracking
- Milestone management

## Setup

```bash
npm install
```

Create `.env` file:
```
PORT=5000
NODE_ENV=development
DATABASE_PATH=./database/nduna_ai.db
```

## Development

```bash
npm run dev
```

Server will run at `http://localhost:5000`

## API Routes

### Projects (`/api/projects`)
- GET - Get all projects
- GET /:id - Get specific project
- POST - Create new project
- PUT /:id - Update project
- DELETE /:id - Delete project
- GET /stats - Get project statistics

### Team (`/api/team`)
- GET - Get all team members
- GET /:id - Get specific member
- POST - Add team member
- PUT /:id - Update member
- DELETE /:id - Remove member

### Milestones (`/api/milestones`)
- GET /project/:projectId - Get project milestones
- POST - Create milestone
- PUT /:id - Update milestone
- DELETE /:id - Delete milestone

### Status Updates (`/api/status`)
- GET /project/:projectId - Get project updates
- GET /recent - Get recent updates
- POST - Create status update

## Database

SQLite database with tables for:
- projects
- team_members
- milestones
- status_updates
- risks

Database file: `./database/nduna_ai.db`

## Project Structure

```
server/
├── controllers/         # Request handlers
│   ├── projectController.js
│   ├── teamController.js
│   ├── milestoneController.js
│   └── statusController.js
├── models/             # Data models
│   ├── projectModel.js
│   ├── teamModel.js
│   ├── milestoneModel.js
│   └── statusModel.js
├── routes/             # API routes
│   ├── projects.js
│   ├── team.js
│   ├── milestones.js
│   └── status.js
├── middleware/         # Express middleware
├── database.js         # Database setup and queries
├── index.js           # Entry point
└── package.json
```

## Dependencies

- **Express**: Web framework
- **CORS**: Cross-Origin Resource Sharing
- **SQLite3**: Database driver
- **Dotenv**: Environment variables
- **BCryptjs**: Password hashing
- **JWT**: Authentication tokens

## Environment Variables

```
PORT=5000                          # Server port
NODE_ENV=development              # Environment
DATABASE_PATH=./database/nduna_ai.db  # Database location
```

## Testing API

Use tools like:
- Postman
- Thunder Client
- cURL

Example:
```bash
curl http://localhost:5000/api/projects
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## CORS

CORS is enabled for all origins during development. Modify in production.
