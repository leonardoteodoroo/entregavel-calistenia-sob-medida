import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const PlanReason = () => {
  const navigate = useNavigate();
  const { state, markPlanReasonSeen } = useAppContext();

  const handleEnterApp = () => {
    markPlanReasonSeen();
    navigate('/app/hoje');
  };

  const profile = state.derivedProfile;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
      <h1 className="font-serif text-3xl text-white">Seu plano foi montado assim</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted-text)]">
        Este plano respeita seu momento atual para garantir execução hoje e retorno amanhã.
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-muted-text)]">Quem é você no sistema</p>
          <p className="mt-1 text-white">{profile?.profileBase ?? state.quizProfile.profileLabel}</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-muted-text)]">Foco da semana 1</p>
          <p className="mt-1 text-white">{profile?.weekOneFocus ?? 'Base técnica e constância diária.'}</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-muted-text)]">O que fazer hoje</p>
          <p className="mt-1 text-white">{profile?.todayInstruction ?? 'Completar a sessão curta com execução limpa.'}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleEnterApp}
        className="mt-auto rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black"
      >
        Entrar no app
      </button>
    </div>
  );
};
