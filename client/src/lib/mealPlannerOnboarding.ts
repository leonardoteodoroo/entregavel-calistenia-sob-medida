import type {
  MealPlannerFoodStyle,
  MealPlannerGoal,
  MealPlannerRestrictionKey,
} from "./mealPlanData";
import type { MealPlannerProfile } from "./mealPlannerState";

export interface MealPlannerDraftLike {
  weightInput: string;
  goal: MealPlannerGoal;
  foodStyle: MealPlannerFoodStyle;
  restrictions: MealPlannerRestrictionKey[];
}

export interface MealPlannerUnlockState {
  isUnlocked: boolean;
  completedSteps: number;
  totalSteps: 3;
  nextStep: 0 | 1 | 2;
}

function parseDraftWeight(weightInput: string): number {
  const normalized = Number(weightInput.replace(",", "."));
  return Number.isFinite(normalized) && normalized > 0 ? normalized : 0;
}

export function getMealPlannerUnlockState(
  profile: MealPlannerProfile | null,
  draft: MealPlannerDraftLike
): MealPlannerUnlockState {
  if (profile) {
    return {
      isUnlocked: true,
      completedSteps: 3,
      totalSteps: 3,
      nextStep: 2,
    };
  }

  const step0Complete = parseDraftWeight(draft.weightInput) > 0;
  const step1Complete = Boolean(draft.foodStyle);
  const completedSteps = step0Complete ? (step1Complete ? 2 : 1) : 0;

  return {
    isUnlocked: false,
    completedSteps,
    totalSteps: 3,
    nextStep: completedSteps === 0 ? 0 : completedSteps === 1 ? 1 : 2,
  };
}
