// ============================================================
// Home — Calistenia Feminina Sob Medida
// Design: Editorial Wellness Minimalista
// Todas as 37 seções do documento digital
// ============================================================

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import DayCard from "@/components/DayCard";
import ExerciseLibrarySection from "@/components/ExerciseLibrarySection";
import { days, weeks, faq } from "@/lib/planData";
import {
  SectionLabel,
  SectionEncaixe,
  SectionCaminhos,
  SectionComecaHoje,
  SectionOQueEsperar,
  SectionSinaisProgresso,
} from "@/components/NewSectionsV2";
import {
  SectionPerdidias,
  SectionApoioSuporte,
} from "@/components/ProtocolsV2";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/capa-hero-cbNx8vkc9mpUh3EgwHquFC.webp";
const SEMANAS_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/semanas-bg-TSWs5gSa2Q3osyzFqwFhcL.webp";
const TREINO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/treino-bg-fZZ4rKG7uCBpGggj2kF5dp.webp";
const MOTIVACAO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/motivacao-bg-AMJWfg8yscZEPVcYCh4AwP.webp";

function PageDivider() {
  return (
    <div
      style={{
        height: "1px",
        backgroundColor: "var(--color-taupe-light)",
        maxWidth: "780px",
        margin: "0 auto 1.5rem auto",
      }}
    />
  );
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
  const [activeSection, setActiveSection] = useState("capa");
  const [checkedDays, setCheckedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("cf-checked-days");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleDay = (day: number) => {
    setCheckedDays(prev => {
      const next = prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day];
      localStorage.setItem("cf-checked-days", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    document
      .querySelectorAll("section[id]")
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getWeekForDay = (day: number) => Math.ceil(day / 7);

  return (
    <Layout activeSection={activeSection}>
      <div
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        {/* ── PÁGINA 1: CAPA ─────────────────────────────────── */}
        <section
          id="capa"
          className="page-card mb-6 overflow-hidden"
          style={{ minHeight: "520px" }}
        >
          <div className="relative" style={{ minHeight: "520px" }}>
            {/* Background image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${HERO_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                opacity: 0.35,
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, var(--color-ivory) 45%, transparent 80%)",
              }}
            />
            {/* Content */}
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
                  Produto digital · Plano de treino
                </p>
                <h1
                  className="font-display animate-fade-in"
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
                  className="font-body animate-fade-in-delay-1"
                  style={{
                    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                    color: "var(--color-charcoal-light)",
                    maxWidth: "420px",
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  Desafio de 28 dias para criar constância, treinar em casa e
                  voltar a se sentir bem no próprio corpo.
                </p>

                <p
                  className="font-body mt-3 animate-fade-in-delay-2"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-taupe)",
                    fontStyle: "italic",
                  }}
                >
                  Sem academia · Sem complicação · Sem treinos longos
                </p>
              </div>

              <div className="flex items-end justify-between mt-8">
                <div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-taupe)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    10 a 20 minutos por dia
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-taupe)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Sem equipamento obrigatório
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-taupe)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Para iniciantes e retomada
                  </p>
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-taupe-light)",
                  }}
                >
                  1
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PÁGINA 2: BOAS-VINDAS ──────────────────────────── */}
        <section
          id="boas-vindas"
          className="page-card mb-6 animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Boas-vindas</SectionLabel>
          <h2
            className="font-display mb-6"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Que bom que você está aqui.
          </h2>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "1.75rem",
            }}
          />

          <div className="space-y-4" style={{ maxWidth: "560px" }}>
            <p
              className="font-body"
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Este plano foi pensado para mulheres reais — com rotina corrida,
              pouco tempo, dias difíceis e o desejo genuíno de se sentir melhor.
              Não para atletas. Não para quem já treina há anos. Para você,
              exatamente como está hoje.
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
              Aqui não existe perfeição. Existe constância. Um treino de 10
              minutos feito é sempre melhor do que um treino de 1 hora que não
              aconteceu. Esse é o princípio que guia cada dia deste desafio.
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
              Os exercícios são simples, viáveis em casa e organizados em
              progressão suave. Você não precisa de academia, equipamentos ou
              experiência prévia. Precisa apenas de disposição para começar — e
              de voltar no dia seguinte.
            </p>
          </div>

          <div
            className="mt-8 px-5 py-4 rounded"
            style={{
              backgroundColor: "var(--color-rose-muted)",
              borderLeft: "3px solid var(--color-rose)",
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: "1rem",
                color: "var(--color-charcoal)",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              "Você pode começar hoje mesmo. Abra o Dia 1 e faça o primeiro
              movimento. É assim que tudo começa."
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              2
            </p>
          </div>
        </section>

        {/* ── PÁGINA 3: PARA QUEM É ──────────────────────────── */}
        <section
          id="para-quem"
          className="page-card mb-6 animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Direcionamento</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Para quem é este plano
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Este plano foi feito para você se você se identifica com algum
            destes pontos.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            }}
          >
            {[
              {
                title: "Você é iniciante",
                desc: "Nunca treinou ou treinou pouco. Quer começar do zero com segurança e sem se sentir perdida.",
              },
              {
                title: "Você está voltando",
                desc: "Ficou um tempo parada e quer retomar. Sem pressa, sem culpa, com progressão respeitosa.",
              },
              {
                title: "Você tem pouco tempo",
                desc: "10 a 20 minutos por dia é o que você tem — e é exatamente o que este plano exige.",
              },
              {
                title: "Você quer treinar em casa",
                desc: "Sem deslocamento, sem academia, sem equipamento obrigatório. Só você e o seu espaço.",
              },
              {
                title: "Você quer algo simples",
                desc: "Sem planilhas complicadas, sem terminologia técnica. Abra, leia e faça.",
              },
              {
                title: "Você quer se sentir ativa",
                desc: "Mais energia, mais disposição, mais confiança no próprio corpo. É para isso que este plano existe.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="px-4 py-4 rounded"
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-rose)",
                      flexShrink: 0,
                    }}
                  />
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              3
            </p>
          </div>
        </section>

        {/* ── NOVA SEÇÃO: ENCAIXE DO PRODUTO ─────────────────── */}
        <SectionEncaixe />

        {/* ── NOVA SEÇÃO: COMO ESCOLHER SEU CAMINHO ────────── */}
        <SectionCaminhos />

        {/* ── NOVA SEÇÃO: COMECE HOJE ────────────────────────── */}
        <SectionComecaHoje />

        {/* ── PÁGINA 4: COMO USAR ────────────────────────────── */}
        <section
          id="como-usar"
          className="page-card mb-6 animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Guia de uso</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Como usar este plano
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Simples, direto e sem complicação.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div className="space-y-3" style={{ maxWidth: "600px" }}>
            {[
              {
                num: "01",
                title: "Abra o dia correspondente",
                desc: "Cada dia tem sua própria página. Vá direto para o dia em que você está.",
              },
              {
                num: "02",
                title: "Veja o foco e a duração",
                desc: "Cada treino tem duração estimada e foco claro. Você sabe exatamente o que esperar.",
              },
              {
                num: "03",
                title: "Execute os exercícios na ordem",
                desc: "A sequência foi pensada para aquecer, trabalhar e finalizar com segurança.",
              },
              {
                num: "04",
                title: "Escolha sua intensidade",
                desc: "Versão leve, padrão ou mais intensa. Escolha com honestidade, sem julgamento.",
              },
              {
                num: "05",
                title: "Use adaptações quando precisar",
                desc: "Joelho, punho ou qualquer desconforto — cada dia tem sugestões de adaptação.",
              },
              {
                num: "06",
                title: "O mais importante é voltar amanhã",
                desc: "Um dia perdido não desfaz o progresso. Constância é o que transforma.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 items-start px-4 py-3.5 rounded"
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <span
                  className="font-display shrink-0"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--color-rose-light)",
                    fontWeight: 400,
                    lineHeight: 1,
                    marginTop: "2px",
                  }}
                >
                  {step.num}
                </span>
                <div>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="font-body mt-0.5"
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-warm-gray)",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              4
            </p>
          </div>
        </section>

        <ExerciseLibrarySection />

        {/* ── PÁGINA 5: ESTRUTURA DO PLANO ───────────────────── */}
        <section
          id="estrutura"
          className="page-card mb-6 animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Estrutura</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Seu plano foi montado assim
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Uma lógica pensada para o público feminino e para a vida real.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
              marginBottom: "2rem",
            }}
          >
            {[
              {
                icon: "⏱",
                title: "Sessões curtas",
                desc: "10 a 20 minutos por dia. Tempo real para uma rotina real.",
              },
              {
                icon: "🎯",
                title: "Foco estratégico",
                desc: "Pernas, glúteos, core, postura, mobilidade e corpo inteiro — alternados para equilíbrio.",
              },
              {
                icon: "📈",
                title: "Progressão por semanas",
                desc: "Cada semana aumenta levemente a exigência. Sem saltos bruscos.",
              },
              {
                icon: "🏠",
                title: "Em casa, sem equipamento",
                desc: "Todos os exercícios são viáveis no seu espaço, sem comprar nada.",
              },
              {
                icon: "⚡",
                title: "Três intensidades",
                desc: "Leve, padrão e mais intensa. Você escolhe a cada dia.",
              },
              {
                icon: "🔄",
                title: "Baixo atrito",
                desc: "Menos barreiras para começar significa mais dias de treino. Esse é o objetivo.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="px-4 py-4 rounded"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <span
                  style={{
                    fontSize: "1.25rem",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.icon}
                </span>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                    marginBottom: "0.25rem",
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
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="px-4 py-3 rounded"
            style={{
              backgroundColor: "var(--color-teal-muted)",
              borderLeft: "3px solid var(--color-teal)",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.6,
              }}
            >
              Os dias de mobilidade e pausa guiada são parte integrante do
              plano, não dias de folga. Eles ajudam na recuperação, na prevenção
              de lesões e na manutenção da constância.
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              5
            </p>
          </div>
        </section>

        {/* ── NOVA SEÇÃO: O QUE ESPERAR ──────────────────────── */}
        <SectionOQueEsperar />

        {/* ── NOVA SEÇÃO: SINAIS DE PROGRESSO ────────────────── */}
        <SectionSinaisProgresso />

        {/* ── PÁGINA 6: VISÃO GERAL DAS 4 SEMANAS ────────────── */}
        <section
          id="visao-geral"
          className="page-card mb-6 overflow-hidden animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Visão geral</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Visão geral das 4 semanas
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Cada semana tem um propósito claro.
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
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {week.days.map(d => (
                      <span
                        key={d}
                        className="font-body"
                        style={{
                          fontSize: "0.65rem",
                          padding: "0.15rem 0.4rem",
                          borderRadius: "2px",
                          backgroundColor: "white",
                          color: "var(--color-taupe)",
                          border: "1px solid var(--color-taupe-light)",
                        }}
                      >
                        Dia {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              6
            </p>
          </div>
        </section>

        {/* ── SEMANA 1 HEADER ────────────────────────────────── */}
        <div
          id="semana-1"
          className="mx-auto mb-4"
          style={{
            maxWidth: "780px",
            padding: "1.25rem 1.5rem",
            backgroundColor: "var(--color-teal-muted)",
            border: "1px solid var(--color-teal-light)",
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-3">
            <WeekBadge week={1} />
            <div>
              <p
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                }}
              >
                Semana 1 · Dias 1–7
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                Adaptação e Constância
              </p>
            </div>
          </div>
        </div>

        {/* Days 1–7 */}
        {days.slice(0, 7).map(day => (
          <DayCard key={day.day} plan={day} weekNumber={1} />
        ))}

        {/* ── SEMANA 2 HEADER ────────────────────────────────── */}
        <div
          id="semana-2"
          className="mx-auto mb-4 mt-6"
          style={{
            maxWidth: "780px",
            padding: "1.25rem 1.5rem",
            backgroundColor: "var(--color-rose-muted)",
            border: "1px solid var(--color-rose-light)",
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-3">
            <WeekBadge week={2} />
            <div>
              <p
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-rose)",
                }}
              >
                Semana 2 · Dias 8–14
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                Base e Controle
              </p>
            </div>
          </div>
        </div>

        {/* Days 8–14 */}
        {days.slice(7, 14).map(day => (
          <DayCard key={day.day} plan={day} weekNumber={2} />
        ))}

        {/* ── SEMANA 3 HEADER ────────────────────────────────── */}
        <div
          id="semana-3"
          className="mx-auto mb-4 mt-6"
          style={{
            maxWidth: "780px",
            padding: "1.25rem 1.5rem",
            backgroundColor: "var(--color-ivory-dark)",
            border: "1px solid var(--color-taupe-light)",
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-3">
            <WeekBadge week={3} />
            <div>
              <p
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-taupe)",
                }}
              >
                Semana 3 · Dias 15–21
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                Ganho de Ritmo
              </p>
            </div>
          </div>
        </div>

        {/* Days 15–21 */}
        {days.slice(14, 21).map(day => (
          <DayCard key={day.day} plan={day} weekNumber={3} />
        ))}

        {/* ── SEMANA 4 HEADER ────────────────────────────────── */}
        <div
          id="semana-4"
          className="mx-auto mb-4 mt-6"
          style={{
            maxWidth: "780px",
            padding: "1.25rem 1.5rem",
            backgroundColor: "var(--color-teal-muted)",
            border: "1px solid var(--color-teal-light)",
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-3">
            <WeekBadge week={4} />
            <div>
              <p
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                }}
              >
                Semana 4 · Dias 22–28
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                Consolidação
              </p>
            </div>
          </div>
        </div>

        {/* Days 22–28 */}
        {days.slice(21, 28).map(day => (
          <DayCard key={day.day} plan={day} weekNumber={4} />
        ))}

        {/* ── NOVA SEÇÃO: PERDI DIAS ───────────────────────── */}
        <SectionPerdidias />

        {/* ── PÁGINA 35: CHECKLIST ───────────────────── */}
        <section
          id="checklist"
          className="page-card mb-6 mt-6 animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Progresso</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Seus 28 dias
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Marque cada dia concluído. Veja sua constância tomar forma.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          {/* Marcos */}
          <div
            className="grid gap-3 mb-8"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            }}
          >
            {[
              { label: "Primeiro treino", day: 1, icon: "✦" },
              { label: "Primeira semana", day: 7, icon: "✦✦" },
              { label: "Metade do desafio", day: 14, icon: "✦✦✦" },
              { label: "Desafio concluído", day: 28, icon: "✦✦✦✦" },
            ].map(marco => {
              const achieved = checkedDays.includes(marco.day);
              return (
                <div
                  key={marco.day}
                  className="px-4 py-3 rounded text-center"
                  style={{
                    backgroundColor: achieved
                      ? "var(--color-rose-muted)"
                      : "white",
                    border: `1px solid ${achieved ? "var(--color-rose-light)" : "var(--color-taupe-light)"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <p
                    className="font-display mb-1"
                    style={{
                      fontSize: "0.8rem",
                      color: achieved
                        ? "var(--color-rose)"
                        : "var(--color-taupe-light)",
                    }}
                  >
                    {marco.icon}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: achieved
                        ? "var(--color-rose)"
                        : "var(--color-taupe)",
                    }}
                  >
                    {marco.label}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-taupe)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {achieved ? "Conquistado" : `Dia ${marco.day}`}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Grid de dias */}
          <div>
            <p
              className="font-body mb-3"
              style={{
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-taupe)",
              }}
            >
              Marque os dias concluídos
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
                const checked = checkedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className="day-check"
                    style={{
                      backgroundColor: checked ? "var(--color-rose)" : "white",
                      borderColor: checked
                        ? "var(--color-rose)"
                        : "var(--color-taupe-light)",
                      color: checked ? "white" : "var(--color-taupe)",
                    }}
                    title={`Dia ${day}`}
                  >
                    {checked ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <span style={{ fontSize: "0.7rem" }}>{day}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <p
              className="font-body mt-3"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-taupe)",
                fontStyle: "italic",
              }}
            >
              {checkedDays.length === 0
                ? "Clique nos dias para marcar como concluído."
                : checkedDays.length === 28
                  ? "Parabéns! Você completou os 28 dias."
                  : `${checkedDays.length} de 28 dias concluídos. Continue.`}
            </p>
          </div>

          <div
            className="mt-6 px-4 py-3 rounded"
            style={{
              backgroundColor: "var(--color-ivory-dark)",
              borderLeft: "3px solid var(--color-taupe)",
            }}
          >
            <p
              className="font-body"
              style={{
                fontSize: "0.85rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.6,
              }}
            >
              Constância não é fazer tudo perfeitamente. É aparecer na maioria
              dos dias, mesmo quando não está com vontade. Cada dia marcado aqui
              é evidência do seu compromisso com você mesma.
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              35
            </p>
          </div>
        </section>

        {/* ── PÁGINA 36: FAQ ─────────────────────────────────── */}
        <section
          id="faq"
          className="page-card mb-6 animate-fade-in"
          style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2
            className="font-display mb-2"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "var(--color-charcoal)",
              fontWeight: 400,
            }}
          >
            Perguntas frequentes
          </h2>
          <p
            className="font-display mb-6"
            style={{
              fontSize: "1rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            Respostas diretas para as dúvidas mais comuns.
          </p>

          <div
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-rose)",
              marginBottom: "2rem",
            }}
          />

          <div className="space-y-3" style={{ maxWidth: "600px" }}>
            {faq.map((item, i) => (
              <div
                key={i}
                className="px-5 py-4 rounded"
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "white" : "var(--color-ivory-dark)",
                  border: "1px solid var(--color-taupe-light)",
                }}
              >
                <p
                  className="font-body mb-2"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.q}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-warm-gray)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <p
              className="font-body"
              style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
            >
              36
            </p>
          </div>
        </section>

        {/* ── NOVA SEÇÃO: APOIO/SUPORTE ───────────────────── */}
        <SectionApoioSuporte />

        {/* ── PÁGINA 37: APOIO E CONTINUIDADE ─────────────── */}
        <section
          id="continuidade"
          className="page-card mb-8 overflow-hidden animate-fade-in"
          style={{ padding: 0 }}
        >
          <div className="relative">
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${MOTIVACAO_BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.25,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-ivory) 0%, rgba(249,246,240,0.92) 100%)",
              }}
            />

            <div
              className="relative z-10"
              style={{ padding: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              <SectionLabel>Encerramento</SectionLabel>
              <h2
                className="font-display mb-4"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "var(--color-charcoal)",
                  fontWeight: 400,
                  maxWidth: "480px",
                  lineHeight: 1.2,
                }}
              >
                Apoio e continuidade
              </h2>

              <div
                style={{
                  width: "2.5rem",
                  height: "1px",
                  backgroundColor: "var(--color-rose)",
                  marginBottom: "2rem",
                }}
              />

              <div style={{ maxWidth: "560px" }}>
                <p
                  className="font-body mb-4"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  Você chegou até aqui. Isso não é pouca coisa. Em um mundo
                  cheio de distrações, você escolheu aparecer para si mesma, dia
                  após dia, com o que tinha disponível.
                </p>
                <p
                  className="font-body mb-6"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  Na prática, constância tende a vencer intensidade isolada. Um
                  treino de 10 minutos feito com presença vale mais do que uma
                  hora adiada indefinidamente.
                </p>

                <div
                  className="px-5 py-4 rounded mb-6"
                  style={{
                    backgroundColor: "var(--color-rose-muted)",
                    borderLeft: "3px solid var(--color-rose)",
                  }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--color-charcoal)",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    "O corpo que você tem hoje é o resultado de tudo que você
                    fez até agora. O corpo que você terá amanhã depende do que
                    você escolhe fazer a partir de hoje."
                  </p>
                </div>

                <div className="space-y-3">
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--color-taupe)",
                    }}
                  >
                    Próximos passos
                  </p>
                  {[
                    "Repita o desafio evoluindo de caminho com segurança",
                    "Acompanhe esta área para a liberação dos vídeos de demonstração",
                    "Mantenha o checklist e os sinais de progresso como guia semanal",
                    "Quando o canal de suporte abrir, ele aparecerá na seção de apoio",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded"
                      style={{
                        backgroundColor: "white",
                        border: "1px solid var(--color-taupe-light)",
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-rose-light)",
                          flexShrink: 0,
                        }}
                      />
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--color-charcoal-light)",
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between mt-10">
                <div>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--color-charcoal)",
                      fontWeight: 500,
                    }}
                  >
                    Calistenia Feminina Sob Medida
                  </p>
                  <p
                    className="font-body mt-0.5"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-taupe)",
                      fontStyle: "italic",
                    }}
                  >
                    Desafio de 28 dias · Constância que transforma
                  </p>
                </div>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-taupe-light)",
                  }}
                >
                  37
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
