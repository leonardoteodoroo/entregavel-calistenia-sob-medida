import { describe, expect, it } from "vitest";

import { mealPlanData } from "./mealPlanData";
import {
  clearMealSubstitutionSelections,
  MEAL_PLANNER_STORAGE_KEY,
  MEAL_PLANNER_STORAGE_VERSION,
  getActiveSwapCountByMeal,
  getActiveSwapSummaryEntries,
  applyMealSubstitutionSelection,
  applyFavoriteComposition,
  buildWeeklyShoppingGroups,
  createSavedMealComposition,
  createInitialMealPlannerStorage,
  getFilteredMeals,
  getInteractiveSwapMapGroups,
  getMealPlannerWeekKey,
  getMealsWithSubstitutions,
  getRecommendedVariantId,
  getResolvedMealSelection,
  getWeeklySummary,
  readMealPlannerStorage,
  toggleFavoriteComposition,
  writeMealPlannerStorage,
  type MealPlannerProfile,
} from "./mealPlannerState";

function createMockStorage() {
  const map = new Map<string, string>();

  return {
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
    removeItem(key: string) {
      map.delete(key);
    },
  };
}

describe("mealPlannerState", () => {
  it("prioritizes the vegan variant for vegan and vegetarian profiles when available", () => {
    const almoco = mealPlanData.meals.find(meal => meal.key === "almoco");
    expect(almoco).toBeDefined();

    const veganoProfile: MealPlannerProfile = {
      weightKg: 62,
      goal: "saciedade",
      foodStyle: "vegano",
      restrictions: [],
    };
    const vegetarianoProfile: MealPlannerProfile = {
      weightKg: 62,
      goal: "constancia",
      foodStyle: "vegetariano",
      restrictions: [],
    };

    expect(getRecommendedVariantId(almoco!, veganoProfile)).toBe(
      "almoco-vegana"
    );
    expect(getRecommendedVariantId(almoco!, vegetarianoProfile)).toBe(
      "almoco-vegana"
    );
  });

  it("only applies restriction defaults where an explicit variant exists", () => {
    const lanche = mealPlanData.meals.find(meal => meal.key === "lanche");
    const almoco = mealPlanData.meals.find(meal => meal.key === "almoco");

    const semGlutenProfile: MealPlannerProfile = {
      weightKg: 58,
      goal: "praticidade",
      foodStyle: "padrao",
      restrictions: ["sem_gluten"],
    };
    const semLactoseProfile: MealPlannerProfile = {
      weightKg: 58,
      goal: "praticidade",
      foodStyle: "padrao",
      restrictions: ["sem_lactose"],
    };

    expect(getRecommendedVariantId(lanche!, semGlutenProfile)).toBe(
      "lanche-sem-gluten"
    );
    expect(getRecommendedVariantId(almoco!, semLactoseProfile)).toBeUndefined();
  });

  it("persists the planner envelope and rolls over completed days by date", () => {
    const storage = createMockStorage();
    const initial = createInitialMealPlannerStorage(
      new Date("2026-04-09T10:00:00")
    );

    const withProgress = {
      ...initial,
      profile: {
        weightKg: 63,
        goal: "constancia" as const,
        foodStyle: "padrao" as const,
        restrictions: [],
      },
      today: {
        ...initial.today,
        completedMeals: ["cafe", "almoco"],
        waterMl: 1500,
      },
    };

    writeMealPlannerStorage(withProgress, storage);
    const rolled = readMealPlannerStorage(
      storage,
      new Date("2026-04-10T08:00:00")
    );

    expect(rolled.profile?.weightKg).toBe(63);
    expect(rolled.today.dateKey).toBe("2026-04-10");
    expect(rolled.today.completedMeals).toEqual([]);
    expect(rolled.today.waterMl).toBe(0);
    expect(rolled.history[0]).toEqual({
      dateKey: "2026-04-09",
      completedMealCount: 2,
      waterMl: 1500,
      completionPct: 50,
    });

    const savedRaw = storage.getItem(MEAL_PLANNER_STORAGE_KEY);
    expect(savedRaw).not.toBeNull();
    expect(savedRaw).toContain(
      `"version":${String(MEAL_PLANNER_STORAGE_VERSION)}`
    );
  });

  it("builds a weekly shopping list from the resolved daily composition", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    planner.profile = {
      weightKg: 60,
      goal: "saciedade",
      foodStyle: "padrao",
      restrictions: [],
    };
    planner.today.activeVariantByMeal = {
      cafe: "base",
      almoco: "almoco-vegana",
    };
    planner.today.selectedSubstitutionsByMeal = {
      cafe: {
        "cafe-fruta": "cafe-mamao",
      },
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    };

    const groups = buildWeeklyShoppingGroups(mealPlanData, planner);
    const frutas = groups.find(group => group.key === "frutas");
    const proteinas = groups.find(group => group.key === "proteinas");
    const carboidratos = groups.find(group => group.key === "carboidratos");

    expect(frutas?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Mamão",
          weeklyPortion: "7 x 70 g",
        }),
      ])
    );
    expect(proteinas?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Grão de soja refogado",
          weeklyPortion: "7 x 6 colheres de servir (180 g)",
        }),
      ])
    );
    expect(carboidratos?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Arroz branco ou integral",
          weeklyPortion: "7 x 80 g",
        }),
      ])
    );

    expect(
      proteinas?.items.some(item => item.name === "Filé de frango grelhado")
    ).toBe(false);
  });

  it("resolve o lanche híbrido com trocas estruturadas e reflete isso na lista de compras", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    planner.today.selectedSubstitutionsByMeal = {
      lanche: {
        "lanche-base-cremosa": "lanche-leite-amendoa",
        "lanche-fruta": "lanche-morango",
        "lanche-carbo": "lanche-farelo-aveia",
        "lanche-complemento": "lanche-cacau-po",
      },
    };

    const lanche = mealPlanData.meals.find(meal => meal.key === "lanche");
    expect(lanche).toBeDefined();

    const resolved = getResolvedMealSelection(
      lanche!,
      planner.profile,
      planner.today
    );

    expect(resolved.items.map(item => item.name)).toEqual([
      "Leite de amêndoa",
      "Morango",
      "Farelo de aveia",
      "Cacau em pó",
    ]);
    expect(resolved.appliedSubstitutions).toEqual({
      "lanche-base-cremosa": expect.objectContaining({
        name: "Leite de amêndoa",
      }),
      "lanche-fruta": expect.objectContaining({
        name: "Morango",
      }),
      "lanche-carbo": expect.objectContaining({
        name: "Farelo de aveia",
      }),
      "lanche-complemento": expect.objectContaining({
        name: "Cacau em pó",
      }),
    });

    const groups = buildWeeklyShoppingGroups(mealPlanData, planner);
    expect(
      groups.find(group => group.key === "laticinios-bebidas")?.items
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Leite de amêndoa",
          weeklyPortion: "7 x 240 ml",
        }),
      ])
    );
    expect(groups.find(group => group.key === "frutas")?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Morango",
          weeklyPortion: "7 x 10 unidades médias (120 g)",
        }),
      ])
    );
  });

  it("applies a swap-map selection by switching the meal to base mode", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    planner.today.activeVariantByMeal = {
      almoco: "almoco-vegana",
    };

    const next = applyMealSubstitutionSelection(
      planner,
      "almoco",
      "almoco-carbo",
      "almoco-arroz"
    );

    expect(next.today.activeVariantByMeal.almoco).toBe("base");
    expect(next.today.selectedSubstitutionsByMeal.almoco).toEqual({
      "almoco-carbo": "almoco-arroz",
    });
  });

  it("clears a swap-map selection for a slot", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    planner.today.selectedSubstitutionsByMeal = {
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    };

    const next = applyMealSubstitutionSelection(
      planner,
      "jantar",
      "jantar-carbo",
      null
    );

    expect(next.today.selectedSubstitutionsByMeal.jantar).toEqual({});
  });

  it("derives swap-map groups only from actionable substitutions for the active meal", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    const almoco = mealPlanData.meals.find(meal => meal.key === "almoco");

    expect(almoco).toBeDefined();

    const groups = getInteractiveSwapMapGroups(almoco!, planner);

    expect(
      getMealsWithSubstitutions(mealPlanData).map(meal => meal.key)
    ).toEqual(["cafe", "almoco", "lanche", "jantar"]);
    expect(groups.map(group => group.slotId)).toEqual([
      "almoco-carbo",
      "almoco-proteina",
    ]);
    expect(groups.map(group => group.title)).toEqual([
      "Troque Abóbora cabotiá cozida",
      "Troque Filé de frango grelhado",
    ]);
  });

  it("updates the weekly shopping list when the swap map changes a substitution", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    const next = applyMealSubstitutionSelection(
      planner,
      "almoco",
      "almoco-carbo",
      "almoco-arroz"
    );

    const groups = buildWeeklyShoppingGroups(mealPlanData, next);
    const carboidratos = groups.find(group => group.key === "carboidratos");

    expect(carboidratos?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Arroz branco ou integral",
          weeklyPortion: "7 x 100 g",
        }),
      ])
    );
  });

  it("salva o resumo com Base com N ajustes quando houver duas ou mais trocas", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    planner.today.activeVariantByMeal = {
      lanche: "base",
    };
    planner.today.selectedSubstitutionsByMeal = {
      lanche: {
        "lanche-base-cremosa": "lanche-leite-amendoa",
        "lanche-fruta": "lanche-morango",
      },
    };

    const lanche = mealPlanData.meals.find(meal => meal.key === "lanche");
    expect(lanche).toBeDefined();

    const favorite = createSavedMealComposition(
      lanche!,
      planner,
      new Date("2026-04-10T12:00:00")
    );

    expect(favorite.label).toBe("Lanche da tarde · Base com 2 ajustes");
    expect(favorite.substitutionSelections).toEqual({
      "lanche-base-cremosa": "lanche-leite-amendoa",
      "lanche-fruta": "lanche-morango",
    });
  });

  it("counts only active swaps for meals currently resolved on the base plan", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    planner.today.activeVariantByMeal = {
      almoco: "base",
      jantar: "jantar-vegana",
    };
    planner.today.selectedSubstitutionsByMeal = {
      almoco: {
        "almoco-carbo": "almoco-arroz",
        "almoco-proteina": "almoco-tilapia",
      },
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    };

    expect(getActiveSwapCountByMeal(mealPlanData, planner, "cafe")).toBe(0);
    expect(getActiveSwapCountByMeal(mealPlanData, planner, "almoco")).toBe(2);
    expect(getActiveSwapCountByMeal(mealPlanData, planner, "jantar")).toBe(0);
  });

  it("returns a flattened summary of active substitutions with meal labels", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    planner.today.activeVariantByMeal = {
      cafe: "base",
      jantar: "base",
    };
    planner.today.selectedSubstitutionsByMeal = {
      cafe: {
        "cafe-fruta": "cafe-mamao",
      },
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    };

    expect(getActiveSwapSummaryEntries(mealPlanData, planner)).toEqual([
      {
        mealKey: "cafe",
        mealLabel: "Café da manhã",
        slotId: "cafe-fruta",
        from: "Melão",
        selectedOptionId: "cafe-mamao",
        selectedOptionName: "Mamão",
      },
      {
        mealKey: "jantar",
        mealLabel: "Jantar",
        slotId: "jantar-carbo",
        from: "Batata inglesa assada",
        selectedOptionId: "jantar-arroz",
        selectedOptionName: "Arroz branco ou integral",
      },
    ]);
  });

  it("clears one meal swap set without touching other meals", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    planner.today.activeVariantByMeal = {
      almoco: "base",
      jantar: "base",
    };
    planner.today.selectedSubstitutionsByMeal = {
      almoco: {
        "almoco-carbo": "almoco-arroz",
      },
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    };

    const next = clearMealSubstitutionSelections(planner, "almoco");

    expect(next.today.activeVariantByMeal.almoco).toBe("base");
    expect(next.today.selectedSubstitutionsByMeal.almoco).toEqual({});
    expect(next.today.selectedSubstitutionsByMeal.jantar).toEqual({
      "jantar-carbo": "jantar-arroz",
    });
  });

  it("migrates a persisted V2 payload into the V3 storage shape with safe defaults", () => {
    const storage = createMockStorage();

    storage.setItem(
      MEAL_PLANNER_STORAGE_KEY,
      JSON.stringify({
        version: 2,
        profile: {
          weightKg: 61,
          goal: "constancia",
          foodStyle: "padrao",
          restrictions: [],
        },
        today: {
          dateKey: "2026-04-10",
          completedMeals: ["cafe"],
          waterMl: 1200,
          activeVariantByMeal: {
            lanche: "lanche-atalho-pratico",
          },
          selectedSubstitutionsByMeal: {},
        },
        history: [
          {
            dateKey: "2026-04-09",
            completedMealCount: 3,
            waterMl: 2100,
            completionPct: 75,
          },
        ],
      })
    );

    const migrated = readMealPlannerStorage(
      storage,
      new Date("2026-04-10T09:00:00")
    );

    expect(migrated.version).toBe(3);
    expect(migrated.favorites).toEqual([]);
    expect(migrated.ui.activeMealFilter).toBe("todas");
    expect(migrated.mealPrep.weekKey).toBe(
      getMealPlannerWeekKey(new Date("2026-04-10T09:00:00"))
    );
    expect(migrated.mealPrep.completedStepIds).toEqual([]);
    expect(migrated.today.completedMeals).toEqual(["cafe"]);
    expect(migrated.history).toHaveLength(1);
  });

  it("creates, toggles and reapplies favorite meal compositions without duplicates", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    planner.profile = {
      weightKg: 60,
      goal: "praticidade",
      foodStyle: "padrao",
      restrictions: [],
    };
    planner.today.activeVariantByMeal = {
      lanche: "lanche-atalho-pratico",
    };

    const lanche = mealPlanData.meals.find(meal => meal.key === "lanche");
    expect(lanche).toBeDefined();

    const favorite = createSavedMealComposition(
      lanche!,
      planner,
      new Date("2026-04-10T12:00:00")
    );

    const withFavorite = toggleFavoriteComposition(planner, favorite);
    expect(withFavorite.favorites).toHaveLength(1);
    expect(withFavorite.favorites[0]).toMatchObject({
      mealKey: "lanche",
      sourceMode: "variant",
      variantId: "lanche-atalho-pratico",
    });

    const deduped = toggleFavoriteComposition(withFavorite, favorite);
    expect(deduped.favorites).toEqual([]);

    const baseFavorite = createSavedMealComposition(
      mealPlanData.meals.find(meal => meal.key === "jantar")!,
      {
        ...planner,
        today: {
          ...planner.today,
          activeVariantByMeal: {
            jantar: "base",
          },
          selectedSubstitutionsByMeal: {
            jantar: {
              "jantar-carbo": "jantar-arroz",
            },
          },
        },
      },
      new Date("2026-04-10T12:05:00")
    );

    const reapplied = applyFavoriteComposition(
      planner,
      toggleFavoriteComposition(planner, baseFavorite).favorites[0]
    );

    expect(reapplied.today.activeVariantByMeal.jantar).toBe("base");
    expect(reapplied.today.selectedSubstitutionsByMeal.jantar).toEqual({
      "jantar-carbo": "jantar-arroz",
    });
  });

  it("filters visible meals by favorites, pending state and planner tags", () => {
    const planner = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    planner.profile = {
      weightKg: 60,
      goal: "praticidade",
      foodStyle: "padrao",
      restrictions: [],
    };
    planner.today.completedMeals = ["cafe", "lanche"];

    const cafe = mealPlanData.meals.find(meal => meal.key === "cafe");
    const favorite = createSavedMealComposition(
      cafe!,
      planner,
      new Date("2026-04-10T12:00:00")
    );
    planner.favorites = [favorite];

    planner.ui.activeMealFilter = "favoritas";
    expect(
      getFilteredMeals(mealPlanData, planner).map(meal => meal.key)
    ).toEqual(["cafe"]);

    planner.ui.activeMealFilter = "pendentes";
    expect(
      getFilteredMeals(mealPlanData, planner).map(meal => meal.key)
    ).toEqual(["almoco", "jantar"]);

    planner.ui.activeMealFilter = "rapidas";
    expect(
      getFilteredMeals(mealPlanData, planner).map(meal => meal.key)
    ).toEqual(["cafe", "lanche"]);

    planner.ui.activeMealFilter = "saciedade";
    expect(
      getFilteredMeals(mealPlanData, planner).map(meal => meal.key)
    ).toEqual(["almoco", "jantar"]);
  });

  it("builds a richer weekly summary and resets meal prep only when the week changes", () => {
    const storage = createMockStorage();

    storage.setItem(
      MEAL_PLANNER_STORAGE_KEY,
      JSON.stringify({
        version: 3,
        profile: {
          weightKg: 61,
          goal: "constancia",
          foodStyle: "padrao",
          restrictions: [],
        },
        today: {
          dateKey: "2026-04-13",
          completedMeals: ["cafe", "almoco", "lanche"],
          waterMl: 2200,
          activeVariantByMeal: {},
          selectedSubstitutionsByMeal: {},
        },
        history: [
          {
            dateKey: "2026-04-12",
            completedMealCount: 4,
            waterMl: 2500,
            completionPct: 100,
          },
          {
            dateKey: "2026-04-11",
            completedMealCount: 3,
            waterMl: 2100,
            completionPct: 75,
          },
        ],
        favorites: [
          {
            id: "favorite-cafe-base",
            mealKey: "cafe",
            label: "Café da manhã · Base",
            sourceMode: "base",
            variantId: null,
            substitutionSelections: {},
            createdAt: "2026-04-11T10:00:00.000Z",
          },
        ],
        ui: {
          activeMealFilter: "todas",
        },
        mealPrep: {
          weekKey: "2026-04-13",
          completedStepIds: ["proteina-base", "carbo-base"],
        },
      })
    );

    const sameWeek = readMealPlannerStorage(
      storage,
      new Date("2026-04-13T09:00:00")
    );
    expect(sameWeek.mealPrep.completedStepIds).toEqual([
      "proteina-base",
      "carbo-base",
    ]);

    const nextWeek = readMealPlannerStorage(
      storage,
      new Date("2026-04-20T09:00:00")
    );
    expect(nextWeek.mealPrep.weekKey).toBe(
      getMealPlannerWeekKey(new Date("2026-04-20T09:00:00"))
    );
    expect(nextWeek.mealPrep.completedStepIds).toEqual([]);
    expect(nextWeek.favorites).toHaveLength(1);

    const summary = getWeeklySummary(sameWeek);
    expect(summary.daysTracked).toBe(3);
    expect(summary.totalWaterMl).toBe(6800);
    expect(summary.averageCompletionPct).toBe(83);
    expect(summary.streakDays).toBe(3);
    expect(summary.bestDayCompletionPct).toBe(100);
  });
});
