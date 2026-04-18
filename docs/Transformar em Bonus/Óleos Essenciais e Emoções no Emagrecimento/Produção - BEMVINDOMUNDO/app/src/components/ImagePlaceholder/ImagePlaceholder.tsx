import styles from "./ImagePlaceholder.module.css";

export type ImagePlaceholderRatio = "3:4" | "16:9" | "4:3" | "1:1" | "3:2";

const aspectRatioMap: Record<ImagePlaceholderRatio, string> = {
  "3:4": "3 / 4",
  "16:9": "16 / 9",
  "4:3": "4 / 3",
  "1:1": "1 / 1",
  "3:2": "3 / 2",
};

export interface ImagePlaceholderProps {
  aspectRatio: ImagePlaceholderRatio;
  emoji: string;
  alt: string;
  pendingNote?: string;
  src?: string;
  className?: string;
}

export default function ImagePlaceholder({
  aspectRatio,
  emoji,
  alt,
  pendingNote,
  src,
  className,
}: ImagePlaceholderProps) {
  const resolvedClassName = [styles.frame, className].filter(Boolean).join(" ");

  return (
    <div
      className={resolvedClassName}
      style={{ aspectRatio: aspectRatioMap[aspectRatio] }}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : alt}
    >
      {src ? (
        <img
          className={styles.media}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.caption}>{alt}</span>
        </div>
      )}
      {pendingNote ? <span className={styles.note}>{pendingNote}</span> : null}
    </div>
  );
}
