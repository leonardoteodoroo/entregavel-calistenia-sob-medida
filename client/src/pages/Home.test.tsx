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

  it("renders the new bonus card for the meal plan shelf", () => {
    const markup = renderToStaticMarkup(<Home />);
    const todayLabel = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date());

    expect(markup).toContain("Seu Plano Alimentar");
    expect(markup).toContain("/plano-alimentar/");
    expect(markup).toContain(
      "/assets/images/alimentacao/v3/meal-prep-semanal.webp"
    );
    expect(markup).toContain(
      "Abra seu plano alimentar com refeições guiadas, trocas fáceis, hidratação do dia e lista da semana organizada para você."
    );
    expect(markup).toContain("94 curtidas");
    expect(markup).toContain(`Atualização: ${todayLabel}, com carinho`);
  });

  it("keeps the oleos essenciais bonus hidden from the main project shelf", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).not.toContain("/oleos-essenciais-emagrecimento/");
    expect(markup).not.toContain("115 curtidas");
    expect(markup).not.toContain(
      "Frascos âmbar de óleos essenciais com fatias cítricas e folhas verdes"
    );
  });

  it("renders the quick navigation section with the compact responsive grid and original copy", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Navegação rápida");
    expect(markup).toContain("Acesse direto o que você precisa");
    expect(markup).toContain(
      "Biblioteca técnica, alimentação, checklist e suporte agora têm páginas próprias."
    );
    expect(markup).toContain("Plano alimentar");
    expect(markup).toContain("Biblioteca de exercícios");
    expect(markup).toContain("Checklist de 28 dias");
    expect(markup).toContain("FAQ");
    expect(markup).toContain("Apoio e continuidade");
    expect(markup).toContain("Bônus: conteúdos extras");
    expect(markup).toContain("minmax(min(140px, 100%), 1fr)");
    expect(markup).toContain("transition-[transform,box-shadow,border-color]");
    expect(markup).toContain("active:scale-[0.98]");
    expect(markup).toContain(
      "box-shadow:0 2px 6px rgba(44, 44, 44, 0.05), 0 10px 24px rgba(44, 44, 44, 0.08)"
    );
  });

  it("renders the hero week buttons with the glassy tactile treatment", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Semana 1");
    expect(markup).toContain("Semana 2");
    expect(markup).toContain("Semana 3");
    expect(markup).toContain("Semana 4");
    expect(markup).toContain("Adaptação e Constância");
    expect(markup).toContain("Base e Controle");
    expect(markup).toContain("Ganho de Ritmo");
    expect(markup).toContain("Consolidação");
    expect(markup).toContain(
      "transition-[transform,box-shadow,border-color,background-color]"
    );
    expect(markup).toContain("hover:scale-[0.98]");
    expect(markup).toContain("minmax(min(140px, 100%), 1fr)");
    expect(markup).toContain(
      "font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--color-charcoal-light);font-weight:600"
    );
    expect(markup).toContain(
      "box-shadow:0 2px 8px rgba(44, 44, 44, 0.1), 0 12px 22px rgba(44, 44, 44, 0.12)"
    );
  });

  it("renders the 4-step section with elevated week blocks and tactile inner buttons", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Método em 4 etapas");
    expect(markup).toContain("A lógica das 4 semanas");
    expect(markup).toContain("Abrir semana 1");
    expect(markup).toContain("Abrir semana 2");
    expect(markup).toContain("Abrir semana 3");
    expect(markup).toContain("Abrir semana 4");
    expect(markup).toContain(
      "grid-template-columns:repeat(auto-fit, minmax(min(140px, 100%), 1fr))"
    );
    expect(markup).toContain(
      "margin-top:0.12rem;font-size:0.7rem;color:var(--color-charcoal-light);line-height:1.35;font-weight:500"
    );
    expect(markup).toContain(
      "transition-[box-shadow,border-color,background-color]"
    );
    expect(markup).toContain(
      "box-shadow:0 2px 8px rgba(44, 44, 44, 0.04), 0 10px 22px rgba(44, 44, 44, 0.05)"
    );
    expect(markup).toContain("mt-auto w-full rounded font-body");
    expect(markup).toContain("transition-[transform,box-shadow,border-color]");
    expect(markup).toContain(
      "box-shadow:0 1px 4px rgba(44, 44, 44, 0.05), 0 6px 14px rgba(44, 44, 44, 0.07)"
    );
  });

  it("renders the value perception section with compact mobile cards and a full-width final card", () => {
    const markup = renderToStaticMarkup(<Home />);
    const sectionStart = markup.indexOf("Percepção de valor");
    const sectionEnd = markup.indexOf("Anote esses sinais.", sectionStart);
    const sectionMarkup = markup.slice(
      sectionStart,
      sectionEnd === -1 ? undefined : sectionEnd
    );

    expect(sectionMarkup).toContain("Percepção de valor");
    expect(sectionMarkup).toContain("Sinais de progresso além do peso");
    expect(sectionMarkup).toContain("Melhor foco mental");
    expect(sectionMarkup).toContain(
      "grid-template-columns:repeat(auto-fit, minmax(min(140px, 100%), 1fr))"
    );
    expect(sectionMarkup).toContain("col-span-full sm:col-span-1");
    expect(sectionMarkup).toContain(
      "font-size:1.35rem;margin-bottom:0.45rem;text-align:center"
    );
    expect(sectionMarkup).toContain(
      "font-size:0.88rem;font-weight:500;color:var(--color-charcoal);margin-bottom:0.3rem;text-align:center"
    );
    expect(sectionMarkup).not.toContain("box-shadow:");
    expect(sectionMarkup).not.toContain("transition-[");
  });
});
