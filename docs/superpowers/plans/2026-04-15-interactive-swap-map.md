# Interactive Swap Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `Mapa de trocas` into a real meal-specific substitution controller that updates `Se quiser trocar` and the weekly shopping list from the same state.

**Architecture:** Keep a single source of truth in `selectedSubstitutionsByMeal` and `activeVariantByMeal`. Add state helpers that apply substitutions from either the meal card or the swap map, and render the swap map from actual substitution slots for the selected meal instead of from the broad reference catalog. Avoid any `indisponível` UI state by showing only substitutions that are truly actionable for the active meal.

**Tech Stack:** React 19, TypeScript, Vitest, Vite, local state persisted in `mealPlannerState`

---

### Task 1: Centralize substitution state changes and swap-map derivation

**Files:**

- Modify: `client/src/lib/mealPlannerState.ts`
- Test: `client/src/lib/mealPlannerState.test.ts`

- [ ] **Step 1: Write the failing state tests**

Add tests for:

- applying a swap-map selection forces the target meal into `base` mode and stores the selected option
- clearing a swap-map selection removes the option id for the slot
- deriving swap-map groups for a meal returns only actionable slots and options from `meal.substitutions`

```ts
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
  const almoco = mealPlanData.meals.find(meal => meal.key === "almoco")!;

  const groups = getInteractiveSwapMapGroups(almoco, planner);

  expect(groups.map(group => group.key)).toEqual(["carboidratos", "proteinas"]);
  expect(groups[0]?.slots[0]?.slotId).toBe("almoco-carbo");
  expect(groups[1]?.slots[0]?.slotId).toBe("almoco-proteina");
});
```

- [ ] **Step 2: Run the state tests to verify RED**

Run:

```bash
npx vitest run client/src/lib/mealPlannerState.test.ts
```

Expected:

```text
FAIL  client/src/lib/mealPlannerState.test.ts
```

- [ ] **Step 3: Add minimal state helpers**

In `client/src/lib/mealPlannerState.ts`, add:

- `applyMealSubstitutionSelection(storage, mealKey, slotId, optionId)`
- `getMealsWithSubstitutions(data)`
- `getInteractiveSwapMapGroups(meal, storage)`

Implementation shape:

```ts
export function applyMealSubstitutionSelection(
  storage: MealPlannerStorage,
  mealKey: MealKey,
  slotId: string,
  optionId: string | null
): MealPlannerStorage {
  const mealSelections = {
    ...(storage.today.selectedSubstitutionsByMeal[mealKey] ?? {}),
  };

  if (optionId) {
    mealSelections[slotId] = optionId;
  } else {
    delete mealSelections[slotId];
  }

  return {
    ...storage,
    today: {
      ...storage.today,
      activeVariantByMeal: {
        ...storage.today.activeVariantByMeal,
        [mealKey]: "base",
      },
      selectedSubstitutionsByMeal: {
        ...storage.today.selectedSubstitutionsByMeal,
        [mealKey]: mealSelections,
      },
    },
  };
}
```

```ts
export function getMealsWithSubstitutions(
  data: MealPlanData
): MealDefinition[] {
  return data.meals.filter(meal => meal.substitutions.length > 0);
}
```

```ts
export function getInteractiveSwapMapGroups(
  meal: MealDefinition,
  storage: MealPlannerStorage
): Array<{
  key: string;
  title: string;
  slots: Array<{
    slotId: string;
    from: string;
    selectedOptionId: string | null;
    options: Array<MealSubstitutionOption & { active: boolean }>;
  }>;
}> {
  const selectedSlots =
    storage.today.selectedSubstitutionsByMeal[meal.key] ?? {};

  return meal.substitutions.map(slot => ({
    key: slot.slotId,
    title: `Troque ${slot.from}`,
    slots: [
      {
        slotId: slot.slotId,
        from: slot.from,
        selectedOptionId: selectedSlots[slot.slotId] ?? null,
        options: slot.options.map(option => ({
          ...option,
          active: selectedSlots[slot.slotId] === option.id,
        })),
      },
    ],
  }));
}
```

