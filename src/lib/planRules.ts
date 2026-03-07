import { planDays } from '../data/planDays';
import type { PlanDay } from '../types/plan';

export const getPlanDayByNumber = (dayNumber: number): PlanDay | undefined =>
  planDays.find((day) => day.dayNumber === dayNumber);

export const getTodayDayNumber = (completedDays: number[]): number => {
  const next = completedDays.length + 1;
  return Math.min(Math.max(next, 1), 28);
};

export const isDayCompleted = (completedDays: number[], dayNumber: number): boolean =>
  completedDays.includes(dayNumber);
