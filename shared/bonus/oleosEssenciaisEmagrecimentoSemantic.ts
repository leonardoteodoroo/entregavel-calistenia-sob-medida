import crypto from "node:crypto";

import type {
  AliasEntry,
  AliasType,
  ContentEntity,
  DocumentMaster,
  DocumentPage,
  GenerateSemanticArtifactsInput,
  GenerateSemanticArtifactsResult,
  Relation,
  SemanticDocumentContent,
  SemanticEntityKind,
  SourceBlock,
} from "./oleosEssenciaisEmagrecimentoSchema";

export type {
  AliasEntry,
  ContentEntity,
  DocumentMaster,
  DocumentPage,
  GenerateSemanticArtifactsInput,
  GenerateSemanticArtifactsResult,
  Relation,
  SemanticDocumentContent,
  SemanticEntityKind,
  SourceBlock,
} from "./oleosEssenciaisEmagrecimentoSchema";

type SectionId =
  | "front_matter"
  | "table_of_contents"
  | "introducao"
  | "apresentacao"
  | "oleos_essenciais"
  | "receitas_oleos"
  | "receitas_trimshake"
  | "bebidas_oleos"
  | "uso_topico"
  | "ingestao_aromaterapia"
  | "dicas"
  | "nossa_mente"
  | "conclusao";

interface SectionDefinition {
  id: SectionId;
  title: string;
  order: number;
  actualHeadings: string[];
}

interface ItemGroup {
  title: string;
  blocks: SourceBlock[];
  sectionId: SectionId;
}

interface CanonicalMatch {
  alias: string;
  canonicalName: string;
  aliasType: AliasType;
}

const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    id: "table_of_contents",
    title: "Conteúdo",
    order: 0,
    actualHeadings: ["Conteúdo"],
  },
  {
    id: "introducao",
    title: "Introdução",
    order: 1,
    actualHeadings: ["Introdução"],
  },
  {
    id: "apresentacao",
    title: "Apresentação",
    order: 2,
    actualHeadings: ["Apresentação"],
  },
  {
    id: "oleos_essenciais",
    title: "Óleos Essenciais",
    order: 3,
    actualHeadings: ["Óleos essenciais para Saúde Natural", "Óleos Essenciais"],
  },
  {
    id: "receitas_oleos",
    title: "Receitas com Óleos Essenciais",
    order: 4,
    actualHeadings: ["Receitas com Óleos Essenciais"],
  },
  {
    id: "receitas_trimshake",
    title: "Receitas com TrimShake",
    order: 5,
    actualHeadings: ["Receitas com TrimShake", "Receitas com Trim Shake"],
  },
  {
    id: "bebidas_oleos",
    title: "Bebidas com Óleos Essenciais",
    order: 6,
    actualHeadings: ["Bebidas com Óleos Essenciais"],
  },
  {
    id: "uso_topico",
    title: "Uso Tópico",
    order: 7,
    actualHeadings: ["Uso Tópico"],
  },
  {
    id: "ingestao_aromaterapia",
    title: "Ingestão e Aromaterapia",
    order: 8,
    actualHeadings: ["Ingestão e Aromaterapia"],
  },
  {
    id: "dicas",
    title: "Dicas",
    order: 9,
    actualHeadings: ["Dicas"],
  },
  {
    id: "nossa_mente",
    title: "Nossa mente",
    order: 10,
    actualHeadings: ["Nossa mente"],
  },
  {
    id: "conclusao",
    title: "Conclusão",
    order: 11,
    actualHeadings: ["Conclusão"],
  },
];

const ITEM_HEAVY_SECTION_IDS = new Set<SectionId>([
  "oleos_essenciais",
  "receitas_oleos",
  "receitas_trimshake",
  "bebidas_oleos",
  "uso_topico",
  "ingestao_aromaterapia",
]);

const TOC_TARGETS = [
  { title: "Introdução", sectionId: "section:introducao" },
  { title: "Apresentação", sectionId: "section:apresentacao" },
  { title: "Óleos Essenciais", sectionId: "section:oleos-essenciais" },
  {
    title: "Receitas com Óleos Essenciais",
    sectionId: "section:receitas-com-oleos-essenciais",
  },
  {
    title: "Receitas com TrimShake",
    sectionId: "section:receitas-com-trimshake",
  },
  {
    title: "Bebidas com Óleos Essenciais",
    sectionId: "section:bebidas-com-oleos-essenciais",
  },
  { title: "Uso Tópico", sectionId: "section:uso-topico" },
  {
    title: "Ingestão e Aromaterapia",
    sectionId: "section:ingestao-e-aromaterapia",
  },
  { title: "Dicas", sectionId: "section:dicas" },
  { title: "Nossa mente", sectionId: "section:nossa-mente" },
  { title: "Conclusão", sectionId: "section:conclusao" },
] as const;

const SECTION_LOOKUP = new Map(
  SECTION_DEFINITIONS.flatMap(section =>
    section.actualHeadings.map(heading => [normalizeForLookup(heading), section] as const)
  )
);

