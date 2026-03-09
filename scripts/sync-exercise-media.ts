import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

type ExerciseSpec = {
  exercise_id: string;
  display_name: string;
};

type ExerciseVisualSpecs = {
  exercises: ExerciseSpec[];
};

type MediaType = "video" | "single_image" | "split_images";

type ManifestEntry = {
  exercise_id: string;
  display_name: string;
  media_type: MediaType;
  public_paths:
    | { video: string }
    | { single_image: string }
    | { split_images: { "1": string; "2": string; "3": string } };
  alt_text:
    | { video: string }
    | { single_image: string }
    | { split_images: { "1": string; "2": string; "3": string } };
  source_folder: string;
  selected_files: string[];
  ignored_files: string[];
};

type Manifest = {
  version: string;
  generated_at: string;
  source_root: string;
  exercises: ManifestEntry[];
  summary: {
    total_exercises: number;
    videos: number;
    single_images: number;
    split_images: number;
  };
};

type Selection =
  | { media_type: "video"; selected_files: [string] }
  | { media_type: "single_image"; selected_files: [string] }
  | { media_type: "split_images"; selected_files: [string, string, string] };

const DEFAULT_SOURCE_ROOT = "/home/leonardotl/Área de trabalho/exercicio";
const OUTPUT_ROOT_RELATIVE = path.join("client", "public", "exercises");
const MANIFEST_PATH_RELATIVE = path.join(
  "shared",
  "exercise-media-manifest.json"
);
const VISUAL_SPECS_PATH_RELATIVE = path.join(
  "shared",
  "exercise-visual-specs.json"
);

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".m4v", ".webm"]);
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function parseArgs(argv: string[]): { dryRun: boolean; sourceRoot: string } {
  let dryRun = false;
  let sourceRoot = DEFAULT_SOURCE_ROOT;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }
    if (arg === "--source") {
      const next = argv[i + 1];
      if (!next) {
        throw new Error("Missing value for --source");
      }
      sourceRoot = next;
      i += 1;
      continue;
    }
  }

  return { dryRun, sourceRoot };
}

function readExerciseSpecs(projectRoot: string): ExerciseSpec[] {
  const visualSpecsPath = path.join(projectRoot, VISUAL_SPECS_PATH_RELATIVE);
  if (!fs.existsSync(visualSpecsPath)) {
    throw new Error(`Missing file: ${visualSpecsPath}`);
  }
  const raw = fs.readFileSync(visualSpecsPath, "utf8");
  const parsed = JSON.parse(raw) as ExerciseVisualSpecs;
  if (!Array.isArray(parsed.exercises) || parsed.exercises.length !== 24) {
    throw new Error(
      "Expected 24 exercises in shared/exercise-visual-specs.json"
    );
  }
  return parsed.exercises;
}

function getFilesFromFolder(folderPath: string): string[] {
  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function splitByMedia(files: string[]): { videos: string[]; images: string[] } {
  const videos: string[] = [];
  const images: string[] = [];

  for (const fileName of files) {
    const ext = path.extname(fileName).toLowerCase();
    if (VIDEO_EXTENSIONS.has(ext)) {
      videos.push(fileName);
      continue;
    }
    if (IMAGE_EXTENSIONS.has(ext)) {
      images.push(fileName);
    }
  }

  return { videos, images };
}

function selectByPriority(files: string[]): Selection {
  const { videos, images } = splitByMedia(files);

  if (videos.length > 0) {
    return {
      media_type: "video",
      selected_files: [videos[0]],
    };
  }

  const imageByBaseName = new Map<string, string[]>();
  for (const image of images) {
    const baseName = path.basename(image, path.extname(image)).toLowerCase();
    if (!imageByBaseName.has(baseName)) {
      imageByBaseName.set(baseName, []);
    }
    imageByBaseName.get(baseName)!.push(image);
  }

  const singleCandidates = imageByBaseName.get("123") ?? [];
  if (singleCandidates.length > 0) {
    return {
      media_type: "single_image",
      selected_files: [singleCandidates[0]],
    };
  }

  if (images.length === 1) {
    return {
      media_type: "single_image",
      selected_files: [images[0]],
    };
  }

  const pos1 = imageByBaseName.get("1")?.[0];
  const pos2 = imageByBaseName.get("2")?.[0];
  const pos3 = imageByBaseName.get("3")?.[0];

  if (pos1 && pos2 && pos3) {
    return {
      media_type: "split_images",
      selected_files: [pos1, pos2, pos3],
    };
  }

  throw new Error(
    `Could not resolve media selection. Available files: ${files.join(", ")}`
  );
}

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function clearExerciseOutputDir(dirPath: string): void {
  ensureDir(dirPath);
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const absolute = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(absolute, { recursive: true, force: true });
      continue;
    }
    fs.rmSync(absolute, { force: true });
  }
}

function copyOrRemuxVideo(source: string, destination: string): void {
  const ext = path.extname(source).toLowerCase();
  if (ext === ".mp4") {
    fs.copyFileSync(source, destination);
    return;
  }

  execFileSync(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-i", source, "-c", "copy", destination],
    { stdio: "inherit" }
  );
}

function convertImageToWebp(source: string, destination: string): void {
  execFileSync(
    "convert",
    [
      source,
      "-strip",
      "-quality",
      "92",
      "-define",
      "webp:method=6",
      "-define",
      "webp:thread-level=1",
      "-define",
      "webp:sns-strength=80",
      "-define",
      "webp:filter-strength=35",
      destination,
    ],
    { stdio: "inherit" }
  );
}

