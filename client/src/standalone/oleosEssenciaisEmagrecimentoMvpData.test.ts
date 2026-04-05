import { describe, expect, it } from "vitest";

import {
  getOleosDetailViewModel,
  getOleosHomeViewModel,
  getOleosHomeSectionCards,
  getOleosSectionViewModel,
  isOleosDetailEntityId,
} from "./oleosEssenciaisEmagrecimentoMvpData";

describe("oleos MVP data", () => {
  it("returns the configured home section cards with counts", () => {
    const cards = getOleosHomeSectionCards();

    expect(cards.some(card => card.id === "section:oleos-essenciais")).toBe(
      true
    );
    expect(cards.every(card => card.count > 0)).toBe(true);
  });

  it("maps the TrimShake section into a list view model", () => {
    const vm = getOleosSectionViewModel("section:receitas-com-trimshake");

    expect(vm.title).toBe("Receitas com TrimShake");
    expect(vm.items.map(item => item.title)).toContain("Horchata");
  });

  it("maps tips as text-first cards", () => {
    const vm = getOleosSectionViewModel("section:dicas");

    expect(vm.items[0]?.title).toBe("Dica 1");
    expect(vm.items[0]?.excerpt.length).toBeGreaterThan(10);
    expect(vm.items[0]?.detailEntityId).toBeNull();
  });

  it("builds the semantic home view model with editorial blocks and sources", () => {
    const vm = getOleosHomeViewModel();

    expect(vm.title).toBe("Emagrecendo com Óleos Essenciais");
    expect(vm.editorialBlocks.map(block => block.title)).toEqual([
      "Introdução",
      "Apresentação",
      "Conclusão",
    ]);
    expect(vm.sourceReferences).toContain("PubMed Brasil");
  });

  it("maps supported technical entities into detail view models", () => {
    const recipe = getOleosDetailViewModel("recipe:bruschetta");
    const oil = getOleosDetailViewModel("oil-profile:serenity");
    const topical = getOleosDetailViewModel(
      "topical-formula:oleo-de-massagem-para-gordura-localizada"
    );

    expect(recipe?.ingredients.length).toBeGreaterThan(0);
    expect(oil?.summaryParagraphs.length).toBeGreaterThan(0);
    expect(topical?.referencedOils).toContain("Grapefruit");
  });

  it("accepts only technical detail ids in this phase", () => {
    expect(isOleosDetailEntityId("recipe:bruschetta")).toBe(true);
    expect(isOleosDetailEntityId("tip-item:1-precisamos-mudar-habitos")).toBe(
      false
    );
  });
});
