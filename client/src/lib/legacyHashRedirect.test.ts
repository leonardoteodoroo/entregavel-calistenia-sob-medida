import { describe, expect, it } from "vitest";

import { resolveLegacyHashRedirect } from "./legacyHashRedirect";

describe("resolveLegacyHashRedirect", () => {
  it("redirects old /alimentacao hash to standalone meal page", () => {
    expect(resolveLegacyHashRedirect("#/alimentacao")).toEqual({
      type: "clean-path",
      href: "/plano-alimentar/",
    });
  });

  it("redirects old plano-alimentar section slug to standalone meal page", () => {
    expect(resolveLegacyHashRedirect("#plano-alimentar")).toEqual({
      type: "clean-path",
      href: "/plano-alimentar/",
    });
  });

  it("keeps current workout hash routes untouched", () => {
    expect(resolveLegacyHashRedirect("#/semana/1")).toBeNull();
    expect(resolveLegacyHashRedirect("#/biblioteca")).toBeNull();
    expect(resolveLegacyHashRedirect("#/checklist")).toBeNull();
    expect(resolveLegacyHashRedirect("#/faq")).toBeNull();
    expect(resolveLegacyHashRedirect("#/apoio")).toBeNull();
  });

  it("preserves legacy day and week conversion", () => {
    expect(resolveLegacyHashRedirect("#dia-8")).toEqual({
      type: "hash",
      path: "/semana/2/dia/8",
    });

    expect(resolveLegacyHashRedirect("#semana-3")).toEqual({
      type: "hash",
      path: "/semana/3",
    });
  });

  it("keeps institutional clean-path redirects", () => {
    expect(resolveLegacyHashRedirect("#/sobre")).toEqual({
      type: "clean-path",
      href: "/sobre",
    });
  });
});
