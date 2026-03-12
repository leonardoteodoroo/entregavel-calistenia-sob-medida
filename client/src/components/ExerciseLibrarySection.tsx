import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { Search } from "lucide-react";
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
      style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}
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
            const media = getExerciseMedia(entry.display_name);
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
                  {media ? (
                    <div className="mb-5">
                      <ExerciseGallery
                        exerciseName={entry.display_name}
                        media={media}
                      />
                    </div>
                  ) : (
                    <div
                      className="mb-5 px-4 py-3 rounded"
                      style={{ backgroundColor: "var(--color-ivory-dark)" }}
                    >
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--color-charcoal-light)",
                        }}
                      >
                        Referência visual indisponível no momento para este
                        exercício.
                      </p>
                    </div>
                  )}

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
