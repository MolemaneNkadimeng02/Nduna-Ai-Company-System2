import { allQuery, getQuery, runQuery } from '../database.js';

export async function getAllProjects() {
  return allQuery('SELECT * FROM projects ORDER BY updated_at DESC');
}

export async function getProjectById(id) {
  return getQuery('SELECT * FROM projects WHERE id = ?', [id]);
}

export async function createProject(projectData) {
  const query = `
    INSERT INTO projects (name, description, client, status, service_type, start_date, end_date, budget, team_lead)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await runQuery(query, [
    projectData.name,
    projectData.description,
    projectData.client,
    projectData.status || 'Planning',
    projectData.service_type,
    projectData.start_date,
    projectData.end_date,
    projectData.budget,
    projectData.team_lead
  ]);
  return result;
}

export async function updateProject(id, projectData) {
  const updates = [];
  const values = [];
  
  Object.entries(projectData).forEach(([key, value]) => {
    if (key !== 'id') {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  values.push(id);
  const query = `UPDATE projects SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return runQuery(query, values);
}

export async function deleteProject(id) {
  return runQuery('DELETE FROM projects WHERE id = ?', [id]);
}

export async function getProjectStats() {
  const total = await getQuery('SELECT COUNT(*) as count FROM projects');
  const byStatus = await allQuery(`
    SELECT status, COUNT(*) as count FROM projects GROUP BY status
  `);
  const avgProgress = await getQuery('SELECT AVG(progress) as avg FROM projects');
  
  return {
    total: total.count,
    byStatus,
    avgProgress: avgProgress.avg || 0
  };
}
