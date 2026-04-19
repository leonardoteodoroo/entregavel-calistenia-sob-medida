import {
  mealPlanData,
  shoppingCategoryLabels,
  type MealDefinition,
  type MealFilterKey,
  type MealItem,
  type MealKey,
  type MealPlanData,
  type MealPlannerFoodStyle,
  type MealPlannerGoal,
  type MealPlannerRestrictionKey,
  type MealPlannerTag,
  type MealSubstitutionOption,
  type MealVariant,
  type ShoppingCategory,
} from "./mealPlanData";

export const MEAL_PLANNER_STORAGE_KEY = "cf-meal-planner-v2";
export const MEAL_PLANNER_STORAGE_VERSION = 3;

export interface MealPlannerProfile {
  weightKg: number;
  goal: MealPlannerGoal;
  foodStyle: MealPlannerFoodStyle;
  restrictions: MealPlannerRestrictionKey[];
}

export interface MealPlannerDayState {
  dateKey: string;
  completedMeals: MealKey[];
  waterMl: number;
  activeVariantByMeal: Partial<Record<MealKey, "base" | string>>;
  selectedSubstitutionsByMeal: Partial<Record<MealKey, Record<string, string>>>;
}

export interface MealPlannerHistoryEntry {
  dateKey: string;
  completedMealCount: number;
  waterMl: number;
  completionPct: number;
}

export interface SavedMealComposition {
  id: string;
  mealKey: MealKey;
  label: string;
  sourceMode: "base" | "variant";
  variantId: string | null;
  substitutionSelections: Record<string, string>;
  createdAt: string;
}

export interface MealPlannerUiState {
  activeMealFilter: MealFilterKey;
}

export interface WeeklyMealPrepState {
  weekKey: string;
  completedStepIds: string[];
}

