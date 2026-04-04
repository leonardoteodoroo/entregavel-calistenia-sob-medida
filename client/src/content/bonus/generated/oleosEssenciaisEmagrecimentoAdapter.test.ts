import { describe, expect, it } from "vitest";

import {
  getOleosEssenciaisEntityById,
  getOleosEssenciaisEntitiesByKind,
  getOleosEssenciaisEntitiesByTag,
  searchOleosEssenciaisEntities,
} from "./oleosEssenciaisEmagrecimentoAdapter";

describe("oleos essenciais semantic adapter", () => {
  it("finds entities by title", () => {
    const results = searchOleosEssenciaisEntities("Bruschetta");

    expect(results.some(entity => entity.id === "recipe:bruschetta")).toBe(
      true
    );
  });

  it("finds entities by alias", () => {
    const results = searchOleosEssenciaisEntities("Juniper Berry");

    expect(results.some(entity => entity.id === "recipe:granola-salgada")).toBe(
      true
    );
  });

  it("filters entities by kind", () => {
    const oilProfiles = getOleosEssenciaisEntitiesByKind("oil_profile");

    expect(oilProfiles.length).toBeGreaterThan(5);
    expect(oilProfiles.every(entity => entity.kind === "oil_profile")).toBe(
      true
    );
  });

  it("filters entities by semantic tag", () => {
    const topicalEntities = getOleosEssenciaisEntitiesByTag("mode:topical");

    expect(topicalEntities.length).toBeGreaterThan(0);
    expect(
      topicalEntities.some(
        entity =>
          entity.kind === "topical_formula" || entity.kind === "oil_profile"
      )
    ).toBe(true);
  });

  it("returns a single entity by id with retrieval text", () => {
    const entity = getOleosEssenciaisEntityById("oil-profile:serenity");

    expect(entity).toBeDefined();
    expect(entity?.title).toBe("Serenity");
    expect(entity?.retrievalText.toLowerCase()).toContain("serenity");
  });
});
