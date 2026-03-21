import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import BonusVisual from "./BonusVisual";

describe("BonusVisual", () => {
  it("renders placeholder visuals without a broken image tag", () => {
    const markup = renderToStaticMarkup(
      <BonusVisual
        visual={{
          kind: "placeholder",
          alt: "Mousse de maracuja servida em taca de vidro",
          prompt:
            "Mousse de maracuja servida em taca de vidro com fundo claro e toque editorial",
          comment:
            "Placeholder: 1376x768 (16:9) - mousse de maracuja em taca de vidro, fundo claro",
        }}
      />
    );

    expect(markup).toContain("Imagem oficial em desenvolvimento");
    expect(markup).toContain("Mousse de maracuja servida em taca de vidro");
    expect(markup).not.toContain("<img");
  });

  it("renders asset visuals with an image tag", () => {
    const markup = renderToStaticMarkup(
      <BonusVisual
        visual={{
          kind: "asset",
          src: "/bonus/receitas-low-carb/01-crepioca.webp",
          alt: "Crepioca dourada em prato claro",
        }}
      />
    );

    expect(markup).toContain("<img");
    expect(markup).toContain("/bonus/receitas-low-carb/01-crepioca.webp");
    expect(markup).toContain("Crepioca dourada em prato claro");
  });
});
