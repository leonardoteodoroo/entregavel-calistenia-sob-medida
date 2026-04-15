import {
  institutionalSlugs,
  standaloneRoutes,
  type InstitutionalSlug,
  toPublicPath,
} from "@/content/siteConfig";

const LEGACY_INSTITUTIONAL_HASH_MAP: Record<string, InstitutionalSlug> = {
  "/sobre": institutionalSlugs.sobre,
  "/contato": institutionalSlugs.contato,
  "/politica-de-privacidade": institutionalSlugs.privacidade,
  "/termos-de-servico": institutionalSlugs.termos,
  "/aviso-legal": institutionalSlugs.avisoLegal,
};

const LEGACY_MEAL_PLAN_STANDALONE_PATH = standaloneRoutes.planoAlimentar;

export type RedirectTarget =
  | { type: "hash"; path: string }
  | { type: "clean-path"; href: string };

const SECTION_ROUTE_MAP: Record<string, RedirectTarget> = {
  alimentacao: {
    type: "clean-path",
    href: LEGACY_MEAL_PLAN_STANDALONE_PATH,
  },
  "plano-alimentar": {
    type: "clean-path",
    href: LEGACY_MEAL_PLAN_STANDALONE_PATH,
  },
  "biblioteca-exercicios": { type: "hash", path: "/biblioteca" },
  checklist: { type: "hash", path: "/checklist" },
  faq: { type: "hash", path: "/faq" },
  "apoio-suporte": { type: "hash", path: "/apoio" },
  continuidade: { type: "hash", path: "/apoio" },
  "perdi-dias": { type: "hash", path: "/apoio" },
  capa: { type: "hash", path: "/" },
  "boas-vindas": { type: "hash", path: "/" },
  "para-quem": { type: "hash", path: "/" },
  "como-usar": { type: "hash", path: "/" },
  estrutura: { type: "hash", path: "/" },
  "visao-geral": { type: "hash", path: "/" },
  encaixe: { type: "hash", path: "/" },
  "escolher-caminho": { type: "hash", path: "/" },
  "comeca-hoje": { type: "hash", path: "/" },
  "o-que-esperar": { type: "hash", path: "/" },
  "sinais-progresso": { type: "hash", path: "/" },
};

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

export function resolveLegacyHashRedirect(
  hashValue: string
): RedirectTarget | null {
  const value = hashValue.trim().replace(/^#/, "");
  if (!value) return null;

  const normalizedWithSlash = value.startsWith("/") ? value : `/${value}`;

  if (isCurrentHashRoute(normalizedWithSlash)) {
    return null;
  }

  const institutionalSlug = LEGACY_INSTITUTIONAL_HASH_MAP[normalizedWithSlash];
  if (institutionalSlug) {
    return { type: "clean-path", href: `/${institutionalSlug}` };
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
    return sectionRoute;
  }

  return null;
}

export function redirectLegacyHashIfNeeded(): void {
  if (typeof window === "undefined") return;

  const redirectTarget = resolveLegacyHashRedirect(window.location.hash);
  if (!redirectTarget) return;

  if (redirectTarget.type === "clean-path") {
    const nextPath = toPublicPath(redirectTarget.href);
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
