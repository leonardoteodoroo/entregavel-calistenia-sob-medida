import { renderToReadableStream } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import OleosEssenciaisEmagrecimentoApp from "./OleosEssenciaisEmagrecimentoApp";

async function renderAppAtHash(hash: string): Promise<string> {
  vi.stubGlobal("window", {
    location: { hash },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });

  const stream = await renderToReadableStream(
    <OleosEssenciaisEmagrecimentoApp />
  );
  await stream.allReady;

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let html = "";

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    html += decoder.decode(chunk.value, { stream: true });
  }

  html += decoder.decode();
  return html;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("OleosEssenciaisEmagrecimentoApp", () => {
  it("renders the PT-BR home by default", async () => {
    const markup = await renderAppAtHash("");

    expect(markup).toContain("Emagrecendo com Óleos Essenciais");
    expect(markup).toContain("Introdução");
    expect(markup).toContain("Receitas com Óleos Essenciais");
  });

  it("renders a section list from the hash route", async () => {
    const markup = await renderAppAtHash("#/secao/receitas-com-trimshake");

    expect(markup).toContain("Receitas com TrimShake");
    expect(markup).toContain("Horchata");
    expect(markup).toContain("Voltar para a capa");
  });

  it("renders detail view from encoded hash route", async () => {
    const markup = await renderAppAtHash("#/detalhe/recipe%3Abruschetta");

    expect(markup).toContain("Bruschetta");
    expect(markup).toContain("Ingredientes");
  });
});
