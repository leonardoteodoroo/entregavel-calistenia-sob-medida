import guideManifest from "@shared/exercise-guide-manifest.json";

export type ExerciseGuideEntry = {
  exercise_id: string;
  display_name: string;
  objetivo: string;
  musculos_capacidades: string[];
  execucao_passo_a_passo: string[];
  inicio_meio_fim: {
    inicio: string;
    meio: string;
    fim: string;
  };
  principais_erros: string[];
  adaptacoes_iniciantes: string[];
  sinais_atencao: string[];
  cues: string[];
  nivel_complexidade: string;
  observacao_publico_alvo: string;
  fontes: Array<{ label: string; url: string }>;
};

type ExerciseGuideManifest = {
  version: string;
  generated_at: string;
  source_report: string;
  exercises: ExerciseGuideEntry[];
  summary: {
    total_exercises: number;
  };
};

const typedManifest = guideManifest as ExerciseGuideManifest;

const exerciseGuideByDisplayName = new Map(
  typedManifest.exercises.map(entry => [entry.display_name, entry])
);

export function getExerciseGuideEntries(): ExerciseGuideEntry[] {
  return typedManifest.exercises;
}

export function getExerciseGuideByName(
  exerciseName: string
): ExerciseGuideEntry | null {
  return exerciseGuideByDisplayName.get(exerciseName) ?? null;
}