const rawAliasEntries = [
  ["Serenity", "Serenity", "oil"],
  ["Lime", "Lime", "oil"],
  ["Lemon", "Lemon", "oil"],
  ["Lime e Lemon", "Lime e Lemon", "oil"],
  ["Basil", "Basil", "oil"],
  ["Manjericão", "Basil", "oil"],
  ["Camomila Romana", "Camomila Romana", "oil"],
  ["Roman Chamomile", "Camomila Romana", "oil"],
  ["Smart & Sassy", "Smart & Sassy", "oil"],
  ["Balance", "Balance", "oil"],
  ["Wild Orange", "Wild Orange", "oil"],
  ["Grapefruit", "Grapefruit", "oil"],
  ["Cinnamon Bark", "Cinnamon Bark", "oil"],
  ["Canela", "Cinnamon Bark", "oil"],
  ["Gengibre", "Gengibre", "oil"],
  ["Ginger", "Gengibre", "oil"],
  ["Peppermint", "Peppermint", "oil"],
  ["Alecrim", "Alecrim", "oil"],
  ["Rosemary", "Alecrim", "oil"],
  ["Fennel", "Fennel", "oil"],
  ["Erva doce", "Fennel", "oil"],
  ["Turmeric", "Turmeric", "oil"],
  ["Curcuma", "Turmeric", "oil"],
  ["Sândalo Hawaiano", "Sândalo Hawaiano", "oil"],
  ["Sandalo Hawaiano", "Sândalo Hawaiano", "oil"],
  ["Sândalo", "Sândalo Hawaiano", "oil"],
  ["Sandalo", "Sândalo Hawaiano", "oil"],
  ["Cilantro", "Cilantro", "oil"],
  ["Coentro", "Cilantro", "oil"],
  ["Petitgrain", "Petitgrain", "oil"],
  ["Juniper Berry", "Juniper Berry", "oil"],
  ["Zimbro", "Juniper Berry", "oil"],
  ["Clove", "Clove", "oil"],
  ["Cravo", "Clove", "oil"],
  ["Black Pepper", "Black Pepper", "oil"],
  ["Pimenta do Reino", "Black Pepper", "oil"],
  ["Frankincense", "Frankincense", "oil"],
  ["Olíbano", "Frankincense", "oil"],
  ["Lavanda", "Lavanda", "oil"],
  ["Cedro", "Cedro", "oil"],
  ["Ylang Ylang", "Ylang Ylang", "oil"],
  ["Clary Sage", "Clary Sage", "oil"],
  ["Tangerina", "Tangerina", "oil"],
  ["Tangerine", "Tangerina", "oil"],
  ["Cipreste", "Cipreste", "oil"],
  ["Cypress", "Cipreste", "oil"],
  ["Zendocrine", "Zendocrine", "oil"],
  ["Deep Blue Rub", "Deep Blue Rub", "oil"],
  ["Limoneno", "Limoneno", "compound"],
  ["Nootkathone", "Nootkathone", "compound"],
  ["Linalol", "Linalol", "compound"],
  ["Trans-2-decenal", "Trans-2-decenal", "compound"],
] as const satisfies readonly [string, string, AliasType][];

const aliasEntries: AliasEntry[] = rawAliasEntries.map(
  ([alias, canonicalName, aliasType]) => ({
    alias,
    canonicalName,
    aliasType,
  })
);

const aliasLookup = new Map(
  aliasEntries.map(entry => [normalizeForLookup(entry.alias), entry] as const)
);

export function generateOleosEssenciaisEmagrecimentoArtifacts(
  input: GenerateSemanticArtifactsInput
): GenerateSemanticArtifactsResult {
  const normalizedSource = input.text.replace(/\r\n?/g, "\n");
  const sourceChecksum = crypto
    .createHash("sha256")
    .update(normalizedSource)
    .digest("hex");

  const pages = splitPages(normalizedSource);
  const masterPages: DocumentPage[] = [];
  const rawBlocks: SourceBlock[] = [];
  let removedBoilerplateLineCount = 0;

  for (const page of pages) {
    const cleanedLines = page.lines.filter(line => !isBoilerplateLine(line));
    removedBoilerplateLineCount += page.lines.length - cleanedLines.length;
    const cleanedText = cleanedLines.join("\n").trim();

    masterPages.push({
      id: `page:${page.pageIndex}`,
      pageIndex: page.pageIndex,
      rawText: page.rawText,
      cleanedText,
      removedBoilerplateLines: page.lines.length - cleanedLines.length,
    });

    rawBlocks.push(...buildBlocksFromLines(page.pageIndex, cleanedLines));
  }

  const expandedBlocks = expandCompositeBlocks(rawBlocks);
  const blocks = assignSectionContexts(expandedBlocks);

  const entities: ContentEntity[] = [];

  entities.push(...createSectionEntities(blocks));
  entities.push(...createTocEntities(blocks, sourceChecksum, input.sourcePath));
  entities.push(...createFrontMatterWarnings(blocks));
  entities.push(...createOilProfileEntities(blocks));
  entities.push(...createRecipeEntities(blocks, "receitas_oleos", "recipe"));
  entities.push(
    ...createRecipeEntities(blocks, "receitas_trimshake", "trimshake_recipe")
  );
  entities.push(...createRecipeEntities(blocks, "bebidas_oleos", "drink"));
  entities.push(...createRecipeEntities(blocks, "uso_topico", "topical_formula"));
  entities.push(
    ...createIngestionAndDiffuserEntities(blocks, "ingestao_aromaterapia")
  );
  entities.push(...createTipEntities(blocks));
  entities.push(...createMindsetEntities(blocks));
  entities.push(...createClosingEntities(blocks));

  const linkedEntities = linkEntityRelations(entities);
  const content = buildContentDocument(
    linkedEntities,
    aliasEntries,
    input.documentId,
    input.sourcePath,
    sourceChecksum
  );

  const classificationCounts = countBy(blocks.map(block => block.classification));
  const master: DocumentMaster = {
    documentId: input.documentId,
    sourcePath: input.sourcePath,
    sourceChecksum,
    pages: masterPages,
    blocks,
    stats: {
      rawPageCount: normalizedSource.split("\f").length,
      pageCount: masterPages.length,
      blockCount: blocks.length,
      nonBoilerplateBlockCount: blocks.length,
      removedBoilerplateLineCount,
      classificationCounts,
      unclassifiedBlockCount: blocks.filter(block => !block.classification).length,
    },
  };

  return { master, content };
}

function splitPages(text: string): Array<{ pageIndex: number; rawText: string; lines: string[] }> {
  return text
    .split("\f")
    .map(rawText => rawText.replace(/^\n+|\n+$/g, ""))
    .filter(rawText => rawText.trim().length > 0)
    .map((rawText, index) => ({
      pageIndex: index + 1,
      rawText,
      lines: rawText.split("\n"),
    }));
}

function buildBlocksFromLines(pageIndex: number, lines: string[]): SourceBlock[] {
  const blocks: SourceBlock[] = [];
  let blockStart = -1;
  let currentLines: string[] = [];

  const flush = (lineIndex: number) => {
    if (!currentLines.length || blockStart === -1) {
      currentLines = [];
      blockStart = -1;
      return;
    }

    const rawText = currentLines.join("\n");
    blocks.push({
      id: `block:p${pageIndex}:${blockStart}-${lineIndex}`,
      pageIndex,
      lineStart: blockStart,
      lineEnd: lineIndex,
      sectionContext: null,
      rawText,
      normalizedText: normalizeBlockText(rawText),
      classification: classifyBlock(rawText),
    });

    currentLines = [];
    blockStart = -1;
  };

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (line.trim().length === 0) {
      flush(lineNumber - 1);
      return;
    }

    if (blockStart === -1) {
      blockStart = lineNumber;
    }

    currentLines.push(line);
  });

  flush(lines.length);
  return blocks;
}

