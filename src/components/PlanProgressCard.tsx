import { Clock3 } from "lucide-react";
import type { ExperienceLevel } from "../types/profile";

interface PlanProgressCardProps {
  completedDaysCount: number;
  currentDayNumber: number;
  totalDays: number;
  currentLevel: ExperienceLevel;
}

const levelLabelMap: Record<ExperienceLevel, string> = {
  iniciante: "Iniciante",
  intermediaria: "Intermediaria",
};

export const PlanProgressCard = ({
  completedDaysCount,
  currentDayNumber,
  totalDays,
  currentLevel,
}: PlanProgressCardProps) => {
  const safeTotalDays = Math.max(totalDays, 1);
  const safeCurrentDayNumber = Math.min(
    Math.max(currentDayNumber, 1),
    safeTotalDays,
  );
  const completionPercentage = Math.round(
    (completedDaysCount / safeTotalDays) * 100,
  );
  const remainingDays = Math.max(safeTotalDays - completedDaysCount, 0);
  const progressWidth =
    completedDaysCount === 0 ? "0%" : `${Math.max(completionPercentage, 8)}%`;

  return (
    <section
      aria-label="Progresso geral do plano"
      className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] p-4 shadow-[var(--shadow-card)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-highlight),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,var(--color-action-secondary-hover))]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-action-primary)]">
            Progresso geral
          </p>
          <span className="rounded-full border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-section)] px-3 py-1 text-[11px] font-semibold text-[color:var(--color-text-secondary)]">
            Nivel {levelLabelMap[currentLevel]}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Hoje no plano
            </p>
            <h2 className="mt-1 font-serif text-[31px] leading-tight text-[color:var(--color-text-primary)]">
              Dia {safeCurrentDayNumber} de {safeTotalDays}
            </h2>
          </div>
          <p className="text-sm font-semibold text-[color:var(--color-action-primary)]">
            {completionPercentage}% concluido
          </p>
        </div>

        <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-[color:var(--color-border-subtle)]">
          <div className="absolute left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[color:var(--color-action-strong)]" />
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-action-primary)_0%,var(--color-status-success)_100%)] transition-[width] duration-300 ease-out"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <Clock3 className="h-4 w-4 text-[color:var(--color-action-primary)]" />
          <span>
            {remainingDays === 0
              ? "Ciclo concluido. Revise o plano e inicie uma nova rodada quando quiser."
              : `Faltam ${remainingDays} ${remainingDays === 1 ? "dia" : "dias"} para concluir sua jornada.`}
          </span>
        </div>
      </div>
    </section>
  );
};
