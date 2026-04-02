import contentData from "./oleos-essenciais-emocoes-emagrecimento.content.json";
import masterData from "./oleos-essenciais-emocoes-emagrecimento.master.json";

import type {
  ContentEntity,
  DocumentMaster,
  SemanticDocumentContent,
  SemanticEntityKind,
} from "../../../../../shared/bonus/oleosEssenciaisEmagrecimentoSchema";

export const oleosEssenciaisEmagrecimentoMaster =
  masterData as DocumentMaster;
export const oleosEssenciaisEmagrecimentoContent =
  contentData as SemanticDocumentContent;
export const oleosEssenciaisEmagrecimentoEntities =
  oleosEssenciaisEmagrecimentoContent.entities;

const aliasesByCanonicalName = new Map<string, string[]>();
for (const alias of oleosEssenciaisEmagrecimentoContent.aliases) {
  const bucket = aliasesByCanonicalName.get(alias.canonicalName) ?? [];
  bucket.push(alias.alias);
  aliasesByCanonicalName.set(alias.canonicalName, bucket);
}

export function getOleosEssenciaisEntityById(
  id: string
): ContentEntity | undefined {
  return oleosEssenciaisEmagrecimentoEntities.find(entity => entity.id === id);
}

export function getOleosEssenciaisEntitiesByKind(
  kind: SemanticEntityKind
): ContentEntity[] {
  return oleosEssenciaisEmagrecimentoEntities.filter(entity => entity.kind === kind);
}

export function getOleosEssenciaisEntitiesByTag(tag: string): ContentEntity[] {
  const normalizedTag = normalizeQuery(tag);
  return oleosEssenciaisEmagrecimentoEntities.filter(entity =>
    entity.semanticTags.some(candidate => normalizeQuery(candidate) === normalizedTag)
  );
}

export function getOleosEssenciaisEntitiesByCanonicalName(
  canonicalName: string
): ContentEntity[] {
  const normalizedCanonicalName = normalizeQuery(canonicalName);
  return oleosEssenciaisEmagrecimentoEntities.filter(
    entity => normalizeQuery(entity.canonicalName ?? "") === normalizedCanonicalName
  );
}

export function searchOleosEssenciaisEntities(query: string): ContentEntity[] {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) {
    return [...oleosEssenciaisEmagrecimentoEntities];
  }

  return oleosEssenciaisEmagrecimentoEntities
    .map(entity => ({
      entity,
      score: scoreEntity(entity, normalizedQuery),
    }))
    .filter(result => result.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.entity.title.localeCompare(right.entity.title, "pt-BR");
    })
    .map(result => result.entity);
}

function scoreEntity(entity: ContentEntity, normalizedQuery: string): number {
  const title = normalizeQuery(entity.title);
  const canonicalName = normalizeQuery(entity.canonicalName ?? "");
  const aliases = (entity.canonicalName
    ? aliasesByCanonicalName.get(entity.canonicalName) ?? []
    : []
  ).map(alias => normalizeQuery(alias));
  const retrievalText = normalizeQuery(entity.retrievalText);

  if (title === normalizedQuery) return 120;
  if (canonicalName === normalizedQuery) return 110;
  if (aliases.includes(normalizedQuery)) return 105;
  if (title.startsWith(normalizedQuery)) return 95;
  if (title.includes(normalizedQuery)) return 90;
  if (canonicalName.includes(normalizedQuery)) return 85;
  if (aliases.some(alias => alias.includes(normalizedQuery))) return 80;
  if (retrievalText.includes(normalizedQuery)) return 60;

  return 0;
}

function normalizeQuery(query: string): string {
  return query
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