function expandCompositeBlocks(blocks: SourceBlock[]): SourceBlock[] {
  const expanded: SourceBlock[] = [];

  for (const block of blocks) {
    const wholeBlockNormalized = normalizeForLookup(
      collapseWhitespace(block.normalizedText)
    );
    if (SECTION_LOOKUP.has(wholeBlockNormalized)) {
      expanded.push(block);
      continue;
    }

    const lines = block.rawText.split("\n").map(line => line.trimEnd());
    const segments: Array<{ lines: string[]; lineStart: number; lineEnd: number }> = [];
    let currentSegment: string[] = [];
    let currentStart = block.lineStart;

    const pushSegment = (endLine: number) => {
      if (!currentSegment.length) return;
      segments.push({
        lines: currentSegment,
        lineStart: currentStart,
        lineEnd: endLine,
      });
      currentSegment = [];
      currentStart = endLine + 1;
    };

    lines.forEach((line, index) => {
      const lineNumber = block.lineStart + index;
      const normalizedLine = normalizeForLookup(line);
      const isHardSplit =
        normalizedLine === "ingredientes" ||
        normalizedLine === "modo de preparo" ||
        normalizedLine === "fontes:" ||
        normalizedLine === "no difusor" ||
        SECTION_LOOKUP.has(normalizedLine);

      if (isHardSplit && currentSegment.length) {
        pushSegment(lineNumber - 1);
      }

      currentSegment.push(line);

      if (isHardSplit) {
        pushSegment(lineNumber);
      }
    });

    pushSegment(block.lineEnd);

    const cleanedSegments = segments.length
      ? segments
      : [{ lines, lineStart: block.lineStart, lineEnd: block.lineEnd }];

    cleanedSegments.forEach((segment, index) => {
      const rawText = segment.lines.join("\n").trim();
      if (!rawText) return;
      expanded.push({
        ...block,
        id: cleanedSegments.length === 1 ? block.id : `${block.id}.${index + 1}`,
        lineStart: segment.lineStart,
        lineEnd: segment.lineEnd,
        rawText,
        normalizedText: normalizeBlockText(rawText),
        classification: classifyBlock(rawText),
      });
    });
  }

  return expanded;
}

function assignSectionContexts(blocks: SourceBlock[]): SourceBlock[] {
  let currentSection: SectionId = "front_matter";

  return blocks.map((block, index) => {
    const collapsed = collapseWhitespace(block.normalizedText);
    const normalized = normalizeForLookup(collapsed);
    const nextBlock = blocks[index + 1];
    let classification = block.classification;

    if (normalized === normalizeForLookup("Conteúdo")) {
      currentSection = "table_of_contents";
      classification = "section_heading";
    } else {
      const matchedSection = SECTION_LOOKUP.get(normalized);
      if (
        matchedSection &&
        matchedSection.id !== "table_of_contents" &&
        shouldPromoteToActualSectionHeading(block, nextBlock, currentSection)
      ) {
        currentSection = matchedSection.id;
        classification = "section_heading";
      }
    }

    return {
      ...block,
      sectionContext: currentSection,
      classification,
    };
  });
}

function shouldPromoteToActualSectionHeading(
  block: SourceBlock,
  nextBlock: SourceBlock | undefined,
  currentSection: SectionId
): boolean {
  if (currentSection !== "table_of_contents") {
    return true;
  }

  if (!nextBlock) {
    return true;
  }

  const nextNormalized = normalizeForLookup(collapseWhitespace(nextBlock.normalizedText));
  if (SECTION_LOOKUP.has(nextNormalized) || /^\d+$/.test(nextNormalized)) {
    return false;
  }

  return true;
}

function createSectionEntities(blocks: SourceBlock[]): ContentEntity[] {
  const sectionBlocks = blocks.filter(block => block.classification === "section_heading");

  return sectionBlocks
    .filter(block => block.sectionContext && block.sectionContext !== "table_of_contents")
    .map(block => {
      const sectionId = block.sectionContext as SectionId;
      const relevantBlocks = collectSectionBlocks(blocks, sectionId);
      const relationTarget = undefined;
      const title = getSectionTitle(sectionId);
      const sourceBlockIds = relevantBlocks.map(candidate => candidate.id);
      const rawExcerpt = joinBlockText(relevantBlocks, true);
      const displayText = joinBlockText(relevantBlocks, false);
      const semanticTags = uniqueStrings([`format:section`, `section:${slugify(title)}`]);

      const entity: ContentEntity = {
        id: `section:${slugify(title)}`,
        kind: "section",
        title,
        displayText,
        canonicalName: title,
        sourceBlockIds,
        rawExcerpt,
        fields: {
          sectionId,
          order: getSectionOrder(sectionId),
        },
        semanticTags,
        relations: relationTarget ? [relationTarget] : [],
        retrievalText: "",
      };

      return withRetrievalText(entity);
    });
}

function createTocEntities(
  blocks: SourceBlock[],
  sourceChecksum: string,
  sourcePath: string
): ContentEntity[] {
  const tocBlocks = blocks.filter(block => block.sectionContext === "table_of_contents");
  if (!tocBlocks.length) {
    return [];
  }

  const pageHints = tocBlocks
    .map(block => collapseWhitespace(block.normalizedText))
    .filter(text => /^\d+$/.test(text))
    .map(text => Number.parseInt(text, 10));

  return TOC_TARGETS.map((target, index) => {
    const pageHint = pageHints[index];
    const sourceBlock = tocBlocks[index + 1] ?? tocBlocks[0];
    const relation: Relation = {
      type: "links_to_section",
      fromId: `toc-item:${slugify(target.title)}`,
      toId: target.sectionId,
    };

    return withRetrievalText({
      id: `toc-item:${slugify(target.title)}`,
      kind: "toc_item",
      title: target.title,
      displayText: target.title,
      canonicalName: target.title,
      sourceBlockIds: sourceBlock ? [sourceBlock.id] : [],
      rawExcerpt: sourceBlock?.rawText ?? target.title,
      fields: {
        pageHint,
        sourceChecksum,
        sourcePath,
      },
      semanticTags: ["format:toc_item"],
      relations: [relation],
      retrievalText: "",
    });
  });
}

