import type { CSSProperties, ImgHTMLAttributes } from "react";

import { Camera, Sparkles } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import type {
  EditorialVisual as EditorialVisualModel,
  EditorialVisualAspectRatio,
} from "@/lib/mealPlanData";

interface EditorialVisualProps {
  visual: EditorialVisualModel;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  decoding?: ImgHTMLAttributes<HTMLImageElement>["decoding"];
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>["fetchPriority"];
}

const ratioValueMap: Record<EditorialVisualAspectRatio, number> = {
  "16:9": 16 / 9,
  "3:4": 3 / 4,
  "1:1": 1,
};

export default function EditorialVisual({
  visual,
  className,
  imageClassName,
  style,
  imageStyle,
  loading,
  decoding,
  fetchPriority,
}: EditorialVisualProps) {
  return (
    <AspectRatio
      ratio={ratioValueMap[visual.aspectRatio]}
      data-aspect-ratio={visual.aspectRatio}
      className={cn("overflow-hidden", className)}
      style={style}
    >
      {visual.kind === "asset" ? (
        <img
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          className={cn("h-full w-full object-cover", imageClassName)}
          style={{
            objectPosition: visual.objectPosition,
            ...imageStyle,
          }}
        />
      ) : (
        <div
          role="img"
          aria-label={visual.alt}
          title={visual.comment}
          className="relative flex h-full w-full items-end overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.96) 0%, rgba(240,235,227,0.92) 42%, rgba(232,213,215,0.95) 100%)",
            ...imageStyle,
          }}
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
            className="absolute right-4 top-4 grid place-items-center rounded-full"
            style={{
              width: "5.5rem",
              height: "5.5rem",
              border: "1px solid rgba(181,169,154,0.45)",
              backgroundColor: "rgba(255,255,255,0.42)",
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
              Imagem em desenvolvimento
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
      )}
    </AspectRatio>
  );
}
