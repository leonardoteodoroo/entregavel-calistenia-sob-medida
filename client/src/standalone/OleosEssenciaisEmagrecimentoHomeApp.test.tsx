import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import OleosEssenciaisEmagrecimentoHomeApp from "./OleosEssenciaisEmagrecimentoHomeApp";

describe("OleosEssenciaisEmagrecimentoHomeApp", () => {
  it("renders the real Portuguese home with section CTAs", () => {
    const markup = renderToStaticMarkup(
      <OleosEssenciaisEmagrecimentoHomeApp
        viewModel={{
          title: "Emagrecendo com Óleos Essenciais",
          subtitle: "Subtítulo editorial",
          heroVisual: {
            kind: "placeholder",
            alt: "Hero visual",
            prompt: "Prompt visual",
            comment: "Comentário visual",
            aspectRatio: "4 / 5",
          },
          editorialBlocks: [
            {
              title: "Introdução",
              paragraphs: ["Primeiro parágrafo", "Segundo parágrafo"],
            },
          ],
          sourceReferences: ["PubMed Brasil"],
          sectionCards: [
            {
              id: "section:oleos-essenciais",
              title: "Óleos Essenciais",
              description: "Perfis com foco em humor e rotina.",
              count: 17,
              accent: "sage",
            },
          ],
        }}
        onOpenSection={() => {}}
      />
    );

    expect(markup).toContain("Emagrecendo com Óleos Essenciais");
    expect(markup).toContain("Introdução");
    expect(markup).toContain("Óleos Essenciais");
    expect(markup).toContain("17 conteúdos");
    expect(markup).toContain("Abrir seção");
  });
});