function createFrontMatterWarnings(blocks: SourceBlock[]): ContentEntity[] {
  const warningBlocks = blocks.filter(block => {
    const text = collapseWhitespace(block.normalizedText).toLowerCase();
    return (
      block.sectionContext === "front_matter" ||
      text === "observações importantes" ||
      text.includes("não faça ingestão") ||
      text.includes("não sair ao sol") ||
      text.includes("consulte sempre um médico")
    );
  });

  const entities: ContentEntity[] = [];
  let warningIndex = 1;

  for (const block of warningBlocks) {
    const title =
      collapseWhitespace(block.normalizedText).length <= 80
        ? collapseWhitespace(block.normalizedText)
        : `Aviso ${warningIndex}`;

    entities.push(
      withRetrievalText({
        id: `warning:${slugify(title || `warning-${warningIndex}`)}`,
        kind: "warning",
        title,
        displayText: collapseWhitespace(block.normalizedText),
        sourceBlockIds: [block.id],
        rawExcerpt: block.rawText,
        fields: {
          sectionContext: block.sectionContext,
        },
        semanticTags: deriveSemanticTags(
          "warning",
          collapseWhitespace(block.normalizedText),
          {}
        ),
        relations: [],
        retrievalText: "",
      })
    );
    warningIndex += 1;
  }

  return dedupeEntities(entities);
}

function createOilProfileEntities(blocks: SourceBlock[]): ContentEntity[] {
  const oilBlocks = blocks.filter(block => block.sectionContext === "oleos_essenciais");
  const items = groupItemsByTitle(oilBlocks, "oleos_essenciais");

  return items.map(item => {
    const title = item.title;
    const canonicalName = canonicalizeName(title)?.canonicalName ?? title;
    const blockText = joinBlockText(item.blocks, false);
    const referencedCanonicalNames = extractCanonicalMatches(blockText).map(
      match => match.canonicalName
    );
    const usageModes = extractUsageModes(blockText);
    const activeCompounds = extractCanonicalMatches(blockText)
      .filter(match => match.aliasType === "compound")
      .map(match => match.canonicalName);

    return withRetrievalText({
      id: `oil-profile:${slugify(canonicalName)}`,
      kind: "oil_profile",
      title,
      displayText: blockText,
      canonicalName,
      parentSectionId: "section:oleos-essenciais",
      sourceBlockIds: item.blocks.map(block => block.id),
      rawExcerpt: joinBlockText(item.blocks, true),
      fields: {
        usageModes,
        activeCompounds,
        referencedCanonicalNames: uniqueStrings(referencedCanonicalNames),
      },
      semanticTags: deriveSemanticTags("oil_profile", blockText, {
        usageModes,
      }),
      relations: [],
      retrievalText: "",
    });
  });
}

function createRecipeEntities(
  blocks: SourceBlock[],
  sectionId: Extract<
    SectionId,
    "receitas_oleos" | "receitas_trimshake" | "bebidas_oleos" | "uso_topico"
  >,
  kind: Extract<
    SemanticEntityKind,
    "recipe" | "trimshake_recipe" | "drink" | "topical_formula"
  >
): ContentEntity[] {
  const sectionBlocks = blocks.filter(block => block.sectionContext === sectionId);
  const items = groupItemsByTitle(sectionBlocks, sectionId);

  return items.map(item => {
    const parsedItem = parseStructuredItem(item, kind);
    return withRetrievalText(parsedItem);
  });
}

function createIngestionAndDiffuserEntities(
  blocks: SourceBlock[],
  sectionId: Extract<SectionId, "ingestao_aromaterapia">
): ContentEntity[] {
  const sectionBlocks = blocks.filter(block => block.sectionContext === sectionId);
  const items = groupItemsByTitle(sectionBlocks, sectionId);
  const entities: ContentEntity[] = [];

  for (const item of items) {
    if (normalizeForLookup(item.title) === "no difusor") {
      entities.push(...parseDiffuserItem(item));
      continue;
    }

    entities.push(withRetrievalText(parseStructuredItem(item, "ingestion_formula")));
  }

  const warningBlocks = sectionBlocks.filter(
    block =>
      !items.some(item => item.blocks.some(candidate => candidate.id === block.id)) &&
      block.classification === "content_block"
  );

  warningBlocks.forEach((block, index) => {
    entities.push(
      withRetrievalText({
        id: `warning:ingestao-aromaterapia-${index + 1}`,
        kind: "warning",
        title: `Aviso de ingestão ${index + 1}`,
        displayText: collapseWhitespace(block.normalizedText),
        parentSectionId: "section:ingestao-e-aromaterapia",
        sourceBlockIds: [block.id],
        rawExcerpt: block.rawText,
        fields: {
          sectionContext: sectionId,
        },
        semanticTags: deriveSemanticTags(
          "warning",
          collapseWhitespace(block.normalizedText),
          {}
        ),
        relations: [],
        retrievalText: "",
      })
    );
  });

  return dedupeEntities(entities);
}

function createTipEntities(blocks: SourceBlock[]): ContentEntity[] {
  const tipBlocks = blocks.filter(block => block.sectionContext === "dicas");
  const entities: ContentEntity[] = [];
  let tipIndex = 1;

  tipBlocks.forEach(block => {
    const normalized = collapseWhitespace(block.normalizedText);
    if (!normalized || normalized === "Dicas") {
      return;
    }

    if (normalizeForLookup(normalized) === "nao existe milagre") {
      entities.push(
        withRetrievalText({
          id: "warning:nao-existe-milagre",
          kind: "warning",
          title: "NÃO EXISTE MILAGRE",
          displayText: normalized,
          parentSectionId: "section:dicas",
          sourceBlockIds: [block.id],
          rawExcerpt: block.rawText,
          fields: {
            sectionContext: "dicas",
          },
          semanticTags: ["format:warning", "goal:habit_change"],
          relations: [],
          retrievalText: "",
        })
      );
      return;
    }

    splitIntoSentences(normalized).forEach(sentence => {
      entities.push(
        withRetrievalText({
          id: `tip-item:${slugify(`${tipIndex}-${sentence}`)}`,
          kind: "tip_item",
          title: `Dica ${tipIndex}`,
          displayText: sentence,
          parentSectionId: "section:dicas",
          sourceBlockIds: [block.id],
          rawExcerpt: sentence,
          fields: {
            sentence,
          },
          semanticTags: deriveSemanticTags("tip_item", sentence, {}),
          relations: [],
          retrievalText: "",
        })
      );
      tipIndex += 1;
    });
  });

  return entities;
}

