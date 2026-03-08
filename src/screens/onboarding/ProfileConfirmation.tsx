import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const ProfileConfirmation = () => {
  const navigate = useNavigate();
  const { state, confirmProfile } = useAppContext();

  const handleConfirm = () => {
    confirmProfile();
    navigate("/ajustes");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-5 py-8">
      <h1 className="font-serif text-3xl text-[color:var(--color-text-primary)]">
        Seu perfil no sistema
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
        Confirmamos os dados vindos do quiz para personalizar seu ponto de
        partida.
      </p>

      <div className="mt-6 grid gap-3">
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Objetivo
          </p>
          <p className="mt-1 font-semibold capitalize text-[color:var(--color-text-primary)]">
            {state.quizProfile.mainGoal}
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Nível atual
          </p>
          <p className="mt-1 font-semibold capitalize text-[color:var(--color-text-primary)]">
            {state.quizProfile.currentLevel}
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Foco corporal
          </p>
          <p className="mt-1 font-semibold text-[color:var(--color-text-primary)]">
            {state.quizProfile.bodyFocus}
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Tempo sugerido
          </p>
          <p className="mt-1 font-semibold text-[color:var(--color-text-primary)]">
            {state.quizProfile.availableMinutes} minutos
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="mt-auto rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)]"
      >
        Confirmar e seguir
      </button>
    </div>
  );
};
