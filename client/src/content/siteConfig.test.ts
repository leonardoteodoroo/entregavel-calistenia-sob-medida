import { describe, expect, it } from "vitest";

import { standaloneRoutes } from "./siteConfig";

describe("standalone routes", () => {
  it("exposes the sobremesas saudaveis standalone route", () => {
    const routes = standaloneRoutes as Record<string, string>;

    expect(routes.sobremesasSaudaveis).toBe("/sobremesas-saudaveis/");
  });
});
