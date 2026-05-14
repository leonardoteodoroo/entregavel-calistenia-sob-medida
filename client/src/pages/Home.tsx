import { standaloneRoutes, toPublicPath } from "@/content/siteConfig";
import BonusVisual from "@/components/bonus/BonusVisual";
import Layout from "@/components/Layout";
import SnakeBorder from "@/components/ui/SnakeBorder";
import { Clock3, Heart, ThumbsUp, Download, AlertTriangle } from "lucide-react";
import type { RecipeVisual } from "@/content/bonus/bonusRecipeTypes";
import {
  SectionCaminhos,
  SectionComecaHoje,
  SectionEncaixe,
  SectionLabel,
  SectionOQueEsperar,
  SectionSinaisProgresso,
} from "@/components/NewSectionsV2";
import { weeks } from "@/lib/planData";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/capa-hero-cbNx8vkc9mpUh3EgwHquFC.webp";

const BONUS_LIKES_STORAGE_KEY = "cf-bonus-receitas-like-v1";
// Mantemos o standalone disponível, mas escondemos o card no projeto principal por enquanto.
const SHOW_OLEOS_ESSENCIAIS_BONUS = false;

type BonusCard = {
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

const BONUS_RECIPES: BonusCard[] = [
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
    updatedAtLabel: "22/03/2026",
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
    updatedAtLabel: "22/03/2026",
    social: { likesBase: 77 },
  },
  {
    id: "oleos-essenciais",
    title: "Óleos Essenciais",
    description:
      "Um guia prático para humor, saciedade, rotina e autocuidado com óleos essenciais no contexto do emagrecimento.",
    href: toPublicPath(standaloneRoutes.oleosEssenciais),
    thumbnail: {
      kind: "asset",
      src: toPublicPath("assets/images/bonus/oleos/hero-apothecary.png"),
      alt: "Frascos âmbar de óleos essenciais com fatias cítricas e folhas verdes",
    },
    social: { likesBase: 115 },
  },
  {
    id: "seu-plano-alimentar",
    title: "Seu Plano Alimentar",
    href: toPublicPath(standaloneRoutes.planoAlimentar),
    description:
      "Abra seu plano alimentar com refeições guiadas, trocas fáceis, hidratação do dia e lista da semana organizada para você.",
    thumbnail: {
      kind: "asset",
      src: toPublicPath("assets/images/alimentacao/v3/meal-prep-semanal.webp"),
      alt: "Ingredientes porcionados para a semana em potes organizados sobre bancada clara.",
    },
    updatedAtLabel: "18/04/2026",
    social: { likesBase: 94 },
  },
  {
    id: "bonus-placeholder-2",
    title: "Em desenvolvimento...",
    placeholderDays: 16,
  },
];

const VISIBLE_BONUS_RECIPES = BONUS_RECIPES.filter(
  item => SHOW_OLEOS_ESSENCIAIS_BONUS || item.id !== "oleos-essenciais"
);

type BonusLikesState = Record<string, boolean>;

