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

## [v2.4.0] 19/04/2026 10:51:47

refactor(server): modularizacao do express app e setup de testes

### Contexto Completo

O arquivo principal do servidor (`server/index.ts`) acumulava a lógica de criação do aplicativo Express e a inicialização do servidor HTTP, o que dificultava testes isolados das rotas e dos middlewares. Para resolver isso, realizamos uma separação clara de responsabilidades. Adicionalmente, as configurações de cache para o documento principal (`index.html`) foram reforçadas e aplicadas globalmente.

### Decisões Técnicas

1. **Desacoplamento do Express:** Extração da configuração do servidor para `server/app.ts` (função `createApp`), permitindo instanciar o Express de forma independente do servidor HTTP e facilitando a injeção do caminho dos arquivos estáticos (`staticPath`).
2. **Ambiente de Testes:** Inclusão de `server/app.test.ts` e criação do `vitest.server.config.ts` para viabilizar testes unitários e de integração focados no backend usando o ecossistema Vitest.
3. **Consistência de Headers de Cache:** Criação do helper `applyDocumentCacheHeaders` no `app.ts` para assegurar que o `index.html` sempre receba as diretivas de `Cache-Control: no-cache` e `Expires: 0`, mitigando bugs de deploy onde os usuários ficam retidos em versões cacheadas antigas do frontend SPA.
4. **Ponto de Restauração (Backup Seguro):** Deploy executado de forma proativa para garantir um cofre físico de segurança, pois o projeto passará por mudanças significativas a seguir.

---

## [v2.5.0] 13/05/2026 23:52:51

feat(tracking): integracao partytown, arquivos llms e ajustes Home

---
## [v2.5.1] 15/05/2026 22:18:38
refactor(ui, deploy): atualização de copy textual e injeção do hook de segurança pd-enforce

### Contexto Completo
Realizamos duas modificações essenciais neste ciclo:
1. A microcopy de observação no componente `ExerciseLibrarySection` foi ajustada para adotar um tom mais conversacional e chamativo ('ANTES DE COMEÇAR, OLHA SÓ'), melhorando a ressonância com o público-alvo do aplicativo.
2. Adicionamos o hook `"predeploy": "pd-enforce"` no `package.json`. Essa integração conecta o projeto diretamente com a nova camada de segurança global da skill perfect-deploy, prevenindo deploys acidentais.

### Decisões Técnicas
- A trava no script `predeploy` intercepta chamadas diretas (como `npm run deploy`), garantindo que toda subida para produção seja executada com `PD_ACTIVE=1` pelo script central `pd`. Isso obriga a passagem pelas rotinas imutáveis de backup local, verificação de qualidade e auditoria de changelog em todas as iterações futuras do projeto.

---

