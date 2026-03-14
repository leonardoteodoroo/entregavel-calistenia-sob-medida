# DESIGN SYSTEM + PERFORMANCE SYSTEM — CALISTENIA FEMININA SOB MEDIDA

Documento consolidado com base no estado real do projeto em **10/03/2026**.

Fontes analisadas:
- `client/src/index.css`
- `client/src/pages/*`
- `client/src/components/*`
- `client/index.html`
- `vite.config.ts`
- `server/index.ts`
- `docs/diretrizes_da_marca.md`

## TAREFA
Este documento é a referência visual e técnica oficial do projeto: cores, tipografia, layout, componentes, acessibilidade, performance e regras de manutenção.

## 0) IDENTIDADE DA MARCA (ESTADO ATUAL)
- Direção visual: **Editorial Wellness Minimalista**.
- Posicionamento: feminino, possível, seguro, acolhedor, elegante.
- Linguagem: calma, direta, sem tom agressivo de performance extrema.
- Público principal: mulher adulta em rotina real (iniciantes e retomada).
- Exceção de estilo: a página [`NotFound.tsx`](/home/leonardotl/Área%20de%20trabalho/calistenia-feminina-entregavel/client/src/pages/NotFound.tsx) usa estética diferente (gradiente slate/azul) e está fora da linguagem editorial principal.

---

## 1) CORES (TOKENS SEMÂNTICOS)

### 1.1 Paleta base da marca (custom)
- `--color-ivory`: `#f9f6f0`
- `--color-ivory-dark`: `#f0ebe3`
- `--color-taupe`: `#b5a99a`
- `--color-taupe-light`: `#d4ccc4`
- `--color-rose`: `#8b4a52`
- `--color-rose-light`: `#c4858e`
- `--color-rose-muted`: `#e8d5d7`
- `--color-teal`: `#5b8a8b`
- `--color-teal-light`: `#8bb5b6`
- `--color-teal-muted`: `#d0e4e4`
- `--color-charcoal`: `#2c2c2c`
- `--color-charcoal-light`: `#4a4a4a`
- `--color-warm-gray`: `#7a7570`

### 1.2 Tokens semânticos de tema (`:root`, base shadcn)
- `--background`: `oklch(0.978 0.006 75)`
- `--foreground`: `oklch(0.22 0.008 60)`
- `--card`: `oklch(0.99 0.003 75)`
- `--card-foreground`: `oklch(0.22 0.008 60)`
- `--popover`: `oklch(0.99 0.003 75)`
- `--popover-foreground`: `oklch(0.22 0.008 60)`
- `--primary`: `oklch(0.42 0.065 10)`
- `--primary-foreground`: `oklch(0.98 0.003 75)`
- `--secondary`: `oklch(0.93 0.008 75)`
- `--secondary-foreground`: `oklch(0.35 0.01 60)`
- `--muted`: `oklch(0.95 0.005 75)`
- `--muted-foreground`: `oklch(0.52 0.015 60)`
- `--accent`: `oklch(0.88 0.012 185)`
- `--accent-foreground`: `oklch(0.3 0.04 185)`
- `--destructive`: `oklch(0.577 0.245 27.325)`
- `--destructive-foreground`: `oklch(0.985 0 0)`
- `--border`: `oklch(0.88 0.008 75)`
- `--input`: `oklch(0.88 0.008 75)`
- `--ring`: `oklch(0.42 0.065 10)`

### 1.3 Mapeamento dos tokens do sistema

#### Texto
- `text-primary`: `--color-charcoal` (`#2c2c2c`)
- `text-secondary`: `--color-charcoal-light` (`#4a4a4a`)
- `text-muted`: `--color-warm-gray` e `--color-taupe` (uso combinado)
- `text-on-dark`: `#ffffff`
- `text-on-brand`: `--primary-foreground`
- `text-on-strong`: `(NÃO APLICAVEL)`

#### Superfícies
- `surface-page`: `--color-ivory`
- `surface-section`: `white` e `--color-ivory-dark` alternados
- `surface-card`: `--color-ivory` (cards editoriais) e `--card` (ui base)
- `surface-subtle`: `--color-rose-muted`, `--color-teal-muted`, `--color-ivory-dark`
- `surface-elevated`: `--popover`

