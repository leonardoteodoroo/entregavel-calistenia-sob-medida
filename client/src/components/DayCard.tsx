// ============================================================
// DayCard — Calistenia Feminina Sob Medida
// Design: Editorial Wellness Minimalista
// Card de treino diário com exercícios e intensidades
// ============================================================

import { BookOpen, Clock, Target, Info } from "lucide-react";
import { toSpaHashPath } from "@/content/siteConfig";
import { getExerciseGuideByName } from "@/lib/exerciseGuide";
import { setPendingLibraryFocus } from "@/lib/libraryFocus";
import type { DayPlan } from "@/lib/planData";
import { getExerciseMedia } from "@/lib/exerciseMedia";
import ExerciseGallery from "./ExerciseGallery";

interface DayCardProps {
  plan: DayPlan;
  weekNumber: number;
}

const weekColors: Record<
  number,
  { accent: string; muted: string; label: string }
> = {
  1: {
    accent: "var(--color-teal)",
    muted: "var(--color-teal-muted)",
    label: "Semana 1",
  },
  2: {
    accent: "var(--color-rose)",
    muted: "var(--color-rose-muted)",
    label: "Semana 2",
  },
  3: {
    accent: "var(--color-taupe)",
    muted: "var(--color-ivory-dark)",
    label: "Semana 3",
  },
  4: {
    accent: "var(--color-teal)",
    muted: "var(--color-teal-muted)",
    label: "Semana 4",
  },
};

