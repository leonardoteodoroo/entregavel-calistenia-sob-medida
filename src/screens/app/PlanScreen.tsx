import { ScreenFrame } from '../../components/ScreenFrame';
import { useAppContext } from '../../context/AppContext';

const weekLabels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

export const PlanScreen = () => {
  const { planDays, todayDayNumber, state } = useAppContext();

  return (
    <ScreenFrame title="Plano" subtitle="Jornada guiada de 28 dias">
      <div className="space-y-5">
        {weekLabels.map((weekLabel, weekIndex) => {
          const weekNumber = weekIndex + 1;
          const days = planDays.filter((day) => day.weekNumber === weekNumber);

          return (
            <section key={weekLabel} className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-muted-text)]">
                {weekLabel}
              </h2>
              <div className="grid gap-2">
                {days.map((day) => {
                  const done = state.completedDays.includes(day.dayNumber);
                  const current = day.dayNumber === todayDayNumber;

                  return (
                    <article
                      key={day.dayNumber}
                      className={`rounded-2xl border px-3 py-3 ${
                        done
                          ? 'border-[color:var(--color-accent)] bg-[color:rgba(41,201,184,0.12)]'
                          : current
                            ? 'border-[color:var(--color-brand)] bg-[color:rgba(255,122,89,0.12)]'
                            : 'border-white/10 bg-[color:var(--color-surface)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          Dia {day.dayNumber} • {day.workoutName}
                        </p>
                        <span className="text-xs text-[color:var(--color-muted-text)]">{day.durationMinutes}m</span>
                      </div>
                      <p className="mt-1 text-xs text-[color:var(--color-muted-text)]">{day.focus}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </ScreenFrame>
  );
};
