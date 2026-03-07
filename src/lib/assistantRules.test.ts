import { resolveAssistantIntent } from './assistantRules';

describe('resolveAssistantIntent', () => {
  it('identifica intent de substituição', () => {
    const intent = resolveAssistantIntent('preciso substituir exercício');
    expect(intent.type).toBe('substituicao');
    expect(intent.suggestedExerciseIds.length).toBeGreaterThan(0);
  });

  it('identifica intent de dor', () => {
    const intent = resolveAssistantIntent('estou com dor no joelho');
    expect(intent.type).toBe('joelho_punho');
  });

  it('retorna fallback para mensagem genérica', () => {
    const intent = resolveAssistantIntent('oi, tudo bem?');
    expect(intent.type).toBe('fallback');
  });
});
