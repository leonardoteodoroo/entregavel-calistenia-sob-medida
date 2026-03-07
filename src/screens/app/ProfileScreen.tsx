import { Link } from 'react-router-dom';
import { ScreenFrame } from '../../components/ScreenFrame';
import { useAppContext } from '../../context/AppContext';

export const ProfileScreen = () => {
  const { state, progressSnapshot, resetProgress } = useAppContext();

  return (
    <ScreenFrame title="Perfil" subtitle="Preferências, FAQ e suporte operacional">
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] p-4">
          <p className="text-xs uppercase text-[color:var(--color-muted-text)]">Plano atual</p>
          <p className="mt-1 text-sm text-white">{state.derivedProfile?.profileBase ?? state.quizProfile.profileLabel}</p>
          <p className="mt-1 text-xs text-[color:var(--color-muted-text)]">
            Sessão alvo: {state.derivedProfile?.sessionMinutes ?? state.quizProfile.availableMinutes} minutos
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] p-4 text-sm text-white">
          <p className="font-semibold">Restrições ativas</p>
          <p className="mt-1 text-[color:var(--color-muted-text)]">
            {state.derivedProfile?.restrictions.length
              ? state.derivedProfile.restrictions.join(' • ')
              : 'Sem restrições adicionais.'}
          </p>
        </div>

        {progressSnapshot.needsReactivation ? (
          <Link
            to="/app/perfil/reativacao"
            className="block rounded-2xl border border-[color:var(--color-brand)] bg-[color:rgba(255,122,89,0.12)] px-4 py-3 text-sm font-semibold text-[color:var(--color-brand)]"
          >
            Você ficou alguns dias sem treinar. Abrir plano de reativação.
          </Link>
        ) : null}

        <div className="grid gap-2 text-sm">
          <Link to="/app/perfil/suporte" className="rounded-xl bg-white/10 px-3 py-3 text-white">
            Abrir FAQ e apoios
          </Link>
          <button
            type="button"
            onClick={resetProgress}
            className="rounded-xl border border-white/15 px-3 py-3 text-left text-[color:var(--color-muted-text)]"
          >
            Reiniciar progresso local (teste)
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
};