function createManifestEntry(
  exercise: ExerciseSpec,
  sourceFolderPath: string,
  sourceFiles: string[],
  selection: Selection
): ManifestEntry {
  const selectedSet = new Set(selection.selected_files);
  const ignoredFiles = sourceFiles.filter(
    fileName => !selectedSet.has(fileName)
  );
  const publicBase = `/exercises/${exercise.exercise_id}`;

  if (selection.media_type === "video") {
    return {
      exercise_id: exercise.exercise_id,
      display_name: exercise.display_name,
      media_type: "video",
      public_paths: {
        video: `${publicBase}/video.mp4`,
      },
      alt_text: {
        video: `Video do exercicio ${exercise.display_name}`,
      },
      source_folder: sourceFolderPath,
      selected_files: selection.selected_files,
      ignored_files: ignoredFiles,
    };
  }

  if (selection.media_type === "single_image") {
    return {
      exercise_id: exercise.exercise_id,
      display_name: exercise.display_name,
      media_type: "single_image",
      public_paths: {
        single_image: `${publicBase}/single.webp`,
      },
      alt_text: {
        single_image: `${exercise.display_name} com posicoes 1, 2 e 3 na mesma imagem`,
      },
      source_folder: sourceFolderPath,
      selected_files: selection.selected_files,
      ignored_files: ignoredFiles,
    };
  }

  return {
    exercise_id: exercise.exercise_id,
    display_name: exercise.display_name,
    media_type: "split_images",
    public_paths: {
      split_images: {
        "1": `${publicBase}/1.webp`,
        "2": `${publicBase}/2.webp`,
        "3": `${publicBase}/3.webp`,
      },
    },
    alt_text: {
      split_images: {
        "1": `${exercise.display_name} - posicao 1`,
        "2": `${exercise.display_name} - posicao 2`,
        "3": `${exercise.display_name} - posicao 3`,
      },
    },
    source_folder: sourceFolderPath,
    selected_files: selection.selected_files,
    ignored_files: ignoredFiles,
  };
}

function writeSelectedMedia(
  projectRoot: string,
  sourceFolderPath: string,
  exerciseId: string,
  selection: Selection
): void {
  const outputDir = path.join(projectRoot, OUTPUT_ROOT_RELATIVE, exerciseId);
  clearExerciseOutputDir(outputDir);

  if (selection.media_type === "video") {
    const source = path.join(sourceFolderPath, selection.selected_files[0]);
    const destination = path.join(outputDir, "video.mp4");
    copyOrRemuxVideo(source, destination);
    return;
  }

  if (selection.media_type === "single_image") {
    const source = path.join(sourceFolderPath, selection.selected_files[0]);
    const destination = path.join(outputDir, "single.webp");
    convertImageToWebp(source, destination);
    return;
  }

  const [img1, img2, img3] = selection.selected_files;
  convertImageToWebp(
    path.join(sourceFolderPath, img1),
    path.join(outputDir, "1.webp")
  );
  convertImageToWebp(
    path.join(sourceFolderPath, img2),
    path.join(outputDir, "2.webp")
  );
  convertImageToWebp(
    path.join(sourceFolderPath, img3),
    path.join(outputDir, "3.webp")
  );
}

function main(): void {
  const { dryRun, sourceRoot } = parseArgs(process.argv.slice(2));
  const projectRoot = process.cwd();

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Source root not found: ${sourceRoot}`);
  }

  const exercises = readExerciseSpecs(projectRoot);
  const manifestEntries: ManifestEntry[] = [];
  const counters = { videos: 0, single_images: 0, split_images: 0 };

  for (const exercise of exercises) {
    const sourceFolderPath = path.join(sourceRoot, exercise.display_name);
    if (!fs.existsSync(sourceFolderPath)) {
      throw new Error(
        `Missing folder for exercise '${exercise.display_name}': ${sourceFolderPath}`
      );
    }

    const sourceFiles = getFilesFromFolder(sourceFolderPath);
    const selection = selectByPriority(sourceFiles);

    if (!dryRun) {
      writeSelectedMedia(
        projectRoot,
        sourceFolderPath,
        exercise.exercise_id,
        selection
      );
    }

    const entry = createManifestEntry(
      exercise,
      sourceFolderPath,
      sourceFiles,
      selection
    );
    manifestEntries.push(entry);

    if (selection.media_type === "video") counters.videos += 1;
    if (selection.media_type === "single_image") counters.single_images += 1;
    if (selection.media_type === "split_images") counters.split_images += 1;

    console.log(
      `[${selection.media_type}] ${exercise.display_name} -> ${selection.selected_files.join(", ")}`
    );
  }

  const manifest: Manifest = {
    version: "1.0.0",
    generated_at: new Date().toISOString(),
    source_root: sourceRoot,
    exercises: manifestEntries,
    summary: {
      total_exercises: manifestEntries.length,
      videos: counters.videos,
      single_images: counters.single_images,
      split_images: counters.split_images,
    },
  };

  if (!dryRun) {
    const manifestPath = path.join(projectRoot, MANIFEST_PATH_RELATIVE);
    fs.writeFileSync(
      manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8"
    );
    console.log(`Manifest written to ${manifestPath}`);
  }

  console.log(
    `Resolved exercises: ${manifestEntries.length} (videos=${counters.videos}, single_images=${counters.single_images}, split_images=${counters.split_images})`
  );
  if (dryRun) {
    console.log("Dry-run mode: no files were written.");
  }
}

main();
