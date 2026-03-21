export interface BonusAssetVisual {
  kind: "asset";
  src: string;
  alt: string;
}

export interface BonusPlaceholderVisual {
  kind: "placeholder";
  alt: string;
  prompt: string;
  comment: string;
  aspectRatio?: string;
}

export type RecipeVisual = BonusAssetVisual | BonusPlaceholderVisual;

export interface RecipeBookIntro {
  title: string;
  author: string;
  volume: string;
  observations: string[];
}

export interface RecipeTime {
  prep: string;
  total: string;
  extraLabel: string;
  extraValue: string;
}

export interface Recipe {
  id: string;
  title: string;
  premise: string;
  servings: string;
  time: RecipeTime;
  ingredients: string[];
  instructions: string;
  instructionsSteps: string[];
  objection: string;
  masterTip: string;
  visual: RecipeVisual;
}

export interface RecipeBook {
  intro: RecipeBookIntro;
  recipes: Recipe[];
  storageKey: string;
  searchPlaceholder: string;
  emptyStateCopy: string;
}
