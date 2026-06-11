import * as projectModel from '../models/projectModel.js';

export async function getProjects(req, res) {
  try {
    const projects = await projectModel.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProject(req, res) {
  try {
    const project = await projectModel.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createProject(req, res) {
  try {
    const result = await projectModel.createProject(req.body);
    res.status(201).json({ id: result.id, message: 'Project created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProject(req, res) {
  try {
    await projectModel.updateProject(req.params.id, req.body);
    res.json({ message: 'Project updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProject(req, res) {
  try {
    await projectModel.deleteProject(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProjectStats(req, res) {
  try {
    const stats = await projectModel.getProjectStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