function createMindsetEntities(blocks: SourceBlock[]): ContentEntity[] {
  const mindsetBlocks = blocks.filter(block => block.sectionContext === "nossa_mente");
  const entities: ContentEntity[] = [];
  let positiveMode = false;
  let mindsetIndex = 1;

  mindsetBlocks.forEach(block => {
    const normalized = collapseWhitespace(block.normalizedText);
    if (!normalized || normalized === "Nossa mente") {
      return;
    }

    const segments = block.rawText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    segments.forEach(segment => {
      const cleaned = stripWrappingQuotes(segment);
      if (!cleaned) {
        return;
      }

      if (/substitua os pensamentos|pense assim/i.test(cleaned)) {
        positiveMode = true;
        return;
      }

      if (!looksLikeStandaloneMindsetSentence(cleaned)) {
        return;
      }

      const polarity = inferMindsetPolarity(cleaned, positiveMode);
      entities.push(
        withRetrievalText({
          id: `mindset-item:${slugify(`${mindsetIndex}-${cleaned}`)}`,
          kind: "mindset_item",
          title: `Mindset ${mindsetIndex}`,
          displayText: cleaned,
          parentSectionId: "section:nossa-mente",
          sourceBlockIds: [block.id],
          rawExcerpt: cleaned,
          fields: {
            sentence: cleaned,
            polarity,
          },
          semanticTags: uniqueStrings([
            "format:mindset_item",
            polarity === "positive" ? "emotion:positive_reframe" : "emotion:self_sabotage",
          ]),
          relations: [],
          retrievalText: "",
        })
      );
      mindsetIndex += 1;
    });
  });

  return entities;
}

function createClosingEntities(blocks: SourceBlock[]): ContentEntity[] {
  const conclusionBlocks = blocks.filter(block => block.sectionContext === "conclusao");
  const entities: ContentEntity[] = [];
  const sourceLines: string[] = [];
  const sourceBlockIds: string[] = [];
  let noteBlockIds: string[] = [];

  conclusionBlocks.forEach(block => {
    const normalized = collapseWhitespace(block.normalizedText);
    if (!normalized || normalized === "Conclusão") {
      return;
    }

    if (normalizeForLookup(normalized) === "fontes:") {
      sourceBlockIds.push(block.id);
      return;
    }

    if (sourceBlockIds.length > 0) {
      sourceLines.push(...block.rawText.split("\n").map(line => line.trim()).filter(Boolean));
      sourceBlockIds.push(block.id);
      return;
    }

    noteBlockIds.push(block.id);
  });

  if (noteBlockIds.length) {
    const noteBlocks = conclusionBlocks.filter(block => noteBlockIds.includes(block.id));
    entities.push(
      withRetrievalText({
        id: "closing-note:conclusao",
        kind: "closing_note",
        title: "Conclusão",
        displayText: joinBlockText(noteBlocks, false),
        parentSectionId: "section:conclusao",
        sourceBlockIds: noteBlockIds,
        rawExcerpt: joinBlockText(noteBlocks, true),
        fields: {},
        semanticTags: ["format:closing_note"],
        relations: [],
        retrievalText: "",
      })
    );
  }

  sourceLines.forEach((source, index) => {
    entities.push(
      withRetrievalText({
        id: `source-reference:${slugify(source || `fonte-${index + 1}`)}`,
        kind: "source_reference",
        title: source,
        displayText: source,
        parentSectionId: "section:conclusao",
        sourceBlockIds,
        rawExcerpt: source,
        fields: {
          order: index + 1,
        },
        semanticTags: ["format:source_reference"],
        relations: [],
        retrievalText: "",
      })
    );
  });

  return entities;
}

function groupItemsByTitle(blocks: SourceBlock[], sectionId: SectionId): ItemGroup[] {
  const relevantBlocks = blocks.filter(block => block.classification !== "section_heading");
  const groups: ItemGroup[] = [];
  let current: ItemGroup | null = null;
  let pendingPrefixBlocks: SourceBlock[] = [];

  for (const block of relevantBlocks) {
    const text = collapseWhitespace(block.normalizedText);
    if (!text) {
      continue;
    }

    if (isItemTitleCandidate(block, sectionId)) {
      if (current) {
        groups.push(current);
      }

      const prefixBlocks =
        pendingPrefixBlocks.length > 0 &&
        pendingPrefixBlocks.every(candidate =>
          ["ingredients_heading", "content_block"].includes(candidate.classification)
        )
          ? pendingPrefixBlocks
          : [];

      current = {
        title: text,
        blocks: [...prefixBlocks, block],
        sectionId,
      };
      pendingPrefixBlocks = [];
      continue;
    }

    if (!current) {
      pendingPrefixBlocks.push(block);
      continue;
    }

    current.blocks.push(block);
  }

  if (current) {
    groups.push(current);
  }

  return groups;
}

