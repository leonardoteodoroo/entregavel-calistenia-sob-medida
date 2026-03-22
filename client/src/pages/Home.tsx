import { standaloneRoutes, toPublicPath } from "@/content/siteConfig";
import BonusVisual from "@/components/bonus/BonusVisual";
import Layout from "@/components/Layout";
import { Clock3, Heart, ThumbsUp } from "lucide-react";
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

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/capa-hero-cbNx8vkc9mpUh3EgwHquFC.webp";

const BONUS_LIKES_STORAGE_KEY = "cf-bonus-receitas-like-v1";

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
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
        backgroundColor: c.bg,
        color: c.text,
        fontSize: "0.75rem",
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
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${HERO_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "85% center",
                opacity: 0.65,
              }}
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

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                {weeks.map(week => (
                  <button
                    key={week.number}
                    onClick={() => setLocation(`/semana/${week.number}`)}
                    className="px-4 py-3 rounded text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(181, 169, 154, 0.4)",
                    }}
                  >
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--color-taupe)",
                      }}
                    >
                      Semana {week.number}
                    </p>
                    <p
                      className="font-display mt-1"
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--color-charcoal)",
                        fontWeight: 500,
                      }}
                    >
                      {week.title}
                    </p>
                  </button>
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
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
        >
          <SectionLabel>Método em 4 etapas</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            A lógica das 4 semanas
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
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
              marginBottom: "2rem",
            }}
          />

          <div className="space-y-4">
            {weeks.map(week => (
              <div
                key={week.number}
                className="flex gap-4 items-start px-5 py-4 rounded"
                style={{
                  backgroundColor:
                    week.color === "teal"
                      ? "var(--color-teal-muted)"
                      : week.color === "rose"
                        ? "var(--color-rose-muted)"
                        : "var(--color-ivory-dark)",
                  border: `1px solid ${week.color === "teal" ? "var(--color-teal-light)" : week.color === "rose" ? "var(--color-rose-light)" : "var(--color-taupe-light)"}`,
                }}
              >
                <WeekBadge week={week.number} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p
                      className="font-display"
                      style={{
                        fontSize: "1.05rem",
                        color: "var(--color-charcoal)",
                        fontWeight: 500,
                      }}
                    >
                      {week.title}
                    </p>
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-taupe)",
                      }}
                    >
                      {week.subtitle}
                    </p>
                  </div>
                  <p
                    className="font-body mt-1"
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--color-charcoal-light)",
                      lineHeight: 1.6,
                    }}
                  >
                    {week.description}
                  </p>
                  <button
                    onClick={() => setLocation(`/semana/${week.number}`)}
                    className="mt-3 px-3 py-2 rounded font-body"
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "white",
                      color: "var(--color-charcoal)",
                      border: "1px solid var(--color-taupe-light)",
                    }}
                  >
                    Abrir semana {week.number}
                  </button>
                </div>
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
            {BONUS_RECIPES.map(item => {
              const isLiked = Boolean(bonusLikes[item.id]);
              const likesCount = item.social
                ? item.social.likesBase + (isLiked ? 1 : 0)
                : 0;
              const isInteractive = Boolean(item.href);
              const openBonusCard = () => {
                if (!item.href) return;
                window.open(item.href, "_blank", "noopener,noreferrer");
              };

              return (
                <article
                  key={item.id}
                  className="px-4 py-4 rounded"
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
                  {item.social ? (
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
                              color: isLiked ? "#145fd1" : "var(--color-taupe)",
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

                      <p
                        className="font-body inline-block"
                        style={{
                          marginTop: "0.1rem",
                          fontSize: "0.7rem",
                          color: "var(--color-rose)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          fontWeight: 500,
                        }}
                      >
                        Abrir ambiente interativo
                      </p>
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
                          fontSize: "0.68rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                          color: "var(--color-taupe)",
                          marginBottom: "0.45rem",
                        }}
                      >
                        Em breve
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
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="navegacao-rapida"
          className="page-card mb-8"
          style={{ padding: "clamp(5px, 3.5vw, 3rem)" }}
        >
          <SectionLabel>Navegação rápida</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Acesse direto o que você precisa
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "0.95rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Biblioteca técnica, checklist e suporte agora têm páginas próprias.
          </p>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            }}
          >
            {[
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
              <button
                key={item.route}
                onClick={() => setLocation(item.route)}
                className="px-4 py-4 rounded text-left"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-taupe-light)",
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
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
