export type Goal = "emagrecer" | "tonificar" | "consistencia";
export type ExperienceLevel = "iniciante" | "intermediaria";

export interface QuizProfileInput {
  name: string;
  profileLabel: string;
  mainGoal: Goal;
  currentLevel: ExperienceLevel;
  bodyFocus: string;
  availableMinutes: 10 | 15 | 20;
}

export interface OnboardingAdjustments {
  trainingDaysPerWeek: 3 | 4 | 5;
  sessionPreference: 10 | 15 | 20;
  floorTraining: boolean;
  kneePain: boolean;
  wristPain: boolean;
  lowImpact: boolean;
  perceivedLevel: ExperienceLevel;
}

export interface DerivedProfile {
  profileBase: string;
  goal: Goal;
  focus: string;
  sessionMinutes: 10 | 15 | 20;
  restrictions: string[];
  copyTone: string;
  weekOneFocus: string;
  todayInstruction: string;
}
