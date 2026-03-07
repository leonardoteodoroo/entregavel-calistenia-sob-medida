import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const SplashAccess = () => {
  const navigate = useNavigate();
  const { isOnboardingComplete, grantAccess, state } = useAppContext();

  const handleAccess = () => {
    if (isOnboardingComplete) {
      navigate('/app/hoje');
      return;
    }

    if (!state.onboarding.accessGranted) grantAccess();
    navigate('/welcome');
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 rounded-3xl border border-white/10 bg-[color:var(--color-surface)] p-7"
      >
        <span className="inline-flex rounded-full bg-[color:rgba(41,201,184,0.2)] px-3 py-1 text-xs font-semibold text-[color:var(--color-accent)]">
          Desafio de 28 dias
        </span>
        <h1 className="font-serif text-4xl leading-tight text-white">Calistenia Sob Medida</h1>
        <p className="text-sm text-[color:var(--color-muted-text)]">
          Seu app pós-compra para executar o treino do dia com clareza, constância e progresso real.
        </p>
        <button
          type="button"
          onClick={handleAccess}
          className="w-full rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black transition hover:bg-[color:var(--color-brand-strong)]"
        >
          Acessar meu plano
        </button>
      </motion.div>
    </div>
  );
};
