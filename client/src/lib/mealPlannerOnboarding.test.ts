import { describe, expect, it } from "vitest";

import { getMealPlannerUnlockState } from "./mealPlannerOnboarding";

describe("getMealPlannerUnlockState", () => {
  it("keeps the planner locked on first visit", () => {
    expect(
      getMealPlannerUnlockState(null, {
        weightInput: "",
        goal: "constancia",
        foodStyle: "padrao",
        restrictions: [],
      })
    ).toEqual({
      isUnlocked: false,
      completedSteps: 0,
      totalSteps: 3,
      nextStep: 0,
    });
  });

  it("tracks draft progress without unlocking before save", () => {
    expect(
      getMealPlannerUnlockState(null, {
        weightInput: "62",
        goal: "saciedade",
        foodStyle: "vegano",
        restrictions: ["sem_gluten"],
      })
    ).toEqual({
      isUnlocked: false,
      completedSteps: 2,
      totalSteps: 3,
      nextStep: 2,
    });
  });

  it("unlocks the planner when the profile already exists", () => {
    expect(
      getMealPlannerUnlockState(
        {
          weightKg: 62,
          goal: "saciedade",
          foodStyle: "vegano",
          restrictions: ["sem_gluten"],
        },
        {
          weightInput: "62",
          goal: "saciedade",
          foodStyle: "vegano",
          restrictions: ["sem_gluten"],
        }
      )
    ).toEqual({
      isUnlocked: true,
      completedSteps: 3,
      totalSteps: 3,
      nextStep: 2,
    });
  });
});
