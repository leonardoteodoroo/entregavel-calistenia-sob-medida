import { LockKeyhole, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MealPlannerUnlockGateProps {
  completedSteps: number;
  totalSteps: number;
  onResume: () => void;
}

const previewItems = [
  "Hoje: refeições feitas e água",
  "Escolha da refeição e trocas",
  "Mapa de trocas e lista da semana",
  "Opções salvas e preparo semanal",
];

export default function MealPlannerUnlockGate({
  completedSteps,
  totalSteps,
  onResume,
}: MealPlannerUnlockGateProps) {
  const nextStep = Math.min(completedSteps + 1, totalSteps);

  return (
    <section
      data-meal-surface="soft"
      className="page-card mb-8"
      style={{ padding: "1.15rem", borderRadius: "24px" }}
    >
      <div className="mb-4 flex items-center gap-2">
        <LockKeyhole size={16} style={{ color: "var(--color-rose)" }} />
        <p
          className="font-body"
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-rose)",
          }}
        >
          Resto do plano bloqueado por enquanto
        </p>
      </div>

      <h2 className="font-display mb-2" style={{ fontSize: "1.2rem" }}>
        Complete os 3 passos para abrir o restante do plano
      </h2>

      <p
        className="font-body mb-4"
        style={{
          fontSize: "0.84rem",
          color: "var(--color-charcoal-light)",
          lineHeight: 1.7,
        }}
      >
        Hoje você vê só o essencial do começo. Isso reduz ruído e evita que o
        restante do planejador apareça antes da hora.
      </p>

      <ul className="mb-4 space-y-2">
        {previewItems.map(item => (
          <li
            key={item}
            className="font-body"
            style={{ fontSize: "0.8rem", color: "var(--color-charcoal)" }}
          >
            <Sparkles
              size={14}
              style={{ color: "var(--color-teal)", marginRight: "0.45rem" }}
            />
            {item}
          </li>
        ))}
      </ul>

      <Button type="button" onClick={onResume}>
        Voltar ao Passo {nextStep} de 3
      </Button>
    </section>
  );
}
