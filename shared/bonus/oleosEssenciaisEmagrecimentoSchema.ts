export const semanticEntityKinds = [
  "toc_item",
  "section",
  "oil_profile",
  "recipe",
  "trimshake_recipe",
  "drink",
  "topical_formula",
  "ingestion_formula",
  "diffuser_blend",
  "tip_item",
  "mindset_item",
  "warning",
  "closing_note",
  "source_reference",
] as const;

export type SemanticEntityKind = (typeof semanticEntityKinds)[number];

export type AliasType = "oil" | "compound" | "section";

export interface Relation {
  type: string;
  fromId: string;
  toId: string;
}

export interface DocumentPage {
  id: string;
  pageIndex: number;
  rawText: string;
  cleanedText: string;
  removedBoilerplateLines: number;
}

export interface SourceBlock {
  id: string;
  pageIndex: number;
  lineStart: number;
  lineEnd: number;
  sectionContext: string | null;
  rawText: string;
  normalizedText: string;
  classification: string;
}

export interface DocumentMasterStats {
  rawPageCount: number;
  pageCount: number;
  blockCount: number;
  nonBoilerplateBlockCount: number;
  removedBoilerplateLineCount: number;
  classificationCounts: Record<string, number>;
  unclassifiedBlockCount: number;
}

export interface DocumentMaster {
  documentId: string;
  sourcePath: string;
  sourceChecksum: string;
  pages: DocumentPage[];
  blocks: SourceBlock[];
  stats: DocumentMasterStats;
}

export interface AliasEntry {
  alias: string;
  canonicalName: string;
  aliasType: AliasType;
}

export interface ContentEntity {
  id: string;
  kind: SemanticEntityKind;
  title: string;
  displayText: string;
  canonicalName?: string;
  parentSectionId?: string;
  sourceBlockIds: string[];
  rawExcerpt: string;
  fields: Record<string, unknown>;
  semanticTags: string[];
  relations: Relation[];
  retrievalText: string;
}

export interface SemanticDocumentContentStats {
  entityCount: number;
  relationCount: number;
  kindCounts: Record<string, number>;
  tagCounts: Record<string, number>;
}

export interface SemanticDocumentContent {
  documentId: string;
  sourcePath: string;
  sourceChecksum: string;
  aliases: AliasEntry[];
  entities: ContentEntity[];
  stats: SemanticDocumentContentStats;
}

export interface GenerateSemanticArtifactsInput {
  documentId: string;
  sourcePath: string;
  text: string;
}

export interface GenerateSemanticArtifactsResult {
  master: DocumentMaster;
  content: SemanticDocumentContent;
}
