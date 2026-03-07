import { ScreenFrame } from '../../components/ScreenFrame';
import { useAppContext } from '../../context/AppContext';

export const ProgressScreen = () => {
  const { progressSnapshot, state } = useAppContext();

  return (
    <ScreenFrame title="Progresso" subtitle="Clareza de evolução em 28 dias">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <article className="rounded-2xl bg-[color:var(--color-surface)] p-4">
            <p className="text-xs text-[color:var(--color-muted-text)]">Dias concluídos</p>
            <p className="mt-1 text-2xl font-bold text-white">{progressSnapshot.completedDaysCount}/28</p>
          </article>
          <article className="rounded-2xl bg-[color:var(--color-surface)] p-4">
            <p className="text-xs text-[color:var(--color-muted-text)]">Sequência</p>
            <p className="mt-1 text-2xl font-bold text-white">{progressSnapshot.streak} dias</p>
          </article>
          <article className="rounded-2xl bg-[color:var(--color-surface)] p-4">
            <p className="text-xs text-[color:var(--color-muted-text)]">Semana atual</p>
            <p className="mt-1 text-2xl font-bold text-white">{progressSnapshot.currentWeek}</p>
          </article>
          <article className="rounded-2xl bg-[color:var(--color-surface)] p-4">
            <p className="text-xs text-[color:var(--color-muted-text)]">Próximo dia</p>
            <p className="mt-1 text-2xl font-bold text-white">{progressSnapshot.nextDayNumber}</p>
          </article>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-[color:var(--color-muted-text)]">Mapa dos 28 dias</p>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }, (_, index) => {
              const day = index + 1;
              const done = state.completedDays.includes(day);
              return (
                <div
                  key={day}
                  className={`h-7 rounded-md text-center text-xs leading-7 ${
                    done ? 'bg-[color:var(--color-accent)] text-black' : 'bg-white/10 text-[color:var(--color-muted-text)]'
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
