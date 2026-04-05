import type { RecipeVisual } from "@/content/bonus/bonusRecipeTypes";
import { toPublicPath } from "@/content/siteConfig";
import {
  getOleosEssenciaisEntityById,
  oleosEssenciaisEmagrecimentoEntities,
} from "@/content/bonus/generated/oleosEssenciaisEmagrecimentoAdapter";
import type { ContentEntity } from "../../../shared/bonus/oleosEssenciaisEmagrecimentoSchema";

export const sectionDescriptors = {
  "section:oleos-essenciais": {
    title: "Óleos Essenciais",
    description:
      "Perfis dos óleos e blends com foco em humor, digestão, apetite e suporte ao emagrecimento.",
    accent: "sage",
  },
  "section:receitas-com-oleos-essenciais": {
    title: "Receitas com Óleos Essenciais",
    description:
      "Preparos culinários com ingrediente principal bem definido e modo de preparo direto.",
    accent: "gold",
  },
  "section:receitas-com-trimshake": {
    title: "Receitas com TrimShake",
    description:
      "Misturas rápidas para rotina, saciedade e praticidade, ainda com linguagem leve de bônus.",
    accent: "rose",
  },
  "section:bebidas-com-oleos-essenciais": {
    title: "Bebidas com Óleos Essenciais",
    description:
      "Águas saborizadas e bebidas simples para encaixar os óleos no dia a dia sem atrito.",
    accent: "sage",
  },
  "section:uso-topico": {
    title: "Uso Tópico",
    description:
      "Fórmulas práticas de massagem e autocuidado com foco corporal e aplicação guiada.",
    accent: "gold",
  },
  "section:ingestao-e-aromaterapia": {
    title: "Ingestão e Aromaterapia",
    description:
      "Protocolos curtos de cápsula e difusor, com orientação de uso e ressalvas de segurança.",
    accent: "rose",
  },
  "section:dicas": {
    title: "Dicas",
    description:
      "Repertório de hábitos e observações para apoiar consistência e decisões do cotidiano.",
    accent: "sage",
  },
  "section:nossa-mente": {
    title: "Nossa Mente",
    description:
      "Frases e contrapontos para trabalhar auto sabotagem, gatilhos e reforço mental.",
    accent: "rose",
  },
} as const;

export type OleosSectionId = keyof typeof sectionDescriptors;
type OleosSectionAccent = (typeof sectionDescriptors)[OleosSectionId]["accent"];
const HOME_SECTION_IDS = [
  "section:introducao",
  "section:apresentacao",
  "section:conclusao",
] as const;

export const oleosSectionIds = Object.keys(
  sectionDescriptors
) as OleosSectionId[];
export const oleosDetailEntityKinds = [
  "recipe",
  "trimshake_recipe",
  "oil_profile",
  "topical_formula",
  "drink",
  "diffuser_blend",
] as const;
const DETAIL_KIND_SET = new Set<OleosDetailEntityKind>(oleosDetailEntityKinds);

export type OleosDetailEntityKind = (typeof oleosDetailEntityKinds)[number];
export type OleosDetailEntityId = string;

export interface OleosHomeSectionCard {
  id: OleosSectionId;
  title: string;
  description: string;
  count: number;
  accent: OleosSectionAccent;
}

export interface OleosEditorialBlock {
  title: string;
  paragraphs: string[];
}

export interface OleosHomeViewModel {
  title: string;
  subtitle: string;
  heroVisual: RecipeVisual;
  editorialBlocks: OleosEditorialBlock[];
  sourceReferences: string[];
  sectionCards: OleosHomeSectionCard[];
}

export interface OleosSectionListItem {
  id: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  kind: ContentEntity["kind"];
  chips: string[];
  visual: RecipeVisual;
  detailEntityId: OleosDetailEntityId | null;
}

export interface OleosSectionViewModel {
  sectionId: OleosSectionId;
  title: string;
  description: string;
  accent: OleosSectionAccent;
  items: OleosSectionListItem[];
}

export interface OleosDetailViewModel {
  entityId: OleosDetailEntityId;
  title: string;
  eyebrow: string;
  kind: OleosDetailEntityKind;
  sectionId: OleosSectionId | null;
  sectionTitle: string | null;
  summaryParagraphs: string[];
  ingredients: string[];
  steps: string[];
  observations: string[];
  referencedOils: string[];
  sources: string[];
  visual: RecipeVisual;
}

