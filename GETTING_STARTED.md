# Getting Started Guide - Step by Step

## Welcome to Nduna AI Project Monitoring System!

This guide will walk you through setting up and using the system.

## 🎯 Overview

```
┌─────────────────────────────────────────────────────────────┐
│         Nduna AI Project Monitoring System                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                  ┌──────────────┐         │
│  │  Frontend    │                  │  Backend     │         │
│  │  React 18    │◄───────API────►│  Express     │         │
│  │  Port 3000   │                  │  Port 5000   │         │
│  └──────────────┘                  └──────────────┘         │
│       │                                    │                │
│       └─────────────────┬───────────────────┘                │
│                         │                                    │
│                    ┌────▼────┐                               │
│                    │  SQLite  │                               │
│                    │ Database │                               │
│                    └──────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites Check

Before starting, verify you have:

**Windows Command Prompt/PowerShell:**
```bash
# Check Node.js version (should be 16 or higher)
node --version

# Check npm version (should be 8 or higher)
npm --version
```

If either command doesn't work, install from https://nodejs.org/

## 🚀 Step-by-Step Setup

### Step 1: Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

**Navigate to project folder:**
```bash
cd "C:\Users\Admin\Documents\Nduna AI\Nduna Ai Company System"
```

### Step 2: Install All Dependencies (2-3 minutes)

```bash
npm run install-all
```

This will:
- Install server dependencies
- Install client dependencies
- Create node_modules folders
- Prepare the project for running

**You should see:**
```
npm notice
npm notice added XXX packages in XX seconds
```

### Step 3: Start the Application (1 minute)

```bash
npm run dev
```

**Expected output:**
```
[server] Server running on http://localhost:5000
[server] Database initialized successfully

[client] VITE v5.0.0  ready in XXX ms

Local:   http://localhost:3000/
```

### Step 4: Open in Browser

Click on or paste these URLs:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api/health

The browser should open automatically at port 3000.

## 🎨 What You'll See

### Dashboard (Default Page)
```
┌──────────────────────────────────────────────────┐
│  📊 Nduna AI                                     │
│  Dashboard | Projects | Team | Analytics         │
├──────────────────────────────────────────────────┤
│                                                   │
│  Dashboard                                       │
│  Welcome to Nduna AI Project Monitoring System   │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │ 📊 Total Projects: 0                       │  │
│  │ 🚀 Active Projects: 0                      │  │
│  │ ✅ Completed: 0                            │  │
│  │ 📈 Avg Progress: 0%                        │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  [Charts will display once data is added]        │
│                                                   │
└──────────────────────────────────────────────────┘
```

## ✏️ First Task: Add a Team Member

1. **Click "Team" in navigation**
   ```
   Dashboard | Projects | Team | Analytics
                                 ▲
                                 Click here
   ```

2. **Click "+ Add Team Member" button**
   ```
   Team Members          [+ Add Team Member]
                                 ▲
                                 Click here
   ```

3. **Fill in the form:**
   ```
   Full Name:        Ahmed Nathi
   Email:            ahmed@nduna.site
   Role:             Senior AI Integration Specialist
   Area of Expertise: Enterprise AI Integration
   Status:           Active
   ```

4. **Click "Add Member"**

5. **You should see the member card appear:**
   ```
   ┌──────────────────────┐
   │       A              │  ◄─ Avatar (First letter)
   │   Ahmed Nathi        │
   │   Senior AI...       │
   │   ahmed@nduna...     │
   │   Enterprise AI...   │
   │   Active             │  ◄─ Green badge
   │   [Remove]           │
   └──────────────────────┘
   ```

## 🏗️ Second Task: Create a Project

1. **Click "Projects" in navigation**

2. **Click "+ New Project" button**

3. **Fill in the project form:**
   ```
   Project Name:        AI Readiness Assessment
   Client:              TechCorp Inc
   Description:         Comprehensive AI readiness evaluation
   Status:              Planning
   Service Type:        AI Readiness Assessment
   Start Date:          2026-06-05
   End Date:            2026-07-05
   Progress:            10
   Budget:              50000
   Team Lead:           Ahmed Nathi
   ```

4. **Click "Create Project"**

5. **Project appears in grid:**
   ```
   ┌─────────────────────────────────────┐
   │ AI Readiness Assessment  [Planning] │
   │ Client: TechCorp Inc                │
   │ Comprehensive AI readiness...       │
   │ Progress: ████░░░░░░ 10%            │
   │ Service: AI Readiness Assessment    │
   │ Lead: Ahmed Nathi                   │
   │ [Edit]  [Delete]                    │
   └─────────────────────────────────────┘
   ```

## 📊 Third Task: View Dashboard with Data

1. **Click "Dashboard"**

2. **You'll now see:**
   ```
   ┌────────────────────────────────────────────────┐
   │ Total Projects: 1                              │
   │ Active Projects: 0                             │
   │ Completed: 0                                   │
   │ Average Progress: 10%                          │
   └────────────────────────────────────────────────┘

   [Charts will show project status distribution]

   Recent Projects:
   ┌────────────────────────────────┐
   │ AI Readiness Assessment [Plan]│
   │ TechCorp Inc                   │
   │ Progress: ████░░░░░░ 10%       │
   └────────────────────────────────┘
   ```

## 🎛️ Managing Your Projects

### Edit a Project
1. Go to "Projects"
2. Click "Edit" on any project card
3. Modify the fields
4. Click "Update Project"

### Update Project Status
1. Edit the project
2. Change "Status" to "In Progress"
3. Increase "Progress" percentage
4. Click "Update Project"

### Delete a Project
1. Go to "Projects"
2. Click "Delete" on project card
3. Confirm deletion

## 👥 Managing Your Team

### Add Team Members
1. Go to "Team"
2. Click "+ Add Team Member"
3. Fill in details
4. Click "Add Member"

### Remove Team Member
1. Go to "Team"
2. Find the member
3. Click "Remove"
4. Confirm

### Recommended Team Roles (for Nduna AI)
- Founder & CEO
- Senior AI Integration Specialist
- AI Solutions Engineer
- AI Ethical Engineer & Security Lead
- Project Manager
- Technical Lead
- Developer

## 📈 View Analytics

1. **Click "Analytics"** in navigation

2. **You'll see:**
   ```
   ┌──────────────────────────────────┐
   │ Project Success Rate      87%    │
   │ Avg Duration              4.5mo  │
   │ Resource Utilization      92%    │
   │ Client Satisfaction       4.8/5  │
   └──────────────────────────────────┘

   Key Insights:
   - 30+ AI Integrations Delivered
   - 10+ Enterprise Clients
   - 5+ Certified AI Specialists
   - Enterprise Security Compliance
   ```

## 🔌 API Testing (Optional)

Test the API in PowerShell or Command Prompt:

```bash
# Get all projects (returns JSON)
curl http://localhost:5000/api/projects

