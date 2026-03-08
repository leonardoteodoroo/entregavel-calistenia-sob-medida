import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const PlanReason = () => {
  const navigate = useNavigate();
  const { state, markPlanReasonSeen } = useAppContext();

  const handleEnterApp = () => {
    markPlanReasonSeen();
    navigate("/app/hoje");
  };

  const profile = state.derivedProfile;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-5 py-8">
      <h1 className="font-serif text-3xl text-[color:var(--color-text-primary)]">
        Seu plano foi montado assim
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
        Este plano respeita seu momento atual para garantir execução hoje e
        retorno amanhã.
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-text-muted)]">
            Quem é você no sistema
          </p>
          <p className="mt-1 text-[color:var(--color-text-primary)]">
            {profile?.profileBase ?? state.quizProfile.profileLabel}
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-text-muted)]">
            Foco da semana 1
          </p>
          <p className="mt-1 text-[color:var(--color-text-primary)]">
            {profile?.weekOneFocus ?? "Base técnica e constância diária."}
          </p>
        </div>
        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-text-muted)]">
            O que fazer hoje
          </p>
          <p className="mt-1 text-[color:var(--color-text-primary)]">
            {profile?.todayInstruction ??
              "Completar a sessão curta com execução limpa."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleEnterApp}
        className="mt-auto rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)]"
      >
        Entrar no app
      </button>
    </div>
  );
};
