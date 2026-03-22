import {
  ArrowLeft,
  BookOpen,
  Check,
  ChefHat,
  Lightbulb,
  Search,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDeferredValue, useState } from "react";

import type { Recipe, RecipeBook } from "@/content/bonus/bonusRecipeTypes";
import BonusVisual from "./BonusVisual";

interface RecipeProgress {
  ingredientsChecked: number[];
  stepsChecked: number[];
}

type RecipeProgressMap = Record<string, RecipeProgress>;

function matchesQuery(recipe: Recipe, query: string): boolean {
  if (!query) return true;

  const titleMatch = recipe.title.toLowerCase().includes(query);
  const ingredientMatch = recipe.ingredients.some(ingredient =>
    ingredient.toLowerCase().includes(query)
  );

  return titleMatch || ingredientMatch;
}

function defaultRecipeProgress(): RecipeProgress {
  return {
    ingredientsChecked: [],
    stepsChecked: [],
  };
}

function normalizeIndexes(indexes: number[], maxExclusive: number): number[] {
  const unique = new Set<number>();

  for (const index of indexes) {
    if (!Number.isInteger(index)) continue;
    if (index < 0 || index >= maxExclusive) continue;
    unique.add(index);
  }

  return Array.from(unique).sort((a, b) => a - b);
}

function readRecipeProgressMap(storageKey: string): RecipeProgressMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    const result: RecipeProgressMap = {};
    for (const [recipeId, value] of Object.entries(parsed)) {
      if (!value || typeof value !== "object") continue;

      const candidate = value as Partial<RecipeProgress>;
      result[recipeId] = {
        ingredientsChecked: Array.isArray(candidate.ingredientsChecked)
          ? candidate.ingredientsChecked.filter(
              index => typeof index === "number"
            )
          : [],
        stepsChecked: Array.isArray(candidate.stepsChecked)
          ? candidate.stepsChecked.filter(index => typeof index === "number")
          : [],
      };
    }

    return result;
  } catch {
    return {};
  }
}

function getRecipeProgress(
  progressMap: RecipeProgressMap,
  recipe: Recipe
): RecipeProgress {
  const raw = progressMap[recipe.id] ?? defaultRecipeProgress();

  return {
    ingredientsChecked: normalizeIndexes(
      raw.ingredientsChecked,
      recipe.ingredients.length
    ),
    stepsChecked: normalizeIndexes(
      raw.stepsChecked,
      recipe.instructionsSteps.length
    ),
  };
}

function RecipeCard({
  recipe,
  onSelect,
}: {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(recipe)}
      className="inner-card w-full overflow-hidden text-left transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <BonusVisual
          visual={recipe.visual}
          loading="lazy"
          decoding="async"
          className="h-full w-full"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <span
          className="absolute left-3 top-3 rounded px-2 py-1 font-body"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "var(--color-charcoal)",
            backgroundColor: "rgba(255,255,255,0.88)",
            border: "1px solid var(--color-taupe-light)",
            backdropFilter: "blur(3px)",
          }}
        >
          Receita {recipe.id}
        </span>
      </div>
      <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
        <p
          className="mb-1 font-display"
          style={{
            fontSize: "1.2rem",
            color: "var(--color-charcoal)",
            fontWeight: 500,
            lineHeight: 1.25,
          }}
        >
          {recipe.title}
        </p>
        <p
          className="font-body"
          style={{
            fontSize: "0.82rem",
            color: "var(--color-warm-gray)",
            lineHeight: 1.6,
          }}
        >
          "{recipe.premise}"
        </p>
      </div>
    </button>
  );
}

