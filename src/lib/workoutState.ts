const toDateStart = (date: Date): Date =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );

const diffInDays = (a: Date, b: Date): number => {
  const ms = toDateStart(a).getTime() - toDateStart(b).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

export const computeNextStreak = (
  previousStreak: number,
  lastCompletedAt: string | undefined,
  completedAt: Date,
): number => {
  if (!lastCompletedAt) return 1;

  const last = new Date(lastCompletedAt);
  const dayDiff = diffInDays(completedAt, last);

  if (dayDiff === 1) return previousStreak + 1;
  if (dayDiff === 0) return previousStreak;
  return 1;
};

export const mergeCompletedDays = (
  completedDays: number[],
  dayNumber: number,
): number[] => {
  if (completedDays.includes(dayNumber)) return completedDays;
  return [...completedDays, dayNumber].sort((a, b) => a - b);
};
