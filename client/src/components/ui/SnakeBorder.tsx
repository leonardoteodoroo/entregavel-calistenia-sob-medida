// ============================================================
// SnakeBorder — Efeito premium de feixe de luz percorrendo a borda
// Técnica Definitiva (60fps GPU + Lazy):
// - Wrapper principal estabelece contexto
// - Máscara vazada com overflow: hidden recorta cantos perfeitos
// - Div gigante giratória animada puramente via transform: rotate
// - framer-motion/useInView suspende a carga fora da viewport
// ============================================================
import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useInView } from "framer-motion";

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

export default function SnakeBorder({
  children,
  color = "var(--color-rose-light)",
  thickness = 1.5,
  duration = 3,
  borderRadius = "0.65rem",
  className = "",
  style = {},
}: SnakeBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // once: false (suspende o efeito quando sair da tela).
  // margin: 400px (começa a renderizar 400px antes de aparecer para evitar piscar)
  const isInView = useInView(containerRef, { once: false, margin: "400px" });

  return (
    <div
      ref={containerRef}
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
      <div className="snake-border-mask">
        {/* Renderiza o peso do gradiente apenas quando em tela (lazy 60fps) */}
        {isInView && <div className="snake-border-glow" />}
      </div>
      <div className="snake-border-content">{children}</div>
    </div>
  );
}
