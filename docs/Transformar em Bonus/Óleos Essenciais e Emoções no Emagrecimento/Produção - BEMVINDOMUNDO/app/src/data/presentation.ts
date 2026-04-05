import type { OilFilter } from "./types";

export const oilFilterLabels: Record<OilFilter, string> = {
  citricos: "Cítricos",
  amadeirados: "Amadeirados",
  florais: "Florais",
  especiarias: "Especiarias",
  mentolados: "Mentolados",
  detox: "Detox",
};

export const oilFilterOptions = [
  { value: "todos", label: "Todos", emoji: "" },
  { value: "citricos", label: "Cítricos", emoji: "🍋" },
  { value: "amadeirados", label: "Amadeirados", emoji: "🌳" },
  { value: "florais", label: "Florais", emoji: "🌸" },
  { value: "especiarias", label: "Especiarias", emoji: "🫚" },
  { value: "mentolados", label: "Mentolados", emoji: "🌬" },
  { value: "detox", label: "Detox", emoji: "🧹" },
] as const;

export function getOilEmoji(oilId: string) {
  switch (oilId) {
    case "grapefruit":
    case "wild-orange":
      return "🍊";
    case "peppermint":
      return "🍃";
    case "serenity":
      return "🌙";
    case "balance":
      return "⚖️";
    case "camomila-romana":
      return "🌼";
    case "cinnamon-bark":
    case "sandalo-hawaiano":
      return "🪵";
    case "fennel":
      return "🌾";
    case "gengibre":
      return "🫚";
    case "lime-e-lemon":
      return "🍋";
    case "smart-e-sassy":
      return "⚡";
    case "turmeric":
      return "✨";
    default:
      return "🌿";
  }
}

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
