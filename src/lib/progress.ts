import type { ProgressSnapshot } from '../types/progress';

export const buildProgressSnapshot = (
  completedDays: number[],
  streak: number,
  lastCompletedAt?: string,
): ProgressSnapshot => {
  const completedDaysCount = completedDays.length;
  const currentWeek = Math.min(Math.max(Math.ceil(Math.max(completedDaysCount, 1) / 7), 1), 4);
  const nextDayNumber = Math.min(completedDaysCount + 1, 28);
  const needsReactivation = Boolean(lastCompletedAt && completedDaysCount > 0 && streak <= 1);

  return {
    completedDaysCount,
    completedDays,
    currentWeek,
    nextDayNumber,
    streak,
    lastCompletedAt,
    needsReactivation,
  };
};