const excludedKindsForSectionCounts = new Set<ContentEntity["kind"]>([
  "section",
  "toc_item",
  "warning",
  "closing_note",
  "source_reference",
]);

const LIST_EXCLUDED_KINDS = new Set<ContentEntity["kind"]>([
  "section",
  "toc_item",
  "warning",
  "closing_note",
  "source_reference",
]);

const KIND_LABELS: Partial<Record<ContentEntity["kind"], string>> = {
  oil_profile: "Óleo",
  recipe: "Receita",
  trimshake_recipe: "TrimShake",
  drink: "Bebida",
  topical_formula: "Uso Tópico",
  diffuser_blend: "Aromaterapia",
  tip_item: "Dica",
  mindset_item: "Mindset",
};
const INGESTION_OR_TOPICAL_DETAIL_KINDS = new Set<OleosDetailEntityKind>([
  "recipe",
  "trimshake_recipe",
  "drink",
  "topical_formula",
  "diffuser_blend",
]);
const HEADING_MARKERS = new Set([
  "INGREDIENTES",
  "MODO DE PREPARO",
  "FONTES",
  "FONTES:",
  "OBSERVAÇÕES IMPORTANTES",
]);
const OBSERVATION_REGEX =
  /(não|nao|evite|contra|recomend|dilu|cuidado|al[eé]rg|gr[aá]vida|amament|segura)/i;
const safetyWarningHighlights = buildSafetyWarningHighlights();

export const homeHeroVisual: RecipeVisual = {
  kind: "asset",
  src: toPublicPath("assets/images/bonus/oleos/hero-apothecary.png"),
  alt: "Frascos âmbar de óleos essenciais e ingredientes naturais sobre bancada clara",
};

export function isOleosSectionId(value: string): value is OleosSectionId {
  return oleosSectionIds.includes(value as OleosSectionId);
}

export function isOleosDetailEntityId(
  value: string
): value is OleosDetailEntityId {
  const entity = getOleosEssenciaisEntityById(value);
  return Boolean(entity && isOleosDetailKind(entity.kind));
}

export function getOleosHomeViewModel(): OleosHomeViewModel {
  return {
    title: "Emagrecendo com Óleos Essenciais",
    subtitle:
      "Conteúdo semântico completo com leitura guiada por seções, detalhes técnicos e segurança de uso.",
    heroVisual: homeHeroVisual,
    editorialBlocks: HOME_SECTION_IDS.map(sectionId =>
      buildEditorialBlock(sectionId)
    ),
    sourceReferences: getSourceReferencesBySectionId("section:conclusao"),
    sectionCards: getOleosHomeSectionCards(),
  };
}

export function getOleosHomeSectionCards(): OleosHomeSectionCard[] {
  return (
    Object.entries(sectionDescriptors) as Array<
      [OleosSectionId, (typeof sectionDescriptors)[OleosSectionId]]
    >
  ).map(([id, descriptor]) => ({
    id,
    title: descriptor.title,
    description: descriptor.description,
    accent: descriptor.accent,
    count: countSectionEntities(id),
  }));
}

export function getOleosSectionViewModel(
  sectionId: OleosSectionId
): OleosSectionViewModel {
  const section = sectionDescriptors[sectionId];

  const items = oleosEssenciaisEmagrecimentoEntities
    .filter(
      entity =>
        entity.parentSectionId === sectionId &&
        !LIST_EXCLUDED_KINDS.has(entity.kind)
    )
    .map(entity => ({
      id: entity.id,
      title: entity.title,
      kind: entity.kind,
      eyebrow: KIND_LABELS[entity.kind] ?? "Conteúdo",
      excerpt: getEntityExcerpt(entity),
      visual: getOleosEntityVisual(entity.id, entity.kind),
      detailEntityId: isOleosDetailKind(entity.kind) ? entity.id : null,
      chips: entity.semanticTags
        .filter(tag => tag.startsWith("mode:") || tag.startsWith("goal:"))
        .slice(0, 3),
    }));

  return {
    sectionId,
    title: section.title,
    description: section.description,
    accent: section.accent,
    items,
  };
}