#### Ações
- `action-primary`: `--primary` (ui base) e `--color-rose` (ênfase editorial)
- `action-primary-hover`: `hover:bg-primary/90`
- `action-primary-active`: `(NÃO APLICAVEL)`
- `action-primary-disabled`: `disabled:opacity-50`
- `action-secondary`: `--secondary` e botões editoriais `white + border`
- `action-secondary-hover`: `hover:bg-secondary/80` (ui) / sem padrão único no editorial
- `action-secondary-active`: `(NÃO APLICAVEL)`
- `action-secondary-disabled`: `disabled:opacity-50`
- `action-strong`: `(NÃO APLICAVEL)`
- `action-strong-hover`: `(NÃO APLICAVEL)`
- `action-strong-active`: `(NÃO APLICAVEL)`
- `action-strong-disabled`: `(NÃO APLICAVEL)`

#### Gradientes
- `gradient-primary`: 
  - `linear-gradient(105deg, var(--color-ivory) 45%, transparent 80%)`
  - `linear-gradient(180deg, var(--color-ivory) 0%, rgba(249,246,240,0.92) 100%)`
- `gradient-cta`: `(NÃO APLICAVEL)`

#### Bordas
- `border-default`: `--color-taupe-light` e `--border`
- `border-subtle`: `--color-taupe-light` (uso de divisores de 1px)
- `border-focus`: `--ring`
- `border-disabled`: `(NÃO APLICAVEL)`

#### Status
- `status-success`: `(NÃO APLICAVEL)`
- `status-success-surface`: `(NÃO APLICAVEL)`
- `status-warning`: `(NÃO APLICAVEL)`
- `status-warning-surface`: `(NÃO APLICAVEL)`
- `status-error`: `--destructive`
- `status-error-surface`: `destructive/20` (anéis e estados inválidos)

#### Links e destaques
- `link-default`: `--color-rose`
- `link-hover`: `(NÃO APLICAVEL)`
- `highlight`: `--color-rose-muted`

---

## 2) ESPAÇAMENTO (SPACING SCALE)

Escala base em uso (Tailwind + estilos inline):
- `space-1`: `4px`
- `space-2`: `8px`
- `space-3`: `12px`
- `space-4`: `16px`
- `space-5`: `20px`
- `space-6`: `24px`
- `space-8`: `32px`
- `space-10`: `40px`
- `space-12`: `48px`
- `space-14`: `56px`
- `space-16`: `64px`
- `space-20`: `(NÃO APLICAVEL)` como token nomeado explícito
- `space-24`: `(NÃO APLICAVEL)` como token nomeado explícito

Escalas fluidas usadas no layout:
- `page-padding-x`: `clamp(1rem, 3vw, 2rem)`
- `section-padding`: `clamp(2rem, 5vw, 3.5rem)`
- `hero-padding`: `clamp(2rem, 5vw, 4rem)`

---

## 3) TIPOGRAFIA (TYPOGRAPHY)

### Famílias
- `font-family-base`: `"DM Sans", sans-serif`
- `font-family-heading`: `"Playfair Display", serif`

### Escala em uso real
- `text-2xs`: `0.62rem` a `0.65rem` (labels, microcopy)
- `text-xs`: `0.75rem`
- `text-sm`: `0.78rem` a `0.88rem`
- `text-base`: `0.95rem` a `1rem`
- `text-lg`: `1.05rem` a `1.1rem`
- `text-xl`: `clamp(1.3rem, 3vw, 1.75rem)` (título de card diário)
- `text-2xl`: `clamp(1.5rem, 4vw, 2.25rem)` (títulos de seção)
- `text-3xl`: `clamp(2rem, 6vw, 3.5rem)` (hero)
- `text-4xl`: `(NÃO APLICAVEL)` como token fixo
- `text-5xl`: `(NÃO APLICAVEL)` como token fixo
- `text-6xl`: `(NÃO APLICAVEL)`

### Pesos
- `font-light`: `300`
- `font-normal`: `400`
- `font-medium`: `500`
- `font-semibold`: `600`
- `font-bold`: `700`

### Line-height
- `leading-tight`: `1.1` a `1.2` (headings)
- `leading-normal`: `1.5` a `1.6`
- `leading-relaxed`: `1.65` a `1.75` (texto longo)
- `leading-snug`: `(NÃO APLICAVEL)` como token explícito

### Legibilidade / measure
- `measure-sm`: `460px` a `520px`
- `measure-md`: `600px` a `620px`
- `measure-lg`: `780px`

---

## 4) LAYOUT & GRID (ESTRUTURA DE PÁGINA)

