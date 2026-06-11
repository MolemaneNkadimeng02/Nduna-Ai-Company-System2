import * as monitoringAgent from '../services/monitoringAgentService.js';

export async function getLatestReport(req, res) {
  try {
    const report = await monitoringAgent.getLatestReport();
    if (!report) {
      return res.status(404).json({ error: 'No agent reports have been generated yet' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReportHistory(req, res) {
  try {
    const limit = Number(req.query.limit || 14);
    const reports = await monitoringAgent.getReportHistory(limit);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSystemSnapshot(req, res) {
  try {
    const snapshot = await monitoringAgent.collectSystemSnapshot();
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function generateDailyReport(req, res) {
  try {
    const report = await monitoringAgent.generateDailyReport({ trigger: 'api' });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
