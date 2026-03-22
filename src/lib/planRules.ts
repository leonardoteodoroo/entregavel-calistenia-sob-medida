import type { PlanDay } from "../types/plan";

export const getPlanDayByNumber = (
  allPlanDays: PlanDay[],
  dayNumber: number,
): PlanDay | undefined =>
  allPlanDays.find((day) => day.dayNumber === dayNumber);

export const getTodayDayNumber = (completedDays: number[]): number => {
  const next = completedDays.length + 1;
  return Math.min(Math.max(next, 1), 28);
};

export const isDayCompleted = (
  completedDays: number[],
  dayNumber: number,
): boolean => completedDays.includes(dayNumber);

export interface UpcomingDayItem {
  dayNumber: number;
  workoutName: string;
  durationMinutes: number;
  isLocked: boolean;
  targetRoute: "/app/plano";
}

export const getUpcomingDayItems = (
  allPlanDays: PlanDay[],
  todayDayNumber: number,
  limit = 4,
): UpcomingDayItem[] =>
  allPlanDays
    .filter((day) => day.dayNumber > todayDayNumber)
    .slice(0, limit)
    .map((day) => ({
      dayNumber: day.dayNumber,
      workoutName: day.workoutName,
      durationMinutes: day.durationMinutes,
      isLocked: true,
      targetRoute: "/app/plano",
    }));

const weekTitles: Record<number, string> = {
  1: "Base de Consistência",
  2: "Aceleração",
  3: "Zonas de Foco",
  4: "Desafio Final",
};

export interface WeekPlanViewModel {
  weekNumber: number;
  weekTitle: string;
  days: PlanDay[];
  isCurrent: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
  isLocked: boolean;
  lockMessage: string | null;
}

export const getCurrentWeekFromDay = (todayDayNumber: number): number =>
  Math.min(Math.max(Math.ceil(todayDayNumber / 7), 1), 4);

const isWeekCompleted = (
  weekDays: PlanDay[],
  completedDays: number[],
): boolean => weekDays.every((day) => completedDays.includes(day.dayNumber));

export const getWeeklyPlanView = (
  allPlanDays: PlanDay[],
  todayDayNumber: number,
  completedDays: number[],
): WeekPlanViewModel[] => {
  const currentWeek = getCurrentWeekFromDay(todayDayNumber);

  return [1, 2, 3, 4].map((weekNumber) => {
    const days = allPlanDays.filter((day) => day.weekNumber === weekNumber);
    const previousWeekDays = allPlanDays.filter(
      (day) => day.weekNumber === weekNumber - 1,
    );
    const previousWeekCompleted =
      weekNumber === 1
        ? true
        : isWeekCompleted(previousWeekDays, completedDays);
    const unlocked = previousWeekCompleted;
    const completed = isWeekCompleted(days, completedDays);

    return {
      weekNumber,
      weekTitle: weekTitles[weekNumber] ?? `Semana ${weekNumber}`,
      days,
      isCurrent: weekNumber === currentWeek,
      isCompleted: completed,
      isUnlocked: unlocked,
      isLocked: !unlocked,
      lockMessage:
        weekNumber === 1
          ? null
          : `Complete a Semana ${weekNumber - 1} para liberar`,
    };
  });
};
