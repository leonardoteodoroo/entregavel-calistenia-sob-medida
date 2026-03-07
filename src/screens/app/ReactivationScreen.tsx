import { useNavigate } from 'react-router-dom';
import { ScreenFrame } from '../../components/ScreenFrame';

export const ReactivationScreen = () => {
  const navigate = useNavigate();

  return (
    <ScreenFrame title="Reativação" subtitle="Retome em modo leve hoje mesmo" rightSlot={null}>
      <div className="space-y-3" id="reativacao">
        <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
          <p className="text-sm text-white">
            Você não precisa compensar dias perdidos. Faça uma sessão curta hoje e volte ao ritmo amanhã.
          </p>
        </div>
        <ul className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[color:var(--color-muted-text)]">
          <li>1. Ative o caminho leve no treino de hoje.</li>
          <li>2. Priorize execução limpa, sem dor.</li>
          <li>3. Marque presença e encerre em até 10 minutos.</li>
        </ul>
        <button
          type="button"
          onClick={() => navigate('/app/hoje')}
          className="w-full rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black"
        >
          Voltar para Hoje
        </button>
      </div>
    </ScreenFrame>
  );
};
