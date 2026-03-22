import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import {
  MobileStickyNav,
  createStickyNavRipple,
  getStickyNavActiveIndex,
  navigateStickyNavItem,
  toggleStickyNavMenu,
} from "./MobileStickyNav";

describe("MobileStickyNav", () => {
  it("maps product routes to the expected active slot", () => {
    expect(getStickyNavActiveIndex("/")).toBe(1);
    expect(getStickyNavActiveIndex("/semana/3/dia/16")).toBe(0);
    expect(getStickyNavActiveIndex("/biblioteca")).toBe(2);
    expect(getStickyNavActiveIndex("/checklist")).toBe(3);
    expect(getStickyNavActiveIndex("/bonus")).toBe(4);
  });

  it("marks contextual routes without rendering the active bubble", () => {
    const markup = renderToStaticMarkup(
      <MobileStickyNav currentPath="/faq" onNavigate={vi.fn()} />
    );

    expect(markup).toContain('data-context-active="true"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).not.toContain("bubble-gradient");
  });

  it("renders the home route with the same active bubble offset used by the lab", () => {
    const markup = renderToStaticMarkup(
      <MobileStickyNav currentPath="/" onNavigate={vi.fn()} />
    );

    expect(markup).toContain("bubble-gradient");
    expect(markup).toContain("transform:translateX(70px)");
    expect(markup).toContain(">Menu<");
  });

  it("builds ripples from the same geometry used by the mobile lab nav", () => {
    const ripple = createStickyNavRipple(
      { width: 70, height: 42, left: 10, top: 20 },
      { clientX: 40, clientY: 44 },
      123
    );

    expect(ripple).toEqual({
      id: 123,
      size: 70,
      x: -5,
      y: -11,
    });
  });

  it("toggles the menu state locally without introducing drawer behavior", () => {
    expect(toggleStickyNavMenu(false)).toBe(true);
    expect(toggleStickyNavMenu(true)).toBe(false);
  });

  it("routes sticky nav clicks through the provided callback", () => {
    const onNavigate = vi.fn();

    navigateStickyNavItem("/bonus", onNavigate);

    expect(onNavigate).toHaveBeenCalledWith("/bonus");
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
