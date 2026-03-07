# QA Checklist MVP - Calistenia Sob Medida

## Fluxo principal
- [ ] Entrar no app em `/`
- [ ] Concluir onboarding (welcome -> perfil -> ajustes -> plano montado)
- [ ] Acessar `Hoje` e iniciar treino
- [ ] Concluir treino e registrar feedback
- [ ] Ver progresso atualizado em `Progresso`
- [ ] Abrir `Biblioteca` e consultar detalhe de exercício
- [ ] Abrir `Assistente` e validar resposta por intenção
- [ ] Voltar para `Plano` sem perder estado

## Qualidade técnica
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`

## Publicação e domínio
- [ ] Workflow `Deploy to GitHub Pages` executa com sucesso
- [ ] Branch `gh-pages` atualizada com `dist`
- [ ] Arquivo `CNAME` presente no artefato publicado
- [ ] DNS com registro `CNAME` para `calistenia-sob-medida-28-dias.semprenamoda.com.br`
- [ ] HTTPS ativo no GitHub Pages
