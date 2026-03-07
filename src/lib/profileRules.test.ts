import { deriveProfile } from './profileRules';
import { quizProfileMock } from '../data/quizProfile';

describe('deriveProfile', () => {
  it('deriva restrições e sessão com base nos ajustes', () => {
    const derived = deriveProfile(quizProfileMock, {
      trainingDaysPerWeek: 4,
      sessionPreference: 10,
      floorTraining: false,
      kneePain: true,
      wristPain: false,
      lowImpact: true,
      perceivedLevel: 'iniciante',
    });

    expect(derived.sessionMinutes).toBe(10);
    expect(derived.restrictions).toContain('priorizar versões em pé');
    expect(derived.restrictions).toContain('evitar impacto alto em joelhos');
    expect(derived.restrictions).toContain('manter cardio de baixo impacto');
  });
});
