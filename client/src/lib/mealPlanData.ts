import { toPublicPath } from "@/content/siteConfig";

export type MealKey = "cafe" | "almoco" | "lanche" | "jantar";

export type MealPlannerGoal = "constancia" | "saciedade" | "praticidade";
export type MealPlannerFoodStyle = "padrao" | "vegetariano" | "vegano";
export type MealPlannerRestrictionKey = "sem_lactose" | "sem_gluten";
export type MealPlannerTag = "rapida" | "saciedade";
export type MealFilterKey =
  | "todas"
  | "favoritas"
  | "rapidas"
  | "saciedade"
  | "pendentes";
export type SectionVisualKey =
  | "mealPrep"
  | "favorites"
  | "filters"
  | "shopping"
  | "weeklySummary";

export type EditorialVisualAspectRatio = "16:9" | "3:4" | "1:1";

export interface EditorialAssetVisual {
  kind: "asset";
  src: string;
  alt: string;
  aspectRatio: EditorialVisualAspectRatio;
  objectPosition?: string;
  width?: number;
  height?: number;
}

export interface EditorialPlaceholderVisual {
  kind: "placeholder";
  alt: string;
  prompt: string;
  comment: string;
  aspectRatio: EditorialVisualAspectRatio;
  objectPosition?: string;
  width?: number;
  height?: number;
}

export type EditorialVisual = EditorialAssetVisual | EditorialPlaceholderVisual;

export type ShoppingCategory =
  | "proteinas"
  | "carboidratos"
  | "frutas"
  | "vegetais"
  | "laticinios-bebidas"
  | "gorduras-complementos"
  | "praticidade";

export interface PlateMethodSegment {
  percentage: string;
  title: string;
  description: string;
  accent: "teal" | "rose" | "taupe";
}

export type PlateMethodVariantId = "padrao" | "vegetariano_vegano";

export interface PlateMethodVariant {
  id: PlateMethodVariantId;
  label: string;
  description: string;
  appliesToFoodStyles: MealPlannerFoodStyle[];
  segments: PlateMethodSegment[];
}

export interface HydrationModel {
  intro: string;
  minimumMlPerKg: number;
  targetMlPerKg: number;
  note: string;
  learnMoreTitle: string;
  learnMorePoints: string[];
}

export interface MealItem {
  name: string;
  portion: string;
  category: ShoppingCategory;
  shoppingKey?: string;
}

export interface MealSubstitutionOption extends MealItem {
  id: string;
}

export interface MealSubstitution {
  slotId: string;
  from: string;
  groupLabel: string;
  modalDescription: string;
  swapMapLabel: string;
  options: MealSubstitutionOption[];
}

export interface MealVariant {
  id: string;
  label: string;
  items: MealItem[];
  note?: string;
  defaultForFoodStyles?: MealPlannerFoodStyle[];
  supportedRestrictions?: MealPlannerRestrictionKey[];
  plannerTags?: MealPlannerTag[];
}

export interface MealDefinition {
  key: MealKey;
  label: string;
  subtitle: string;
  visual: EditorialVisual;
  plannerTags: MealPlannerTag[];
  baseItems: MealItem[];
  substitutions: MealSubstitution[];
  variants: MealVariant[];
  highlights: string[];
}

export interface SwapGroup {
  key: "carboidratos" | "proteinas" | "legumes";
  title: string;
  description: string;
  items: MealItem[];
}

export interface MealPrepStep {
  id: string;
  title: string;
  description: string;
  suggestedItems: string[];
}

export interface MealPlanData {
  title: string;
  kcalLabel: string;
  summary: string;
  heroVisual: EditorialVisual;
  sectionVisuals: Record<SectionVisualKey, EditorialVisual>;
  plateMethodVariants: PlateMethodVariant[];
  hydration: HydrationModel;
  mealPrepSteps: MealPrepStep[];
  meals: MealDefinition[];
  swapGroups: SwapGroup[];
  globalNotes: string[];
}

export interface HydrationTargets {
  minimumMl: number;
  targetMl: number;
}

export const mealPlannerGoalLabels: Record<MealPlannerGoal, string> = {
  constancia: "Constância",
  saciedade: "Saciedade",
  praticidade: "Praticidade",
};

export const mealPlannerFoodStyleLabels: Record<MealPlannerFoodStyle, string> =
  {
    padrao: "Padrão",
    vegetariano: "Vegetariano",
    vegano: "Vegano",
  };

export const mealPlannerRestrictionLabels: Record<
  MealPlannerRestrictionKey,
  string
> = {
  sem_gluten: "Sem glúten",
  sem_lactose: "Sem lactose",
};

export const shoppingCategoryLabels: Record<ShoppingCategory, string> = {
  proteinas: "Proteínas",
  carboidratos: "Carboidratos",
  frutas: "Frutas",
  vegetais: "Vegetais e folhas",
  "laticinios-bebidas": "Laticínios e bebidas",
  "gorduras-complementos": "Gorduras e complementos",
  praticidade: "Praticidade",
};

const LITER_FORMATTER = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function calculateHydrationTargets(weightKg: number): HydrationTargets {
  const normalizedWeight = Number.isFinite(weightKg)
    ? Math.max(weightKg, 0)
    : 0;

  return {
    minimumMl: Math.round(normalizedWeight * 35),
    targetMl: Math.round(normalizedWeight * 50),
  };
}

export function formatMlToLiters(ml: number): string {
  const liters = (Number.isFinite(ml) ? Math.max(ml, 0) : 0) / 1000;
  return `${LITER_FORMATTER.format(liters)} L`;
}

