import { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { PlanProgressCard } from "../../components/PlanProgressCard";
import { ScreenFrame } from "../../components/ScreenFrame";
import { useAppContext } from "../../context/AppContext";
import { getWeeklyPlanView, type WeekPlanViewModel } from "../../lib/planRules";
import type { PlanDay } from "../../types/plan";

const dayCardClass = (
  day: PlanDay,
  completedDays: number[],
  todayDayNumber: number,
  weekLocked: boolean,
) => {
  const done = completedDays.includes(day.dayNumber);
  const current = day.dayNumber === todayDayNumber;

  if (weekLocked) {
    return "rounded-xl border border-[color:var(--color-border-disabled)] bg-[color:var(--color-surface-section)] px-3 py-3 opacity-70";
  }

  if (done) {
    return "rounded-xl border border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-surface)] px-3 py-3";
  }

  if (current) {
    return "rounded-xl border border-[color:var(--color-action-primary)] bg-[color:var(--color-action-secondary-hover)] px-3 py-3";
  }

  return "rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-3";
};

const WeekDetail = ({
  week,
  completedDays,
  todayDayNumber,
}: {
  week: WeekPlanViewModel;
  completedDays: number[];
  todayDayNumber: number;
}) => (
  <div className="grid gap-2">
    {week.days.map((day) => {
      const done = completedDays.includes(day.dayNumber);
      const current = day.dayNumber === todayDayNumber;

      return (
        <article
          key={day.dayNumber}
          className={dayCardClass(
            day,
            completedDays,
            todayDayNumber,
            week.isLocked,
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              Dia {day.dayNumber} • {day.workoutName}
            </p>
            <span className="text-xs text-[color:var(--color-text-secondary)]">
              {day.durationMinutes}m
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              {day.focus}
            </p>
            {week.isLocked ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-[color:var(--color-text-muted)]">
                <Lock className="h-3 w-3" /> Bloqueado
              </span>
            ) : done ? (
              <span className="text-[11px] font-semibold text-[color:var(--color-status-success)]">
                Concluído
              </span>
            ) : current ? (
              <span className="text-[11px] font-semibold text-[color:var(--color-action-primary)]">
                Hoje
              </span>
            ) : null}
          </div>
        </article>
      );
    })}
  </div>
);

export const PlanScreen = () => {
  const { planDays, todayDayNumber, state, progressSnapshot } = useAppContext();
  const [showFullPlan, setShowFullPlan] = useState(false);

  const weeklyPlan = useMemo(
    () => getWeeklyPlanView(planDays, todayDayNumber, state.completedDays),
    [planDays, todayDayNumber, state.completedDays],
  );

  return (
    <ScreenFrame title="Plano" subtitle="Jornada guiada de 28 dias">
      <div className="space-y-4">
        <PlanProgressCard
          completedDaysCount={progressSnapshot.completedDaysCount}
          currentDayNumber={todayDayNumber}
          totalDays={planDays.length}
          currentLevel={state.quizProfile.currentLevel}
        />

        {!showFullPlan ? (
          <div className="space-y-4">
            {weeklyPlan.map((week) => {
              if (week.isCurrent) {
                return (
                  <section key={week.weekNumber} className="space-y-2">
                    <div className="rounded-xl border border-[color:var(--color-action-primary)] bg-[color:var(--color-action-secondary-hover)] px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-action-primary)]">
                        Semana {week.weekNumber}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-[color:var(--color-text-primary)]">
                        {week.weekTitle}
                      </h2>
                    </div>
                    <WeekDetail
                      week={week}
                      completedDays={state.completedDays}
                      todayDayNumber={todayDayNumber}
                    />
                  </section>
                );
              }

              return (
                <article
                  key={week.weekNumber}
                  className={`rounded-xl border px-4 py-4 transition ${
                    week.isLocked
                      ? "border-[color:var(--color-border-disabled)] bg-[color:var(--color-surface-section)] opacity-90"
                      : week.isCompleted
                        ? "border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-surface)]"
                        : "border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
                    Semana {week.weekNumber}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[color:var(--color-text-primary)]">
                    {week.weekTitle}
                  </h3>
                  <p className="mt-2 flex items-center gap-1 text-sm text-[color:var(--color-text-secondary)]">
                    {week.isLocked ? <Lock className="h-3.5 w-3.5" /> : null}
                    {week.isLocked
                      ? week.lockMessage
                      : week.isCompleted
                        ? "Semana concluída"
                        : "Semana disponível"}
                  </p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {weeklyPlan.map((week) => (
              <section key={week.weekNumber} className="space-y-2">
                <div
                  className={`rounded-xl border px-4 py-3 ${
                    week.isLocked
                      ? "border-[color:var(--color-border-disabled)] bg-[color:var(--color-surface-section)]"
                      : week.isCurrent
                        ? "border-[color:var(--color-action-primary)] bg-[color:var(--color-action-secondary-hover)]"
                        : week.isCompleted
                          ? "border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-surface)]"
                          : "border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
                        Semana {week.weekNumber}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-[color:var(--color-text-primary)]">
                        {week.weekTitle}
                      </h2>
                    </div>
                    {week.isLocked ? (
                      <Lock className="h-4 w-4 text-[color:var(--color-text-muted)]" />
                    ) : null}
                  </div>
                  {week.isLocked ? (
                    <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                      {week.lockMessage}
                    </p>
                  ) : week.isCompleted ? (
                    <p className="mt-2 text-sm text-[color:var(--color-status-success)]">
                      Semana concluída
                    </p>
                  ) : null}
                </div>

                <WeekDetail
                  week={week}
                  completedDays={state.completedDays}
                  todayDayNumber={todayDayNumber}
                />
              </section>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowFullPlan((previous) => !previous)}
          className="w-full rounded-lg border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-action-primary)]"
        >
          {showFullPlan ? "Voltar para semana vigente" : "Ver plano completo"}
        </button>
      </div>
    </ScreenFrame>
  );
};
