# Óleos & Emoções — Plano de Execução Completo

> **Para execução futura:** SKILL RECOMENDADA: Use `subagent-driven-development` (recomendado) ou `executing-plans` para implementar task-by-task. Steps usam checkbox (`- [ ]`) para tracking.

**Objetivo:** Transformar os 5 HTMLs estáticos prototype (`Produção - BEMVINDOMUNDO/`) em um WebApp React+Vite standalone, mobile-first, de alta fidelidade visual, servido via deploy estático (Vercel/Netlify), sem backend.

**Arquitetura:** SPA React com Vite, CSS Modules (Design System extraído do `styles.css`), rota por tela (React Router), conteúdo injetado via JSON estático gerado a partir dos 105 `.txt`. TypeScript. PWA opcional.

**Tech Stack:**

- React 19 + TypeScript
- Vite 6
- React Router 7 (file-based routing)
- CSS Modules (sem Tailwind — identidade visual muito específica)
- Fontes: Google Fonts (Noto Serif + Manrope)
- Deploy: Vercel ou Netlify (static export)

---

## Fase 0 — Decisões Tomadas (Resolvidas)

| Decisão                     | Resposta                                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Standalone ou integrado?    | **Standalone** (subprojeto independente)                                                             |
| Mobile-first ou responsivo? | **Mobile-first puro** (desktop não quebra, mas não é prioridade)                                     |
| Imagens?                    | **Placeholders** com dimensões corretas + lazy loading. Produção de assets visuais em sessão futura. |
| Backend?                    | **Zero.** Todo conteúdo é estático (JSON). Deploy estático grátis.                                   |

---

## Fase 1 — Scaffold do Projeto

### Task 1: Inicializar Projeto Vite + React + TypeScript

**Files:**

- Create: `Produção - BEMVINDOMUNDO/app/package.json`
- Create: `Produção - BEMVINDOMUNDO/app/vite.config.ts`
- Create: `Produção - BEMVINDOMUNDO/app/tsconfig.json`
- Create: `Produção - BEMVINDOMUNDO/app/index.html`

- [ ] **Step 1: Criar projeto Vite**

```bash
cd "docs/Transformar em Bonus/Óleos Essenciais e Emoções no Emagrecimento/Produção - BEMVINDOMUNDO"
npx -y create-vite@latest app --template react-ts
cd app && npm install
```

- [ ] **Step 2: Instalar dependências**

```bash
npm install react-router-dom
```

- [ ] **Step 3: Verificar projeto roda**

```bash
npm run dev
```

