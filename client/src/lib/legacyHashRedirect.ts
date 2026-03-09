const SECTION_ROUTE_MAP: Record<string, string> = {
  "biblioteca-exercicios": "/biblioteca",
  checklist: "/checklist",
  faq: "/faq",
  "apoio-suporte": "/apoio",
  continuidade: "/apoio",
  "perdi-dias": "/apoio",
  capa: "/",
  "boas-vindas": "/",
  "para-quem": "/",
  "como-usar": "/",
  estrutura: "/",
  "visao-geral": "/",
  encaixe: "/",
  "escolher-caminho": "/",
  "comeca-hoje": "/",
  "o-que-esperar": "/",
  "sinais-progresso": "/",
};

function weekForDay(day: number): number {
  return Math.ceil(day / 7);
}

function parseLegacyHash(hashValue: string): string | null {
  const value = hashValue.trim().replace(/^#/, "");
  if (!value) return null;

  if (
    value === "/" ||
    value.startsWith("/semana/") ||
    value === "/biblioteca" ||
    value === "/checklist" ||
    value === "/faq" ||
    value === "/apoio"
  ) {
    return null;
  }

  const normalized = value.startsWith("/") ? value.slice(1) : value;

  const legacyDayMatch = normalized.match(/^dia-(\d{1,2})$/);
  if (legacyDayMatch) {
    const day = Number(legacyDayMatch[1]);
    if (day >= 1 && day <= 28) {
      return `/semana/${weekForDay(day)}/dia/${day}`;
    }
  }

  const legacyWeekMatch = normalized.match(/^semana-(\d)$/);
  if (legacyWeekMatch) {
    const week = Number(legacyWeekMatch[1]);
    if (week >= 1 && week <= 4) {
      return `/semana/${week}`;
    }
  }

  return SECTION_ROUTE_MAP[normalized] ?? null;
}

export function redirectLegacyHashIfNeeded(): void {
  if (typeof window === "undefined") return;

  const redirectedPath = parseLegacyHash(window.location.hash);
  if (!redirectedPath) return;

  const nextHash = `#${redirectedPath}`;
  if (window.location.hash === nextHash) return;

  window.history.replaceState(
    null,
    document.title,
    `${window.location.pathname}${window.location.search}${nextHash}`
  );
}
