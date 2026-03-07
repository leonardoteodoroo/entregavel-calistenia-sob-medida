export interface ProgressSnapshot {
  completedDaysCount: number;
  completedDays: number[];
  currentWeek: number;
  nextDayNumber: number;
  streak: number;
  lastCompletedAt?: string;
  needsReactivation: boolean;
}
