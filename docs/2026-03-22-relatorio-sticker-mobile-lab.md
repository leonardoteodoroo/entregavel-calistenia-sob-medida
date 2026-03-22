# Relatorio - Como o sticker mobile do lab foi levado para o projeto principal

Data: 2026-03-22

## Objetivo

Este relatorio documenta como o sticker e a barra mobile do `lab` foram copiados para o projeto principal, quais problemas apareceram no caminho e como a implementacao final ficou.

O alvo era este comportamento:

- barra inferior mobile ocupando toda a largura
- sticker `Menu` flutuando acima da barra
- bolha ativa com movimento de mola
- ripple no toque
- icone e label do item ativo subindo como no `lab`
- sem drawer novo por enquanto

## Fonte visual

A referencia visual usada foi o proprio `lab`:

- `client/lab/src/App.tsx`
- `client/lab/src/index.css`

O objetivo nao foi reinterpretar o componente. Foi copiar a estrutura visual do `lab` e adaptar apenas o necessario para funcionar no app real.

## Estrategia de implementacao

### 1. Criar um componente compartilhado

Foi criado o componente:

- `client/src/components/navigation/MobileStickyNav.tsx`

Esse componente concentrou a UI e o comportamento da barra mobile.

Ele recebe apenas:

- `currentPath`
- `onNavigate`

Com isso, a mesma barra pode ser usada:

- no produto SPA
- nas paginas institucionais

### 2. Reusar a navegacao real do projeto

Em vez de duplicar rotas dentro do componente, a barra passou a usar:

- `stickyNavItems`
- `isMenuTriggerActive`

de:

- `client/src/content/navigation.ts`

Isso deixou a barra visualmente igual ao `lab`, mas conectada ao mapa de navegacao real do projeto.

### 3. Copiar os estilos criticos do lab

Os estilos globais necessarios foram levados para:

- `client/src/index.css`

Principalmente:

- `.mobile-sticky-nav-menu-trigger`
- `.mobile-sticky-nav-menu-trigger__icon`
- `@keyframes ripple-animation`
- `.ripple-span`
- `.mobile-sticky-nav-safe-area`

O miolo estrutural da barra permaneceu no JSX do componente. Isso evitou espalhar CSS demais e manteve a copia mais fiel.

### 4. Integrar nos layouts certos

Foram feitos dois encaixes:

- produto SPA: a barra passou a ser renderizada no shell do router em `client/src/App.tsx`
- institucional: a barra continuou sendo renderizada em `client/src/institutional/InstitutionalLayout.tsx`

O `Layout` do produto ficou responsavel apenas pelo conteudo da pagina, header mobile, sidebar desktop e footer.

## Problema que apareceu

Depois da primeira integracao, o efeito de mola aparecia apenas entre `Extras` e `Plano`.

Os outros itens pareciam trocar sem a mesma animacao.

## Causa raiz

A causa nao estava no CSS da mola.

A causa estava no ponto onde a barra tinha sido montada.

Na primeira versao, a sticky nav ficava dentro de:

- `client/src/components/Layout.tsx`

No produto, quase todas as paginas usam `Layout`, mas cada rota monta uma pagina diferente:

- `/semana/...` usa `WeekPage`
- `/biblioteca` usa `LibraryPage`
- `/checklist` usa `ChecklistPage`
- `/faq` usa `FaqPage`
- `/apoio` usa `ApoioPage`

Como cada troca desmontava a pagina atual, o `Layout` tambem era desmontado. Quando isso acontecia, a sticky nav era recriada do zero e perdia a continuidade da transicao.

So `Plano` e `Extras` pareciam manter a mola porque:

- `/` e `/bonus` usam o mesmo componente `Home`

Ou seja, nesses dois casos a instancia viva do componente era preservada por mais tempo.

## Solucao final

### 1. Mover a ownership da barra no produto

A barra foi removida de:

- `client/src/components/Layout.tsx`

e colocada em:

- `client/src/App.tsx`

Mais especificamente, no shell da SPA:

- `ProductMobileNavShell`

Esse shell fica montado ao lado do `Switch` do `wouter`. Assim, a sticky nav sobrevive a mudancas de rota dentro da SPA.

Resultado:

- a bolha ativa nao reinicia a cada navegacao
- a mola consegue interpolar entre os indices
- a animacao passa a aparecer tambem em `Treino`, `Biblioteca` e `Progresso`

### 2. Manter a navegacao institucional separada

As paginas institucionais continuam fora do router hash da SPA.

Por isso, no institucional a barra continua em:

- `client/src/institutional/InstitutionalLayout.tsx`

Nesse caso, `onNavigate` usa:

- `window.location.assign(toSpaHashPath(path))`

Isso permite sair da pagina institucional e abrir a rota correta do produto.

### 3. Garantir espaco para a barra

Foi adicionado um safe area helper:

- `.mobile-sticky-nav-safe-area`

Ele evita que conteudo e footer fiquem cobertos pela barra no mobile.

## Como o componente funciona

O fluxo final ficou assim:

1. `currentPath` entra no `MobileStickyNav`
2. `getStickyNavActiveIndex` descobre qual item esta ativo
3. a bolha SVG calcula o `translateX` com base nesse indice
4. o clique em um item cria o ripple com a geometria real do elemento clicado
5. `onNavigate` executa a navegacao real da tela
6. a barra permanece montada, entao a proxima rota reaproveita o mesmo componente e a mola anima corretamente

## Arquivos principais

Arquivos centrais da implementacao:

- `client/src/components/navigation/MobileStickyNav.tsx`
- `client/src/App.tsx`
- `client/src/components/Layout.tsx`
- `client/src/institutional/InstitutionalLayout.tsx`
- `client/src/index.css`

Arquivos de teste ligados a essa entrega:

- `client/src/components/navigation/MobileStickyNav.test.tsx`
- `client/src/components/Layout.test.tsx`
- `client/src/content/navigation.test.ts`

## Validacao

Foi feita validacao em tres camadas:

### Tipagem

- `npm run check`

### Testes

- `npx vitest run client/src/components/Layout.test.tsx client/src/components/navigation/MobileStickyNav.test.tsx client/src/content/navigation.test.ts client/src/pages/Home.test.tsx client/src/pages/ChecklistPage.test.tsx`

### Build

- `npm run build:pages`

## O que este relatorio deixa claro

O sticker nao passou a funcionar por causa de um ajuste visual isolado.

Ele passou a funcionar porque a ownership do componente foi colocada no lugar certo.

Resumo curto:

- copiar o visual do `lab` foi a parte facil
- conectar com a navegacao real foi a parte estrutural
- fazer a mola persistir exigiu mover a barra para fora do `Layout` e para dentro do shell do router

Esse foi o ponto que resolveu o comportamento incompleto da animacao.
