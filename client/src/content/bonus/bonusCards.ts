import { standaloneRoutes, toPublicPath } from "@/content/siteConfig";
import type { RecipeVisual } from "@/content/bonus/bonusRecipeTypes";

export const BONUS_LIKES_STORAGE_KEY = "cf-bonus-receitas-like-v1";

export type BonusCard = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  thumbnail?: RecipeVisual;
  updatedAtLabel?: string;
  social?: {
    likesBase: number;
  };
  placeholderDays?: number;
};

export type BonusLikesState = Record<string, boolean>;

export const BONUS_RECIPES: BonusCard[] = [
  {
    id: "receitas-low-carb",
    title: "Receitas Low Carb",
    description:
      "Sendo sincera: não adianta treinar 10 minutos e demorar duas horas na cozinha. Separei 10 pratos fáceis que não roubam seu tempo.",
    href: toPublicPath(standaloneRoutes.receitasLowCarb),
    thumbnail: {
      kind: "asset",
      src: toPublicPath("bonus/receitas-low-carb/01-crepioca.webp"),
      alt: "Miniatura da receita de crepioca low carb",
    },
    social: { likesBase: 287 },
  },
  {
    id: "sobremesas-saudaveis",
    title: "Sobremesas Saudáveis",
    description:
      "Pra quando bater a vontade de doce sem sair do eixo: 12 sobremesas práticas, geladas, cremosas e pensadas para a vida real.",
    href: toPublicPath(standaloneRoutes.sobremesasSaudaveis),
    thumbnail: {
      kind: "asset",
      src: toPublicPath("bonus/sobremesas-saudaveis/01-mousse-maracuja.webp"),
      alt: "Miniatura de sobremesas saudaveis",
    },
    updatedAtLabel: "18/03/2026",
    social: { likesBase: 77 },
  },
  {
    id: "bonus-placeholder-2",
    title: "Em breve",
    placeholderDays: 16,
  },
];

export function readBonusLikesState(): BonusLikesState {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(BONUS_LIKES_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    const result: BonusLikesState = {};
    for (const [cardId, value] of Object.entries(parsed)) {
      if (typeof value === "boolean") {
        result[cardId] = value;
      }
    }

    return result;
  } catch {
    return {};
  }
}
