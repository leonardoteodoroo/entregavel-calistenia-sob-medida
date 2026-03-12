import Layout from "@/components/Layout";
import {
  SectionCaminhos,
  SectionComecaHoje,
  SectionEncaixe,
  SectionLabel,
  SectionOQueEsperar,
  SectionSinaisProgresso,
} from "@/components/NewSectionsV2";
import { weeks } from "@/lib/planData";
import { useLocation } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/capa-hero-cbNx8vkc9mpUh3EgwHquFC.webp";

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
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          maxWidth: "860px",
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
                backgroundPosition: "center right",
                opacity: 0.35,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, var(--color-ivory) 45%, transparent 80%)",
              }}
            />
            <div
              className="relative z-10 flex flex-col justify-between"
              style={{ minHeight: "520px", padding: "clamp(2rem, 5vw, 4rem)" }}
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
                    className="px-4 py-3 rounded text-left"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-taupe-light)",
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
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
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
              semanas com papéis diferentes: a primeira adapta seu corpo e
              reduz atrito; a segunda cria ritmo; a terceira aumenta confiança
              e capacidade; a quarta consolida o hábito.
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
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
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
          id="navegacao-rapida"
          className="page-card mb-8"
          style={{ padding: "clamp(2rem, 5vw, 3rem)" }}
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
