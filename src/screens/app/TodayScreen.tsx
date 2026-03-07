import { ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ScreenFrame } from '../../components/ScreenFrame';
import { useAppContext } from '../../context/AppContext';

export const TodayScreen = () => {
  const navigate = useNavigate();
  const { state, todayDayNumber, todayPlanDay, progressSnapshot } = useAppContext();

  const completedToday = state.completedDays.includes(todayDayNumber);

  if (!todayPlanDay) {
    return (
      <ScreenFrame title="Hoje" subtitle="Você concluiu os 28 dias.">
        <div className="rounded-3xl border border-[color:var(--color-accent)] bg-[color:rgba(41,201,184,0.12)] p-5">
          <p className="text-white">Parabéns. Seu ciclo está completo. Revise o plano para iniciar uma nova rodada.</p>
        </div>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame
      title="Hoje"
      subtitle={`Dia ${todayPlanDay.dayNumber} • ${todayPlanDay.durationMinutes} min`}
      rightSlot={
        <div className="inline-flex items-center gap-1 rounded-full bg-[color:rgba(255,122,89,0.2)] px-3 py-1 text-xs font-semibold text-[color:var(--color-brand)]">
          <Flame className="h-3.5 w-3.5" /> {progressSnapshot.streak}
        </div>
      }
    >
      <section className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted-text)]">Treino escolhido para hoje</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{todayPlanDay.workoutName}</h2>
          <p className="mt-1 text-sm text-[color:var(--color-muted-text)]">{todayPlanDay.reason}</p>
          <p className="mt-3 text-xs text-[color:var(--color-accent)]">Foco: {todayPlanDay.focus}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white">
          {completedToday ? (
            <div className="flex items-center gap-2 font-semibold text-[color:var(--color-accent)]">
              <CheckCircle2 className="h-4 w-4" />
              Treino de hoje já concluído
            </div>
          ) : (
            <p>Conclua este treino antes de abrir conteúdos extras. Hoje é a prioridade.</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate('/app/hoje/treino')}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black"
        >
          {completedToday ? 'Rever treino do dia' : 'Iniciar treino de hoje'}
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link
            to="/app/plano"
            className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-3 py-3 text-center text-white"
          >
            Ver plano 28 dias
          </Link>
          <Link
            to="/app/biblioteca"
            className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] px-3 py-3 text-center text-white"
          >
            Abrir biblioteca
          </Link>
        </div>
      </section>
    </ScreenFrame>
  );
};
