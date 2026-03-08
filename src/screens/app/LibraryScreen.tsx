import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExerciseCard } from "../../components/ExerciseCard";
import { ExerciseDetailModal } from "../../components/ExerciseDetailModal";
import { ScreenFrame } from "../../components/ScreenFrame";
import { exercises } from "../../data/exercises";
import type { Exercise } from "../../types/exercise";

const categories = [
  "Todos",
  ...new Set(exercises.map((exercise) => exercise.category)),
];

export const LibraryScreen = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const filtered = useMemo(() => {
    return exercises.filter((exercise) => {
      const categoryMatch =
        category === "Todos" || exercise.category === category;
      const text = `${exercise.name} ${exercise.description}`.toLowerCase();
      const searchMatch = text.includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <ScreenFrame title="Biblioteca" subtitle="Busca, filtro e adaptação rápida">
      <div className="space-y-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar exercício"
          className="w-full rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)]"
        />

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                category === item
                  ? "bg-[color:var(--color-action-primary)] text-[color:var(--color-text-on-brand)]"
                  : "bg-[color:var(--color-surface-section)] text-[color:var(--color-text-secondary)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-3">
          {filtered.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onOpen={setSelectedExercise}
            />
          ))}
        </div>

        <Link
          to="/app/biblioteca/assistente"
          className="mt-2 block rounded-lg border border-[color:var(--color-action-primary)] bg-[color:var(--color-action-secondary-hover)] px-4 py-3 text-center text-sm font-semibold text-[color:var(--color-action-primary)]"
        >
          Abrir assistente de dúvidas
        </Link>
      </div>
      <ExerciseDetailModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </ScreenFrame>
  );
};
