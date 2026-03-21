import { Camera, Sparkles } from "lucide-react";
import type { CSSProperties, ImgHTMLAttributes } from "react";

import type { RecipeVisual } from "@/content/bonus/bonusRecipeTypes";
import { cn } from "@/lib/utils";

interface BonusVisualProps {
  visual: RecipeVisual;
  className?: string;
  style?: CSSProperties;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  decoding?: ImgHTMLAttributes<HTMLImageElement>["decoding"];
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>["fetchPriority"];
}

export default function BonusVisual({
  visual,
  className,
  style,
  loading,
  decoding,
  fetchPriority,
}: BonusVisualProps) {
  if (visual.kind === "asset") {
    return (
      <img
        src={visual.src}
        alt={visual.alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
      />
    );
  }

  const placeholderStyle: CSSProperties = {
    ...style,
    ...(style?.height ? {} : { aspectRatio: visual.aspectRatio ?? "16 / 9" }),
    background:
      "radial-gradient(circle at top left, rgba(255,255,255,0.96) 0%, rgba(240,235,227,0.92) 42%, rgba(232,213,215,0.95) 100%)",
    border: style?.border ?? "1px solid var(--color-taupe-light)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div
      role="img"
      aria-label={visual.alt}
      title={visual.comment}
      className={cn(
        "flex items-end rounded text-left",
        style?.height ? "h-full" : "min-h-[12rem]",
        className
      )}
      style={placeholderStyle}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(91,138,139,0.14) 0%, transparent 45%, rgba(139,74,82,0.18) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute right-4 top-4"
        style={{
          width: "5.5rem",
          height: "5.5rem",
          borderRadius: "999px",
          border: "1px solid rgba(181,169,154,0.45)",
          backgroundColor: "rgba(255,255,255,0.42)",
          display: "grid",
          placeItems: "center",
          backdropFilter: "blur(3px)",
        }}
      >
        <Sparkles size={24} style={{ color: "var(--color-rose)" }} />
      </div>

      <div
        className="relative z-10 w-full"
        style={{ padding: "1rem 1rem 1.05rem" }}
      >
        <span
          className="mb-2 inline-flex items-center gap-1.5 rounded-full font-body"
          style={{
            padding: "0.36rem 0.62rem",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--color-rose)",
            backgroundColor: "rgba(255,255,255,0.74)",
            border: "1px solid rgba(196,133,142,0.48)",
          }}
        >
          <Camera size={12} />
          Imagem oficial em desenvolvimento
        </span>
        <p
          className="font-display"
          style={{
            fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
            color: "var(--color-charcoal)",
            lineHeight: 1.25,
            maxWidth: "28rem",
          }}
        >
          {visual.prompt}
        </p>
      </div>
    </div>
  );
}
