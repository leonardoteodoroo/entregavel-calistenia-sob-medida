export type WorkoutFeedback = 'leve' | 'ideal' | 'intenso';

export interface WorkoutSessionState {
  dayNumber: number;
  currentExerciseIndex: number;
  finished: boolean;
  usedAdaptationIds: number[];
}
