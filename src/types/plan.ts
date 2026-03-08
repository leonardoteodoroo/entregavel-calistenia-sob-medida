export type PlanPath = "leve" | "base" | "avancar";
export type PlanDayType = "treino" | "mobilidade" | "recuperacao";

export interface PlanDay {
  dayNumber: number;
  weekNumber: number;
  workoutName: string;
  focus: string;
  durationMinutes: number;
  exerciseIds: number[];
  adaptations: string[];
  path: PlanPath;
  dayType: PlanDayType;
  reason: string;
}
