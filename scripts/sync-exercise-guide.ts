import fs from "node:fs";
import path from "node:path";

type MediaManifestEntry = {
  exercise_id: string;
  display_name: string;
};

type MediaManifest = {
  exercises: MediaManifestEntry[];
};

type StartMiddleEnd = {
  inicio: string;
  meio: string;
  fim: string;
};

type ExerciseGuideEntry = {
  exercise_id: string;
  display_name: string;
  objetivo: string;
  musculos_capacidades: string[];
  execucao_passo_a_passo: string[];
  inicio_meio_fim: StartMiddleEnd;
  principais_erros: string[];
  adaptacoes_iniciantes: string[];
  sinais_atencao: string[];
  cues: string[];
  nivel_complexidade: string;
  observacao_publico_alvo: string;
  fontes: Array<{ label: string; url: string }>;
};

type GuideManifest = {
  version: string;
  generated_at: string;
  source_report: string;
  exercises: ExerciseGuideEntry[];
  summary: {
    total_exercises: number;
  };
};

type HeadingBlock = {
  heading: string;
  content: string;
};

type ExerciseBlock = {
  order: number;
  displayName: string;
  content: string;
};

const PROJECT_ROOT = process.cwd();
const REPORT_PATH_RELATIVE = path.join(
  "docs",
  "research",
  "2026-03-08-relatorio-execucao-24-exercicios.md"
);
const MEDIA_MANIFEST_PATH_RELATIVE = path.join(
  "shared",
  "exercise-media-manifest.json"
);
const OUTPUT_PATH_RELATIVE = path.join(
  "shared",
  "exercise-guide-manifest.json"
);

const REQUIRED_SECTIONS = [
  "2. O que é / objetivo do exercício",
  "3. Principais músculos e capacidades trabalhadas",
  "4. Execução correta passo a passo",
  "8. Resumo rápido visual: início / meio / fim",
  "9. Principais erros de execução",
  "10. Adaptações seguras para iniciantes",
  "11. Sinais de atenção / quando ajustar ou interromper",
  "12. Comandos curtos de instrução (cues)",
  "13. Nível de complexidade",
  "14. Observação específica para o público-alvo",
  "Fontes",
] as const;

function normalizeKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function readFileOrThrow(relativePath: string): string {
  const absolutePath = path.join(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Arquivo não encontrado: ${absolutePath}`);
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function parseExerciseBlocks(report: string): ExerciseBlock[] {
  const headingRegex = /^##\s+(\d+)\.\s+(.+)\s*$/gm;
  const matches: Array<{
    index: number;
    order: number;
    displayName: string;
    contentStart: number;
  }> = [];

  for (const match of report.matchAll(headingRegex)) {
    const headingIndex = match.index;
    if (headingIndex === undefined) continue;
    matches.push({
      index: headingIndex,
      order: Number(match[1]),
      displayName: match[2].trim(),
      contentStart: headingIndex + match[0].length,
    });
  }

  if (matches.length !== 24) {
    throw new Error(
      `Esperados 24 blocos de exercício (## N. Nome), encontrados ${matches.length}.`
    );
  }

  return matches.map((match, index) => {
    const next = matches[index + 1];
    const content = report
      .slice(match.contentStart, next ? next.index : report.length)
      .trim();
    return {
      order: match.order,
      displayName: match.displayName,
      content,
    };
  });
}

function parseSections(exerciseBlock: ExerciseBlock): Map<string, string> {
  const sectionRegex = /^###\s+(.+)\s*$/gm;
  const matches: Array<{
    heading: string;
    index: number;
    contentStart: number;
  }> = [];

  for (const match of exerciseBlock.content.matchAll(sectionRegex)) {
    const sectionIndex = match.index;
    if (sectionIndex === undefined) continue;
    matches.push({
      heading: match[1].trim(),
      index: sectionIndex,
      contentStart: sectionIndex + match[0].length,
    });
  }

  const sections = new Map<string, string>();

  for (let i = 0; i < matches.length; i += 1) {
    const current = matches[i];
    const next = matches[i + 1];
    const content = exerciseBlock.content
      .slice(
        current.contentStart,
        next ? next.index : exerciseBlock.content.length
      )
      .trim();
    sections.set(current.heading, content);
  }

  return sections;
}

