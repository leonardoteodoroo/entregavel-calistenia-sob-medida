import type { Exercise } from "../types/exercise";

// Seed derivado de _lab/catalogo_premium/data.js (ids, nomes e categorias adaptados para o MVP mobile-first).
export const exercises: Exercise[] = [
  {
    id: 103,
    name: "Pistol Squat Assistido",
    description:
      "Agachamento unilateral com apoio para trabalhar pernas e equilíbrio.",
    category: "Pernas",
    difficulty: "Iniciante",
    equipment: "Sem equipamento",
    image:
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Comece com apoio na parede",
      "Controle a descida",
      "Suba com o calcanhar firme",
    ],
    adaptation: "Agachamento parcial com cadeira",
    substituteWith: "Assisted Squats",
  },
  {
    id: 106,
    name: "Assisted Squats",
    description:
      "Base de agachamento com barra ou apoio para técnica e consistência.",
    category: "Pernas",
    difficulty: "Iniciante",
    equipment: "Apoio em parede/barra",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "2 séries de 10 no nível inicial",
      "Respiração contínua",
      "Joelho alinhado com o pé",
    ],
    adaptation: "Agachamento curto de baixa amplitude",
    substituteWith: "Jackknife Squats",
  },
  {
    id: 107,
    name: "Horizontal Pullups",
    description: "Puxada horizontal para costas e postura.",
    category: "Puxar",
    difficulty: "Iniciante",
    equipment: "Barra baixa",
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Corpo alinhado",
      "Puxe cotovelos para trás",
      "Evite compensar com lombar",
    ],
    adaptation: "Remada com elástico sentado",
    substituteWith: "Jackknife Pullups",
  },
  {
    id: 108,
    name: "Jackknife Pullups",
    description:
      "Puxada com assistência de pernas para construir força de barra.",
    category: "Puxar",
    difficulty: "Iniciante",
    equipment: "Barra e apoio",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Suba com controle",
      "Segure 1s no topo",
      "Desça sem soltar postura",
    ],
    adaptation: "Puxada isométrica com elástico",
    substituteWith: "Advanced Horizontal Pullups",
  },
  {
    id: 109,
    name: "Straight Leg Twists",
    description:
      "Trabalho de core com rotação controlada para estabilidade central.",
    category: "Core",
    difficulty: "Iniciante",
    equipment: "Sem equipamento",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Ative abdômen antes de girar",
      "Amplitude curta no início",
      "Respire sem prender",
    ],
    adaptation: "Bent Leg Twists",
    substituteWith: "Alternating Leg Raises",
  },
  {
    id: 110,
    name: "Jackknife Squats",
    description:
      "Agachamento técnico com boa transferência para força de pernas.",
    category: "Pernas",
    difficulty: "Iniciante",
    equipment: "Barra ou apoio leve",
    image:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Mantenha tronco estável",
      "Peso no meio do pé",
      "Evite inclinar joelhos para dentro",
    ],
    adaptation: "Assisted Squats",
    substituteWith: "Pistol Squat Assistido",
  },
  {
    id: 111,
    name: "Bent Leg Twists",
    description: "Versão regressiva de core para quem precisa de menor carga.",
    category: "Core",
    difficulty: "Iniciante",
    equipment: "Sem equipamento",
    image:
      "https://images.unsplash.com/photo-1594737625785-c7f1925d6fcd?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Apoie as mãos atrás se necessário",
      "Movimento lento",
      "Alivie amplitude em dor",
    ],
    adaptation: "Marcha de core em pé",
    substituteWith: "Straight Leg Twists",
  },
  {
    id: 112,
    name: "Full Pullups Assistido",
    description: "Progressão de barra com assistência para consolidar puxada.",
    category: "Puxar",
    difficulty: "Intermediário",
    equipment: "Barra e elástico",
    image:
      "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Controle a negativa",
      "Mantenha escápulas ativas",
      "Use elástico compatível com seu nível",
    ],
    adaptation: "Jackknife Pullups",
    substituteWith: "Horizontal Pullups",
  },
  {
    id: 113,
    name: "Alternating Leg Raises",
    description: "Elevação alternada para abdômen inferior e coordenação.",
    category: "Core",
    difficulty: "Iniciante",
    equipment: "Sem equipamento",
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Lombar apoiada",
      "Suba alternando sem pressa",
      "Foque na qualidade",
    ],
    adaptation: "Bent Leg Twists",
    substituteWith: "Straight Leg Twists",
  },
  {
    id: 114,
    name: "Wall Bridges",
    description: "Ponte com apoio para mobilidade e força posterior.",
    category: "Mobilidade",
    difficulty: "Iniciante",
    equipment: "Parede",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Ative glúteo no topo",
      "Evite hiperextensão lombar",
      "Suba e desça com controle",
    ],
    adaptation: "Ponte de glúteo no chão",
    substituteWith: "Climbers",
  },
  {
    id: 116,
    name: "Climbers",
    description: "Cardio de baixo impacto com foco em core e condicionamento.",
    category: "Core",
    difficulty: "Iniciante",
    equipment: "Sem equipamento",
    image:
      "https://images.unsplash.com/photo-1517963628607-235ccdd5476d?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Mantenha ombros sobre mãos",
      "Ritmo constante",
      "Contraia abdômen",
    ],
    adaptation: "Climber inclinado na parede",
    substituteWith: "Alternating Leg Raises",
  },
  {
    id: 118,
    name: "Pushups Ajoelhada",
    description:
      "Empurrar com regressão para construir força de peito e braços.",
    category: "Empurrar",
    difficulty: "Iniciante",
    equipment: "Sem equipamento",
    image:
      "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&q=80&w=1000",
    progressionTips: [
      "Cotovelos em 45 graus",
      "Alinhe tronco",
      "Desça até sentir controle",
    ],
    adaptation: "Pushup na parede",
    substituteWith: "Pushups inclinada no banco",
  },
];

export const exerciseMap = new Map(
  exercises.map((exercise) => [exercise.id, exercise]),
);
