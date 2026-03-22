import { describe, expect, it } from "vitest";

import { productRoutes, standaloneRoutes } from "./siteConfig";

describe("standalone routes", () => {
  it("exposes the sobremesas saudaveis standalone route", () => {
    const routes = standaloneRoutes as Record<string, string>;

    expect(routes.sobremesasSaudaveis).toBe("/sobremesas-saudaveis/");
  });
});

describe("product routes", () => {
  it("exposes the bonus route for the shared sticky navigation", () => {
    expect(productRoutes.bonus).toBe("/bonus");
  });
});