export default function DayCard({ plan, weekNumber }: DayCardProps) {
  const colors = weekColors[weekNumber] || weekColors[1];
  const isPauseDay = plan.day === 7 || plan.day === 14 || plan.day === 21;
  const isMobilityDay = [3, 6, 10, 13, 17, 20, 24, 27].includes(plan.day);

  const orientationAccent = isPauseDay
    ? "var(--color-taupe)"
    : isMobilityDay
      ? "var(--color-teal)"
      : colors.accent;

  const orientationBg = isPauseDay
    ? "var(--color-ivory-dark)"
    : isMobilityDay
      ? "var(--color-teal-muted)"
      : colors.muted;

  return (
    <section
      id={`dia-${plan.day}`}
      className="page-card mx-auto animate-fade-in"
      style={{
        maxWidth: "780px",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        marginBottom: "1.5rem",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-body"
              style={{
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: colors.accent,
              }}
            >
              {colors.label} · Dia {plan.day}
            </span>
            {isMobilityDay && (
              <span
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                  backgroundColor: "var(--color-teal-muted)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "2px",
                }}
              >
                Mobilidade
              </span>
            )}
            {isPauseDay && (
              <span
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-taupe)",
                  backgroundColor: "var(--color-ivory-dark)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "2px",
                }}
              >
                Pausa guiada
              </span>
            )}
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
              color: "var(--color-charcoal)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {plan.title}
          </h2>
          <p
            className="font-display mt-1"
            style={{
              fontSize: "0.95rem",
              color: "var(--color-taupe)",
              fontStyle: "italic",
            }}
          >
            {plan.trainName}
          </p>
        </div>
        <span
          className="font-display shrink-0 ml-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: colors.muted,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {String(plan.day).padStart(2, "0")}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "var(--color-taupe-light)",
          marginBottom: "1.25rem",
        }}
      />

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-1.5">
          <Clock size={13} style={{ color: colors.accent }} />
          <span
            className="font-body"
            style={{
              fontSize: "0.8rem",
              color: "var(--color-charcoal-light)",
              fontWeight: 400,
            }}
          >
            {plan.duration}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target size={13} style={{ color: colors.accent }} />
          <span
            className="font-body"
            style={{
              fontSize: "0.8rem",
              color: "var(--color-charcoal-light)",
              fontWeight: 400,
            }}
          >
            {plan.focus}
          </span>
        </div>
      </div>

      {/* Orientation */}
      <div
        className="mb-6 px-4 py-3"
        style={{
          borderLeft: `3px solid ${orientationAccent}`,
          backgroundColor: orientationBg,
          borderRadius: "0 4px 4px 0",
        }}
      >
        <p
          className="font-display"
          style={{
            fontSize: "0.9rem",
            color: "var(--color-charcoal)",
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          {plan.orientation}
        </p>
      </div>

      {/* Exercises */}
      <div className="mb-6">
        <h3
          className="font-body mb-3"
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
          }}
        >
          Exercícios
        </h3>
        <div className="space-y-6">
          {plan.exercises.map((ex, i) => {
            const media = getExerciseMedia(ex.name);
            const guideEntry = getExerciseGuideByName(ex.name);
            return (
              <div
                key={i}
                className="exercise-card"
                style={{ borderLeftColor: colors.accent }}
              >
                {/* Galeria de imagens do exercício */}
                {media && (
                  <div className="mb-4">
                    <ExerciseGallery exerciseName={ex.name} media={media} />
                  </div>
                )}

                {/* Informações do exercício */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p
                      className="font-body"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-charcoal)",
                      }}
                    >
                      {ex.name}
                    </p>
                    {ex.note && (
                      <p
                        className="font-body mt-0.5"
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-warm-gray)",
                        }}
                      >
                        {ex.note}
                      </p>
                    )}
                    {guideEntry && (
                      <a
                        href={toSpaHashPath("/biblioteca")}
                        onClick={() =>
                          setPendingLibraryFocus(guideEntry.exercise_id)
                        }
                        className="font-body inline-flex items-center gap-1.5 mt-2 rounded transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{
                          fontSize: "0.74rem",
                          color: "var(--color-teal)",
                          fontWeight: 500,
                          textUnderlineOffset: "0.18em",
                        }}
                      >
                        <BookOpen size={13} />
                        Dúvida neste movimento? Ver na biblioteca
                      </a>
                    )}
                  </div>
                  <span
                    className="font-body text-right"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: colors.accent,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {ex.reps}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caminhos */}
      <div className="mb-5">
        <h3
          className="font-body mb-3"
          style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
          }}
        >
          Escolha seu caminho
        </h3>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
          }}
        >
          <div
            className="px-3 py-2.5 rounded"
            style={{ backgroundColor: "var(--color-teal-muted)" }}
          >
            <span className="badge-leve block mb-1">Caminho Leve</span>
            <p
              className="font-body"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-charcoal-light)",
              }}
            >
              {plan.caminhoLeve}
            </p>
          </div>
          <div
            className="px-3 py-2.5 rounded"
            style={{ backgroundColor: "var(--color-rose-muted)" }}
          >
            <span className="badge-padrao block mb-1">Caminho Base</span>
            <p
              className="font-body"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-charcoal-light)",
              }}
            >
              {plan.caminhoBase}
            </p>
          </div>
          <div
            className="px-3 py-2.5 rounded"
            style={{ backgroundColor: "oklch(0.96 0.008 10)" }}
          >
            <span className="badge-intensa block mb-1">Caminho Avançar</span>
            <p
              className="font-body"
              style={{
                fontSize: "0.78rem",
                color: "var(--color-charcoal-light)",
              }}
            >
              {plan.caminhoAvançar}
            </p>
          </div>
        </div>
      </div>

      {/* Adaptation */}
      <div
        className="flex gap-2.5 px-3 py-2.5 rounded mb-4"
        style={{ backgroundColor: "var(--color-ivory-dark)" }}
      >
        <Info
          size={14}
          className="shrink-0 mt-0.5"
          style={{ color: "var(--color-taupe)" }}
        />
        <div>
          <p
            className="font-body"
            style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-taupe)",
              marginBottom: "0.2rem",
            }}
          >
            Adaptação técnica
          </p>
          <p
            className="font-body"
            style={{ fontSize: "0.78rem", color: "var(--color-warm-gray)" }}
          >
            {plan.adaptacao}
          </p>
        </div>
      </div>

      {/* Observation */}
      <p
        className="font-body"
        style={{
          fontSize: "0.78rem",
          color: "var(--color-taupe)",
          fontStyle: "italic",
          borderTop: "1px solid var(--color-taupe-light)",
          paddingTop: "0.75rem",
        }}
      >
        {plan.observation}
      </p>

      {/* Page number */}
      <div
        className="absolute bottom-4 right-5 font-body"
        style={{ fontSize: "0.65rem", color: "var(--color-taupe-light)" }}
      >
        {plan.day + 6}
      </div>
    </section>
  );
}
