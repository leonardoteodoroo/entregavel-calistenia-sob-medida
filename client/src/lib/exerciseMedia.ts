import mediaManifest from "@shared/exercise-media-manifest.json";

type RawManifestEntry = {
  exercise_id: string;
  display_name: string;
  media_type: "video" | "single_image" | "split_images";
  public_paths:
    | { video: string }
    | { single_image: string }
    | { split_images: { "1": string; "2": string; "3": string } };
  alt_text:
    | { video: string }
    | { single_image: string }
    | { split_images: { "1": string; "2": string; "3": string } };
};

type RawManifest = {
  exercises: RawManifestEntry[];
};

export type ExerciseMedia =
  | {
      mediaType: "video";
      video: {
        src: string;
        alt: string;
      };
    }
  | {
      mediaType: "single_image";
      image: {
        src: string;
        alt: string;
      };
    }
  | {
      mediaType: "split_images";
      images: Array<{
        label: "Posição 1" | "Posição 2" | "Posição 3";
        src: string;
        alt: string;
      }>;
    };

const typedManifest = mediaManifest as RawManifest;

const mediaByDisplayName = new Map(
  typedManifest.exercises.map(entry => [entry.display_name, entry])
);

function withBasePublicPath(assetPath: string): string {
  if (!assetPath.startsWith("/")) return assetPath;

  const baseUrl = import.meta.env.BASE_URL || "/";
  if (baseUrl === "/") return assetPath;

  return `${baseUrl.replace(/\/$/, "")}${assetPath}`;
}

export function getExerciseMedia(exerciseName: string): ExerciseMedia | null {
  const entry = mediaByDisplayName.get(exerciseName);
  if (!entry) return null;

  if (entry.media_type === "video") {
    const publicPaths = entry.public_paths as { video: string };
    const altText = entry.alt_text as { video: string };
    return {
      mediaType: "video",
      video: {
        src: withBasePublicPath(publicPaths.video),
        alt: altText.video,
      },
    };
  }

  if (entry.media_type === "single_image") {
    const publicPaths = entry.public_paths as { single_image: string };
    const altText = entry.alt_text as { single_image: string };
    return {
      mediaType: "single_image",
      image: {
        src: withBasePublicPath(publicPaths.single_image),
        alt: altText.single_image,
      },
    };
  }

  const publicPaths = entry.public_paths as {
    split_images: { "1": string; "2": string; "3": string };
  };
  const altText = entry.alt_text as {
    split_images: { "1": string; "2": string; "3": string };
  };

  return {
    mediaType: "split_images",
    images: [
      {
        label: "Posição 1",
        src: withBasePublicPath(publicPaths.split_images["1"]),
        alt: altText.split_images["1"],
      },
      {
        label: "Posição 2",
        src: withBasePublicPath(publicPaths.split_images["2"]),
        alt: altText.split_images["2"],
      },
      {
        label: "Posição 3",
        src: withBasePublicPath(publicPaths.split_images["3"]),
        alt: altText.split_images["3"],
      },
    ],
  };
}
