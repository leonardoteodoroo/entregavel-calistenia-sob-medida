import type { Exercise } from "../types/exercise";

interface ExerciseCardProps {
  exercise: Exercise;
  onOpen: (exercise: Exercise) => void;
}

export const ExerciseCard = ({ exercise, onOpen }: ExerciseCardProps) => (
  <button
    type="button"
    onClick={() => onOpen(exercise)}
    className="group overflow-hidden rounded-xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] text-left transition hover:border-[color:var(--color-action-primary)]"
  >
    <img
      src={exercise.image}
      alt={exercise.name}
      className="h-32 w-full object-cover"
    />
    <div className="space-y-2 p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-[color:var(--color-text-primary)]">
          {exercise.name}
        </h3>
        <span className="rounded-full bg-[color:var(--color-surface-section)] px-2 py-1 text-[10px] text-[color:var(--color-text-secondary)]">
          {exercise.category}
        </span>
      </div>
      <p className="text-xs text-[color:var(--color-text-secondary)]">
        {exercise.description}
      </p>
      <p className="text-xs font-semibold text-[color:var(--color-link-default)]">
        Ver adaptação e execução
      </p>
    </div>
  </button>
);
