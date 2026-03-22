import { describe, expect, it } from "vitest";

import { isMenuTriggerActive, stickyNavItems } from "./navigation";
import { toPublicPath } from "./siteConfig";

describe("sticky navigation state", () => {
  const itemByKey = Object.fromEntries(
    stickyNavItems.map(item => [item.key, item])
  );

  it("marks Treino active across week routes", () => {
    expect(itemByKey.treino.isActive("/semana/1")).toBe(true);
    expect(itemByKey.treino.isActive("/semana/4/dia/28")).toBe(true);
  });

  it("marks Plano active only on the home route", () => {
    expect(itemByKey.plano.isActive("/")).toBe(true);
    expect(itemByKey.plano.isActive("/biblioteca")).toBe(false);
  });

  it("maps Biblioteca, Progresso and Extras to the expected product routes", () => {
    expect(itemByKey.biblioteca.isActive("/biblioteca")).toBe(true);
    expect(itemByKey.progresso.isActive("/checklist")).toBe(true);
    expect(itemByKey.extras.isActive("/bonus")).toBe(true);
  });

  it("activates the floating menu trigger on FAQ, Apoio and institutional pages", () => {
    expect(isMenuTriggerActive("/faq")).toBe(true);
    expect(isMenuTriggerActive("/apoio")).toBe(true);
    expect(isMenuTriggerActive(toPublicPath("contato"))).toBe(true);
    expect(isMenuTriggerActive("/biblioteca")).toBe(false);
  });
});