export interface MealPlannerStorage {
  version: number;
  profile: MealPlannerProfile | null;
  today: MealPlannerDayState;
  history: MealPlannerHistoryEntry[];
  favorites: SavedMealComposition[];
  ui: MealPlannerUiState;
  mealPrep: WeeklyMealPrepState;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface ResolvedMealSelection {
  meal: MealDefinition;
  mode: "base" | "variant";
  activeVariant: MealVariant | null;
  items: MealItem[];
  appliedSubstitutions: Partial<Record<string, MealSubstitutionOption>>;
}

export interface WeeklyShoppingItem {
  key: string;
  name: string;
  category: ShoppingCategory;
  dailyOccurrences: number;
  weeklyPortion: string;
}

export interface WeeklyShoppingGroup {
  key: ShoppingCategory;
  title: string;
  items: WeeklyShoppingItem[];
}

export interface WeeklySummary {
  daysTracked: number;
  averageCompletionPct: number;
  totalWaterMl: number;
  streakDays: number;
  bestDayCompletionPct: number;
}

export interface InteractiveSwapMapGroup {
  slotId: string;
  title: string;
  from: string;
  selectedOptionId: string | null;
  options: Array<MealSubstitutionOption & { active: boolean }>;
}

export interface ActiveSwapSummaryEntry {
  mealKey: MealKey;
  mealLabel: string;
  slotId: string;
  from: string;
  selectedOptionId: string;
  selectedOptionName: string;
}

export const mealPlannerFilterLabels: Record<MealFilterKey, string> = {
  todas: "Todas",
  favoritas: "Salvas",
  rapidas: "Rápidas",
  saciedade: "Mais saciantes",
  pendentes: "Pendentes",
};

const VALID_MEAL_KEYS = new Set<MealKey>([
  "cafe",
  "almoco",
  "lanche",
  "jantar",
]);
const VALID_GOALS = new Set<MealPlannerGoal>([
  "constancia",
  "saciedade",
  "praticidade",
]);
const VALID_FOOD_STYLES = new Set<MealPlannerFoodStyle>([
  "padrao",
  "vegetariano",
  "vegano",
]);
const VALID_RESTRICTIONS = new Set<MealPlannerRestrictionKey>([
  "sem_lactose",
  "sem_gluten",
]);
const VALID_FILTERS = new Set<MealFilterKey>([
  "todas",
  "favoritas",
  "rapidas",
  "saciedade",
  "pendentes",
]);
const VALID_MEAL_PREP_STEP_IDS = new Set(
  mealPlanData.mealPrepSteps.map(step => step.id)
);

const SHOPPING_CATEGORY_ORDER: ShoppingCategory[] = [
  "proteinas",
  "carboidratos",
  "frutas",
  "vegetais",
  "laticinios-bebidas",
  "gorduras-complementos",
  "praticidade",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function addDays(dateKey: string, days: number): string {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return getLocalDateKey(date);
}

export function getMealPlannerWeekKey(date = new Date()): string {
  const normalized = new Date(date);
  const day = normalized.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  normalized.setDate(normalized.getDate() + diffToMonday);
  normalized.setHours(0, 0, 0, 0);
  return getLocalDateKey(normalized);
}

export function createEmptyMealPlannerDayState(
  dateKey = getLocalDateKey()
): MealPlannerDayState {
  return {
    dateKey,
    completedMeals: [],
    waterMl: 0,
    activeVariantByMeal: {},
    selectedSubstitutionsByMeal: {},
  };
}

export function createInitialMealPrepState(
  date = new Date()
): WeeklyMealPrepState {
  return {
    weekKey: getMealPlannerWeekKey(date),
    completedStepIds: [],
  };
}

export function createInitialMealPlannerStorage(
  date = new Date()
): MealPlannerStorage {
  return {
    version: MEAL_PLANNER_STORAGE_VERSION,
    profile: null,
    today: createEmptyMealPlannerDayState(getLocalDateKey(date)),
    history: [],
    favorites: [],
    ui: {
      activeMealFilter: "todas",
    },
    mealPrep: createInitialMealPrepState(date),
  };
}

function sanitizeProfile(raw: unknown): MealPlannerProfile | null {
  if (!isRecord(raw)) return null;
  if (typeof raw.weightKg !== "number" || raw.weightKg <= 0) return null;
  if (!VALID_GOALS.has(raw.goal as MealPlannerGoal)) return null;
  if (!VALID_FOOD_STYLES.has(raw.foodStyle as MealPlannerFoodStyle))
    return null;

  const restrictions = Array.isArray(raw.restrictions)
    ? Array.from(
        new Set(
          raw.restrictions.filter((item): item is MealPlannerRestrictionKey =>
            VALID_RESTRICTIONS.has(item as MealPlannerRestrictionKey)
          )
        )
      )
    : [];

  return {
    weightKg: raw.weightKg,
    goal: raw.goal as MealPlannerGoal,
    foodStyle: raw.foodStyle as MealPlannerFoodStyle,
    restrictions,
  };
}

function sanitizeCompletedMeals(raw: unknown): MealKey[] {
  if (!Array.isArray(raw)) return [];

  return Array.from(
    new Set(
      raw.filter((item): item is MealKey =>
        VALID_MEAL_KEYS.has(item as MealKey)
      )
    )
  );
}

function sanitizeActiveVariantByMeal(
  raw: unknown
): Partial<Record<MealKey, "base" | string>> {
  if (!isRecord(raw)) return {};

  const result: Partial<Record<MealKey, "base" | string>> = {};
  for (const [mealKey, value] of Object.entries(raw)) {
    if (!VALID_MEAL_KEYS.has(mealKey as MealKey)) continue;
    if (typeof value !== "string" || value.length === 0) continue;
    result[mealKey as MealKey] = value === "base" ? "base" : value;
  }

  return result;
}

function sanitizeSelectedSubstitutions(
  raw: unknown
): Partial<Record<MealKey, Record<string, string>>> {
  if (!isRecord(raw)) return {};

  const result: Partial<Record<MealKey, Record<string, string>>> = {};
  for (const [mealKey, value] of Object.entries(raw)) {
    if (!VALID_MEAL_KEYS.has(mealKey as MealKey) || !isRecord(value)) continue;

    const slotSelections: Record<string, string> = {};
    for (const [slotId, optionId] of Object.entries(value)) {
      if (typeof optionId === "string" && optionId.length > 0) {
        slotSelections[slotId] = optionId;
      }
    }

    result[mealKey as MealKey] = slotSelections;
  }

  return result;
}

function sanitizeToday(raw: unknown, dateKey: string): MealPlannerDayState {
  if (!isRecord(raw)) {
    return createEmptyMealPlannerDayState(dateKey);
  }

  return {
    dateKey: typeof raw.dateKey === "string" ? raw.dateKey : dateKey,
    completedMeals: sanitizeCompletedMeals(raw.completedMeals),
    waterMl:
      typeof raw.waterMl === "number" && raw.waterMl > 0
        ? Math.round(raw.waterMl)
        : 0,
    activeVariantByMeal: sanitizeActiveVariantByMeal(raw.activeVariantByMeal),
    selectedSubstitutionsByMeal: sanitizeSelectedSubstitutions(
      raw.selectedSubstitutionsByMeal
    ),
  };
}

function sanitizeHistory(raw: unknown): MealPlannerHistoryEntry[] {
  if (!Array.isArray(raw)) return [];

  const result: MealPlannerHistoryEntry[] = [];
  for (const entry of raw) {
    if (!isRecord(entry)) continue;
    if (typeof entry.dateKey !== "string") continue;
    if (
      typeof entry.completedMealCount !== "number" ||
      typeof entry.waterMl !== "number" ||
      typeof entry.completionPct !== "number"
    ) {
      continue;
    }

    result.push({
      dateKey: entry.dateKey,
      completedMealCount: Math.max(0, Math.round(entry.completedMealCount)),
      waterMl: Math.max(0, Math.round(entry.waterMl)),
      completionPct: Math.min(
        100,
        Math.max(0, Math.round(entry.completionPct))
      ),
    });
  }

  return result.sort((a, b) => b.dateKey.localeCompare(a.dateKey)).slice(0, 7);
}

function sanitizeFavorites(raw: unknown): SavedMealComposition[] {
  if (!Array.isArray(raw)) return [];

  const favorites: SavedMealComposition[] = [];
  for (const item of raw) {
    if (!isRecord(item)) continue;
    if (!VALID_MEAL_KEYS.has(item.mealKey as MealKey)) continue;
    if (item.sourceMode !== "base" && item.sourceMode !== "variant") continue;
    if (typeof item.label !== "string" || item.label.length === 0) continue;
    if (
      !isRecord(item.substitutionSelections) &&
      item.substitutionSelections !== undefined
    ) {
      continue;
    }

    const substitutionSelections: Record<string, string> = {};
    if (isRecord(item.substitutionSelections)) {
      for (const [slotId, optionId] of Object.entries(
        item.substitutionSelections
      )) {
        if (typeof optionId === "string" && optionId.length > 0) {
          substitutionSelections[slotId] = optionId;
        }
      }
    }

    favorites.push({
      id: typeof item.id === "string" && item.id.length > 0 ? item.id : "",
      mealKey: item.mealKey as MealKey,
      label: item.label,
      sourceMode: item.sourceMode,
      variantId: typeof item.variantId === "string" ? item.variantId : null,
      substitutionSelections,
      createdAt:
        typeof item.createdAt === "string" && item.createdAt.length > 0
          ? item.createdAt
          : new Date(0).toISOString(),
    });
  }

  return favorites;
}

function sanitizeUi(raw: unknown): MealPlannerUiState {
  if (!isRecord(raw)) {
    return { activeMealFilter: "todas" };
  }

  return {
    activeMealFilter: VALID_FILTERS.has(raw.activeMealFilter as MealFilterKey)
      ? (raw.activeMealFilter as MealFilterKey)
      : "todas",
  };
}

function sanitizeMealPrep(
  raw: unknown,
  date = new Date()
): WeeklyMealPrepState {
  if (!isRecord(raw)) {
    return createInitialMealPrepState(date);
  }

  const completedStepIds = Array.isArray(raw.completedStepIds)
    ? Array.from(
        new Set(
          raw.completedStepIds.filter(
            (item): item is string =>
              typeof item === "string" && VALID_MEAL_PREP_STEP_IDS.has(item)
          )
        )
      )
    : [];

  return {
    weekKey:
      typeof raw.weekKey === "string" && raw.weekKey.length > 0
        ? raw.weekKey
        : getMealPlannerWeekKey(date),
    completedStepIds,
  };
}

export function calculateCompletionPct(completedMealCount: number): number {
  return Math.round((completedMealCount / mealPlanData.meals.length) * 100);
}

export function createHistoryEntry(
  day: MealPlannerDayState
): MealPlannerHistoryEntry {
  return {
    dateKey: day.dateKey,
    completedMealCount: day.completedMeals.length,
    waterMl: day.waterMl,
    completionPct: calculateCompletionPct(day.completedMeals.length),
  };
}

export function ensureMealPlannerRollover(
  storage: MealPlannerStorage,
  date = new Date()
): MealPlannerStorage {
  const currentDateKey = getLocalDateKey(date);
  const currentWeekKey = getMealPlannerWeekKey(date);

  const nextStorage =
    storage.today.dateKey === currentDateKey
      ? {
          ...storage,
          history: storage.history.slice(0, 7),
        }
      : {
          ...storage,
          history: [
            createHistoryEntry(storage.today),
            ...storage.history.filter(
              entry => entry.dateKey !== storage.today.dateKey
            ),
          ].slice(0, 7),
          today: createEmptyMealPlannerDayState(currentDateKey),
        };

  return {
    ...nextStorage,
    favorites: nextStorage.favorites,
    ui: nextStorage.ui,
    mealPrep:
      nextStorage.mealPrep.weekKey === currentWeekKey
        ? nextStorage.mealPrep
        : createInitialMealPrepState(date),
  };
}

function getWindowStorage(): StorageLike | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

export function readMealPlannerStorage(
  storage: StorageLike | null = getWindowStorage(),
  date = new Date()
): MealPlannerStorage {
  if (!storage) return createInitialMealPlannerStorage(date);

  try {
    const rawValue = storage.getItem(MEAL_PLANNER_STORAGE_KEY);
    if (!rawValue) {
      return createInitialMealPlannerStorage(date);
    }

    const parsed = JSON.parse(rawValue) as unknown;
    if (!isRecord(parsed)) {
      return createInitialMealPlannerStorage(date);
    }

    const sanitized: MealPlannerStorage = {
      version: MEAL_PLANNER_STORAGE_VERSION,
      profile: sanitizeProfile(parsed.profile),
      today: sanitizeToday(parsed.today, getLocalDateKey(date)),
      history: sanitizeHistory(parsed.history),
      favorites: sanitizeFavorites(parsed.favorites),
      ui: sanitizeUi(parsed.ui),
      mealPrep: sanitizeMealPrep(parsed.mealPrep, date),
    };

    return ensureMealPlannerRollover(sanitized, date);
  } catch {
    return createInitialMealPlannerStorage(date);
  }
}

export function writeMealPlannerStorage(
  state: MealPlannerStorage,
  storage: StorageLike | null = getWindowStorage()
): void {
  if (!storage) return;

  storage.setItem(
    MEAL_PLANNER_STORAGE_KEY,
    JSON.stringify({
      ...state,
      version: MEAL_PLANNER_STORAGE_VERSION,
      history: state.history.slice(0, 7),
      mealPrep: {
        ...state.mealPrep,
        completedStepIds: state.mealPrep.completedStepIds.filter(stepId =>
          VALID_MEAL_PREP_STEP_IDS.has(stepId)
        ),
      },
    })
  );
}

export function getRecommendedVariantId(
  meal: MealDefinition,
  profile: MealPlannerProfile | null
): string | undefined {
  if (!profile) return undefined;

  const styleVariant = meal.variants.find(variant =>
    variant.defaultForFoodStyles?.includes(profile.foodStyle)
  );
  if (styleVariant) {
    return styleVariant.id;
  }

  if (profile.restrictions.length === 1) {
    const [restriction] = profile.restrictions;
    return meal.variants.find(variant =>
      variant.supportedRestrictions?.includes(restriction)
    )?.id;
  }

  if (profile.restrictions.length > 1) {
    return meal.variants.find(variant =>
      profile.restrictions.every(restriction =>
        variant.supportedRestrictions?.includes(restriction)
      )
    )?.id;
  }

  return undefined;
}

export function getResolvedMealSelection(
  meal: MealDefinition,
  profile: MealPlannerProfile | null,
  today: MealPlannerDayState
): ResolvedMealSelection {
  const explicitMode = today.activeVariantByMeal[meal.key];
  const recommendedVariantId =
    explicitMode === "base"
      ? undefined
      : getRecommendedVariantId(meal, profile);
  const activeVariantId =
    explicitMode && explicitMode !== "base"
      ? explicitMode
      : recommendedVariantId;
  const activeVariant =
    activeVariantId !== undefined
      ? (meal.variants.find(variant => variant.id === activeVariantId) ?? null)
      : null;

  if (activeVariant) {
    return {
      meal,
      mode: "variant",
      activeVariant,
      items: activeVariant.items,
      appliedSubstitutions: {},
    };
  }

  const selectedOptions = today.selectedSubstitutionsByMeal[meal.key] ?? {};
  const appliedSubstitutions: Partial<Record<string, MealSubstitutionOption>> =
    {};

  const items = meal.baseItems.map(item => {
    const substitutionSlot = meal.substitutions.find(
      slot => slot.from === item.name
    );
    if (!substitutionSlot) return item;

    const selectedOptionId = selectedOptions[substitutionSlot.slotId];
    const selectedOption = substitutionSlot.options.find(
      option => option.id === selectedOptionId
    );

    if (!selectedOption) return item;
    appliedSubstitutions[substitutionSlot.slotId] = selectedOption;
    return selectedOption;
  });

  return {
    meal,
    mode: "base",
    activeVariant: null,
    items,
    appliedSubstitutions,
  };
}

function getFavoriteSignature(favorite: SavedMealComposition): string {
  const normalizedSelections = Object.entries(favorite.substitutionSelections)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([slotId, optionId]) => `${slotId}:${optionId}`)
    .join("|");

  return [
    favorite.mealKey,
    favorite.sourceMode,
    favorite.variantId ?? "base",
    normalizedSelections,
  ].join("::");
}

function getMealLabelSuffix(
  meal: MealDefinition,
  selection: ResolvedMealSelection
): string {
  if (selection.mode === "variant" && selection.activeVariant) {
    return selection.activeVariant.label;
  }

  const substitutions = Object.values(selection.appliedSubstitutions);
  if (substitutions.length === 0) return "Base";
  if (substitutions.length === 1) {
    const first = substitutions[0];
    if (!first) return "Base";
    return `Base com ${first.name.toLowerCase()}`;
  }

  return `Base com ${substitutions.length} ajustes`;
}

export function createSavedMealComposition(
  meal: MealDefinition,
  storage: MealPlannerStorage,
  createdAt = new Date()
): SavedMealComposition {
  const selection = getResolvedMealSelection(
    meal,
    storage.profile,
    storage.today
  );

  return {
    id: `${meal.key}-${createdAt.getTime()}`,
    mealKey: meal.key,
    label: `${meal.label} · ${getMealLabelSuffix(meal, selection)}`,
    sourceMode: selection.mode,
    variantId: selection.activeVariant?.id ?? null,
    substitutionSelections:
      selection.mode === "base"
        ? {
            ...(storage.today.selectedSubstitutionsByMeal[meal.key] ?? {}),
          }
        : {},
    createdAt: createdAt.toISOString(),
  };
}

export function toggleFavoriteComposition(
  storage: MealPlannerStorage,
  favorite: SavedMealComposition
): MealPlannerStorage {
  const targetSignature = getFavoriteSignature(favorite);
  const existing = storage.favorites.find(
    item => getFavoriteSignature(item) === targetSignature
  );

  return {
    ...storage,
    favorites: existing
      ? storage.favorites.filter(
          item => getFavoriteSignature(item) !== targetSignature
        )
      : [favorite, ...storage.favorites],
  };
}

export function applyFavoriteComposition(
  storage: MealPlannerStorage,
  favorite: SavedMealComposition
): MealPlannerStorage {
  return {
    ...storage,
    today: {
      ...storage.today,
      activeVariantByMeal: {
        ...storage.today.activeVariantByMeal,
        [favorite.mealKey]:
          favorite.sourceMode === "variant" && favorite.variantId
            ? favorite.variantId
            : "base",
      },
      selectedSubstitutionsByMeal: {
        ...storage.today.selectedSubstitutionsByMeal,
        [favorite.mealKey]:
          favorite.sourceMode === "base" ? favorite.substitutionSelections : {},
      },
    },
  };
}

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

export function getMealsWithSubstitutions(
  data: MealPlanData
): MealDefinition[] {
  return data.meals.filter(meal => meal.substitutions.length > 0);
}

export function getInteractiveSwapMapGroups(
  meal: MealDefinition,
  storage: MealPlannerStorage
): InteractiveSwapMapGroup[] {
  const selectedSlots =
    storage.today.selectedSubstitutionsByMeal[meal.key] ?? {};

  return meal.substitutions.map(slot => ({
    slotId: slot.slotId,
    title: `Troque ${slot.from}`,
    from: slot.from,
    selectedOptionId: selectedSlots[slot.slotId] ?? null,
    options: slot.options.map(option => ({
      ...option,
      active: selectedSlots[slot.slotId] === option.id,
    })),
  }));
}

export function getActiveSwapCountByMeal(
  data: MealPlanData,
  storage: MealPlannerStorage,
  mealKey: MealKey
): number {
  const meal = data.meals.find(candidate => candidate.key === mealKey);
  if (!meal) return 0;

  const resolved = getResolvedMealSelection(
    meal,
    storage.profile,
    storage.today
  );
  return Object.keys(resolved.appliedSubstitutions).length;
}

export function getActiveSwapSummaryEntries(
  data: MealPlanData,
  storage: MealPlannerStorage
): ActiveSwapSummaryEntry[] {
  return data.meals.flatMap(meal => {
    const resolved = getResolvedMealSelection(
      meal,
      storage.profile,
      storage.today
    );

    return Object.entries(resolved.appliedSubstitutions).flatMap(
      ([slotId, option]) => {
        if (!option) return [];

        const slot = meal.substitutions.find(
          candidate => candidate.slotId === slotId
        );
        if (!slot) return [];

        return [
          {
            mealKey: meal.key,
            mealLabel: meal.label,
            slotId,
            from: slot.from,
            selectedOptionId: option.id,
            selectedOptionName: option.name,
          },
        ];
      }
    );
  });
}

export function clearMealSubstitutionSelections(
  storage: MealPlannerStorage,
  mealKey: MealKey
): MealPlannerStorage {
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
        [mealKey]: {},
      },
    },
  };
}