function RecipeDetail({
  recipe,
  onBack,
  progress,
  onToggleIngredient,
  onToggleStep,
}: {
  recipe: Recipe;
  onBack: () => void;
  progress: RecipeProgress;
  onToggleIngredient: (index: number) => void;
  onToggleStep: (index: number) => void;
}) {
  const ingredientsDone = progress.ingredientsChecked.length;
  const ingredientsTotal = recipe.ingredients.length;
  const stepsDone = progress.stepsChecked.length;
  const stepsTotal = recipe.instructionsSteps.length;

  return (
    <section className="inner-card mb-8 overflow-hidden">
      <div className="relative h-64 md:h-80">
        <BonusVisual
          visual={recipe.visual}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,44,44,0.15) 0%, rgba(44,44,44,0.72) 100%)",
          }}
        />

        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para a lista de receitas"
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded px-3 py-2 font-body"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "1px solid var(--color-taupe-light)",
            color: "var(--color-charcoal)",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} />
          Voltar
        </button>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className="rounded px-2 py-1 font-body"
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                backgroundColor: "var(--color-teal-muted)",
                border: "1px solid var(--color-teal-light)",
              }}
            >
              Receita {recipe.id}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded px-2 py-1 font-body"
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                backgroundColor: "var(--color-rose-muted)",
                border: "1px solid var(--color-rose-light)",
              }}
            >
              <Users size={11} />
              Rendimento: {recipe.servings}
            </span>
            <span
              className="rounded px-2 py-1 font-body"
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              Tempo total: {recipe.time.total}
            </span>
            <span
              className="rounded px-2 py-1 font-body"
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              Preparo: {recipe.time.prep}
            </span>
            <span
              className="rounded px-2 py-1 font-body"
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                color: "var(--color-charcoal)",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              {recipe.time.extraLabel}: {recipe.time.extraValue}
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              color: "white",
            }}
          >
            {recipe.title}
          </h2>
        </div>
      </div>

      <div style={{ padding: "clamp(1.2rem, 4vw, 2.4rem)" }}>
        <p
          className="mb-8 font-display"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.45rem)",
            color: "var(--color-charcoal)",
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          "{recipe.premise}"
        </p>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.45fr]">
          <article
            className="rounded"
            style={{
              backgroundColor: "var(--color-ivory-dark)",
              border: "1px solid var(--color-taupe-light)",
              padding: "1rem 1rem 1.1rem",
            }}
          >
            <h3
              className="mb-3 inline-flex items-center gap-2 font-body"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-taupe)",
              }}
            >
              <BookOpen size={14} />
              Ingredientes
            </h3>
            <p
              className="mb-3 font-body"
              style={{ fontSize: "0.75rem", color: "var(--color-taupe)" }}
            >
              Ingredientes: {ingredientsDone} de {ingredientsTotal} marcados
            </p>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((item, index) => {
                const checked = progress.ingredientsChecked.includes(index);

                return (
                  <li key={`${recipe.id}-ingredient-${index}`}>
                    <button
                      type="button"
                      onClick={() => onToggleIngredient(index)}
                      role="checkbox"
                      aria-checked={checked}
                      className="flex w-full items-start gap-2.5 rounded px-1 py-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ outlineColor: "var(--color-rose)" }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: "1.2rem",
                          height: "1.2rem",
                          border: checked
                            ? "1.5px solid var(--color-rose)"
                            : "1.5px solid var(--color-taupe-light)",
                          borderRadius: "3px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: checked
                            ? "var(--color-rose)"
                            : "white",
                          color: "white",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        {checked ? <Check size={12} /> : null}
                      </span>
                      <span
                        className="font-body"
                        style={{
                          fontSize: "0.82rem",
                          color: checked
                            ? "var(--color-taupe)"
                            : "var(--color-charcoal-light)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </article>

          <article
            className="rounded"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-taupe-light)",
              padding: "1rem 1rem 1.1rem",
            }}
          >
            <h3
              className="mb-3 inline-flex items-center gap-2 font-body"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-taupe)",
              }}
            >
              <ChefHat size={14} />
              Como fazer
            </h3>
            <p
              className="mb-3 font-body"
              style={{ fontSize: "0.75rem", color: "var(--color-taupe)" }}
            >
              Passos: {stepsDone} de {stepsTotal} concluidos
            </p>
            <p
              className="mb-2 font-body"
              style={{
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-taupe)",
                fontWeight: 600,
              }}
            >
              Passo a passo
            </p>

            <div className="mb-4 space-y-2.5">
              {recipe.instructionsSteps.map((step, index) => {
                const checked = progress.stepsChecked.includes(index);

                return (
                  <button
                    key={`${recipe.id}-step-${index}`}
                    type="button"
                    onClick={() => onToggleStep(index)}
                    role="checkbox"
                    aria-checked={checked}
                    className="flex w-full items-start gap-2.5 rounded px-2.5 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      border: checked
                        ? "1px solid var(--color-rose-light)"
                        : "1px solid var(--color-taupe-light)",
                      backgroundColor: checked
                        ? "var(--color-rose-muted)"
                        : "var(--color-ivory)",
                      outlineColor: "var(--color-rose)",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        border: checked
                          ? "1.5px solid var(--color-rose)"
                          : "1.5px solid var(--color-taupe-light)",
                        borderRadius: "3px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: checked
                          ? "var(--color-rose)"
                          : "white",
                        color: "white",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      {checked ? <Check size={12} /> : null}
                    </span>
                    <span>
                      <span
                        className="mb-1 block font-body"
                        style={{
                          fontSize: "0.68rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--color-taupe)",
                          fontWeight: 600,
                        }}
                      >
                        Passo {index + 1}
                      </span>
                      <span
                        className="font-body"
                        style={{
                          fontSize: "0.86rem",
                          color: "var(--color-charcoal-light)",
                          lineHeight: 1.65,
                          textDecorationLine: checked ? "line-through" : "none",
                          textDecorationThickness: checked ? "1px" : undefined,
                          textDecorationColor: checked
                            ? "var(--color-taupe-light)"
                            : undefined,
                        }}
                      >
                        {step}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded px-3 py-3"
              style={{
                backgroundColor: "var(--color-ivory-dark)",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              <p
                className="mb-1.5 font-body"
                style={{
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-taupe)",
                  fontWeight: 600,
                }}
              >
                Narrativa completa
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-charcoal-light)",
                  lineHeight: 1.7,
                }}
              >
                {recipe.instructions}
              </p>
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article
            className="rounded px-4 py-4"
            style={{
              backgroundColor: "var(--color-rose-muted)",
              borderLeft: "3px solid var(--color-rose)",
              borderTop: "1px solid var(--color-rose-light)",
              borderRight: "1px solid var(--color-rose-light)",
              borderBottom: "1px solid var(--color-rose-light)",
            }}
          >
            <h4
              className="mb-2 inline-flex items-center gap-2 font-body"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-charcoal)",
              }}
            >
              <ShieldAlert size={14} style={{ color: "var(--color-rose)" }} />
              Pulo do Gato
            </h4>
            <p
              className="font-body"
              style={{
                fontSize: "0.84rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.65,
              }}
            >
              {recipe.objection}
            </p>
          </article>

          <article
            className="rounded px-4 py-4"
            style={{
              backgroundColor: "var(--color-teal-muted)",
              borderLeft: "3px solid var(--color-teal)",
              borderTop: "1px solid var(--color-teal-light)",
              borderRight: "1px solid var(--color-teal-light)",
              borderBottom: "1px solid var(--color-teal-light)",
            }}
          >
            <h4
              className="mb-2 inline-flex items-center gap-2 font-body"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-charcoal)",
              }}
            >
              <Lightbulb size={14} style={{ color: "var(--color-teal)" }} />
              Dica de Ouro
            </h4>
            <p
              className="font-body"
              style={{
                fontSize: "0.84rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.65,
              }}
            >
              {recipe.masterTip}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function BonusRecipeBookApp({ book }: { book: RecipeBook }) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeProgress, setRecipeProgress] = useState<RecipeProgressMap>(() =>
    readRecipeProgressMap(book.storageKey)
  );
  const [savedScrollY, setSavedScrollY] = useState(0);
  const normalizedQuery = useDeferredValue(searchQuery.trim().toLowerCase());

  const selectRecipe = (recipe: Recipe) => {
    setSavedScrollY(window.scrollY);
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBackToList = () => {
    setSelectedRecipe(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY, behavior: "smooth" });
    });
  };

  const filteredRecipes = book.recipes.filter(recipe =>
    matchesQuery(recipe, normalizedQuery)
  );

  const toggleRecipeProgress = (
    recipe: Recipe,
    field: keyof RecipeProgress,
    index: number
  ) => {
    setRecipeProgress(prev => {
      const current = getRecipeProgress(prev, recipe);
      const selectedIndexes = current[field];
      const nextIndexes = selectedIndexes.includes(index)
        ? selectedIndexes.filter(value => value !== index)
        : [...selectedIndexes, index].sort((a, b) => a - b);

      const nextEntry: RecipeProgress = {
        ...current,
        [field]: nextIndexes,
      };

      const nextMap: RecipeProgressMap = {
        ...prev,
        [recipe.id]: nextEntry,
      };

      try {
        localStorage.setItem(book.storageKey, JSON.stringify(nextMap));
      } catch {
        // ignore localStorage failures in restricted environments
      }

      return nextMap;
    });
  };

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--color-ivory)" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50"
      >
        <span
          className="rounded px-3 py-2 font-body"
          style={{
            backgroundColor: "var(--color-charcoal)",
            color: "white",
            fontSize: "0.75rem",
          }}
        >
          Pular para o conteudo principal
        </span>
      </a>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "rgba(249,246,240,0.96)",
          backdropFilter: "blur(4px)",
          borderBottom: "1px solid var(--color-taupe-light)",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "clamp(1rem, 3vw, 1.5rem)",
          }}
          className="flex items-center justify-between gap-4"
        >
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.35rem, 4vw, 2rem)",
                color: "var(--color-charcoal)",
                fontWeight: 500,
                lineHeight: 1.2,
                marginTop: "0.2rem",
              }}
            >
              {book.intro.title}
            </h1>
            <p
              className="font-body"
              style={{
                fontSize: "0.76rem",
                color: "var(--color-taupe)",
                marginTop: "0.2rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 500,
              }}
            >
              {book.intro.volume} • POR: {book.intro.author}
            </p>
          </div>
          <ChefHat size={28} style={{ color: "var(--color-rose)" }} />
        </div>
      </header>

      <main
        id="main-content"
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "clamp(1rem, 3vw, 2rem)",
        }}
      >
        <AnimatePresence mode="wait">
          {selectedRecipe ? (
            <motion.div
              key={selectedRecipe.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <RecipeDetail
                recipe={selectedRecipe}
                onBack={goBackToList}
                progress={getRecipeProgress(recipeProgress, selectedRecipe)}
                onToggleIngredient={index =>
                  toggleRecipeProgress(
                    selectedRecipe,
                    "ingredientsChecked",
                    index
                  )
                }
                onToggleStep={index =>
                  toggleRecipeProgress(selectedRecipe, "stepsChecked", index)
                }
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <section
                className="inner-card mb-6"
                style={{ padding: "clamp(1.1rem, 3vw, 1.8rem)" }}
              >
                <p
                  className="mb-2 inline-flex items-center gap-2 font-body"
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-rose)",
                  }}
                >
                  <Sparkles size={14} />
                  Papo de Cozinha
                </p>
                <ul className="space-y-2">
                  {book.intro.observations.map(observation => (
                    <li
                      key={observation}
                      className="font-body"
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--color-charcoal-light)",
                        lineHeight: 1.7,
                      }}
                    >
                      • {observation}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2
                      className="inline-flex items-center gap-2 font-display"
                      style={{
                        fontSize: "clamp(1.4rem, 4vw, 2rem)",
                        color: "var(--color-charcoal)",
                        fontWeight: 500,
                      }}
                    >
                      <BookOpen
                        size={18}
                        style={{ color: "var(--color-taupe)" }}
                      />
                      Indice de Receitas
                    </h2>
                  </div>

                  <div className="relative w-full md:max-w-[300px]">
                    <label htmlFor="recipe-search" className="sr-only">
                      Buscar receita
                    </label>
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--color-taupe)" }}
                      aria-hidden
                    />
                    <input
                      id="recipe-search"
                      type="text"
                      value={searchQuery}
                      onChange={event => setSearchQuery(event.target.value)}
                      placeholder={book.searchPlaceholder}
                      className="w-full rounded px-3 py-2.5 font-body"
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--color-charcoal)",
                        backgroundColor: "white",
                        border: "1px solid var(--color-taupe-light)",
                        paddingLeft: "2rem",
                      }}
                    />
                  </div>
                </div>

                {filteredRecipes.length === 0 ? (
                  <div
                    className="inner-card"
                    style={{ padding: "1.1rem", textAlign: "center" }}
                  >
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--color-warm-gray)",
                      }}
                    >
                      {book.emptyStateCopy}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredRecipes.map(recipe => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onSelect={selectRecipe}
                      />
                    ))}
                  </div>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
