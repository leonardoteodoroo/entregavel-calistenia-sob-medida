# Calistenia Sob Medida - MVP Web

App web mobile-first do pós-compra do desafio de 28 dias.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- React Router
- Vitest + Testing Library

## Rotas principais

- `/` splash/acesso
- `/welcome` boas-vindas
- `/perfil` confirmação de perfil
- `/ajustes` onboarding complementar
- `/plano-montado` explicação do plano
- `/app/*` área principal com abas `Hoje`, `Plano`, `Biblioteca`, `Progresso`, `Perfil`

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Guardrail de Design System

- As telas e componentes devem usar apenas tokens semânticos (definidos em `src/index.css`).
- O script `npm run lint` agora inclui `lint:design-system`, que bloqueia hardcoded colors em `src/**/*.tsx` e `src/**/*.css` (exceto `src/index.css`).
- Padrões bloqueados: hex (`#...`), `rgb/rgba/hsl/hsla(...)`, utilitários diretos como `text-white`, `bg-black`, `white/10`, `black/60`.

## Deploy

- Workflow em `.github/workflows/deploy-pages.yml`
- Publicação em branch `gh-pages`
- Domínio customizado em `public/CNAME`

## DNS manual

1. Criar registro `CNAME` no provedor DNS para:
   - `calistenia-sob-medida-28-dias.semprenamoda.com.br`
2. Apontar para o domínio de Pages do repositório (ex.: `<usuario>.github.io`).
3. No GitHub Pages, validar domínio personalizado e HTTPS.
