import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import OleosEssenciaisGranolaApp from "./OleosEssenciaisGranolaApp";

describe("OleosEssenciaisGranolaApp", () => {
  it("renders the exported content-page layout with composition and application flow", () => {
    const markup = renderToStaticMarkup(<OleosEssenciaisGranolaApp />);

    expect(markup).toContain("The Ritual");
    expect(markup).toContain("Anti-Cellulite Protocol No. 2");
    expect(markup).toContain("The Composition");
    expect(markup).toContain("Preparation");
    expect(markup).toContain("The Application");
    expect(markup).toContain("Elevating the mundane to the sacred.");
  });
});
