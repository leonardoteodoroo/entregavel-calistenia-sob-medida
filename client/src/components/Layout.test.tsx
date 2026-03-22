import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import Layout from "./Layout";

vi.mock("wouter", () => ({
  useLocation: () => ["/", vi.fn()],
}));

describe("Layout mobile nav ownership", () => {
  it("does not render the sticky nav directly so the spring animation can persist across route changes", () => {
    const markup = renderToStaticMarkup(
      <Layout>
        <div>Conteúdo</div>
      </Layout>
    );

    expect(markup).not.toContain("mobile-sticky-nav-menu-trigger");
  });
});
