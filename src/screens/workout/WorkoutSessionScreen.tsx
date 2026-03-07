import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScreenFrame } from '../../components/ScreenFrame';
import { exerciseMap } from '../../data/exercises';
import { useAppContext } from '../../context/AppContext';
import type { Exercise } from '../../types/exercise';

export const WorkoutSessionScreen = () => {
  const navigate = useNavigate();
  const { state, todayPlanDay } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adaptedExerciseIds, setAdaptedExerciseIds] = useState<number[]>([]);

  const dayAlreadyCompleted = todayPlanDay
    ? state.completedDays.includes(todayPlanDay.dayNumber)
    : false;

  const dayExercises = useMemo(() => {
    if (!todayPlanDay) return [];
    return todayPlanDay.exerciseIds
      .map((id) => exerciseMap.get(id))
      .filter((exercise): exercise is Exercise => exercise !== undefined);
  }, [todayPlanDay]);

  if (!todayPlanDay) {
    return (
      <ScreenFrame title="Treino" subtitle="Nenhum treino disponível hoje">
        <button
          type="button"
          onClick={() => navigate('/app/hoje')}
          className="rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-semibold text-black"
        >
          Voltar para Hoje
        </button>
      </ScreenFrame>
    );
  }

  if (dayAlreadyCompleted) {
    return (
      <ScreenFrame title="Treino do dia" subtitle="Sessão já concluída">
        <div className="rounded-2xl border border-[color:var(--color-accent)] bg-[color:rgba(41,201,184,0.12)] p-4 text-sm text-white">
          Você já concluiu o dia {todayPlanDay.dayNumber}. Se quiser, revise os exercícios na biblioteca.
        </div>
        <button
          type="button"
          onClick={() => navigate('/app/progresso')}
          className="mt-3 rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-semibold text-black"
        >
          Ver progresso
        </button>
      </ScreenFrame>
    );
  }

  if (dayExercises.length === 0) {
    return (
      <ScreenFrame title="Treino" subtitle="Configuração incompleta">
        <button
          type="button"
          onClick={() => navigate('/app/hoje')}
          className="rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-semibold text-black"
        >
          Voltar para Hoje
        </button>
      </ScreenFrame>
    );
  }

  const currentExercise = dayExercises[currentIndex];
  const isLast = currentIndex === dayExercises.length - 1;
  const isAdapted = adaptedExerciseIds.includes(currentExercise.id);

  const applyAdaptation = () => {
    setAdaptedExerciseIds((previous) =>
      previous.includes(currentExercise.id) ? previous : [...previous, currentExercise.id],
    );
  };

  const goNext = () => {
    if (isLast) {
      navigate('/app/hoje/conclusao', { state: { dayNumber: todayPlanDay.dayNumber } });
      return;
    }
    setCurrentIndex((previous) => previous + 1);
  };

  return (
    <ScreenFrame
      title={`Treino Dia ${todayPlanDay.dayNumber}`}
      subtitle={`${currentIndex + 1} de ${dayExercises.length} exercícios`}
    >
      <div className="space-y-4">
        <img
          src={currentExercise.image}
          alt={currentExercise.name}
          className="h-44 w-full rounded-3xl object-cover"
        />

        <div className="rounded-2xl border border-white/10 bg-[color:var(--color-surface)] p-4">
          <h2 className="font-serif text-2xl text-white">{currentExercise.name}</h2>
          <p className="mt-1 text-sm text-[color:var(--color-muted-text)]">{currentExercise.description}</p>

          <div className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-white">
            <p className="font-semibold">Execução rápida</p>
            <p className="mt-1 text-[color:var(--color-muted-text)]">{currentExercise.progressionTips[0]}</p>
          </div>

          <div className="mt-3 rounded-xl border border-[color:var(--color-accent)] bg-[color:rgba(41,201,184,0.12)] p-3 text-sm">
            <p className="font-semibold text-[color:var(--color-accent)]">Adaptação acionável</p>
            <p className="mt-1 text-white">{isAdapted ? currentExercise.adaptation : 'Ative adaptação se sentir dor ou dificuldade.'}</p>
          </div>
        </div>

        <div className="grid gap-2">
          <button
            type="button"
            onClick={applyAdaptation}
            className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
          >
            {isAdapted ? 'Adaptação aplicada' : 'Aplicar adaptação deste exercício'}
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-brand)] px-4 py-3 font-bold text-black"
          >
            {isLast ? 'Finalizar treino' : 'Próximo exercício'}
            {isLast ? <CheckCircle2 className="h-4 w-4" /> : null}
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
};
