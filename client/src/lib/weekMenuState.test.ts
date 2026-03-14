import { describe, expect, it } from "vitest";

import {
  expandWeekFromLocation,
  initialExpandedWeeks,
  toggleExpandedWeek,
} from "./weekMenuState";

describe("week menu state", () => {
  it("starts with all week sections collapsed", () => {
    expect(initialExpandedWeeks).toEqual([]);
  });

  it("does not expand for non-week routes", () => {
    expect(expandWeekFromLocation([], "/faq")).toEqual([]);
  });

  it("expands current week route when needed", () => {
    expect(expandWeekFromLocation([], "/semana/3/dia/18")).toEqual([
      "/semana/3",
    ]);
  });

  it("does not duplicate expanded week entries", () => {
    expect(expandWeekFromLocation(["/semana/2"], "/semana/2")).toEqual([
      "/semana/2",
    ]);
  });

  it("toggles week expansion", () => {
    expect(toggleExpandedWeek([], "/semana/4")).toEqual(["/semana/4"]);
    expect(toggleExpandedWeek(["/semana/4"], "/semana/4")).toEqual([]);
  });
});
