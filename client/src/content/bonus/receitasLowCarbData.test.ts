import { describe, expect, it } from "vitest";

import { recipes } from "./receitasLowCarbData";

describe("receitas low carb data", () => {
  it("uses the shared time metadata contract", () => {
    const firstRecipe = recipes[0] as unknown as {
      time: Record<string, string | undefined>;
    };

    expect(firstRecipe.time.extraLabel).toBe("Cozimento");
    expect(firstRecipe.time.extraValue).toBe("5 min");
  });
});
