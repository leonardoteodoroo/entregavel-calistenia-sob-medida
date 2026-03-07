import type { AssistantIntent } from '../types/assistant';

const fallbackIntent: AssistantIntent = {
  type: 'fallback',
  title: 'Posso te guiar agora',
  answer:
    'Me diga se sua dúvida é sobre substituição, dor no joelho/punho, treino curto, perder um dia ou execução do movimento.',
  suggestedExerciseIds: [106, 111],
};

export const resolveAssistantIntent = (message: string): AssistantIntent => {
  const text = message.toLowerCase();

  if (text.includes('substit') || text.includes('trocar')) {
    return {
      type: 'substituicao',
      title: 'Substituição rápida',
      answer:
        'Troque o exercício por uma versão regressiva da mesma categoria e mantenha a sessão em andamento.',
      suggestedExerciseIds: [106, 111, 118],
    };
  }

  if (text.includes('joelho') || text.includes('punho') || text.includes('dor')) {
    return {
      type: 'joelho_punho',
      title: 'Ajuste para desconforto',
      answer:
        'Ative baixo impacto e priorize amplitude curta. Se persistir dor aguda, encerre o movimento e mantenha só mobilidade leve.',
      suggestedExerciseIds: [114, 111],
    };
  }

  if (text.includes('tempo') || text.includes('corrido') || text.includes('rápido') || text.includes('rapido')) {
    return {
      type: 'tempo_curto',
      title: 'Modo sessão curta',
      answer: 'Faça 10 minutos com foco em execução perfeita. Concluir curto hoje é melhor do que pular.',
      suggestedExerciseIds: [106, 116],
    };
  }

  if (text.includes('perdi') || text.includes('falhei') || text.includes('atras')) {
    return {
      type: 'perdi_dia',
      title: 'Retomada sem culpa',
      answer:
        'Retome no próximo treino com caminho leve. O objetivo é consistência semanal, não perfeição diária.',
      suggestedExerciseIds: [114, 106],
    };
  }

  if (text.includes('como') || text.includes('execu') || text.includes('postura')) {
    return {
      type: 'execucao',
      title: 'Execução guiada',
      answer:
        'Use ritmo controlado: postura neutra, respiração contínua e amplitude confortável. Qualidade vale mais que velocidade.',
      suggestedExerciseIds: [107, 109, 118],
    };
  }

  return fallbackIntent;
};
