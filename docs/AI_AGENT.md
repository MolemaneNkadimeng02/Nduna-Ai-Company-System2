# Nduna AI Daily Monitoring Agent

The system now includes a daily monitoring agent that watches the full project database and produces executive updates.

## What It Monitors

- Project count, status, progress, budget, stale projects, and at-risk work
- Team member status and availability signals
- Milestones that are overdue or due in the next 7 days
- Status update activity and projects without recent movement
- Open risks, risk severity, and mitigation attention areas
- Historical daily reports stored in SQLite

## API Endpoints

- `GET /api/agent/snapshot` - live monitoring snapshot with metrics and signals
- `GET /api/agent/latest` - latest generated report
- `GET /api/agent/reports?limit=7` - report history
- `POST /api/agent/daily-update` - generate a report immediately

## Frontend

Open the **AI Agent** page in the navigation bar. The page shows:

- latest executive update
- system health metrics
- at-risk projects
- overdue and upcoming milestones
- open risks
- recent report history
- a manual **Generate update** button

## Daily Schedule

Set these server environment variables to enable automatic daily generation:

```env
ENABLE_DAILY_AGENT=true
AGENT_DAILY_REPORT_TIME=08:00
AGENT_RUN_ON_STARTUP=false
AGENT_LOOKBACK_DAYS=7
```

`AGENT_DAILY_REPORT_TIME` uses the server's local timezone.

## Optional LLM Generation

The agent works without an LLM by using a deterministic system summary. To use an OpenAI LLM for richer daily writing, set:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_DAILY_AGENT_MODEL=your_model_name_here
```

If either value is missing, the agent automatically falls back to the built-in summary so daily monitoring still runs.

## Storage

Reports are saved in the `agent_reports` SQLite table with:

- report date
- generator type
- human-readable summary
- full JSON report payload
- creation timestamp
