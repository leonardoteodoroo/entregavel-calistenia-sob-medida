import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const ProfileConfirmation = () => {
  const navigate = useNavigate();
  const { state, confirmProfile } = useAppContext();

  const handleConfirm = () => {
    confirmProfile();
    navigate('/ajustes');
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
      <h1 className="font-serif text-3xl text-white">Seu perfil no sistema</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted-text)]">
        Confirmamos os dados vindos do quiz para personalizar seu ponto de partida.
      </p>

      <div className="mt-6 grid gap-3">
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted-text)]">Objetivo</p>
          <p className="mt-1 font-semibold capitalize text-white">{state.quizProfile.mainGoal}</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted-text)]">Nível atual</p>
          <p className="mt-1 font-semibold capitalize text-white">{state.quizProfile.currentLevel}</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted-text)]">Foco corporal</p>
          <p className="mt-1 font-semibold text-white">{state.quizProfile.bodyFocus}</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted-text)]">Tempo sugerido</p>
          <p className="mt-1 font-semibold text-white">{state.quizProfile.availableMinutes} minutos</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="mt-auto rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black"
      >
        Confirmar e seguir
      </button>
    </div>
  );
};
