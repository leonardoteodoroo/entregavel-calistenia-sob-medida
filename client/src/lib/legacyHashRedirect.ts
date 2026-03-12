import {
  institutionalSlugs,
  toPublicPath,
  type InstitutionalSlug,
} from "@/content/siteConfig";

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

const LEGACY_INSTITUTIONAL_HASH_MAP: Record<string, InstitutionalSlug> = {
  "/sobre": institutionalSlugs.sobre,
  "/contato": institutionalSlugs.contato,
  "/politica-de-privacidade": institutionalSlugs.privacidade,
  "/termos-de-servico": institutionalSlugs.termos,
  "/aviso-legal": institutionalSlugs.avisoLegal,
};

type RedirectTarget =
  | { type: "hash"; path: string }
  | { type: "clean-path"; slug: InstitutionalSlug };

function weekForDay(day: number): number {
  return Math.ceil(day / 7);
}

function isCurrentHashRoute(value: string): boolean {
  return (
    value === "/" ||
    value.startsWith("/semana/") ||
    value === "/biblioteca" ||
    value === "/checklist" ||
    value === "/faq" ||
    value === "/apoio"
  );
}

function parseLegacyHash(hashValue: string): RedirectTarget | null {
  const value = hashValue.trim().replace(/^#/, "");
  if (!value) return null;

  const normalizedWithSlash = value.startsWith("/") ? value : `/${value}`;

  if (isCurrentHashRoute(normalizedWithSlash)) {
    return null;
  }

  const institutionalSlug = LEGACY_INSTITUTIONAL_HASH_MAP[normalizedWithSlash];
  if (institutionalSlug) {
    return { type: "clean-path", slug: institutionalSlug };
  }

  const normalized = normalizedWithSlash.slice(1);

  const legacyDayMatch = normalized.match(/^dia-(\d{1,2})$/);
  if (legacyDayMatch) {
    const day = Number(legacyDayMatch[1]);
    if (day >= 1 && day <= 28) {
      return { type: "hash", path: `/semana/${weekForDay(day)}/dia/${day}` };
    }
  }

  const legacyWeekMatch = normalized.match(/^semana-(\d)$/);
  if (legacyWeekMatch) {
    const week = Number(legacyWeekMatch[1]);
    if (week >= 1 && week <= 4) {
      return { type: "hash", path: `/semana/${week}` };
    }
  }

  const sectionRoute = SECTION_ROUTE_MAP[normalized];
  if (sectionRoute) {
    return { type: "hash", path: sectionRoute };
  }

  return null;
}

export function redirectLegacyHashIfNeeded(): void {
  if (typeof window === "undefined") return;

  const redirectTarget = parseLegacyHash(window.location.hash);
  if (!redirectTarget) return;

  if (redirectTarget.type === "clean-path") {
    const nextPath = toPublicPath(redirectTarget.slug);
    const nextUrl = `${nextPath}${window.location.search}`;

    if (window.location.pathname === nextPath && window.location.hash === "") {
      return;
    }

    window.location.replace(nextUrl);
    return;
  }

  const nextHash = `#${redirectTarget.path}`;
  if (window.location.hash === nextHash) return;

  window.history.replaceState(
    null,
    document.title,
    `${window.location.pathname}${window.location.search}${nextHash}`
  );
}
