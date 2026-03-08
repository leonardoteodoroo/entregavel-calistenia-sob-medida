import { X } from "lucide-react";
import type { Exercise } from "../types/exercise";

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ExerciseDetailModal = ({
  exercise,
  onClose,
}: ExerciseDetailModalProps) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-[color:var(--color-overlay-modal)] p-3 sm:items-center sm:justify-center">
      <div className="w-full max-w-[800px] overflow-hidden rounded-2xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-elevated)]">
        <div className="relative h-44">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg bg-[color:var(--color-overlay-strong)] p-2 text-[color:var(--color-text-on-dark)]"
            aria-label="Fechar detalhe"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <h3 className="font-serif text-2xl text-[color:var(--color-text-primary)]">
            {exercise.name}
          </h3>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {exercise.description}
          </p>
          <div className="rounded-xl bg-[color:var(--color-status-success-surface)] p-3 text-sm">
            <p className="mb-1 font-semibold text-[color:var(--color-status-success)]">
              Adaptação sugerida
            </p>
            <p className="text-[color:var(--color-text-primary)]">
              {exercise.adaptation}
            </p>
          </div>
          <div className="rounded-xl bg-[color:var(--color-action-secondary-hover)] p-3 text-sm">
            <p className="mb-1 font-semibold text-[color:var(--color-action-primary)]">
              Substituição rápida
            </p>
            <p className="text-[color:var(--color-text-primary)]">
              {exercise.substituteWith}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
