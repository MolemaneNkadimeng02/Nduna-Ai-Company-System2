import * as teamModel from '../models/teamModel.js';

export async function getTeamMembers(req, res) {
  try {
    const members = await teamModel.getAllTeamMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTeamMember(req, res) {
  try {
    const member = await teamModel.getTeamMemberById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createTeamMember(req, res) {
  try {
    const result = await teamModel.createTeamMember(req.body);
    res.status(201).json({ id: result.id, message: 'Team member added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTeamMember(req, res) {
  try {
    await teamModel.updateTeamMember(req.params.id, req.body);
    res.json({ message: 'Team member updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTeamMember(req, res) {
  try {
    await teamModel.deleteTeamMember(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