export function getOleosDetailViewModel(
  entityId: OleosDetailEntityId
): OleosDetailViewModel | null {
  const entity = getOleosEssenciaisEntityById(entityId);
  if (!entity || !isOleosDetailKind(entity.kind)) {
    return null;
  }

  const parentSectionId = entity.parentSectionId ?? "";
  const sectionId: OleosSectionId | null = isOleosSectionId(parentSectionId)
    ? parentSectionId
    : null;

  return {
    entityId: entity.id,
    title: entity.title,
    eyebrow: KIND_LABELS[entity.kind] ?? "Conteúdo",
    kind: entity.kind,
    sectionId,
    sectionTitle: sectionId ? sectionDescriptors[sectionId].title : null,
    summaryParagraphs: extractSummaryParagraphs(entity),
    ingredients: extractIngredients(entity),
    steps: extractSteps(entity),
    observations: extractObservations(entity),
    referencedOils: readStringArray(entity.fields.referencedCanonicalNames),
    sources: sectionId ? getSourceReferencesBySectionId(sectionId) : [],
    visual: getOleosEntityVisual(entity.id, entity.kind),
  };
}

export function getOleosEntityVisual(
  entityId: string,
  kind: ContentEntity["kind"]
): RecipeVisual {
  const entity = getOleosEssenciaisEntityById(entityId);
  const title = entity?.title ?? "Conteúdo";

  // Se houver uma imagem específica para ansiedade, usar
  if (entityId.includes("ansiedade")) {
    return {
      kind: "asset",
      src: toPublicPath("assets/images/bonus/oleos/anxiety-hotspot.png"),
      alt: `Visual de apoio para ${title}`,
    };
  }

  // Padrão luxuoso botânico para entidades sem imagem específica ainda
  const defaultVisual: RecipeVisual = {
    kind: "asset",
    src: toPublicPath("assets/images/bonus/oleos/hero-apothecary.png"),
    alt: `Visual botânico representando ${title}`,
  };

  switch (kind) {
    case "oil_profile":
    case "recipe":
    case "trimshake_recipe":
    case "drink":
    case "topical_formula":
    case "diffuser_blend":
      return defaultVisual;
    default:
      return defaultVisual;
  }
}

function countSectionEntities(sectionId: OleosSectionId): number {
  return oleosEssenciaisEmagrecimentoEntities.filter(
    entity =>
      entity.parentSectionId === sectionId &&
      !excludedKindsForSectionCounts.has(entity.kind)
  ).length;
}

function getEntityExcerpt(entity: ContentEntity): string {
  const sentence = entity.fields.sentence;
  if (typeof sentence === "string" && sentence.trim()) {
    return sentence.trim();
  }

  if (entity.displayText.trim()) {
    const displayLine = entity.displayText
      .split("\n")
      .map(line => line.trim())
      .find(Boolean);
    if (displayLine) return displayLine;
  }

  const rawLine = entity.rawExcerpt
    .split("\n")
    .map(line => line.trim())
    .find(Boolean);
  if (rawLine) return rawLine;

  return entity.title;
}

function buildEditorialBlock(
  sectionId: (typeof HOME_SECTION_IDS)[number]
): OleosEditorialBlock {
  const section = getOleosEssenciaisEntityById(sectionId);
  if (!section) {
    return { title: "Conteúdo", paragraphs: [] };
  }

  const rawWithoutTitle = removeLeadingTitle(section.rawExcerpt, section.title);
  const withoutSources =
    sectionId === "section:conclusao"
      ? (rawWithoutTitle.split(/fontes\s*:/i)[0] ?? rawWithoutTitle)
      : rawWithoutTitle;

  return {
    title: section.title,
    paragraphs: chunkSentences(
      sentenceize(collapseWhitespace(withoutSources)),
      3
    ),
  };
}

function getSourceReferencesBySectionId(sectionId: string): string[] {
  return oleosEssenciaisEmagrecimentoEntities
    .filter(
      entity =>
        entity.kind === "source_reference" &&
        entity.parentSectionId === sectionId
    )
    .sort((left, right) => {
      const leftOrder = Number(left.fields.order ?? 0);
      const rightOrder = Number(right.fields.order ?? 0);
      return leftOrder - rightOrder;
    })
    .map(entity => entity.title.trim())
    .filter(Boolean);
}

function extractSummaryParagraphs(entity: ContentEntity): string[] {
  const rawWithoutTitle = removeLeadingTitle(entity.rawExcerpt, entity.title);
  const beforeIngredients = rawWithoutTitle.split(/INGREDIENTES/i)[0] ?? "";
  const cleaned = collapseWhitespace(beforeIngredients);
  if (!cleaned) return [];
  return chunkSentences(sentenceize(cleaned), 3);
}

