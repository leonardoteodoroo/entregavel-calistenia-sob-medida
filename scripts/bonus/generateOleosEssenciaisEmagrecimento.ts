import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateOleosEssenciaisEmagrecimentoArtifacts } from "../../shared/bonus/oleosEssenciaisEmagrecimentoSemantic";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");

const sourcePath = path.resolve(
  repoRoot,
  "docs/Transformar em Bonus/Óleos Essenciais e Emoções no Emagrecimento/Óleos Essenciais e Emoções no Emagrecimento.txt"
);
const outputDir = path.resolve(
  repoRoot,
  "client/src/content/bonus/generated"
);

async function main() {
  const text = await fs.readFile(sourcePath, "utf-8");
  const artifacts = generateOleosEssenciaisEmagrecimentoArtifacts({
    documentId: "oleos-essenciais-emocoes-emagrecimento",
    sourcePath: path.relative(repoRoot, sourcePath),
    text,
  });

  await fs.mkdir(outputDir, { recursive: true });

  const masterPath = path.join(
    outputDir,
    "oleos-essenciais-emocoes-emagrecimento.master.json"
  );
  const contentPath = path.join(
    outputDir,
    "oleos-essenciais-emocoes-emagrecimento.content.json"
  );

  await fs.writeFile(`${masterPath}`, `${JSON.stringify(artifacts.master, null, 2)}\n`);
  await fs.writeFile(
    `${contentPath}`,
    `${JSON.stringify(artifacts.content, null, 2)}\n`
  );

  console.log(
    [
      "Geracao concluida:",
      `- source: ${path.relative(repoRoot, sourcePath)}`,
      `- master: ${path.relative(repoRoot, masterPath)}`,
      `- content: ${path.relative(repoRoot, contentPath)}`,
      `- entities: ${artifacts.content.stats.entityCount}`,
      `- blocks: ${artifacts.master.stats.blockCount}`,
    ].join("\n")
  );
}

main().catch(error => {
  console.error("Falha ao gerar os artefatos semânticos:", error);
  process.exitCode = 1;
});
