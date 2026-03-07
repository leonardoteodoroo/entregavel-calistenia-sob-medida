import { X } from 'lucide-react';
import type { Exercise } from '../types/exercise';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ExerciseDetailModal = ({ exercise, onClose }: ExerciseDetailModalProps) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-3 sm:items-center sm:justify-center">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-[color:var(--color-surface)]">
        <div className="relative h-44">
          <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white"
            aria-label="Fechar detalhe"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <h3 className="font-serif text-2xl text-white">{exercise.name}</h3>
          <p className="text-sm text-[color:var(--color-muted-text)]">{exercise.description}</p>
          <div className="rounded-2xl bg-white/5 p-3 text-sm">
            <p className="mb-1 font-semibold text-[color:var(--color-accent)]">Adaptação sugerida</p>
            <p className="text-white">{exercise.adaptation}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3 text-sm">
            <p className="mb-1 font-semibold text-[color:var(--color-brand)]">Substituição rápida</p>
            <p className="text-white">{exercise.substituteWith}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
