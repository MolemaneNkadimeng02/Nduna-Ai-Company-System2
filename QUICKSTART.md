# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies (2 minutes)
```bash
cd "c:\Users\Admin\Documents\Nduna AI\Nduna Ai Company System"
npm run install-all
```

### 2. Start Application (1 minute)
```bash
npm run dev
```

### 3. Open in Browser (1 minute)
- Frontend: http://localhost:3000
- API: http://localhost:5000

### 4. Start Using (1 minute)
- Dashboard: View project overview
- Projects: Create and manage projects
- Team: Add team members
- Analytics: View performance metrics

## First Steps

### Add a Team Member
1. Navigate to "Team" page
2. Click "+ Add Team Member"
3. Fill in details:
   - Name: e.g., "Ahmed Nathi"
   - Email: e.g., "ahmed@example.com"
   - Role: Select from dropdown
   - Expertise: e.g., "AI Integration"
4. Click "Add Member"

### Create Your First Project
1. Navigate to "Projects" page
2. Click "+ New Project"
3. Fill in project details:
   - **Project Name**: Give it a meaningful name
   - **Client**: Company name
   - **Description**: What will be done
   - **Status**: Select current status
   - **Service Type**: Type of AI service
   - **Start Date**: Project start date
   - **End Date**: Expected completion
   - **Progress**: Current progress %
   - **Budget**: Project budget
   - **Team Lead**: Assign a team lead
4. Click "Create Project"

### Monitor Dashboard
1. Go to "Dashboard" page
2. See at a glance:
   - Total projects
   - Active projects
   - Completed projects
   - Average progress
3. View charts and recent projects

## Common Tasks

### Update Project Status
1. Go to Projects page
2. Find the project
3. Click Edit
4. Change status and progress
5. Click "Update Project"

### Remove Team Member
1. Go to Team page
2. Find the member
3. Click "Remove"
4. Confirm deletion

### View Analytics
1. Go to Analytics page
2. See performance metrics
3. View insights about projects

## API Testing

Test API endpoints using curl:

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Check server health
curl http://localhost:5000/api/health

# Get team members
curl http://localhost:5000/api/team
```

## Stopping the Application

Press `Ctrl + C` in terminal to stop both server and frontend.

## Need Help?

- Check SETUP.md for detailed setup guide
- See README.md for full documentation
- Check server/README.md for API details
- Check client/README.md for frontend details

## Next Steps

1. Customize the dashboard colors in component CSS files
2. Add more projects and team members
3. Set up milestones and status updates
4. Deploy to production when ready

## Important Notes

- Keep both terminal windows open when running `npm run dev`
- The database is stored in `database/nduna_ai.db`
- Configuration files are in `server/.env` and `client/.env`
- Clear browser cache if you see old data

Happy monitoring! 🚀
