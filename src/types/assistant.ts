export type AssistantIntentType =
  | "substituicao"
  | "joelho_punho"
  | "tempo_curto"
  | "perdi_dia"
  | "execucao"
  | "fallback";

export interface AssistantIntent {
  type: AssistantIntentType;
  title: string;
  answer: string;
  suggestedExerciseIds: number[];
}
