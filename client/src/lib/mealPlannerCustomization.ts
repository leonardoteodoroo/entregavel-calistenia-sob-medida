import type {
  MealDefinition,
  MealItem,
  MealSubstitutionOption,
  MealKey,
  MealVariant,
} from "./mealPlanData";
import type { MealPlannerStorage } from "./mealPlannerState";
import { getResolvedMealSelection } from "./mealPlannerState";

export interface MealCustomizationDraft {
  mealKey: MealKey;
  activeVariantId: "base" | string;
  selectedOptions: Record<string, string>;
}

export interface MealCustomizationVariantChoice {
  id: "base" | string;
  label: string;
  active: boolean;
}

export interface MealCustomizationEditableOption
  extends MealSubstitutionOption {
  active: boolean;
}

export interface MealCustomizationEditableGroup {
  slotId: string;
  from: string;
  groupLabel: string;
  modalDescription: string;
  swapMapLabel: string;
  selectedOptionId: string | null;
  options: MealCustomizationEditableOption[];
}

export interface MealCustomizationViewModel {
  currentSummary: MealItem[];
  variantChoices: MealCustomizationVariantChoice[];
  editableGroups: MealCustomizationEditableGroup[];
  fixedItems: MealItem[];
}

function cloneSelections(selections: Record<string, string>): Record<string, string> {
  return { ...selections };
}

function getMealSubstitutionSelectionMap(
  meal: MealDefinition,
  selectedOptions: Record<string, string>
): Partial<Record<string, MealSubstitutionOption>> {
  const appliedSubstitutions: Partial<Record<string, MealSubstitutionOption>> =
    {};

  for (const slot of meal.substitutions) {
    const selectedOptionId = selectedOptions[slot.slotId];
    if (!selectedOptionId) continue;

    const selectedOption = slot.options.find(
      option => option.id === selectedOptionId
    );
    if (!selectedOption) continue;

    appliedSubstitutions[slot.slotId] = selectedOption;
  }

  return appliedSubstitutions;
}

function getResolvedBaseItems(
  meal: MealDefinition,
  selectedOptions: Record<string, string>
): MealItem[] {
  const appliedSubstitutions = getMealSubstitutionSelectionMap(
    meal,
    selectedOptions
  );

  return meal.baseItems.map(item => {
    const substitutionSlot = meal.substitutions.find(
      slot => slot.from === item.name
    );
    if (!substitutionSlot) return item;

    const selectedOption = appliedSubstitutions[substitutionSlot.slotId];
    return selectedOption ?? item;
  });
}

function getFixedBaseItems(meal: MealDefinition): MealItem[] {
  const editableSources = new Set(meal.substitutions.map(slot => slot.from));
  return meal.baseItems.filter(item => !editableSources.has(item.name));
}

function getVariantChoices(
  meal: MealDefinition,
  activeVariantId: "base" | string
): MealCustomizationVariantChoice[] {
  return [
    {
      id: "base",
      label: "Base",
      active: activeVariantId === "base",
    },
    ...meal.variants.map(variant => ({
      id: variant.id,
      label: variant.label,
      active: activeVariantId === variant.id,
    })),
  ];
}

function getVariantById(meal: MealDefinition, variantId: string): MealVariant | null {
  return meal.variants.find(candidate => candidate.id === variantId) ?? null;
}

export function createMealCustomizationDraft(
  meal: MealDefinition,
  storage: MealPlannerStorage
): MealCustomizationDraft {
  const resolved = getResolvedMealSelection(meal, storage.profile, storage.today);

  return {
    mealKey: meal.key,
    activeVariantId: resolved.activeVariant?.id ?? "base",
    selectedOptions: cloneSelections(
      storage.today.selectedSubstitutionsByMeal[meal.key] ?? {}
    ),
  };
}

export function applyDraftVariant(
  draft: MealCustomizationDraft,
  variantId: "base" | string
): MealCustomizationDraft {
  return {
    ...draft,
    activeVariantId: variantId,
    selectedOptions: cloneSelections(draft.selectedOptions),
  };
}

export function applyDraftSelection(
  draft: MealCustomizationDraft,
  slotId: string,
  optionId: string | null
): MealCustomizationDraft {
  const nextSelections = cloneSelections(draft.selectedOptions);

  if (optionId) {
    nextSelections[slotId] = optionId;
  } else {
    delete nextSelections[slotId];
  }

  return {
    ...draft,
    activeVariantId: "base",
    selectedOptions: nextSelections,
  };
}

export function commitMealCustomizationDraft(
  storage: MealPlannerStorage,
  draft: MealCustomizationDraft
): MealPlannerStorage {
  return {
    ...storage,
    today: {
      ...storage.today,
      activeVariantByMeal: {
        ...storage.today.activeVariantByMeal,
        [draft.mealKey]: draft.activeVariantId,
      },
      selectedSubstitutionsByMeal: {
        ...storage.today.selectedSubstitutionsByMeal,
        [draft.mealKey]: cloneSelections(draft.selectedOptions),
      },
    },
  };
}

export function getMealCustomizationViewModel(
  meal: MealDefinition,
  draft: MealCustomizationDraft
): MealCustomizationViewModel {
  const variant =
    draft.activeVariantId === "base"
      ? null
      : getVariantById(meal, draft.activeVariantId);

  if (variant) {
    return {
      currentSummary: variant.items,
      variantChoices: getVariantChoices(meal, draft.activeVariantId),
      editableGroups: [],
      fixedItems: variant.items,
    };
  }

  const editableGroups = meal.substitutions.map(slot => {
    const selectedOptionId = draft.selectedOptions[slot.slotId] ?? null;

    return {
      slotId: slot.slotId,
      from: slot.from,
      groupLabel: slot.groupLabel,
      modalDescription: slot.modalDescription,
      swapMapLabel: slot.swapMapLabel,
      selectedOptionId,
      options: slot.options.map(option => ({
        ...option,
        active: selectedOptionId === option.id,
      })),
    };
  });

  return {
    currentSummary: getResolvedBaseItems(meal, draft.selectedOptions),
    variantChoices: getVariantChoices(meal, draft.activeVariantId),
    editableGroups,
    fixedItems: getFixedBaseItems(meal),
  };
}
