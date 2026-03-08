import { planDays } from "../data/planDays";
import {
  getCurrentWeekFromDay,
  getTodayDayNumber,
  getUpcomingDayItems,
  getWeeklyPlanView,
} from "./planRules";

describe("getTodayDayNumber", () => {
  it("retorna o próximo dia baseado nos concluídos", () => {
    expect(getTodayDayNumber([])).toBe(1);
    expect(getTodayDayNumber([1, 2, 3])).toBe(4);
  });

  it("limita ao máximo de 28 dias", () => {
    const days = Array.from({ length: 28 }, (_, index) => index + 1);
    expect(getTodayDayNumber(days)).toBe(28);
  });
});

describe("getUpcomingDayItems", () => {
  it("retorna 4 próximos dias por padrão com lock", () => {
    const items = getUpcomingDayItems(planDays, 1);

    expect(items).toHaveLength(4);
    expect(items[0]).toMatchObject({
      dayNumber: 2,
      isLocked: true,
      targetRoute: "/app/plano",
    });
  });

  it("respeita limite e fim de plano", () => {
    const nearTheEnd = getUpcomingDayItems(planDays, 27);
    expect(nearTheEnd).toHaveLength(1);
    expect(nearTheEnd[0].dayNumber).toBe(28);

    const customLimit = getUpcomingDayItems(planDays, 3, 2);
    expect(customLimit).toHaveLength(2);
    expect(customLimit[0].dayNumber).toBe(4);
    expect(customLimit[1].dayNumber).toBe(5);
  });
});

describe("weekly plan view", () => {
  it("calcula semana vigente corretamente pelo dia atual", () => {
    expect(getCurrentWeekFromDay(1)).toBe(1);
    expect(getCurrentWeekFromDay(8)).toBe(2);
    expect(getCurrentWeekFromDay(15)).toBe(3);
    expect(getCurrentWeekFromDay(28)).toBe(4);
  });

  it("bloqueia semana 2 enquanto semana 1 não estiver completa", () => {
    const weeks = getWeeklyPlanView(planDays, 4, [1, 2, 3]);
    const week2 = weeks.find((week) => week.weekNumber === 2);

    expect(week2?.isLocked).toBe(true);
    expect(week2?.isUnlocked).toBe(false);
    expect(week2?.lockMessage).toBe("Complete a Semana 1 para liberar");
  });

  it("desbloqueia semana 2 quando semana 1 está completa", () => {
    const weekOneDays = [1, 2, 3, 4, 5, 6, 7];
    const weeks = getWeeklyPlanView(planDays, 8, weekOneDays);
    const week2 = weeks.find((week) => week.weekNumber === 2);

    expect(week2?.isUnlocked).toBe(true);
    expect(week2?.isLocked).toBe(false);
  });
});
