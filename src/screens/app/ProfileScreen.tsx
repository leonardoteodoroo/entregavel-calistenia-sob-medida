import { Link } from "react-router-dom";
import { ScreenFrame } from "../../components/ScreenFrame";
import { useAppContext } from "../../context/AppContext";

export const ProfileScreen = () => {
  const { state, progressSnapshot, resetProgress } = useAppContext();

  return (
    <ScreenFrame
      title="Perfil"
      subtitle="Preferências, FAQ e suporte operacional"
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-text-muted)]">
            Plano atual
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-text-primary)]">
            {state.derivedProfile?.profileBase ??
              state.quizProfile.profileLabel}
          </p>
          <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">
            Sessão alvo:{" "}
            {state.derivedProfile?.sessionMinutes ??
              state.quizProfile.availableMinutes}{" "}
            minutos
          </p>
        </div>

        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4 text-sm text-[color:var(--color-text-primary)]">
          <p className="font-semibold">Restrições ativas</p>
          <p className="mt-1 text-[color:var(--color-text-secondary)]">
            {state.derivedProfile?.restrictions.length
              ? state.derivedProfile.restrictions.join(" • ")
              : "Sem restrições adicionais."}
          </p>
        </div>

        {progressSnapshot.needsReactivation ? (
          <Link
            to="/app/perfil/reativacao"
            className="block rounded-lg border border-[color:var(--color-action-primary)] bg-[color:var(--color-action-secondary-hover)] px-4 py-3 text-sm font-semibold text-[color:var(--color-action-primary)]"
          >
            Você ficou alguns dias sem treinar. Abrir plano de reativação.
          </Link>
        ) : null}

        <div className="grid gap-2 text-sm">
          <Link
            to="/app/perfil/suporte"
            className="rounded-lg border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-section)] px-3 py-3 text-[color:var(--color-text-primary)]"
          >
            Abrir FAQ e apoios
          </Link>
          <button
            type="button"
            onClick={resetProgress}
            className="rounded-lg border border-[color:var(--color-border-disabled)] bg-[color:var(--color-surface-subtle)] px-3 py-3 text-left text-[color:var(--color-text-secondary)]"
          >
            Reiniciar progresso local (teste)
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
};