- [ ] **Step 4: Run the state tests to verify GREEN**

Run:

```bash
npx vitest run client/src/lib/mealPlannerState.test.ts
```

Expected:

```text
PASS  client/src/lib/mealPlannerState.test.ts
```

### Task 2: Replace the static swap catalog with a meal-specific interactive map

**Files:**

- Modify: `client/src/pages/MealPlanPage.tsx`
- Test: `client/src/pages/MealPlanPage.test.tsx`

- [ ] **Step 1: Write the failing page tests**

Add tests for:

- the page renders meal chips for the swap map
- the page renders slot labels such as `Troque Abóbora cabotiá cozida`
- the static broad-copy block is gone

```ts
expect(markup).toContain("Mapa de trocas");
expect(markup).toContain("Escolha a refeição que você quer ajustar");
expect(markup).toContain("Café da manhã");
expect(markup).toContain("Almoço");
expect(markup).toContain("Jantar");
expect(markup).toContain("Troque Melão");
expect(markup).not.toContain(
  "Referência rápida para variar o prato sem perder a lógica do plano."
);
```

- [ ] **Step 2: Run the page tests to verify RED**

Run:

```bash
npx vitest run client/src/pages/MealPlanPage.test.tsx
```

Expected:

```text
FAIL  client/src/pages/MealPlanPage.test.tsx
```

- [ ] **Step 3: Implement the interactive swap map UI**

In `client/src/pages/MealPlanPage.tsx`:

- import `applyMealSubstitutionSelection`, `getMealsWithSubstitutions`, and `getInteractiveSwapMapGroups`
- create `const swapMapMeals = getMealsWithSubstitutions(mealPlanData)`
- create local state `activeSwapMapMealKey`
- default it to the first meal with substitutions
- resolve `activeSwapMeal` and `swapMapGroups`
- replace the old `swapGroups.map(...)` section with:
  - meal chips
  - slot cards derived from `swapMapGroups`
  - buttons for `Manter original` and each real option
- when the user clicks an option, call the same state helper used by the meal card so the weekly shopping list updates automatically

Target state update shape:

```ts
onClick={() =>
  setPlannerState(current =>
    applyMealSubstitutionSelection(current, activeSwapMeal.key, slot.slotId, option.id)
  )
}
```

Use the same helper for meal-card substitutions:

```ts
onSelectSubstitution={(slotId, optionId) =>
  setPlannerState(current =>
    applyMealSubstitutionSelection(current, meal.key, slotId, optionId)
  )
}
```

- [ ] **Step 4: Run the page tests to verify GREEN**

Run:

```bash
npx vitest run client/src/pages/MealPlanPage.test.tsx
```

Expected:

```text
PASS  client/src/pages/MealPlanPage.test.tsx
```

### Task 3: Verify shopping-list relevance and full regression

**Files:**

- Modify: `client/src/lib/mealPlannerState.test.ts`
- Test: `client/src/lib/mealPlannerState.test.ts`
- Test: `client/src/pages/MealPlanPage.test.tsx`

- [ ] **Step 1: Add a shopping-list regression test driven by the new helper**

```ts
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
```

- [ ] **Step 2: Run the targeted tests**

Run:

```bash
npx vitest run client/src/lib/mealPlannerState.test.ts client/src/pages/MealPlanPage.test.tsx
```

Expected:

```text
2 files passed
```

- [ ] **Step 3: Run type-check and build verification**

Run:

```bash
npm run check
npm run build:pages
```

Expected:

```text
tsc --noEmit
vite build --base /
```

## Self-Review

- Spec coverage:
  - clickable swap map: covered in Task 2
  - sync with `Se quiser trocar`: covered in Task 2 by using the same helper
  - shopping-list relevance: covered in Task 3
  - no fake `indisponível` layer: covered in Architecture and Task 2
- Placeholder scan:
  - no `TODO`, `TBD`, or deferred logic left in steps
- Type consistency:
  - helper names and signatures are consistent across tasks: `applyMealSubstitutionSelection`, `getMealsWithSubstitutions`, `getInteractiveSwapMapGroups`
