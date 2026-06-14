export function clampProgress(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value || 0))));
}

export function estimateScheduleProgress(project) {
  if (!project.start_date || !project.end_date) return 0;

  const today = new Date();
  const startDate = new Date(project.start_date);
  const endDate = new Date(project.end_date);

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
    return 0;
  }

  if (today <= startDate) return 0;
  if (today >= endDate) return 100;

  return ((today - startDate) / (endDate - startDate)) * 100;
}

export function getProgressReading(project) {
  const recordedProgress = clampProgress(project.progress);

  if (project.status === 'Completed') {
    return { value: 100, label: 'Complete: 100%' };
  }

  if (recordedProgress > 0) {
    return { value: recordedProgress, label: `Progress: ${recordedProgress}%` };
  }

  const estimatedProgress = clampProgress(estimateScheduleProgress(project));
  if (estimatedProgress > 0) {
    return { value: estimatedProgress, label: `Estimated: ${estimatedProgress}%` };
  }

  return { value: 0, label: 'Progress not updated' };
}

export function daysUntil(dateValue) {
  if (!dateValue) return null;

  const today = new Date();
  const dueDate = new Date(dateValue);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (Number.isNaN(dueDate.getTime())) return null;
  return Math.ceil((dueDate - today) / 86400000);
}

export function dueDateLabel(project) {
  const days = daysUntil(project.end_date);

  if (days === null) return 'No due date';
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `Due in ${days} days`;
}

export function getProjectHealth(project) {
  const progress = getProgressReading(project).value;
  const days = daysUntil(project.end_date);
  const isCompleted = project.status === 'Completed';
  const isAtRisk = project.status === 'At Risk';
  const isOnHold = project.status === 'On Hold';
  const isOverdue = days !== null && days < 0 && !isCompleted;
  const isDueSoon = days !== null && days >= 0 && days <= 14 && !isCompleted;
  const hasNoProgress = progress === 0 && !isCompleted;

  if (isCompleted) {
    return { label: 'Healthy', score: 100, tone: 'healthy', reason: 'Completed' };
  }

  let score = 72;
  if (isAtRisk) score -= 32;
  if (isOnHold) score -= 18;
  if (isOverdue) score -= 28;
  if (isDueSoon) score -= 14;
  if (hasNoProgress) score -= 16;
  score += Math.min(progress * 0.22, 18);

  const finalScore = clampProgress(score);

  if (finalScore >= 76) {
    return { label: 'Healthy', score: finalScore, tone: 'healthy', reason: 'On track' };
  }

  if (finalScore >= 56) {
    return { label: 'Watch', score: finalScore, tone: 'watch', reason: isDueSoon ? 'Due soon' : 'Needs monitoring' };
  }

  if (finalScore >= 36) {
    return { label: 'At Risk', score: finalScore, tone: 'risk', reason: isOverdue ? 'Overdue' : 'Delivery risk' };
  }

  return { label: 'Critical', score: finalScore, tone: 'critical', reason: isOverdue ? 'Overdue' : 'Immediate action' };
}

export function enrichProject(project) {
  const progressReading = getProgressReading(project);
  const health = getProjectHealth(project);
  const daysToDue = daysUntil(project.end_date);
  const isCompleted = project.status === 'Completed';
  const isOverdue = daysToDue !== null && daysToDue < 0 && !isCompleted;
  const isDueSoon = daysToDue !== null && daysToDue >= 0 && daysToDue <= 14 && !isCompleted;
  const urgency =
    (health.tone === 'critical' ? 80 : health.tone === 'risk' ? 55 : health.tone === 'watch' ? 28 : 0) +
    (isOverdue ? 35 : 0) +
    (isDueSoon ? 22 : 0) +
    (100 - progressReading.value) * 0.3;

  return {
    ...project,
    progressReading,
    health,
    daysToDue,
    dueLabel: dueDateLabel(project),
    isOverdue,
    isDueSoon,
    urgency: Math.round(urgency)
  };
}

export function getPortfolioFacts(projects) {
  const enriched = projects.map(enrichProject);
  const active = enriched.filter((project) => project.status !== 'Completed');
  const completed = enriched.filter((project) => project.status === 'Completed');
  const atRisk = enriched.filter((project) => ['At Risk', 'Critical'].includes(project.health.label));
  const dueSoon = enriched.filter((project) => project.isDueSoon);
  const overdue = enriched.filter((project) => project.isOverdue);
  const attentionQueue = enriched
    .filter((project) => project.health.tone !== 'healthy' || project.isDueSoon || project.isOverdue)
    .sort((a, b) => b.urgency - a.urgency);
  const averageProgress = enriched.length
    ? Math.round(enriched.reduce((sum, project) => sum + project.progressReading.value, 0) / enriched.length)
    : 0;
  const portfolioHealth = enriched.length
    ? Math.round(enriched.reduce((sum, project) => sum + project.health.score, 0) / enriched.length)
    : 0;

  return {
    projects: enriched,
    active,
    completed,
    atRisk,
    dueSoon,
    overdue,
    attentionQueue,
    averageProgress,
    portfolioHealth
  };
}
