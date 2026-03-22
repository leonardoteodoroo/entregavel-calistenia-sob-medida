import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import ChecklistPage from "./ChecklistPage";

vi.mock("wouter", () => ({
  useLocation: () => ["/checklist", vi.fn()],
}));

describe("ChecklistPage layout", () => {
  it("prioritizes the day grid and reorganizes the progress sections", () => {
    const markup = renderToStaticMarkup(<ChecklistPage />);

    expect(markup).not.toContain("Marque os dias concluídos");
    expect(markup).not.toContain("rounded-[2rem]");
    expect(markup).not.toContain("rounded-[1.5rem]");
    expect(markup).toContain("Visão Semanal");
    expect(markup).toContain("Sua regularidade dividida por fases");
    expect(markup).toContain("Estatística Atual");
    expect(markup).toContain("Clareza de evolução em 28 dias");
    expect(markup).toContain("Conquistas");
    expect(markup).toContain("Primeiro treino");
    expect(markup).toContain("Primeira semana");
    expect(markup).toContain("Metade do desafio");
    expect(markup).toContain("Desafio concluído");
    expect(markup).toContain("S01");
    expect(markup).toContain("S02");
    expect(markup).toContain("S03");
    expect(markup).toContain("S04");
    expect(markup).toContain("text-align:center");
    expect(markup).toContain("grid grid-cols-2 gap-3 mt-6");

    const daysIndex = markup.indexOf(
      "Clique nos dias para marcar como concluído."
    );
    const weeklyIndex = markup.indexOf("Visão Semanal");
    const statsIndex = markup.indexOf("Estatística Atual");
    const achievementsIndex = markup.indexOf("Conquistas");

    expect(daysIndex).toBeGreaterThan(-1);
    expect(weeklyIndex).toBeGreaterThan(daysIndex);
    expect(statsIndex).toBeGreaterThan(weeklyIndex);
    expect(achievementsIndex).toBeGreaterThan(statsIndex);
  });
});
