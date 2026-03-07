import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const Welcome = () => {
  const navigate = useNavigate();
  const { markWelcomeSeen } = useAppContext();

  const handleContinue = () => {
    markWelcomeSeen();
    navigate('/perfil');
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
      <h1 className="font-serif text-3xl text-white">Bem-vinda ao seu plano</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted-text)]">
        Em menos de 3 minutos você entende seu perfil e já inicia o treino de hoje.
      </p>

      <div className="mt-8 space-y-3">
        {[
          'Confirmar seu ponto de partida',
          'Ajustar dor, impacto e tempo disponível',
          'Entrar direto no treino que importa hoje',
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white">
            {item}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black"
      >
        Continuar
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