export function getPlateMethodVariant(
  foodStyle?: MealPlannerFoodStyle | null
): PlateMethodVariant {
  const normalizedFoodStyle: MealPlannerFoodStyle = foodStyle ?? "padrao";

  const matchedVariant = mealPlanData.plateMethodVariants.find(variant =>
    variant.appliesToFoodStyles.includes(normalizedFoodStyle)
  );

  return matchedVariant ?? mealPlanData.plateMethodVariants[0];
}

export const mealPlanData: MealPlanData = {
  title: "Seu plano alimentar",
  kcalLabel: "1200 kcal",
  summary:
    "Comece pelo básico: escolha a refeição do momento, marque o que já fez e use o restante no seu ritmo.",
  heroVisual: {
    kind: "asset",
    src: toPublicPath("assets/images/alimentacao/v3/hero-plano-alimentar.webp"),
    alt: "Composição editorial do plano alimentar com pratos equilibrados, frutas frescas e copos de água.",
    aspectRatio: "16:9",
  },
  sectionVisuals: {
    mealPrep: {
      kind: "asset",
      src: toPublicPath("assets/images/alimentacao/v3/meal-prep-semanal.webp"),
      alt: "Ingredientes porcionados para a semana em potes organizados sobre bancada clara.",
      aspectRatio: "16:9",
    },
    favorites: {
      kind: "asset",
      src: toPublicPath(
        "assets/images/alimentacao/v3/favoritos-composicoes.webp"
      ),
      alt: "Sequência de pequenas composições de refeições favoritas alinhadas em bancada clara.",
      aspectRatio: "16:9",
    },
    filters: {
      kind: "asset",
      src: toPublicPath(
        "assets/images/alimentacao/v3/filtros-inteligentes.webp"
      ),
      alt: "Seleção de refeições e ingredientes organizada para representar escolhas rápidas e saciantes.",
      aspectRatio: "16:9",
    },
    shopping: {
      kind: "asset",
      src: toPublicPath(
        "assets/images/alimentacao/v3/lista-compras-semanal.webp"
      ),
      alt: "Lista de compras com verduras, proteínas e frutas organizadas sobre bancada de cozinha.",
      aspectRatio: "16:9",
    },
    weeklySummary: {
      kind: "asset",
      src: toPublicPath("assets/images/alimentacao/v3/resumo-semanal.webp"),
      alt: "Garrafa de água, anotações e refeições leves ao fundo representando constância semanal.",
      aspectRatio: "16:9",
    },
  },
  plateMethodVariants: [
    {
      id: "padrao",
      label: "Padrão",
      description:
        "A lógica continua simples: metade do prato em vegetais, um quarto em proteína e um quarto em carboidrato.",
      appliesToFoodStyles: ["padrao"],
      segments: [
        {
          percentage: "50%",
          title: "Vegetais crus e cozidos",
          description:
            "Monte metade do prato com folhas, legumes cozidos e vegetais de baixa densidade calórica.",
          accent: "teal",
        },
        {
          percentage: "25%",
          title: "Proteínas",
          description:
            "Use ovos, frango, carne magra, peixe ou alternativas vegetais como tofu, grão-de-bico, soja e lentilha.",
          accent: "rose",
        },
        {
          percentage: "25%",
          title: "Carboidratos",
          description:
            "Prefira porções simples, fáceis de medir e, quando possível, versões integrais.",
          accent: "taupe",
        },
      ],
    },
    {
      id: "vegetariano_vegano",
      label: "Vegetariano / Vegano",
      description:
        "No perfil vegetariano ou vegano, a distribuição prioriza verduras, tubérculos e leguminosas.",
      appliesToFoodStyles: ["vegetariano", "vegano"],
      segments: [
        {
          percentage: "50%",
          title: "Verduras e legumes",
          description:
            "Mantenha metade do prato com vegetais variados para volume e saciedade.",
          accent: "teal",
        },
        {
          percentage: "25%",
          title: "Cereais, raízes e tubérculos",
          description:
            "Use porções práticas de arroz, cuscuz, mandioca, batata ou mandioquinha.",
          accent: "taupe",
        },
        {
          percentage: "25%",
          title: "Leguminosas",
          description:
            "Feijão, grão-de-bico, soja e lentilha ajudam a fechar o prato com proteína vegetal.",
          accent: "rose",
        },
      ],
    },
  ],
  hydration: {
    intro:
      "A hidratação adequada ajuda na regulação da temperatura corporal, digestão, função cognitiva, saúde da pele e recuperação muscular.",
    minimumMlPerKg: 35,
    targetMlPerKg: 50,
    note: "Se você já bate o mínimo, use a meta ideal como referência para melhorar a constância ao longo do dia.",
    learnMoreTitle: "Por que hidratação importa",
    learnMorePoints: [
      "Ajuda no transporte de nutrientes e na regulação da temperatura corporal.",
      "Contribui para digestão, foco e recuperação muscular ao longo do dia.",
      "Apoia a saúde renal e cardiovascular quando a ingestão é consistente.",
    ],
  },
  mealPrepSteps: [
    {
      id: "proteina-base",
      title: "Proteína base pronta",
      description:
        "Deixe uma proteína principal já porcionada para reduzir atrito nas refeições centrais.",
      suggestedItems: ["frango", "patinho", "tofu", "grão-de-bico"],
    },
    {
      id: "carbo-base",
      title: "Carboidrato base alinhado",
      description:
        "Cozinhe uma base simples para o almoço e o jantar e use as trocas só quando fizer sentido.",
      suggestedItems: ["arroz", "batata", "mandioquinha", "abóbora"],
    },
    {
      id: "vegetais-lavados",
      title: "Vegetais lavados e visíveis",
      description:
        "Folhas e legumes já prontos aumentam muito a chance de manter o volume do prato.",
      suggestedItems: ["folhas", "abobrinha", "brócolis", "cenoura"],
    },
    {
      id: "frutas-porcionadas",
      title: "Frutas porcionadas",
      description:
        "Separe as frutas mais práticas para o café e os lanches antes da correria começar.",
      suggestedItems: ["melão", "morango", "pera", "banana"],
    },
    {
      id: "agua-e-itens-praticos",
      title: "Água e itens práticos",
      description:
        "Garanta água acessível e um atalho de praticidade para os dias mais corridos.",
      suggestedItems: ["garrafa", "barra de proteína", "iogurte", "café"],
    },
  ],
  meals: [
    {
      key: "cafe",
      label: "Café da manhã",
      subtitle:
        "Proteína, fruta e gordura boa para começar o dia com mais estabilidade.",
      plannerTags: ["rapida"],
      visual: {
        kind: "asset",
        src: toPublicPath(
          "assets/images/alimentacao/v3/cafe-da-manha-card.webp"
        ),
        alt: "Café da manhã editorial com fruta, bebida quente e textura cremosa.",
        aspectRatio: "3:4",
      },
      baseItems: [
        {
          name: "Café coado",
          portion: "1 xícara de chá (200 ml)",
          category: "laticinios-bebidas",
          shoppingKey: "Café coado",
        },
        {
          name: "Ovos de galinha",
          portion: "2 unidades",
          category: "proteinas",
          shoppingKey: "Ovos de galinha",
        },
        {
          name: "Abacate",
          portion: "45 g",
          category: "frutas",
          shoppingKey: "Abacate",
        },
        {
          name: "Melão",
          portion: "80 g",
          category: "frutas",
          shoppingKey: "Melão",
        },
      ],
      substitutions: [
        {
          slotId: "cafe-fruta",
          from: "Melão",
          groupLabel: "Fruta do café",
          modalDescription:
            "Troque a fruta do café da manhã por opções mais refrescantes ou práticas.",
          swapMapLabel: "Fruta do café",
          options: [
            {
              id: "cafe-melancia",
              name: "Melancia",
              portion: "80 g",
              category: "frutas",
              shoppingKey: "Melancia",
            },
            {
              id: "cafe-mamao",
              name: "Mamão",
              portion: "70 g",
              category: "frutas",
              shoppingKey: "Mamão",
            },
          ],
        },
        {
          slotId: "cafe-proteina",
          from: "Ovos de galinha",
          groupLabel: "Proteína do café",
          modalDescription:
            "Troque a proteína do café da manhã por versões mais leves ou cremosas.",
          swapMapLabel: "Proteína do café",
          options: [
            {
              id: "cafe-mucarela",
              name: "Queijo muçarela",
              portion: "2 fatias (40 g)",
              category: "laticinios-bebidas",
              shoppingKey: "Queijo muçarela",
            },
            {
              id: "cafe-cottage",
              name: "Queijo cottage",
              portion: "2 colheres de sopa (50 g)",
              category: "laticinios-bebidas",
              shoppingKey: "Queijo cottage",
            },
          ],
        },
      ],
      variants: [
        {
          id: "cafe-shake-proteico",
          label: "Shake proteico",
          plannerTags: ["rapida"],
          items: [
            {
              name: "Leite semidesnatado",
              portion: "200 ml",
              category: "laticinios-bebidas",
              shoppingKey: "Leite semidesnatado",
            },
            {
              name: "Whey protein",
              portion: "30 g",
              category: "praticidade",
              shoppingKey: "Whey protein",
            },
            {
              name: "Aveia em flocos",
              portion: "3 colheres de sopa rasas (45 g)",
              category: "carboidratos",
              shoppingKey: "Aveia em flocos",
            },
            {
              name: "Morango",
              portion: "10 unidades médias",
              category: "frutas",
              shoppingKey: "Morango",
            },
            {
              name: "Banana",
              portion: "1 unidade média",
              category: "frutas",
              shoppingKey: "Banana",
            },
          ],
        },
        {
          id: "cafe-vegana",
          label: "Opção vegana",
          defaultForFoodStyles: ["vegetariano", "vegano"],
          plannerTags: ["rapida"],
          items: [
            {
              name: "Café coado ou chá",
              portion: "200 ml",
              category: "laticinios-bebidas",
              shoppingKey: "Café coado ou chá",
            },
            {
              name: "Bolacha de arroz grande",
              portion: "3 unidades",
              category: "carboidratos",
              shoppingKey: "Bolacha de arroz grande",
            },
            {
              name: "Homus",
              portion: "1 colher de sopa",
              category: "proteinas",
              shoppingKey: "Homus",
            },
            {
              name: "Melão",
              portion: "1 fatia média",
              category: "frutas",
              shoppingKey: "Melão",
            },
            {
              name: "Banana",
              portion: "1 unidade média",
              category: "frutas",
              shoppingKey: "Banana",
            },
          ],
        },
      ],
      highlights: [
        "Comece pelo básico e use as trocas apenas quando facilitar a rotina.",
        "Se quiser mais volume, aumente a fruta de menor densidade calórica.",
      ],
    },
    {
      key: "almoco",
      label: "Almoço",
      subtitle:
        "Prato principal do dia com volume alto de vegetais e proteína central.",
      plannerTags: ["saciedade"],
      visual: {
        kind: "asset",
        src: toPublicPath("assets/images/alimentacao/v3/almoco-card.webp"),
        alt: "Prato de almoço com folhas, legumes coloridos e proteína central.",
        aspectRatio: "3:4",
      },
      baseItems: [
        {
          name: "Abóbora cabotiá cozida",
          portion: "200 g",
          category: "carboidratos",
          shoppingKey: "Abóbora cabotiá cozida",
        },
        {
          name: "Filé de frango grelhado",
          portion: "100 g",
          category: "proteinas",
          shoppingKey: "Filé de frango grelhado",
        },
        {
          name: "Mix de folhas",
          portion: "metade do prato com alface crespa, alface roxa e rúcula",
          category: "vegetais",
          shoppingKey: "Mix de folhas",
        },
        {
          name: "Legumes cozidos",
          portion: "abobrinha, cenoura e brócolis à vontade",
          category: "vegetais",
          shoppingKey: "Legumes cozidos",
        },
        {
          name: "Azeite de oliva extravirgem",
          portion: "1 colher de sopa (8 ml)",
          category: "gorduras-complementos",
          shoppingKey: "Azeite de oliva extravirgem",
        },
      ],
      substitutions: [
        {
          slotId: "almoco-carbo",
          from: "Abóbora cabotiá cozida",
          groupLabel: "Carboidrato do almoço",
          modalDescription:
            "Troque a base de carboidrato do almoço sem desmontar o prato.",
          swapMapLabel: "Carboidrato do almoço",
          options: [
            {
              id: "almoco-batata-inglesa",
              name: "Batata inglesa cozida",
              portion: "200 g",
              category: "carboidratos",
              shoppingKey: "Batata inglesa cozida",
            },
            {
              id: "almoco-arroz",
              name: "Arroz branco ou integral",
              portion: "100 g",
              category: "carboidratos",
              shoppingKey: "Arroz branco ou integral",
            },
            {
              id: "almoco-mandioquinha",
              name: "Mandioquinha",
              portion: "150 g",
              category: "carboidratos",
              shoppingKey: "Mandioquinha",
            },
          ],
        },
        {
          slotId: "almoco-proteina",
          from: "Filé de frango grelhado",
          groupLabel: "Proteína do almoço",
          modalDescription:
            "Troque a proteína central do almoço mantendo a estrutura da refeição.",
          swapMapLabel: "Proteína do almoço",
          options: [
            {
              id: "almoco-tilapia",
              name: "Tilápia cozida",
              portion: "130 g",
              category: "proteinas",
              shoppingKey: "Tilápia cozida",
            },
            {
              id: "almoco-patinho",
              name: "Patinho grelhado ou moído",
              portion: "100 g",
              category: "proteinas",
              shoppingKey: "Patinho grelhado ou moído",
            },
            {
              id: "almoco-lombo",
              name: "Lombo suíno assado",
              portion: "100 g",
              category: "proteinas",
              shoppingKey: "Lombo suíno assado",
            },
          ],
        },
      ],
      variants: [
        {
          id: "almoco-vegana",
          label: "Opção vegana",
          defaultForFoodStyles: ["vegetariano", "vegano"],
          plannerTags: ["saciedade"],
          items: [
            {
              name: "Cenoura cozida",
              portion: "1 colher de arroz cheia (40 g)",
              category: "vegetais",
              shoppingKey: "Cenoura cozida",
            },
            {
              name: "Grão de soja refogado",
              portion: "6 colheres de servir (180 g)",
              category: "proteinas",
              shoppingKey: "Grão de soja refogado",
            },
            {
              name: "Batata inglesa assada",
              portion: "3 colheres de servir cheias (165 g)",
              category: "carboidratos",
              shoppingKey: "Batata inglesa assada",
            },
            {
              name: "Tomate",
              portion: "3 colheres de sopa cheias (45 g)",
              category: "vegetais",
              shoppingKey: "Tomate",
            },
            {
              name: "Rúcula",
              portion: "1 pegador (8 g)",
              category: "vegetais",
              shoppingKey: "Rúcula",
            },
          ],
        },
      ],
      highlights: [
        "Salada à vontade no almoço.",
        "Se a fome apertar, priorize mais legumes e folhas antes de subir carboidrato.",
      ],
    },
    {
      key: "lanche",
      label: "Lanche da tarde",
      subtitle:
        "Lanche simples, prático e fácil de adaptar para rotina corrida.",
      plannerTags: ["rapida"],
      visual: {
        kind: "asset",
        src: toPublicPath(
          "assets/images/alimentacao/v3/lanche-da-tarde-card.webp"
        ),
        alt: "Lanche da tarde com frutas, iogurte e textura cremosa em composição vertical.",
        aspectRatio: "3:4",
      },
      baseItems: [
        {
          name: "Iogurte natural desnatado",
          portion: "1 unidade (100 g)",
          category: "laticinios-bebidas",
          shoppingKey: "Iogurte natural desnatado",
        },
        {
          name: "Pera",
          portion: "1 unidade média (110 g)",
          category: "frutas",
          shoppingKey: "Pera",
        },
        {
          name: "Aveia",
          portion: "20 g",
          category: "carboidratos",
          shoppingKey: "Aveia",
        },
        {
          name: "Semente de chia",
          portion: "1 colher de chá cheia (6 g)",
          category: "gorduras-complementos",
          shoppingKey: "Semente de chia",
        },
      ],
      substitutions: [
        {
          slotId: "lanche-base-cremosa",
          from: "Iogurte natural desnatado",
          groupLabel: "Base cremosa do lanche",
          modalDescription:
            "Troque a base cremosa do lanche por uma opção sem lactose ou vegetal.",
          swapMapLabel: "Base cremosa",
          options: [
            {
              id: "lanche-zero-lactose",
              name: "Iogurte zero lactose",
              portion: "1 unidade",
              category: "laticinios-bebidas",
              shoppingKey: "Iogurte zero lactose",
            },
            {
              id: "lanche-leite-amendoa",
              name: "Leite de amêndoa",
              portion: "240 ml",
              category: "laticinios-bebidas",
              shoppingKey: "Leite de amêndoa",
            },
          ],
        },
        {
          slotId: "lanche-fruta",
          from: "Pera",
          groupLabel: "Fruta do lanche",
          modalDescription:
            "Troque a fruta do lanche para variar sabor, textura e praticidade.",
          swapMapLabel: "Fruta do lanche",
          options: [
            {
              id: "lanche-abacaxi",
              name: "Abacaxi",
              portion: "1 fatia média (75 g)",
              category: "frutas",
              shoppingKey: "Abacaxi",
            },
            {
              id: "lanche-morango",
              name: "Morango",
              portion: "10 unidades médias (120 g)",
              category: "frutas",
              shoppingKey: "Morango",
            },
            {
              id: "lanche-banana-prata",
              name: "Banana prata",
              portion: "1 unidade grande (55 g)",
              category: "frutas",
              shoppingKey: "Banana prata",
            },
          ],
        },
        {
          slotId: "lanche-carbo",
          from: "Aveia",
          groupLabel: "Carboidrato do lanche",
          modalDescription:
            "Troque o carboidrato do lanche por uma versão mais leve e prática.",
          swapMapLabel: "Carboidrato do lanche",
          options: [
            {
              id: "lanche-farelo-aveia",
              name: "Farelo de aveia",
              portion: "1 colher de sopa (10 g)",
              category: "carboidratos",
              shoppingKey: "Farelo de aveia",
            },
          ],
        },
        {
          slotId: "lanche-complemento",
          from: "Semente de chia",
          groupLabel: "Complemento do lanche",
          modalDescription:
            "Troque o complemento do lanche para ajustar sabor e funcionalidade.",
          swapMapLabel: "Complemento do lanche",
          options: [
            {
              id: "lanche-cacau-po",
              name: "Cacau em pó",
              portion: "1 colher de chá cheia (4 g)",
              category: "gorduras-complementos",
              shoppingKey: "Cacau em pó",
            },
          ],
        },
      ],
      variants: [
        {
          id: "lanche-zero-lactose",
          label: "Zero lactose",
          supportedRestrictions: ["sem_lactose"],
          plannerTags: ["rapida"],
          items: [
            {
              name: "Iogurte zero lactose",
              portion: "1 unidade",
              category: "laticinios-bebidas",
              shoppingKey: "Iogurte zero lactose",
            },
            {
              name: "Abacaxi",
              portion: "1 fatia média (75 g)",
              category: "frutas",
              shoppingKey: "Abacaxi",
            },
            {
              name: "Farelo de aveia",
              portion: "1 colher de sopa (10 g)",
              category: "carboidratos",
              shoppingKey: "Farelo de aveia",
            },
          ],
        },
        {
          id: "lanche-sem-gluten",
          label: "Sem glúten",
          supportedRestrictions: ["sem_gluten"],
          plannerTags: ["rapida"],
          items: [
            {
              name: "Ovo mexido",
              portion: "1 unidade média (45 g)",
              category: "proteinas",
              shoppingKey: "Ovo mexido",
            },
            {
              name: "Queijo cottage",
              portion: "2 fatias (74 g)",
              category: "laticinios-bebidas",
              shoppingKey: "Queijo cottage",
            },
            {
              name: "Morango",
              portion: "10 unidades médias (120 g)",
              category: "frutas",
              shoppingKey: "Morango",
            },
          ],
        },
        {
          id: "lanche-vegana",
          label: "Opção vegana",
          defaultForFoodStyles: ["vegetariano", "vegano"],
          plannerTags: ["rapida"],
          note: "Boa alternativa quando quiser algo mais doce ou precisar de algo rápido.",
          items: [
            {
              name: "Leite de amêndoa",
              portion: "1 copo (240 ml)",
              category: "laticinios-bebidas",
              shoppingKey: "Leite de amêndoa",
            },
            {
              name: "Banana prata",
              portion: "1 unidade grande (55 g)",
              category: "frutas",
              shoppingKey: "Banana prata",
            },
            {
              name: "Farelo de aveia",
              portion: "1 colher de sopa (10 g)",
              category: "carboidratos",
              shoppingKey: "Farelo de aveia",
            },
            {
              name: "Cacau em pó",
              portion: "1 colher de chá cheia (4 g)",
              category: "gorduras-complementos",
              shoppingKey: "Cacau em pó",
            },
          ],
        },
        {
          id: "lanche-atalho-pratico",
          label: "Atalho prático",
          plannerTags: ["rapida"],
          note: "Use nos dias corridos; a referência do plano menciona cerca de 11 g de proteína.",
          items: [
            {
              name: "Barra de proteína Growth",
              portion: "1 unidade (40 g)",
              category: "praticidade",
              shoppingKey: "Barra de proteína Growth",
            },
          ],
        },
      ],
      highlights: [
        "Se quiser beber, bata a opção vegana no liquidificador.",
        "Este é o melhor ponto do plano para simplificar sem perder aderência.",
      ],
    },
    {
      key: "jantar",
      label: "Jantar",
      subtitle:
        "Fechamento do dia com proteína, carboidrato controlado e bastante vegetal.",
      plannerTags: ["saciedade"],
      visual: {
        kind: "asset",
        src: toPublicPath("assets/images/alimentacao/v3/jantar-card.webp"),
        alt: "Jantar leve com legumes, folhas e proteína em composição editorial vertical.",
        aspectRatio: "3:4",
      },
      baseItems: [
        {
          name: "Batata inglesa assada",
          portion: "150 g",
          category: "carboidratos",
          shoppingKey: "Batata inglesa assada",
        },
        {
          name: "Acém moído refogado",
          portion: "100 g",
          category: "proteinas",
          shoppingKey: "Acém moído refogado",
        },
        {
          name: "Tomate-cereja",
          portion: "6 unidades (60 g)",
          category: "vegetais",
          shoppingKey: "Tomate-cereja",
        },
        {
          name: "Rúcula",
          portion: "1 colher de sopa cheia (7 g)",
          category: "vegetais",
          shoppingKey: "Rúcula",
        },
        {
          name: "Azeite de oliva extravirgem",
          portion: "1 colher de sopa (8 ml)",
          category: "gorduras-complementos",
          shoppingKey: "Azeite de oliva extravirgem",
        },
      ],
      substitutions: [
        {
          slotId: "jantar-carbo",
          from: "Batata inglesa assada",
          groupLabel: "Carboidrato do jantar",
          modalDescription:
            "Troque a base de carboidrato do jantar sem alterar a estrutura do prato.",
          swapMapLabel: "Carboidrato do jantar",
          options: [
            {
              id: "jantar-abobora",
              name: "Abóbora cabotiá cozida",
              portion: "150 g",
              category: "carboidratos",
              shoppingKey: "Abóbora cabotiá cozida",
            },
            {
              id: "jantar-arroz",
              name: "Arroz branco ou integral",
              portion: "80 g",
              category: "carboidratos",
              shoppingKey: "Arroz branco ou integral",
            },
          ],
        },
        {
          slotId: "jantar-proteina",
          from: "Acém moído refogado",
          groupLabel: "Proteína do jantar",
          modalDescription:
            "Troque a proteína do jantar mantendo os acompanhamentos.",
          swapMapLabel: "Proteína do jantar",
          options: [
            {
              id: "jantar-frango-desfiado",
              name: "Frango desfiado",
              portion: "100 g",
              category: "proteinas",
              shoppingKey: "Frango desfiado",
            },
            {
              id: "jantar-file-frango",
              name: "Filé de frango grelhado",
              portion: "100 g",
              category: "proteinas",
              shoppingKey: "Filé de frango grelhado",
            },
            {
              id: "jantar-ovos",
              name: "Ovos de galinha",
              portion: "2 unidades",
              category: "proteinas",
              shoppingKey: "Ovos de galinha",
            },
          ],
        },
      ],
      variants: [
        {
          id: "jantar-vegana",
          label: "Opção vegana",
          defaultForFoodStyles: ["vegetariano", "vegano"],
          plannerTags: ["saciedade"],
          items: [
            {
              name: "Tofu",
              portion: "2 fatias médias (120 g)",
              category: "proteinas",
              shoppingKey: "Tofu",
            },
            {
              name: "Mandioquinha cozida",
              portion: "4 colheres de arroz cheias (220 g)",
              category: "carboidratos",
              shoppingKey: "Mandioquinha cozida",
            },
            {
              name: "Grão-de-bico",
              portion: "1 colher de servir (50 g)",
              category: "proteinas",
              shoppingKey: "Grão-de-bico",
            },
            {
              name: "Brócolis cozido",
              portion: "1 escumadeira (60 g)",
              category: "vegetais",
              shoppingKey: "Brócolis cozido",
            },
            {
              name: "Pepino",
              portion: "1/2 unidade média (50 g)",
              category: "vegetais",
              shoppingKey: "Pepino",
            },
          ],
        },
      ],
      highlights: [
        "Salada à vontade no jantar.",
        "Se bater mais fome durante a semana, reforce verduras, legumes e frutas leves na refeição seguinte.",
      ],
    },
  ],
  swapGroups: [
    {
      key: "carboidratos",
      title: "Carboidratos",
      description:
        "Trocas de almoço e jantar para variar textura e praticidade sem desmontar o prato.",
      items: [
        {
          name: "Polenta cozida",
          portion: "2,5 colheres de sopa (80 g)",
          category: "carboidratos",
          shoppingKey: "Polenta cozida",
        },
        {
          name: "Quinoa em grãos cozida",
          portion: "6 colheres de sopa (100 g)",
          category: "carboidratos",
          shoppingKey: "Quinoa em grãos cozida",
        },
        {
          name: "Arroz branco cozido",
          portion: "6 colheres de sopa (120 g)",
          category: "carboidratos",
          shoppingKey: "Arroz branco cozido",
        },
        {
          name: "Arroz 7 grãos integrais",
          portion: "5 colheres de sopa (126 g)",
          category: "carboidratos",
          shoppingKey: "Arroz 7 grãos integrais",
        },
        {
          name: "Arroz integral cozido",
          portion: "6 colheres de sopa (120 g)",
          category: "carboidratos",
          shoppingKey: "Arroz integral cozido",
        },
        {
          name: "Arroz parboilizado cozido",
          portion: "6 colheres de sopa (120 g)",
          category: "carboidratos",
          shoppingKey: "Arroz parboilizado cozido",
        },
        {
          name: "Arroz negro cozido",
          portion: "5 colheres de sopa (120 g)",
          category: "carboidratos",
          shoppingKey: "Arroz negro cozido",
        },
        {
          name: "Arroz vermelho cozido",
          portion: "6 colheres de sopa cheias (130 g)",
          category: "carboidratos",
          shoppingKey: "Arroz vermelho cozido",
        },
        {
          name: "Batata-doce cozida",
          portion: "4,5 colheres de sopa niveladas (190 g)",
          category: "carboidratos",
          shoppingKey: "Batata-doce cozida",
        },
        {
          name: "Batata inglesa cozida",
          portion: "4,5 colheres de servir cheias (280 g)",
          category: "carboidratos",
          shoppingKey: "Batata inglesa cozida",
        },
        {
          name: "Batata baroa (mandioquinha)",
          portion: "4,5 colheres de sopa niveladas (190 g)",
          category: "carboidratos",
          shoppingKey: "Batata baroa (mandioquinha)",
        },
        {
          name: "Cará cozido",
          portion: "3,5 colheres de servir rasas (180 g)",
          category: "carboidratos",
          shoppingKey: "Cará cozido",
        },
        {
          name: "Farinha de mandioca",
          portion: "2,5 colheres de sopa (40 g)",
          category: "carboidratos",
          shoppingKey: "Farinha de mandioca",
        },
        {
          name: "Inhame cozido",
          portion: "3,5 colheres de sopa (163 g)",
          category: "carboidratos",
          shoppingKey: "Inhame cozido",
        },
        {
          name: "Mandioca cozida",
          portion: "4 pedaços pequenos (100 g)",
          category: "carboidratos",
          shoppingKey: "Mandioca cozida",
        },
        {
          name: "Macarrão de arroz cozido",
          portion: "1 pires de sobremesa (59 g)",
          category: "carboidratos",
          shoppingKey: "Macarrão de arroz cozido",
        },
        {
          name: "Macarrão fusilli sem glúten",
          portion: "3 colheres de servir (63 g)",
          category: "carboidratos",
          shoppingKey: "Macarrão fusilli sem glúten",
        },
        {
          name: "Macarrão",
          portion: "3 colheres de servir (150 g)",
          category: "carboidratos",
          shoppingKey: "Macarrão",
        },
        {
          name: "Pão de forma integral",
          portion: "2 fatias",
          category: "carboidratos",
          shoppingKey: "Pão de forma integral",
        },
        {
          name: "Pão sírio",
          portion: "1 unidade",
          category: "carboidratos",
          shoppingKey: "Pão sírio",
        },
        {
          name: "Tapioca",
          portion: "6 colheres de sopa rasas",
          category: "carboidratos",
          shoppingKey: "Tapioca",
        },
        {
          name: "Cuscuz",
          portion: "6,5 colheres de sopa (134 g)",
          category: "carboidratos",
          shoppingKey: "Cuscuz",
        },
      ],
    },
    {
      key: "proteinas",
      title: "Proteínas",
      description:
        "Referências práticas para variar proteína animal e manter porções próximas ao plano base.",
      items: [
        {
          name: "Acém moído e cozido",
          portion: "4 colheres de sopa cheias (100 g)",
          category: "proteinas",
          shoppingKey: "Acém moído e cozido",
        },
        {
          name: "Patinho grelhado",
          portion: "1,5 pedaço médio (100 g)",
          category: "proteinas",
          shoppingKey: "Patinho grelhado",
        },
        {
          name: "Contrafilé sem gordura grelhado",
          portion: "1 bife pequeno (80 g)",
          category: "proteinas",
          shoppingKey: "Contrafilé sem gordura grelhado",
        },
        {
          name: "Coxão duro sem gordura cozido",
          portion: "1 pedaço pequeno (100 g)",
          category: "proteinas",
          shoppingKey: "Coxão duro sem gordura cozido",
        },
        {
          name: "Filé mignon sem gordura grelhado",
          portion: "1 pedaço pequeno (100 g)",
          category: "proteinas",
          shoppingKey: "Filé mignon sem gordura grelhado",
        },
        {
          name: "Maminha grelhada",
          portion: "1 bife médio (140 g)",
          category: "proteinas",
          shoppingKey: "Maminha grelhada",
        },
        {
          name: "Filé de frango cozido",
          portion: "1 bife pequeno (140 g)",
          category: "proteinas",
          shoppingKey: "Filé de frango cozido",
        },
        {
          name: "Peito de frango grelhado",
          portion: "2 pedaços pequenos (140 g)",
          category: "proteinas",
          shoppingKey: "Peito de frango grelhado",
        },
        {
          name: "Frango (coxa assada sem pele)",
          portion: "1,5 unidade (95 g)",
          category: "proteinas",
          shoppingKey: "Frango (coxa assada sem pele)",
        },
        {
          name: "Frango (sobrecoxa assada sem pele)",
          portion: "2 unidades médias (100 g)",
          category: "proteinas",
          shoppingKey: "Frango (sobrecoxa assada sem pele)",
        },
        {
          name: "Pernil cozido ou assado",
          portion: "8 pedaços pequenos (90 g)",
          category: "proteinas",
          shoppingKey: "Pernil cozido ou assado",
        },
        {
          name: "Lombo suíno assado",
          portion: "fatias finas (100 g)",
          category: "proteinas",
          shoppingKey: "Lombo suíno assado",
        },
        {
          name: "Ovo de codorna",
          portion: "14 unidades (120 g)",
          category: "proteinas",
          shoppingKey: "Ovo de codorna",
        },
        {
          name: "Anchova cozida",
          portion: "6 pedaços pequenos (160 g)",
          category: "proteinas",
          shoppingKey: "Anchova cozida",
        },
        {
          name: "Atum sólido em óleo",
          portion: "4 colheres de sopa (100 g)",
          category: "proteinas",
          shoppingKey: "Atum sólido em óleo",
        },
        {
          name: "Atum em azeite de oliva",
          portion: "3,5 colheres de sopa (100 g)",
          category: "proteinas",
          shoppingKey: "Atum em azeite de oliva",
        },
        {
          name: "Cação cozido",
          portion: "2 unidades (200 g)",
          category: "proteinas",
          shoppingKey: "Cação cozido",
        },
        {
          name: "Linguado cozido",
          portion: "1,5 filé médio (150 g)",
          category: "proteinas",
          shoppingKey: "Linguado cozido",
        },
        {
          name: "Merluza cozida",
          portion: "1,5 filé médio (150 g)",
          category: "proteinas",
          shoppingKey: "Merluza cozida",
        },
        {
          name: "Salmão sem pele grelhado",
          portion: "1 pedaço médio (100 g)",
          category: "proteinas",
          shoppingKey: "Salmão sem pele grelhado",
        },
        {
          name: "Sardinha assada",
          portion: "2 unidades pequenas (120 g)",
          category: "proteinas",
          shoppingKey: "Sardinha assada",
        },
        {
          name: "Tilápia",
          portion: "1 filé grande (150 g)",
          category: "proteinas",
          shoppingKey: "Tilápia",
        },
        {
          name: "Sashimi de peixe branco",
          portion: "12 unidades (180 g)",
          category: "proteinas",
          shoppingKey: "Sashimi de peixe branco",
        },
        {
          name: "Sashimi de salmão",
          portion: "12 unidades (180 g)",
          category: "proteinas",
          shoppingKey: "Sashimi de salmão",
        },
        {
          name: "Ovos",
          portion: "2 unidades",
          category: "proteinas",
          shoppingKey: "Ovos",
        },
      ],
    },
    {
      key: "legumes",
      title: "Legumes cozidos",
      description:
        "Volume de segurança para saciedade e organização visual do prato.",
      items: [
        {
          name: "Abobrinha italiana",
          portion: "3 rodelas médias (60 g)",
          category: "vegetais",
          shoppingKey: "Abobrinha italiana",
        },
        {
          name: "Alcachofra cozida",
          portion: "2 e 1/2 unidades (120 g)",
          category: "vegetais",
          shoppingKey: "Alcachofra cozida",
        },
        {
          name: "Aspargo",
          portion: "1/2 unidade (30 g)",
          category: "vegetais",
          shoppingKey: "Aspargo",
        },
        {
          name: "Beterraba cozida",
          portion: "1/2 unidade média (100 g)",
          category: "vegetais",
          shoppingKey: "Beterraba cozida",
        },
        {
          name: "Berinjela cozida",
          portion: "4 fatias finas (100 g)",
          category: "vegetais",
          shoppingKey: "Berinjela cozida",
        },
        {
          name: "Brócolis cozido",
          portion: "7 floretes (100 g)",
          category: "vegetais",
          shoppingKey: "Brócolis cozido",
        },
        {
          name: "Couve-flor cozida",
          portion: "3 floretes pequenos (75 g)",
          category: "vegetais",
          shoppingKey: "Couve-flor cozida",
        },
        {
          name: "Cenoura cozida",
          portion: "1 pires de sobremesa (100 g)",
          category: "vegetais",
          shoppingKey: "Cenoura cozida",
        },
        {
          name: "Chuchu cozido",
          portion: "1 colher de servir rasa (30 g)",
          category: "vegetais",
          shoppingKey: "Chuchu cozido",
        },
        {
          name: "Espinafre refogado",
          portion: "4,5 colheres de sopa (50 g)",
          category: "vegetais",
          shoppingKey: "Espinafre refogado",
        },
        {
          name: "Funghi secchi",
          portion: "1/2 xícara de chá (10 g)",
          category: "vegetais",
          shoppingKey: "Funghi secchi",
        },
        {
          name: "Jiló cozido",
          portion: "1 colher de servir rasa (60 g)",
          category: "vegetais",
          shoppingKey: "Jiló cozido",
        },
        {
          name: "Jurubeba",
          portion: "1 xícara de chá (30 g)",
          category: "vegetais",
          shoppingKey: "Jurubeba",
        },
        {
          name: "Maxixe",
          portion: "1 colher de sopa cheia (40 g)",
          category: "vegetais",
          shoppingKey: "Maxixe",
        },
        {
          name: "Quiabo refogado",
          portion: "2 colheres de sopa rasas (35 g)",
          category: "vegetais",
          shoppingKey: "Quiabo refogado",
        },
        {
          name: "Vagem cozida",
          portion: "1 pires de sobremesa (56 g)",
          category: "vegetais",
          shoppingKey: "Vagem cozida",
        },
      ],
    },
  ],
  globalNotes: [
    "Salada à vontade no almoço e no jantar.",
    "Em semanas com mais fome, acrescente alimentos de baixa densidade calórica na refeição seguinte.",
    "Melão, melancia e morango são frutas úteis para subir volume sem pesar o plano.",
  ],
};
