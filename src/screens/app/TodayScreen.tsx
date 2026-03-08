import { CheckCircle2, Flame, Lock, Play, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { exerciseMap } from "../../data/exercises";
import { getUpcomingDayItems } from "../../lib/planRules";

export const TodayScreen = () => {
  const navigate = useNavigate();
  const { state, todayDayNumber, todayPlanDay, progressSnapshot, planDays } =
    useAppContext();

  const completedToday = state.completedDays.includes(todayDayNumber);
  const todayExercise = todayPlanDay
    ? exerciseMap.get(todayPlanDay.exerciseIds[0])
    : undefined;
  const upcomingDays = getUpcomingDayItems(planDays, todayDayNumber, 4);
  const greetingName = state.quizProfile.name;

  if (!todayPlanDay) {
    return (
      <div className="safe-pb flex min-h-full flex-col px-4 pb-6 pt-5 sm:px-5">
        <div className="rounded-xl border border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-surface)] p-5">
          <p className="text-[color:var(--color-text-primary)]">
            Parabéns. Seu ciclo está completo. Revise o plano para iniciar uma
            nova rodada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="safe-pb flex min-h-full flex-col px-4 pb-6 pt-5 sm:px-5">
      <section className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-page)] p-4 text-[color:var(--color-text-primary)] shadow-[var(--shadow-card)]">
        <header className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              Bom dia, {greetingName}
            </p>
            <h1 className="font-serif text-[32px] leading-tight text-[color:var(--color-text-primary)]">
              Pronta para hoje?
            </h1>
          </div>
          <div className="flex items-start justify-end">
            <button
              type="button"
              onClick={() => navigate("/app/perfil")}
              className="group relative inline-flex h-14 w-14 items-center justify-center rounded-lg border-2 border-[color:var(--color-border-disabled)] bg-[linear-gradient(180deg,var(--color-surface-card),var(--color-surface-section))] shadow-[var(--shadow-md)] transition hover:scale-[1.03] hover:border-[color:var(--color-action-primary)]"
              aria-label="Abrir perfil"
            >
              <span
                className="text-xl leading-none"
                role="img"
                aria-label="Foto de perfil"
              >
                🙋‍♀️
              </span>
              <span
                className="absolute -bottom-1.5 -right-2 inline-flex min-w-[2rem] items-center justify-center gap-1 rounded-full border border-[color:var(--color-status-warning)] bg-[color:var(--color-status-warning-surface)] px-2 py-1 text-[10px] font-bold leading-none text-[color:var(--color-status-warning)] shadow-[var(--shadow-sm)] transition group-hover:translate-y-[-1px]"
                aria-hidden="true"
              >
                <Flame className="h-3 w-3 fill-current" />
                <span>{progressSnapshot.streak}</span>
              </span>
              <span className="sr-only">
                Sequência atual de {progressSnapshot.streak} dias
              </span>
            </button>
          </div>
        </header>

        <article className="mb-5 rounded-xl border border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-surface)] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-[color:var(--color-action-primary)] p-2 text-[color:var(--color-text-on-brand)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[color:var(--color-action-primary)]">
                Foco: {state.derivedProfile?.focus ?? todayPlanDay.focus}
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                {state.derivedProfile?.todayInstruction ??
                  `Lembre-se do seu objetivo. ${todayPlanDay.durationMinutes} min é tudo que você precisa hoje.`}
              </p>
            </div>
          </div>
        </article>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[color:var(--color-text-primary)]">
            Treino do Dia
          </h2>
          <span className="rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-secondary)]">
            Dia {todayPlanDay.dayNumber} de 28
          </span>
        </div>

        <article className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-default)]">
          <img
            src={
              todayExercise?.image ??
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
            }
            alt={todayPlanDay.workoutName}
            className="h-[270px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-overlay-soft),var(--color-overlay-strong))]" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[color:var(--color-action-primary)] px-2 py-1 text-[11px] font-bold uppercase text-[color:var(--color-text-on-brand)]">
                {todayPlanDay.focus}
              </span>
              <span className="text-xs font-semibold text-[color:var(--color-text-on-dark)]">
                {todayPlanDay.durationMinutes} min
              </span>
            </div>
            <h3 className="text-[34px] font-serif leading-[1.02] text-[color:var(--color-text-on-dark)]">
              {todayPlanDay.workoutName}
            </h3>
            <button
              type="button"
              onClick={() => navigate("/app/hoje/treino")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)] transition hover:bg-[color:var(--color-action-primary-hover)]"
            >
              <Play className="h-4 w-4 fill-current" />
              {completedToday ? "REVER TREINO" : "INICIAR TREINO"}
            </button>
          </div>
        </article>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            Próximos Dias
          </h2>
          <div className="mt-2 space-y-2">
            {upcomingDays.map((item) => (
              <button
                key={item.dayNumber}
                type="button"
                onClick={() => navigate(item.targetRoute)}
                className="flex w-full items-center justify-between rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-3 text-left"
                aria-label={`Dia ${item.dayNumber} bloqueado, abrir plano`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[color:var(--color-surface-section)] text-sm font-bold text-[color:var(--color-text-secondary)]">
                    {item.dayNumber.toString().padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                      {item.workoutName}
                    </p>
                    <p className="text-xs text-[color:var(--color-text-secondary)]">
                      {item.durationMinutes} min
                    </p>
                  </div>
                </div>
                {item.isLocked ? (
                  <Lock className="h-4 w-4 text-[color:var(--color-text-muted)]" />
                ) : null}
              </button>
            ))}
          </div>
        </section>

        <article className="mt-5 rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-secondary)]">
            Por que esse treino hoje?
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            {todayPlanDay.reason}
          </p>
        </article>

        <div className="mt-4 rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4 text-sm">
          {completedToday ? (
            <div className="flex items-center gap-2 font-semibold text-[color:var(--color-status-success)]">
              <CheckCircle2 className="h-4 w-4" />
              Treino de hoje já concluído
            </div>
          ) : (
            <p className="text-[color:var(--color-text-secondary)]">
              Conclua este treino antes de abrir conteúdos extras. Hoje é a
              prioridade.
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link
            to="/app/plano"
            className="rounded-lg border border-[color:var(--color-border-disabled)] bg-[color:var(--color-surface-section)] px-3 py-3 text-center font-semibold text-[color:var(--color-text-primary)]"
          >
            Abrir Plano
          </Link>
          <Link
            to="/app/biblioteca"
            className="rounded-lg border border-[color:var(--color-border-disabled)] bg-[color:var(--color-surface-section)] px-3 py-3 text-center font-semibold text-[color:var(--color-text-primary)]"
          >
            Abrir biblioteca
          </Link>
        </div>
      </section>
      <div className="mt-3 px-1 text-center text-xs text-[color:var(--color-text-muted)]">
        Dia {todayPlanDay.dayNumber} • Continue amanhã para manter sua
        sequência.
      </div>
    </div>
  );
};
