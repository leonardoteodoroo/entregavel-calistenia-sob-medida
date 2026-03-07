import type {
  DerivedProfile,
  OnboardingAdjustments,
  QuizProfileInput,
} from '../types/profile';

const toneByGoal: Record<QuizProfileInput['mainGoal'], string> = {
  emagrecer: 'direto e acolhedor',
  tonificar: 'confiante e técnico',
  consistencia: 'encorajador e prático',
};

export const deriveProfile = (
  quizProfile: QuizProfileInput,
  adjustments: OnboardingAdjustments,
): DerivedProfile => {
  const restrictions: string[] = [];

  if (!adjustments.floorTraining) restrictions.push('priorizar versões em pé');
  if (adjustments.kneePain) restrictions.push('evitar impacto alto em joelhos');
  if (adjustments.wristPain) restrictions.push('usar apoio neutro para punhos');
  if (adjustments.lowImpact) restrictions.push('manter cardio de baixo impacto');

  const weekOneFocus = adjustments.lowImpact
    ? 'Movimentos controlados com foco em técnica e conforto articular.'
    : 'Base técnica + ritmo curto para ganhar constância sem sobrecarga.';

  const todayInstruction =
    adjustments.sessionPreference <= 15
      ? 'Conclua a sessão curta de hoje antes de abrir conteúdos extras.'
      : 'Conclua a sessão completa de hoje com foco em execução limpa.';

  return {
    profileBase: quizProfile.profileLabel,
    goal: quizProfile.mainGoal,
    focus: quizProfile.bodyFocus,
    sessionMinutes: adjustments.sessionPreference,
    restrictions,
    copyTone: toneByGoal[quizProfile.mainGoal],
    weekOneFocus,
    todayInstruction,
  };
};
