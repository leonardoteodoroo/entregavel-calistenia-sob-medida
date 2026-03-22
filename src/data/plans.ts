import type { PlanMetadata } from "../types/plan";
import { planDays as defaultPlanDays } from "./planDays";
import { femininePlanDays } from "./femininePlan";

export const plansMetadata: PlanMetadata[] = [
  {
    id: "default",
    name: "Plano Padrão",
    description:
      "Equilíbrio entre força, core e mobilidade para todos os níveis.",
    durationWeeksCount: 4,
  },
  {
    id: "feminine-28",
    name: "Calistenia Feminina 28 Dias",
    description:
      "Desafio focado em constância, pernas, glúteos e core para treinar em casa.",
    durationWeeksCount: 4,
  },
];

export const allPlans = {
  default: defaultPlanDays,
  "feminine-28": femininePlanDays,
};
