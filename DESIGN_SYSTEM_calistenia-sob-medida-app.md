# DESIGN SYSTEM + PERFORMANCE SYSTEM — TOKENS SEMÂNTICOS (Quiz Calistenia Feminina)

## TAREFA

Este documento serve como a “Bíblia Visual e Técnica” do projeto: define nomenclatura semântica, padrões de UI, e guardrails de implementação para performance, estabilidade, acessibilidade, segurança e SEO.

## 🚨 IMPORTANTE: FILOSOFIA DE ADAPTAÇÃO

Este sistema define a ESTRUTURA. Os valores foram preenchidos de acordo com a persona e o nicho de (Calistenia Feminina, 36-49 anos, foco em bem-estar, emagrecimento, autoconfiança, superação de frustrações e busca de rotina prática).

O tom é **Acolhedor, Seguro, Elegante e Prático**. Rejeitamos a estética "neon/crossfit agressiva" e abraçamos o "Wellness Premium".

---

## 1) CORES (TOKENS SEMÂNTICOS)

Observação: tokens definem papéis; os valores refletem a paleta "Confiança e Cuidado" (Blush Pink, Taupe, Ivory e Deep Teal).

### Texto

text-primary: #2D3748 (Cinza chumbo profundo - legibilidade máxima sem a dureza do preto puro)
text-secondary: #4A5568 (Cinza médio - elegante e calmo para leituras longas)
text-muted: #A0AEC0 (Cinza claro - para hints e placeholders sutis)
text-on-dark: #F7FAFC (Branco off-white - suave aos olhos no fundo escuro)
text-on-brand: #FFFFFF (Branco puro - para alto contraste sobre botões primários)
text-on-strong: #FFFFFF (Branco puro)

### Superfícies (Backgrounds)

surface-page: #FAF9F6 (Ivory / Marfim - traz aconchego e clareza mental, evitando o branco clínico)
surface-section: #F3EFEA (Taupe ultra claro - para quebra de seção sutil e orgânica)
surface-card: #FFFFFF (Branco puro - para destacar blocos de conteúdo com sombras leves)
surface-subtle: #FDF8F5 (Blush palest - toque feminino e acolhedor invisível)
surface-elevated: #FFFFFF (Para modais e popups, foco total no conteúdo)

### Ações (Actions & Buttons)