Expected: Server inicia em http://localhost:5173. Sem erros.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "scaffold: inicializa projeto Vite+React+TS para Óleos & Emoções"
```

---

### Task 2: Estrutura de Pastas e Design System CSS

**Files:**

- Create: `app/src/styles/tokens.css` (extrair de `styles.css` criado nos protótipos)
- Create: `app/src/styles/reset.css`
- Create: `app/src/styles/typography.css`
- Create: `app/src/styles/components.css`
- Modify: `app/src/index.css`

- [ ] **Step 1: Criar a árvore de pastas**

```bash
mkdir -p app/src/{styles,components,pages,data,assets/placeholders,hooks,utils}
```

- [ ] **Step 2: Portar `styles.css` do protótipo para CSS Modules**

Extrair os design tokens do arquivo `../styles.css` (já criado) e distribuir em:

- `tokens.css`: todas as CSS custom properties (`:root { ... }`)
- `reset.css`: box-sizing, margin, padding, font-smoothing
- `typography.css`: classes tipográficas (display-lg, headline-lg, etc.)
- `components.css`: .card, .chip, .btn-primary, .glass-pill, etc.

```css
/* app/src/styles/tokens.css */
:root {
  --primary: #2a4b41;
  --primary-light: #3d6b5e;
  --on-primary: #ffffff;
  --secondary: #a8b5a2;
  --secondary-fixed: #fadcd3;
  --on-secondary-fixed: #442b2d;
  --tertiary: #e2e8e4;
  --surface: #faf9f6;
  --surface-container-low: #f4f4ef;
  --surface-container-lowest: #efede8;
  --surface-container: #eaeae5;
  --surface-bright: #ffffff;
  --surface-container-highest: #e0ded9;
  --on-surface: #1b1c1c;
  --on-surface-variant: #434843;
  --outline-variant: rgba(67, 72, 67, 0.15);
  --font-serif: "Noto Serif", Georgia, serif;
  --font-sans: "Manrope", system-ui, sans-serif;
  /* ... spacing, round, shadow, transition — copiar de styles.css */
}
```

- [ ] **Step 3: Importar no `index.css`**

```css
/* app/src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@import "./styles/tokens.css";
@import "./styles/reset.css";
@import "./styles/typography.css";
@import "./styles/components.css";
```

- [ ] **Step 4: Verificar que o projeto compila sem erros**

```bash
npm run build
```

Expected: build completa sem warnings CSS. Dist gerada.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "style: porta Design System Botanical Essence para CSS Modules"
```

---

## Fase 2 — Dados: Converter .txt → JSON

### Task 3: Script de Conversão de Conteúdo

**Files:**

- Create: `app/scripts/convert-content.ts`
- Create: `app/src/data/oils.json`
- Create: `app/src/data/recipes.json`
- Create: `app/src/data/tips.json`
- Create: `app/src/data/mindset.json`
- Create: `app/src/data/spotlights.json`
- Create: `app/src/data/safety.json`

- [ ] **Step 1: Entendar a estrutura de dados**

Mapear a origem de cada JSON:

| JSON              | Fonte .txt                                                                                                     | Campos                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `oils.json`       | `04-oleos-essenciais/*.txt` + `subtitulos-emocionais.txt` + `tags-beneficio.txt` + `classificacao-filtros.txt` | id, name, subtitle, tags[], filter, description, usage                               |
| `recipes.json`    | `05/`, `06/`, `07/`, `08/`, `09/*.txt` + `metadados-receitas.txt`                                              | id, name, sopTitle, tab, period, time, frequency, ingredients[], steps[], oilsUsed[] |
| `tips.json`       | `10-dicas/*.txt` + `metadados-dicas-mindset.txt`                                                               | id, number, text, label, alliedOil, alliedOilReason                                  |
| `mindset.json`    | `11-nossa-mente/*.txt` + `pareamento-sabotagem-substituicao.txt`                                               | sabotage[], positive[], pairs[]                                                      |
| `spotlights.json` | `00-complementar/home-spotlight/*.txt`                                                                         | id, oilName, title, label, callout, suggestedRecipe                                  |
| `safety.json`     | `01-institucional/`, `03-apresentacao/`, `12-conclusao/`, `pull-quotes-editoriais/*.txt`                       | sections[], pullQuotes[]                                                             |

- [ ] **Step 2: Escrever script que lê os .txt e gera JSON**

```typescript
// app/scripts/convert-content.ts
// Este script deve:
// 1. Ler cada .txt da pasta docs/
// 2. Parsear com regex simples (linhas de "CAMPO: valor")
// 3. Gerar 6 arquivos JSON em app/src/data/
// 4. Rodar uma vez — os JSONs ficam commitados no repo

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

// ... implementação completa do parser para cada tipo
```

- [ ] **Step 3: Rodar o script e verificar JSONs gerados**

```bash
npx tsx scripts/convert-content.ts
```

Expected: 6 arquivos `.json` gerados em `src/data/`. Validar manualmente que `oils.json` tem 17 entradas, `recipes.json` tem 29, `tips.json` tem 23, etc.

- [ ] **Step 4: Criar TypeScript types para cada dataset**

```typescript
// app/src/data/types.ts
export interface Oil {
  id: string;
  name: string;
  subtitle: string;
  tags: string[];
  filter: string; // "citricos" | "amadeirados" | etc.
  description: string;
  usage: { aromatic: string; topical: string; ingestion: string };
}

export interface Recipe {
  id: string;
  name: string;
  sopTitle: string;
  tab: "topico" | "culinaria" | "trimshake" | "bebidas" | "difusao";
  period: "AM" | "PM" | "16h";
  time: string;
  frequency: string;
  ingredients: string[];
  steps: string[];
  oilsUsed: string[];
}

// ... (Tip, MindsetPair, Spotlight, SafetySection)
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "data: converte 105 .txt em 6 JSONs tipados para consumo React"
```

---

## Fase 3 — Componentes Base

### Task 4: Layout Shell (App wrapper + Bottom Nav + Router)

**Files:**

- Modify: `app/src/App.tsx`
- Create: `app/src/components/BottomNav/BottomNav.tsx`
- Create: `app/src/components/BottomNav/BottomNav.module.css`

- [ ] **Step 1: Criar BottomNav**

```tsx
// Replicar a bottom-nav do protótipo HTML
// 5 links: Home, Óleos, Rituais, Mente, Guias
// Glassmorphism background (backdrop-filter: blur(24px))
// Active state via useLocation()
// Min 44px touch targets (WCAG 2.5.5)
```

- [ ] **Step 2: Configurar React Router no App.tsx**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 5 rotas lazy-loaded:
// / → HomePage
// /biblioteca → BibliotecaPage
// /rituais → RituaisPage
// /mindset → MindsetPage
// /guias → GuiasPage
```

- [ ] **Step 3: Verificar navegação funciona**

```bash
npm run dev
```

Expected: 5 rotas carregam, bottom-nav muda de active state. Cada rota renderiza placeholder `<h1>`.

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: shell layout com BottomNav + React Router 5 rotas"
```

---

### Task 5: Componentes Reutilizáveis (Design System React)

**Files:**

- Create: `app/src/components/Card/Card.tsx`
- Create: `app/src/components/Chip/Chip.tsx`
- Create: `app/src/components/Button/Button.tsx`
- Create: `app/src/components/ImagePlaceholder/ImagePlaceholder.tsx`
- Create: `app/src/components/GlassPill/GlassPill.tsx`
- Create: `app/src/components/PullQuote/PullQuote.tsx`
- Create: `app/src/components/StepNumber/StepNumber.tsx`

- [ ] **Step 1: Card genérico (Tonal Nesting, sem border)**

```tsx
// Props: children, variant("default"|"elevated"), className
// Estilo: surface-container-low, round-xl, shadow-md
// Nunca: border: 1px solid
```

- [ ] **Step 2: Chip de benefício**

```tsx
// Props: label, active, onClick
// Estilo: secondary-fixed, round-full
```

- [ ] **Step 3: ImagePlaceholder**

```tsx
// Props: aspectRatio ("3:4"|"16:9"|"4:3"|"1:1"|"3:2"), emoji, alt, pendingNote
// Renderiza div com gradiente + nota de produção
// Quando imagem real disponível: <img loading="lazy" decoding="async">
```

- [ ] **Step 4: StepNumber (herança MVP V1)**

```tsx
// Props: number, title, description
// Numeral serifado itálico em círculo + texto à direita
// Replicar o padrão visual do rituais.html
```

- [ ] **Step 5: PullQuote editorial**

```tsx
// Props: children, role="presentation"
// Noto Serif, italic, headline-sm, centralizado, cor primary
// role="presentation" para não interromper screen readers
```

- [ ] **Step 6: Todos os demais (Button, GlassPill)**

- [ ] **Step 7: Commit**

```bash
git commit -m "feat: componentes base do Design System (Card, Chip, Step, PullQuote)"
```

---

## Fase 4 — As 5 Páginas

### Task 6: Página Home (O Santuário)

**Files:**

- Create: `app/src/pages/HomePage/HomePage.tsx`
- Create: `app/src/pages/HomePage/HomePage.module.css`
- Reference: `Produção - BEMVINDOMUNDO/index.html` (protótipo visual)

- [ ] **Step 1: Header com saudação dinâmica**

```tsx
// Lógica: hora < 12 → "Bom dia", 12-18 → "Boa tarde", > 18 → "Boa noite"
// Avatar placeholder (orgânico squircle)
```

- [ ] **Step 2: Hero Spotlight do Dia**

```tsx
// Dados: spotlights.json[dayOfYear % 17]
// Layout: ImagePlaceholder 3:4 + gradiente + label SOP + título + CTA
// CTA linka para /biblioteca/{oilId}
```

- [ ] **Step 3: Neural Transmission Flow (Arquétipo Bio-hacker)**

```tsx
// 3 StepNumber components com dados de pipeline neurobiológico
// Copy obrigatória (extraída do MVP V1):
// 1. Amygdala Response
// 2. VOC Signal Transmission
// 3. Dopaminergic Regulation
// Background: surface-container-low (Tonal Nesting)
// Fade-in vertical on scroll (IntersectionObserver)
```

- [ ] **Step 4: Grid 2×2 de atalhos**

```tsx
// 4 cards linkando para as outras rotas
// CSS Grid: grid-template-columns: 1fr 1fr
// Emojis como placeholder para ícones SVG futuros
```

- [ ] **Step 5: Carrossel de Compostos Biológicos (Horizontal Scroll)**

```tsx
// Seção extraída do MVP V1: "Slide to Compare"
// CSS classes: display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
// Esconder scrollbar nativa (scrollbar-width: none)
// Cada card de óleo: min-width: 260px; scroll-snap-align: start;
// Lógica: pegar 3 ou 4 óleos do oils.json para feature na Home
```

- [ ] **Step 6: Verificar layout mobile matches protótipo**

Abrir http://localhost:5173 em Chrome DevTools (430px). Comparar com `index.html` do protótipo.

- [ ] **Step 7: Commit**

```bash
git commit -m "feat: HomePage — Spotlight, Neural Flow, Quick Grid"
```

---

### Task 7: Página Biblioteca Botânica

**Files:**

- Create: `app/src/pages/BibliotecaPage/BibliotecaPage.tsx`
- Create: `app/src/pages/BibliotecaPage/BibliotecaPage.module.css`
- Create: `app/src/components/OilCard/OilCard.tsx`
- Create: `app/src/components/OilDetail/OilDetail.tsx`
- Reference: `Produção - BEMVINDOMUNDO/biblioteca.html`

- [ ] **Step 1: SearchBar + FilterChips**

```tsx
// Input: ghost border, placeholder "Qual composto molecular?"
// 7 chips horizontais com scroll (6 filtros + "Todos")
// State: selectedFilter, searchQuery
// Filtrar oils.json por filtro selecionado e query no nome/benefícios
```

- [ ] **Step 2: OilCard (feed do Apotecário)**

```tsx
// Props: oil: Oil
// Layout: foto 80x80 (organic mask) + nome + subtítulo + 2 chips
// Renderizar 17 cards via oils.json.map()
// Separação: margin-bottom spacing-6 (no border, no hr)
```

- [ ] **Step 3: OilDetail (ficha expandida)**

```tsx
// Abrir ficha ao clicar no card
// Opções de UX:
//   A) Modal full-screen (desliza de baixo)
//   B) Rota dinâmica /biblioteca/:oilId
// Layout: Hero 4:3 + tags + título + corpo + Accordion de uso
```

- [ ] **Step 4: Accordion de Uso Prático**

```tsx
// 3 seções: Aromático, Tópico, Ingestão
// aria-expanded toggle
// Dados de usage do oil JSON
```

- [ ] **Step 5: Verificar 17 cards renderizam, filtro funciona**

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: Biblioteca Botânica — 17 fichas filtráveis"
```

---

### Task 8: Página Rituais & Receitas

**Files:**

- Create: `app/src/pages/RituaisPage/RituaisPage.tsx`
- Create: `app/src/pages/RituaisPage/RituaisPage.module.css`
- Create: `app/src/components/RecipeCard/RecipeCard.tsx`
- Create: `app/src/components/RecipeDetail/RecipeDetail.tsx`
- Reference: `Produção - BEMVINDOMUNDO/rituais.html`

- [ ] **Step 1: TabBar sticky com ARIA**

```tsx
// role="tablist" + role="tab" + aria-selected
// 5 abas: Uso Tópico | Culinária | TrimShake | Bebidas | Difusão
// Sticky top com glassmorphism
// Keyboard navigation (← →)
// State: activeTab
// Filtra recipes.json por tab
```

- [ ] **Step 2: RecipeCard (preview no feed)**

```tsx
// Props: recipe: Recipe
// Layout: ImagePlaceholder 16:9 + GlassPill (tempo + frequência + período) + título SOP
// Click → expandir para RecipeDetail
```

- [ ] **Step 3: RecipeDetail (The Ritual Card aberto)**

```tsx
// Layout do Cabeçalho: Taxonomia SOP (ex: "Metabolic Induction (AM)", "Cortisol Stabilization (16:00)")
// Seção "O QUE USAR": checkboxes editáveis com ícone 💧
// Seção "COMO FAZER": StepNumber components (Numeração serifada em círculo, igual MVP V1)
// Fotos de passo-a-passo entre steps (ImagePlaceholder 3:2 com organic mask)
```

- [ ] **Step 4: Bloco Editorial de Orientações**

```tsx
// Para textos educativos (orientacoes-massagem-e-diluicao.txt)
// Renderizar ANTES dos cards de ação, com estilo distinto (label + body)
```

- [ ] **Step 5: Verificar 29 receitas renderizam nas abas corretas**

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: Rituais & Receitas — 29 protocolos em 5 abas"
```

---

### Task 9: Página Mindset

**Files:**

- Create: `app/src/pages/MindsetPage/MindsetPage.tsx`
- Create: `app/src/pages/MindsetPage/MindsetPage.module.css`
- Create: `app/src/components/TipCard/TipCard.tsx`
- Create: `app/src/components/SabotageCard/SabotageCard.tsx`
- Create: `app/src/components/BreatheModal/BreatheModal.tsx`
- Reference: `Produção - BEMVINDOMUNDO/mindset.html`

- [ ] **Step 1: TipCard (Variante A — 22 unidades)**

```tsx
// Props: tip: Tip
// Layout: full-viewport (min-height 80vh), centralizado
// Noto Serif body-lg, margens laterais 3rem
// Tag "Óleo Aliado" com cross-link para /biblioteca/:oilId
// Background: ImagePlaceholder com texture futura (aquarela bege)
```

- [ ] **Step 2: SabotageCard + PositiveCard (Variantes B + C)**

```tsx
// Implementação: swipe horizontal (Touch Events API)
// Card escuro (sabotagem) → desliza → card luminoso (substituição)
// 8 pares do mindset.json
// Alternativa simples: click/tap para flip (CSS rotateY)
```

- [ ] **Step 3: BreatheModal (FAB global)**

```tsx
// Botão "🌬 Respirar" fixed bottom
// Ao clicar: overlay com animação de ciclo 4-7-8
//   - Círculo que expande (inspira 4s) → segura (7s) → contrai (expira 8s)
//   - Texto instrucional animado
//   - Sugestão: "Aplique 1 gota de Serenity nos pulsos"
// Acessível de TODAS as páginas (colocar no layout shell, não só mindset)
// Animação: @keyframes breathe-pulse do protótipo já existe
```

- [ ] **Step 4: Verificar 22 cards + 8 pares renderizam, FAB funciona**

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: Mindset — 22 dicas + 8 pares + FAB Respirar"
```

---

### Task 10: Página Guias & Segurança

**Files:**

- Create: `app/src/pages/GuiasPage/GuiasPage.tsx`
- Create: `app/src/pages/GuiasPage/GuiasPage.module.css`
- Reference: `Produção - BEMVINDOMUNDO/guias.html`

- [ ] **Step 1: Layout "Paper Premium"**

```tsx
// CSS: margens assimétricas (left: 2.8rem, right: 1.4rem)
// line-height: 1.9
// Fundo creme #FAF9F6
// Sem borders (Tonal Nesting com alternâncias de surface)
```

- [ ] **Step 2: Drop-Cap component**

```tsx
// CSS: ::first-letter { font-family: serif; font-size: 3.5em; float:left }
// Aplicar na primeira letra de cada seção textual
```

- [ ] **Step 3: Seções editoriais (6 seções de safety.json)**

```tsx
// Sobre a Autora (introducao.txt)
// Aviso Legal (observacoes-legais.txt)
// Alertas de Segurança (observacoes-importantes.txt) — com ícones
// Guia de Ingestão (orientacoes-seguranca.txt) — com box de contraindicações
// Guia de Uso Tópico (orientacoes-massagem-e-diluicao.txt)
// Mensagem Final (conclusao.txt) + Fontes
```

- [ ] **Step 4: Intercalar PullQuotes entre seções**

```tsx
// 5 pull-quotes de safety.json.pullQuotes
// Posicionar entre seções para aliviar fadiga textual
// role="presentation" (acessibilidade)
```

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: Guias & Segurança — editorial premium com pull-quotes"
```

---

## Fase 5 — Polimento & Performance

### Task 11: Acessibilidade (WCAG 2.2 AA)

**Skill candidata:** `accessibility-compliance`

- [ ] **Step 1: Audit com Lighthouse Accessibility**

```bash
npx serve app/dist -l 3000
# Em outro terminal:
npx lighthouse http://localhost:3000 --only-categories=accessibility --output=json > audit.json
```

- [ ] **Step 2: Garantir todas as páginas passam**

Critérios mínimos:

- Skip Link funcional (#main)
- Focus ring 2px em todos os interativos
- Contraste 4.5:1 em todo texto sobre fundo
- ARIA correto em tabs, accordions, modais
- Touch targets ≥ 44px
- Screen reader: headings hierarchy (1 h1 por página)

- [ ] **Step 3: Fix issues encontrados**

- [ ] **Step 4: Commit**

```bash
git commit -m "a11y: WCAG 2.2 AA compliance — contraste, ARIA, touch targets"
```

---

### Task 12: Performance & Lazy Loading

**Skill candidata:** `vercel-react-best-practices`

- [ ] **Step 1: Code splitting por rota**

```tsx
// React.lazy + Suspense para cada página
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
// ... 4 restantes
```

- [ ] **Step 2: Imagens com lazy loading nativo**

```tsx
// Todas as <img> e ImagePlaceholder com:
// loading="lazy" decoding="async"
// width + height definidos para evitar CLS
```

- [ ] **Step 3: Lighthouse Performance audit**

```bash
npx lighthouse http://localhost:3000 --only-categories=performance
```

Expected: Score ≥ 90. FCP < 1.5s. CLS < 0.1.

- [ ] **Step 4: Commit**

```bash
git commit -m "perf: code splitting + lazy loading (Lighthouse 90+)"
```

---

### Task 13: Micro-Animações

- [ ] **Step 1: Fade-in on scroll (IntersectionObserver)**

```tsx
// Hook: useInView(ref, threshold)
// Aplicar em: cards de dica, steps do Neural Flow, recipe cards
// Animação: opacity 0→1, transform-y 20px→0, 400ms ease
```

- [ ] **Step 2: Tab transition (Rituais)**

```css
/* Cross-fade entre tab panels */
.tab-enter {
  opacity: 0;
  transform: translateX(20px);
}
.tab-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: 250ms ease;
}
```

- [ ] **Step 3: Swipe feedback (Sabotagem cards)**

```tsx
// Touch events: onTouchStart, onTouchMove, onTouchEnd
// Threshold: 80px de swipe para ativar flip
// Visual: CSS perspective + rotateY(180deg) com backface-visibility
```

- [ ] **Step 4: Commit**

```bash
git commit -m "animation: fade-in scroll + tab transition + swipe cards"
```

---

## Fase 6 — Assets Visuais (Produção em Sessão Futura)

> [!IMPORTANT]
> **Esta fase é paralela e independente.** Pode ser executada em qualquer momento.
> Usar a ferramenta `generate_image` para cada batch. Os HTMLs protótipos comentam
> exatamente o que cada imagem deve ser.

### Task 14: Onda 1 — Assets Mínimos para Esqueleto

| #   | Asset                                              | Prompt sugerido                                                                                                                                      | Proporção                             | Destino        |
| --- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------------- |
| 1   | Hero genérico home                                 | "Close-up macro photography of essential oil drops on green botanical leaves, warm natural lighting, vertical composition, wellness editorial style" | 3:4                                   | HomePage hero  |
| 2-4 | 3 fotos de óleo (Grapefruit, Peppermint, Serenity) | "Macro photography of {oil/plant}, studio lighting, editorial botanical, clean background"                                                           | 1:1 (80x80 thumb) + 4:3 (detail hero) | BibliotecaPage |
| 5   | Foto wellness para receita                         | "Hands applying massage oil on body, soft warm lighting, wellness spa editorial"                                                                     | 16:9                                  | RituaisPage    |
| 6-8 | 3 texturas abstratas Mindset                       | "Abstract watercolor texture, beige and ivory tones, subtle botanical leaf shadows, digital art, minimalist"                                         | 1:1                                   | MindsetPage    |
| 9   | Foto editorial mãos + óleos                        | "Feminine hands pouring essential oil from amber bottle, warm light, editorial wellness"                                                             | 16:9                                  | GuiasPage      |

- [ ] **Step 1: Gerar 9 imagens com generate_image**
- [ ] **Step 2: Salvar em `app/src/assets/`**
- [ ] **Step 3: Substituir ImagePlaceholder por `<img>` reais**
- [ ] **Step 4: Commit**

### Task 15: Onda 2 — 17 Fotos Hero de Óleo

| #   | Óleo          | Prompt sugerido                                                                                       |
| --- | ------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | Grapefruit    | "Macro cross-section of grapefruit with visible juice droplets, botanical photography, warm lighting" |
| 2   | Peppermint    | "Fresh peppermint leaves with dew drops, extreme close-up macro, green vivid, editorial botanical"    |
| 3   | Serenity      | "Lavender field at golden hour, dreamy bokeh, soothing purple and gold tones"                         |
| 4   | Lime e Lemon  | "Sliced lime and lemon with essential oil drops, citrus macro photography"                            |
| 5   | Cinnamon Bark | "Cinnamon bark sticks spiral macro, warm amber tones, spice photography"                              |
| 6   | Wild Orange   | "Ripe wild orange on branch with leaves, golden sunlight, botanical art"                              |
| 7   | Gengibre      | "Fresh ginger root cross section, warm earth tones, macro food photography"                           |
| 8   | Basil         | "Fresh basil leaves top view, green vivid, water droplets, culinary editorial"                        |
| 9   | Camomila      | "Chamomile flowers field close-up, soft white and yellow, dreamy botanical"                           |
| 10  | Balance       | "Balanced zen stones with essential oil bottles, muted earth tones, wellness"                         |
| 11  | Smart & Sassy | "Citrus blend ingredients (grapefruit, peppermint, ginger), flat-lay editorial"                       |
| 12  | Alecrim       | "Rosemary sprigs close-up, Mediterranean sunlight, herbal photography"                                |
| 13  | Fennel        | "Fennel bulb cross-section macro, green and white tones, vegetable art"                               |
| 14  | Turmeric      | "Turmeric root and powder, golden warm tones, spice macro photography"                                |
| 15  | Sândalo       | "Sandalwood bark and shavings, warm wood tones, zen texture photography"                              |
| 16  | Cilantro      | "Fresh cilantro/coriander leaves, green vibrant, water mist, herbal macro"                            |
| 17  | Petitgrain    | "Bitter orange tree leaves and small fruits, green botanical, morning light"                          |

- [ ] **Step 1-17: Gerar 17 fotos hero (4:3 landscape para detail, 1:1 thumbnail)**
- [ ] **Step 18: Salvar e substituir placeholders**
- [ ] **Step 19: Commit**

### Task 16: Onda 3 — Fotos de Receitas + Passo-a-Passo

**29 fotos hero de receita** (food/wellness photography) + **~60 fotos de passo-a-passo** (demonstrativas).

> [!TIP]
> Esta onda pode ser feita graduamente — por aba de receitas:
>
> - Uso Tópico: 5 heroes + 10 steps
> - Culinária: 6 heroes + 12 steps
> - TrimShake: 9 heroes + 0 steps (shakes são idênticos)
> - Bebidas: 5 heroes + 10 steps
> - Difusão: 4 heroes + 4 steps

- [ ] **Steps: Gerar por batch de aba**
- [ ] **Substituir placeholders**
- [ ] **Commit**

### Task 17: Ícones SVG Orgânicos

| #   | Ícone          | Uso                 | Estilo                                       |
| --- | -------------- | ------------------- | -------------------------------------------- |
| 1   | Conta-gotas    | Atalho "Biblioteca" | Line-art orgânico, 1.5px stroke, cor primary |
| 2   | Mãos em concha | Atalho "Rituais"    | idem                                         |
| 3   | Cérebro/folha  | Atalho "Mindset"    | idem                                         |
| 4   | Escudo/folha   | Atalho "Guias"      | idem                                         |
| 5   | Sol            | Alerta cítricos     | idem                                         |
| 6   | Cápsula        | Alerta ingestão     | idem                                         |
| 7   | Gota           | Alerta diluição     | idem                                         |
| 8   | Escudo         | Alerta CPTG         | idem                                         |
| 9   | Casa           | Nav "Home"          | idem                                         |
| 10  | Folha          | Nav "Óleos"         | idem                                         |

- [ ] **Steps: Gerar via generate_image com prompt "minimal line-art icon"**
- [ ] **Converter para SVG (se necessário: potrace ou export manual)**
- [ ] **Commit**

---

## Fase 7 — PWA & Deploy

### Task 18: PWA (Progressive Web App)

- [ ] **Step 1: Criar manifest.json**

```json
{
  "name": "Óleos & Emoções",
  "short_name": "Óleos",
  "description": "Seu santuário botânico digital",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAF9F6",
  "theme_color": "#2A4B41",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

- [ ] **Step 2: Service Worker com Vite PWA plugin**

```bash
npm install -D vite-plugin-pwa
```

```typescript
// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";
// ... configuração de precache dos assets + offline fallback
```

- [ ] **Step 3: Gerar ícones PWA (192x192 + 512x512)**

- [ ] **Step 4: Commit**

```bash
git commit -m "pwa: manifest + service worker para instalação em tela home"
```

---

### Task 19: Deploy Estático

**Skill candidata:** `perfect-deploy-with-backup`

- [ ] **Step 1: Build de produção**

```bash
cd app && npm run build
```

- [ ] **Step 2: Verificar dist/ funciona localmente**

```bash
npx serve dist -l 3000
```

- [ ] **Step 3: Deploy na Vercel (ou Netlify)**

```bash
npx -y vercel --prod
```

Ou configurar via dashboard Vercel conectando ao repositório GitHub.

- [ ] **Step 4: Configurar domínio customizado (se aplicável)**

- [ ] **Step 5: Lighthouse audit final (Performance + Accessibility + SEO)**

Expected: Score ≥ 90 em todas as categorias.

- [ ] **Step 6: Commit + Tag**

```bash
git tag v1.0.0
git push --tags
```

---

## 🧰 Mapeamento Completo de Skills por Task

> **Fontes:** [guia_operacional_core_skills.md](/home/leonardotl/.agents/skills/guia_operacional_core_skills.md) (14 core skills — Engenharia/QA) + [guia_definitivo_skills_editoriais_ux.md](/home/leonardotl/.agents/promissoras/guia_definitivo_skills_editoriais_ux.md) (8 skills — Conteúdo/UX)

### 📍 Diretórios das Skills

| Skill                              | Diretório                                                                 | Departamento         |
| ---------------------------------- | ------------------------------------------------------------------------- | -------------------- |
| `writing-plans`                    | `/home/leonardotl/.agents/skills/writing-plans/SKILL.md`                  | 🗺️ Arquitetura       |
| `executing-plans`                  | `/home/leonardotl/.agents/skills/executing-plans/SKILL.md`                | 🗺️ Arquitetura       |
| `subagent-driven-development`      | `/home/leonardotl/.agents/skills/subagent-driven-development/SKILL.md`    | 🗺️ Arquitetura       |
| `diario-tecnico`                   | `/home/leonardotl/.agents/skills/diario-tecnico/SKILL.md`                 | 🗺️ Arquitetura       |
| `test-driven-development`          | `/home/leonardotl/.agents/skills/test-driven-development/SKILL.md`        | 💻 Código            |
| `vercel-react-best-practices`      | `/home/leonardotl/.agents/skills/react-best-practices/SKILL.md`           | 💻 Código            |
| `accessibility-compliance`         | `/home/leonardotl/.agents/skills/accessibility-compliance/SKILL.md`       | 💻 Código            |
| `systematic-debugging`             | `/home/leonardotl/.agents/skills/systematic-debugging/SKILL.md`           | 💻 Código            |
| `code-review-excellence`           | `/home/leonardotl/.agents/skills/code-review-excellence/SKILL.md`         | 🕵️ QA/Deploy         |
| `webapp-testing`                   | `/home/leonardotl/.agents/skills/webapp-testing/SKILL.md`                 | 🕵️ QA/Deploy         |
| `verification-before-completion`   | `/home/leonardotl/.agents/skills/verification-before-completion/SKILL.md` | 🕵️ QA/Deploy         |
| `finishing-a-development-branch`   | `/home/leonardotl/.agents/skills/finishing-a-development-branch/SKILL.md` | 🕵️ QA/Deploy         |
| `perfect-deploy-with-backup`       | `/home/leonardotl/.agents/skills/perfect-deploy-with-backup/SKILL.md`     | 🕵️ QA/Deploy         |
| `psicometra-soberano`              | `/home/leonardotl/.agents/skills/psicometra-soberano/SKILL.md`            | 🔮 Auditoria Pessoal |
| `content-strategy`                 | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | ✍️ Editorial         |
| `copy-editing`                     | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | ✍️ Editorial         |
| `beautiful-prose`                  | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | ✍️ Editorial         |
| `writing-clearly-and-concisely`    | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | ✍️ Editorial         |
| `professional-proofreader`         | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | ✍️ Editorial         |
| `hig-components-content`           | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | 📱 Design/Interface  |
| `ui-ux-designer` / `ui-ux-pro-max` | `/home/leonardotl/.agents/promissoras/` (skill editorial)                 | 📱 Design/Interface  |

### 🔗 Skills por Task — Referência Cruzada Detalhada

|   Task    | Nome                      | Skills Core (Engenharia)                                                                                           | Skills Editoriais (UX/Conteúdo)                                                | Justificativa                                                                                                                                                                                                                                                          |
| :-------: | ------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   **1**   | Scaffold Vite             | —                                                                                                                  | —                                                                              | Automação simples, sem skill necessária                                                                                                                                                                                                                                |
|   **2**   | Design System CSS         | `vercel-react-best-practices`                                                                                      | `ui-ux-pro-max`                                                                | **React BP** define padrões CSS Modules performáticos; **UI ProMax** valida contraste WCAG dos tokens e assimetria da tipografia editorial                                                                                                                             |
|   **3**   | Conversão .txt→JSON       | —                                                                                                                  | `content-strategy`                                                             | **Strategy** mapeia a árvore de categorização dos 105 .txt → 6 JSONs com chaves fixas (Tópico>Subtópico>Uso) sem redundância                                                                                                                                           |
|   **4**   | Layout Shell + Router     | `vercel-react-best-practices`                                                                                      | `hig-components-content`                                                       | **React BP** configura o code splitting correto; **HIG** valida que os labels do BottomNav obedecem restrição de 12-chars e imperativos curtos Apple                                                                                                                   |
|   **5**   | Componentes Design System | `vercel-react-best-practices`, `test-driven-development`                                                           | `hig-components-content`, `ui-ux-pro-max`                                      | **React BP** previne re-renders nos componentes; **TDD** garante props e comportamento via Vitest; **HIG** blinda microcopy dos chips/pills; **UI ProMax** garante glassmorphism e shadow corretos                                                                     |
|   **6**   | Página Home               | `vercel-react-best-practices`                                                                                      | `beautiful-prose`, `copy-editing`                                              | **React BP** otimiza IntersectionObserver; **Prose** cria tom Sage+Healer na saudação; **Copy-editing** aplica Zeigarnik na chamada do Spotlight para retenção                                                                                                         |
|   **7**   | Página Biblioteca         | `vercel-react-best-practices`                                                                                      | `writing-clearly-and-concisely`, `ui-ux-pro-max`                               | **React BP** memo nos 17 cards; **Writing Clearly** compacta descrições de óleo para viewport mobile; **UI ProMax** valida organic mask e tonal nesting                                                                                                                |
|   **8**   | Página Rituais            | `vercel-react-best-practices`, `accessibility-compliance`                                                          | `hig-components-content`, `copy-editing`                                       | **A11y** garante ARIA nas tabs; **HIG** valida labels SOP curtos nos pills; **Copy-editing** refina títulos SOP para máxima persuasão tática                                                                                                                           |
|   **9**   | Página Mindset            | `vercel-react-best-practices`                                                                                      | `beautiful-prose`, `copy-editing`                                              | **Prose** escreve cards de dica com empatia terapêutica (Arquétipo Curador); **Copy-editing** afina as frases de sabotagem→substituição para impacto emocional máximo                                                                                                  |
|  **10**   | Página Guias              | —                                                                                                                  | `beautiful-prose`, `professional-proofreader`, `writing-clearly-and-concisely` | **Prose** cria drop-cap literário e pull-quotes poéticos; **Proofreader** blinda gramaticalmente o aviso legal (texto jurídico não pode errar); **Writing Clearly** compacta alertas de segurança                                                                      |
|  **11**   | Acessibilidade            | `accessibility-compliance`                                                                                         | —                                                                              | **A11y** roda audit WCAG 2.2 AA completo (contraste, ARIA, touch targets, focus ring, headings hierarchy)                                                                                                                                                              |
|  **12**   | Performance               | `vercel-react-best-practices`                                                                                      | —                                                                              | **React BP** aplica code splitting, lazy loading, CLS < 0.1, Lighthouse ≥ 90                                                                                                                                                                                           |
|  **13**   | Micro-Animações           | `vercel-react-best-practices`                                                                                      | `ui-ux-pro-max`                                                                | **React BP** otimiza IntersectionObserver; **UI ProMax** calibra timing das transições para sensação "boutique" sem jank                                                                                                                                               |
| **14-17** | Assets Visuais            | —                                                                                                                  | `ui-ux-pro-max`                                                                | **UI ProMax** valida que cada imagem gerada respeita o Design System (Eucalipto Profundo, tons neutros, iluminação natural)                                                                                                                                            |
|  **18**   | PWA                       | —                                                                                                                  | —                                                                              | Configuração técnica simples                                                                                                                                                                                                                                           |
|  **19**   | Deploy                    | `perfect-deploy-with-backup`, `verification-before-completion`, `finishing-a-development-branch`, `webapp-testing` | `professional-proofreader`                                                     | **Deploy PD** tranca backup tar.gz no cofre local; **Verification** exige prova Shell de que build compila; **Finishing** limpa branches e temp files; **Webapp-testing** roda Playwright em todas as rotas; **Proofreader** faz varredura final de typos em toda a UI |

### 🏭 Pipeline Soberano de Execução (Ordem Obrigatória)

> Baseado na "Linha de Montagem" documentada no `guia_operacional_core_skills.md` §2 e no pipeline editorial do `guia_definitivo_skills_editoriais_ux.md` §2.

```
┌─────────────────────────────────────────────────────────────────┐
│  🗺️ FASE ESTRATÉGICA (Antes de tocar código)                  │
│                                                                 │
│  writing-plans ──→ diario-tecnico ──→ executing-plans           │
│  "Desenha o quê"   "Registra o porquê"  "Executa o como"       │
│                    ou subagent-driven-development                │
│                    "Despacha em paralelo"                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│  ✍️ FASE EDITORIAL (Conteúdo antes de tela)                    │
│                                                                 │
│  content-strategy ──→ copy-editing ──→ beautiful-prose          │
│  "Estrutura o banco"   "Persuade"      "Humaniza"              │
│         │                                                       │
│         └──→ writing-clearly ──→ professional-proofreader       │
│              "Compacta"         "Blinda gramática"              │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│  💻 FASE DE CÓDIGO (Construção blindada)                       │
│                                                                 │
│  test-driven-dev ──→ react-best-practices ──→ accessibility    │
│  "Teste primeiro"    "Sem re-renders"         "WCAG 2.2 AA"   │
│                             │                                   │
│                      systematic-debugging                       │
│                      "Se quebrar, bisturi"                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│  📱 FASE DE INTERFACE (Materialização visual)                  │
│                                                                 │
│  hig-components ──→ ui-ux-pro-max                              │
│  "Microcopy Apple"   "Glassmorphism + tokens + conversão"      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│  🕵️ FASE DE ENTREGA (QA → Deploy)                             │
│                                                                 │
│  code-review ──→ webapp-testing ──→ verification-before        │
│  "Guilhotina PR"  "Playwright ghost"  "Prova ou não sai"      │
│         │                                    │                  │
│         └──→ finishing-branch ──→ perfect-deploy-with-backup   │
│              "Limpa temp"        "Cofre tar.gz + deploy prod"  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                    diario-tecnico
                    "Registra a conclusão"
                          │
                    psicometra-soberano [SYNC]
                    "Recalibra após sprint"
```

### ⚠️ Regras de Invocação (do Guia Editorial §3)

1. **Nunca** usar `copy-editing` em microcopy de botões → usar `hig-components-content`
2. **Nunca** usar `writing-clearly` no topo de funil (dicas Mindset) → usar `beautiful-prose` (empatia > concisão)
3. **Nunca** rodar `professional-proofreader` antes de finalizar a copy → revisão gramatical é a última camada
4. **Nunca** pular `verification-before-completion` antes de commit → evidência Shell obrigatória

---

## Inventário de Assets Visuais Completo

> Este inventário lista TODOS os assets pendentes para produção.
> Cada item inclui: tipo, quantidade, proporção, estilo e destino na UI.

### Fotografias Botânicas (Óleos)

| #   | Óleo                  | Thumb (1:1, 80px) | Hero (4:3, 1080px) | Spotlight (3:4, 1440px) |
| --- | --------------------- | :---------------: | :----------------: | :---------------------: |
| 1   | Grapefruit            |         ☐         |         ☐          |            ☐            |
| 2   | Peppermint            |         ☐         |         ☐          |            ☐            |
| 3   | Serenity              |         ☐         |         ☐          |            ☐            |
| 4   | Lime e Lemon          |         ☐         |         ☐          |            ☐            |
| 5   | Cinnamon Bark         |         ☐         |         ☐          |            ☐            |
| 6   | Wild Orange           |         ☐         |         ☐          |            ☐            |
| 7   | Gengibre              |         ☐         |         ☐          |            ☐            |
| 8   | Basil                 |         ☐         |         ☐          |            ☐            |
| 9   | Camomila Romana       |         ☐         |         ☐          |            ☐            |
| 10  | Balance (blend)       |         ☐         |         ☐          |            ☐            |
| 11  | Smart & Sassy (blend) |         ☐         |         ☐          |            ☐            |
| 12  | Alecrim               |         ☐         |         ☐          |            ☐            |
| 13  | Fennel                |         ☐         |         ☐          |            ☐            |
| 14  | Turmeric              |         ☐         |         ☐          |            ☐            |
| 15  | Sândalo Hawaiano      |         ☐         |         ☐          |            ☐            |
| 16  | Cilantro              |         ☐         |         ☐          |            ☐            |
| 17  | Petitgrain            |         ☐         |         ☐          |            ☐            |
|     | **Subtotal**          |      **17**       |       **17**       |  **17** = **51 fotos**  |

### Fotografias de Receitas

| Aba          | Qtd de receitas | Hero (16:9) | Passo-a-passo (3:2, ~2/receita) |
| ------------ | :-------------: | :---------: | :-----------------------------: |
| Uso Tópico   |        5        |      5      |               10                |
| Culinária    |        6        |      6      |               12                |
| TrimShake    |        9        |      9      |      0 (preparo idêntico)       |
| Bebidas      |        5        |      5      |               10                |
| Difusão      |        4        |      4      |                4                |
| **Subtotal** |     **29**      |   **29**    |        **36 = 65 fotos**        |

### Texturas e Backgrounds

| Tipo                 | Quantidade | Proporção    | Destino               |
| -------------------- | :--------: | ------------ | --------------------- |
| Aquarela bege/marfim |     8      | 1:1 (1080px) | Cards de dica Mindset |
| **Subtotal**         |   **8**    |              |                       |

### Ícones SVG

| Tipo                        | Quantidade | Destino      |
| --------------------------- | :--------: | ------------ |
| Atalhos rápidos (Home grid) |     4      | HomePage     |
| Alertas de segurança        |     4      | GuiasPage    |
| Bottom nav                  |     5      | Shell global |
| **Subtotal**                |   **13**   |              |

### Outros

| Tipo                    | Quantidade | Destino       |
| ----------------------- | :--------: | ------------- |
| Foto/placeholder autora |     1      | GuiasPage     |
| Ícones PWA (192 + 512)  |     2      | manifest.json |
| Favicon (.ico + .svg)   |     2      | index.html    |
| OG Image (social share) |     1      | meta tags     |
| **Subtotal**            |   **6**    |               |

### TOTAL GERAL DE ASSETS

| Categoria               | Quantidade |
| ----------------------- | :--------: |
| Fotografias botânicas   |     51     |
| Fotografias de receitas |     65     |
| Texturas/backgrounds    |     8      |
| Ícones SVG              |     13     |
| Outros                  |     6      |
| **TOTAL**               |  **143**   |

---

## Referência Cruzada: Onde Cada Fonte de Dados Vive

```
docs/Transformar em Bonus/Óleos Essenciais e Emoções no Emagrecimento/
├── 00-complementar/                    ← Assets de UI produzidos
│   ├── classificacao-filtros/          → oils.json (filter field)
│   ├── home-spotlight/                 → spotlights.json
│   ├── mindset-pareamento/             → mindset.json
│   ├── pull-quotes-editoriais/         → safety.json (pullQuotes)
│   ├── subtitulos-emocionais/          → oils.json (subtitle)
│   ├── tags-beneficio/                 → oils.json (tags[])
│   ├── metadados-dicas-mindset.txt     → tips.json
│   ├── metadados-receitas.txt          → recipes.json (metadados SOP)
│   ├── neural-transmission-flow.txt    → hardcoded na HomePage
│   └── registro-producao.md            ← Inventário (referência)
├── 01-institucional/                   → safety.json (aviso legal)
├── 02-introducao/                      → safety.json (sobre autora)
├── 03-apresentacao/                    → safety.json (alertas) + HomePage intro
├── 04-oleos-essenciais/                → oils.json (17 fichas)
├── 05-receitas-com-oleos/              → recipes.json (tab: culinária)
├── 06-receitas-com-trimshake/          → recipes.json (tab: trimshake)
├── 07-bebidas-com-oleos/               → recipes.json (tab: bebidas)
├── 08-uso-topico/                      → recipes.json (tab: topico)
├── 09-ingestao-e-aromaterapia/         → recipes.json (tab: difusao) + safety.json
├── 10-dicas/                           → tips.json (22 dicas + intro)
├── 11-nossa-mente/                     → mindset.json (sabotagem + positivo)
├── 12-conclusao/                       → safety.json (mensagem final + fontes)
├── Produção Stitch/                    ← Referência visual (HTMLs + PNGs + docs)
└── Produção - BEMVINDOMUNDO/           ← Área de desenvolvimento
    ├── styles.css                      ← Design System CSS (protótipo)
    ├── index.html                      ← Protótipo T1: Home
    ├── biblioteca.html                 ← Protótipo T2: Biblioteca
    ├── rituais.html                    ← Protótipo T3: Rituais
    ├── mindset.html                    ← Protótipo T4: Mindset
    ├── guias.html                      ← Protótipo T5: Guias
    └── app/                            ← Projeto Vite+React (a criar)
```