- `container-max`: `1280px` (`.container` em `lg`)
- `content-max`: `860px` (wrapper principal das páginas)
- `card-max`: `780px` (cards de dia/semana)
- `sidebar-width`: `220px` (layout custom principal)
- `container-padding-x-mobile`: `1rem`
- `container-padding-x-sm`: `1.5rem`
- `container-padding-x-lg`: `2rem`
- `grid-columns`: padrão fluido com `repeat(auto-fit, minmax(...))`
- `grid-columns-fixos`: `sm:2`, `md:3`, `lg:4` em blocos específicos
- `grid-gutter`: `0.5rem` a `1rem` (`gap-2`, `gap-3`, `gap-4`)
- `section-padding-y-mobile`: integrado ao `section-padding` fluido
- `section-padding-y-desktop`: integrado ao `section-padding` fluido
- `hero-padding-y-desktop`: integrado ao `hero-padding` fluido
- `safe-area-inset`: `(NÃO APLICAVEL)` (não há uso de `env(safe-area-inset-*)`)

---

## 5) RADIUS & SHADOWS (EFEITOS DE PROFUNDIDADE)

### Radius
- `--radius`: `0.5rem` (8px)
- `radius-sm`: `4px`
- `radius-md`: `6px`
- `radius-lg`: `8px`
- `radius-xl`: `12px`
- `radius-2xl`: `(NÃO APLICAVEL)`
- `radius-full`: `9999px`
- Raio editorial adicional: `2px` e `3px` em badges e checkboxes de dia.

### Shadows
- `shadow-sm`: utilitário Tailwind (`shadow-sm` / `shadow-xs`)
- `shadow-md`: utilitário Tailwind (`shadow-md`)
- `shadow-lg`: utilitário Tailwind (`shadow-lg`)
- `shadow-card`: `0 2px 20px rgba(44, 44, 44, 0.06)` (`.page-card`)
- `shadow-card-hover`: `(NÃO APLICAVEL)` como padrão global de card
- `shadow-cta`: `(NÃO APLICAVEL)`
- `shadow-sidebar`: `2px 0 20px rgba(44,44,44,0.04)`
- `shadow-mobile-header`: `0 1px 8px rgba(44,44,44,0.06)`

---

## 6) MOTION (TRANSITIONS & ANIMATION TOKENS)

- `transition-fast`: `200ms` (`ease`)
- `transition-normal`: `300ms` (`ease-out`)
- `transition-slow`: `400ms`
- `ease-standard`: `ease`
- `ease-emphasized`: `ease-out`
- `motion-distance-sm`: `2px` (sliding utilitário em componentes Radix)
- `motion-distance-md`: `12px` (`fadeInUp`)

Animações reais:
- `fadeInUp`: `0.4s ease-out`, `translateY(12px -> 0)`, `opacity(0 -> 1)`
- Sidebar mobile: `transition-transform duration-300 ease-out`
- Accordion icon: `transition-transform duration-200`

Preferência de movimento reduzido:
- `prefers-reduced-motion`: `(NÃO APLICAVEL)` (não implementado no CSS atual)

---

## 7) BREAKPOINTS (RESPONSIVIDADE)

Breakpoints ativos (Tailwind padrão):
- `bp-sm`: `>= 640px`
- `bp-md`: `>= 768px`
- `bp-lg`: `>= 1024px`
- `bp-xl`: `>= 1280px`
- `bp-2xl`: `>= 1536px`

Regra de mobile usada em lógica JS:
- `bp-mobile`: `< 768px` (`useIsMobile`)

---

## 8) ELEVAÇÃO (Z-INDEX TOKENS)

- `z-base`: `0`
- `z-sticky`: `20` (header mobile fixo)
- `z-dropdown`: `50` (componentes Radix)
- `z-overlay`: `30` (overlay do menu lateral mobile)
- `z-modal`: `50` (Dialog/Sheet/AlertDialog)
- `z-toast`: `(NÃO APLICAVEL)` como valor explicitamente definido no projeto
- `z-tooltip`: `50`
- `z-sidebar`: `40` (sidebar custom)

---

## 9) COMPONENTES PADRÃO (BLUEPRINTS)