function getActivePlannerTags(
  meal: MealDefinition,
  storage: MealPlannerStorage
): MealPlannerTag[] {
  const resolved = getResolvedMealSelection(
    meal,
    storage.profile,
    storage.today
  );
  return resolved.activeVariant?.plannerTags?.length
    ? resolved.activeVariant.plannerTags
    : meal.plannerTags;
}

export function getFilteredMeals(
  data: MealPlanData,
  storage: MealPlannerStorage
): MealDefinition[] {
  const favoriteMealKeys = new Set(
    storage.favorites.map(favorite => favorite.mealKey)
  );

  switch (storage.ui.activeMealFilter) {
    case "favoritas":
      return data.meals.filter(meal => favoriteMealKeys.has(meal.key));
    case "pendentes":
      return data.meals.filter(
        meal => !storage.today.completedMeals.includes(meal.key)
      );
    case "rapidas":
      return data.meals.filter(meal =>
        getActivePlannerTags(meal, storage).includes("rapida")
      );
    case "saciedade":
      return data.meals.filter(meal =>
        getActivePlannerTags(meal, storage).includes("saciedade")
      );
    case "todas":
    default:
      return data.meals;
  }
}

export function buildWeeklyShoppingGroups(
  data: MealPlanData,
  storage: MealPlannerStorage
): WeeklyShoppingGroup[] {
  const grouped = new Map<
    ShoppingCategory,
    Map<string, WeeklyShoppingItem & { count: number; portion: string }>
  >();

  for (const meal of data.meals) {
    const resolved = getResolvedMealSelection(
      meal,
      storage.profile,
      storage.today
    );

    for (const item of resolved.items) {
      const category = item.category;
      const shoppingKey = item.shoppingKey ?? item.name;
      const aggregateKey = `${shoppingKey}::${item.portion}`;
      const categoryBucket = grouped.get(category) ?? new Map();
      const current = categoryBucket.get(aggregateKey);

      if (current) {
        current.count += 1;
        current.dailyOccurrences += 1;
        current.weeklyPortion = `${current.count * 7} x ${current.portion}`;
      } else {
        categoryBucket.set(aggregateKey, {
          key: aggregateKey,
          name: item.name,
          category,
          dailyOccurrences: 1,
          weeklyPortion: `7 x ${item.portion}`,
          count: 1,
          portion: item.portion,
        });
      }

      grouped.set(category, categoryBucket);
    }
  }

  return SHOPPING_CATEGORY_ORDER.flatMap(category => {
    const items = grouped.get(category);
    if (!items || items.size === 0) return [];

    return [
      {
        key: category,
        title: shoppingCategoryLabels[category],
        items: Array.from(items.values())
          .map(({ count: _count, portion: _portion, ...item }) => item)
          .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
      },
    ];
  });
}

