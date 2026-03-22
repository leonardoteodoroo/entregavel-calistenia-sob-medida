import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarRange,
  Dumbbell,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  institutionalHeaderLinks,
  productRoutes,
  siteConfig,
  toPublicPath,
  toSpaHashPath,
} from "./siteConfig";

export type StickyNavKey =
  | "treino"
  | "plano"
  | "biblioteca"
  | "progresso"
  | "extras";

export type NavContext = "product" | "institutional";

export interface NavChild {
  label: string;
  to: string;
}

export interface ProductNavSection {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
  emphasis?: boolean;
  children?: NavChild[];
}

export interface StickyNavItem {
  key: StickyNavKey;
  label: string;
  icon: LucideIcon;
  path: string;
  isActive: (currentPath: string) => boolean;
}

export interface DrawerMenuItem {
  label: string;
  href: string;
  external?: boolean;
  children?: DrawerMenuItem[];
}

export interface DrawerMenuSection {
  title: string;
  items: DrawerMenuItem[];
}

export function normalizeNavPath(path: string): string {
  if (!path) return "/";

  const [pathname] = path.split(/[?#]/);
  if (!pathname || pathname === "/") return "/";

  return pathname.replace(/\/+$/, "") || "/";
}

export function isProductRouteActive(currentPath: string, to: string): boolean {
  const normalizedCurrentPath = normalizeNavPath(currentPath);
  const normalizedTarget = normalizeNavPath(to);

  if (normalizedTarget === "/") return normalizedCurrentPath === "/";
  return (
    normalizedCurrentPath === normalizedTarget ||
    normalizedCurrentPath.startsWith(`${normalizedTarget}/`)
  );
}

function createWeekChildren(week: number): NavChild[] {
  const startDay = (week - 1) * 7 + 1;

  return Array.from({ length: 7 }, (_, index) => ({
    label: `Dia ${startDay + index}`,
    to: `/semana/${week}/dia/${startDay + index}`,
  }));
}

export const productNavSections: ProductNavSection[] = [
  { label: "Início", to: productRoutes.home },
  { label: "Biblioteca de exercícios", to: productRoutes.biblioteca },
  {
    label: "Semana 1",
    to: "/semana/1",
    children: createWeekChildren(1),
  },
  {
    label: "Semana 2",
    to: "/semana/2",
    children: createWeekChildren(2),
  },
  {
    label: "Semana 3",
    to: "/semana/3",
    children: createWeekChildren(3),
  },
  {
    label: "Semana 4",
    to: "/semana/4",
    children: createWeekChildren(4),
  },
  { label: "Checklist", to: productRoutes.checklist },
  { label: "FAQ", to: productRoutes.faq },
  {
    label: "Apoio e continuidade",
    to: productRoutes.apoio,
    emphasis: true,
  },
  { label: "Bônus", to: productRoutes.bonus },
  {
    label: "BLOG 🧡",
    href: siteConfig.blogUrl,
    external: true,
  },
];

export const stickyNavItems: StickyNavItem[] = [
  {
    key: "treino",
    label: "Treino",
    icon: Dumbbell,
    path: "/semana/1",
    isActive: currentPath =>
      normalizeNavPath(currentPath).startsWith("/semana/"),
  },
  {
    key: "plano",
    label: "Plano",
    icon: CalendarRange,
    path: productRoutes.home,
    isActive: currentPath =>
      normalizeNavPath(currentPath) === productRoutes.home,
  },
  {
    key: "biblioteca",
    label: "Biblioteca",
    icon: BookOpen,
    path: productRoutes.biblioteca,
    isActive: currentPath =>
      isProductRouteActive(currentPath, productRoutes.biblioteca),
  },
  {
    key: "progresso",
    label: "Progresso",
    icon: TrendingUp,
    path: productRoutes.checklist,
    isActive: currentPath =>
      isProductRouteActive(currentPath, productRoutes.checklist),
  },
  {
    key: "extras",
    label: "Extras",
    icon: Sparkles,
    path: productRoutes.bonus,
    isActive: currentPath =>
      normalizeNavPath(currentPath) === productRoutes.bonus,
  },
];

const institutionalPaths = new Set(
  institutionalHeaderLinks.map(link => toPublicPath(link.slug))
);

export function isMenuTriggerActive(currentPath: string): boolean {
  const normalizedCurrentPath = normalizeNavPath(currentPath);

  return (
    normalizedCurrentPath === productRoutes.faq ||
    normalizedCurrentPath === productRoutes.apoio ||
    institutionalPaths.has(normalizedCurrentPath)
  );
}

export function toStickyNavHref(path: string): string {
  return toSpaHashPath(path);
}

function toDrawerItemTarget(href: string): string {
  const hashIndex = href.indexOf("#");
  if (hashIndex >= 0) {
    const hashPath = href.slice(hashIndex + 1);
    return hashPath.startsWith("/") ? hashPath : `/${hashPath}`;
  }

  return href;
}

export function isDrawerItemActive(
  item: DrawerMenuItem,
  currentPath: string
): boolean {
  const target = normalizeNavPath(toDrawerItemTarget(item.href));
  const normalizedCurrentPath = normalizeNavPath(currentPath);

  if (target === "/") {
    return normalizedCurrentPath === "/";
  }

  return (
    normalizedCurrentPath === target ||
    normalizedCurrentPath.startsWith(`${target}/`) ||
    Boolean(
      item.children?.some(child =>
        isDrawerItemActive(child, normalizedCurrentPath)
      )
    )
  );
}

export function toAppPathFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex < 0) return null;

  const hashPath = href.slice(hashIndex + 1);
  if (!hashPath) return null;

  return hashPath.startsWith("/") ? hashPath : `/${hashPath}`;
}

export function getDrawerMenuSections(): DrawerMenuSection[] {
  const programItems: DrawerMenuItem[] = [
    {
      label: "Início",
      href: toSpaHashPath(productRoutes.home),
    },
    ...Array.from({ length: 4 }, (_, index) => {
      const weekNumber = index + 1;
      const weekPath = `/semana/${weekNumber}`;

      return {
        label: `Semana ${weekNumber}`,
        href: toSpaHashPath(weekPath),
        children: createWeekChildren(weekNumber).map(child => ({
          label: child.label,
          href: toSpaHashPath(child.to),
        })),
      };
    }),
    {
      label: "FAQ",
      href: toSpaHashPath(productRoutes.faq),
    },
    {
      label: "Apoio",
      href: toSpaHashPath(productRoutes.apoio),
    },
  ];

  const institutionalItems: DrawerMenuItem[] = institutionalHeaderLinks.map(
    link => ({
      label: link.label,
      href: toPublicPath(link.slug),
    })
  );

  return [
    {
      title: "Programa",
      items: programItems,
    },
    {
      title: "Institucional",
      items: institutionalItems,
    },
    {
      title: "Externo",
      items: [
        {
          label: "Blog",
          href: siteConfig.blogUrl,
          external: true,
        },
      ],
    },
  ];
}
