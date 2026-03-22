import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ChecklistPage() {
  const [, setLocation] = useLocation();
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
        ? prev.filter(current => current !== day)
        : [...prev, day];
      localStorage.setItem("cf-checked-days", JSON.stringify(next));
      return next;
    });
  };

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
          id="checklist"
          className="page-card mb-6 mt-2"
          style={{ padding: "clamp(5px, 3.5vw, 3.5rem)" }}
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
              marginBottom: "1.75rem",
            }}
          />

          <div className="mb-8">
            <div
              className="grid grid-cols-7 gap-1.5 sm:gap-3 mx-auto"
              style={{
                maxWidth: "420px",
                justifyItems: "center",
              }}
            >
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
                      width: "100%",
                      height: "auto",
                      aspectRatio: "1/1",
                      maxWidth: "42px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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

          {/* Visão Semanal Inspirada no lab */}
          <div
            className="mb-10 px-5 py-6 rounded"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-taupe-light)",
            }}
          >
            <p
              className="font-body mb-1"
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-rose)",
              }}
            >
              Visão Semanal
            </p>
            <p
              className="font-display mb-6"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-taupe)",
                fontStyle: "italic",
              }}
            >
              Sua regularidade dividida por fases
            </p>

            <div className="flex justify-between h-32 sm:h-36 gap-2 sm:gap-6 px-1">
              {[1, 2, 3, 4].map(week => {
                const daysInWeek = Array.from(
                  { length: 7 },
                  (_, i) => (week - 1) * 7 + i + 1
                );
                const completedCount = daysInWeek.filter(d =>
                  checkedDays.includes(d)
                ).length;
                const percentage = (completedCount / 7) * 100;

                return (
                  <div
                    key={week}
                    className="flex-1 flex flex-col items-center h-full group"
                  >
                    <div
                      className="relative w-full max-w-[2.2rem] sm:max-w-[3rem] h-full rounded sm:rounded-md overflow-hidden flex items-end"
                      style={{
                        backgroundColor: "var(--color-ivory-dark)",
                        border: "1px solid var(--color-taupe-light)",
                      }}
                    >
                      <div
                        className="w-full rounded-sm transition-all duration-1000 ease-out"
                        style={{
                          height: `${percentage}%`,
                          backgroundColor: "var(--color-rose)",
                        }}
                      />
                      {percentage > 0 && (
                        <div className="absolute inset-x-0 bottom-2 flex items-center justify-center">
                          <span
                            className="font-body"
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              color: "white",
                            }}
                          >
                            {completedCount}
                          </span>
                        </div>
                      )}
                    </div>
                    <span
                      className="font-body mt-3"
                      style={{
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                        color: "var(--color-taupe)",
                      }}
                    >
                      S0{week}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estatísticas Atuais */}
          <div className="mb-10">
            <p
              className="font-body mb-1"
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-rose)",
              }}
            >
              Estatística Atual
            </p>
            <p
              className="font-display mb-4"
              style={{
                fontSize: "0.95rem",
                color: "var(--color-taupe)",
                fontStyle: "italic",
              }}
            >
              Clareza de evolução em 28 dias
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                const firstMissing = Array.from(
                  { length: 28 },
                  (_, i) => i + 1
                ).find(d => !checkedDays.includes(d));

                let currentStreak = 0;
                if (checkedDays.length > 0) {
                  const sorted = [...checkedDays].sort((a, b) => b - a);
                  currentStreak = 1;
                  for (let i = 1; i < sorted.length; i++) {
                    if (sorted[i] === sorted[i - 1] - 1) currentStreak++;
                    else break;
                  }
                }

                return [
                  {
                    label: "Dias concluídos",
                    value: `${checkedDays.length}/28`,
                  },
                  {
                    label: "Sequência",
                    value: `${currentStreak} dias`,
                  },
                  {
                    label: "Semana atual",
                    value: Math.ceil((firstMissing || 28) / 7),
                  },
                  {
                    label: "Próximo dia",
                    value: firstMissing || "Fim",
                  },
                ];
              })().map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded sm:rounded-md border"
                  style={{ borderColor: "var(--color-taupe-light)" }}
                >
                  <p
                    className="font-body mb-1 uppercase"
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "var(--color-taupe)",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="font-display font-medium leading-none"
                    style={{
                      fontSize: "1.45rem",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Primeiro treino", day: 1, icon: "✦" },
              { label: "Primeira semana", day: 7, icon: "✦✦" },
              { label: "Metade do desafio", day: 14, icon: "✦✦✦" },
              { label: "Desafio concluído", day: 28, icon: "✦✦✦✦" },
            ].map(milestone => {
              const achieved = checkedDays.includes(milestone.day);
              return (
                <div
                  key={milestone.day}
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
                      fontSize: "0.80rem",
                      color: achieved
                        ? "var(--color-rose)"
                        : "var(--color-taupe-light)",
                    }}
                  >
                    {milestone.icon}
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
                    {milestone.label}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-taupe)",
                      marginTop: "0.2rem",
                    }}
                  >
                    {achieved ? "Conquistado" : `Dia ${milestone.day}`}
                  </p>
                </div>
              );
            })}
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
              dos dias, mesmo quando não está com vontade.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setLocation(`/semana/${week}`)}
                className="group flex items-center justify-between px-4 py-3.5 rounded sm:rounded-md font-body transition-all duration-300 active:scale-95 bg-white border hover:shadow-md"
                style={{
                  borderColor: "var(--color-taupe-light)",
                  width: "100%",
                }}
              >
                <span
                  className="font-medium transition-colors"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-charcoal)",
                  }}
                >
                  Semana {week}
                </span>
                <ChevronRight
                  size={16}
                  className="transition-all group-hover:translate-x-0.5"
                  style={{ color: "var(--color-rose)" }}
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
