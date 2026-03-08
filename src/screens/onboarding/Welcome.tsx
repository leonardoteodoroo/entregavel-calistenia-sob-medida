import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const Welcome = () => {
  const navigate = useNavigate();
  const { markWelcomeSeen } = useAppContext();

  const handleContinue = () => {
    markWelcomeSeen();
    navigate("/perfil");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-5 py-8">
      <h1 className="font-serif text-3xl text-[color:var(--color-text-primary)]">
        Bem-vinda ao seu plano
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
        Em menos de 3 minutos você entende seu perfil e já inicia o treino de
        hoje.
      </p>

      <div className="mt-8 space-y-3">
        {[
          "Confirmar seu ponto de partida",
          "Ajustar dor, impacto e tempo disponível",
          "Entrar direto no treino que importa hoje",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4 text-sm text-[color:var(--color-text-primary)]"
          >
            {item}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)]"
      >
        Continuar
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
