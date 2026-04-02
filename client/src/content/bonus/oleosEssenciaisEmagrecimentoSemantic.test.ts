import { describe, expect, it } from "vitest";

import {
  generateOleosEssenciaisEmagrecimentoArtifacts,
  type SemanticDocumentContent,
} from "../../../../shared/bonus/oleosEssenciaisEmagrecimentoSemantic";

function parseFixture(text: string): SemanticDocumentContent {
  return generateOleosEssenciaisEmagrecimentoArtifacts({
    documentId: "fixture-doc",
    sourcePath: "fixtures/oleos.txt",
    text,
  }).content;
}

describe("oleos essenciais semantic engine", () => {
  it("parses a simple oil profile with provenance, canonical name and semantic tags", () => {
    const content = parseFixture(`\fLicenciado para - Teste

Óleos essenciais
para Saúde Natural
\fLicenciado para - Teste

Serenity

O doTERRA Serenity™ possui um aroma calmante e relaxante.
Quando utilizado aromaticamente, promove um sono tranquilo.
`);

    const serenity = content.entities.find(entity => entity.id === "oil-profile:serenity");

    expect(serenity).toBeDefined();
    expect(serenity?.kind).toBe("oil_profile");
    expect(serenity?.canonicalName).toBe("Serenity");
    expect(serenity?.sourceBlockIds.length).toBeGreaterThan(0);
    expect(serenity?.semanticTags).toContain("mode:aromatic");
    expect(serenity?.semanticTags).toContain("emotion:calm");
    expect(serenity?.semanticTags).toContain("format:oil_profile");
  });

  it("keeps a recipe entity intact when ingredients and preparation span multiple pages", () => {
    const content = parseFixture(`\fLicenciado para - Teste

Receitas com
Óleos Essenciais
\fLicenciado para - Teste

Pão de Abóbora

INGREDIENTES

250g de purê de abóbora japonesa
5 gotas de óleo essencial Basil
80ml de água
\fLicenciado para - Teste

MODO DE PREPARO

Misture os ingredientes secos.
Junte os ingredientes úmidos, inclusive o óleo essencial Basil.
`);

    const recipe = content.entities.find(entity => entity.id === "recipe:pao-de-abobora");

    expect(recipe).toBeDefined();
    expect(recipe?.kind).toBe("recipe");
    expect(recipe?.fields.ingredients).toEqual([
      "250g de purê de abóbora japonesa",
      "5 gotas de óleo essencial Basil",
      "80ml de água",
    ]);
    expect(recipe?.fields.instructionsSteps).toEqual([
      "Misture os ingredientes secos.",
      "Junte os ingredientes úmidos, inclusive o óleo essencial Basil.",
    ]);
    expect(recipe?.sourceBlockIds.length).toBeGreaterThanOrEqual(2);
    expect(recipe?.fields.referencedCanonicalNames).toContain("Basil");
  });

  it("parses a topical formula without requiring a modo de preparo heading", () => {
    const content = parseFixture(`\fLicenciado para - Teste

Uso Tópico
\fLicenciado para - Teste

Óleo de massagem
Anti-Celulite
INGREDIENTES
10ml de óleo de coco fracionado
3 gotas de Grapefruit
3 gotas de Petitgrain
2 gotas de Lime
1 gotas de Gengibre
Adicione essa mistura em um pequeno frasco e massageie áreas afetadas durante 5 minutos uma vez ao dia
`);

    const formula = content.entities.find(
      entity => entity.id === "topical-formula:oleo-de-massagem-anti-celulite"
    );

    expect(formula).toBeDefined();
    expect(formula?.kind).toBe("topical_formula");
    expect(formula?.fields.ingredients).toContain("3 gotas de Petitgrain");
    expect(formula?.fields.instructionsSteps).toEqual([
      "Adicione essa mistura em um pequeno frasco e massageie áreas afetadas durante 5 minutos uma vez ao dia",
    ]);
    expect(formula?.semanticTags).toContain("mode:topical");
  });

  it("splits diffuser groups into separate diffuser_blend entities", () => {
    const content = parseFixture(`\fLicenciado para - Teste

Ingestão e
Aromaterapia
\fLicenciado para - Teste

No difusor
Algumas combinações para utilizar no difusor ultrassônico:
2 gotas de Cinnamon Bark
2 gotas de Frankincense
2 gotas de Cedro
2 gotas de Peppermint

2 gotas de Grapefruit
2 gotas de Peppermint
2 gotas de Ylang Ylang
`);

    const blends = content.entities.filter(entity => entity.kind === "diffuser_blend");

    expect(blends).toHaveLength(2);
    expect(blends[0]?.fields.ingredients).toEqual([
      "2 gotas de Cinnamon Bark",
      "2 gotas de Frankincense",
      "2 gotas de Cedro",
      "2 gotas de Peppermint",
    ]);
    expect(blends[1]?.fields.ingredients).toEqual([
      "2 gotas de Grapefruit",
      "2 gotas de Peppermint",
      "2 gotas de Ylang Ylang",
    ]);
  });

  it("extracts tip and mindset items sentence by sentence with polarity", () => {
    const content = parseFixture(`\fLicenciado para - Teste

Dicas
\fLicenciado para - Teste

Beba água, isso é essencial.
Pratique exercícios sempre que possivel.
\fLicenciado para - Teste

Nossa mente
\fLicenciado para - Teste

"Hoje posso comer um doce porque mereço!"
"Eu posso, eu consigo!"
`);

    const tipItems = content.entities.filter(entity => entity.kind === "tip_item");
    const mindsetItems = content.entities.filter(entity => entity.kind === "mindset_item");

    expect(tipItems.map(entity => entity.fields.sentence)).toEqual([
      "Beba água, isso é essencial.",
      "Pratique exercícios sempre que possivel.",
    ]);
    expect(
      mindsetItems.map(entity => ({
        sentence: entity.fields.sentence,
        polarity: entity.fields.polarity,
      }))
    ).toEqual([
      {
        sentence: "Hoje posso comer um doce porque mereço!",
        polarity: "negative",
      },
      {
        sentence: "Eu posso, eu consigo!",
        polarity: "positive",
      },
    ]);
  });

  it("produces stable ids and explicit block classifications across identical runs", () => {
    const fixture = `\fLicenciado para - Teste

Conclusão
\fLicenciado para - Teste

Espero que essas dicas possam ajudar.

Fontes:
PubMed Brasil
`;

    const firstRun = generateOleosEssenciaisEmagrecimentoArtifacts({
      documentId: "fixture-doc",
      sourcePath: "fixtures/oleos.txt",
      text: fixture,
    });
    const secondRun = generateOleosEssenciaisEmagrecimentoArtifacts({
      documentId: "fixture-doc",
      sourcePath: "fixtures/oleos.txt",
      text: fixture,
    });

    expect(firstRun.content.entities.map(entity => entity.id)).toEqual(
      secondRun.content.entities.map(entity => entity.id)
    );
    expect(
      firstRun.master.blocks.every(
        block => typeof block.classification === "string" && block.classification.length > 0
      )
    ).toBe(true);
    expect(firstRun.master.stats.unclassifiedBlockCount).toBe(0);
  });
});