function parseStructuredItem(
  item: ItemGroup,
  kind: Extract<
    SemanticEntityKind,
    "recipe" | "trimshake_recipe" | "drink" | "topical_formula" | "ingestion_formula"
  >
): ContentEntity {
  const lines = item.blocks.flatMap(block =>
    block.rawText.split("\n").map(line => line.trim()).filter(Boolean)
  );
  const title = item.title;
  const bodyLines = removeLeadingTitleLines(lines, title);
  const markers = bodyLines.map(line => normalizeForLookup(line));
  const hasIngredientMarker = markers.includes("ingredientes");
  const hasPreparationMarker = markers.includes("modo de preparo");

  let mode: "ingredients" | "instructions" | "preamble" = hasIngredientMarker
    ? "preamble"
    : "ingredients";
  const ingredients: string[] = [];
  const instructionsSteps: string[] = [];

  bodyLines.forEach(line => {
    const normalized = normalizeForLookup(line);
    if (normalized === "ingredientes") {
      mode = "ingredients";
      return;
    }

    if (normalized === "modo de preparo") {
      mode = "instructions";
      return;
    }

    if (mode === "preamble") {
      return;
    }

    if (mode === "ingredients" && !hasPreparationMarker && looksLikeInstructionLine(line)) {
      mode = "instructions";
    }

    if (mode === "ingredients") {
      ingredients.push(line);
      return;
    }

    instructionsSteps.push(line);
  });

  const displayText = joinBlockText(item.blocks, false);
  const canonicalMatches = extractCanonicalMatches(displayText);
  const referencedCanonicalNames = uniqueStrings(
    canonicalMatches
      .filter(match => match.aliasType === "oil")
      .map(match => match.canonicalName)
  );
  const titleCanonicalMatch = canonicalizeName(title);
  const sectionTitle = getSectionTitle(item.sectionId);

  return {
    id: `${kind.replace(/_/g, "-")}:${slugify(title)}`,
    kind,
    title,
    displayText,
    canonicalName: titleCanonicalMatch?.canonicalName,
    parentSectionId: `section:${slugify(sectionTitle)}`,
    sourceBlockIds: item.blocks.map(block => block.id),
    rawExcerpt: joinBlockText(item.blocks, true),
    fields: {
      ingredients,
      instructionsSteps,
      instructionsText: instructionsSteps.join(" "),
      referencedCanonicalNames,
      sectionContext: item.sectionId,
    },
    semanticTags: deriveSemanticTags(kind, displayText, {
      referencedCanonicalNames,
    }),
    relations: [],
    retrievalText: "",
  };
}

function parseDiffuserItem(item: ItemGroup): ContentEntity[] {
  const groups: Array<{ ingredients: string[]; sourceBlockIds: string[] }> = [];
  const contentBlocks = item.blocks.filter(block => collapseWhitespace(block.normalizedText) !== item.title);
  contentBlocks.forEach(block => {
    const lines = block.rawText.split("\n").map(line => line.trim()).filter(Boolean);
    if (!lines.length) {
      return;
    }

    const materialLines =
      /^algumas combinações/i.test(lines[0] ?? "") && lines.length > 1
        ? lines.slice(1)
        : lines;

    if (materialLines.length && materialLines.every(looksLikeIngredientLine)) {
      groups.push({
        ingredients: materialLines,
        sourceBlockIds: [block.id],
      });
    }
  });

  return groups.map((group, index) => {
    const displayText = group.ingredients.join("\n");
    return withRetrievalText({
      id: `diffuser-blend:${slugify(`${item.title}-${index + 1}`)}`,
      kind: "diffuser_blend",
      title: `No difusor ${index + 1}`,
      displayText,
      parentSectionId: "section:ingestao-e-aromaterapia",
      sourceBlockIds: group.sourceBlockIds,
      rawExcerpt: displayText,
      fields: {
        ingredients: group.ingredients,
        referencedCanonicalNames: uniqueStrings(
          extractCanonicalMatches(displayText)
            .filter(match => match.aliasType === "oil")
            .map(match => match.canonicalName)
        ),
      },
      semanticTags: deriveSemanticTags("diffuser_blend", displayText, {}),
      relations: [],
      retrievalText: "",
    });
  });
}

function linkEntityRelations(entities: ContentEntity[]): ContentEntity[] {
  const entityIdByCanonicalName = new Map<string, string>();
  entities.forEach(entity => {
    if (entity.kind === "oil_profile" && entity.canonicalName) {
      entityIdByCanonicalName.set(entity.canonicalName, entity.id);
    }
  });

  return entities.map(entity => {
    const relations = [...entity.relations];

    if (entity.parentSectionId) {
      relations.push({
        type: "belongs_to_section",
        fromId: entity.id,
        toId: entity.parentSectionId,
      });
    }

    const referencedCanonicalNames = Array.isArray(entity.fields.referencedCanonicalNames)
      ? (entity.fields.referencedCanonicalNames as string[])
      : [];

    referencedCanonicalNames.forEach(name => {
      const targetId = entityIdByCanonicalName.get(name);
      if (!targetId) return;
      relations.push({
        type: "references_oil_profile",
        fromId: entity.id,
        toId: targetId,
      });
    });

    return withRetrievalText({
      ...entity,
      relations: dedupeRelations(relations),
      retrievalText: "",
    });
  });
}

function buildContentDocument(
  entities: ContentEntity[],
  aliases: AliasEntry[],
  documentId: string,
  sourcePath: string,
  sourceChecksum: string
): SemanticDocumentContent {
  const kindCounts = countBy(entities.map(entity => entity.kind));
  const relationCount = entities.reduce(
    (total, entity) => total + entity.relations.length,
    0
  );
  const tagCounts = countBy(entities.flatMap(entity => entity.semanticTags));

  return {
    documentId,
    sourcePath,
    sourceChecksum,
    aliases: dedupeAliases(aliases),
    entities,
    stats: {
      entityCount: entities.length,
      relationCount,
      kindCounts,
      tagCounts,
    },
  };
}

function collectSectionBlocks(blocks: SourceBlock[], sectionId: SectionId): SourceBlock[] {
  const sectionBlocks = blocks.filter(block => block.sectionContext === sectionId);
  if (!ITEM_HEAVY_SECTION_IDS.has(sectionId)) {
    return sectionBlocks;
  }

  const collected: SourceBlock[] = [];
  for (const block of sectionBlocks) {
    if (!collected.length) {
      collected.push(block);
      continue;
    }

    if (isItemTitleCandidate(block, sectionId)) {
      break;
    }

    collected.push(block);
  }

  return collected;
}

function getSectionTitle(sectionId: SectionId): string {
  return SECTION_DEFINITIONS.find(section => section.id === sectionId)?.title ?? sectionId;
}

function getSectionOrder(sectionId: SectionId): number {
  return SECTION_DEFINITIONS.find(section => section.id === sectionId)?.order ?? 999;
}

