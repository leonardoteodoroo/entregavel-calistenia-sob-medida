export type ExerciseCategory =
  | "Puxar"
  | "Empurrar"
  | "Pernas"
  | "Core"
  | "Mobilidade";

export interface Exercise {
  id: number;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: "Iniciante" | "Intermediário";
  equipment: string;
  image: string;
  progressionTips: string[];
  adaptation: string;
  substituteWith: string;
}