# Get all team members (returns JSON)
curl http://localhost:5000/api/team

# Check server health
curl http://localhost:5000/api/health
```

## 🛑 Stopping the Application

When done, press `Ctrl + C` in the terminal:
```
^C (Ctrl + C)
Shutting down...
```

## 🔄 Restarting

To start again:
```bash
cd "C:\Users\Admin\Documents\Nduna AI\Nduna Ai Company System"
npm run dev
```

## 🐛 Troubleshooting

### Issue: "Port 3000 already in use"
Vite will automatically use the next available port (3001, 3002, etc.)

### Issue: "Port 5000 already in use"
Edit `server/.env`:
```
PORT=5001
```
Then restart.

### Issue: "Cannot find module"
Run again:
```bash
npm run install-all
```

### Issue: "Blank page or errors"
1. Check browser console (F12 → Console)
2. Check terminal output
3. Make sure both server and client are running
4. Refresh page (Ctrl + R)

## 💡 Tips

1. **Keep terminals open** - Both server and client need to run
2. **Use Chrome/Firefox** - Better developer tools
3. **Check terminal logs** - All errors are logged there
4. **Clear browser cache** - If seeing old data
5. **Use the Documentation** - See README.md for full details

## 📱 Mobile Access

The system works on mobile too! On same network:
1. Find your computer IP: `ipconfig` (Windows)
2. Access from phone: `http://<your-ip>:3000`

## 🎓 Learning Path

1. **Week 1**: Set up, explore features, add sample data
2. **Week 2**: Create projects, manage team, track progress
3. **Week 3**: Customize styling, add more features
4. **Week 4**: Deploy to production

## 📚 Full Documentation

For more details, see:
- `README.md` - Full project documentation
- `SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - Technical details
- `server/README.md` - API documentation
- `client/README.md` - Frontend details

## ✅ You're All Set!

Your Nduna AI Project Monitoring System is ready to use!

### Quick Summary:
```
✅ System installed
✅ Backend running on port 5000
✅ Frontend running on port 3000
✅ Database ready
✅ All features available
✅ Ready for production use
```

**Start your journey with:**
```bash
npm run dev
```

Then visit: **http://localhost:3000**

---

**Need help?**
- Email: nathi@nduna.site
- Phone: +27 (0) 83 925 0702

Happy monitoring! 🚀