function getRequiredSection(
  sections: Map<string, string>,
  sectionHeading: string,
  exerciseName: string
): string {
  const content = sections.get(sectionHeading);
  if (!content) {
    throw new Error(
      `Seção obrigatória ausente em "${exerciseName}": "${sectionHeading}".`
    );
  }
  return content;
}

function toList(content: string): string[] {
  return content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line =>
      line
        .replace(/^[-*]\s+/, "")
        .replace(/^\d+\.\s+/, "")
        .replace(/^-\s+/, "")
        .trim()
    )
    .filter(line => line.length > 0);
}

function toSingleText(content: string): string {
  return content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join(" ");
}

function parseStartMiddleEnd(section8Content: string): StartMiddleEnd {
  const lines = toList(section8Content);
  const result: Partial<StartMiddleEnd> = {};

  for (const line of lines) {
    let label = "";
    let value = "";

    const boldMatch = line.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
    if (boldMatch) {
      label = normalizeKey(boldMatch[1].replace(/:\s*$/, ""));
      value = boldMatch[2].replace(/^:\s*/, "").trim();
    } else {
      const plainMatch = line.match(/^([^:]+):\s*(.+)$/);
      if (!plainMatch) continue;
      label = normalizeKey(plainMatch[1]);
      value = plainMatch[2].trim();
    }

    if (!value) continue;

    if (label.includes("inicio")) result.inicio = value;
    if (label.includes("meio")) result.meio = value;
    if (label.includes("fim")) result.fim = value;
  }

  if (!result.inicio || !result.meio || !result.fim) {
    throw new Error(
      "Não foi possível extrair início/meio/fim da seção 8. Verifique o padrão do relatório."
    );
  }

  return {
    inicio: result.inicio,
    meio: result.meio,
    fim: result.fim,
  };
}

function parseSources(content: string): Array<{ label: string; url: string }> {
  const sources: Array<{ label: string; url: string }> = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

  for (const match of content.matchAll(regex)) {
    sources.push({
      label: match[1].trim(),
      url: match[2].trim(),
    });
  }

  if (sources.length === 0) {
    throw new Error("Nenhuma fonte válida encontrada na seção de fontes.");
  }

  return sources;
}

function ensureRequiredSections(
  sections: Map<string, string>,
  exerciseName: string
): void {
  for (const section of REQUIRED_SECTIONS) {
    if (!sections.has(section)) {
      throw new Error(
        `Exercício "${exerciseName}" sem seção obrigatória: "${section}".`
      );
    }
  }
}

function loadMediaManifest(): MediaManifest {
  const raw = readFileOrThrow(MEDIA_MANIFEST_PATH_RELATIVE);
  const parsed = JSON.parse(raw) as MediaManifest;
  if (!Array.isArray(parsed.exercises) || parsed.exercises.length !== 24) {
    throw new Error(
      "Manifest de mídia inválido: esperado exercises[24] em shared/exercise-media-manifest.json."
    );
  }
  return parsed;
}

function validateNameConsistency(
  reportNames: string[],
  mediaEntries: MediaManifestEntry[]
): Map<string, string> {
  const mediaNames = mediaEntries.map(entry => entry.display_name);

  const missingInMedia = reportNames.filter(name => !mediaNames.includes(name));
  const missingInReport = mediaNames.filter(
    name => !reportNames.includes(name)
  );

  if (missingInMedia.length > 0 || missingInReport.length > 0) {
    throw new Error(
      `Inconsistência de nomes entre relatório e manifest de mídia.\n` +
        `Ausentes no manifest de mídia: ${missingInMedia.join(", ") || "nenhum"}\n` +
        `Ausentes no relatório: ${missingInReport.join(", ") || "nenhum"}`
    );
  }

  const map = new Map<string, string>();
  for (const entry of mediaEntries) {
    map.set(entry.display_name, entry.exercise_id);
  }
  return map;
}

