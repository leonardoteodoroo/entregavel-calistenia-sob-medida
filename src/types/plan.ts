export type PlanPath = "leve" | "base" | "avancar";
export type PlanDayType = "treino" | "mobilidade" | "recuperacao";

export interface PlanMetadata {
  id: string;
  name: string;
  description: string;
  durationWeeksCount: number;
}

export interface PlanDay {
  planId: string;
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
  intensities?: {
    leve: string;
    padrao: string;
    maisIntensa: string;
  };
}
