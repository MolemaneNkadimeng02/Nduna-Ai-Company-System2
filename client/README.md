# Nduna AI Client

React frontend for the Nduna AI Project Monitoring System.

## Features

- Modern responsive dashboard
- Project management interface
- Team member management
- Real-time analytics and visualizations
- Status tracking
- Mobile-friendly design

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Frontend will open at `http://localhost:3000`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Navbar.css
│   ├── Charts.jsx
│   ├── StatsCard.css
│   ├── ProjectCard.jsx
│   └── ProjectCard.css
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   ├── Team.jsx
│   └── Analytics.jsx
├── styles/             # Page styles
│   ├── Dashboard.css
│   ├── Projects.css
│   ├── Team.css
│   └── Analytics.css
├── App.jsx            # Main app component
├── App.css
├── index.jsx          # Entry point
└── index.css
```

## Dependencies

- **React**: UI library
- **React Router**: Client-side routing
- **Recharts**: Data visualization
- **React Icons**: Icon library
- **Axios**: HTTP client
- **Date-fns**: Date utilities

## Features

### Dashboard
- Overview statistics
- Project status distribution
- Progress tracking
- Recent projects list

### Projects
- View all projects
- Create new projects
- Update project details
- Delete projects
- Track project progress

### Team
- View team members
- Add new members
- Remove members
- Track member status

### Analytics
- Performance metrics
- Project insights
- Success rates
- Resource utilization

## API Integration

The client communicates with the backend API at `http://localhost:5000`. Make sure the server is running before starting the development server.

## Styling

The project uses CSS modules and global styles for a modern, professional look with:
- Gradient backgrounds
- Smooth animations
- Responsive grid layouts
- Mobile-first design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
