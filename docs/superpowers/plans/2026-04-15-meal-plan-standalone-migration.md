# Meal Plan Standalone Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o plano alimentar para um ambiente standalone do mesmo tipo dos outros bônus, enquanto o app principal volta a exibir apenas conteúdo de calistenia e o ícone `Plano` volta a abrir a home.

**Architecture:** Reutilizar o componente atual do plano alimentar como conteúdo do novo standalone para reduzir risco e evitar refatoração grande do planner. A migração separa ownership de rota: `/#/alimentacao` deixa de existir dentro da SPA principal, passa a redirecionar para um clean path standalone (`/plano-alimentar/`), e a navegação do app principal volta a ficar focada em treino, biblioteca, checklist, FAQ, apoio e bônus.

**Tech Stack:** React 19, Vite MPA, Wouter hash router, TypeScript, Vitest, gh-pages build pipeline

---

## File Structure

- **Create:** `client/plano-alimentar/index.html`
  - HTML multipage do novo bônus standalone.
- **Create:** `client/src/standalone/entries/plano-alimentar.tsx`
  - Entry point standalone que monta o planner dentro de `StandaloneLayout`.
- **Create:** `client/src/lib/legacyHashRedirect.test.ts`
  - Testes puros para garantir que links antigos `#/alimentacao` abram o novo standalone.
- **Modify:** `client/src/content/siteConfig.ts`
  - Adicionar rota standalone do plano alimentar.
- **Modify:** `vite.config.ts`
  - Registrar o novo multipage input e o redirect de barra final.
- **Modify:** `client/src/App.tsx`
  - Remover a rota SPA `/alimentacao` e o lazy-load do planner do app principal.
- **Modify:** `client/src/lib/legacyHashRedirect.ts`
  - Redirecionar `#/alimentacao` para o standalone.
- **Modify:** `client/src/content/siteConfig.test.ts`
  - Cobrir a nova standalone route.
- **Modify:** `client/src/content/navigation.ts`
  - Tirar o plano alimentar da navegação principal e fazer o sticky `Plano` voltar a apontar para `/`.
- **Modify:** `client/src/content/navigation.test.ts`
  - Ajustar a expectativa do sticky `Plano`.
- **Modify:** `client/src/components/navigation/SharedSidebar.tsx`
  - Remover o item `Plano alimentar` da sidebar principal.
- **Modify:** `client/src/components/navigation/MobileStickyNav.test.tsx`
  - Ajustar o índice ativo do sticky nav agora que `Plano` volta a ser a home.
- **Modify:** `client/src/pages/Home.tsx`
  - Fazer o card bônus `Seu Plano Alimentar` abrir o standalone.
- **Modify:** `client/src/pages/Home.test.tsx`
  - Verificar o novo link standalone do card bônus.

## Task 1: Criar o standalone `/plano-alimentar/`

**Files:**
- Create: `client/plano-alimentar/index.html`
- Create: `client/src/standalone/entries/plano-alimentar.tsx`
- Modify: `client/src/content/siteConfig.ts`
- Modify: `vite.config.ts`
- Test: `client/src/content/siteConfig.test.ts`

- [ ] **Step 1: Escrever o teste que falha para a rota standalone do plano**

Atualize `client/src/content/siteConfig.test.ts` para passar a exigir a rota standalone do plano alimentar:

```ts
import { describe, expect, it } from "vitest";

import { productRoutes, standaloneRoutes } from "./siteConfig";

describe("standalone routes", () => {
  it("exposes the meal planner standalone route", () => {
    const routes = standaloneRoutes as Record<string, string>;

    expect(routes.planoAlimentar).toBe("/plano-alimentar/");
  });

  it("exposes the sobremesas saudaveis standalone route", () => {
    const routes = standaloneRoutes as Record<string, string>;

    expect(routes.sobremesasSaudaveis).toBe("/sobremesas-saudaveis/");
  });

  it("exposes the oleos essenciais standalone route", () => {
    const routes = standaloneRoutes as Record<string, string>;

    expect(routes.oleosEssenciais).toBe("/oleos-essenciais-emagrecimento/");
  });
});

describe("product routes", () => {
  it("keeps the bonus route in the main SPA", () => {
    expect(productRoutes.bonus).toBe("/bonus");
  });
});
```

- [ ] **Step 2: Rodar o teste para confirmar a falha**

Run:

```bash
npx vitest run client/src/content/siteConfig.test.ts
```

