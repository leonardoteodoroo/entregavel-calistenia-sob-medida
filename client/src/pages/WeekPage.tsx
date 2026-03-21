import DayCard from "@/components/DayCard";
import Layout from "@/components/Layout";
import { weeks, days } from "@/lib/planData";
import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import NotFound from "./NotFound";

interface WeekPageProps {
  params: {
    week?: string;
    day?: string;
  };
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

function getHeaderColor(weekNumber: number) {
  if (weekNumber === 2) {
    return {
      background: "var(--color-rose-muted)",
      border: "var(--color-rose-light)",
      label: "var(--color-rose)",
    };
  }
  if (weekNumber === 3) {
    return {
      background: "var(--color-ivory-dark)",
      border: "var(--color-taupe-light)",
      label: "var(--color-taupe)",
    };
  }
  return {
    background: "var(--color-teal-muted)",
    border: "var(--color-teal-light)",
    label: "var(--color-teal)",
  };
}

export default function WeekPage({ params }: WeekPageProps) {
  const [, setLocation] = useLocation();
  const weekNumber = Number(params.week);
  const dayParam = params.day ? Number(params.day) : undefined;

  const week = weeks.find(item => item.number === weekNumber);
  const weekDays = useMemo(
    () => days.filter(day => Math.ceil(day.day / 7) === weekNumber),
    [weekNumber]
  );

  useEffect(() => {
    if (!dayParam) return;
    const target = document.getElementById(`dia-${dayParam}`);
    if (!target) return;

    requestAnimationFrame(() => {
      const offset = window.innerWidth < 1024 ? 88 : 20;
      const targetY =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    });
  }, [dayParam, weekNumber]);

  if (!week || Number.isNaN(weekNumber)) {
    return <NotFound />;
  }

  if (
    dayParam &&
    (Number.isNaN(dayParam) ||
      dayParam < week.days[0] ||
      dayParam > week.days[week.days.length - 1])
  ) {
    return <NotFound />;
  }

  const headerColor = getHeaderColor(weekNumber);
  const prevWeek = weekNumber > 1 ? weekNumber - 1 : null;
  const nextWeek = weekNumber < 4 ? weekNumber + 1 : null;

  return (
    <Layout>
      <div
        style={{
          padding: 0,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <div
          id={`semana-${weekNumber}`}
          className="mx-auto mb-4 mt-2"
          style={{
            maxWidth: "780px",
            padding: "1.25rem 1.5rem",
            backgroundColor: headerColor.background,
            border: `1px solid ${headerColor.border}`,
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-3">
            <WeekBadge week={weekNumber} />
            <div>
              <p
                className="font-body"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: headerColor.label,
                }}
              >
                Semana {week.number} · {week.subtitle}
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-charcoal)",
                  fontWeight: 500,
                }}
              >
                {week.title}
              </p>
              <p
                className="font-body mt-1"
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-charcoal-light)",
                }}
              >
                {week.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {prevWeek && (
              <button
                onClick={() => setLocation(`/semana/${prevWeek}`)}
                className="px-3 py-2 rounded font-body"
                style={{
                  fontSize: "0.72rem",
                  backgroundColor: "white",
                  border: "1px solid var(--color-taupe-light)",
                  color: "var(--color-charcoal)",
                }}
              >
                Ir para semana {prevWeek}
              </button>
            )}
            {nextWeek && (
              <button
                onClick={() => setLocation(`/semana/${nextWeek}`)}
                className="px-3 py-2 rounded font-body"
                style={{
                  fontSize: "0.72rem",
                  backgroundColor: "white",
                  border: "1px solid var(--color-taupe-light)",
                  color: "var(--color-charcoal)",
                }}
              >
                Ir para semana {nextWeek}
              </button>
            )}
            <button
              onClick={() => setLocation("/checklist")}
              className="px-3 py-2 rounded font-body"
              style={{
                fontSize: "0.72rem",
                backgroundColor: "white",
                border: "1px solid var(--color-taupe-light)",
                color: "var(--color-charcoal)",
              }}
            >
              Abrir checklist
            </button>
          </div>
        </div>

        {weekDays.map(day => (
          <DayCard key={day.day} plan={day} weekNumber={weekNumber} />
        ))}
      </div>
    </Layout>
  );
}
