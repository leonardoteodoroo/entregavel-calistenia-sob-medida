import { describe, expect, it } from "vitest";

import { mealPlanData } from "./mealPlanData";
import { createInitialMealPlannerStorage } from "./mealPlannerState";
import {
  applyDraftSelection,
  applyDraftVariant,
  commitMealCustomizationDraft,
  createMealCustomizationDraft,
  getMealCustomizationViewModel,
} from "./mealPlannerCustomization";

function getMealOrThrow(mealKey: "almoco" | "lanche") {
  const meal = mealPlanData.meals.find(candidate => candidate.key === mealKey);
  if (!meal) {
    throw new Error(`Refeicao nao encontrada: ${mealKey}`);
  }
  return meal;
}

describe("mealPlannerCustomization", () => {
  it("abre um rascunho preservando o estado salvo da refeicao", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    storage.today.activeVariantByMeal = {
      almoco: "almoco-vegana",
    };
    storage.today.selectedSubstitutionsByMeal = {
      almoco: {
        "almoco-carbo": "almoco-arroz",
      },
    };

    const meal = getMealOrThrow("almoco");
    const draft = createMealCustomizationDraft(meal, storage);
    const viewModel = getMealCustomizationViewModel(meal, draft);

    expect(draft.activeVariantId).toBe("almoco-vegana");
    expect(draft.selectedOptions).toEqual({
      "almoco-carbo": "almoco-arroz",
    });
    expect(viewModel.currentSummary.map(item => item.name)).toEqual([
      "Cenoura cozida",
      "Grão de soja refogado",
      "Batata inglesa assada",
      "Tomate",
      "Rúcula",
    ]);
    expect(viewModel.variantChoices.map(choice => choice.id)).toEqual([
      "base",
      "almoco-vegana",
    ]);
    expect(viewModel.variantChoices.map(choice => choice.active)).toEqual([
      false,
      true,
    ]);
    expect(viewModel.editableGroups).toEqual([]);
    expect(viewModel.fixedItems.map(item => item.name)).toEqual([
      "Cenoura cozida",
      "Grão de soja refogado",
      "Batata inglesa assada",
      "Tomate",
      "Rúcula",
    ]);
  });

  it("alterna entre base e variante sem perder as escolhas do rascunho", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    storage.today.activeVariantByMeal = {
      almoco: "almoco-vegana",
    };
    storage.today.selectedSubstitutionsByMeal = {
      almoco: {
        "almoco-carbo": "almoco-arroz",
      },
    };

    const meal = getMealOrThrow("almoco");
    const draft = createMealCustomizationDraft(meal, storage);
    const baseDraft = applyDraftVariant(draft, "base");
    const baseViewModel = getMealCustomizationViewModel(meal, baseDraft);
    const variantDraft = applyDraftVariant(baseDraft, "almoco-vegana");
    const variantViewModel = getMealCustomizationViewModel(meal, variantDraft);

    expect(baseDraft.activeVariantId).toBe("base");
    expect(baseDraft.selectedOptions).toEqual({
      "almoco-carbo": "almoco-arroz",
    });
    expect(baseViewModel.currentSummary.map(item => item.name)).toEqual([
      "Arroz branco ou integral",
      "Filé de frango grelhado",
      "Mix de folhas",
      "Legumes cozidos",
      "Azeite de oliva extravirgem",
    ]);
    expect(baseViewModel.editableGroups).toHaveLength(2);
    expect(baseViewModel.editableGroups[0]).toMatchObject({
      slotId: "almoco-carbo",
      groupLabel: "Carboidrato do almoço",
      modalDescription: "Troque a base de carboidrato do almoço sem desmontar o prato.",
      swapMapLabel: "Carboidrato do almoço",
      selectedOptionId: "almoco-arroz",
    });
    expect(baseViewModel.fixedItems.map(item => item.name)).toEqual([
      "Mix de folhas",
      "Legumes cozidos",
      "Azeite de oliva extravirgem",
    ]);
    expect(variantDraft.activeVariantId).toBe("almoco-vegana");
    expect(variantDraft.selectedOptions).toEqual({
      "almoco-carbo": "almoco-arroz",
    });
    expect(variantViewModel.editableGroups).toEqual([]);
    expect(variantViewModel.fixedItems.map(item => item.name)).toEqual([
      "Cenoura cozida",
      "Grão de soja refogado",
      "Batata inglesa assada",
      "Tomate",
      "Rúcula",
    ]);
  });

  it("aplica troca no rascunho sem alterar o storage persistido", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );

    const meal = getMealOrThrow("almoco");
    const draft = createMealCustomizationDraft(meal, storage);
    const nextDraft = applyDraftSelection(draft, "almoco-proteina", "almoco-tilapia");

    expect(nextDraft.activeVariantId).toBe("base");
    expect(nextDraft.selectedOptions).toEqual({
      "almoco-proteina": "almoco-tilapia",
    });
    expect(storage.today.activeVariantByMeal).toEqual({});
    expect(storage.today.selectedSubstitutionsByMeal).toEqual({});
  });

  it("confirma o rascunho e atualiza apenas a refeicao alvo", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    storage.today.activeVariantByMeal = {
      almoco: "base",
      jantar: "jantar-vegana",
    };
    storage.today.selectedSubstitutionsByMeal = {
      almoco: {
        "almoco-carbo": "almoco-arroz",
      },
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    };

    const meal = getMealOrThrow("almoco");
    const draft = applyDraftVariant(
      applyDraftSelection(
        createMealCustomizationDraft(meal, storage),
        "almoco-proteina",
        "almoco-tilapia"
      ),
      "almoco-vegana"
    );
    const nextStorage = commitMealCustomizationDraft(storage, draft);

    expect(nextStorage.today.activeVariantByMeal).toEqual({
      almoco: "almoco-vegana",
      jantar: "jantar-vegana",
    });
    expect(nextStorage.today.selectedSubstitutionsByMeal).toEqual({
      almoco: {
        "almoco-carbo": "almoco-arroz",
        "almoco-proteina": "almoco-tilapia",
      },
      jantar: {
        "jantar-carbo": "jantar-arroz",
      },
    });
  });

  it("descarta o rascunho e preserva o estado anterior", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    storage.today.activeVariantByMeal = {
      lanche: "lanche-zero-lactose",
    };
    storage.today.selectedSubstitutionsByMeal = {
      lanche: {
        "lanche-fruta": "lanche-abacaxi",
      },
    };

    const meal = getMealOrThrow("lanche");
    const draft = createMealCustomizationDraft(meal, storage);
    applyDraftSelection(draft, "lanche-fruta", "lanche-morango");

    expect(storage.today.activeVariantByMeal).toEqual({
      lanche: "lanche-zero-lactose",
    });
    expect(storage.today.selectedSubstitutionsByMeal).toEqual({
      lanche: {
        "lanche-fruta": "lanche-abacaxi",
      },
    });
  });
});
