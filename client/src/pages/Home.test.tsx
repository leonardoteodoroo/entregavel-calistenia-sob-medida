import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import Home from "./Home";

vi.mock("wouter", () => ({
  useLocation: () => ["/", vi.fn()],
}));

describe("Home bonus cards", () => {
  it("renders the sobremesas saudaveis card with a real thumbnail asset", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("/bonus/sobremesas-saudaveis/");
    expect(markup).toContain("Miniatura de sobremesas saudaveis");
    expect(markup).not.toContain("Miniatura editorial de sobremesas saudaveis");
    expect(markup).toContain("77 curtidas");
    expect(markup).toContain("Atualização: 18/03/2026, com carinho");
  });
});
