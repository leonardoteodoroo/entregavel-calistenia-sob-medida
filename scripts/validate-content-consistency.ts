import fs from "node:fs";
import path from "node:path";
import { days } from "../client/src/lib/planData";

type ManifestExercise = {
  exercise_id: string;
  display_name: string;
  occurrences: string[];
  frames: string[];
  image_refs: {
    inicio: string | null;
    meio: string | null;
    fim: string | null;
  };
  prompt_refs: {
    inicio: string;
    meio: string;
    fim: string;
  };
};

type Manifest = {
  version: string;
  source_of_truth: string;
  generated_at?: string;
  exercises: ManifestExercise[];
  day_index: Array<{
    day: number;
    week: number;
    exercise_ids: string[];
  }>;
};

type ParsedTxtDay = {
  exercises: string[];
  adaptationLines: string[];
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseTxtPlan(filePath: string): Map<number, ParsedTxtDay> {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const result = new Map<number, ParsedTxtDay>();

  let currentDay: number | null = null;
  let inExercises = false;
  let inAdaptacao = false;

  for (const line of lines) {
    const dayMatch = line.match(/^SEMANA\s+\d+\s+·\s+DIA\s+(\d+)$/);
    if (dayMatch) {
      currentDay = Number(dayMatch[1]);
      if (!result.has(currentDay)) {
        result.set(currentDay, { exercises: [], adaptationLines: [] });
      }
      inExercises = false;
      inAdaptacao = false;
      continue;
    }

    if (line === "EXERCÍCIOS:") {
      inExercises = true;
      inAdaptacao = false;
      continue;
    }

    if (line === "INTENSIDADES:") {
      inExercises = false;
      inAdaptacao = false;
      continue;
    }

    if (line === "ADAPTAÇÃO:") {
      inAdaptacao = true;
      inExercises = false;
      continue;
    }

    if (line === "OBSERVAÇÃO:") {
      inAdaptacao = false;
      continue;
    }

    if (!currentDay || !result.has(currentDay)) {
      continue;
    }

    if (inExercises) {
      const exerciseMatch = line.match(/^\d+\.\s+(.+?)\s+—\s+/);
      if (exerciseMatch) {
        result.get(currentDay)!.exercises.push(exerciseMatch[1].trim());
      }
      continue;
    }

    if (inAdaptacao && line.trim() !== "") {
      result.get(currentDay)!.adaptationLines.push(line.trim());
    }
  }

  return result;
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function sortedEqual(a: string[], b: string[]): boolean {
  return arraysEqual(
    [...a].sort((x, y) => x.localeCompare(y, "pt-BR")),
    [...b].sort((x, y) => x.localeCompare(y, "pt-BR"))
  );
}

function main(): void {
  const root = process.cwd();
  const txtPath = path.join(root, "calistenia-feminina-conteudo-entregavel.txt");
  const manifestPath = path.join(root, "shared", "exercise-visual-manifest.json");

  const errors: string[] = [];

  if (!fs.existsSync(txtPath)) {
    errors.push("Missing file: calistenia-feminina-conteudo-entregavel.txt");
  }

  if (!fs.existsSync(manifestPath)) {
    errors.push("Missing file: shared/exercise-visual-manifest.json");
  }

  if (errors.length > 0) {
    console.error("Consistency validation failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as Manifest;
  const parsedTxt = parseTxtPlan(txtPath);

  if (days.length !== 28) {
    errors.push(`Expected 28 days in planData.ts, found ${days.length}`);
  }

  const dayNumbers = days.map((d) => d.day).sort((a, b) => a - b);
  const expectedDays = Array.from({ length: 28 }, (_, i) => i + 1);
  if (!arraysEqual(dayNumbers.map(String), expectedDays.map(String))) {
    errors.push("planData.ts day list is not exactly 1..28");
  }

  const uniqueExerciseNames = new Set(
    days.flatMap((d) => d.exercises.map((exercise) => exercise.name))
  );
  if (uniqueExerciseNames.size !== 24) {
    errors.push(`Expected 24 unique exercises in planData.ts, found ${uniqueExerciseNames.size}`);
  }

  if (!Array.isArray(manifest.exercises)) {
    errors.push("Manifest 'exercises' is not an array");
  } else if (manifest.exercises.length !== 24) {
    errors.push(`Expected 24 exercises in manifest, found ${manifest.exercises.length}`);
  }

  const byExerciseId = new Map<string, ManifestExercise>();
  for (const exercise of manifest.exercises || []) {
    byExerciseId.set(exercise.exercise_id, exercise);
    const expectedFrames = ["inicio", "meio", "fim"];
    if (!arraysEqual(exercise.frames || [], expectedFrames)) {
      errors.push(
        `Exercise '${exercise.display_name}' must have frames [inicio, meio, fim] in this order`
      );
    }

    for (const key of expectedFrames) {
      const value = exercise.image_refs?.[key as keyof ManifestExercise["image_refs"]];
      if (!(typeof value === "string" || value === null)) {
        errors.push(`Exercise '${exercise.display_name}' has invalid image_refs.${key}`);
      }
    }

    if (
      exercise.prompt_refs?.inicio !== "character_base_inicio" ||
      exercise.prompt_refs?.meio !== "character_base_meio" ||
      exercise.prompt_refs?.fim !== "character_base_fim"
    ) {
      errors.push(
        `Exercise '${exercise.display_name}' must use prompt refs character_base_inicio/meio/fim`
      );
    }
  }

  const planOccurrences = new Map<string, string[]>();
  for (const day of days) {
    const week = Math.ceil(day.day / 7);
    const occurrence = `S${week}D${day.day}`;
    for (const exercise of day.exercises) {
      const id = slugify(exercise.name);
      if (!planOccurrences.has(id)) {
        planOccurrences.set(id, []);
      }
      planOccurrences.get(id)!.push(occurrence);
    }
  }

  for (const [exerciseId, occurrences] of planOccurrences.entries()) {
    const manifestExercise = byExerciseId.get(exerciseId);
    if (!manifestExercise) {
      errors.push(`Manifest missing exercise_id '${exerciseId}'`);
      continue;
    }

    if (!sortedEqual(manifestExercise.occurrences, occurrences)) {
      errors.push(
        `Occurrences mismatch for '${manifestExercise.display_name}': manifest=${manifestExercise.occurrences.join(
          ", "
        )} plan=${occurrences.join(", ")}`
      );
    }
  }

  if (!Array.isArray(manifest.day_index) || manifest.day_index.length !== 28) {
    errors.push(`Expected 28 day_index entries in manifest, found ${manifest.day_index?.length ?? 0}`);
  } else {
    for (const day of days) {
      const indexEntry = manifest.day_index.find((entry) => entry.day === day.day);
      if (!indexEntry) {
        errors.push(`Missing day_index entry for day ${day.day}`);
        continue;
      }

      const expectedWeek = Math.ceil(day.day / 7);
      if (indexEntry.week !== expectedWeek) {
        errors.push(`day_index week mismatch for day ${day.day}: expected ${expectedWeek}, got ${indexEntry.week}`);
      }

      const expectedIds = day.exercises.map((exercise) => slugify(exercise.name));
      if (!arraysEqual(indexEntry.exercise_ids, expectedIds)) {
        errors.push(
          `day_index exercise_ids mismatch for day ${day.day}: expected ${expectedIds.join(
            ", "
          )}, got ${indexEntry.exercise_ids.join(", ")}`
        );
      }
    }
  }

  if (parsedTxt.size !== 28) {
    errors.push(`Expected 28 days in TXT plan, found ${parsedTxt.size}`);
  }

  for (const day of days) {
    const txtDay = parsedTxt.get(day.day);
    if (!txtDay) {
      errors.push(`TXT is missing day ${day.day}`);
      continue;
    }

    const expectedExercises = day.exercises.map((exercise) => exercise.name);
    if (!arraysEqual(txtDay.exercises, expectedExercises)) {
      errors.push(
        `TXT exercises mismatch on day ${day.day}: expected ${expectedExercises.join(
          " | "
        )}, got ${txtDay.exercises.join(" | ")}`
      );
    }

    const txtAdaptation = txtDay.adaptationLines.join(" ").trim();
    const expectedAdaptation = day.adaptacao.trim();
    if (txtAdaptation !== expectedAdaptation) {
      errors.push(
        `TXT adaptation mismatch on day ${day.day}: expected "${expectedAdaptation}" got "${txtAdaptation}"`
      );
    }
  }

  if (errors.length > 0) {
    console.error("Consistency validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("Consistency validation passed.");
  console.log(`Days checked: ${days.length}`);
  console.log(`Unique exercises in planData.ts: ${uniqueExerciseNames.size}`);
  console.log(`Manifest exercises: ${manifest.exercises.length}`);
}

main();
