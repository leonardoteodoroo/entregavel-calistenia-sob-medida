import type { RecipeTab } from "./types";

export const recipeTabOptions = [
  { value: "topico", label: "Uso Tópico" },
  { value: "culinaria", label: "Culinária" },
  { value: "trimshake", label: "TrimShake" },
  { value: "bebidas", label: "Bebidas" },
  { value: "difusao", label: "Difusão" },
] as const;

export function getRecipeEmoji(tab: RecipeTab) {
  switch (tab) {
    case "topico":
      return "💆";
    case "culinaria":
      return "🍽️";
    case "trimshake":
      return "🥤";
    case "bebidas":
      return "🍹";
    case "difusao":
      return "🌬";
  }
}
