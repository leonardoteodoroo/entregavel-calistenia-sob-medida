import { describe, expect, it } from "vitest";

import {
  buildOleosHash,
  readOleosRouteFromHash,
} from "./oleosEssenciaisRouting";

describe("oleos standalone routing", () => {
  it("defaults to home for empty hashes", () => {
    expect(readOleosRouteFromHash("")).toEqual({ view: "home" });
    expect(readOleosRouteFromHash("#/home")).toEqual({ view: "home" });
  });

  it("builds and reads section hashes", () => {
    expect(
      buildOleosHash({
        view: "section",
        sectionId: "section:receitas-com-trimshake",
      })
    ).toBe("#/secao/receitas-com-trimshake");

    expect(readOleosRouteFromHash("#/secao/receitas-com-trimshake")).toEqual({
      view: "section",
      sectionId: "section:receitas-com-trimshake",
    });
  });

  it("builds and reads detail hashes for supported entities", () => {
    expect(
      buildOleosHash({
        view: "detail",
        entityId: "recipe:bruschetta",
      })
    ).toBe("#/detalhe/recipe%3Abruschetta");

    expect(readOleosRouteFromHash("#/detalhe/recipe%3Abruschetta")).toEqual({
      view: "detail",
      entityId: "recipe:bruschetta",
    });
  });

  it("falls back to home for unknown section", () => {
    expect(readOleosRouteFromHash("#/secao/nao-existe")).toEqual({
      view: "home",
    });
  });

  it("falls back to home for unsupported detail ids", () => {
    expect(
      readOleosRouteFromHash("#/detalhe/tip-item%3A1-precisamos-mudar-habitos")
    ).toEqual({
      view: "home",
    });
  });
});
