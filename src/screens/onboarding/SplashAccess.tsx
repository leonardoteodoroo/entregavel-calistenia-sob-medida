import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const SplashAccess = () => {
  const navigate = useNavigate();
  const { isOnboardingComplete, grantAccess, state } = useAppContext();

  const handleAccess = () => {
    if (isOnboardingComplete) {
      navigate("/app/hoje");
      return;
    }

    if (!state.onboarding.accessGranted) grantAccess();
    navigate("/welcome");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 rounded-2xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-7 shadow-[var(--shadow-card)]"
      >
        <span className="inline-flex rounded-full bg-[color:var(--color-status-success-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--color-status-success)]">
          Desafio de 28 dias
        </span>
        <h1 className="font-serif text-4xl leading-tight text-[color:var(--color-text-primary)]">
          Calistenia Sob Medida
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Seu app pós-compra para executar o treino do dia com clareza,
          constância e progresso real.
        </p>
        <button
          type="button"
          onClick={handleAccess}
          className="w-full rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)] transition hover:bg-[color:var(--color-action-primary-hover)]"
        >
          Acessar meu plano
        </button>
      </motion.div>
    </div>
  );
};
