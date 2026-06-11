import { allQuery, getQuery, runQuery } from '../database.js';

export async function getAllTeamMembers() {
  return allQuery('SELECT * FROM team_members ORDER BY name');
}

export async function getTeamMemberById(id) {
  return getQuery('SELECT * FROM team_members WHERE id = ?', [id]);
}

export async function createTeamMember(memberData) {
  const query = `
    INSERT INTO team_members (name, email, role, expertise, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await runQuery(query, [
    memberData.name,
    memberData.email,
    memberData.role,
    memberData.expertise,
    memberData.status || 'Active'
  ]);
  return result;
}

export async function updateTeamMember(id, memberData) {
  const updates = [];
  const values = [];
  
  Object.entries(memberData).forEach(([key, value]) => {
    if (key !== 'id') {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  values.push(id);
  const query = `UPDATE team_members SET ${updates.join(', ')} WHERE id = ?`;
  return runQuery(query, values);
}

export async function deleteTeamMember(id) {
  return runQuery('DELETE FROM team_members WHERE id = ?', [id]);
}
