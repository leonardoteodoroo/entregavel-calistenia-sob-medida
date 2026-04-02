import type { RecipeBook } from "./bonusRecipeTypes";
import { receitasOvoVol01 } from "./receitasOvoVol01";
import { receitasOvoVol02 } from "./receitasOvoVol02";
import { receitasOvoVol03 } from "./receitasOvoVol03";
import { receitasOvoVol04 } from "./receitasOvoVol04";
import { receitasOvoVol05 } from "./receitasOvoVol05";
import { receitasOvoVol06 } from "./receitasOvoVol06";
import { receitasOvoVol07 } from "./receitasOvoVol07";
import { receitasOvoVol08 } from "./receitasOvoVol08";
import { receitasOvoVol09 } from "./receitasOvoVol09";
import { receitasOvoVol10 } from "./receitasOvoVol10";

export const receitasOvoBook: RecipeBook = {
  storageKey: "sempreNaModa_bonusOvoProgress",
  searchPlaceholder: "Buscar receita de ovo...",
  emptyStateCopy: "Poxa, não encontramos nenhuma receita com esse nome. Que tal tentar outro ingrediente?",
  intro: {
    title: "Bônus 3: 365 Maneiras de Comer Ovo",
    author: "Sempre na Moda",
    volume: "Volumes 01-10 (1-100)",
    observations: [
      "Que o ovo é um alimento completo e acessível todo mundo sabe, mas o que nem todo mundo sabe é que ele também é muito versátil.",
      "Aproveite essas receitas para transformar seu café da manhã e jantar."
    ],
  },
  recipes: [
    ...receitasOvoVol01, 
    ...receitasOvoVol02, 
    ...receitasOvoVol03, 
    ...receitasOvoVol04, 
    ...receitasOvoVol05,
    ...receitasOvoVol06,
    ...receitasOvoVol07,
    ...receitasOvoVol08,
    ...receitasOvoVol09,
    ...receitasOvoVol10
  ],
};
