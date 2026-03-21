import { describe, expect, it } from "vitest";

import { buildRecipeHash, readRecipeIdFromHash } from "./bonusRecipeRouting";

describe("bonus recipe routing", () => {
  it("builds a hash route for a recipe id", () => {
    expect(buildRecipeHash("10")).toBe("#/10");
  });

  it("reads the recipe id back from a valid hash route", () => {
    expect(readRecipeIdFromHash("#/10")).toBe("10");
  });

  it("ignores unrelated hashes", () => {
    expect(readRecipeIdFromHash("#top")).toBeNull();
    expect(readRecipeIdFromHash("")).toBeNull();
  });
});
