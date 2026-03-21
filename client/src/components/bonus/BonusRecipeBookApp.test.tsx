import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";

import type { RecipeBook } from "@/content/bonus/bonusRecipeTypes";
import BonusRecipeBookApp from "./BonusRecipeBookApp";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: { children: ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

const testBook: RecipeBook = {
  intro: {
    title: "SOBREMESAS TESTE",
    author: "@teste",
    volume: "VOL. T",
    observations: ["Observacao de teste"],
  },
  recipes: [
    {
      id: "10",
      title: "Cookie Teste",
      premise: "Premissa de teste",
      servings: "1 porcao",
      time: {
        prep: "5 min",
        total: "10 min",
        extraLabel: "Finalizacao",
        extraValue: "Forno 5 min",
      },
      ingredients: ["Ingrediente 1"],
      instructions: "Misture tudo.",
      instructionsSteps: ["Misture tudo."],
      objection: "Objecao de teste",
      masterTip: "Dica de teste",
      visual: {
        kind: "asset",
        src: "/bonus/teste/10-cookie.webp",
        alt: "Cookie de teste",
      },
    },
  ],
  storageKey: "bonus-recipe-book-test",
  searchPlaceholder: "Buscar",
  emptyStateCopy: "Nada encontrado",
};

describe("BonusRecipeBookApp", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens the recipe detail when the page loads with a recipe hash", () => {
    vi.stubGlobal("window", {
      location: {
        hash: "#/10",
      },
    });

    const markup = renderToStaticMarkup(<BonusRecipeBookApp book={testBook} />);

    expect(markup).toContain("Cookie Teste");
    expect(markup).toContain("Voltar");
    expect(markup).not.toContain("Indice de Receitas");
  });
});
