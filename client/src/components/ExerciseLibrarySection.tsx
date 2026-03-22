import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { Search, Target, Activity, BarChart } from "lucide-react";

const EXERCISE_METADATA: Record<string, { benefit: string; focus: string }> = {
  "agachamento-assistido": {
    benefit: "Sentar e levantar com mais segurança.",
    focus: "Coxas e Bumbum",
  },
  "agachamento-parcial": {
    benefit: "Fortalecer as pernas sem forçar joelhos.",
    focus: "Coxas e Pernas",
  },
  "alongamento-de-quadril": {
    benefit: "Aliviar o peso na frente da coxa.",
    focus: "Quadril e Coxas",
  },
  "alongamento-posterior": {
    benefit: "Soltar a parte de trás das pernas.",
    focus: "Atrás das Coxas",
  },
  "avanco-curto-com-apoio": {
    benefit: "Ganhar firmeza e fôlego ao caminhar.",
    focus: "Pernas e Equilíbrio",
  },
  "bird-dog": {
    benefit: "Proteção e força para sua coluna.",
    focus: "Costas e Bumbum",
  },
  "dead-bug": {
    benefit: "Fortalecer a barriga protegendo a lombar.",
    focus: "Abdômen e Coluna",
  },
  "elevacao-de-joelhos-leve": {
    benefit: "Aquecer o corpo e melhorar fôlego.",
    focus: "Respiração e Pernas",
  },
  "elevacao-de-panturrilha": {
    benefit: "Fortalecer as canelas e tornozelos.",
    focus: "Panturrilhas",
  },
  "elevacao-pelvica": {
    benefit: "Firmeza no quadril e postura alinhada.",
    focus: "Bumbum e Quadris",
  },
  "good-morning-sem-peso": {
    benefit: "Aprender a inclinar o corpo sem dor.",
    focus: "Costas e Bumbum",
  },
  "marcha-parada": {
    benefit: "Ativar a circulação e aquecer corpo.",
    focus: "Fôlego e Pernas",
  },
  "marcha-parada-leve": {
    benefit: "Despertar o corpo com movimentos suaves.",
    focus: "Circulação e Pernas",
  },
  "mobilidade-de-coluna": {
    benefit: "Destravar as costas e ombros travados.",
    focus: "Meio das Costas",
  },
  "mobilidade-de-quadril": {
    benefit: "Soltar o quadril para caminhar melhor.",
    focus: "Juntas do Quadril",
  },
  "polichinelo-sem-salto": {
    benefit: "Melhorar o fôlego sem pular.",
    focus: "Fôlego e Ombros",
  },
  "ponte-de-gluteos": {
    benefit: "Fortalecer bumbum deitada e sem impacto.",
    focus: "Bumbum e Coxas",
  },
  "ponte-de-gluteos-com-pausa": {
    benefit: "Sentir o bumbum trabalhar de verdade.",
    focus: "Bumbum Firme",
  },
  "prancha-adaptada": {
    benefit: "Sustentação do corpo com mais facilidade.",
    focus: "Barriga e Costas",
  },
  "push-up-inclinada": {
    benefit: "Firmeza nos braços e peitoral.",
    focus: "Braços e Peito",
  },
  "respiracao-e-mobilidade-leve": {
    benefit: "Relaxar e aliviar tensões do dia.",
    focus: "Alívio e Respiração",
  },
  "respiracao-profunda": {
    benefit: "Acalmar a mente e soltar corpo.",
    focus: "Calma e Pulmões",
  },
  "step-touch-lateral": {
    benefit: "Aquecer com passos para os lados.",
    focus: "Fôlego e Quadril",
  },
  "wall-push-up": {
    benefit: "Fortalecer braços usando só a parede.",
    focus: "Braços e Peito",
  },
};
import { SectionLabel } from "@/components/NewSectionsV2";
import ExerciseGallery from "@/components/ExerciseGallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getExerciseGuideEntries } from "@/lib/exerciseGuide";
import { getExerciseMedia } from "@/lib/exerciseMedia";
import {
  clearPendingLibraryFocus,
  readPendingLibraryFocus,
} from "@/lib/libraryFocus";

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export default function ExerciseLibrarySection() {
  const allEntries = getExerciseGuideEntries();
  const [query, setQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [highlightedExerciseId, setHighlightedExerciseId] = useState<
    string | null
  >(null);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = normalizeSearch(deferredQuery);
  const filteredEntries =
    normalizedQuery.length === 0
      ? allEntries
      : allEntries.filter(entry => {
          const haystack = normalizeSearch(
            `${entry.display_name} ${entry.objetivo} ${entry.cues.join(" ")}`
          );
          return haystack.includes(normalizedQuery);
        });

  useEffect(() => {
    const pendingExerciseId = readPendingLibraryFocus();
    if (!pendingExerciseId) return;

    const targetEntry = allEntries.find(
      entry => entry.exercise_id === pendingExerciseId
    );

    clearPendingLibraryFocus();
    if (!targetEntry) return;

    setQuery(targetEntry.display_name);
    setOpenItems([targetEntry.exercise_id]);
    setHighlightedExerciseId(targetEntry.exercise_id);
  }, [allEntries]);

  useEffect(() => {
    if (!highlightedExerciseId) return;

    const targetStillVisible = filteredEntries.some(
      entry => entry.exercise_id === highlightedExerciseId
    );
    if (!targetStillVisible) return;

    const frameId = window.requestAnimationFrame(() => {
      const targetElement = document.getElementById(
        `exercise-card-${highlightedExerciseId}`
      );
      targetElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    const timeoutId = window.setTimeout(() => {
      setHighlightedExerciseId(current =>
        current === highlightedExerciseId ? null : current
      );
    }, 3200);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [filteredEntries, highlightedExerciseId]);

  return (
    <section
      id="biblioteca-exercicios"
      className="page-card mb-6 animate-fade-in"
      style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
    >
      <SectionLabel>Biblioteca</SectionLabel>
      <h2
        className="font-display mb-2"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          color: "var(--color-charcoal)",
          fontWeight: 400,
        }}
      >
        Biblioteca de exercícios
      </h2>
      <p
        className="font-display mb-6"
        style={{
          fontSize: "1rem",
          color: "var(--color-taupe)",
          fontStyle: "italic",
        }}
      >
        Guia técnico com execução segura, sinais de atenção e referência visual
        para os 24 exercícios.
      </p>

      <div
        style={{
          width: "2.5rem",
          height: "1px",
          backgroundColor: "var(--color-rose)",
          marginBottom: "1.5rem",
        }}
      />

      <label
        htmlFor="exercise-library-search"
        className="font-body block mb-2"
        style={{
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-taupe)",
        }}
      >
        Buscar exercício
      </label>
      <div className="relative mb-3">
        <Search
          size={14}
          style={{
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-taupe)",
          }}
        />
        <input
          id="exercise-library-search"
          type="text"
          value={query}
          onChange={event => {
            const nextQuery = event.target.value;
            startTransition(() => setQuery(nextQuery));
          }}
          placeholder="Ex.: agachamento, prancha, mobilidade..."
          className="w-full font-body rounded outline-none"
          style={{
            border: "1px solid var(--color-taupe-light)",
            backgroundColor: "white",
            color: "var(--color-charcoal-light)",
            fontSize: "0.88rem",
            padding: "0.65rem 0.75rem 0.65rem 2.2rem",
          }}
        />
      </div>

      <p
        className="font-body mb-5"
        style={{ fontSize: "0.78rem", color: "var(--color-warm-gray)" }}
      >
        {filteredEntries.length} de {allEntries.length} exercícios
      </p>

      {filteredEntries.length === 0 ? (
        <div
          className="px-4 py-3 rounded"
          style={{
            backgroundColor: "var(--color-ivory-dark)",
            borderLeft: "3px solid var(--color-taupe)",
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.82rem",
              color: "var(--color-charcoal-light)",
            }}
          >
            Nenhum exercício encontrado para a busca informada.
          </p>
        </div>
      ) : (
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={value => setOpenItems(value as string[])}
        >
          {filteredEntries.map(entry => {
            const media = getExerciseMedia(entry.display_name) || {
              mediaType: "single_image",
              image: {
                src: "/exercises/placeholder-wide.png",
                alt: "Referência visual de " + entry.display_name,
              },
            };
            const isHighlighted = highlightedExerciseId === entry.exercise_id;

            return (
              <AccordionItem
                key={entry.exercise_id}
                id={`exercise-card-${entry.exercise_id}`}
                value={entry.exercise_id}
                className="rounded mb-3 px-4"
                style={{
                  border: "1px solid var(--color-taupe-light)",
                  backgroundColor: isHighlighted
                    ? "var(--color-teal-muted)"
                    : "white",
                  boxShadow: isHighlighted
                    ? "0 0 0 1px var(--color-teal)"
                    : "none",
                  scrollMarginTop: "1.5rem",
                  transition:
                    "background-color 220ms ease, box-shadow 220ms ease",
                }}
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="text-left flex-1 pr-2">
                    <p
                      className="font-body mb-1"
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--color-charcoal)",
                        fontWeight: 500,
                      }}
                    >
                      {entry.display_name}
                    </p>
                    <span
                      className="font-body inline-block"
                      style={{
                        fontSize: "0.64rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-rose)",
                        backgroundColor: "var(--color-rose-muted)",
                        padding: "0.1rem 0.45rem",
                        borderRadius: "2px",
                      }}
                    >
                      Nível: {entry.nivel_complexidade}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="mb-5">
                    <ExerciseGallery
                      exerciseName={entry.display_name}
                      media={media as any}
                    />
                  </div>

                  {/* Cards de Destaque (Resumo Rápido) */}
                  <div
                    className="grid grid-cols-3 gap-3 mb-6"
                    style={{
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    {[
                      {
                        label: "Bom para",
                        value: entry.objetivo,
                        icon: Target,
                        bg: "var(--color-rose-muted)",
                        color: "var(--color-rose)",
                      },
                      {
                        label: "Foco",
                        value: entry.musculos_capacidades[0] || "Geral",
                        icon: Activity,
                        bg: "var(--color-teal-muted)",
                        color: "var(--color-teal)",
                      },
                      {
                        label: "Nível",
                        value: entry.nivel_complexidade,
                        icon: BarChart,
                        bg: "var(--color-ivory-dark)",
                        color: "var(--color-taupe)",
                      },
                    ].map((card, i) => {
                      // Busca os metadados humanizados para o exercício
                      const metadata = EXERCISE_METADATA[entry.exercise_id];

                      const displayValue =
                        card.label === "Bom para"
                          ? metadata?.benefit || card.value
                          : card.label === "Foco"
                            ? metadata?.focus || card.value
                            : card.value;

                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center p-2 rounded-lg text-center transition-transform hover:scale-[1.02]"
                          style={{
                            backgroundColor: card.bg,
                            border: `1px solid ${card.color}20`,
                            minHeight: "52px",
                          }}
                        >
                          <div
                            className="mb-1 flex items-center gap-1.5"
                            style={{ color: card.color }}
                          >
                            <card.icon size={12} strokeWidth={2.5} />
                            <span
                              className="font-display uppercase"
                              style={{
                                fontSize: "0.55rem",
                                fontWeight: 700,
                                letterSpacing: "0.05em",
                                opacity: 0.8,
                              }}
                            >
                              {card.label}
                            </span>
                          </div>
                          <p
                            className="font-body leading-tight"
                            style={{
                              fontSize: "0.68rem",
                              color: "var(--color-charcoal-light)",
                              fontWeight: 600,
                            }}
                          >
                            {displayValue}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(290px, 100%), 1fr))",
                    }}
                  >
                    <div
                      className="px-4 py-3 rounded"
                      style={{ backgroundColor: "var(--color-ivory-dark)" }}
                    >
                      <p
                        className="font-body mb-2"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Objetivo
                      </p>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-charcoal-light)",
                          lineHeight: 1.65,
                        }}
                      >
                        {entry.objetivo}
                      </p>
                    </div>

                    <div
                      className="px-4 py-3 rounded"
                      style={{ backgroundColor: "var(--color-teal-muted)" }}
                    >
                      <p
                        className="font-body mb-2"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-teal)",
                          fontWeight: 500,
                        }}
                      >
                        Músculos e capacidades
                      </p>
                      <ul className="space-y-1">
                        {entry.musculos_capacidades.map(item => (
                          <li
                            key={item}
                            className="font-body"
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-charcoal-light)",
                              lineHeight: 1.6,
                            }}
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p
                      className="font-body mb-2"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-taupe)",
                        fontWeight: 500,
                      }}
                    >
                      Execução passo a passo
                    </p>
                    <ol className="space-y-1">
                      {entry.execucao_passo_a_passo.map(step => (
                        <li
                          key={step}
                          className="font-body"
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-charcoal-light)",
                            lineHeight: 1.6,
                          }}
                        >
                          • {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div
                    className="mt-4 grid gap-3"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
                    }}
                  >
                    <div
                      className="px-3 py-2 rounded"
                      style={{ backgroundColor: "var(--color-ivory-dark)" }}
                    >
                      <p
                        className="font-body mb-1"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Início
                      </p>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-charcoal-light)",
                          lineHeight: 1.6,
                        }}
                      >
                        {entry.inicio_meio_fim.inicio}
                      </p>
                    </div>
                    <div
                      className="px-3 py-2 rounded"
                      style={{ backgroundColor: "var(--color-ivory-dark)" }}
                    >
                      <p
                        className="font-body mb-1"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Meio
                      </p>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-charcoal-light)",
                          lineHeight: 1.6,
                        }}
                      >
                        {entry.inicio_meio_fim.meio}
                      </p>
                    </div>
                    <div
                      className="px-3 py-2 rounded"
                      style={{ backgroundColor: "var(--color-ivory-dark)" }}
                    >
                      <p
                        className="font-body mb-1"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Fim
                      </p>
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-charcoal-light)",
                          lineHeight: 1.6,
                        }}
                      >
                        {entry.inicio_meio_fim.fim}
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-4 grid gap-4"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
                    }}
                  >
                    <div>
                      <p
                        className="font-body mb-2"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Principais erros
                      </p>
                      <ul className="space-y-1">
                        {entry.principais_erros.map(item => (
                          <li
                            key={item}
                            className="font-body"
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--color-charcoal-light)",
                              lineHeight: 1.55,
                            }}
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p
                        className="font-body mb-2"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Adaptações para iniciantes
                      </p>
                      <ul className="space-y-1">
                        {entry.adaptacoes_iniciantes.map(item => (
                          <li
                            key={item}
                            className="font-body"
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--color-charcoal-light)",
                              lineHeight: 1.55,
                            }}
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="mt-4 grid gap-4"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
                    }}
                  >
                    <div>
                      <p
                        className="font-body mb-2"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Sinais de atenção
                      </p>
                      <ul className="space-y-1">
                        {entry.sinais_atencao.map(item => (
                          <li
                            key={item}
                            className="font-body"
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--color-charcoal-light)",
                              lineHeight: 1.55,
                            }}
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p
                        className="font-body mb-2"
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-taupe)",
                          fontWeight: 500,
                        }}
                      >
                        Cues
                      </p>
                      <ul className="space-y-1">
                        {entry.cues.map(item => (
                          <li
                            key={item}
                            className="font-body"
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--color-charcoal-light)",
                              lineHeight: 1.55,
                            }}
                          >
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="mt-4 px-4 py-3 rounded"
                    style={{
                      backgroundColor: "var(--color-rose-muted)",
                      borderLeft: "3px solid var(--color-rose)",
                    }}
                  >
                    <p
                      className="font-body mb-1"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-rose)",
                        fontWeight: 500,
                      }}
                    >
                      Observação para o público-alvo
                    </p>
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-charcoal-light)",
                        lineHeight: 1.6,
                      }}
                    >
                      {entry.observacao_publico_alvo}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p
                      className="font-body mb-2"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-taupe)",
                        fontWeight: 500,
                      }}
                    >
                      Fontes
                    </p>
                    <ul className="space-y-1.5">
                      {entry.fontes.map(source => (
                        <li key={source.url}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-body underline"
                            style={{
                              fontSize: "0.78rem",
                              color: "var(--color-rose)",
                              textDecorationThickness: "1px",
                            }}
                          >
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </section>
  );
}