action-primary: #2C7A7B (Teal / Verde-azulado - confiança, calma, "vida sob controle")
action-primary-hover: #285E61 (Teal escuro)
action-primary-active: #234E52 (Teal extra escuro)
action-primary-disabled: #B2F5EA (Teal ultra pálido)
action-secondary: transparent (com borda #2C7A7B)
action-secondary-hover: #E6FFFA (Fundo Teal super claro)
action-secondary-active: #B2F5EA (Fundo Teal claro)
action-secondary-disabled: transparent (com borda #E2E8F0)
action-strong: #D53F8C (Magenta maduro/Rose - energia, feminilidade forte, sem ser infantil, alta conversão para quiz)
action-strong-hover: #B83280 (Rose escuro)
action-strong-active: #97266D (Rose profundo)
action-strong-disabled: #FED7E2 (Rose pálido)

### Gradientes

gradient-primary: linear-gradient(135deg, #FAF9F6 0%, #F3EFEA 100%) (Ivory para Taupe sutil)
gradient-cta: linear-gradient(135deg, #D53F8C 0%, #B83280 100%) (Rose vibrante para Rose escuro para conversão no fim do Quiz)

### Bordas (Borders)

border-default: #E2E8F0 (Cinza sutil - separações limpas)
border-subtle: #EDF2F7 (Cinza ultra leve)
border-focus: #319795 (Teal vibrante - anel de foco acessível)
border-disabled: #CBD5E0 (Cinza médio claro)

### Status (cor + superfície)

status-success: #38A169 (Verde seguro da saúde)
status-success-surface: #F0FFF4 (Fundo verde menta)
status-warning: #DD6B20 (Laranja terroso/motivação)
status-warning-surface: #FFFAF0 (Fundo laranja super pálido)
status-error: #E53E3E (Vermelho clássico)
status-error-surface: #FFF5F5 (Fundo vermelho suave - sem trigger de pânico)

### Links e Destaques

link-default: #2C7A7B (Teal da marca)
link-hover: #285E61 (Teal Escuro e sublinhado grosso)
highlight: #FEEBC8 (Amarelo/Laranja pálido - marca-texto sutil)

---

## 2) ESPAÇAMENTO (SPACING SCALE)

space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-6: 24px
space-8: 32px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px

---

## 3) TIPOGRAFIA (TYPOGRAPHY)

font-family-base: 'Open Sans', sans-serif (Quente, legível, robusta e amigável para celulares)
font-family-heading: 'Merriweather', serif (Elegante, natural e traz credibilidade editorial/premium)

### Tamanhos

text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
text-3xl: 30px
text-4xl: 36px
text-5xl: 48px
text-6xl: 56px

### Pesos

font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700

### Line-height

leading-tight: 1.15
leading-snug: 1.25
leading-normal: 1.5
leading-relaxed: 1.65

### Legibilidade

measure-sm: 52ch
measure-md: 64ch
measure-lg: 72ch

---

## 4) LAYOUT & GRID

container-max: 800px (Max-width reduzido para manter a interface de Quiz focada e evitar dispersão visual em Desktop)
container-padding-x-mobile: space-4
container-padding-x-desktop: space-6
grid-columns: 12 (desktop), 6 (tablet), 4 (mobile)
grid-gutter: space-4 (mobile), space-6 (desktop)
section-padding-y-mobile: space-12
section-padding-y-desktop: space-16
hero-padding-y-desktop: space-20

---

## 5) RADIUS & SHADOWS

radius-sm: 4px (Micro componentes e detalhes discretos)
radius-md: 8px (Inputs, selects e textareas)
radius-lg: 10px (Padrão de botões: primário/secundário/ghost/icon)
radius-xl: 12px (Cards padrão, list items e tabs)
radius-2xl: 16px (Modais, sheets e módulos hero)
radius-full: 9999px (Uso restrito para chips, badges e contadores)

### Shape Rules (Aplicação Obrigatória)

- Botões primário/secundário/ghost/icon: `radius-lg` (botão padrão = 10px)
- Inputs/select/textarea: `radius-md`
- Cards padrão/list items/tabs: `radius-xl`
- Modais/sheets/heros: `radius-2xl`
- Chips/badges/contadores: `radius-full` permitido

### Guardrails De Forma

- `radius-full` é proibido em botões, inputs e cards.
- Evitar novos usos de classes altamente arredondadas (`rounded-2xl` e `rounded-3xl`) para componentes de ação e leitura.
- Recomendar migração futura dos usos legados de `rounded-2xl`/`rounded-3xl` para classes alinhadas aos tokens semânticos desta seção.
  shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05) (Superfície leve)
  shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04) (Cards normais)
  shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04) (Popups, Destaques)
  shadow-card: 0 4px 12px rgba(44, 122, 123, 0.06) (Sombra com leve matiz teal para integrar com o fundo ivory)
  shadow-card-hover: 0 8px 24px rgba(44, 122, 123, 0.12) (Elevação clara da opção selecionada no Quiz)
  shadow-cta: 0 8px 20px -4px rgba(213, 63, 140, 0.35) (Glow Rose para o botão de compra)

---

## 6) MOTION

transition-fast: 200ms (Acentuamos um pouquinho a demora para passar sensação relaxante, menos abrupta e robótica)
transition-normal: 350ms (Para transições de steps do quiz)
transition-slow: 600ms (Para revelações da promessa / impacto de fade-in)
ease-standard: cubic-bezier(0.4, 0, 0.2, 1) (Smooth material ease)
ease-emphasized: cubic-bezier(0.2, 0, 0, 1) (Desaceleração dramática, elegante)
motion-distance-sm: 4px (Deslocamentos curtos em opções de quiz)
motion-distance-md: 16px (Entradas suaves das perguntas no scroll)

---

Demais seções (como Camada de Impacto e Padrões de implementação) seguem a diretriz estrutural padrão enviada no template neutro.
