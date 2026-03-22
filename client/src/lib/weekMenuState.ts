export const initialExpandedWeeks: string[] = [];

function getWeekPrefix(location: string): string | null {
  const [empty, section, week] = location.split("/");
  if (empty !== "" || section !== "semana" || !week) {
    return null;
  }

  return `/${section}/${week}`;
}

export function expandWeekFromLocation(
  expandedWeeks: string[],
  location: string
): string[] {
  const weekPrefix = getWeekPrefix(location);
  if (!weekPrefix || expandedWeeks.includes(weekPrefix)) {
    return expandedWeeks;
  }

  return [...expandedWeeks, weekPrefix];
}

export function toggleExpandedWeek(
  expandedWeeks: string[],
  weekPath: string
): string[] {
  return expandedWeeks.includes(weekPath)
    ? expandedWeeks.filter(item => item !== weekPath)
    : [...expandedWeeks, weekPath];
}

/**
 * Retorna o caminho para o próximo treino pendente com base no localStorage.
 */
export function getNextWorkoutPath(): string {
  try {
    const saved = localStorage.getItem("cf-checked-days");
    const checkedDays: number[] = saved ? JSON.parse(saved) : [];

    // Encontrar o primeiro dia (1-28) não concluído
    const firstMissing =
      Array.from({ length: 28 }, (_, i) => i + 1).find(
        d => !checkedDays.includes(d)
      ) || 1;

    const week = Math.ceil(firstMissing / 7);
    return `/semana/${week}/dia/${firstMissing}`;
  } catch {
    return "/semana/1";
  }
}