function readBonusLikesState(): BonusLikesState {
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

function WeekBadge({ week }: { week: number }) {
  const colors: Record<number, { bg: string; text: string }> = {
    1: { bg: "var(--color-teal-muted)", text: "var(--color-teal)" },
    2: { bg: "var(--color-rose-muted)", text: "var(--color-rose)" },
    3: { bg: "var(--color-ivory-dark)", text: "var(--color-taupe)" },
    4: { bg: "var(--color-teal-muted)", text: "var(--color-teal)" },
  };
  const c = colors[week] || colors[1];
  return (
    <div
      className="inline-flex items-center justify-center font-body"
      style={{
        width: "1.75rem",
        height: "1.75rem",
        borderRadius: "50%",
        backgroundColor: c.bg,
        color: c.text,
        fontSize: "0.68rem",
        fontWeight: 600,
      }}
    >
      {week}
    </div>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const [bonusLikes, setBonusLikes] = useState<BonusLikesState>(() =>
    readBonusLikesState()
  );

  useSEO({
    title: "Início | Calistenia Feminina Sob Medida",
    description:
      "Método de 28 dias para criar constância e ganhar força com sessões curtas de calistenia feminina em casa.",
  });
  const updatedAtLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    if (location !== "/bonus") return;
    const section = document.getElementById("bonus");
    if (!section) return;
    requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location]);

  useEffect(() => {
    try {
      localStorage.setItem(BONUS_LIKES_STORAGE_KEY, JSON.stringify(bonusLikes));
    } catch {
      // ignore localStorage write failures
    }
  }, [bonusLikes]);

  return (
    <Layout>
      <div
        style={{
          padding: 0,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <section
          id="capa"
          className="page-card mb-6 overflow-hidden"
          style={{ minHeight: "520px" }}
        >
          <div className="relative" style={{ minHeight: "520px" }}>
            <img
              src={HERO_IMG}
              alt=""
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: "cover",
                objectPosition: "85% center",
                opacity: 0.65,
              }}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, var(--color-ivory) 35%, transparent 75%)",
              }}
            />
            <div
              className="relative z-10 flex flex-col justify-between"
              style={{ minHeight: "520px", padding: "clamp(5px, 4vw, 4rem)" }}
            >
              <div>
                <p
                  className="font-body mb-6"
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--color-rose)",
                  }}
                >
                  Método digital · 28 dias
                </p>
                <h1
                  className="font-display"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3.5rem)",
                    color: "var(--color-charcoal)",
                    fontWeight: 500,
                    lineHeight: 1.1,
                    maxWidth: "520px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Calistenia
                  <br />
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    Feminina
                  </span>
                  <br />
                  Sob Medida
                </h1>

                <div
                  className="my-5"
                  style={{
                    width: "3rem",
                    height: "2px",
                    backgroundColor: "var(--color-rose)",
                  }}
                />

                <p
                  className="font-body"
                  style={{
                    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                    color: "var(--color-charcoal-light)",
                    maxWidth: "460px",
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  Método de 28 dias para sair do zero, criar constância e ganhar
                  força com sessões curtas de calistenia feminina em casa. Cada
                  semana tem uma função clara: adaptação, ritmo, confiança e
                  consolidação.
                </p>
              </div>

              <div
                className="grid mt-5"
                style={{
                  gap: "0.55rem",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
                }}
              >
                {/* Botões de cronograma da Hero — SnakeBorder rose-light */}
                {weeks.map(week => (
                  <SnakeBorder
                    key={week.number}
                    color="var(--color-rose-light)"
                    thickness={1.5}
                    duration={3}
                    borderRadius="0.8rem"
                  >
                    <button
                      onClick={() => setLocation(`/semana/${week.number}`)}
                      className="w-full text-left border bg-[rgba(249,246,240,0.85)] border-[rgba(181,169,154,0.42)] transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:scale-[0.98] hover:border-[rgba(181,169,154,0.58)] hover:bg-[rgba(249,246,240,0.95)] hover:shadow-[0_1px_4px_rgba(44,44,44,0.08),0_6px_14px_rgba(44,44,44,0.10)] active:scale-[0.98] active:border-[rgba(181,169,154,0.66)] active:bg-[#fff] active:shadow-[0_1px_2px_rgba(44,44,44,0.06),0_3px_8px_rgba(44,44,44,0.08)]"
                      style={{
                        padding: "0.72rem 0.78rem",
                        borderRadius: "0.8rem",
                        boxShadow:
                          "0 2px 8px rgba(44, 44, 44, 0.1), 0 12px 22px rgba(44, 44, 44, 0.12)",
                      }}
                    >
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.6rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--color-charcoal-light)",
                          fontWeight: 600,
                        }}
                      >
                        Semana {week.number}
                      </p>
                      <p
                        className="font-display"
                        style={{
                          marginTop: "0.22rem",
                          fontSize: "0.82rem",
                          color: "var(--color-charcoal)",
                          fontWeight: 500,
                          lineHeight: 1.25,
                        }}
                      >
                        {week.title}
                      </p>
                    </button>
                  </SnakeBorder>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="page-card mb-6"
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
        >
          <SectionLabel>Como funciona</SectionLabel>
          <h2
            className="font-display mb-6"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Como este método funciona.
          </h2>
          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "1.75rem",
            }}
          />
          <div className="space-y-4" style={{ maxWidth: "600px" }}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Este não é um calendário solto. O programa foi organizado em 4
              semanas com papéis diferentes: a primeira adapta seu corpo e reduz
              atrito; a segunda cria ritmo; a terceira aumenta confiança e
              capacidade; a quarta consolida o hábito.
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Em cada dia, você pode ajustar a intensidade com Caminho Leve,
              Base ou Avançar. Isso permite continuar dentro do método mesmo
              quando a energia muda, sem transformar o plano em tudo ou nada.
            </p>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Biblioteca, checklist, FAQ e apoio existem para sustentar a
              execução com segurança e continuidade. A proposta não é fazer
              perfeito; é conseguir começar, manter ritmo e saber como seguir
              até depois do dia 28.
            </p>
          </div>
        </section>

        <SectionEncaixe />
        <SectionCaminhos />
        <SectionComecaHoje />

        <section
          id="visao-geral"
          className="page-card mb-6 overflow-hidden"
          style={{ padding: "clamp(5px, 3vw, 3rem)" }}
        >
          <SectionLabel>Método em 4 etapas</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.35rem, 3.7vw, 2rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            A lógica das 4 semanas
          </h2>
          <p
            className="font-display mb-5"
            style={{
              fontSize: "0.9rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Você não está repetindo sessões aleatórias. Cada semana prepara a
            próxima.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "1.5rem",
            }}
          />

          <div
            className="grid"
            style={{
              gap: "0.7rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            }}
          >
            {weeks.map(week => (
              <div
                key={week.number}
                className="flex h-full flex-col gap-2 rounded transition-[box-shadow,border-color,background-color] duration-200 ease-out hover:shadow-[0_1px_4px_rgba(44,44,44,0.03),0_6px_14px_rgba(44,44,44,0.04)]"
                style={{
                  backgroundColor:
                    week.color === "teal"
                      ? "var(--color-teal-muted)"
                      : week.color === "rose"
                        ? "var(--color-rose-muted)"
                        : "var(--color-ivory-dark)",
                  border: `1px solid ${week.color === "teal" ? "var(--color-teal-light)" : week.color === "rose" ? "var(--color-rose-light)" : "var(--color-taupe-light)"}`,
                  padding: "0.82rem",
                  boxShadow:
                    "0 2px 8px rgba(44, 44, 44, 0.04), 0 10px 22px rgba(44, 44, 44, 0.05)",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <WeekBadge week={week.number} />
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-display"
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--color-charcoal)",
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {week.title}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        marginTop: "0.12rem",
                        fontSize: "0.7rem",
                        color: "var(--color-charcoal-light)",
                        lineHeight: 1.35,
                        fontWeight: 500,
                      }}
                    >
                      {week.subtitle}
                    </p>
                  </div>
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.74rem",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.5,
                  }}
                >
                  {week.description}
                </p>
                {/* Botão "Abrir semana" — SnakeBorder teal */}
                <SnakeBorder
                  color="var(--color-teal-light)"
                  thickness={1.5}
                  duration={3.5}
                  borderRadius="calc(var(--radius) - 2px)"
                  className="mt-auto"
                >
                  <button
                    onClick={() => setLocation(`/semana/${week.number}`)}
                    className="w-full rounded font-body border bg-white border-[var(--color-taupe-light)] text-[var(--color-charcoal)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:scale-[0.98] hover:border-[rgba(181,169,154,0.62)] hover:shadow-[0_1px_3px_rgba(44,44,44,0.04),0_4px_10px_rgba(44,44,44,0.06)] active:scale-[0.98] active:border-[rgba(181,169,154,0.72)] active:shadow-[0_1px_2px_rgba(44,44,44,0.03),0_3px_8px_rgba(44,44,44,0.05)]"
                    style={{
                      padding: "0.5rem 0.65rem",
                      fontSize: "0.68rem",
                      lineHeight: 1.2,
                      boxShadow:
                        "0 1px 4px rgba(44, 44, 44, 0.05), 0 6px 14px rgba(44, 44, 44, 0.07)",
                    }}
                  >
                    Abrir semana {week.number}
                  </button>
                </SnakeBorder>
              </div>
            ))}
          </div>
        </section>

        <SectionOQueEsperar />
        <SectionSinaisProgresso />

        <section
          id="bonus"
          className="page-card mb-6 overflow-hidden"
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
        >
          <SectionLabel>Bônus</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            O combustível para a sua constância.
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "0.95rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            De nada adianta o método de treino perfeito se a sua rotina te deixa
            sem energia e te joga no piloto automático. Por isso, o ambiente de
            bônus já abre com dois apoios reais para o dia a dia: receitas low
            carb para simplificar as refeições e sobremesas saudáveis para matar
            a vontade de doce sem perder a mão. E esse espaço continua vivo:
            novos conteúdos práticos podem entrar aqui para sustentar seus
            resultados além do treino.
          </p>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            }}
          >
            {VISIBLE_BONUS_RECIPES.map(item => {
              const isLiked = Boolean(bonusLikes[item.id]);
              const likesCount = item.social
                ? item.social.likesBase + (isLiked ? 1 : 0)
                : 0;
              const renderRichCard = Boolean(
                item.thumbnail || item.description || item.updatedAtLabel
              );
              const isInteractive = Boolean(item.href);
              const openBonusCard = () => {
                if (!item.href) return;
                window.open(item.href, "_blank", "noopener,noreferrer");
              };

              return (
                /* Cards de bônus interativos */
                <article
                  key={item.id}
                  className="px-4 py-4 rounded relative"
                  data-href={item.href}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--color-taupe-light)",
                    cursor: isInteractive ? "pointer" : "default",
                  }}
                  role={isInteractive ? "link" : undefined}
                  tabIndex={isInteractive ? 0 : undefined}
                  onClick={isInteractive ? openBonusCard : undefined}
                  onKeyDown={
                    isInteractive
                      ? event => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openBonusCard();
                          }
                        }
                      : undefined
                  }
                >
                  {renderRichCard ? (
                    <>
                      {item.thumbnail ? (
                        <BonusVisual
                          visual={item.thumbnail}
                          loading="lazy"
                          decoding="async"
                          className="rounded mb-3 w-full"
                          style={{
                            aspectRatio: "16 / 9",
                            border: "1px solid var(--color-taupe-light)",
                            objectFit: "cover",
                          }}
                        />
                      ) : null}

                      <div className="min-w-0">
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            color: "var(--color-charcoal)",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--color-warm-gray)",
                            lineHeight: 1.6,
                            marginBottom: "0.45rem",
                          }}
                        >
                          {item.description}
                        </p>

                        <div
                          className="mb-2 flex flex-wrap items-center gap-2"
                          style={{ rowGap: "0.4rem" }}
                        >
                          {item.social ? (
                            <>
                              <button
                                type="button"
                                aria-pressed={isLiked}
                                onClick={event => {
                                  event.stopPropagation();
                                  setBonusLikes(prev => ({
                                    ...prev,
                                    [item.id]: !prev[item.id],
                                  }));
                                }}
                                onKeyDown={event => event.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded px-2 py-1 font-body"
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  color: isLiked
                                    ? "#145fd1"
                                    : "var(--color-taupe)",
                                  border: isLiked
                                    ? "1px solid rgba(24,119,242,0.35)"
                                    : "1px solid var(--color-taupe-light)",
                                  backgroundColor: isLiked
                                    ? "rgba(24,119,242,0.10)"
                                    : "var(--color-ivory-dark)",
                                }}
                              >
                                <ThumbsUp
                                  size={13}
                                  style={{ color: "#1877F2" }}
                                  fill={isLiked ? "#1877F2" : "none"}
                                  aria-hidden
                                />
                                Curtir
                              </button>
                              <span
                                className="font-body"
                                style={{
                                  fontSize: "0.72rem",
                                  color: "var(--color-taupe)",
                                }}
                              >
                                {likesCount} curtidas
                              </span>
                            </>
                          ) : null}
                        </div>

                        <p
                          className="font-body mb-2 inline-flex items-center gap-1.5"
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--color-taupe)",
                          }}
                        >
                          Atualização: {item.updatedAtLabel ?? updatedAtLabel},{" "}
                          com carinho
                          <Heart
                            size={12}
                            style={{ color: "var(--color-rose)" }}
                            fill="rgba(214,106,126,0.18)"
                            aria-hidden
                          />
                        </p>
                      </div>

                      <SnakeBorder
                        color="var(--color-rose)"
                        thickness={1}
                        duration={3}
                        borderRadius="4px"
                        className="inline-block mt-[0.1rem]"
                      >
                        <p
                          className="font-body inline-block"
                          style={{
                            padding: "0.2rem 0.5rem",
                            fontSize: "0.7rem",
                            color: "var(--color-rose)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontWeight: 500,
                            backgroundColor: "rgba(214,106,126,0.05)",
                            borderRadius: "4px",
                          }}
                        >
                          Abrir ambiente interativo
                        </p>
                      </SnakeBorder>
                    </>
                  ) : (
                    <div
                      className="rounded"
                      style={{
                        background:
                          "linear-gradient(145deg, var(--color-ivory) 0%, var(--color-ivory-dark) 100%)",
                        border: "1px solid var(--color-taupe-light)",
                        padding: "0.95rem",
                      }}
                    >
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: "var(--color-charcoal)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {item.title}
                      </p>
                      {item.href ? (
                        <>
                          <p
                            className="font-body mb-2 inline-flex items-center gap-1.5"
                            style={{
                              fontSize: "0.7rem",
                              color: "var(--color-taupe)",
                            }}
                          >
                            Atualização: {item.updatedAtLabel ?? updatedAtLabel}
                            , com carinho
                            <Heart
                              size={12}
                              style={{ color: "var(--color-rose)" }}
                              fill="rgba(214,106,126,0.18)"
                              aria-hidden
                            />
                          </p>

                          <SnakeBorder
                            color="var(--color-rose)"
                            thickness={1}
                            duration={3}
                            borderRadius="4px"
                            className="inline-block mt-[0.1rem]"
                          >
                            <p
                              className="font-body inline-block"
                              style={{
                                padding: "0.2rem 0.5rem",
                                fontSize: "0.7rem",
                                color: "var(--color-rose)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                fontWeight: 500,
                                backgroundColor: "rgba(214,106,126,0.05)",
                                borderRadius: "4px",
                              }}
                            >
                              Abrir ambiente interativo
                            </p>
                          </SnakeBorder>
                        </>
                      ) : (
                        <>
                          <p
                            className="font-body"
                            style={{
                              fontSize: "0.68rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              fontWeight: 600,
                              color: "var(--color-taupe)",
                              marginBottom: "0.45rem",
                            }}
                          >
                            Você poderá calcular calorias do seu prato apenas
                            enviando uma foto e a IA fará o resto. (16 dias,
                            estou levantando os recursos.)
                          </p>

                          <div
                            className="inline-flex items-center gap-2 rounded-full"
                            style={{
                              padding: "0.36rem 0.62rem",
                              border: "1px solid rgba(188,168,145,0.5)",
                              backgroundColor: "rgba(255,255,255,0.7)",
                            }}
                          >
                            <Clock3
                              size={13}
                              style={{ color: "var(--color-rose)" }}
                              aria-hidden
                            />
                            <span
                              className="font-display"
                              style={{
                                fontSize: "1rem",
                                color: "var(--color-charcoal)",
                                lineHeight: 1,
                              }}
                            >
                              {item.placeholderDays ?? 16}
                            </span>
                            <span
                              className="font-body"
                              style={{
                                fontSize: "0.68rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--color-taupe)",
                                fontWeight: 600,
                              }}
                            >
                              dias
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="materiais-pdf"
          className="page-card mb-6 overflow-hidden"
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
        >
          <SectionLabel>Materiais Prontos</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Seus guias práticos em PDF.
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "0.95rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Baixe com um toque e leve para onde quiser. Documentos diretos ao
            ponto para impressão ou consulta offline.
          </p>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            }}
          >
            {/* Card 1: Tônico Coreano */}
            {/* Card PDF Tônico Coreano */}
            <article
              className="px-4 py-4 rounded flex flex-col xl:flex-row gap-5"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              {/* Coluna da Imagem */}
              <div className="xl:w-1/3 flex-shrink-0">
                <div
                  className="rounded overflow-hidden"
                  style={{
                    border: "1px solid var(--color-taupe-light)",
                    aspectRatio: "3/4",
                  }}
                >
                  <img
                    src={toPublicPath(
                      "bonus/tonico-milenar-coreano/novo-tonico-milenar-coreano.webp"
                    )}
                    alt="Capa do material em PDF: Tônico Milenar Coreano"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Coluna de Conteúdo */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3
                    className="font-body"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Tônico Milenar Coreano
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.6,
                      marginBottom: "1.2rem",
                    }}
                  >
                    Guia de uso do tônico focando na regulação da glicose e
                    redução do armazenamento de gordura usando propriedades do
                    ácido acético (vinagre de maçã) e gengibre.
                  </p>

                  <div
                    className="p-3.5 rounded mb-4"
                    style={{
                      backgroundColor: "var(--color-rose-muted)",
                      border: "1px solid var(--color-rose-light)",
                    }}
                    role="alert"
                  >
                    <p
                      className="font-body flex items-center gap-1.5 mb-2.5"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-rose)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <AlertTriangle size={14} aria-hidden="true" /> Orientações
                      de Uso Seguro
                    </p>
                    <ul
                      className="font-body space-y-2.5"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-charcoal-light)",
                        lineHeight: 1.5,
                      }}
                    >
                      <li>
                        <strong>• Consuma após as refeições:</strong> O vinagre
                        é naturalmente ácido. Evite o estômago vazio para
                        prevenir desconfortos gástricos.
                      </li>
                      <li>
                        <strong>• Cuidado com o esmalte dental:</strong> O ácido
                        pode sensibilizar os dentes. Recomendamos bochechar água
                        ou escovar os dentes após o uso.
                      </li>
                      <li>
                        <strong>• Monitoramento de Glicose:</strong> Se você
                        utiliza remédios para diabetes, fique atenta, pois estes
                        ingredientes naturais podem baixar o açúcar no sangue.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-2 md:mt-auto">
                  <SnakeBorder
                    color="white"
                    thickness={1.5}
                    duration={4}
                    borderRadius="0.25rem"
                    className="w-full md:w-auto block md:inline-block"
                  >
                    <a
                      href={toPublicPath(
                        "bonus/tonico-milenar-coreano/novo-Tonico-Milenar-Coreano.pdf"
                      )}
                      download="Tonico-Milenar-Coreano.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded font-body transition-colors hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: "var(--color-charcoal)",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                      aria-label="Baixar PDF Completo do Tônico Milenar Coreano"
                    >
                      <Download size={16} aria-hidden="true" />
                      Baixar PDF Completo
                    </a>
                  </SnakeBorder>
                </div>
              </div>
            </article>

            {/* Card 2: Tônico Capilar */}
            <article
              className="px-4 py-4 rounded flex flex-col xl:flex-row gap-5"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
              }}
            >
              {/* Coluna da Imagem */}
              <div className="xl:w-1/3 flex-shrink-0">
                <div
                  className="rounded overflow-hidden"
                  style={{
                    border: "1px solid var(--color-taupe-light)",
                    aspectRatio: "3/4",
                  }}
                >
                  <img
                    src={toPublicPath(
                      "bonus/tonico-capilar/capa-tonico-capilar.webp"
                    )}
                    alt="Capa do material em PDF: Tônico Capilar Receitas"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Coluna de Conteúdo */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3
                    className="font-body"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--color-charcoal)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Tônico Capilar: Receitas
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.6,
                      marginBottom: "1.2rem",
                    }}
                  >
                    Guia completo com receitas naturais para fortalecimento e
                    crescimento capilar acelerado, utilizando ingredientes
                    botânicos e técnicas de infusão.
                  </p>

                  <div
                    className="p-3.5 rounded mb-4"
                    style={{
                      backgroundColor: "var(--color-rose-muted)",
                      border: "1px solid var(--color-rose-light)",
                    }}
                    role="alert"
                  >
                    <p
                      className="font-body flex items-center gap-1.5 mb-2.5"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-rose)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <AlertTriangle size={14} aria-hidden="true" /> Cuidados
                      Recomendados
                    </p>
                    <ul
                      className="font-body space-y-2.5"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-charcoal-light)",
                        lineHeight: 1.5,
                      }}
                    >
                      <li>
                        <strong>• Uso do Jaborandi:</strong> Devido à
                        Pilocarpina natural, evite o uso se tiver condições
                        cardíacas ou asma sem consultar um médico.
                      </li>
                      <li>
                        <strong>• Teste de Sensibilidade:</strong> Ingredientes
                        como alho e canela podem ser fortes. Evite sol direto
                        logo após a aplicação no couro cabeludo.
                      </li>
                      <li>
                        <strong>• Frescor das Receitas:</strong> Como são
                        preparos naturais sem conservantes, recomendamos fazer
                        pequenas doses e utilizar em até 48 horas.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-2 md:mt-auto">
                  <SnakeBorder
                    color="white"
                    thickness={1.5}
                    duration={4}
                    borderRadius="0.25rem"
                    className="w-full md:w-auto block md:inline-block"
                  >
                    <a
                      href={toPublicPath(
                        "bonus/tonico-capilar/novo-tonico-capilar-receitas.pdf"
                      )}
                      download="Tonico-Capilar-Receitas.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded font-body transition-colors hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: "var(--color-charcoal)",
                        color: "white",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                      aria-label="Baixar PDF do Tônico Capilar Receitas"
                    >
                      <Download size={16} aria-hidden="true" />
                      Baixar PDF Completo
                    </a>
                  </SnakeBorder>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          id="navegacao-rapida"
          className="page-card mb-8"
          style={{ padding: "clamp(5px, 3vw, 2.5rem)" }}
        >
          <SectionLabel>Navegação rápida</SectionLabel>
          <h2
            className="font-display mb-1.5"
            style={{
              fontSize: "clamp(1.25rem, 3.7vw, 1.8rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Acesse direto o que você precisa
          </h2>
          <p
            className="font-display mb-5"
            style={{
              fontSize: "0.88rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Biblioteca técnica, alimentação, checklist e suporte agora têm
            páginas próprias.
          </p>

          <div
            className="grid"
            style={{
              gap: "0.65rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
            }}
          >
            {[
              {
                title: "Plano alimentar",
                description:
                  "Abra o módulo nutricional com refeições base, trocas e cálculo de hidratação.",
                route: "/alimentacao",
              },
              {
                title: "Biblioteca de exercícios",
                description:
                  "Guia técnico completo com execução, erros comuns e adaptações.",
                route: "/biblioteca",
              },
              {
                title: "Checklist de 28 dias",
                description:
                  "Marque os treinos concluídos e acompanhe sua constância.",
                route: "/checklist",
              },
              {
                title: "FAQ",
                description:
                  "Respostas rápidas para dúvidas de adaptação e progressão.",
                route: "/faq",
              },
              {
                title: "Apoio e continuidade",
                description:
                  "Protocolos para dias perdidos, suporte e próximos passos.",
                route: "/apoio",
              },
              {
                title: "Bônus: conteúdos extras",
                description:
                  "Receitas iniciais e futuros conteúdos em ambientes interativos independentes.",
                route: "/bonus",
              },
            ].map(item => (
              /* Cards de navegação rápida */
              <SnakeBorder
                key={item.route}
                color="var(--color-taupe)"
                thickness={2}
                duration={3}
                borderRadius="0.65rem"
                className="h-full"
              >
                <button
                  onClick={() => setLocation(item.route)}
                  className="h-full w-full text-left flex flex-col justify-start transition-[transform,box-shadow,border-color] duration-200 ease-out hover:scale-[0.98] hover:border-[rgba(181,169,154,0.62)] hover:shadow-[0_1px_3px_rgba(44,44,44,0.04),0_5px_12px_rgba(44,44,44,0.06)] active:scale-[0.98] active:border-[rgba(181,169,154,0.72)] active:shadow-[0_1px_2px_rgba(44,44,44,0.03),0_3px_8px_rgba(44,44,44,0.05)]"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--color-taupe-light)",
                    padding: "0.85rem 0.9rem",
                    borderRadius: "0.65rem",
                    boxShadow:
                      "0 2px 6px rgba(44, 44, 44, 0.05), 0 10px 24px rgba(44, 44, 44, 0.08)",
                  }}
                >
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--color-charcoal)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </button>
              </SnakeBorder>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
