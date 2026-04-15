import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("lab extras bonus cards", () => {
  it("keeps the current lab experience source wired to the curated alongamento layout", () => {
    const source = readFileSync(
      new URL("../../lab/src/App.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("const menus = [");
    expect(source).toContain("const toggleDay = (day: number)");
    expect(source).toContain("Alongamento Posterior");
    expect(source).toContain("activeIndex === 2");
    expect(source).toContain("Laboratório MVP · Biblioteca Confiável");
  });
});
