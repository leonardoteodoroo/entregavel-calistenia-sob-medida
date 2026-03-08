import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScreenFrame } from "../../components/ScreenFrame";
import { useAppContext } from "../../context/AppContext";
import type { WorkoutFeedback } from "../../types/workout";

interface CompletionLocationState {
  dayNumber?: number;
}

export const WorkoutCompletionScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeWorkoutDay, todayDayNumber } = useAppContext();
  const [feedback, setFeedback] = useState<WorkoutFeedback>("ideal");

  const state = (location.state as CompletionLocationState | null) ?? {};
  const dayNumber = state.dayNumber ?? todayDayNumber;

  const submitCompletion = () => {
    completeWorkoutDay(dayNumber, feedback);
    navigate("/app/progresso");
  };

  return (
    <ScreenFrame
      title="Treino concluído"
      subtitle={`Dia ${dayNumber} finalizado`}
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-surface)] p-4 text-sm text-[color:var(--color-text-primary)]">
          Excelente. Seu progresso foi atualizado. Amanhã você continua do
          próximo passo do plano.
        </div>

        <div className="rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4">
          <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
            Como foi o treino de hoje?
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { key: "leve", label: "Leve" },
              { key: "ideal", label: "Ideal" },
              { key: "intenso", label: "Intenso" },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFeedback(item.key as WorkoutFeedback)}
                className={`rounded-lg px-2 py-2 text-sm font-semibold ${
                  feedback === item.key
                    ? "bg-[color:var(--color-action-primary)] text-[color:var(--color-text-on-brand)]"
                    : "bg-[color:var(--color-surface-section)] text-[color:var(--color-text-secondary)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={submitCompletion}
          className="w-full rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)]"
        >
          Salvar e ver progresso
        </button>
      </div>
    </ScreenFrame>
  );
};