function extractIngredients(entity: ContentEntity): string[] {
  const fromFields = cleanIngredientLines(
    readStringArray(entity.fields.ingredients),
    entity.title
  );
  if (fromFields.length) {
    return stitchBrokenLines(fromFields);
  }

  const fromDisplay = extractLinesBetweenMarkers(
    entity.displayText,
    /^INGREDIENTES$/i,
    /^MODO DE PREPARO$/i
  );
  return stitchBrokenLines(fromDisplay);
}

function extractSteps(entity: ContentEntity): string[] {
  const fromSteps = stitchBrokenLines(
    readStringArray(entity.fields.instructionsSteps)
  );
  if (fromSteps.length) {
    return fromSteps;
  }

  const instructionsText = asNonEmptyString(entity.fields.instructionsText);
  if (instructionsText) {
    return sentenceize(instructionsText);
  }

  const fromDisplay = extractLinesAfterMarker(
    entity.displayText,
    /^MODO DE PREPARO$/i
  );
  if (!fromDisplay.length) {
    return [];
  }

  return sentenceize(fromDisplay.join(" "));
}

function extractObservations(entity: ContentEntity): string[] {
  const localObservations = splitLines(entity.rawExcerpt)
    .filter(
      line =>
        OBSERVATION_REGEX.test(line) &&
        !isHeadingLine(line) &&
        line !== entity.title
    )
    .slice(0, 3);

  const safetyObservations =
    isOleosDetailKind(entity.kind) &&
    INGESTION_OR_TOPICAL_DETAIL_KINDS.has(entity.kind)
      ? safetyWarningHighlights
      : [];

  return uniqueLines([...localObservations, ...safetyObservations]).slice(0, 4);
}

function isOleosDetailKind(
  kind: ContentEntity["kind"]
): kind is OleosDetailEntityKind {
  return DETAIL_KIND_SET.has(kind as OleosDetailEntityKind);
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(item => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function cleanIngredientLines(lines: string[], title: string): string[] {
  return lines.filter(
    line =>
      line !== title &&
      !isHeadingLine(line) &&
      !/^modo de preparo$/i.test(line) &&
      !/^fontes?:?$/i.test(line)
  );
}

function extractLinesBetweenMarkers(
  text: string,
  startMarker: RegExp,
  endMarker: RegExp
): string[] {
  const lines = splitLines(text);
  const startIndex = lines.findIndex(line => startMarker.test(line));
  if (startIndex === -1) return [];

  const body = lines.slice(startIndex + 1);
  const endIndex = body.findIndex(line => endMarker.test(line));
  const scoped = endIndex === -1 ? body : body.slice(0, endIndex);

  return scoped.filter(line => !isHeadingLine(line));
}

function extractLinesAfterMarker(text: string, marker: RegExp): string[] {
  const lines = splitLines(text);
  const markerIndex = lines.findIndex(line => marker.test(line));
  if (markerIndex === -1) return [];

  return lines.slice(markerIndex + 1).filter(line => !isHeadingLine(line));
}

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
}

function isHeadingLine(line: string): boolean {
  const normalized = line.toUpperCase().replace(/\s+/g, " ").trim();
  return HEADING_MARKERS.has(normalized);
}

function removeLeadingTitle(text: string, title: string): string {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  if (lines[0] === title) {
    lines.shift();
  }

  return lines.join(" ");
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function chunkSentences(sentences: string[], chunkSize: number): string[] {
  const chunks: string[] = [];
  for (let index = 0; index < sentences.length; index += chunkSize) {
    chunks.push(sentences.slice(index, index + chunkSize).join(" "));
  }
  return chunks.filter(Boolean);
}

function uniqueLines(lines: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const normalized = line.toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(line);
  }

  return result;
}

function buildSafetyWarningHighlights(): string[] {
  const highSignalIds = new Set(["warning:aviso-4", "warning:aviso-5"]);
  const highlights = oleosEssenciaisEmagrecimentoEntities
    .filter(entity => entity.kind === "warning" && highSignalIds.has(entity.id))
    .map(entity => collapseWhitespace(entity.displayText))
    .filter(Boolean);

  return highlights.slice(0, 2);
}

function stitchBrokenLines(lines: string[]): string[] {
  const result: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const previous = result[result.length - 1];
    if (
      previous &&
      (previous.endsWith(",") ||
        previous.endsWith(":") ||
        /^[a-zà-ÿ]/.test(line))
    ) {
      result[result.length - 1] = `${previous} ${line}`.replace(/\s+/g, " ");
      continue;
    }

    result.push(line);
  }

  return result;
}

function sentenceize(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]?/g) ?? [])
    .map(sentence => sentence.trim())
    .filter(Boolean);
}