Expected:

```txt
FAIL  client/src/content/siteConfig.test.ts
AssertionError: expected undefined to be '/plano-alimentar/'
```

- [ ] **Step 3: Implementar a rota standalone e registrar o multipage**

Atualize `client/src/content/siteConfig.ts`:

```ts
export const standaloneRoutes = {
  planoAlimentar: "/plano-alimentar/",
  receitasLowCarb: "/receitas-low-carb/",
  sobremesasSaudaveis: "/sobremesas-saudaveis/",
  oleosEssenciais: "/oleos-essenciais-emagrecimento/",
} as const;
```

Atualize `vite.config.ts`:

```ts
const slashRedirectPaths = new Set([
  "/lab",
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-servico",
  "/aviso-legal",
  "/plano-alimentar",
  "/receitas-low-carb",
  "/sobremesas-saudaveis",
  "/oleos-essenciais-emagrecimento",
]);

const multipageInputs = {
  app: path.resolve(clientRoot, "index.html"),
  lab: path.resolve(clientRoot, "lab", "index.html"),
  sobre: path.resolve(clientRoot, "sobre", "index.html"),
  contato: path.resolve(clientRoot, "contato", "index.html"),
  privacidade: path.resolve(
    clientRoot,
    "politica-de-privacidade",
    "index.html"
  ),
  termos: path.resolve(clientRoot, "termos-de-servico", "index.html"),
  avisoLegal: path.resolve(clientRoot, "aviso-legal", "index.html"),
  planoAlimentar: path.resolve(clientRoot, "plano-alimentar", "index.html"),
  receitasLowCarb: path.resolve(clientRoot, "receitas-low-carb", "index.html"),
  sobremesasSaudaveis: path.resolve(
    clientRoot,
    "sobremesas-saudaveis",
    "index.html"
  ),
  oleosEssenciaisEmagrecimento: path.resolve(
    clientRoot,
    "oleos-essenciais-emagrecimento",
    "index.html"
  ),
};
```

Crie `client/plano-alimentar/index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seu Plano Alimentar - Bônus Interativo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#f9f6f0" />
  </head>
  <body>
    <div id="root"></div>
    <script
      type="module"
      src="/src/standalone/entries/plano-alimentar.tsx"
    ></script>
  </body>
</html>
```

Crie `client/src/standalone/entries/plano-alimentar.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import MealPlanPage from "@/pages/MealPlanPage";
import StandaloneLayout from "../StandaloneLayout";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento #root nao encontrado na pagina do plano alimentar.");
}

ensureGtm();

createRoot(root).render(
  <StrictMode>
    <StandaloneLayout currentPath="/plano-alimentar">
      <MealPlanPage />
    </StandaloneLayout>
  </StrictMode>
);
```

- [ ] **Step 4: Rodar o teste e a build multipage**

Run:

```bash
npx vitest run client/src/content/siteConfig.test.ts
npm run build:pages
test -f dist/public/plano-alimentar/index.html
```

Expected:

```txt
PASS  client/src/content/siteConfig.test.ts
```

e o último comando deve sair com code `0`.

- [ ] **Step 5: Commit**

```bash
git add client/plano-alimentar/index.html client/src/standalone/entries/plano-alimentar.tsx client/src/content/siteConfig.ts client/src/content/siteConfig.test.ts vite.config.ts
git commit -m "feat: add standalone meal plan page"
```

## Task 2: Tirar `/alimentacao` da SPA e redirecionar links antigos

**Files:**
- Modify: `client/src/App.tsx`
- Modify: `client/src/lib/legacyHashRedirect.ts`
- Create: `client/src/lib/legacyHashRedirect.test.ts`

- [ ] **Step 1: Escrever os testes que falham para o redirect legado**

Crie `client/src/lib/legacyHashRedirect.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { resolveLegacyHashRedirect } from "./legacyHashRedirect";

describe("resolveLegacyHashRedirect", () => {
  it("redirects the old meal hash route to the standalone page", () => {
    expect(resolveLegacyHashRedirect("#/alimentacao")).toEqual({
      type: "clean-path",
      href: "/plano-alimentar/",
    });
  });

  it("redirects the old plano-alimentar section slug to the standalone page", () => {
    expect(resolveLegacyHashRedirect("#plano-alimentar")).toEqual({
      type: "clean-path",
      href: "/plano-alimentar/",
    });
  });

  it("keeps current workout hash routes untouched", () => {
    expect(resolveLegacyHashRedirect("#/semana/1")).toBeNull();
  });
});
```

