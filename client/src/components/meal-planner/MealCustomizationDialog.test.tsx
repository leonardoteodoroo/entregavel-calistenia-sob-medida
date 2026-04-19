import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { mealPlanData } from "@/lib/mealPlanData";
import { createInitialMealPlannerStorage } from "@/lib/mealPlannerState";
import {
  applyDraftSelection,
  applyDraftVariant,
  createMealCustomizationDraft,
  getMealCustomizationViewModel,
} from "@/lib/mealPlannerCustomization";
import MealCustomizationDialog from "./MealCustomizationDialog";

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <section>{children}</section>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => <header>{children}</header>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
  DialogFooter: ({ children }: { children: React.ReactNode }) => <footer>{children}</footer>,
}));

function getMealOrThrow(mealKey: "almoco" | "lanche") {
  const meal = mealPlanData.meals.find(candidate => candidate.key === mealKey);
  if (!meal) {
    throw new Error(`Refeicao nao encontrada: ${mealKey}`);
  }
  return meal;
}

describe("MealCustomizationDialog", () => {
  it("renderiza cabecalho, versoes, grupos editaveis e itens mantidos na base", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    const meal = getMealOrThrow("almoco");
    const draft = applyDraftSelection(
      createMealCustomizationDraft(meal, storage),
      "almoco-carbo",
      "almoco-arroz"
    );
    const viewModel = getMealCustomizationViewModel(meal, draft);

    const markup = renderToStaticMarkup(
      <MealCustomizationDialog
        open
        onOpenChange={vi.fn()}
        meal={meal}
        viewModel={viewModel}
        onSelectVariant={vi.fn()}
        onSelectOption={vi.fn()}
        onSave={vi.fn()}
      />
    );

    expect(markup).toContain("Almoço");
    expect(markup).toContain(
      "Prato principal do dia com volume alto de vegetais e proteína central."
    );
    expect(markup).toContain("Resumo atual");
    expect(markup).toContain("Arroz branco ou integral");
    expect(markup).toContain("Versão da refeição");
    expect(markup).toContain("Base do plano");
    expect(markup).toContain("Opção vegana");
    expect(markup).toContain("Monte seu prato");
    expect(markup).toContain("Carboidrato do almoço");
    expect(markup).toContain("Proteína do almoço");
    expect(markup).toContain("Mantidos automaticamente");
    expect(markup).toContain("Mix de folhas");
    expect(markup).toContain("Legumes cozidos");
    expect(markup).toContain("Cancelar");
    expect(markup).toContain("Salvar refeição");
  });

  it("mantem grupos hibridos do lanche e variantes prontas no mesmo fluxo", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    const meal = getMealOrThrow("lanche");
    const draft = createMealCustomizationDraft(meal, storage);
    const viewModel = getMealCustomizationViewModel(meal, draft);

    const markup = renderToStaticMarkup(
      <MealCustomizationDialog
        open
        onOpenChange={vi.fn()}
        meal={meal}
        viewModel={viewModel}
        onSelectVariant={vi.fn()}
        onSelectOption={vi.fn()}
        onSave={vi.fn()}
      />
    );

    expect(markup).toContain("Versão da refeição");
    expect(markup).toContain("Base do plano");
    expect(markup).toContain("Zero lactose");
    expect(markup).toContain("Sem glúten");
    expect(markup).toContain("Opção vegana");
    expect(markup).toContain("Atalho prático");
    expect(markup).toContain("Monte seu prato");
    expect(markup).toContain("Base cremosa do lanche");
    expect(markup).toContain("Fruta do lanche");
    expect(markup).toContain("Carboidrato do lanche");
    expect(markup).toContain("Complemento do lanche");
  });

  it("esconde a montagem manual quando uma variante pronta esta ativa", () => {
    const storage = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    const meal = getMealOrThrow("lanche");
    const draft = applyDraftVariant(
      createMealCustomizationDraft(meal, storage),
      "lanche-vegana"
    );
    const viewModel = getMealCustomizationViewModel(meal, draft);

    const markup = renderToStaticMarkup(
      <MealCustomizationDialog
        open
        onOpenChange={vi.fn()}
        meal={meal}
        viewModel={viewModel}
        onSelectVariant={vi.fn()}
        onSelectOption={vi.fn()}
        onSave={vi.fn()}
      />
    );

    expect(markup).toContain("Opção vegana");
    expect(markup).not.toContain("Monte seu prato");
    expect(markup).toContain("Mantidos automaticamente");
    expect(markup).toContain("Leite de amêndoa");
  });
});
