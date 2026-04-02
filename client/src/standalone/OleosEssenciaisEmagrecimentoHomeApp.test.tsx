import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import OleosEssenciaisEmagrecimentoHomeApp from "./OleosEssenciaisEmagrecimentoHomeApp";

describe("OleosEssenciaisEmagrecimentoHomeApp", () => {
  it("renders the exported homepage layout with hero, compounds and protocols", () => {
    const markup = renderToStaticMarkup(
      <OleosEssenciaisEmagrecimentoHomeApp />
    );

    expect(markup).toContain("Botanical Systems");
    expect(markup).toContain(
      "Quantifying the Link: Neurobiology &amp; Weight Regulation"
    );
    expect(markup).toContain("Functional Extracts");
    expect(markup).toContain("Neural Transmission Flow");
    expect(markup).toContain("Standard Operational Protocols");
    expect(markup).toContain("Request Full Report");
  });
});
