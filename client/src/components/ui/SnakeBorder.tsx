// ============================================================
// SnakeBorder — Efeito premium de feixe de luz percorrendo a borda
// Técnica Definitiva: conic-gradient + mask-composite + @property animável
// O pseudo-elemento fica sobre a borda sem distorcer o layout
// ============================================================
import type { CSSProperties, ReactNode } from "react";

interface SnakeBorderProps {
  children: ReactNode;
  /** Cor do feixe de luz (CSS color value). Padrão: rose-light do DS */
  color?: string;
  /** Espessura da borda em pixels. Padrão: 1.5 */
  thickness?: number;
  /** Duração da animação em segundos. Padrão: 3 */
  duration?: number;
  /** Border-radius do wrapper. Padrão: "0.65rem" */
  borderRadius?: string;
  /** Classes CSS extras no wrapper */
  className?: string;
  /** Estilos inline extras no wrapper */
  style?: CSSProperties;
}

/**
 * Envolve qualquer elemento com um feixe de luz animado percorrendo a borda.
 *
 * Técnica Definitiva:
 * - Um ::after cobre o elemento com inset: 0 e border-radius: inherit
 * - mask-composite "exclude" recorta o miolo, deixando APENAS a borda
 * - @property --snake-angle anima o ângulo do conic-gradient sem rotacionar
 *   o elemento (evitando vazamento de cantos - o "transform: rotate" bug)
 * - Essa técnica permite o uso de backgrounds transparentes (glassmorphism)
 *   no filho, já que o miolo da máscara é 100% vazado.
 *
 * Uso:
 * <SnakeBorder color="var(--color-rose-light)" thickness={1.5}>
 *   <button style={{ backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", borderRadius: "..." }}>
 *     Semana 1
 *   </button>
 * </SnakeBorder>
 */
export default function SnakeBorder({
  children,
  color = "var(--color-rose-light)",
  thickness = 1.5,
  duration = 3,
  borderRadius = "0.65rem",
  className = "",
  style = {},
}: SnakeBorderProps) {
  return (
    <div
      className={`snake-border ${className}`}
      style={
        {
          "--snake-color": color,
          "--snake-thickness": `${thickness}px`,
          "--snake-duration": `${duration}s`,
          "--snake-radius": borderRadius,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
