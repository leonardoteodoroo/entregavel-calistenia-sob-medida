import {
  isOleosDetailEntityId,
  isOleosSectionId,
  type OleosDetailEntityId,
  type OleosSectionId,
} from "./oleosEssenciaisEmagrecimentoMvpData";

const HOME_HASHES = new Set(["", "#", "#/", "#/home"]);
const SECTION_PREFIX = "#/secao/";
const DETAIL_PREFIX = "#/detalhe/";

export type OleosStandaloneRoute =
  | { view: "home" }
  | { view: "section"; sectionId: OleosSectionId }
  | { view: "detail"; entityId: OleosDetailEntityId };

export function buildOleosHash(route: OleosStandaloneRoute): string {
  if (route.view === "home") return "#/home";
  if (route.view === "detail") {
    return `${DETAIL_PREFIX}${encodeURIComponent(route.entityId)}`;
  }
  return `${SECTION_PREFIX}${route.sectionId.replace(/^section:/, "")}`;
}

export function readOleosRouteFromHash(hash: string): OleosStandaloneRoute {
  if (HOME_HASHES.has(hash)) {
    return { view: "home" };
  }

  if (hash.startsWith(DETAIL_PREFIX)) {
    let entityId = "";
    try {
      entityId = decodeURIComponent(hash.slice(DETAIL_PREFIX.length)).trim();
    } catch {
      return { view: "home" };
    }

    if (!entityId || !isOleosDetailEntityId(entityId)) {
      return { view: "home" };
    }
    return { view: "detail", entityId };
  }

  if (hash.startsWith(SECTION_PREFIX)) {
    let slug = "";
    try {
      slug = decodeURIComponent(hash.slice(SECTION_PREFIX.length)).trim();
    } catch {
      return { view: "home" };
    }

    if (!slug) return { view: "home" };

    const sectionId = `section:${slug}`;
    if (!isOleosSectionId(sectionId)) {
      return { view: "home" };
    }

    return { view: "section", sectionId };
  }

  return { view: "home" };
}
