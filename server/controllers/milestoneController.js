import * as milestoneModel from '../models/milestoneModel.js';

export async function getMilestones(req, res) {
  try {
    const milestones = await milestoneModel.getMilestonesByProject(req.params.projectId);
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createMilestone(req, res) {
  try {
    const result = await milestoneModel.createMilestone(req.body);
    res.status(201).json({ id: result.id, message: 'Milestone created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateMilestone(req, res) {
  try {
    await milestoneModel.updateMilestone(req.params.id, req.body);
    res.json({ message: 'Milestone updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteMilestone(req, res) {
  try {
    await milestoneModel.deleteMilestone(req.params.id);
    res.json({ message: 'Milestone deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
