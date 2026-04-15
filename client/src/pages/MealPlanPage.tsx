import { useEffect, useState, type CSSProperties } from "react";
import {
  Apple,
  ArrowRightLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Drumstick,
  Heart,
  Leaf,
  PencilLine,
  ShoppingBasket,
  SlidersHorizontal,
  Sparkles,
  Star,
  Wheat,
} from "lucide-react";

import Layout from "@/components/Layout";
import EditorialVisual from "@/components/meal-planner/EditorialVisual";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useSEO } from "@/hooks/useSEO";
import {
  calculateHydrationTargets,
  formatMlToLiters,
  getPlateMethodVariant,
  mealPlanData,
  type MealFilterKey,
  type ShoppingCategory,
  mealPlannerFoodStyleLabels,
  mealPlannerGoalLabels,
  mealPlannerRestrictionLabels,
  type MealDefinition,
  type MealKey,
  type MealPlannerFoodStyle,
  type MealPlannerGoal,
  type MealPlannerRestrictionKey,
} from "@/lib/mealPlanData";
import {
  applyMealSubstitutionSelection,
  buildWeeklyShoppingGroups,
  calculateCompletionPct,
  clearMealSubstitutionSelections,
  createSavedMealComposition,
  getActiveSwapCountByMeal,
  getActiveSwapSummaryEntries,
  getFilteredMeals,
  getInteractiveSwapMapGroups,
  getMealsWithSubstitutions,
  getResolvedMealSelection,
  getWeeklySummary,
  mealPlannerFilterLabels,
  readMealPlannerStorage,
  toggleFavoriteComposition,
  writeMealPlannerStorage,
  type MealPlannerProfile,
  type SavedMealComposition,
  type MealPlannerStorage,
} from "@/lib/mealPlannerState";

type OnboardingDraft = {
  weightInput: string;
  goal: MealPlannerGoal;
  foodStyle: MealPlannerFoodStyle;
  restrictions: MealPlannerRestrictionKey[];
};

const goalCopy: Record<MealPlannerGoal, string> = {
  constancia: "Organizar o plano para caber melhor no seu dia.",
  saciedade:
    "Dar mais segurança nas escolhas e deixar o prato mais satisfatório.",
  praticidade: "Deixar as decisões mais leves nas refeições corridas.",
};

const planUseSteps = [
  {
    step: "1",
    title: "Ajuste seu perfil",
    description: "Peso, objetivo e preferências deixam o plano mais coerente.",
  },
  {
    step: "2",
    title: "Escolha só a refeição do momento",
    description: "Você não precisa decidir a semana inteira de uma vez.",
  },
  {
    step: "3",
    title: "Marque quando fizer",
    description: "Água, progresso e histórico se atualizam no seu ritmo.",
  },
  {
    step: "4",
    title: "Quando quiser, simplifique a semana",
    description: "Opções salvas e preparo semanal entram depois, sem pressa.",
  },
] as const;

const mealPageShellStyle = {
  "--color-ivory": "#faf3e8",
  "--color-ivory-dark": "#e9ddcb",
  "--color-paper": "#f3e7d6",
  "--color-surface": "#fffaf3",
  "--color-surface-soft": "#f4eadc",
  "--color-taupe": "#5f564b",
  "--color-taupe-light": "#cbb69a",
  "--color-rose": "#723745",
  "--color-rose-light": "#b56479",
  "--color-rose-muted": "#ead2d8",
  "--color-teal": "#2f5d59",
  "--color-teal-light": "#4f817d",
  "--color-teal-muted": "#d3e4de",
  "--color-charcoal": "#1f2628",
  "--color-charcoal-light": "#384345",
  "--color-warm-gray": "#485255",
  "--color-border-soft": "rgba(95,86,75,0.14)",
  "--color-border-strong": "rgba(95,86,75,0.22)",
  background:
    "radial-gradient(circle at top left, rgba(211,228,222,0.95) 0%, rgba(211,228,222,0) 30%), radial-gradient(circle at top right, rgba(234,210,216,0.82) 0%, rgba(234,210,216,0) 24%), linear-gradient(180deg, #f8f0e4 0%, #f0e2d0 100%)",
  padding: "clamp(0.75rem, 1.8vw, 1.35rem) clamp(0.75rem, 1.8vw, 1.2rem) 3rem",
} as CSSProperties;

const sectionCardStyle: CSSProperties = {
  padding: "clamp(1rem, 2.8vw, 1.85rem) 0",
  background: "transparent",
  border: "0",
  borderTop: "1px solid rgba(95,86,75,0.12)",
  boxShadow: "none",
  borderRadius: "0",
};

const heroSectionStyle: CSSProperties = {
  padding: "clamp(1.25rem, 4vw, 3rem)",
  background:
    "linear-gradient(140deg, rgba(27,42,46,0.98) 0%, rgba(47,93,89,0.96) 44%, rgba(114,55,69,0.94) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 30px 90px rgba(34,24,18,0.24)",
  borderRadius: "34px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "clamp(1.75rem, 4vw, 2.35rem)",
  color: "var(--color-charcoal)",
  fontWeight: 500,
  lineHeight: 1.04,
  letterSpacing: "-0.02em",
};

const sectionLeadStyle: CSSProperties = {
  fontSize: "0.98rem",
  color: "var(--color-charcoal-light)",
  lineHeight: 1.72,
};

const elevatedSurfaceStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,250,243,0.99) 0%, rgba(245,235,221,0.97) 100%)",
  border: "1px solid var(--color-border-strong)",
  boxShadow: "0 18px 38px rgba(52,37,25,0.1)",
  borderRadius: "24px",
};

const softSurfaceStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(245,235,221,0.98) 0%, rgba(237,225,210,0.96) 100%)",
  border: "1px solid rgba(95,86,75,0.16)",
  boxShadow: "0 10px 24px rgba(52,37,25,0.05)",
  borderRadius: "22px",
};

const tealSurfaceStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(223,236,231,0.98) 0%, rgba(209,226,220,0.98) 100%)",
  border: "1px solid rgba(47,93,89,0.26)",
  boxShadow: "0 12px 28px rgba(47,93,89,0.08)",
  borderRadius: "22px",
};

const roseSurfaceStyle: CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(239,223,227,0.98) 0%, rgba(232,211,217,0.98) 100%)",
  border: "1px solid rgba(114,55,69,0.2)",
  boxShadow: "0 12px 28px rgba(114,55,69,0.08)",
  borderRadius: "22px",
};

const noWrapPillStyle: CSSProperties = {
  whiteSpace: "nowrap",
  flexShrink: 0,
};

function MealSectionEyebrow({
  children,
  tone = "wine",
}: {
  children: React.ReactNode;
  tone?: "wine" | "sage" | "light";
}) {
  const toneStyles =
    tone === "light"
      ? {
          color: "rgba(255,248,241,0.94)",
          backgroundColor: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.16)",
        }
      : tone === "sage"
        ? {
            color: "var(--color-teal)",
            backgroundColor: "rgba(220,235,231,0.92)",
            border: "1px solid rgba(79,129,125,0.24)",
          }
        : {
            color: "var(--color-rose)",
            backgroundColor: "rgba(242,220,225,0.9)",
            border: "1px solid rgba(114,55,69,0.12)",
          };

  return (
    <span
      className="mb-4 inline-flex items-center rounded-full px-3 py-1.5 font-body"
      style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        ...noWrapPillStyle,
        ...toneStyles,
      }}
    >
      {children}
    </span>
  );
}

function createOnboardingDraft(
  profile: MealPlannerProfile | null
): OnboardingDraft {
  return {
    weightInput: profile ? String(profile.weightKg).replace(".", ",") : "",
    goal: profile?.goal ?? "constancia",
    foodStyle: profile?.foodStyle ?? "padrao",
    restrictions: profile?.restrictions ?? [],
  };
}

function formatHistoryDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function getSwapCategoryVisual(category?: ShoppingCategory) {
  switch (category) {
    case "carboidratos":
      return {
        Icon: Wheat,
        color: "var(--color-teal)",
        background: "rgba(211,228,222,0.88)",
      };
    case "proteinas":
      return {
        Icon: Drumstick,
        color: "var(--color-rose)",
        background: "rgba(234,210,216,0.92)",
      };
    case "frutas":
      return {
        Icon: Apple,
        color: "var(--color-teal)",
        background: "rgba(226,238,230,0.9)",
      };
    default:
      return {
        Icon: ArrowRightLeft,
        color: "var(--color-charcoal-light)",
        background: "rgba(244,234,220,0.98)",
      };
  }
}

