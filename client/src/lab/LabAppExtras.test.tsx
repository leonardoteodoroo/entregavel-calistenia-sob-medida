import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("lab extras bonus cards", () => {
  it("keeps the curated extras layout while using the real bonus content", () => {
    const source = readFileSync(
      new URL("../../lab/src/App.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("const featuredExtra = BONUS_RECIPES[0]");
    expect(source).toContain(
      "const secondaryExtras = BONUS_RECIPES.slice(1, 3)"
    );
    expect(source).not.toContain("BONUS_RECIPES.map(item =>");
    expect(source).toContain("readBonusLikesState");
    expect(source).toContain("featuredExtra.title");
    expect(source).toContain("secondaryExtras.map");
  });
});
