import { describe, expect, it } from "vitest";
import {
  calculateHydrationTargets,
  formatMlToLiters,
  getPlateMethodVariant,
  mealPlanData,
} from "./mealPlanData";

describe("mealPlanData", () => {
  it("normalizes the OCR source into four clean meal definitions", () => {
    expect(mealPlanData.meals).toHaveLength(4);
    expect(mealPlanData.meals.map(meal => meal.key)).toEqual([
      "cafe",
      "almoco",
      "lanche",
      "jantar",
    ]);

    const serialized = JSON.stringify(mealPlanData);
    expect(serialized).not.toContain("logurte");
    expect(serialized).not.toContain("cabotian");
    expect(serialized).not.toContain("1009");
    expect(serialized).not.toContain("809");
    expect(serialized).not.toContain("rcuta");
  });

  it("ships the live visual system with real assets wired to the alimentacao image folder", () => {
    expect(mealPlanData.heroVisual.aspectRatio).toBe("16:9");
    expect(mealPlanData.heroVisual.kind).toBe("asset");
    if (mealPlanData.heroVisual.kind !== "asset") {
      throw new Error("heroVisual should be an asset in production");
    }
    expect(mealPlanData.heroVisual.src).toContain(
      "assets/images/alimentacao/v3/hero-plano-alimentar.webp"
    );

    for (const meal of mealPlanData.meals) {
      expect(meal.visual.kind).toBe("asset");
      if (meal.visual.kind !== "asset") {
        throw new Error(`${meal.key} visual should be an asset`);
      }
      expect(meal.visual.src).toContain("assets/images/alimentacao/v3/");
      expect(meal.visual.aspectRatio).toBe("3:4");
      expect(meal.visual.alt.length).toBeGreaterThan(10);
    }
  });

  it("defines the premium V3 section visuals and planner tags without changing ratios", () => {
    expect(Object.keys(mealPlanData.sectionVisuals)).toEqual([
      "mealPrep",
      "favorites",
      "filters",
      "shopping",
      "weeklySummary",
    ]);

    for (const visual of Object.values(mealPlanData.sectionVisuals)) {
      expect(visual.kind).toBe("asset");
      if (visual.kind !== "asset") {
        throw new Error("section visual should be an asset");
      }
      expect(visual.src).toContain("assets/images/alimentacao/v3/");
      expect(visual.aspectRatio).toBe("16:9");
      expect(visual.alt.length).toBeGreaterThan(10);
    }

    expect(
      mealPlanData.meals.map(meal => ({
        key: meal.key,
        plannerTags: meal.plannerTags,
      }))
    ).toEqual([
      { key: "cafe", plannerTags: ["rapida"] },
      { key: "almoco", plannerTags: ["saciedade"] },
      { key: "lanche", plannerTags: ["rapida"] },
      { key: "jantar", plannerTags: ["saciedade"] },
    ]);
  });

  it("keeps stable ids for variants and substitution slots", () => {
    for (const meal of mealPlanData.meals) {
      const variantIds = meal.variants.map(variant => variant.id);
      expect(new Set(variantIds).size).toBe(variantIds.length);

      const substitutionSlotIds = meal.substitutions.map(slot => slot.slotId);
      expect(new Set(substitutionSlotIds).size).toBe(
        substitutionSlotIds.length
      );

      for (const slot of meal.substitutions) {
        const optionIds = slot.options.map(option => option.id);
        expect(new Set(optionIds).size).toBe(optionIds.length);
      }
    }
  });

  it("keeps the swap groups organized for carbohydrates, proteins and vegetables", () => {
    expect(mealPlanData.swapGroups.map(group => group.key)).toEqual([
      "carboidratos",
      "proteinas",
      "legumes",
    ]);

    for (const group of mealPlanData.swapGroups) {
      expect(group.items.length).toBeGreaterThan(3);
    }
  });

  it("supports plate method variants and resolves them from food style", () => {
    expect(mealPlanData.plateMethodVariants).toHaveLength(2);
    expect(mealPlanData.plateMethodVariants.map(variant => variant.id)).toEqual(
      ["padrao", "vegetariano_vegano"]
    );

    const defaultVariant = getPlateMethodVariant();
    expect(defaultVariant.id).toBe("padrao");

    expect(getPlateMethodVariant("padrao").id).toBe("padrao");
    expect(getPlateMethodVariant("vegetariano").id).toBe("vegetariano_vegano");
    expect(getPlateMethodVariant("vegano").id).toBe("vegetariano_vegano");
  });

  it("keeps hydration learn-more content and strips commercial references", () => {
    expect(mealPlanData.hydration.learnMoreTitle.length).toBeGreaterThan(10);
    expect(mealPlanData.hydration.learnMorePoints.length).toBeGreaterThan(1);

    const serialized = JSON.stringify(mealPlanData).toLowerCase();
    expect(serialized).not.toContain("timelili");
    expect(serialized).not.toContain("gsuplementos");
    expect(serialized).not.toContain("http://");
    expect(serialized).not.toContain("https://");
  });
});

describe("hydration helpers", () => {
  it("calculates the minimum and target hydration from body weight", () => {
    expect(calculateHydrationTargets(62)).toEqual({
      minimumMl: 2170,
      targetMl: 3100,
    });
  });

  it("formats milliliters into pt-BR liters with two decimal places", () => {
    expect(formatMlToLiters(2170)).toBe("2,17 L");
    expect(formatMlToLiters(3100)).toBe("3,10 L");
  });
});