function parseWeightInput(weightInput: string): number {
  const parsed = Number(weightInput.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function normalizeFavoriteSelections(
  selections: Record<string, string>
): string {
  return Object.entries(selections)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([slotId, optionId]) => `${slotId}:${optionId}`)
    .join("|");
}

function matchesFavoriteComposition(
  favorite: SavedMealComposition,
  candidate: SavedMealComposition
): boolean {
  return (
    favorite.mealKey === candidate.mealKey &&
    favorite.sourceMode === candidate.sourceMode &&
    favorite.variantId === candidate.variantId &&
    normalizeFavoriteSelections(favorite.substitutionSelections) ===
      normalizeFavoriteSelections(candidate.substitutionSelections)
  );
}

function ProfileChip({
  label,
  tone = "paper",
}: {
  label: string;
  tone?: "paper" | "hero";
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-body"
      style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        ...noWrapPillStyle,
        color: tone === "hero" ? "var(--color-charcoal)" : "var(--color-rose)",
        backgroundColor:
          tone === "hero" ? "rgba(255,248,241,0.94)" : "rgba(255,250,243,0.96)",
        border:
          tone === "hero"
            ? "1px solid rgba(255,255,255,0.14)"
            : "1px solid rgba(114,55,69,0.18)",
        boxShadow: "0 8px 18px rgba(37, 29, 24, 0.08)",
      }}
    >
      {label}
    </span>
  );
}

function WizardChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded px-3 py-2 text-left transition-colors"
      style={{
        backgroundColor: active
          ? "var(--color-rose)"
          : "rgba(244,234,220,0.98)",
        border: `1px solid ${
          active ? "var(--color-rose)" : "rgba(95,86,75,0.2)"
        }`,
        color: active ? "#fff9f6" : "var(--color-charcoal)",
        fontSize: "0.82rem",
        fontWeight: active ? 700 : 500,
        minHeight: "44px",
        whiteSpace: "nowrap",
        boxShadow: active
          ? "0 14px 28px rgba(114,55,69,0.18)"
          : "0 8px 18px rgba(52,37,25,0.04)",
      }}
    >
      {children}
    </button>
  );
}

function MealOptionButton({
  active,
  disabled,
  children,
  onClick,
}: {
  active: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full px-3 py-2 font-body transition-colors"
      style={{
        fontSize: "0.74rem",
        fontWeight: 700,
        minHeight: "42px",
        whiteSpace: "nowrap",
        flexShrink: 0,
        backgroundColor: active
          ? "var(--color-charcoal)"
          : "rgba(244,234,220,0.96)",
        color: active ? "#fffaf5" : "var(--color-charcoal)",
        border: `1px solid ${
          active ? "var(--color-charcoal)" : "rgba(95,86,75,0.18)"
        }`,
        boxShadow: active
          ? "0 12px 22px rgba(31,38,40,0.18)"
          : "0 8px 18px rgba(52,37,25,0.04)",
      }}
    >
      {children}
    </button>
  );
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article
      data-meal-surface="elevated"
      className="inner-card"
      style={{
        padding: "1rem 1rem 1.05rem",
        ...elevatedSurfaceStyle,
      }}
    >
      <p
        className="font-body mb-2"
        style={{
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-rose)",
        }}
      >
        {label}
      </p>
      <p
        className="font-display mb-1"
        style={{
          fontSize: "1.45rem",
          color: "var(--color-charcoal)",
          lineHeight: 1.05,
        }}
      >
        {value}
      </p>
      <p
        className="font-body"
        style={{
          fontSize: "0.76rem",
          color: "var(--color-charcoal-light)",
          lineHeight: 1.6,
        }}
      >
        {note}
      </p>
    </article>
  );
}

