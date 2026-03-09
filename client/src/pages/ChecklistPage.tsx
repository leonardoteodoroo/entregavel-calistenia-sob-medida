import Layout from "@/components/Layout";
import { SectionLabel } from "@/components/NewSectionsV2";
import { CheckCircle2 } from "lucide-react";
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
          padding: "clamp(1rem, 3vw, 2rem)",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <section
          id="checklist"
          className="page-card mb-6 mt-2"
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
                      fontSize: "0.8rem",
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
              dos dias, mesmo quando não está com vontade.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setLocation(`/semana/${week}`)}
                className="px-3 py-2 rounded font-body"
                style={{
                  fontSize: "0.72rem",
                  backgroundColor: "white",
                  border: "1px solid var(--color-taupe-light)",
                  color: "var(--color-charcoal)",
                }}
              >
                Abrir semana {week}
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