function deriveSemanticTags(
  kind: SemanticEntityKind,
  text: string,
  context: Record<string, unknown>
): string[] {
  const normalized = normalizeForLookup(text);
  const tags = new Set<string>();
  tags.add(`format:${kind}`);

  if (
    kind === "oil_profile" ||
    kind === "drink" ||
    kind === "recipe" ||
    kind === "trimshake_recipe" ||
    kind === "ingestion_formula"
  ) {
    if (normalized.includes("ingest") || normalized.includes("agua") || normalized.includes("capsul")) {
      tags.add("mode:ingestion");
    }
  }

  if (
    kind === "oil_profile" ||
    kind === "diffuser_blend" ||
    kind === "ingestion_formula"
  ) {
    if (normalized.includes("difusor") || normalized.includes("aromatic") || normalized.includes("inal")) {
      tags.add("mode:aromatic");
    }
  }

  if (kind === "topical_formula" || normalized.includes("massage") || normalized.includes("topic")) {
    tags.add("mode:topical");
  }

  if (normalized.includes("metabol")) {
    tags.add("goal:metabolism");
  }
  if (
    normalized.includes("apetite") ||
    normalized.includes("fome") ||
    normalized.includes("doces") ||
    normalized.includes("compuls")
  ) {
    tags.add("goal:appetite_control");
  }
  if (
    normalized.includes("emagrec") ||
    normalized.includes("perda de peso") ||
    normalized.includes("queima de gordura") ||
    normalized.includes("gordura localizada")
  ) {
    tags.add("goal:weight_loss_support");
  }
  if (normalized.includes("detox") || normalized.includes("desentoxic") || normalized.includes("purific")) {
    tags.add("goal:detox_support");
  }
  if (normalized.includes("digest") || normalized.includes("estomag") || normalized.includes("intestin")) {
    tags.add("body:gastrointestinal");
  }
  if (normalized.includes("figado")) {
    tags.add("body:liver");
  }
  if (normalized.includes("linfatic") || normalized.includes("circula") || normalized.includes("cardiovascular")) {
    tags.add("body:circulation");
  }
  if (normalized.includes("ansiedade")) {
    tags.add("emotion:anxiety");
  }
  if (normalized.includes("stress") || normalized.includes("estresse")) {
    tags.add("emotion:stress");
  }
  if (
    normalized.includes("calm") ||
    normalized.includes("relax") ||
    normalized.includes("sono") ||
    normalized.includes("tranquil")
  ) {
    tags.add("emotion:calm");
  }
  if (normalized.includes("medico") || normalized.includes("nutricionista") || normalized.includes("aromaterapeuta")) {
    tags.add("safety:medical_consultation");
  }
  if (normalized.includes("gravida") || normalized.includes("amamentando")) {
    tags.add("safety:pregnancy_caution");
  }
  if (normalized.includes("interagir com medicamentos") || normalized.includes("medicamentosa")) {
    tags.add("safety:drug_interaction");
  }
  if (normalized.includes("dilu") || normalized.includes("oleo carreador")) {
    tags.add("safety:dilution_required");
  }
  if (normalized.includes("nao sair ao sol") || normalized.includes("oleos citricos") || normalized.includes("queimaduras")) {
    tags.add("safety:photosensitive");
  }
  if (normalized.includes("habitos") || normalized.includes("nao existe milagre")) {
    tags.add("goal:habit_change");
  }

  const usageModes = Array.isArray(context.usageModes) ? (context.usageModes as string[]) : [];
  usageModes.forEach(mode => tags.add(`mode:${mode}`));

  return Array.from(tags).sort();
}

function extractUsageModes(text: string): string[] {
  const normalized = normalizeForLookup(text);
  const modes = new Set<string>();
  if (normalized.includes("aromatic") || normalized.includes("difusor") || normalized.includes("inal")) {
    modes.add("aromatic");
  }
  if (normalized.includes("ingest") || normalized.includes("agua") || normalized.includes("capsul")) {
    modes.add("ingestion");
  }
  if (normalized.includes("topic") || normalized.includes("massage") || normalized.includes("oleo carreador")) {
    modes.add("topical");
  }
  return Array.from(modes).sort();
}

function extractCanonicalMatches(text: string): CanonicalMatch[] {
  const normalizedText = normalizeForLookup(text);
  const matches: CanonicalMatch[] = [];

  aliasEntries
    .slice()
    .sort((left, right) => right.alias.length - left.alias.length)
    .forEach(entry => {
      if (normalizedText.includes(normalizeForLookup(entry.alias))) {
        matches.push({
          alias: entry.alias,
          canonicalName: entry.canonicalName,
          aliasType: entry.aliasType,
        });
      }
    });

  return dedupeCanonicalMatches(matches);
}

function canonicalizeName(name: string): CanonicalMatch | undefined {
  return aliasLookup.get(normalizeForLookup(name))
    ? {
        alias: name,
        canonicalName:
          aliasLookup.get(normalizeForLookup(name))?.canonicalName ?? name,
        aliasType: aliasLookup.get(normalizeForLookup(name))?.aliasType ?? "oil",
      }
    : undefined;
}

function removeLeadingTitleLines(lines: string[], title: string): string[] {
  const titleLines = title.split("\n").map(line => line.trim()).filter(Boolean);
  let cursor = 0;

  while (cursor < titleLines.length && cursor < lines.length) {
    if (normalizeForLookup(lines[cursor]) !== normalizeForLookup(titleLines[cursor])) {
      break;
    }
    cursor += 1;
  }

  return lines.slice(cursor);
}

function looksLikeInstructionLine(line: string): boolean {
  const normalized = normalizeForLookup(line);
  return /^(adicione|misture|corte|coloque|leve|bata|deixe|sirva|utilize|use|massageie|emende|prepare|despeje|retire|guarde|tomar|tome|encha|faca|faça|remova|mergulhe|esfolie|seque-se|apos|após|em uma)/.test(
    normalized
  );
}

