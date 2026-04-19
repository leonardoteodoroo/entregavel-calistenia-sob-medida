# Changelog PD

## [v0] 18/04/2026 18:41:12

perf(ui): resolucao de travamentos de scroll mobile, ajustes focais de contraste e implantacao de changelog automatico

### Contexto Completo

- **Fim do Jank no Mobile:** Remoção de 'backdrop-filter: blur' na Hero e otimização de CSS base.
- **Contraste WCAG AA:** Escurecimento de teal/rose para leitura perfeita sobre fundos muted.
- **Auto-Changelog:** Script PD agora gera CHANGELOG_PD.md na raiz automaticamente.

---

## [v1] 18/04/2026 18:57:24

perf(lcp): implementacao de fetchpriority, preload e refatoracao hero para img tag

### Detalhes Técnicos

- **Fetch Priority:** Implementado 'fetchpriority=high' via preload no index.html e tag img no Home.tsx para acelerar a descoberta e download da imagem de LCP.
- **Refatoracao Semantica:** Substituicao de background-image (CSS) por tag <img> para priorizacao nativa do navegador.
- **Lazy Loading:** Auditoria e confirmacao de loading='lazy' em imagens fora da dobra inicial.

---
