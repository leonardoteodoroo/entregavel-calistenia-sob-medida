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

## Deploy
- Workflow em `.github/workflows/deploy-pages.yml`
- Publicação em branch `gh-pages`
- Domínio customizado em `public/CNAME`

## DNS manual
1. Criar registro `CNAME` no provedor DNS para:
   - `calistenia-sob-medida-28-dias.semprenamoda.com.br`
2. Apontar para o domínio de Pages do repositório (ex.: `<usuario>.github.io`).
3. No GitHub Pages, validar domínio personalizado e HTTPS.
