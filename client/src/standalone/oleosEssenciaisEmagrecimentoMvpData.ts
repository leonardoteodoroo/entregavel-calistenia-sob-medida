import type { RecipeVisual } from "@/content/bonus/bonusRecipeTypes";
import {
  getOleosEssenciaisEntitiesByKind,
  getOleosEssenciaisEntityById,
  oleosEssenciaisEmagrecimentoEntities,
} from "@/content/bonus/generated/oleosEssenciaisEmagrecimentoAdapter";
import type { ContentEntity } from "../../../shared/bonus/oleosEssenciaisEmagrecimentoSchema";

export interface OleosHomeSectionCard {
  id: string;
  title: string;
  description: string;
  count: number;
  accent: "sage" | "rose" | "gold";
}

export interface GranolaDetailViewModel {
  entity: ContentEntity;
  ingredients: string[];
  instructions: string[];
  referencedOils: string[];
}

const sectionDescriptors: Record<
  string,
  Omit<OleosHomeSectionCard, "count">
> = {
  "section:oleos-essenciais": {
    id: "section:oleos-essenciais",
    title: "Óleos Essenciais",
    description:
      "Perfis dos óleos e blends com foco em humor, digestão, apetite e suporte ao emagrecimento.",
    accent: "sage",
  },
  "section:receitas-com-oleos-essenciais": {
    id: "section:receitas-com-oleos-essenciais",
    title: "Receitas com Óleos Essenciais",
    description:
      "Preparos culinários com ingrediente principal bem definido e modo de preparo direto.",
    accent: "gold",
  },
  "section:receitas-com-trimshake": {
    id: "section:receitas-com-trimshake",
    title: "Receitas com TrimShake",
    description:
      "Misturas rápidas para rotina, saciedade e praticidade, ainda com linguagem leve de bônus.",
    accent: "rose",
  },
  "section:bebidas-com-oleos-essenciais": {
    id: "section:bebidas-com-oleos-essenciais",
    title: "Bebidas com Óleos Essenciais",
    description:
      "Águas saborizadas e bebidas simples para encaixar os óleos no dia a dia sem atrito.",
    accent: "sage",
  },
  "section:uso-topico": {
    id: "section:uso-topico",
    title: "Uso Tópico",
    description:
      "Fórmulas práticas de massagem e autocuidado com foco corporal e aplicação guiada.",
    accent: "gold",
  },
  "section:ingestao-e-aromaterapia": {
    id: "section:ingestao-e-aromaterapia",
    title: "Ingestão e Aromaterapia",
    description:
      "Protocolos curtos de cápsula e difusor, com orientação de uso e ressalvas de segurança.",
    accent: "rose",
  },
  "section:dicas": {
    id: "section:dicas",
    title: "Dicas",
    description:
      "Repertório de hábitos e observações para apoiar consistência e decisões do cotidiano.",
    accent: "sage",
  },
  "section:nossa-mente": {
    id: "section:nossa-mente",
    title: "Nossa Mente",
    description:
      "Frases e contrapontos para trabalhar auto sabotagem, gatilhos e reforço mental.",
    accent: "rose",
  },
};

const excludedKindsForSectionCounts = new Set([
  "section",
  "toc_item",
  "warning",
  "closing_note",
  "source_reference",
]);

export const homeHeroVisual: RecipeVisual = {
  kind: "placeholder",
  alt: "Frascos âmbar de óleos essenciais e ingredientes naturais sobre bancada clara",
  prompt:
    "Placeholder do hero: frascos âmbar, sementes, rodelas cítricas e atmosfera editorial botânica para a capa do bônus.",
  comment:
    "Placeholder: hero 4:5 com frascos âmbar, sementes e fundo botânico em tom marfim.",
  aspectRatio: "4 / 5",
};

export const granolaHeroVisual: RecipeVisual = {
  kind: "placeholder",
  alt: "Granola salgada crocante em tigela cerâmica com sementes e castanhas em styling editorial",
  prompt:
    "Placeholder da receita: granola salgada crocante em tigela de cerâmica, close nas sementes e castanhas, luz natural suave.",
  comment:
    "Placeholder: 4:3 para Granola Salgada, tigela cerâmica, sementes, castanhas e composição editorial botânica.",
  aspectRatio: "4 / 3",
};

export const granolaProcessVisual: RecipeVisual = {
  kind: "placeholder",
  alt: "Assadeira com granola salgada dourando no forno em uma cozinha clara e editorial",
  prompt:
    "Placeholder de apoio: assadeira com granola salgada dourando, textura crocante, sementes aparentes e luz natural de cozinha clara.",
  comment:
    "Placeholder secundário: close da assadeira com granola salgada para a área de preparo.",
  aspectRatio: "16 / 10",
};

export function getOleosHomeSectionCards(): OleosHomeSectionCard[] {
  return Object.values(sectionDescriptors).map(descriptor => ({
    ...descriptor,
    count: countSectionEntities(descriptor.id),
  }));
}

export function getFeaturedOilProfiles(limit = 3): ContentEntity[] {
  return getOleosEssenciaisEntitiesByKind("oil_profile").slice(0, limit);
}

export function getFeaturedPracticalEntities(): ContentEntity[] {
  return [
    getOleosEssenciaisEntityById("recipe:granola-salgada"),
    getOleosEssenciaisEntityById(
      "topical-formula:oleo-de-massagem-anti-celulite-2"
    ),
  ].filter(Boolean) as ContentEntity[];
}

export function getGranolaDetailViewModel(): GranolaDetailViewModel {
  const entity = getOleosEssenciaisEntityById("recipe:granola-salgada");
  if (!entity) {
    throw new Error("Entidade da Granola Salgada não encontrada.");
  }

  const rawIngredients = Array.isArray(entity.fields.ingredients)
    ? (entity.fields.ingredients as string[])
    : [];
  const rawInstructions = Array.isArray(entity.fields.instructionsSteps)
    ? (entity.fields.instructionsSteps as string[])
    : [];
  const referencedOils = Array.isArray(entity.fields.referencedCanonicalNames)
    ? (entity.fields.referencedCanonicalNames as string[])
    : [];

  return {
    entity,
    ingredients: stitchBrokenLines(rawIngredients),
    instructions: sentenceize(rawInstructions.join(" ")),
    referencedOils,
  };
}

function countSectionEntities(sectionId: string): number {
  return oleosEssenciaisEmagrecimentoEntities.filter(
    entity =>
      entity.parentSectionId === sectionId &&
      !excludedKindsForSectionCounts.has(entity.kind)
  ).length;
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
