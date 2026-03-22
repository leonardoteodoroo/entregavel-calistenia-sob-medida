# Multi-Page Institucional Leve no Mesmo Repositório Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separar páginas institucionais em URLs limpas e leves no mesmo deploy, mantendo o produto principal em hash SPA.

**Architecture:** O projeto continuará com uma entrada SPA (`client/index.html`) e ganhará entradas HTML institucionais (`client/<slug>/index.html`) via build multipage do Vite. Um módulo único de configuração/conteúdo centralizará marca, links, suporte, GTM e conteúdo institucional, compartilhado entre SPA e páginas institucionais.

**Tech Stack:** Vite multipage, React 19, TypeScript, Wouter (somente na SPA), CSS do design system atual.

---

### Task 1: Fonte única de configuração e conteúdo

**Files:**

- Create: `client/src/content/siteConfig.ts`

**Steps:**

1. Criar tipos de links e estrutura de configuração global (marca, CNPJ, suporte, GTM, sociais, blog).
2. Centralizar labels/paths do footer (central de ajuda + institucional) e conteúdo institucional (sobre/contato/privacidade/termos/aviso).
3. Expor helpers para URL pública limpa (`/sobre`) e URL da SPA em hash (`/#/biblioteca`) respeitando `BASE_URL`.

### Task 2: Shell institucional leve + entradas multipage

**Files:**

- Create: `client/src/institutional/InstitutionalLayout.tsx`
- Create: `client/src/institutional/InstitutionalPageView.tsx`
- Create: `client/src/institutional/bootstrapInstitutionalPage.tsx`
- Create: `client/src/institutional/entries/sobre.tsx`
- Create: `client/src/institutional/entries/contato.tsx`
- Create: `client/src/institutional/entries/politica-de-privacidade.tsx`
- Create: `client/src/institutional/entries/termos-de-servico.tsx`
- Create: `client/src/institutional/entries/aviso-legal.tsx`
- Create: `client/sobre/index.html`
- Create: `client/contato/index.html`
- Create: `client/politica-de-privacidade/index.html`
- Create: `client/termos-de-servico/index.html`
- Create: `client/aviso-legal/index.html`

**Steps:**

1. Implementar layout institucional sem sidebar com header minimalista, conteúdo e footer compartilhado.
2. Renderizar páginas a partir de conteúdo centralizado no `siteConfig`.
3. Criar 5 entradas TypeScript e 5 HTMLs independentes apontando para as entradas corretas.

### Task 3: GTM compartilhado por código

**Files:**

- Create: `client/src/lib/gtm.ts`
- Modify: `client/src/main.tsx`
- Modify: `client/index.html`

**Steps:**

1. Criar inicializador único de GTM usando o mesmo container do `siteConfig`.
2. Invocar GTM na SPA antes de tracking virtual.
3. Remover snippets hardcoded do `index.html` para evitar divergência entre shells.

### Task 4: SPA focada no produto + links compatíveis

**Files:**

- Modify: `client/src/App.tsx`
- Modify: `client/src/components/SiteFooter.tsx`
- Modify: `client/src/components/Layout.tsx`
- Modify: `client/src/components/ProtocolsV2.tsx`

**Steps:**

1. Remover rotas institucionais da SPA.
2. Atualizar footer/sidebar para consumir `siteConfig` e usar URLs limpas para institucionais.
3. Manter links de produto via hash para biblioteca/checklist/faq/apoio.
4. Atualizar bloco de suporte para apontar para `/contato` limpo e e-mail oficial.

### Task 5: Redirecionamento legado

**Files:**

- Modify: `client/src/lib/legacyHashRedirect.ts`

**Steps:**

1. Mapear hashes institucionais antigos para URLs limpas.
2. Redirecionar via `history.replaceState` para pathname real quando necessário.
3. Manter o comportamento atual de mapeamentos legados internos da SPA.

### Task 6: Build multipage no Vite e validação

**Files:**

- Modify: `vite.config.ts`

**Steps:**

1. Adicionar `rollupOptions.input` com entrada SPA + 5 HTMLs institucionais.
2. Rodar `npm run check`.
3. Rodar `npm run build:pages` e confirmar saída em `dist/public/<slug>/index.html`.
4. Verificar rapidamente os links críticos e redirecionamentos legados.