- [ ] **Step 2: Rodar o teste para confirmar a falha**

Run:

```bash
npx vitest run client/src/lib/legacyHashRedirect.test.ts
```

Expected:

```txt
FAIL  client/src/lib/legacyHashRedirect.test.ts
Error: No export named resolveLegacyHashRedirect
```

- [ ] **Step 3: Implementar o redirect e remover a rota SPA**

Atualize `client/src/lib/legacyHashRedirect.ts` para expor um helper puro e mandar `/alimentacao` para o standalone:

```ts
import {
  institutionalSlugs,
  standaloneRoutes,
  toPublicPath,
  type InstitutionalSlug,
} from "@/content/siteConfig";

type RedirectTarget =
  | { type: "hash"; path: string }
  | { type: "clean-path"; href: string };

const SECTION_ROUTE_MAP: Record<string, RedirectTarget> = {
  alimentacao: {
    type: "clean-path",
    href: standaloneRoutes.planoAlimentar,
  },
  "plano-alimentar": {
    type: "clean-path",
    href: standaloneRoutes.planoAlimentar,
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

export function resolveLegacyHashRedirect(
  hashValue: string
): RedirectTarget | null {
  const value = hashValue.trim().replace(/^#/, "");
  if (!value) return null;

  const normalizedWithSlash = value.startsWith("/") ? value : `/${value}`;

  const institutionalSlug = LEGACY_INSTITUTIONAL_HASH_MAP[normalizedWithSlash];
  if (institutionalSlug) {
    return { type: "clean-path", href: toPublicPath(institutionalSlug) };
  }

  if (
    normalizedWithSlash === "/" ||
    normalizedWithSlash.startsWith("/semana/") ||
    normalizedWithSlash === "/biblioteca" ||
    normalizedWithSlash === "/checklist" ||
    normalizedWithSlash === "/faq" ||
    normalizedWithSlash === "/apoio"
  ) {
    return null;
  }

  const normalized = normalizedWithSlash.slice(1);
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
    const nextUrl = `${toPublicPath(redirectTarget.href)}${window.location.search}`;
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
```

Atualize `client/src/App.tsx` para tirar o planner da SPA:

```tsx
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileStickyNav from "@/components/navigation/MobileStickyNav";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import PageLoading from "@/components/PageLoading";

const NotFound = lazy(() => import("@/pages/NotFound"));
const ApoioPage = lazy(() => import("@/pages/ApoioPage"));
const ChecklistPage = lazy(() => import("@/pages/ChecklistPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const Home = lazy(() => import("@/pages/Home"));
const LibraryPage = lazy(() => import("@/pages/LibraryPage"));
const WeekPage = lazy(() => import("@/pages/WeekPage"));

function AppRouter() {
  return (
    <WouterRouter hook={useHashLocation}>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route path="/bonus" component={Home} />
          <Route path="/" component={Home} />
          <Route path="/semana/:week/dia/:day" component={WeekPage} />
          <Route path="/semana/:week" component={WeekPage} />
          <Route path="/biblioteca" component={LibraryPage} />
          <Route path="/checklist" component={ChecklistPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/apoio" component={ApoioPage} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ProductMobileNavShell />
    </WouterRouter>
  );
}
```

- [ ] **Step 4: Rodar os testes do redirect**

Run:

```bash
npx vitest run client/src/lib/legacyHashRedirect.test.ts
```

Expected:

```txt
PASS  client/src/lib/legacyHashRedirect.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add client/src/App.tsx client/src/lib/legacyHashRedirect.ts client/src/lib/legacyHashRedirect.test.ts
git commit -m "feat: redirect legacy meal plan hashes to standalone page"
```

## Task 3: Fazer a navegação principal voltar a ser só calistenia

**Files:**
- Modify: `client/src/content/navigation.ts`
- Modify: `client/src/content/navigation.test.ts`
- Modify: `client/src/components/navigation/SharedSidebar.tsx`
- Modify: `client/src/components/navigation/MobileStickyNav.test.tsx`
- Modify: `client/src/pages/Home.tsx`
- Modify: `client/src/pages/Home.test.tsx`

- [ ] **Step 1: Escrever os testes que falham para a navegação e para o card bônus**

