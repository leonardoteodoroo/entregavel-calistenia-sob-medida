import { ScreenFrame } from "../../components/ScreenFrame";
import { useAppContext } from "../../context/AppContext";

export const ProgressScreen = () => {
  const { progressSnapshot, state } = useAppContext();

  return (
    <ScreenFrame title="Progresso" subtitle="Clareza de evolução em 28 dias">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <article className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Dias concluídos
            </p>
            <p className="mt-1 text-2xl font-bold text-[color:var(--color-text-primary)]">
              {progressSnapshot.completedDaysCount}/28
            </p>
          </article>
          <article className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Sequência
            </p>
            <p className="mt-1 text-2xl font-bold text-[color:var(--color-text-primary)]">
              {progressSnapshot.streak} dias
            </p>
          </article>
          <article className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Semana atual
            </p>
            <p className="mt-1 text-2xl font-bold text-[color:var(--color-text-primary)]">
              {progressSnapshot.currentWeek}
            </p>
          </article>
          <article className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Próximo dia
            </p>
            <p className="mt-1 text-2xl font-bold text-[color:var(--color-text-primary)]">
              {progressSnapshot.nextDayNumber}
            </p>
          </article>
        </div>

        <div className="rounded-2xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Mapa dos 28 dias
          </p>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }, (_, index) => {
              const day = index + 1;
              const done = state.completedDays.includes(day);
              return (
                <div
                  key={day}
                  className={`h-7 rounded-md text-center text-xs leading-7 ${
                    done
                      ? "bg-[color:var(--color-status-success)] text-[color:var(--color-text-on-dark)]"
                      : "bg-[color:var(--color-surface-section)] text-[color:var(--color-text-secondary)]"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
