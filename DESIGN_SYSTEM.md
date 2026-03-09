Segue o documento **unificado e neutralizado** (Design System + Camada de Impacto + Performance/Estabilidade + Acessibilidade + Segurança + SEO + Manutenibilidade), juntando o melhor do manual e do relatório PageSpeed.  

```text
Template base define o ponto de partida para novos projetos digitais com foco em Design System, consistência visual e padrões de performance/estabilidade.
# DESIGN SYSTEM + PERFORMANCE SYSTEM — TOKENS SEMÂNTICOS (BASE NEUTRA)
## TAREFA
Este documento serve como a “Bíblia Visual e Técnica” do projeto: define nomenclatura semântica, padrões de UI, e guardrails de implementação para performance, estabilidade, acessibilidade, segurança e SEO.
## 🚨 IMPORTANTE: FILOSOFIA DE ADAPTAÇÃO (LEIA ANTES)
Este sistema define a ESTRUTURA (os nomes e papéis semânticos), não a ALMA (valores finais, estética, estilo, branding).
Regra geral: nomes semânticos permanecem estáveis; valores marcados como (a definir por projeto) devem ser ajustados conforme nicho, marca, público, plataforma e restrições.
1) O “Camaleão”: para cada novo projeto (ex: nicho A vs nicho B), redefina o que os tokens representam (valores), mantendo a mesma nomenclatura (estrutura).
2) Permissão para Surpreender (Licensed to Wow): o sistema garante consistência para páginas internas e fluxos padrão; para seções de impacto (Hero, Oferta, Prova Social-chave), é permitido “quebrar” o padrão de forma controlada pela Camada de Impacto (seção 11).
3) Contexto é Rei: estética deve servir ao nicho; não force visual clean/tech em produto rústico/orgânico, nem o inverso; adapte tokens e padrões.
4) Acessibilidade e Performance são não negociáveis: personalização nunca pode violar contraste, foco visível, motion reduzido, legibilidade, estabilidade e Core Web Vitals.
## CONVENÇÕES E REGRAS DE USO (PARA HUMANOS E IA)
Use tokens semânticos (papéis), evite valores hard-coded (cores, sombras, transições, tamanhos) fora do que está definido aqui.
Mobile-first: desenhe e implemente para telas pequenas primeiro, depois escale.
Semântica primeiro: use HTML5 semântico e acessível; prefira elementos nativos; ARIA só quando necessário.
Performance by design: não adianta “UI bonita” se ela quebra PageSpeed, acessibilidade ou estabilidade; siga o bloco de Padrões de Implementação (seção 12).
Escopo e isolamento: quando precisar sair do padrão, use Camada de Impacto com escopo “impact” (seção 11) para evitar vazamento de estilos.
Documente exceções: sempre que usar override, explique o “porquê” (intenção) e o “onde” (escopo).
---
## 1) CORES (TOKENS SEMÂNTICOS)
Observação: tokens definem papéis; valores são (a definir por projeto).
### Texto
text-primary: Cor principal de títulos e texto importante (alto contraste). (a definir por projeto)
text-secondary: Cor de texto de apoio, legendas, descrições. (a definir por projeto)
text-muted: Cor de placeholders, dicas, texto desabilitado. (a definir por projeto)
text-on-dark: Texto claro sobre fundos escuros. (a definir por projeto)
text-on-brand: Texto sobre cor primária da marca. (a definir por projeto)
text-on-strong: Texto sobre cor de destaque forte/CTA. (a definir por projeto)
### Superfícies (Backgrounds)
surface-page: Fundo principal da página. (a definir por projeto)
surface-section: Fundo de seções alternadas (para separar blocos). (a definir por projeto)
surface-card: Fundo de cards e elementos contidos. (a definir por projeto)
surface-subtle: Fundos sutis, destaque leve. (a definir por projeto)
surface-elevated: Elementos elevados (modais, tooltips, dropdowns). (a definir por projeto)
### Ações (Actions & Buttons)
action-primary: Botões principais, links de destaque. (a definir por projeto)
action-primary-hover: Estado hover de action-primary. (a definir por projeto)
action-primary-active: Estado pressed/active de action-primary. (a definir por projeto)
action-primary-disabled: Estado disabled de action-primary. (a definir por projeto)
action-secondary: Botões secundários (borda ou fundo sutil). (a definir por projeto)
action-secondary-hover: Estado hover de action-secondary. (a definir por projeto)
action-secondary-active: Estado pressed/active de action-secondary. (a definir por projeto)
action-secondary-disabled: Estado disabled de action-secondary. (a definir por projeto)
action-strong: CTA de alta conversão (destaque forte/quente). (a definir por projeto)
action-strong-hover: Estado hover de action-strong. (a definir por projeto)
action-strong-active: Estado pressed/active de action-strong. (a definir por projeto)
action-strong-disabled: Estado disabled de action-strong. (a definir por projeto)
### Gradientes
gradient-primary: Gradiente da marca (heros/fundos). (a definir por projeto)
gradient-cta: Gradiente de alta conversão para action-strong. (a definir por projeto)
### Bordas (Borders)
border-default: Bordas padrão de separação. (a definir por projeto)
border-subtle: Divisores leves. (a definir por projeto)
border-focus: Cor do anel de foco (acessibilidade). (a definir por projeto)
border-disabled: Bordas em estado disabled. (a definir por projeto)
### Status (cor + superfície)
status-success: Cor principal de sucesso/garantia. (a definir por projeto)
status-success-surface: Fundo de sucesso. (a definir por projeto)
status-warning: Cor principal de alerta/escassez. (a definir por projeto)
status-warning-surface: Fundo de alerta. (a definir por projeto)
status-error: Cor principal de erro. (a definir por projeto)
status-error-surface: Fundo de erro. (a definir por projeto)
### Links e Destaques
link-default: Cor de link padrão. (a definir por projeto)
link-hover: Cor de link no hover. (a definir por projeto)
highlight: Cor de marca-texto/destaque suave. (a definir por projeto)
---
## 2) ESPAÇAMENTO (SPACING SCALE)
Use estes valores para margin, padding, gap e rhythm.
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-6: 24px
space-8: 32px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px (seções muito amplas/desktop wide)
---
## 3) TIPOGRAFIA (TYPOGRAPHY)
Observação: a escala abaixo é base de legibilidade; a família tipográfica é (a definir por projeto).
font-family-base: Fonte principal do projeto. (a definir por projeto)
font-family-heading: Fonte de títulos, se diferente. (a definir por projeto)
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
text-6xl: 56px (hero excepcional/impact layer) (a definir por projeto)
### Pesos
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
### Line-height (recomendado)
leading-tight: 1.15 (títulos)
leading-snug: 1.25 (subtítulos)
leading-normal: 1.5 (texto)
leading-relaxed: 1.65 (texto longo)
### Legibilidade (layout textual)
measure-sm: 52ch (blocos curtos)
measure-md: 64ch (padrão leitura)
measure-lg: 72ch (apenas se layout pedir)
Regra: textos longos devem usar measure-md e leading-normal/relaxed.
---
## 4) LAYOUT & GRID (ESTRUTURA DE PÁGINA)
Objetivo: padronizar container, grids e espaçamentos de seções para consistência e performance.
container-max: 1120px (a definir por projeto)
container-padding-x-mobile: space-4
container-padding-x-desktop: space-6
grid-columns: 12 (desktop), 6 (tablet), 4 (mobile)
grid-gutter: space-4 (mobile), space-6 (desktop)
section-padding-y-mobile: space-12
section-padding-y-desktop: space-16
hero-padding-y-desktop: space-20
safe-area-inset: usar env(safe-area-inset-top/right/bottom/left) em layouts com barras/footers fixos.
Regra: layout deve suportar notch e diferentes viewports sem quebrar.
---
## 5) RADIUS & SHADOWS (EFEITOS DE PROFUNDIDADE)
Observação: valores são estilo; números abaixo são defaults sugeridos (a definir por projeto).
radius-sm: 4px (a definir por projeto)
radius-md: 8px (a definir por projeto)
radius-lg: 12px (a definir por projeto)
radius-xl: 16px (a definir por projeto)
radius-2xl: 24px (impact/visual mais “soft”) (a definir por projeto)
radius-full: 9999px
shadow-sm: Sombra sutil (a definir por projeto)
shadow-md: Sombra média (a definir por projeto)
shadow-lg: Sombra forte (a definir por projeto)
shadow-card: Sombra padrão de card (a definir por projeto)
shadow-card-hover: Sombra hover de card (a definir por projeto)
shadow-cta: Sombra “brilho/ênfase” para CTA (a definir por projeto)
---
## 6) MOTION (TRANSITIONS & ANIMATION TOKENS)
Objetivo: consistência de timing/curva sem travar estilo final; animações devem priorizar transform e opacity para evitar reflow/layout thrashing.
transition-fast: 150ms (a definir por projeto; ex 120–180ms)
transition-normal: 300ms (a definir por projeto; ex 220–320ms)
transition-slow: 500ms (a definir por projeto; ex 400–600ms)
ease-standard: Curva padrão para interações comuns. (a definir por projeto)
ease-emphasized: Curva para entradas/hero/cta. (a definir por projeto)
motion-distance-sm: 4–8px (a definir por projeto)
motion-distance-md: 12–20px (a definir por projeto)
Regra: evite animar propriedades que causam layout (width/height/top/left); prefira transform/opacity.
Regra: respeitar prefers-reduced-motion; se ativo, reduzir distância para 0 e manter apenas opacidade/cor quando necessário.
---
## 7) BREAKPOINTS (RESPONSIVIDADE)
bp-mobile: < 768px
bp-tablet: >= 768px
bp-desktop: >= 1024px
bp-wide: >= 1280px
Regra: usar unidades relativas (%, rem, vw/vh) e layouts fluidos; testar em dispositivos reais e simuladores.
---
## 8) ELEVAÇÃO (Z-INDEX TOKENS)
Objetivo: evitar conflitos e bugs com camadas.
z-base: 0
z-sticky: 10
z-dropdown: 20
z-overlay: 30
z-modal: 40
z-toast: 50
z-tooltip: 60
Regra: não usar números soltos; sempre use tokens.
---
## 9) COMPONENTES PADRÃO (BLUEPRINTS)
### Botões
Button Primary: bg-action-primary + text-on-brand + radius-md + shadow-sm + transition-fast + ease-standard
Button CTA (Venda): bg-gradient-cta ou bg-action-strong + text-on-strong + font-bold + shadow-cta + transition-normal + ease-emphasized + transform-hover-scale (motion-safe)
Button Secondary: bg-transparent + border-default + text-primary + transition-fast + ease-standard
Estados mínimos: hover, active/pressed, disabled, focus-visible (usar border-focus/ring)
Loading: mostrar spinner/estado carregando sem layout shift; manter largura do botão estável.
### Links
Link: link-default + underline-offset + hover link-hover + focus-visible ring
Regra: links devem ter indicação visual além de cor quando possível (underline) para acessibilidade.
### Cards
Card Base: bg-surface-card + radius-lg + shadow-card + padding space-6 + transition-fast + ease-standard
Card Hover (opcional): shadow-card-hover + micro-translate ou micro-scale (motion-safe)
Regra: cards clicáveis devem ter foco visível e target de toque confortável.
### Badges / Chips
Badge Base: bg-surface-subtle + text-secondary + radius-full + text-xs + padding space-2/space-3
Badge Status: usar status-*-surface + status-* para texto/ícone.
### Alerts / Banners
Alert Success: bg-status-success-surface + text-primary + ícone + borda opcional status-success
Alert Warning: bg-status-warning-surface + text-primary + borda opcional status-warning
Alert Error: bg-status-error-surface + text-primary + borda opcional status-error
Regra: não depender só de cor; usar ícone + texto claro.
### Inputs e Formulários
Input Base: bg-surface-card + border-default + radius-sm + text-base + transition-fast + ease-standard
Input Focus: border-focus + ring-2 + focus-visible
Input Disabled: text-muted + border-disabled + cursor-not-allowed
Label: text-sm + font-medium
Helper text: text-sm + text-muted
Error text: text-sm + status-error
Regra: sempre associar label com for/id; mensagens de erro específicas e instrutivas; não depender apenas de cor.
### Modals / Dialogs
Modal Surface: surface-elevated + shadow-lg + radius-xl + z-modal
Overlay: bg (a definir por projeto) com opacidade e blur moderado (evitar blur pesado por performance)
Focus trap: obrigatório; ao fechar, devolver foco ao gatilho apropriado.
### Dropdown / Tooltip
Dropdown: surface-elevated + shadow-md + radius-lg + z-dropdown
Tooltip: surface-elevated + shadow-sm + radius-md + z-tooltip
### Accordions / FAQ
Accordion: headings semânticos + foco visível + aria-expanded; animações com height devem usar cuidados; preferir max-height ou transform quando possível; respeitar prefers-reduced-motion.
### Skeleton / Loading States
Skeleton: usar shimmer leve (motion-safe) ou estático; evitar animações contínuas pesadas; manter dimensões finais para evitar CLS.
---
## 10) ACESSIBILIDADE (GUARDRAILS VISUAIS E DE INTERAÇÃO)
Estrutura semântica: usar header/main/footer/section/nav; somente um h1 por página; seguir hierarquia sem pular níveis.
Landmarks: incluir main/aside quando necessário para navegação rápida em leitores de tela.
Alt text: imagens significativas com alt conciso; decorativas com alt="".
Teclado: tudo interativo acessível via teclado; foco previsível e visível; tabindex com cuidado.
Contraste: mínimo 4,5:1 para texto normal e 3:1 para texto grande; evitar cor como única forma de transmitir informação.
ARIA: usar quando necessário (menus, componentes dinâmicos); preferir elementos nativos; não abusar.
Erros: mensagens claras e instrutivas; indicar como corrigir; não depender apenas de cor.
Testes: Lighthouse/axe/WAVE + testes manuais (teclado, leitores de tela como NVDA/VoiceOver).
---
## 11) CAMADA DE IMPACTO (ESCAPE HATCH / LICENSED TO WOW)
Objetivo: permitir personalização “extravagante” em seções de impacto (Hero, Oferta, Prova Social-chave, CTA final) sem quebrar o Design System do restante do projeto.
Regra geral: Design System define o padrão; Camada de Impacto permite exceções controladas e isoladas; exceções não devem vazar para componentes padrão fora do escopo impact.
Quando pode usar: somente em seções de impacto; no máximo 10–20% do conteúdo total da página.
Como aplicar (sem confundir): se a seção for Impacto, envolva em um wrapper/escopo chamado impact; dentro desse escopo, você pode remapear tokens semânticos para valores diferentes mantendo a mesma nomenclatura; fora do escopo impact, tokens voltam ao padrão.
Tokens permitidos para override dentro do escopo impact (a definir por projeto):
impact-surface-page
impact-surface-card
impact-text-primary
impact-text-secondary
impact-action-primary
impact-action-strong
impact-gradient-primary
impact-gradient-cta
impact-radius-md
impact-radius-lg
impact-shadow-card
impact-shadow-cta
impact-transition
impact-ease
Regras obrigatórias (não negociáveis): acessibilidade (contraste + focus-visible), motion (prefers-reduced-motion), legibilidade (hierarquia e medida de texto), performance (LCP/CLS/INP), estabilidade (fallbacks).
Documentação: toda seção impact deve ter uma nota curta explicando objetivo visual (“por quê” da exceção) e quais tokens foram remapeados.
Anti-padrões: criar tokens novos para cada seção sem necessidade; aplicar impact em formulários/navegação padrão; blur excessivo/partículas/animações contínuas pesadas; efeitos que derrubam performance.
---
## 12) PADRÕES DE IMPLEMENTAÇÃO (PERFORMANCE, ESTABILIDADE, SEGURANÇA, SEO, MANUTENIBILIDADE)
Este bloco é um “contrato” de engenharia: obrigatório em qualquer projeto (landing, app, site) para atingir notas altas e evitar regressões.
### 12.1 Camada de Estabilidade (Anti-Quebra)
Progressive Enhancement: recursos avançados entram como melhoria; se não suportado, não quebra.
Image Fallbacks: usar picture com AVIF/WebP e fallback JPG/PNG.
Error Boundaries: envolver componentes dinâmicos (React.lazy) em Error Boundaries.
CSS Safe-Area: usar env(safe-area-inset-*) para dispositivos com notch.
No-JS Fallback: garantir conteúdo crítico renderizado ou com fallback se JS falhar; garantir acesso ao essencial mesmo com JS/cookies desativados.
Cross-browser e graceful degradation: construir experiência principal com tecnologias amplamente suportadas e adicionar melhorias progressivas.
### 12.2 Checklist Core Web Vitals (Performance)
Performance budget: definir limites para FCP/TTI/Lighthouse/JS total; monitorar continuamente; automatizar em CI/CD para falhar build se ultrapassar.
Exemplo de orçamento (ajuste conforme projeto): FCP em 3G lento < 2s; TTI < 5s; Lighthouse Performance > 80; JS total < 170KB.
Render-blocking: reduzir recursos bloqueadores; CSS crítico no head; adiar o restante; minificar e eliminar CSS não usado; usar preload de style com onload para CSS não bloqueante quando aplicável.
JavaScript: scripts podem bloquear parser; marcar scripts externos com async/defer; remover scripts não usados; adiar funcionalidades secundárias; dividir em módulos menores; code splitting por rota/página; carregar sob demanda.
Thread principal: reduzir trabalho na main thread; evitar tarefas longas (>50ms); simplificar cálculos; remover libs pesadas; mover lógicas demoradas para Web Workers.
Solicitações em cadeia: evitar dependências profundas; reorganizar para paralelizar downloads; reduzir árvore de dependências.
Evitar reflow/layout thrashing: não alternar leituras e escritas de layout (ex: offsetWidth após mutações); agrupar leituras e gravações; para animações usar transform e opacity.
HTML: minificar e agrupar para remover comentários e espaços redundantes.
Monitoramento contínuo: usar PageSpeed Insights, Lighthouse CI e Chrome UX Report para medir impacto das mudanças.
### 12.3 Imagens (LCP, CLS, Bandwidth)
Formato: preferir AVIF/WebP quando possível; PNG/WebP lossless para muitos detalhes; JPEG/AVIF/WebP para fotos; substituir GIF por vídeo quando fizer sentido.
Dimensão correta: fornecer imagens na resolução exata; usar srcset/sizes; evitar baixar imagem maior que o necessário.
Sem CLS: sempre definir width e height; reservar espaço de mídia.
Decoding: usar decoding="async" quando aplicável.
Lazy loading: loading="lazy" em tudo abaixo da dobra; iframes não essenciais também.
LCP: identificar recurso LCP e aplicar fetchpriority="high"; não lazy-load do LCP; garantir que o LCP seja encontrado diretamente no HTML e não “descoberto” via JS.
fetchpriority: aplicar high para recursos essenciais (LCP, scripts críticos) e low para não críticos.
### 12.4 Fontes (Font Performance)
Evitar embed de fontes grandes em CSS/JS (atraso no discovery).
Preferir WOFF2; subset e limitar pesos; carregar apenas caracteres e pesos necessários.
Hospedar fontes localmente quando possível; usar font-display: swap.
Preconnect: se usar domínios externos, utilizar link rel="preconnect" com crossorigin quando aplicável.
### 12.5 CSS (Entrega e Organização)
Minificar e agrupar; remover regras não usadas (PurgeCSS/Stylelint quando aplicável).
CSS crítico inline no head para conteúdo acima da dobra.
Evitar CSS inline no body; preferir arquivos externos para cache e manutenção.
### 12.6 JavaScript (Entrega e Arquitetura)
Minificar; remover console/debugger em produção.
Code splitting: carregar apenas o necessário por página/rota; agrupar funcionalidades secundárias para carregar depois.
Scripts de terceiros: reduzir, adiar, e quando possível mover para Web Workers (ex: Partytown).
### 12.7 Servidor, Cache e Compressão (TTFB e Transfer Size)
TTFB: minimizar redirecionamentos; otimizar consultas; usar cache de página; objetivo TTFB < 1,3s (ajuste conforme infra).
Compressão: habilitar Brotli ou Gzip para HTML/CSS/JS.
Cache: cabeçalhos de cache com TTL longo para recursos estáticos versionados (ex: 1 ano); evitar TTL curto que derruba pontuação.
CDN: distribuir assets globalmente; reduzir latência; proteger contra picos.
### 12.8 SEO e Metadados (Neutro e Reutilizável)
Title tags: tratar como mini pitch; palavra-chave principal no início; benefício/resultado; qualificar público; evitar keyword stuffing; alinhar com intenção; recomendação 45–65 caracteres (ajuste conforme idioma).
Meta descriptions: 120–155 caracteres; aumentar CTR; evitar duplicadas ou vazias; complementar o título com ação clara.
Schema.org: implementar JSON-LD adequado (FAQ, HowTo, Produto, Avaliação) para rich snippets e entendimento por IA.
Open Graph / Twitter Cards: definir og:title/og:description/og:image alinhados à página; controlar preview em redes e mensageiros.
Sitemap/robots/canonical: sitemap XML + Search Console; robots.txt para bloquear o que não indexa; canonical para páginas duplicadas; URLs amigáveis e consistentes.
Conteúdo: original, útil, alinhado à intenção; headings claros; palavras-chave naturais; atualização periódica.
### 12.9 Segurança (Prática e Operacional)
HTTPS/TLS: usar TLS 1.3; certificados válidos com renovação automática; eliminar conteúdo misto; redirecionar HTTP->HTTPS.
HSTS: habilitar com max-age alto (>=31536000), includeSubDomains e preload (quando apropriado).
Cabeçalhos: CSP (com nonce/hash e strict-dynamic quando apropriado), X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN, Referrer-Policy, Permissions-Policy.
WAF: implementar e monitorar; proteção contra bots e DDoS; regras personalizadas; logs revisados.
Patches: manter bibliotecas/plugins atualizados; testar em staging; cronograma regular.
Backups: regra 3-2-1; automatizar; testar restauração; criptografar em trânsito e repouso.
Acesso: menor privilégio; MFA para admin; revisão periódica; revogar acessos não usados; políticas de senha; armazenamento seguro (hash + salt).
Monitoramento: alertas em tempo real; avaliações de vulnerabilidade; pentests; monitorar terceiros.
Plano de incidentes: preparação, detecção, contenção, erradicação, recuperação e lições aprendidas; responsabilidades e comunicação.
### 12.10 Compatibilidade, Qualidade e Operação
Testes cross-browser: Chrome/Safari/Firefox/Edge, versões e OS; automatizar; cobrir tamanhos de tela.
Responsividade: grades fluidas, flexbox/grid, min()/max(), unidades relativas; testar em devices reais; garantir toque/gestos funcionais.
Arquitetura modular: separar responsabilidades; componentes reutilizáveis; serviços/utilitários isolados.
Documentação: README/wiki atualizados; comentários explicam “por quê”, não só “o quê”.
CI/CD: pipelines com testes (unit, integração, acessibilidade, performance); deploy automatizado com rollback seguro; budgets automatizados para evitar regressão.
Revisão humana e uso de IA: IA acelera, mas revisão manual é obrigatória para legibilidade, segurança, performance e acessibilidade; treinar IA com este documento; validar saídas com testes automatizados.
### 12.11 Engenharia de Elite (Opcional, mas recomendado quando fizer sentido)
Speculation Rules API: configurar prerender para rotas principais (progressive enhancement).
Partytown: scripts de terceiros em Web Workers para aliviar thread principal.
Brotli nível alto no build (quando suportado pela infra).
View Transitions API: transições suaves para melhorar percepção e INP (progressive enhancement).
### 12.12 Build (Vite + React + TS) — Diretrizes (Neutras)
Plugins: splitVendorChunkPlugin e compressão (brotli) quando aplicável.
Target: compatibilidade ampla (ex: es2015) quando necessário.
Minificação: terser; drop console/debugger em produção.
Chunks: manualChunks para isolar vendor e reduzir custo de cache invalidation.
Regra: qualquer configuração deve priorizar compatibilidade e progressive enhancement; evitar soluções experimentais que quebrem em browsers estáveis.
---
## 13) GOVERNANÇA (COMO EVITAR BAGUNÇA AO LONGO DO TEMPO)
Quando criar token novo: apenas quando o conceito for reutilizável em mais de 2 lugares e tiver papel semântico claro.
Quando fazer override: para casos pontuais (especialmente Impact Layer) e sempre com escopo; não criar tokens por vaidade.
Nomenclatura: token deve descrever papel (ex: action-strong), não valor (ex: orange-500).
Remoção e depreciação: quando substituir token, marcar como deprecated e migrar usos; evitar quebrar componentes.
Checklist de PR: sem hard-coded de cores/sombras/transições fora de tokens; sem regressão de acessibilidade; sem regressão de performance budget; sem vazamento de Impact Layer.
---
## 14) APÊNDICE — PROMPT PARA IA (OPCIONAL, NÃO FAZ PARTE DOS TOKENS)
Uso: copie e cole este prompt no Anti-Grab/NotebookLM quando pedir para a IA completar ou gerar implementações com base neste documento.
Regra: a IA deve tratar este apêndice apenas como instrução de execução; não converter este texto em tokens nem misturar com a taxonomia do Design System.
[Atue como Arquiteto de Software Sênior, Especialista em Design System e Performance.
Objetivo: construir um projeto (landing/app) com consistência visual, acessibilidade e nota alta em auditorias (PageSpeed/Lighthouse), seguindo este Design System + Performance System.
Regras obrigatórias:
1) Use tokens semânticos (cores, espaçamento, tipografia, radius, shadows, motion, z-index); não use valores hard-coded fora do que estiver explicitamente permitido.
2) Mobile-first e responsivo; usar grids fluidos; suportar safe-area (env safe-area-inset).
3) Acessibilidade: semântica HTML5; 1 h1 por página; headings sem pular nível; foco visível; teclado completo; contraste mínimo; ARIA apenas quando necessário.
4) Performance: aplicar performance budget; eliminar render-blocking; code splitting; async/defer; reduzir main thread; evitar layout thrash; usar transform/opacity para animações.
5) Imagens: picture com AVIF/WebP + fallback; width/height; decoding async; lazy abaixo da dobra; LCP com fetchpriority high e sem lazy; garantir que LCP esteja no HTML.
6) Fontes: WOFF2; subset e poucos pesos; font-display swap; evitar embed grande; preconnect quando externo.
7) Servidor/Entrega: compressão Brotli/Gzip; cache longo para assets versionados; CDN quando aplicável; reduzir TTFB.
8) Se precisar de visual “extravagante”, use Camada de Impacto com escopo impact e remapeie tokens impact-* sem vazar para o resto; documente o porquê da exceção.
9) Segurança: HTTPS/TLS, HSTS quando aplicável, CSP e cabeçalhos; evitar conteúdo misto; boas práticas de acesso/monitoramento.
10) SEO: title/meta description bem escritos; OG tags; schema JSON-LD quando fizer sentido; sitemap/robots/canonical.
Saída esperada: componentes e páginas implementados com qualidade, com checklist final indicando cumprimento de cada seção relevante deste documento.]
```
