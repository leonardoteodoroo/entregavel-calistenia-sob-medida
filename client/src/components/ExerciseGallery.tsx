import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { ExerciseMedia } from "@/lib/exerciseMedia";

interface ExerciseGalleryProps {
  exerciseName: string;
  media: ExerciseMedia;
}

function VideoPlaceholder() {
  return (
    <div className="flex justify-center">
      <div
        className="flex items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-muted-foreground/20"
        style={{
          width: "400px",
          height: "100px",
          maxWidth: "100%",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <Play
            size={24}
            className="text-muted-foreground/60"
            fill="currentColor"
          />
          <span className="font-body text-xs uppercase tracking-wide text-muted-foreground/70">
            Biblioteca de videos em atualizacao
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ExerciseGallery({
  exerciseName,
  media,
}: ExerciseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  if (media.mediaType === "video") {
    if (!videoLoaded) {
      return (
        <div className="space-y-4">
          <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border border-muted-foreground/20">
            <button
              onClick={() => setVideoLoaded(true)}
              className="w-full h-full flex flex-col items-center justify-center gap-2 px-4"
              type="button"
              aria-label={`Carregar vídeo de ${exerciseName}`}
            >
              <Play
                size={28}
                className="text-muted-foreground/70"
                fill="currentColor"
              />
              <span className="font-body text-xs uppercase tracking-wide text-muted-foreground/80 text-center">
                Toque para carregar o vídeo
              </span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border border-muted-foreground/20">
          <video
            controls
            preload="none"
            playsInline
            className="w-full h-full object-cover"
            aria-label={media.video.alt}
          >
            <source src={media.video.src} type="video/mp4" />
            Seu navegador nao suporta video HTML5.
          </video>
        </div>
      </div>
    );
  }

  if (media.mediaType === "single_image") {
    return (
      <div className="space-y-4">
        <VideoPlaceholder />
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border border-muted-foreground/20">
          <img
            src={media.image.src}
            alt={media.image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
          />
        </div>
      </div>
    );
  }

  const positions = media.images;
  const hasThreeImageSequence = positions.length === 3;
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < positions.length - 1;

  function goToPrevious() {
    setActiveIndex(current => Math.max(current - 1, 0));
  }

  function goToNext() {
    setActiveIndex(current => Math.min(current + 1, positions.length - 1));
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    if (!hasThreeImageSequence) return;
    const nextX = event.touches[0]?.clientX;
    if (typeof nextX !== "number") return;
    touchStartX.current = nextX;
    touchCurrentX.current = nextX;
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (!hasThreeImageSequence) return;
    const nextX = event.touches[0]?.clientX;
    if (typeof nextX !== "number") return;
    touchCurrentX.current = nextX;
  }

  function handleTouchEnd() {
    if (!hasThreeImageSequence) return;

    const startX = touchStartX.current;
    const endX = touchCurrentX.current;

    touchStartX.current = null;
    touchCurrentX.current = null;

    if (typeof startX !== "number" || typeof endX !== "number") return;

    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 36) return;

    if (deltaX < 0 && canGoNext) {
      goToNext();
    }

    if (deltaX > 0 && canGoPrevious) {
      goToPrevious();
    }
  }

  return (
    <div className="space-y-4">
      <VideoPlaceholder />
      <div className="md:hidden mt-4">
        <div
          className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={positions[activeIndex].src}
            src={positions[activeIndex].src}
            alt={positions[activeIndex].alt}
            className="w-full h-full object-cover animate-fade-in"
            loading="lazy"
            decoding="async"
            width={1024}
            height={1024}
          />

          {hasThreeImageSequence && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                aria-label={`Ver imagem anterior de ${exerciseName}`}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: canGoPrevious
                    ? "rgba(249, 246, 240, 0.92)"
                    : "rgba(249, 246, 240, 0.58)",
                  color: canGoPrevious
                    ? "var(--color-charcoal)"
                    : "var(--color-taupe)",
                  boxShadow: "0 8px 24px rgba(44, 44, 44, 0.12)",
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={!canGoNext}
                aria-label={`Ver próxima imagem de ${exerciseName}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: canGoNext
                    ? "rgba(249, 246, 240, 0.92)"
                    : "rgba(249, 246, 240, 0.58)",
                  color: canGoNext
                    ? "var(--color-charcoal)"
                    : "var(--color-taupe)",
                  boxShadow: "0 8px 24px rgba(44, 44, 44, 0.12)",
                }}
              >
                <ChevronRight size={18} />
              </button>

              <div
                className="absolute left-1/2 bottom-3 -translate-x-1/2 rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: "rgba(44, 44, 44, 0.7)",
                  color: "var(--color-ivory)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {activeIndex + 1}/{positions.length}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 justify-center mt-3">
          {positions.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-accent w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`${exerciseName} - ${positions[index].label}`}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-2">
          {positions[activeIndex].label}
        </p>

        {hasThreeImageSequence && (
          <p
            className="font-body text-center mt-1"
            style={{
              fontSize: "0.72rem",
              color: "var(--color-taupe)",
              letterSpacing: "0.04em",
            }}
          >
            Arraste para o lado ou use as setas
          </p>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-4 mt-4">
        {positions.map((position, index) => (
          <div key={index} className="space-y-2">
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={position.src}
                alt={position.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1024}
                height={1024}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground uppercase tracking-wide">
              {position.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