export function getWeeklySummary(storage: MealPlannerStorage): WeeklySummary {
  const uniqueHistory = storage.history.filter(
    entry => entry.dateKey !== storage.today.dateKey
  );
  const entries = [createHistoryEntry(storage.today), ...uniqueHistory].sort(
    (a, b) => b.dateKey.localeCompare(a.dateKey)
  );

  const daysTracked = entries.length;
  const totalWaterMl = entries.reduce((sum, entry) => sum + entry.waterMl, 0);
  const averageCompletionPct =
    daysTracked > 0
      ? Math.round(
          entries.reduce((sum, entry) => sum + entry.completionPct, 0) /
            daysTracked
        )
      : 0;
  const bestDayCompletionPct = entries.reduce(
    (best, entry) => Math.max(best, entry.completionPct),
    0
  );

  let streakDays = 0;
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    if (entry.completionPct <= 0) break;

    if (index === 0) {
      streakDays += 1;
      continue;
    }

    const previousEntry = entries[index - 1];
    if (addDays(entry.dateKey, 1) === previousEntry.dateKey) {
      streakDays += 1;
      continue;
    }

    break;
  }

  return {
    daysTracked,
    averageCompletionPct,
    totalWaterMl,
    streakDays,
    bestDayCompletionPct,
  };
}
