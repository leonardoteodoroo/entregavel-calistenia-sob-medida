import { useState } from "react";
import { Play } from "lucide-react";
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

  return (
    <div className="space-y-4">
      <VideoPlaceholder />
      <div className="md:hidden mt-4">
        <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={positions[activeIndex].src}
            alt={positions[activeIndex].alt}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={1024}
            height={1024}
          />
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