function looksLikeIngredientLine(line: string): boolean {
  const normalized = normalizeForLookup(line);
  return (
    /^[0-9]/.test(normalized) ||
    normalized.startsWith("algumas ") ||
    normalized.startsWith("punhado ") ||
    normalized.startsWith("sal ") ||
    normalized.startsWith("azeite ") ||
    normalized.startsWith("pao italiano") ||
    normalized.startsWith("parmesao ") ||
    normalized.startsWith("adocante ") ||
    normalized.includes("gota") ||
    normalized.includes("xicara") ||
    normalized.includes("xícara") ||
    normalized.includes("colher") ||
    normalized.includes("ml ") ||
    normalized.includes("grama") ||
    normalized.includes("vidro") ||
    normalized.includes("copo") ||
    normalized.includes("folhas")
  );
}

function isItemTitleCandidate(block: SourceBlock, sectionId: SectionId): boolean {
  const collapsed = collapseWhitespace(block.normalizedText);
  const normalized = normalizeForLookup(collapsed);
  if (!collapsed) {
    return false;
  }
  if (
    block.classification === "section_heading" ||
    block.classification === "ingredients_heading" ||
    block.classification === "preparation_heading"
  ) {
    return false;
  }
  if (SECTION_LOOKUP.has(normalized) || normalized === "fontes:" || normalized === "conteudo") {
    return false;
  }
  if (sectionId === "dicas" || sectionId === "nossa_mente" || sectionId === "conclusao") {
    return false;
  }
  if (/[.!?]/.test(collapsed)) {
    return false;
  }
  if (collapsed.length > 80) {
    return false;
  }
  if (block.rawText.split("\n").length > 3) {
    return false;
  }
  if (looksLikeIngredientLine(collapsed)) {
    return false;
  }
  return true;
}

function looksLikeStandaloneMindsetSentence(sentence: string): boolean {
  return (
    sentence.startsWith('"') ||
    sentence.startsWith("“") ||
    /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(sentence)
  );
}

function inferMindsetPolarity(
  sentence: string,
  positiveMode: boolean
): "negative" | "positive" {
  const normalized = normalizeForLookup(sentence);
  if (positiveMode) {
    return "positive";
  }

  const positiveHints = [
    "eu posso",
    "eu consigo",
    "saude",
    "sou forte",
    "meu corpo",
    "bem mais precioso",
  ];
  if (positiveHints.some(hint => normalized.includes(hint))) {
    return "positive";
  }

  return "negative";
}

function classifyBlock(rawText: string): string {
  const collapsed = collapseWhitespace(normalizeBlockText(rawText));
  const normalized = normalizeForLookup(collapsed);
  if (!collapsed) {
    return "empty";
  }
  if (normalized === "ingredientes") {
    return "ingredients_heading";
  }
  if (normalized === "modo de preparo") {
    return "preparation_heading";
  }
  if (normalized === "fontes:") {
    return "source_heading";
  }
  if (SECTION_LOOKUP.has(normalized)) {
    return "section_heading_candidate";
  }
  if (/^\d+$/.test(normalized)) {
    return "page_number_block";
  }
  if (/^".*"$/.test(collapsed) || /^“.*”$/.test(collapsed)) {
    return "quote_block";
  }
  if (looksLikeTitleShape(collapsed)) {
    return "item_title_candidate";
  }
  return "content_block";
}

function looksLikeTitleShape(text: string): boolean {
  if (/[.!?]/.test(text)) {
    return false;
  }
  if (text.length > 80) {
    return false;
  }
  if (/^\d/.test(text)) {
    return false;
  }
  return /^[A-Za-zÀ-ÖØ-öø-ÿ0-9&™'()\-– ]+$/.test(text);
}

function normalizeBlockText(text: string): string {
  return text
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function normalizeForLookup(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/™/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function slugify(text: string): string {
  return normalizeForLookup(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function joinBlockText(blocks: SourceBlock[], preserveLines: boolean): string {
  return blocks
    .map(block => (preserveLines ? block.rawText.trim() : collapseWhitespace(block.normalizedText)))
    .filter(Boolean)
    .join(preserveLines ? "\n\n" : "\n\n");
}

function splitIntoSentences(text: string): string[] {
  return (text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]?/g) ?? [])
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

function stripWrappingQuotes(text: string): string {
  return text.replace(/^["“”]+|["“”]+$/g, "").trim();
}

function isBoilerplateLine(line: string): boolean {
  return /^Licenciado para - /i.test(line.trim());
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function countBy(values: string[]): Record<string, number> {
  return values.reduce<Record<string, number>>((accumulator, value) => {
    accumulator[value] = (accumulator[value] ?? 0) + 1;
    return accumulator;
  }, {});
}

function dedupeRelations(relations: Relation[]): Relation[] {
  const seen = new Set<string>();
  return relations.filter(relation => {
    const key = `${relation.type}:${relation.fromId}:${relation.toId}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function dedupeCanonicalMatches(matches: CanonicalMatch[]): CanonicalMatch[] {
  const seen = new Set<string>();
  return matches.filter(match => {
    const key = `${match.aliasType}:${match.canonicalName}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function dedupeAliases(aliases: AliasEntry[]): AliasEntry[] {
  const seen = new Set<string>();
  return aliases
    .filter(alias => {
      const key = `${alias.aliasType}:${normalizeForLookup(alias.alias)}:${normalizeForLookup(alias.canonicalName)}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .sort((left, right) => left.alias.localeCompare(right.alias, "pt-BR"));
}

function dedupeEntities(entities: ContentEntity[]): ContentEntity[] {
  const seen = new Set<string>();
  return entities.filter(entity => {
    if (seen.has(entity.id)) {
      return false;
    }
    seen.add(entity.id);
    return true;
  });
}

function withRetrievalText(entity: ContentEntity): ContentEntity {
  const fieldValues = Object.values(entity.fields)
    .flatMap(value => {
      if (typeof value === "string") {
        return [value];
      }
      if (Array.isArray(value)) {
        return value.filter(item => typeof item === "string") as string[];
      }
      return [];
    })
    .filter(Boolean);

  const aliasesForCanonical = entity.canonicalName
    ? aliasEntries
        .filter(alias => alias.canonicalName === entity.canonicalName)
        .map(alias => alias.alias)
    : [];

  return {
    ...entity,
    retrievalText: uniqueStrings([
      entity.title,
      entity.displayText,
      entity.rawExcerpt,
      entity.canonicalName ?? "",
      ...fieldValues,
      ...aliasesForCanonical,
      ...entity.semanticTags,
    ]).join("\n"),
  };
}
