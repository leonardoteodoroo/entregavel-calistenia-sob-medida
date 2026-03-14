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
