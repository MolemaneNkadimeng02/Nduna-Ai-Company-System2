import { allQuery, getQuery, runQuery } from '../database.js';

export async function getStatusUpdatesByProject(projectId) {
  return allQuery('SELECT * FROM status_updates WHERE project_id = ? ORDER BY created_at DESC', [projectId]);
}

export async function createStatusUpdate(updateData) {
  const query = `
    INSERT INTO status_updates (project_id, title, description, status, progress, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const result = await runQuery(query, [
    updateData.project_id,
    updateData.title,
    updateData.description,
    updateData.status,
    updateData.progress,
    updateData.created_by
  ]);
  return result;
}

export async function getRecentUpdates(limit = 10) {
  return allQuery('SELECT * FROM status_updates ORDER BY created_at DESC LIMIT ?', [limit]);
}
