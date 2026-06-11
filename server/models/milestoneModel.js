import { allQuery, getQuery, runQuery } from '../database.js';

export async function getMilestonesByProject(projectId) {
  return allQuery('SELECT * FROM milestones WHERE project_id = ? ORDER BY due_date', [projectId]);
}

export async function createMilestone(milestoneData) {
  const query = `
    INSERT INTO milestones (project_id, title, description, status, due_date)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await runQuery(query, [
    milestoneData.project_id,
    milestoneData.title,
    milestoneData.description,
    milestoneData.status || 'Pending',
    milestoneData.due_date
  ]);
  return result;
}

export async function updateMilestone(id, milestoneData) {
  const updates = [];
  const values = [];
  
  Object.entries(milestoneData).forEach(([key, value]) => {
    if (key !== 'id') {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  values.push(id);
  const query = `UPDATE milestones SET ${updates.join(', ')} WHERE id = ?`;
  return runQuery(query, values);
}

export async function deleteMilestone(id) {
  return runQuery('DELETE FROM milestones WHERE id = ?', [id]);
}
