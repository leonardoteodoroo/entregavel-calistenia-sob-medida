import { isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mealPlanData } from "@/lib/mealPlanData";
import { applyDraftSelection } from "@/lib/mealPlannerCustomization";
import { createInitialMealPlannerStorage } from "@/lib/mealPlannerState";
import { MEAL_PLANNER_STORAGE_KEY } from "@/lib/mealPlannerState";
import {
  MealCard,
  commitMealCustomizationFlow,
  openMealCustomizationFlow,
} from "./MealPlanPage";
import MealPlanPage from "./MealPlanPage";

vi.mock("wouter", () => ({
  useLocation: () => ["/alimentacao", vi.fn()],
}));

function createLocalStorageMock(initial: Record<string, string> = {}) {
  const map = new Map(Object.entries(initial));

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

function getMealCardMarkup(markup: string, mealKey: string): string {
  const marker = `data-meal-card="${mealKey}"`;
  const startIndex = markup.indexOf(marker);

  if (startIndex === -1) {
    throw new Error(`Card da refeicao nao encontrado: ${mealKey}`);
  }

  const endIndex = markup.indexOf("</article>", startIndex);
  return endIndex === -1
    ? markup.slice(startIndex)
    : markup.slice(startIndex, endIndex + "</article>".length);
}

function getMealByKey(mealKey: "almoco" | "lanche") {
  const meal = mealPlanData.meals.find(candidate => candidate.key === mealKey);

  if (!meal) {
    throw new Error(`Refeicao nao encontrada: ${mealKey}`);
  }

  return meal;
}

function getNodeText(node: ReactNode): string {
  if (
    typeof node === "string" ||
    typeof node === "number" ||
    typeof node === "bigint"
  ) {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(child => getNodeText(child)).join("");
  }

  if (!isValidElement(node)) {
    return "";
  }

  return getNodeText(node.props.children);
}

function findElementByText(
  node: ReactNode,
  text: string
): React.ReactElement | null {
  if (!isValidElement(node)) {
    if (Array.isArray(node)) {
      for (const child of node) {
        const match = findElementByText(child, text);
        if (match) return match;
      }
    }

    return null;
  }

  if (typeof node.props.onClick === "function") {
    const nodeText = getNodeText(node.props.children);
    if (nodeText.includes(text)) {
      return node;
    }
  }

  return findElementByText(node.props.children, text);
}

describe("MealPlanPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-10T12:00:00"));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("shows the inline onboarding and the configured visual ratios on first visit", () => {
    vi.stubGlobal("window", {
      localStorage: createLocalStorageMock(),
      innerWidth: 1280,
      scrollTo: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const markup = renderToStaticMarkup(<MealPlanPage />);

    expect(markup).toContain('data-meal-theme="editorial"');
    expect(markup).toContain('data-meal-surface="hero"');
    expect(markup).toContain('data-meal-surface="elevated"');
    expect(markup).toContain('data-meal-surface="soft"');
    expect(markup).toContain("white-space:nowrap");
    expect(markup).toContain("flex-shrink:0");
    expect(markup).not.toContain("width:min(1200px,100%)");
    expect(markup).toContain("Comece por aqui");
    expect(markup).toContain("Passo 1 de 3");
    expect(markup).toContain("Seu peso");
    expect(markup).toContain("Complete os 3 passos para abrir o restante do plano");
    expect(markup).toContain("Hoje você vê só o essencial do começo");
    expect(markup).toContain("Voltar ao Passo 1 de 3");
    expect(markup).not.toContain("V3 premium local");
    expect(markup).toContain('data-aspect-ratio="16:9"');
    expect(markup).not.toContain("Como usar seu plano");
    expect(markup).not.toContain("Escolha sua refeição");
    expect(markup).not.toContain("Seu ritmo na semana");
    expect(markup).not.toContain("Passos da semana");
    expect(markup).not.toContain("Atalhos");
    expect(markup).not.toContain("Por que hidratação importa");
    expect(markup).not.toContain("Aplicável agora");
    expect(markup).not.toContain("Consulta ampliada");
    expect(markup).not.toContain("Trocas ativas agora");
    expect(markup).not.toContain("Nenhuma troca ativa por enquanto");
    expect(markup).not.toContain("Escolha a refeição que você quer ajustar");
    expect(markup).not.toContain("Lista completa para consulta");
    expect(markup).not.toContain("Arroz 7 grãos integrais");
    expect(markup).not.toContain("Contrafilé sem gordura grelhado");
    expect(markup).not.toContain("Alcachofra cozida");
    expect(markup).not.toContain("Café da manhã");
    expect(markup).not.toContain("Almoço");
    expect(markup).not.toContain("Jantar");
    expect(markup).not.toContain("Troque Melão");
    expect(markup).not.toContain(
      "Referência rápida para variar o prato sem perder a lógica do plano."
    );
    expect(markup).not.toContain("O que comprar");
  });

  it("collapses the onboarding into a summary card when a profile is already persisted", () => {
    const persisted = {
      version: 3,
      profile: {
        weightKg: 62,
        goal: "saciedade",
        foodStyle: "vegano",
        restrictions: ["sem_gluten"],
      },
      today: {
        dateKey: "2026-04-10",
        completedMeals: ["cafe", "almoco"],
        waterMl: 1750,
        activeVariantByMeal: {
          cafe: "base",
          almoco: "base",
          lanche: "lanche-sem-gluten",
          jantar: "base",
        },
        selectedSubstitutionsByMeal: {
          cafe: {
            "cafe-fruta": "cafe-mamao",
          },
          almoco: {
            "almoco-carbo": "almoco-arroz",
          },
        },
      },
      history: [
        {
          dateKey: "2026-04-09",
          completedMealCount: 3,
          waterMl: 2100,
          completionPct: 75,
        },
      ],
      favorites: [
        {
          id: "favorite-jantar-base",
          mealKey: "jantar",
          label: "Jantar · Base com arroz",
          sourceMode: "base",
          variantId: null,
          substitutionSelections: {
            "jantar-carbo": "jantar-arroz",
          },
          createdAt: "2026-04-10T10:00:00.000Z",
        },
      ],
      ui: {
        activeMealFilter: "favoritas",
      },
      mealPrep: {
        weekKey: "2026-04-07",
        completedStepIds: ["proteina-base", "vegetais-lavados"],
      },
    };

    vi.stubGlobal("window", {
      localStorage: createLocalStorageMock({
        [MEAL_PLANNER_STORAGE_KEY]: JSON.stringify(persisted),
      }),
      innerWidth: 1280,
      scrollTo: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const markup = renderToStaticMarkup(<MealPlanPage />);

    expect(markup).toContain('data-meal-theme="editorial"');
    expect(markup).toContain('data-meal-surface="hero"');
    expect(markup).toContain('data-meal-surface="elevated"');
    expect(markup).toContain('data-meal-surface="soft"');
    expect(markup).toContain('data-meal-surface="accent-teal"');
    expect(markup).toContain('data-meal-surface="accent-rose"');
    expect(markup).toContain('data-meal-section="flat"');
    expect(markup).toContain('data-meal-panel="active-choice"');
    expect(markup).toContain('data-meal-list="resolved-items"');
    expect(markup).toContain("white-space:nowrap");
    expect(markup).toContain("flex-shrink:0");
    expect(markup).not.toContain("width:min(1200px,100%)");
    expect(markup).not.toContain("Comece por aqui");
    expect(markup).not.toContain("Complete os 3 passos para abrir o restante do plano");
    expect(markup).toContain("Editar perfil");
    expect(markup).toContain("Como usar seu plano");
    expect(markup).toContain("Hoje");
    expect(markup).toContain("2 de 4 refeições feitas");
    expect(markup).toContain("Prepare sua semana");
    expect(markup).toContain("Opções salvas");
    expect(markup).toContain("Jantar · Base com arroz");
    expect(markup).toContain("Atalhos");
    expect(markup).toContain("Salvas");
    expect(markup).toContain("Seu ritmo na semana");
    expect(markup).toContain("Leguminosas");
    expect(markup).toContain("Mapa de trocas");
    expect(markup).toContain("Aplicável agora");
    expect(markup).toContain("Consulta ampliada");
    expect(markup).toContain("Trocas ativas agora");
    expect(markup).toContain("Café da manhã");
    expect(markup).toContain("Almoço");
    expect(markup).toContain("trocas ativas");
    expect(markup).toContain("Personalizável agora");
    expect(markup).toContain("Selecione aqui os itens para montar seu prato");
    expect(markup).not.toContain("Escolha uma base ou uma versão pronta");
    expect(markup).not.toContain("Toque em uma opção para trocar na hora");
    expect(markup).toContain('data-meal-interactive="choice"');
    expect(markup).toContain('data-meal-interactive="swap-map"');
    expect(markup).toContain('data-selected="true"');
    expect(markup).toContain("Melão");
    expect(markup).toContain("Mamão");
    expect(markup).toContain("Limpar trocas desta refeição");
    expect(markup).toContain("Escolha a refeição que você quer ajustar");
    expect(markup).toContain("Lista completa para consulta");
    expect(markup).toContain("Arroz 7 grãos integrais");
    expect(markup).toContain("Contrafilé sem gordura grelhado");
    expect(markup).toContain("Alcachofra cozida");
    expect(markup).toContain("Troque Melão");
    expect(markup.match(/Troque Melão/g)).toHaveLength(1);
    expect(getMealCardMarkup(markup, "jantar")).not.toContain("Troque Melão");
    expect(markup).toContain("Lista da semana");
    expect(markup).not.toContain("Meal prep semanal");
    expect(markup).not.toContain("Seu plano de hoje");
  });

  it("aciona a abertura do fluxo de personalizacao ao clicar no CTA do card", () => {
    const plannerState = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    plannerState.profile = {
      weightKg: 62,
      goal: "constancia",
      foodStyle: "padrao",
      restrictions: [],
    };

    const meal = getMealByKey("almoco");
    const onOpenCustomization = vi.fn();

    const tree = MealCard({
      meal,
      plannerState,
      profile: plannerState.profile,
      disabled: false,
      completed: false,
      isFavorited: false,
      activeModeLabel: "Base do plano com as trocas que você escolheu",
      onToggleCompleted: vi.fn(),
      onToggleFavorite: vi.fn(),
      onOpenCustomization,
    });

    const cta = findElementByText(
      tree,
      "Selecione aqui os itens para montar seu prato"
    );

    expect(cta).not.toBeNull();
    cta?.props.onClick();

    expect(onOpenCustomization).toHaveBeenCalledWith(meal);
  });

  it("abre o rascunho da refeicao, salva a composicao confirmada e reflete no markup da pagina", () => {
    const plannerState = createInitialMealPlannerStorage(
      new Date("2026-04-10T08:00:00")
    );
    plannerState.profile = {
      weightKg: 62,
      goal: "saciedade",
      foodStyle: "padrao",
      restrictions: [],
    };

    const meal = getMealByKey("lanche");
    const openedFlow = openMealCustomizationFlow(plannerState, meal);
    const nextDraft = applyDraftSelection(
      openedFlow.draft,
      "lanche-fruta",
      "lanche-morango"
    );
    const committedFlow = commitMealCustomizationFlow(
      plannerState,
      nextDraft,
      meal
    );

    expect(openedFlow.openMealKey).toBe("lanche");
    expect(committedFlow.openMealKey).toBeNull();
    expect(committedFlow.draft).toBeNull();
    expect(
      committedFlow.plannerState.today.selectedSubstitutionsByMeal.lanche
    ).toEqual({
      "lanche-fruta": "lanche-morango",
    });
    expect(committedFlow.plannerState.today.activeVariantByMeal.lanche).toBe(
      "base"
    );

    vi.stubGlobal("window", {
      localStorage: createLocalStorageMock({
        [MEAL_PLANNER_STORAGE_KEY]: JSON.stringify(committedFlow.plannerState),
      }),
      innerWidth: 1280,
      scrollTo: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const markup = renderToStaticMarkup(<MealPlanPage />);

    expect(markup).toContain("Morango");
    expect(markup).toContain("Fruta do lanche");
    expect(markup).toContain("Lanche");
    expect(markup).toContain("Trocas ativas agora");
  });
});