function MealCard({
  meal,
  disabled,
  completed,
  isFavorited,
  activeModeLabel,
  onToggleCompleted,
  onToggleFavorite,
  onUseBase,
  onUseVariant,
  onSelectSubstitution,
  plannerState,
  profile,
}: {
  meal: MealDefinition;
  disabled: boolean;
  completed: boolean;
  isFavorited: boolean;
  activeModeLabel: string;
  onToggleCompleted: () => void;
  onToggleFavorite: () => void;
  onUseBase: () => void;
  onUseVariant: (variantId: string) => void;
  onSelectSubstitution: (slotId: string, optionId: string | null) => void;
  plannerState: MealPlannerStorage;
  profile: MealPlannerProfile | null;
}) {
  const resolved = getResolvedMealSelection(meal, profile, plannerState.today);
  const activeMode =
    resolved.mode === "variant" ? resolved.activeVariant?.id : "base";
  const selectedSlots =
    plannerState.today.selectedSubstitutionsByMeal[meal.key] ?? {};

  return (
    <article
      data-meal-surface="elevated"
      className="inner-card overflow-hidden"
      style={{
        ...elevatedSurfaceStyle,
        boxShadow: "0 22px 52px rgba(45,33,25,0.12)",
        borderRadius: "26px",
      }}
    >
      <EditorialVisual visual={meal.visual} />

      <div style={{ padding: "1rem 1rem 1.15rem" }}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p
              className="font-display mb-1"
              style={{
                fontSize: "1.15rem",
                color: "var(--color-charcoal)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {meal.label}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.6,
              }}
            >
              {meal.subtitle}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {meal.plannerTags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 font-body"
                  style={{
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    ...noWrapPillStyle,
                    color:
                      tag === "rapida"
                        ? "var(--color-teal)"
                        : "var(--color-rose)",
                    backgroundColor:
                      tag === "rapida"
                        ? "var(--color-teal-muted)"
                        : "var(--color-rose-muted)",
                    border: "1px solid rgba(31,38,40,0.08)",
                  }}
                >
                  {tag === "rapida" ? "Rápida" : "Saciedade"}
                </span>
              ))}
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-1 font-body"
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              ...noWrapPillStyle,
              color: completed ? "white" : "var(--color-teal)",
              backgroundColor: completed
                ? "var(--color-rose)"
                : "var(--color-teal-muted)",
              border: "1px solid rgba(31,38,40,0.08)",
            }}
          >
            {completed ? "Feita" : "Hoje"}
          </span>
        </div>

        <div className="mb-4">
          <p
            className="font-body mb-2"
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-rose)",
            }}
          >
            Sua escolha
          </p>
          <div className="flex flex-wrap gap-2">
            <MealOptionButton
              active={activeMode === "base"}
              disabled={disabled}
              onClick={onUseBase}
            >
              Base
            </MealOptionButton>
            {meal.variants.map(variant => (
              <MealOptionButton
                key={variant.id}
                active={activeMode === variant.id}
                disabled={disabled}
                onClick={() => onUseVariant(variant.id)}
              >
                {variant.label}
              </MealOptionButton>
            ))}
          </div>
        </div>

        {resolved.mode === "base" && meal.substitutions.length > 0 ? (
          <div className="mb-4 space-y-3">
            {meal.substitutions.map(slot => (
              <div key={slot.slotId}>
                <p
                  className="font-body mb-2"
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                  }}
                >
                  Se quiser trocar {slot.from}
                </p>
                <div className="flex flex-wrap gap-2">
                  <MealOptionButton
                    active={!selectedSlots[slot.slotId]}
                    disabled={disabled}
                    onClick={() => onSelectSubstitution(slot.slotId, null)}
                  >
                    Manter original
                  </MealOptionButton>
                  {slot.options.map(option => (
                    <MealOptionButton
                      key={option.id}
                      active={selectedSlots[slot.slotId] === option.id}
                      disabled={disabled}
                      onClick={() =>
                        onSelectSubstitution(slot.slotId, option.id)
                      }
                    >
                      {option.name}
                    </MealOptionButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div
          data-meal-panel="active-choice"
          style={{
            marginTop: "0.2rem",
            paddingTop: "0.95rem",
            borderTop: "1px solid rgba(95,86,75,0.14)",
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <ArrowRightLeft size={14} style={{ color: "var(--color-rose)" }} />
            <p
              className="font-body"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-rose)",
              }}
            >
              O que vale hoje
            </p>
          </div>
          <p
            className="font-body mb-3"
            style={{
              fontSize: "0.8rem",
              color: "var(--color-charcoal)",
              fontWeight: 500,
            }}
          >
            {activeModeLabel}
          </p>
          <div data-meal-list="resolved-items">
            {resolved.items.map((item, index) => (
              <div
                key={`${item.name}-${item.portion}`}
                className="flex items-start justify-between gap-3"
                style={{
                  padding: "0.75rem 0",
                  borderBottom:
                    index === resolved.items.length - 1
                      ? "0"
                      : "1px solid rgba(95,86,75,0.12)",
                }}
              >
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-charcoal)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {item.name}
                </p>
                <p
                  className="font-body text-right"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.5,
                    maxWidth: "42%",
                  }}
                >
                  {item.portion}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onToggleFavorite}
            disabled={disabled}
          >
            <Heart
              size={14}
              fill={isFavorited ? "currentColor" : "none"}
              style={{ color: "var(--color-rose)" }}
            />
            {isFavorited ? "Remover das salvas" : "Salvar esta opção"}
          </Button>
          <Button
            type="button"
            variant={completed ? "outline" : "default"}
            onClick={onToggleCompleted}
            disabled={disabled}
            style={
              completed
                ? undefined
                : {
                    backgroundColor: "var(--color-rose)",
                    color: "white",
                    borderColor: "var(--color-rose)",
                  }
            }
          >
            <CheckCircle2 size={14} />
            {completed ? "Voltar para pendente" : "Marcar como feita"}
          </Button>
          {disabled ? (
            <p
              className="font-body"
              style={{
                fontSize: "0.74rem",
                color: "var(--color-charcoal-light)",
              }}
            >
              Finalize o começo do plano para salvar suas escolhas.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function MealPlanPage() {
  const [plannerState, setPlannerState] = useState(() =>
    readMealPlannerStorage()
  );
  const [draft, setDraft] = useState<OnboardingDraft>(() =>
    createOnboardingDraft(readMealPlannerStorage().profile)
  );
  const [wizardStep, setWizardStep] = useState(0);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(
    () => readMealPlannerStorage().profile === null
  );
  const [showHydrationLearnMore, setShowHydrationLearnMore] = useState(false);
  const [activeSwapMapMealKey, setActiveSwapMapMealKey] =
    useState<MealKey | null>(
      () => getMealsWithSubstitutions(mealPlanData)[0]?.key ?? null
    );

  useSEO({
    title: "Plano Alimentar | Calistenia Feminina",
    description:
      "Planejador alimentar com começo simples, refeições do dia, opções salvas, preparo semanal e lista de compras.",
  });

  useEffect(() => {
    setPlannerState(current => {
      const refreshed = readMealPlannerStorage();
      if (JSON.stringify(current) === JSON.stringify(refreshed)) {
        return current;
      }
      return refreshed;
    });
  }, []);

  useEffect(() => {
    writeMealPlannerStorage(plannerState);
  }, [plannerState]);

  const profile = plannerState.profile;
  const activePlateMethod = getPlateMethodVariant(profile?.foodStyle);
  const currentWeightKg =
    profile?.weightKg ?? parseWeightInput(draft.weightInput);
  const hydrationTargets = calculateHydrationTargets(currentWeightKg);
  const filteredMeals = getFilteredMeals(mealPlanData, plannerState);
  const swapMapMeals = getMealsWithSubstitutions(mealPlanData);
  const activeSwapMeal =
    swapMapMeals.find(meal => meal.key === activeSwapMapMealKey) ??
    swapMapMeals[0] ??
    null;
  const activeSwapSummaryEntries = getActiveSwapSummaryEntries(
    mealPlanData,
    plannerState
  );
  const interactiveSwapGroups = activeSwapMeal
    ? getInteractiveSwapMapGroups(activeSwapMeal, plannerState)
    : [];
  const activeSwapCountForMeal = activeSwapMeal
    ? getActiveSwapCountByMeal(mealPlanData, plannerState, activeSwapMeal.key)
    : 0;
  const shoppingGroups = buildWeeklyShoppingGroups(mealPlanData, plannerState);
  const weeklySummary = getWeeklySummary(plannerState);
  const completionCount = plannerState.today.completedMeals.length;
  const completionPct = calculateCompletionPct(completionCount);
  const waterTargetMl = profile ? hydrationTargets.targetMl : 0;
  const waterPct =
    waterTargetMl > 0
      ? Math.min(
          100,
          Math.round((plannerState.today.waterMl / waterTargetMl) * 100)
        )
      : 0;

  useEffect(() => {
    if (!activeSwapMeal && swapMapMeals[0]) {
      setActiveSwapMapMealKey(swapMapMeals[0].key);
    }
  }, [activeSwapMeal, swapMapMeals]);

  const handleSaveProfile = () => {
    const weightKg = parseWeightInput(draft.weightInput);
    if (!weightKg) return;

    const nextProfile: MealPlannerProfile = {
      weightKg,
      goal: draft.goal,
      foodStyle: draft.foodStyle,
      restrictions: draft.restrictions,
    };

    setPlannerState(current => ({
      ...current,
      profile: nextProfile,
    }));
    setDraft(createOnboardingDraft(nextProfile));
    setIsOnboardingOpen(false);
  };

  const getFavoriteCandidate = (meal: MealDefinition) =>
    createSavedMealComposition(
      meal,
      plannerState,
      new Date("2026-04-10T00:00:00.000Z")
    );

  const isMealFavorited = (meal: MealDefinition) => {
    const candidate = getFavoriteCandidate(meal);
    return plannerState.favorites.some(favorite =>
      matchesFavoriteComposition(favorite, candidate)
    );
  };

  const favoriteMeals = plannerState.favorites
    .map(favorite => ({
      favorite,
      meal:
        mealPlanData.meals.find(meal => meal.key === favorite.mealKey) ?? null,
    }))
    .filter(
      (
        item
      ): item is { favorite: SavedMealComposition; meal: MealDefinition } =>
        item.meal !== null
    );

  const mealPrepCompletionPct = Math.round(
    (plannerState.mealPrep.completedStepIds.length /
      mealPlanData.mealPrepSteps.length) *
      100
  );

  return (
    <Layout>
      <div
        data-meal-theme="editorial"
        style={{
          ...mealPageShellStyle,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <section
          id="alimentacao"
          data-meal-surface="hero"
          className="page-card mb-6 mt-2 overflow-hidden"
          style={heroSectionStyle}
        >
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <MealSectionEyebrow tone="light">Seu plano</MealSectionEyebrow>
              <div
                className="mb-5 overflow-hidden"
                style={{
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 18px 42px rgba(0,0,0,0.16)",
                }}
              >
                <EditorialVisual visual={mealPlanData.heroVisual} />
              </div>
              <h1
                className="font-display mb-3"
                style={{
                  fontSize: "clamp(2.3rem, 5.3vw, 4rem)",
                  color: "#fff9f2",
                  fontWeight: 500,
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  maxWidth: "10ch",
                }}
              >
                {mealPlanData.title}
              </h1>
              <p
                className="font-body mb-5"
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,247,240,0.88)",
                  lineHeight: 1.78,
                  maxWidth: "34rem",
                }}
              >
                {mealPlanData.summary}
              </p>
              <div
                style={{
                  width: "4rem",
                  height: "2px",
                  backgroundColor: "rgba(255,240,227,0.88)",
                  marginBottom: "1.5rem",
                }}
              />
              <div className="flex flex-wrap gap-3">
                <ProfileChip label={mealPlanData.kcalLabel} tone="hero" />
                <ProfileChip label="1 passo por vez" tone="hero" />
                <ProfileChip label="4 refeições + água" tone="hero" />
              </div>
            </div>

            <div
              data-meal-surface="elevated"
              className="inner-card"
              style={{
                padding: "1.15rem",
                ...elevatedSurfaceStyle,
                background:
                  "linear-gradient(180deg, rgba(255,251,246,0.99) 0%, rgba(243,232,217,0.97) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 52px rgba(20,16,13,0.18)",
                borderRadius: "28px",
              }}
            >
              {isOnboardingOpen ? (
                <>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p
                        className="font-body mb-1"
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-rose)",
                        }}
                      >
                        Comece por aqui
                      </p>
                      <p
                        className="font-display"
                        style={{
                          fontSize: "1rem",
                          color: "var(--color-charcoal)",
                          fontWeight: 500,
                        }}
                      >
                        Passo {wizardStep + 1} de 3
                      </p>
                    </div>
                    <Sparkles
                      size={16}
                      style={{ color: "var(--color-teal)" }}
                    />
                  </div>

                  {wizardStep === 0 ? (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="meal-planner-weight"
                          className="font-body mb-2 block"
                          style={{
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-teal)",
                          }}
                        >
                          Seu peso
                        </label>
                        <Input
                          id="meal-planner-weight"
                          inputMode="decimal"
                          placeholder="Ex.: 62"
                          value={draft.weightInput}
                          onChange={event =>
                            setDraft(current => ({
                              ...current,
                              weightInput: event.target.value,
                            }))
                          }
                          style={{
                            backgroundColor: "var(--color-surface-soft)",
                            borderColor: "rgba(47,93,89,0.24)",
                            color: "var(--color-charcoal)",
                          }}
                        />
                      </div>

                      <div>
                        <p
                          className="font-body mb-2"
                          style={{
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-teal)",
                          }}
                        >
                          Objetivo
                        </p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {(
                            Object.keys(
                              mealPlannerGoalLabels
                            ) as MealPlannerGoal[]
                          ).map(goal => (
                            <WizardChoiceButton
                              key={goal}
                              active={draft.goal === goal}
                              onClick={() =>
                                setDraft(current => ({
                                  ...current,
                                  goal,
                                }))
                              }
                            >
                              {mealPlannerGoalLabels[goal]}
                            </WizardChoiceButton>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {wizardStep === 1 ? (
                    <div className="space-y-4">
                      <div>
                        <p
                          className="font-body mb-2"
                          style={{
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-teal)",
                          }}
                        >
                          Estilo alimentar
                        </p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {(
                            Object.keys(
                              mealPlannerFoodStyleLabels
                            ) as MealPlannerFoodStyle[]
                          ).map(foodStyle => (
                            <WizardChoiceButton
                              key={foodStyle}
                              active={draft.foodStyle === foodStyle}
                              onClick={() =>
                                setDraft(current => ({
                                  ...current,
                                  foodStyle,
                                }))
                              }
                            >
                              {mealPlannerFoodStyleLabels[foodStyle]}
                            </WizardChoiceButton>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p
                          className="font-body mb-2"
                          style={{
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-teal)",
                          }}
                        >
                          Se precisar, use estas adaptações
                        </p>
                        <div className="space-y-2">
                          {(
                            Object.keys(
                              mealPlannerRestrictionLabels
                            ) as MealPlannerRestrictionKey[]
                          ).map(restriction => {
                            const checked =
                              draft.restrictions.includes(restriction);

                            return (
                              <label
                                key={restriction}
                                className="flex items-center gap-3 rounded px-3 py-3"
                                style={{
                                  ...softSurfaceStyle,
                                  padding: "0.75rem",
                                  borderRadius: "16px",
                                }}
                              >
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={nextChecked =>
                                    setDraft(current => ({
                                      ...current,
                                      restrictions: nextChecked
                                        ? [...current.restrictions, restriction]
                                        : current.restrictions.filter(
                                            item => item !== restriction
                                          ),
                                    }))
                                  }
                                />
                                <span
                                  className="font-body"
                                  style={{
                                    fontSize: "0.82rem",
                                    color: "var(--color-charcoal)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {mealPlannerRestrictionLabels[restriction]}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {wizardStep === 2 ? (
                    <div className="space-y-4">
                      <div
                        data-meal-surface="soft"
                        className="rounded px-4 py-4"
                        style={{
                          ...softSurfaceStyle,
                          padding: "1rem",
                          borderRadius: "18px",
                        }}
                      >
                        <p
                          className="font-body mb-2"
                          style={{
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-rose)",
                          }}
                        >
                          Seu plano, do seu jeito
                        </p>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <ProfileChip
                            label={`${parseWeightInput(draft.weightInput) || 0} kg`}
                          />
                          <ProfileChip
                            label={mealPlannerGoalLabels[draft.goal]}
                          />
                          <ProfileChip
                            label={mealPlannerFoodStyleLabels[draft.foodStyle]}
                          />
                        </div>
                        <p
                          className="font-body mb-3"
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-warm-gray)",
                            lineHeight: 1.65,
                          }}
                        >
                          {goalCopy[draft.goal]}
                        </p>
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--color-charcoal-light)",
                            lineHeight: 1.65,
                          }}
                        >
                          Meta mínima:{" "}
                          <strong>
                            {formatMlToLiters(hydrationTargets.minimumMl)}
                          </strong>{" "}
                          · Meta ideal:{" "}
                          <strong>
                            {formatMlToLiters(hydrationTargets.targetMl)}
                          </strong>
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setWizardStep(step => Math.max(0, step - 1))
                        }
                        disabled={wizardStep === 0}
                      >
                        Voltar
                      </Button>
                      {wizardStep < 2 ? (
                        <Button
                          type="button"
                          onClick={() =>
                            setWizardStep(step => Math.min(2, step + 1))
                          }
                          disabled={
                            wizardStep === 0 &&
                            !parseWeightInput(draft.weightInput)
                          }
                          style={{
                            backgroundColor: "var(--color-rose)",
                            color: "white",
                          }}
                        >
                          Próximo
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleSaveProfile}
                          disabled={!parseWeightInput(draft.weightInput)}
                          style={{
                            backgroundColor: "var(--color-rose)",
                            color: "white",
                          }}
                        >
                          Começar meu plano
                        </Button>
                      )}
                    </div>
                    {profile ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsOnboardingOpen(false)}
                      >
                        Cancelar edição
                      </Button>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p
                        className="font-body mb-1"
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-rose)",
                        }}
                      >
                        Seu perfil
                      </p>
                      <p
                        className="font-display"
                        style={{
                          fontSize: "1rem",
                          color: "var(--color-charcoal)",
                          fontWeight: 500,
                        }}
                      >
                        Seu plano está pronto
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDraft(createOnboardingDraft(profile));
                        setWizardStep(0);
                        setIsOnboardingOpen(true);
                      }}
                    >
                      <PencilLine size={14} />
                      Editar perfil
                    </Button>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <ProfileChip label={`${profile?.weightKg ?? 0} kg`} />
                    <ProfileChip
                      label={profile ? mealPlannerGoalLabels[profile.goal] : ""}
                    />
                    <ProfileChip
                      label={
                        profile
                          ? mealPlannerFoodStyleLabels[profile.foodStyle]
                          : ""
                      }
                    />
                    {profile?.restrictions.map(restriction => (
                      <ProfileChip
                        key={restriction}
                        label={mealPlannerRestrictionLabels[restriction]}
                      />
                    ))}
                  </div>

                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.7,
                    }}
                  >
                    {profile ? goalCopy[profile.goal] : ""}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow>Como usar</MealSectionEyebrow>
          <h2 className="font-display mb-2" style={sectionTitleStyle}>
            Como usar seu plano
          </h2>
          <p
            className="font-body mb-6"
            style={{
              ...sectionLeadStyle,
              maxWidth: "38rem",
            }}
          >
            O foco é começar sem pressão: primeiro o essencial do dia, depois os
            atalhos que ajudam a repetir o que funciona.
          </p>

          <div
            className="grid gap-3 md:grid-cols-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(210px, 100%), 1fr))",
            }}
          >
            {planUseSteps.map(item => (
              <article
                data-meal-surface="soft"
                key={item.step}
                className="inner-card h-full"
                style={{
                  padding: "1rem",
                  ...softSurfaceStyle,
                }}
              >
                <div
                  className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full font-body"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--color-rose)",
                    backgroundColor: "var(--color-rose-muted)",
                    border: "1px solid var(--color-rose-light)",
                  }}
                >
                  {item.step}
                </div>
                <p
                  className="font-body mb-2"
                  style={{
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow tone="sage">
            Quando quiser adiantar
          </MealSectionEyebrow>
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="mb-4 overflow-hidden rounded border border-[rgba(181,169,154,0.4)]">
                <EditorialVisual
                  visual={mealPlanData.sectionVisuals.mealPrep}
                />
              </div>
              <h2 className="font-display mb-2" style={sectionTitleStyle}>
                Prepare sua semana
              </h2>
              <p
                className="font-body"
                style={{
                  ...sectionLeadStyle,
                  maxWidth: "34rem",
                }}
              >
                Use este checklist quando quiser deixar a semana mais fácil. O
                plano já funciona sem esta etapa.
              </p>
            </div>

            <div
              data-meal-surface="soft"
              className="inner-card"
              style={{
                padding: "1rem",
                ...softSurfaceStyle,
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    style={{ color: "var(--color-teal)" }}
                  />
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-teal)",
                    }}
                  >
                    Passos da semana
                  </p>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 font-body"
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    ...noWrapPillStyle,
                    color: "var(--color-teal)",
                    backgroundColor: "var(--color-teal-muted)",
                  }}
                >
                  {mealPrepCompletionPct}%
                </span>
              </div>
              <Progress
                value={mealPrepCompletionPct}
                className="mb-4 h-2.5 bg-[rgba(91,138,139,0.18)] [&_[data-slot=progress-indicator]]:bg-[var(--color-teal)]"
              />
              <div className="space-y-3">
                {mealPlanData.mealPrepSteps.map(step => {
                  const checked =
                    plannerState.mealPrep.completedStepIds.includes(step.id);

                  return (
                    <label
                      key={step.id}
                      className="flex items-start gap-3 rounded px-3 py-3"
                      style={{
                        ...(checked ? tealSurfaceStyle : softSurfaceStyle),
                        padding: "0.8rem",
                        borderRadius: "18px",
                      }}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() =>
                          setPlannerState(current => ({
                            ...current,
                            mealPrep: {
                              ...current.mealPrep,
                              completedStepIds: checked
                                ? current.mealPrep.completedStepIds.filter(
                                    currentStep => currentStep !== step.id
                                  )
                                : [
                                    ...current.mealPrep.completedStepIds,
                                    step.id,
                                  ],
                            },
                          }))
                        }
                        aria-label={step.title}
                      />
                      <span className="block">
                        <span
                          className="font-body block"
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "var(--color-charcoal)",
                          }}
                        >
                          {step.title}
                        </span>
                        <span
                          className="font-body block"
                          style={{
                            fontSize: "0.76rem",
                            color: "var(--color-warm-gray)",
                            lineHeight: 1.65,
                            marginTop: "0.2rem",
                          }}
                        >
                          {step.description}
                        </span>
                        <span
                          className="font-body block"
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--color-taupe)",
                            lineHeight: 1.55,
                            marginTop: "0.35rem",
                          }}
                        >
                          {step.suggestedItems.join(" · ")}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow>Quando quiser repetir</MealSectionEyebrow>
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="mb-4 overflow-hidden rounded border border-[rgba(181,169,154,0.4)]">
                <EditorialVisual
                  visual={mealPlanData.sectionVisuals.favorites}
                />
              </div>
              <h2 className="font-display mb-2" style={sectionTitleStyle}>
                Opções salvas
              </h2>
              <p
                className="font-body"
                style={{
                  ...sectionLeadStyle,
                  maxWidth: "34rem",
                }}
              >
                Guarde as escolhas que funcionam bem para não decidir tudo de
                novo.
              </p>
            </div>

            <div className="space-y-4">
              {favoriteMeals.length === 0 ? (
                <div
                  data-meal-surface="soft"
                  className="inner-card"
                  style={{
                    padding: "1rem 1.15rem",
                    ...softSurfaceStyle,
                  }}
                >
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.7,
                    }}
                  >
                    Quando uma escolha funcionar bem, toque em salvar esta opção
                    na própria refeição.
                  </p>
                </div>
              ) : (
                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
                  }}
                >
                  {favoriteMeals.map(({ favorite, meal }) => (
                    <article
                      data-meal-surface="elevated"
                      key={favorite.id}
                      className="inner-card"
                      style={{
                        padding: "1rem",
                        ...elevatedSurfaceStyle,
                      }}
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Star
                            size={15}
                            style={{ color: "var(--color-rose)" }}
                          />
                          <p
                            className="font-body"
                            style={{
                              fontSize: "0.76rem",
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "var(--color-rose)",
                            }}
                          >
                            {meal.label}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setPlannerState(current =>
                              toggleFavoriteComposition(current, favorite)
                            )
                          }
                        >
                          Tirar
                        </Button>
                      </div>
                      <p
                        className="font-display mb-2"
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--color-charcoal)",
                          fontWeight: 500,
                        }}
                      >
                        {favorite.label}
                      </p>
                      <p
                        className="font-body mb-4"
                        style={{
                          fontSize: "0.76rem",
                          color: "var(--color-warm-gray)",
                          lineHeight: 1.6,
                        }}
                      >
                        Aplica essa escolha na refeição de hoje.
                      </p>
                      <Button
                        type="button"
                        onClick={() =>
                          setPlannerState(current => ({
                            ...current,
                            today: {
                              ...current.today,
                              activeVariantByMeal: {
                                ...current.today.activeVariantByMeal,
                                [favorite.mealKey]:
                                  favorite.sourceMode === "variant" &&
                                  favorite.variantId
                                    ? favorite.variantId
                                    : "base",
                              },
                              selectedSubstitutionsByMeal: {
                                ...current.today.selectedSubstitutionsByMeal,
                                [favorite.mealKey]:
                                  favorite.sourceMode === "base"
                                    ? favorite.substitutionSelections
                                    : {},
                              },
                            },
                          }))
                        }
                        style={{
                          backgroundColor: "var(--color-rose)",
                          color: "white",
                          borderColor: "var(--color-rose)",
                        }}
                      >
                        Usar esta opção
                      </Button>
                    </article>
                  ))}
                </div>
              )}

              <div
                data-meal-surface="soft"
                className="inner-card"
                style={{
                  padding: "1rem",
                  ...softSurfaceStyle,
                }}
              >
                <div className="mb-4 overflow-hidden rounded border border-[rgba(181,169,154,0.35)]">
                  <EditorialVisual
                    visual={mealPlanData.sectionVisuals.filters}
                  />
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <SlidersHorizontal
                    size={15}
                    style={{ color: "var(--color-teal)" }}
                  />
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-teal)",
                    }}
                  >
                    Atalhos
                  </p>
                </div>
                <p
                  className="font-body mb-3"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.65,
                  }}
                >
                  Use os atalhos quando quiser enxugar a tela e rever só o que
                  faz sentido agora.
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    Object.keys(mealPlannerFilterLabels) as MealFilterKey[]
                  ).map(filterKey => (
                    <MealOptionButton
                      key={filterKey}
                      active={plannerState.ui.activeMealFilter === filterKey}
                      onClick={() =>
                        setPlannerState(current => ({
                          ...current,
                          ui: {
                            ...current.ui,
                            activeMealFilter: filterKey,
                          },
                        }))
                      }
                    >
                      {mealPlannerFilterLabels[filterKey]}
                    </MealOptionButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow tone="sage">
            Como montar o prato
          </MealSectionEyebrow>
          <h2 className="font-display mb-2" style={sectionTitleStyle}>
            Como montar o prato
          </h2>
          <p
            className="font-body mb-6"
            style={{
              ...sectionLeadStyle,
              maxWidth: "34rem",
            }}
          >
            {activePlateMethod.description}
          </p>
          <div
            className="grid gap-4 md:grid-cols-3"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            }}
          >
            {activePlateMethod.segments.map(segment => (
              <article
                data-meal-surface={
                  segment.accent === "teal"
                    ? "accent-teal"
                    : segment.accent === "rose"
                      ? "accent-rose"
                      : "soft"
                }
                key={segment.title}
                className="inner-card h-full"
                style={{
                  padding: "1.15rem",
                  ...(segment.accent === "teal"
                    ? tealSurfaceStyle
                    : segment.accent === "rose"
                      ? roseSurfaceStyle
                      : softSurfaceStyle),
                }}
              >
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
                  style={{
                    backgroundColor:
                      segment.accent === "teal"
                        ? "var(--color-teal-muted)"
                        : segment.accent === "rose"
                          ? "var(--color-rose-muted)"
                          : "var(--color-ivory-dark)",
                    border: `1px solid ${
                      segment.accent === "teal"
                        ? "var(--color-teal-light)"
                        : segment.accent === "rose"
                          ? "var(--color-rose-light)"
                          : "var(--color-taupe-light)"
                    }`,
                    ...noWrapPillStyle,
                  }}
                >
                  <span
                    className="font-body"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color:
                        segment.accent === "teal"
                          ? "var(--color-teal)"
                          : segment.accent === "rose"
                            ? "var(--color-rose)"
                            : "var(--color-taupe)",
                    }}
                  >
                    {segment.percentage}
                  </span>
                </div>
                <p
                  className="font-body mb-2"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--color-charcoal)",
                  }}
                >
                  {segment.title}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.7,
                  }}
                >
                  {segment.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow>Hoje</MealSectionEyebrow>
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <h2 className="font-display" style={sectionTitleStyle}>
                Hoje
              </h2>
              <p
                className="font-body"
                style={{
                  ...sectionLeadStyle,
                  maxWidth: "34rem",
                }}
              >
                Veja só o que importa agora: refeições feitas, água do dia e a
                escolha atual de cada refeição.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <StatCard
                  label="Refeições feitas"
                  value={`${completionCount} de ${mealPlanData.meals.length} refeições feitas`}
                  note="O que você concluir hoje entra no histórico automaticamente no próximo dia."
                />
                <StatCard
                  label="Água"
                  value={
                    profile
                      ? `${formatMlToLiters(plannerState.today.waterMl)} / ${formatMlToLiters(
                          waterTargetMl
                        )}`
                      : formatMlToLiters(plannerState.today.waterMl)
                  }
                  note={
                    profile
                      ? "Meta ideal calculada pelo peso que você salvou no perfil."
                      : "Finalize o começo do plano para personalizar a meta hídrica."
                  }
                />
              </div>

              <div
                data-meal-surface="accent-teal"
                className="inner-card"
                style={{
                  padding: "1rem",
                  ...tealSurfaceStyle,
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Droplets size={15} style={{ color: "var(--color-teal)" }} />
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-teal)",
                    }}
                  >
                    Hidratação
                  </p>
                </div>
                <Progress
                  value={waterPct}
                  className="mb-3 h-2.5 bg-[rgba(91,138,139,0.18)] [&_[data-slot=progress-indicator]]:bg-[var(--color-teal)]"
                />
                <div className="mb-3 flex flex-wrap gap-2">
                  {[250, 500, 750].map(amount => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPlannerState(current => ({
                          ...current,
                          today: {
                            ...current.today,
                            waterMl: current.today.waterMl + amount,
                          },
                        }))
                      }
                      disabled={!profile}
                    >
                      +{amount} ml
                    </Button>
                  ))}
                </div>
                <label
                  htmlFor="water-manual-input"
                  className="font-body mb-2 block"
                  style={{
                    fontSize: "0.74rem",
                    color: "var(--color-charcoal-light)",
                  }}
                >
                  Ajuste manual em ml
                </label>
                <Input
                  id="water-manual-input"
                  inputMode="numeric"
                  value={String(plannerState.today.waterMl || "")}
                  onChange={event => {
                    const nextValue = Number(event.target.value);
                    setPlannerState(current => ({
                      ...current,
                      today: {
                        ...current.today,
                        waterMl:
                          Number.isFinite(nextValue) && nextValue > 0
                            ? Math.round(nextValue)
                            : 0,
                      },
                    }));
                  }}
                  disabled={!profile}
                  style={{
                    backgroundColor: "rgba(255,250,243,0.96)",
                    borderColor: "rgba(47,93,89,0.26)",
                    color: "var(--color-charcoal)",
                  }}
                />
                <div className="mt-4 border-t border-[rgba(47,93,89,0.18)] pt-3">
                  <button
                    type="button"
                    className="font-body"
                    onClick={() =>
                      setShowHydrationLearnMore(current => !current)
                    }
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-teal)",
                      fontWeight: 700,
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    {showHydrationLearnMore
                      ? "Ocultar detalhes de hidratação"
                      : mealPlanData.hydration.learnMoreTitle}
                  </button>
                  {showHydrationLearnMore ? (
                    <ul
                      className="mt-2 space-y-2"
                      style={{
                        paddingLeft: "1rem",
                      }}
                    >
                      {mealPlanData.hydration.learnMorePoints.map(point => (
                        <li
                          key={point}
                          className="font-body"
                          style={{
                            fontSize: "0.76rem",
                            color: "var(--color-charcoal-light)",
                            lineHeight: 1.6,
                          }}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>

            <div
              data-meal-surface="elevated"
              className="inner-card"
              style={{
                padding: "1rem 1rem 1.15rem",
                ...elevatedSurfaceStyle,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <ClipboardList
                  size={15}
                  style={{ color: "var(--color-rose)" }}
                />
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-rose)",
                  }}
                >
                  Hoje
                </p>
              </div>
              <p
                className="font-display mb-2"
                style={{
                  fontSize: "1.3rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                {completionCount} de {mealPlanData.meals.length} refeições
                feitas
              </p>
              <p
                className="font-body mb-4"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-warm-gray)",
                  lineHeight: 1.65,
                }}
              >
                O progresso do dia entra no histórico automaticamente quando a
                data muda.
              </p>
              <Progress
                value={completionPct}
                className="mb-4 h-2.5 bg-[rgba(139,74,82,0.16)] [&_[data-slot=progress-indicator]]:bg-[var(--color-rose)]"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {mealPlanData.meals.map(meal => {
                  const resolved = getResolvedMealSelection(
                    meal,
                    profile,
                    plannerState.today
                  );

                  return (
                    <div
                      data-meal-surface="soft"
                      key={meal.key}
                      className="rounded px-3 py-3"
                      style={{
                        ...softSurfaceStyle,
                        padding: "0.75rem",
                        borderRadius: "16px",
                      }}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "var(--color-charcoal)",
                          }}
                        >
                          {meal.label}
                        </p>
                        {plannerState.today.completedMeals.includes(
                          meal.key
                        ) ? (
                          <CheckCircle2
                            size={15}
                            style={{ color: "var(--color-rose)" }}
                          />
                        ) : null}
                      </div>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.74rem",
                          color: "var(--color-warm-gray)",
                          lineHeight: 1.55,
                        }}
                      >
                        {resolved.mode === "variant" && resolved.activeVariant
                          ? resolved.activeVariant.label
                          : "Base com suas trocas"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow>Escolha sua refeição</MealSectionEyebrow>
          <h2 className="font-display mb-2" style={sectionTitleStyle}>
            Escolha sua refeição
          </h2>
          <p
            className="font-body mb-6"
            style={{
              ...sectionLeadStyle,
              maxWidth: "38rem",
            }}
          >
            Escolha a base ou uma opção pronta, faça trocas simples e marque
            quando terminar.
          </p>

          {filteredMeals.length === 0 ? (
            <div
              data-meal-surface="soft"
              className="inner-card"
              style={{
                padding: "1rem 1.15rem",
                ...softSurfaceStyle,
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-warm-gray)",
                  lineHeight: 1.7,
                }}
              >
                Nenhuma refeição apareceu com esse atalho. Troque o atalho ou
                salve uma opção para ver algo aqui.
              </p>
            </div>
          ) : (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(310px, 100%), 1fr))",
              }}
            >
              {filteredMeals.map(meal => {
                const favoriteCandidate = getFavoriteCandidate(meal);
                const completed = plannerState.today.completedMeals.includes(
                  meal.key
                );
                const resolved = getResolvedMealSelection(
                  meal,
                  plannerState.profile,
                  plannerState.today
                );
                const activeModeLabel =
                  resolved.mode === "variant" && resolved.activeVariant
                    ? resolved.activeVariant.label
                    : "Base do plano com as trocas que você escolheu";

                return (
                  <MealCard
                    key={meal.key}
                    meal={meal}
                    plannerState={plannerState}
                    profile={plannerState.profile}
                    disabled={!plannerState.profile}
                    completed={completed}
                    isFavorited={isMealFavorited(meal)}
                    activeModeLabel={activeModeLabel}
                    onToggleFavorite={() =>
                      setPlannerState(current =>
                        toggleFavoriteComposition(current, favoriteCandidate)
                      )
                    }
                    onToggleCompleted={() =>
                      setPlannerState(current => ({
                        ...current,
                        today: {
                          ...current.today,
                          completedMeals: current.today.completedMeals.includes(
                            meal.key
                          )
                            ? current.today.completedMeals.filter(
                                currentMeal => currentMeal !== meal.key
                              )
                            : [...current.today.completedMeals, meal.key],
                        },
                      }))
                    }
                    onUseBase={() =>
                      setPlannerState(current => ({
                        ...current,
                        today: {
                          ...current.today,
                          activeVariantByMeal: {
                            ...current.today.activeVariantByMeal,
                            [meal.key]: "base",
                          },
                        },
                      }))
                    }
                    onUseVariant={variantId =>
                      setPlannerState(current => ({
                        ...current,
                        today: {
                          ...current.today,
                          activeVariantByMeal: {
                            ...current.today.activeVariantByMeal,
                            [meal.key]: variantId,
                          },
                        },
                      }))
                    }
                    onSelectSubstitution={(slotId, optionId) =>
                      setPlannerState(current =>
                        applyMealSubstitutionSelection(
                          current,
                          meal.key,
                          slotId,
                          optionId
                        )
                      )
                    }
                  />
                );
              })}
            </div>
          )}
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-6"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow tone="sage">Seu ritmo</MealSectionEyebrow>
          <div className="mb-5 overflow-hidden rounded border border-[rgba(181,169,154,0.4)]">
            <EditorialVisual
              visual={mealPlanData.sectionVisuals.weeklySummary}
            />
          </div>
          <h2 className="font-display mb-2" style={sectionTitleStyle}>
            Seu ritmo na semana
          </h2>
          <p
            className="font-body mb-6"
            style={{
              ...sectionLeadStyle,
              maxWidth: "34rem",
            }}
          >
            Um resumo leve do que foi acontecendo, sem pressão.
          </p>

          <div
            className="mb-5 grid gap-3 md:grid-cols-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            }}
          >
            <StatCard
              label="Média"
              value={`${weeklySummary.averageCompletionPct}%`}
              note="Média do que você conseguiu fazer entre hoje e os últimos dias salvos."
            />
            <StatCard
              label="Água total"
              value={formatMlToLiters(weeklySummary.totalWaterMl)}
              note="Soma de água registrada no período visível."
            />
            <StatCard
              label="Sequência"
              value={`${weeklySummary.streakDays} dias`}
              note="Dias seguidos com algum progresso alimentar registrado."
            />
            <StatCard
              label="Melhor dia"
              value={`${weeklySummary.bestDayCompletionPct}%`}
              note="Pico de aderência no recorte semanal atual."
            />
          </div>

          {plannerState.history.length === 0 ? (
            <div
              data-meal-surface="soft"
              className="inner-card"
              style={{
                padding: "1rem 1.15rem",
                ...softSurfaceStyle,
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-warm-gray)",
                  lineHeight: 1.7,
                }}
              >
                Quando o dia virar, o app guarda um resumo simples com refeições
                feitas e água consumida.
              </p>
            </div>
          ) : (
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
              }}
            >
              {plannerState.history.map(entry => (
                <article
                  data-meal-surface="soft"
                  key={entry.dateKey}
                  className="inner-card"
                  style={{
                    padding: "1rem",
                    ...softSurfaceStyle,
                  }}
                >
                  <p
                    className="font-body mb-2"
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-rose)",
                    }}
                  >
                    {formatHistoryDate(entry.dateKey)}
                  </p>
                  <p
                    className="font-display mb-2"
                    style={{
                      fontSize: "1.35rem",
                      color: "var(--color-charcoal)",
                      lineHeight: 1.05,
                    }}
                  >
                    {entry.completionPct}%
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.65,
                    }}
                  >
                    {entry.completedMealCount} refeições ·{" "}
                    {formatMlToLiters(entry.waterMl)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-8"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow tone="sage">Mapa de trocas</MealSectionEyebrow>
          <h2 className="font-display mb-2" style={sectionTitleStyle}>
            Mapa de trocas
          </h2>
          <p
            className="font-body mb-6"
            style={{
              ...sectionLeadStyle,
              maxWidth: "40rem",
            }}
          >
            Escolha a refeição que você quer ajustar. O clique aqui cai no mesmo
            lugar usado em <strong>Se quiser trocar</strong> e já influencia
            <strong> O que comprar</strong>.
          </p>

          <div
            data-meal-surface="accent-teal"
            className="mb-4 rounded px-4 py-4"
            style={{
              ...tealSurfaceStyle,
              borderRadius: "20px",
              borderLeft: "4px solid var(--color-teal)",
            }}
          >
            <p
              className="font-body mb-1"
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-teal)",
              }}
            >
              Aplicável agora
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.7,
              }}
            >
              As escolhas desta faixa mudam a refeição selecionada e entram na
              lógica de compra da semana.
            </p>
          </div>

          <div
            data-meal-surface="soft"
            className="mb-5 rounded px-4 py-4"
            style={{
              ...softSurfaceStyle,
              borderRadius: "20px",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Star size={15} style={{ color: "var(--color-rose)" }} />
              <p
                className="font-body"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-rose)",
                }}
              >
                Trocas ativas agora
              </p>
            </div>
            {activeSwapSummaryEntries.length === 0 ? (
              <p
                className="font-body"
                style={{
                  fontSize: "0.82rem",
                  color: "var(--color-charcoal-light)",
                  lineHeight: 1.7,
                }}
              >
                Nenhuma troca ativa por enquanto. Quando você escolher uma
                troca, ela aparece aqui e a lista da semana acompanha.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {activeSwapSummaryEntries.map(entry => (
                  <div
                    key={`${entry.mealKey}-${entry.slotId}`}
                    className="rounded px-3 py-3"
                    style={{
                      backgroundColor: "rgba(255,250,243,0.9)",
                      border: "1px solid rgba(95,86,75,0.12)",
                      borderRadius: "16px",
                    }}
                  >
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-teal)",
                        ...noWrapPillStyle,
                      }}
                    >
                      {entry.mealLabel}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-charcoal)",
                        lineHeight: 1.6,
                        marginTop: "0.35rem",
                      }}
                    >
                      {entry.from} → {entry.selectedOptionName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {swapMapMeals.map(meal => {
              const activeCount = getActiveSwapCountByMeal(
                mealPlanData,
                plannerState,
                meal.key
              );

              return (
                <MealOptionButton
                  key={meal.key}
                  active={activeSwapMeal?.key === meal.key}
                  onClick={() => setActiveSwapMapMealKey(meal.key)}
                >
                  {activeCount > 0
                    ? `${meal.label} ${activeCount}`
                    : meal.label}
                </MealOptionButton>
              );
            })}
          </div>

          <div
            data-meal-surface="soft"
            className="mb-6 rounded px-4 py-4"
            style={{
              ...softSurfaceStyle,
              borderRadius: "18px",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.7,
              }}
            >
              {activeSwapMeal
                ? `Você está ajustando ${activeSwapMeal.label.toLowerCase()}. Se a refeição estiver em uma variação, tocar numa troca aqui traz essa refeição de volta para a base e mantém a lista da semana coerente.`
                : "Escolha uma refeição para ver trocas rápidas."}
            </p>
            {activeSwapMeal && activeSwapCountForMeal > 0 ? (
              <div className="mt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPlannerState(current =>
                      clearMealSubstitutionSelections(
                        current,
                        activeSwapMeal.key
                      )
                    )
                  }
                >
                  Limpar trocas desta refeição
                </Button>
              </div>
            ) : null}
          </div>

          {activeSwapMeal ? (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              }}
            >
              {interactiveSwapGroups.map(group => (
                <article
                  data-meal-surface="elevated"
                  key={group.slotId}
                  className="inner-card h-full"
                  style={{
                    ...elevatedSurfaceStyle,
                    padding: "1rem",
                  }}
                >
                  {(() => {
                    const activeOption =
                      group.options.find(option => option.active) ?? null;
                    const category =
                      activeOption?.category ?? group.options[0]?.category;
                    const visual = getSwapCategoryVisual(category);
                    const Icon = visual.Icon;

                    return (
                      <>
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: visual.background,
                                color: visual.color,
                                flexShrink: 0,
                              }}
                            >
                              <Icon size={16} />
                            </span>
                            <div>
                              <p
                                className="font-body"
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: visual.color,
                                }}
                              >
                                {group.title}
                              </p>
                              <p
                                className="font-body"
                                style={{
                                  fontSize: "0.78rem",
                                  color: "var(--color-charcoal-light)",
                                  lineHeight: 1.6,
                                  marginTop: "0.25rem",
                                }}
                              >
                                Agora:{" "}
                                {activeOption ? activeOption.name : "Original"}
                              </p>
                            </div>
                          </div>
                          {activeOption ? (
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-body"
                              style={{
                                ...noWrapPillStyle,
                                fontSize: "0.66rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--color-rose)",
                                backgroundColor: "var(--color-rose-muted)",
                                border: "1px solid rgba(114,55,69,0.14)",
                              }}
                            >
                              <CheckCircle2 size={12} />
                              Ativa
                            </span>
                          ) : null}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <MealOptionButton
                            active={!group.selectedOptionId}
                            disabled={!plannerState.profile}
                            onClick={() =>
                              setPlannerState(current =>
                                applyMealSubstitutionSelection(
                                  current,
                                  activeSwapMeal.key,
                                  group.slotId,
                                  null
                                )
                              )
                            }
                          >
                            Manter original
                          </MealOptionButton>
                          {group.options.map(option => (
                            <button
                              key={option.id}
                              type="button"
                              disabled={!plannerState.profile}
                              onClick={() =>
                                setPlannerState(current =>
                                  applyMealSubstitutionSelection(
                                    current,
                                    activeSwapMeal.key,
                                    group.slotId,
                                    option.id
                                  )
                                )
                              }
                              className="rounded-[16px] border px-3 py-2 text-left transition-all"
                              style={{
                                minWidth: "10rem",
                                borderColor: option.active
                                  ? "rgba(114,55,69,0.4)"
                                  : "rgba(95,86,75,0.16)",
                                backgroundColor: option.active
                                  ? "var(--color-rose-muted)"
                                  : "var(--color-surface-soft)",
                                color: "var(--color-charcoal)",
                                opacity: plannerState.profile ? 1 : 0.6,
                                boxShadow: option.active
                                  ? "0 12px 24px rgba(114,55,69,0.14)"
                                  : "0 8px 18px rgba(52,37,25,0.04)",
                              }}
                            >
                              <span className="mb-1 flex items-center justify-between gap-2">
                                <span
                                  className="font-body block"
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {option.name}
                                </span>
                                {option.active ? (
                                  <CheckCircle2
                                    size={14}
                                    style={{ color: "var(--color-rose)" }}
                                  />
                                ) : null}
                              </span>
                              <span
                                className="font-body block"
                                style={{
                                  fontSize: "0.72rem",
                                  color: "var(--color-warm-gray)",
                                  marginTop: "0.2rem",
                                }}
                              >
                                {option.portion}
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </article>
              ))}
            </div>
          ) : null}

          <div
            data-meal-surface="accent-rose"
            className="mt-6 rounded px-4 py-4"
            style={{
              ...roseSurfaceStyle,
              borderRadius: "20px",
              borderLeft: "4px solid var(--color-rose)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <ClipboardList size={15} style={{ color: "var(--color-rose)" }} />
              <p
                className="font-body"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-rose)",
                }}
              >
                Consulta ampliada
              </p>
            </div>
            <p
              className="font-body"
              style={{
                fontSize: "0.82rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.7,
              }}
            >
              Lista completa para consulta. Aqui ficam as referências amplas do
              plano original para repertório, mesmo quando a troca rápida do
              topo estiver limitada à refeição escolhida.
            </p>
          </div>

          <div
            className="mt-4 grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            }}
          >
            {mealPlanData.swapGroups.map(group => (
              <article
                data-meal-surface="elevated"
                key={`reference-${group.key}`}
                className="inner-card h-full"
                style={{
                  ...elevatedSurfaceStyle,
                  padding: "1rem",
                }}
              >
                <p
                  className="font-body mb-2"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-rose)",
                  }}
                >
                  {group.title}
                </p>
                <p
                  className="font-body mb-3"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {group.description}
                </p>
                <div className="space-y-2">
                  {group.items.map(item => (
                    <div
                      data-meal-surface="soft"
                      key={`reference-${group.key}-${item.shoppingKey ?? item.name}`}
                      className="rounded px-3 py-2"
                      style={{
                        ...softSurfaceStyle,
                        borderRadius: "14px",
                        padding: "0.6rem 0.75rem",
                      }}
                    >
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--color-charcoal)",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--color-warm-gray)",
                          marginTop: "0.2rem",
                        }}
                      >
                        {item.portion}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          data-meal-section="flat"
          className="page-card mb-8"
          style={sectionCardStyle}
        >
          <MealSectionEyebrow>Lista da semana</MealSectionEyebrow>
          <div className="mb-5 overflow-hidden rounded border border-[rgba(181,169,154,0.4)]">
            <EditorialVisual visual={mealPlanData.sectionVisuals.shopping} />
          </div>
          <h2 className="font-display mb-2" style={sectionTitleStyle}>
            O que comprar
          </h2>
          <p
            className="font-body mb-6"
            style={{
              ...sectionLeadStyle,
              maxWidth: "40rem",
            }}
          >
            A lista acompanha o que está valendo hoje e já organiza a semana de
            forma aproximada.
          </p>

          <div
            className="mb-5 grid gap-3 md:grid-cols-3"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            }}
          >
            <div
              data-meal-surface="accent-rose"
              className="rounded px-4 py-4"
              style={{
                ...roseSurfaceStyle,
                borderLeft: "3px solid var(--color-rose)",
                borderRadius: "18px",
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-charcoal-light)",
                  lineHeight: 1.6,
                }}
              >
                Uma lista aproximada para facilitar a semana, sem virar
                planilha.
              </p>
            </div>
            <div
              data-meal-surface="accent-teal"
              className="rounded px-4 py-4"
              style={{
                ...tealSurfaceStyle,
                borderLeft: "3px solid var(--color-teal)",
                borderRadius: "18px",
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-charcoal-light)",
                  lineHeight: 1.6,
                }}
              >
                Se você mudar uma refeição, a lista muda junto.
              </p>
            </div>
            <div
              data-meal-surface="soft"
              className="rounded px-4 py-4"
              style={{
                ...softSurfaceStyle,
                borderLeft: "3px solid var(--color-taupe)",
                borderRadius: "18px",
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-charcoal-light)",
                  lineHeight: 1.6,
                }}
              >
                Use como base rápida de compra, não como regra rígida.
              </p>
            </div>
          </div>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
            }}
          >
            {shoppingGroups.map(group => (
              <article
                data-meal-surface="elevated"
                key={group.key}
                className="inner-card h-full"
                style={{
                  padding: "1rem 1.05rem",
                  ...elevatedSurfaceStyle,
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <ShoppingBasket
                    size={15}
                    style={{ color: "var(--color-rose)" }}
                  />
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-rose)",
                    }}
                  >
                    {group.title}
                  </p>
                </div>
                <div className="space-y-2">
                  {group.items.map(item => (
                    <div
                      data-meal-surface="soft"
                      key={item.key}
                      className="rounded px-3 py-3"
                      style={{
                        ...softSurfaceStyle,
                        padding: "0.75rem",
                        borderRadius: "16px",
                      }}
                    >
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--color-charcoal)",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.74rem",
                          color: "var(--color-warm-gray)",
                          marginTop: "0.25rem",
                        }}
                      >
                        {item.weeklyPortion}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {mealPlanData.globalNotes.map(note => (
              <div
                data-meal-surface="soft"
                key={note}
                className="rounded px-4 py-4"
                style={{
                  ...softSurfaceStyle,
                  padding: "1rem",
                  borderRadius: "18px",
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Leaf size={14} style={{ color: "var(--color-teal)" }} />
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-teal)",
                    }}
                  >
                    Nota do plano
                  </p>
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.65,
                  }}
                >
                  {note}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
