import type { PlanDay, PlanDayType, PlanPath } from "../types/plan";

interface DayBlueprint {
  workoutName: string;
  focus: string;
  durationMinutes: 10 | 15 | 20;
  exerciseIds: number[];
  adaptations: string[];
  dayType: PlanDayType;
  reason: string;
}

const weekBlueprint: DayBlueprint[] = [
  {
    workoutName: "Base de Pernas e Core",
    focus: "Estabilidade e ativação",
    durationMinutes: 15,
    exerciseIds: [106, 109, 111],
    adaptations: [
      "Reduzir amplitude nos agachamentos",
      "Trocar twists por marcha em pé",
    ],
    dayType: "treino",
    reason: "Começa com base técnica para reduzir dor e aumentar confiança.",
  },
  {
    workoutName: "Puxar com Segurança",
    focus: "Costas e postura",
    durationMinutes: 15,
    exerciseIds: [107, 108, 113],
    adaptations: ["Usar elástico de assistência", "Reduzir tempo sob tensão"],
    dayType: "treino",
    reason: "Fortalece costas para melhorar postura e execução diária.",
  },
  {
    workoutName: "Empurrar e Core",
    focus: "Peito, braços e centro",
    durationMinutes: 15,
    exerciseIds: [118, 116, 111],
    adaptations: ["Pushup na parede", "Climber inclinado"],
    dayType: "treino",
    reason: "Combina força e cardio em sessão curta e guiada.",
  },
  {
    workoutName: "Pernas de Continuidade",
    focus: "Glúteo e coxas",
    durationMinutes: 20,
    exerciseIds: [103, 110, 106],
    adaptations: ["Pistol com apoio mais alto", "Volume reduzido"],
    dayType: "treino",
    reason: "Reforça padrão de pernas para acelerar evolução sem sobrecarga.",
  },
  {
    workoutName: "Core e Mobilidade",
    focus: "Abdômen e lombar",
    durationMinutes: 15,
    exerciseIds: [109, 113, 114],
    adaptations: ["Troca por versão com joelho flexionado", "Menos repetições"],
    dayType: "treino",
    reason: "Mantém constância e prepara para próxima semana.",
  },
  {
    workoutName: "Mobilidade Guiada",
    focus: "Recuperação ativa",
    durationMinutes: 10,
    exerciseIds: [114, 111, 106],
    adaptations: ["Sessão sentada", "Respiração + alongamento leve"],
    dayType: "mobilidade",
    reason: "Dia leve para recuperar sem perder o ritmo.",
  },
  {
    workoutName: "Recuperação Inteligente",
    focus: "Retomar energia",
    durationMinutes: 10,
    exerciseIds: [114, 111],
    adaptations: ["Respiração guiada", "Movimento sem dor"],
    dayType: "recuperacao",
    reason: "Recuperação planejada evita abandono no dia seguinte.",
  },
];

const pathByWeek = (weekNumber: number): PlanPath => {
  if (weekNumber === 1) return "leve";
  if (weekNumber <= 3) return "base";
  return "avancar";
};

export const planDays: PlanDay[] = Array.from({ length: 28 }, (_, index) => {
  const dayNumber = index + 1;
  const weekNumber = Math.floor(index / 7) + 1;
  const template = weekBlueprint[index % weekBlueprint.length];

  return {
    dayNumber,
    weekNumber,
    workoutName: template.workoutName,
    focus: template.focus,
    durationMinutes: template.durationMinutes,
    exerciseIds: template.exerciseIds,
    adaptations: template.adaptations,
    path: pathByWeek(weekNumber),
    dayType: template.dayType,
    reason: template.reason,
  };
});