function buildGuideManifest(
  exercises: ExerciseBlock[],
  exerciseIdByDisplayName: Map<string, string>
): GuideManifest {
  const entries: ExerciseGuideEntry[] = [];

  for (const exercise of exercises) {
    const sections = parseSections(exercise);
    ensureRequiredSections(sections, exercise.displayName);

    const objective = getRequiredSection(
      sections,
      "2. O que é / objetivo do exercício",
      exercise.displayName
    );
    const muscles = getRequiredSection(
      sections,
      "3. Principais músculos e capacidades trabalhadas",
      exercise.displayName
    );
    const execution = getRequiredSection(
      sections,
      "4. Execução correta passo a passo",
      exercise.displayName
    );
    const summary = getRequiredSection(
      sections,
      "8. Resumo rápido visual: início / meio / fim",
      exercise.displayName
    );
    const errors = getRequiredSection(
      sections,
      "9. Principais erros de execução",
      exercise.displayName
    );
    const adaptations = getRequiredSection(
      sections,
      "10. Adaptações seguras para iniciantes",
      exercise.displayName
    );
    const attention = getRequiredSection(
      sections,
      "11. Sinais de atenção / quando ajustar ou interromper",
      exercise.displayName
    );
    const cues = getRequiredSection(
      sections,
      "12. Comandos curtos de instrução (cues)",
      exercise.displayName
    );
    const complexity = getRequiredSection(
      sections,
      "13. Nível de complexidade",
      exercise.displayName
    );
    const targetObservation = getRequiredSection(
      sections,
      "14. Observação específica para o público-alvo",
      exercise.displayName
    );
    const sources = getRequiredSection(
      sections,
      "Fontes",
      exercise.displayName
    );

    const exerciseId = exerciseIdByDisplayName.get(exercise.displayName);
    if (!exerciseId) {
      throw new Error(
        `Exercise ID não encontrado para "${exercise.displayName}" no manifest de mídia.`
      );
    }

    entries.push({
      exercise_id: exerciseId,
      display_name: exercise.displayName,
      objetivo: toSingleText(objective),
      musculos_capacidades: toList(muscles),
      execucao_passo_a_passo: toList(execution),
      inicio_meio_fim: parseStartMiddleEnd(summary),
      principais_erros: toList(errors),
      adaptacoes_iniciantes: toList(adaptations),
      sinais_atencao: toList(attention),
      cues: toList(cues),
      nivel_complexidade: toSingleText(complexity),
      observacao_publico_alvo: toSingleText(targetObservation),
      fontes: parseSources(sources),
    });
  }

  return {
    version: "1.0.0",
    generated_at: new Date().toISOString(),
    source_report: REPORT_PATH_RELATIVE.replaceAll("\\", "/"),
    exercises: entries,
    summary: {
      total_exercises: entries.length,
    },
  };
}

function main(): void {
  const report = readFileOrThrow(REPORT_PATH_RELATIVE);
  const exerciseBlocks = parseExerciseBlocks(report);
  const reportNames = exerciseBlocks.map(entry => entry.displayName);

  const mediaManifest = loadMediaManifest();
  const exerciseIdByDisplayName = validateNameConsistency(
    reportNames,
    mediaManifest.exercises
  );

  const guideManifest = buildGuideManifest(
    exerciseBlocks,
    exerciseIdByDisplayName
  );

  const outputPath = path.join(PROJECT_ROOT, OUTPUT_PATH_RELATIVE);
  fs.writeFileSync(
    outputPath,
    `${JSON.stringify(guideManifest, null, 2)}\n`,
    "utf8"
  );

  console.log(
    `Manifest técnico gerado com sucesso em ${OUTPUT_PATH_RELATIVE} (${guideManifest.summary.total_exercises} exercícios).`
  );
}

main();
