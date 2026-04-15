import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MEAL_PLANNER_STORAGE_KEY } from "@/lib/mealPlannerState";
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
    expect(markup).toContain('data-meal-surface="accent-teal"');
    expect(markup).toContain('data-meal-surface="accent-rose"');
    expect(markup).toContain('data-meal-section="flat"');
    expect(markup).toContain('data-meal-panel="active-choice"');
    expect(markup).toContain('data-meal-list="resolved-items"');
    expect(markup).toContain("white-space:nowrap");
    expect(markup).toContain("flex-shrink:0");
    expect(markup).not.toContain("width:min(1200px,100%)");
    expect(markup).toContain("Comece por aqui");
    expect(markup).toContain("Passo 1 de 3");
    expect(markup).toContain("Seu peso");
    expect(markup).toContain("Como usar seu plano");
    expect(markup).toContain("1 passo por vez");
    expect(markup).not.toContain("V3 premium local");
    expect(markup).toContain('data-aspect-ratio="16:9"');
    expect(markup).toContain('data-aspect-ratio="3:4"');
    expect(markup).toContain("Hoje");
    expect(markup).toContain("Escolha sua refeição");
    expect(markup).toContain("Prepare sua semana");
    expect(markup).toContain("Por que hidratação importa");
    expect(markup).toContain("Vegetais crus e cozidos");
    expect(markup).toContain("Mapa de trocas");
    expect(markup).toContain("Aplicável agora");
    expect(markup).toContain("Consulta ampliada");
    expect(markup).toContain("Trocas ativas agora");
    expect(markup).toContain("Nenhuma troca ativa por enquanto");
    expect(markup).toContain("Escolha a refeição que você quer ajustar");
    expect(markup).toContain("Lista completa para consulta");
    expect(markup).toContain("Arroz 7 grãos integrais");
    expect(markup).toContain("Contrafilé sem gordura grelhado");
    expect(markup).toContain("Alcachofra cozida");
    expect(markup).toContain("Café da manhã");
    expect(markup).toContain("Almoço");
    expect(markup).toContain("Jantar");
    expect(markup).toContain("Troque Melão");
    expect(markup).not.toContain(
      "Referência rápida para variar o prato sem perder a lógica do plano."
    );
    expect(markup).toContain("Lista da semana");
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
    expect(markup).toContain("Café da manhã 1");
    expect(markup).toContain("Almoço 1");
    expect(markup).toContain("Melão");
    expect(markup).toContain("Mamão");
    expect(markup).toContain("Limpar trocas desta refeição");
    expect(markup).toContain("Escolha a refeição que você quer ajustar");
    expect(markup).toContain("Lista completa para consulta");
    expect(markup).toContain("Arroz 7 grãos integrais");
    expect(markup).toContain("Contrafilé sem gordura grelhado");
    expect(markup).toContain("Alcachofra cozida");
    expect(markup).toContain("Troque Melão");
    expect(markup).toContain("Lista da semana");
    expect(markup).not.toContain("Meal prep semanal");
    expect(markup).not.toContain("Seu plano de hoje");
  });
});