Atualize `client/src/content/navigation.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { isMenuTriggerActive, stickyNavItems } from "./navigation";
import { toPublicPath } from "./siteConfig";

describe("sticky navigation state", () => {
  const itemByKey = Object.fromEntries(
    stickyNavItems.map(item => [item.key, item])
  );

  it("marks Treino active across week routes", () => {
    expect(itemByKey.treino.isActive("/semana/1")).toBe(true);
    expect(itemByKey.treino.isActive("/semana/4/dia/28")).toBe(true);
  });

  it("marks Plano active on the home route again", () => {
    expect(itemByKey.plano.isActive("/")).toBe(true);
    expect(itemByKey.plano.isActive("/biblioteca")).toBe(false);
    expect(itemByKey.plano.isActive("/bonus")).toBe(false);
  });

  it("keeps Biblioteca, Progresso and Extras on the expected product routes", () => {
    expect(itemByKey.biblioteca.isActive("/biblioteca")).toBe(true);
    expect(itemByKey.progresso.isActive("/checklist")).toBe(true);
    expect(itemByKey.extras.isActive("/bonus")).toBe(true);
  });

  it("activates the floating menu trigger on FAQ, Apoio and institutional pages", () => {
    expect(isMenuTriggerActive("/faq")).toBe(true);
    expect(isMenuTriggerActive("/apoio")).toBe(true);
    expect(isMenuTriggerActive(toPublicPath("contato"))).toBe(true);
    expect(isMenuTriggerActive("/biblioteca")).toBe(false);
  });
});
```

Atualize `client/src/components/navigation/MobileStickyNav.test.tsx`:

```tsx
it("maps product routes to the expected active slot", () => {
  expect(getStickyNavActiveIndex("/")).toBe(1);
  expect(getStickyNavActiveIndex("/semana/3/dia/16")).toBe(0);
  expect(getStickyNavActiveIndex("/biblioteca")).toBe(2);
  expect(getStickyNavActiveIndex("/checklist")).toBe(3);
  expect(getStickyNavActiveIndex("/bonus")).toBe(4);
});
```

Atualize `client/src/pages/Home.test.tsx`:

```tsx
it("renders the meal plan bonus card pointing to the standalone page", () => {
  const markup = renderToStaticMarkup(<Home />);
  const todayLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  expect(markup).toContain("Seu Plano Alimentar");
  expect(markup).toContain("/plano-alimentar/");
  expect(markup).toContain(
    "/assets/images/alimentacao/v3/meal-prep-semanal.webp"
  );
  expect(markup).toContain(
    "Abra seu plano alimentar com refeições guiadas, trocas fáceis, hidratação do dia e lista da semana organizada para você."
  );
  expect(markup).toContain("94 curtidas");
  expect(markup).toContain(`Atualização: ${todayLabel}, com carinho`);
});
```

- [ ] **Step 2: Rodar os testes para confirmar a falha**

Run:

```bash
npx vitest run client/src/content/navigation.test.ts client/src/components/navigation/MobileStickyNav.test.tsx client/src/pages/Home.test.tsx
```

Expected:

```txt
FAIL  client/src/content/navigation.test.ts
FAIL  client/src/components/navigation/MobileStickyNav.test.tsx
FAIL  client/src/pages/Home.test.tsx
```

- [ ] **Step 3: Atualizar nav principal, sticky e card bônus**

Atualize `client/src/content/navigation.ts`:

```ts
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
    isActive: currentPath => normalizeNavPath(currentPath) === productRoutes.home,
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
```

Ainda em `client/src/content/navigation.ts`, remova `Plano alimentar` do drawer:

```ts
function getDrawerMenuSections(): DrawerMenuSection[] {
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
```

Atualize `client/src/components/navigation/SharedSidebar.tsx` para remover o item local `Plano alimentar`:

```tsx
export const navSections: NavSection[] = [
  { label: "Início", to: "/" },
  { label: "Biblioteca de exercícios", to: "/biblioteca" },
  {
    label: "Semana 1",
    to: "/semana/1",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 1}`,
      to: `/semana/1/dia/${i + 1}`,
    })),
  },
  {
    label: "Semana 2",
    to: "/semana/2",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 8}`,
      to: `/semana/2/dia/${i + 8}`,
    })),
  },
  {
    label: "Semana 3",
    to: "/semana/3",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 15}`,
      to: `/semana/3/dia/${i + 15}`,
    })),
  },
  {
    label: "Semana 4",
    to: "/semana/4",
    children: Array.from({ length: 7 }, (_, i) => ({
      label: `Dia ${i + 22}`,
      to: `/semana/4/dia/${i + 22}`,
    })),
  },
  { label: "Checklist", to: "/checklist" },
  { label: "FAQ", to: "/faq" },
  { label: "Apoio e continuidade", to: "/apoio", emphasis: true },
  { label: "Bônus", to: "/bonus" },
  {
    label: "BLOG 🧡",
    href: siteConfig.blogUrl,
    external: true,
  },
];
```

Atualize `client/src/pages/Home.tsx` para apontar o bônus para o standalone:

```tsx
{
  id: "seu-plano-alimentar",
  title: "Seu Plano Alimentar",
  href: toPublicPath(standaloneRoutes.planoAlimentar),
  description:
    "Abra seu plano alimentar com refeições guiadas, trocas fáceis, hidratação do dia e lista da semana organizada para você.",
  thumbnail: {
    kind: "asset",
    src: toPublicPath("assets/images/alimentacao/v3/meal-prep-semanal.webp"),
    alt: "Ingredientes porcionados para a semana em potes organizados sobre bancada clara.",
  },
  social: { likesBase: 94 },
},
```

- [ ] **Step 4: Rodar os testes ajustados**

Run:

```bash
npx vitest run client/src/content/navigation.test.ts client/src/components/navigation/MobileStickyNav.test.tsx client/src/pages/Home.test.tsx
```

Expected:

```txt
PASS  client/src/content/navigation.test.ts
PASS  client/src/components/navigation/MobileStickyNav.test.tsx
PASS  client/src/pages/Home.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add client/src/content/navigation.ts client/src/content/navigation.test.ts client/src/components/navigation/SharedSidebar.tsx client/src/components/navigation/MobileStickyNav.test.tsx client/src/pages/Home.tsx client/src/pages/Home.test.tsx
git commit -m "feat: move meal plan access out of the main calisthenics nav"
```

## Task 4: Verificação final de build e regressão de rotas

**Files:**
- Modify: none
- Test: `client/src/content/siteConfig.test.ts`
- Test: `client/src/lib/legacyHashRedirect.test.ts`
- Test: `client/src/content/navigation.test.ts`
- Test: `client/src/components/navigation/MobileStickyNav.test.tsx`
- Test: `client/src/pages/Home.test.tsx`

- [ ] **Step 1: Rodar a suíte focal da migração**

Run:

```bash
npx vitest run client/src/content/siteConfig.test.ts client/src/lib/legacyHashRedirect.test.ts client/src/content/navigation.test.ts client/src/components/navigation/MobileStickyNav.test.tsx client/src/pages/Home.test.tsx
```

Expected:

```txt
PASS  client/src/content/siteConfig.test.ts
PASS  client/src/lib/legacyHashRedirect.test.ts
PASS  client/src/content/navigation.test.ts
PASS  client/src/components/navigation/MobileStickyNav.test.tsx
PASS  client/src/pages/Home.test.tsx
```

- [ ] **Step 2: Rodar typecheck e build multipage**

Run:

```bash
npm run check
npm run build:pages
test -f dist/public/plano-alimentar/index.html
```

Expected:

```txt
> tsc --noEmit
```

e o último comando deve sair com code `0`.

- [ ] **Step 3: Verificar manualmente as rotas principais**

Abrir localmente e validar:

```txt
/#/                      -> home principal da calistenia
/#/bonus                 -> shelf de bônus com card "Seu Plano Alimentar"
/plano-alimentar/        -> planner standalone funcionando
/#/alimentacao           -> redirect automático para /plano-alimentar/
```

Resultado esperado:

```txt
O app principal não exibe mais a tela alimentar na SPA.
O sticky nav "Plano" volta para a home.
O card bônus abre o standalone do plano alimentar.
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test: verify standalone meal planner migration"
```

## Self-Review

- **Spec coverage:** o plano cobre a criação do standalone independente, a retirada do alimento da SPA, a volta do ícone `Plano` para a home, o ajuste do card bônus e o redirect de links legados.
- **Placeholder scan:** não há `TODO`, `TBD`, “similar ao anterior” ou passos sem código/comando.
- **Type consistency:** o nome de rota escolhido é `standaloneRoutes.planoAlimentar` em todo o plano; o helper legado exposto é `resolveLegacyHashRedirect`; o clean path final é sempre `/plano-alimentar/`.

