import { describe, expect, it } from "vitest";

import { recipes } from "./sobremesasSaudaveisData";

describe("sobremesas saudaveis data", () => {
  it("links every recipe to a public asset image", () => {
    expect(recipes).toHaveLength(12);

    for (const recipe of recipes) {
      expect(recipe.visual.kind).toBe("asset");

      if (recipe.visual.kind === "asset") {
        expect(recipe.visual.src).toContain("/bonus/sobremesas-saudaveis/");
        expect(recipe.visual.alt.length).toBeGreaterThan(0);
      }
    }
  });
});
