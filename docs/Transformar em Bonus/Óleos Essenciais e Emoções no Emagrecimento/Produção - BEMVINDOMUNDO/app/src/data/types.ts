export type OilFilter =
  | "citricos"
  | "amadeirados"
  | "florais"
  | "especiarias"
  | "mentolados"
  | "detox";

export interface Oil {
  id: string;
  name: string;
  subtitle: string;
  tags: string[];
  filter: OilFilter;
  description: string;
  usageSummary: string;
  usage: {
    aromatic: string;
    topical: string;
    ingestion: string;
  };
  sourceFile: string;
}

export type RecipeTab =
  | "topico"
  | "culinaria"
  | "trimshake"
  | "bebidas"
  | "difusao";
export type RecipePeriod = "AM" | "PM" | "16h" | "atemporal";
export type RecipeFormat = "recipe" | "capsule" | "diffuser";

export interface Recipe {
  id: string;
  name: string;
  sopTitle: string;
  tab: RecipeTab;
  format: RecipeFormat;
  period: RecipePeriod;
  periodLabel: string;
  time: string;
  frequency: string;
  ingredients: string[];
  steps: string[];
  notes: string[];
  oilsUsed: string[];
  sourceFile: string;
}

export interface Tip {
  id: string;
  number: number;
  text: string;
  label: string;
  alliedOil: string;
  alliedOilName: string;
  alliedOilReason: string;
  sourceFile: string;
}

export interface MindsetPair {
  id: string;
  theme: string;
  sabotage: string;
  positive: string[];
}

export interface MindsetData {
  sabotage: string[];
  positive: string[];
  pairs: MindsetPair[];
}

export interface Spotlight {
  id: string;
  oilId: string;
  oilName: string;
  title: string;
  label: string;
  callout: string;
  suggestedRecipe: string;
  sourceFile: string;
}

export type SafetyVariant =
  | "about"
  | "legal"
  | "alerts"
  | "ingestion"
  | "topical"
  | "closing";

export interface SafetySection {
  id: string;
  title: string;
  variant: SafetyVariant;
  body: string[];
  bullets?: string[];
  sources?: string[];
  sourceFiles: string[];
}

export interface PullQuote {
  id: string;
  afterSection: string;
  placement: string;
  text: string;
}

export interface SafetyData {
  sections: SafetySection[];
  pullQuotes: PullQuote[];
}