### Botões
- Padrão editorial principal: `background: white`, `border: 1px solid var(--color-taupe-light)`, `text: var(--color-charcoal)`, `rounded`, `font-body`.
- Padrão UI (`Button` shadcn): variantes `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
- `Button CTA (venda)`: `(NÃO APLICAVEL)` como componente dedicado.
- Estado loading padronizado: `(NÃO APLICAVEL)`.

### Links
- Link de conteúdo técnico (fontes): `underline`, `color: var(--color-rose)`.
- Estado hover próprio padronizado: `(NÃO APLICAVEL)`.

### Cards
- Card editorial (`.page-card`): `ivory + border taupe-light + radius 4px + shadow-card`.
- Card de exercício (`.exercise-card`): `white + border-left accent + radius assimétrico`.
- Card shadcn (`Card`): `bg-card + rounded-xl + border + shadow-sm`.

### Badges / Chips
- `badge-leve`: teal-muted + teal.
- `badge-padrao`: rose-muted + rose.
- `badge-intensa`: `oklch(0.88 0.015 10)` + rose.
- Badge de estado com semântica success/warning completa: `(NÃO APLICAVEL)`.

### Alerts / Banners
- Callout editorial: bloco com `border-left: 3px` + fundo muted (rose/teal/ivory-dark).
- `Alert` shadcn disponível (`default` e `destructive`).
- Sistema de severidade completo (success/warning/error) no editorial: `(NÃO APLICAVEL)`.

### Inputs e formulários
- Campo de busca da biblioteca: input custom com ícone, borda taupe-light, fundo branco.
- `Input` shadcn com foco em `ring` e estado inválido via `destructive`.
- Formulários longos com validação completa de UX: `(NÃO APLICAVEL)`.

### Modals / Dialogs
- `Dialog`/`Sheet`/`AlertDialog` com overlay `bg-black/50`, `z-50`, animações de fade/zoom.
- Close button com `sr-only`.

### Dropdown / Tooltip
- Dropdown e Tooltip padrões shadcn com `bg-popover`, `border`, `shadow`, `z-50`.

### Accordions / FAQ
- FAQ principal editorial usa blocos simples.
- Biblioteca usa `Accordion` com trigger acessível e animação open/close.

### Skeleton / Loading states
- `Skeleton`: `bg-accent animate-pulse rounded-md`.
- Estratégia avançada de skeleton por página: `(NÃO APLICAVEL)`.

---

## 10) ACESSIBILIDADE (ESTADO REAL)

- Idioma da página: `lang="pt-BR"` (OK).
- Navegação semântica: `header`, `main`, `aside` presentes no layout principal (OK).
- `footer` global: `(NÃO APLICAVEL)` no layout atual.
- Foco visível: implementado em componentes shadcn (`focus-visible:ring`, `focus-visible:border-ring`).
- Teclado: elementos interativos principais usam `<button>`/`<a>` (OK).
- `aria-label`: aplicado em pontos críticos (menu, carregar vídeo, etc.).
- Texto alternativo em mídia de exercícios: vindo de `exercise-media-manifest.json` (OK).
- Contraste: sem laudo formal automatizado no repositório `(NÃO APLICAVEL)`.
- Skip link para conteúdo: `(NÃO APLICAVEL)`.
- Política de `prefers-reduced-motion`: `(NÃO APLICAVEL)`.
- Testes automatizados de acessibilidade (axe/WAVE/Lighthouse CI): `(NÃO APLICAVEL)`.

---

## 11) CAMADA DE IMPACTO (ESCAPE HATCH / LICENSED TO WOW)

Implementação atual:
- Escopo `impact` dedicado: `(NÃO APLICAVEL)`.
- Remapeamento formal de `impact-*` tokens: `(NÃO APLICAVEL)`.
- Seções de maior impacto visual existem (hero e encerramento), mas sem camada técnica separada.

Tokens `impact-*`:
- `impact-surface-page`: `(NÃO APLICAVEL)`
- `impact-surface-card`: `(NÃO APLICAVEL)`
- `impact-text-primary`: `(NÃO APLICAVEL)`
- `impact-text-secondary`: `(NÃO APLICAVEL)`
- `impact-action-primary`: `(NÃO APLICAVEL)`
- `impact-action-strong`: `(NÃO APLICAVEL)`
- `impact-gradient-primary`: `(NÃO APLICAVEL)`
- `impact-gradient-cta`: `(NÃO APLICAVEL)`
- `impact-radius-md`: `(NÃO APLICAVEL)`
- `impact-radius-lg`: `(NÃO APLICAVEL)`
- `impact-shadow-card`: `(NÃO APLICAVEL)`
- `impact-shadow-cta`: `(NÃO APLICAVEL)`
- `impact-transition`: `(NÃO APLICAVEL)`
- `impact-ease`: `(NÃO APLICAVEL)`

---

## 12) PADRÕES DE IMPLEMENTAÇÃO (PERFORMANCE, ESTABILIDADE, SEGURANÇA, SEO, MANUTENIBILIDADE)

### 12.1 Estabilidade
- Progressive enhancement: parcial.
- Error Boundary global: implementado.
- Fallback de imagem com `<picture>` AVIF/WebP/JPG: `(NÃO APLICAVEL)`.
- Safe-area CSS (`env(...)`): `(NÃO APLICAVEL)`.
- Fallback sem JS para conteúdo principal: `(NÃO APLICAVEL)` (SPA hash-router).

### 12.2 Core Web Vitals
- Budget formal versionado: `(NÃO APLICAVEL)`.
- Lighthouse CI em pipeline: `(NÃO APLICAVEL)`.
- Estratégia de reduzir main thread: parcial (`startTransition` + `useDeferredValue` na busca).

### 12.3 Imagens e mídia
- `loading="lazy"` e `decoding="async"` em imagens: implementado.
- `width`/`height` definidos nas imagens da galeria: implementado.
- `video preload="none"`: implementado.
- `srcset/sizes` responsivo de imagens: `(NÃO APLICAVEL)`.
- Otimização explícita de LCP (preload/fetchpriority): `(NÃO APLICAVEL)`.

### 12.4 Fontes
- Google Fonts com `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`: implementado.
- `display=swap` no request de fonte: implementado.
- Fonte local/subset manual: `(NÃO APLICAVEL)`.

### 12.5 CSS
- Tailwind v4 + build de produção via Vite: implementado.
- Tokens globais em `index.css`: implementado.
- CSS crítico inline no `<head>`: `(NÃO APLICAVEL)`.

### 12.6 JavaScript
- Build minificado padrão do Vite: implementado.
- Code splitting explícito por rota com `React.lazy`: `(NÃO APLICAVEL)`.
- Remoção automática de `console` em produção por configuração: `(NÃO APLICAVEL)`.

### 12.7 Servidor, cache e compressão
- Servidor Express simples para estático: implementado.
- Brotli/Gzip no próprio servidor do repo: `(NÃO APLICAVEL)`.
- Cache headers longos configurados no servidor: `(NÃO APLICAVEL)`.
- CDN para mídia externa (CloudFront) já usada em assets de capa: parcial.

### 12.8 SEO e metadados
- `<title>` configurado: implementado.
- Meta description: `(NÃO APLICAVEL)`.
- Open Graph / Twitter Cards: `(NÃO APLICAVEL)`.
- Sitemap/robots/canonical: `(NÃO APLICAVEL)`.
- JSON-LD: `(NÃO APLICAVEL)`.

### 12.9 Segurança
- Cabeçalhos de segurança (CSP, HSTS, etc.) no app Node local: `(NÃO APLICAVEL)`.
- HTTPS/TLS depende do ambiente de hospedagem: `(NÃO APLICAVEL)` neste repositório.
- Política de incidentes e hardening operacional documentada: `(NÃO APLICAVEL)`.

### 12.10 Qualidade e operação
- TypeScript check (`npm run check`): implementado.
- Testes automatizados UI/e2e/a11y: `(NÃO APLICAVEL)`.
- CI/CD com gates de qualidade: `(NÃO APLICAVEL)` no repositório.

### 12.11 Engenharia opcional avançada
- Speculation Rules API: `(NÃO APLICAVEL)`.
- Partytown: `(NÃO APLICAVEL)`.
- View Transitions API: `(NÃO APLICAVEL)`.

### 12.12 Build atual (Vite + React + TS)
- Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`, `jsxLocPlugin`.
- Alias ativos: `@`, `@shared`, `@assets`.
- `root`: `client`
- `outDir`: `dist/public`
- `server.host`: `true`
- `strictPort`: `false`

---

## 13) GOVERNANÇA (EVITAR BAGUNÇA)

Regras ativas para este projeto:
- Usar tokens de `index.css` antes de criar nova cor/tamanho.
- Preferir classes utilitárias e variáveis CSS em vez de inline hard-coded novo.
- Se criar novo token, justificar uso em mais de 2 contextos.
- Preservar a linguagem editorial (wellness minimalista) nas páginas principais.
- Tratar a estética de [`NotFound.tsx`](/home/leonardotl/Área%20de%20trabalho/calistenia-feminina-entregavel/client/src/pages/NotFound.tsx) como exceção até padronizar.

---

## 14) APÊNDICE — PROMPT IA

`(NÃO APLICAVEL)` neste momento.  
Motivo: o projeto já possui direção visual e técnica consolidada e não depende de prompt operacional versionado dentro deste arquivo.
