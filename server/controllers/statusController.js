import * as statusModel from '../models/statusModel.js';

export async function getStatusUpdates(req, res) {
  try {
    const updates = await statusModel.getStatusUpdatesByProject(req.params.projectId);
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createStatusUpdate(req, res) {
  try {
    const result = await statusModel.createStatusUpdate(req.body);
    res.status(201).json({ id: result.id, message: 'Status update created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRecentUpdates(req, res) {
  try {
    const limit = req.query.limit || 10;
    const updates = await statusModel.getRecentUpdates(limit);
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
