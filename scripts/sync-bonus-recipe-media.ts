import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

type BonusImageSpec = {
  sourceName: string;
  outputName: string;
};

const SOURCE_IMAGES: BonusImageSpec[] = [
  {
    sourceName: "Crepioca_low_carb_recheada_queijo_8fd805c02e.jpeg",
    outputName: "01-crepioca.webp",
  },
  {
    sourceName: "Baked_spinach_dumplings_on_plate_d7c8bca6f4.jpeg",
    outputName: "02-bolinho-espinafre-assado.webp",
  },
  {
    sourceName: "Chicken_souffle_in_ramekin_e7daa5a998.jpeg",
    outputName: "03-sufle-frango.webp",
  },
  {
    sourceName:
      "Fotografia_culinria_hiperrealista_de_picadinho_de__aa6263319c.jpeg",
    outputName: "04-picadinho-frango.webp",
  },
  {
    sourceName: "Hambrguer_caseiro_low_carb_prato_57421ec9b6.jpeg",
    outputName: "05-hamburguer-prato.webp",
  },
  {
    sourceName:
      "Fotografia_gastronmica_sofisticada_de_fil_de_peixe_48e8d4fd1c.jpeg",
    outputName: "06-file-peixe-assado.webp",
  },
  {
    sourceName: "Avocado_cream_served_in_bowl_2b02d81346.jpeg",
    outputName: "07-creme-abacate.webp",
  },
  {
    sourceName: "Banana_tapioca_on_plate_8effcb8dab.jpeg",
    outputName: "08-tapioca-banana.webp",
  },
  {
    sourceName: "Bolo_de_caneca_low_carb_0975210437.jpeg",
    outputName: "09-bolo-caneca.webp",
  },
  {
    sourceName:
      "Fotografia_food_editorial_realista_de_biscoitos_de_a996a700d1.jpeg",
    outputName: "10-biscoito-amendoim.webp",
  },
];

const OUTPUT_DIR = path.join("client", "public", "bonus", "receitas-low-carb");
const ARCHIVE_DIR = path.join(
  "archive",
  "source-images",
  "bonus",
  "receitas-low-carb"
);

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function convertImageToWebp(source: string, destination: string): void {
  execFileSync(
    "convert",
    [
      source,
      "-strip",
      "-quality",
      "90",
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

function resolveSourcePath(
  projectRoot: string,
  sourceName: string
): { sourcePath: string; shouldArchive: boolean; archivedPath: string } {
  const rootPath = path.join(projectRoot, sourceName);
  const archivedPath = path.join(projectRoot, ARCHIVE_DIR, sourceName);

  if (fs.existsSync(rootPath)) {
    return { sourcePath: rootPath, shouldArchive: true, archivedPath };
  }

  if (fs.existsSync(archivedPath)) {
    return { sourcePath: archivedPath, shouldArchive: false, archivedPath };
  }

  throw new Error(`Arquivo de origem não encontrado: ${sourceName}`);
}

function archiveSourceIfNeeded(
  sourcePath: string,
  archivedPath: string,
  shouldArchive: boolean
): void {
  if (!shouldArchive) return;

  ensureDir(path.dirname(archivedPath));

  if (fs.existsSync(archivedPath)) {
    fs.rmSync(archivedPath, { force: true });
  }

  fs.renameSync(sourcePath, archivedPath);
}

function run(): void {
  const projectRoot = process.cwd();
  const outputRoot = path.join(projectRoot, OUTPUT_DIR);

  ensureDir(outputRoot);
  ensureDir(path.join(projectRoot, ARCHIVE_DIR));

  let convertedCount = 0;
  let archivedCount = 0;

  for (const spec of SOURCE_IMAGES) {
    const resolved = resolveSourcePath(projectRoot, spec.sourceName);
    const outputPath = path.join(outputRoot, spec.outputName);

    convertImageToWebp(resolved.sourcePath, outputPath);
    convertedCount += 1;

    if (resolved.shouldArchive) {
      archiveSourceIfNeeded(
        resolved.sourcePath,
        resolved.archivedPath,
        resolved.shouldArchive
      );
      archivedCount += 1;
    }

    console.log(
      `[bonus-media] ${spec.sourceName} -> ${path.join(OUTPUT_DIR, spec.outputName)}`
    );
  }

  console.log(
    `[bonus-media] Concluído: ${convertedCount} imagem(ns) convertida(s), ${archivedCount} arquivo(s) movido(s) para ${ARCHIVE_DIR}.`
  );
}

run();
