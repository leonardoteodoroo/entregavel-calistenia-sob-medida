import type { ReactNode } from "react";

import { CheckCircle2, ChevronRight } from "lucide-react";

interface PlannerChoiceButtonProps {
  label: string;
  hint?: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  compact?: boolean;
  interactiveKind?: "choice" | "swap-map";
  leadingIcon?: ReactNode;
}

export default function PlannerChoiceButton({
  label,
  hint,
  active,
  disabled,
  onClick,
  compact = false,
  interactiveKind = "choice",
  leadingIcon,
}: PlannerChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-meal-interactive={interactiveKind}
      data-selected={active ? "true" : "false"}
      className="text-left transition-colors"
      style={{
        minHeight: compact ? "42px" : "56px",
        width: compact ? "auto" : "100%",
        borderRadius: compact ? "999px" : "18px",
        padding: compact ? "0.65rem 0.9rem" : "0.8rem 0.95rem",
        backgroundColor: active
          ? "var(--color-charcoal)"
          : "rgba(244,234,220,0.96)",
        border: `1px solid ${
          active ? "var(--color-charcoal)" : "rgba(95,86,75,0.18)"
        }`,
        color: active ? "#fffaf5" : "var(--color-charcoal)",
        boxShadow: active
          ? "0 12px 22px rgba(31,38,40,0.18)"
          : "0 8px 18px rgba(52,37,25,0.04)",
      }}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="flex items-start gap-2">
          {leadingIcon}
          <span className="block">
            <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700 }}>
              {label}
            </span>
            {hint ? (
              <span
                style={{
                  display: "block",
                  marginTop: "0.15rem",
                  fontSize: "0.7rem",
                  opacity: active ? 0.92 : 0.74,
                  lineHeight: 1.45,
                }}
              >
                {active ? "Selecionada agora" : hint}
              </span>
            ) : null}
          </span>
        </span>
        {active ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />}
      </span>
    </button>
  );
}
