# Plano de implementação — Evolução da montagem personalizada das refeições

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: usar `subagent-driven-development` (recomendado) ou `executing-plans`; acompanhar os passos com checkboxes.

**Objetivo:** substituir a troca pontual exposta nos cards por um modal de montagem por refeição, cobrindo `café`, `almoço`, `lanche` e `jantar`, mantendo `Mapa de trocas` global interativo e a lista de compras derivada da composição final confirmada.

**Arquitetura:** manter `activeVariantByMeal` e `selectedSubstitutionsByMeal` como fonte de verdade persistida; enriquecer `MealSubstitution` com metadados de montagem para o modal; introduzir um rascunho local por refeição para que fechar/cancelar o modal não altere o estado salvo. O mapa global continua aplicando trocas diretamente no estado persistido, e o modal confirma a mesma estrutura no fechamento.

**Stack:** React 19, TypeScript, Vitest, Radix Dialog, Vite, `localStorage`

---

## Estrutura de arquivos

- Modificar: `client/src/lib/mealPlanData.ts` para enriquecer `MealSubstitution` com metadados de grupo do modal e adicionar o modelo híbrido do `lanche`.
- Criar: `client/src/lib/mealPlannerCustomization.ts` para concentrar `MealCustomizationDraft`, helpers de rascunho, resumo e commit.
- Modificar: `client/src/lib/mealPlannerState.ts` para melhorar rótulos/resumos de composições salvas sem mudar o formato persistido.
- Criar: `client/src/components/meal-planner/MealCustomizationDialog.tsx` para o fluxo centralizado de montagem.
- Modificar: `client/src/pages/MealPlanPage.tsx` para limpar o card, abrir o modal e manter o mapa global sincronizado.
- Criar/modificar testes em `client/src/lib/mealPlannerCustomization.test.ts`, `client/src/lib/mealPlannerState.test.ts`, `client/src/components/meal-planner/MealCustomizationDialog.test.tsx` e `client/src/pages/MealPlanPage.test.tsx`.

## Mudanças de interface e tipos

- Estender `MealSubstitution` para incluir `groupLabel`, `modalDescription` e `swapMapLabel`; o card/modal usa `groupLabel`, o mapa global continua usando `swapMapLabel`.
- Adicionar `MealCustomizationDraft` com `mealKey`, `activeVariantId` e `selectedOptions`.
- Adicionar helpers públicos: `createMealCustomizationDraft`, `applyDraftVariant`, `applyDraftSelection`, `commitMealCustomizationDraft`, `getMealCustomizationViewModel`.
- Manter `selectedSubstitutionsByMeal` como `Record<mealKey, Record<slotId, optionId>>`; não haverá migração nem bump de versão nesta entrega.
- Ajustar o resumo salvo de favoritos para: `Base` quando não houver trocas, `Base com <item>` quando houver 1 troca, `Base com N ajustes` quando houver 2+ trocas.

## Tarefas

### Tarefa 1: Enriquecer a modelagem e cobrir o lanche híbrido

**Arquivos:** `client/src/lib/mealPlanData.ts`, `client/src/lib/mealPlannerState.ts`, `client/src/lib/mealPlannerState.test.ts`

- [ ] Escrever testes vermelhos para validar `lanche` com trocas híbridas, resumo `Base com N ajustes` e permanência da lista de compras baseada em `getResolvedMealSelection`.
- [ ] Adicionar metadados de grupo nas trocas já existentes de `café`, `almoço` e `jantar`.
- [ ] Adicionar trocas híbridas do `lanche` com estes slots exatos:
  - `lanche-base-cremosa`: de `Iogurte natural desnatado` para `Iogurte zero lactose` e `Leite de amêndoa`
  - `lanche-fruta`: de `Pera` para `Abacaxi`, `Morango` e `Banana prata`
  - `lanche-carbo`: de `Aveia` para `Farelo de aveia`
  - `lanche-complemento`: de `Semente de chia` para `Cacau em pó`
- [ ] Manter `lanche-sem-gluten` e `lanche-atalho-pratico` como variantes prontas, sem quebrá-las em grupos.
- [ ] Rodar `npx vitest run client/src/lib/mealPlannerState.test.ts`.
- [ ] Commit: `feat: modela montagem estruturada das refeições`.

### Tarefa 2: Criar o motor de rascunho do modal

**Arquivos:** `client/src/lib/mealPlannerCustomization.ts`, `client/src/lib/mealPlannerCustomization.test.ts`

- [ ] Escrever testes vermelhos para:
  - abrir um rascunho a partir do estado salvo
  - alternar entre `base` e variantes dentro do rascunho
  - aplicar trocas no rascunho sem tocar o estado persistido
  - confirmar o rascunho e atualizar só a refeição-alvo
  - descartar o rascunho e preservar o estado anterior
- [ ] Implementar `MealCustomizationDraft` e os helpers públicos.
- [ ] Fazer o view-model do modal separar:
  - `currentSummary`
  - `variantChoices`
  - `editableGroups`
  - `fixedItems`
- [ ] Rodar `npx vitest run client/src/lib/mealPlannerCustomization.test.ts client/src/lib/mealPlannerState.test.ts`.
- [ ] Commit: `feat: adiciona rascunho de personalização por refeição`.

### Tarefa 3: Construir o modal e limpar o card da refeição

**Arquivos:** `client/src/components/meal-planner/MealCustomizationDialog.tsx`, `client/src/components/meal-planner/MealCustomizationDialog.test.tsx`, `client/src/pages/MealPlanPage.tsx`, `client/src/pages/MealPlanPage.test.tsx`

- [ ] Escrever testes vermelhos para garantir que o card deixa de renderizar `Escolha uma base ou uma versão pronta`, `Toque em uma opção para trocar na hora` e `Troque ...` inline.
- [ ] Adicionar no card o CTA principal com o texto exato `Selecione aqui os itens para montar seu prato`.
- [ ] Implementar `MealCustomizationDialog` com `Dialog` e estas áreas fixas:
  - cabeçalho com nome da refeição, subtítulo e resumo atual
  - seção `Versão da refeição` com `Base do plano` + variantes prontas
  - seção `Monte seu prato` visível apenas em `base`
  - seção `Mantidos automaticamente` com itens fixos fora das trocas
  - rodapé com `Cancelar` e `Salvar refeição`
- [ ] Garantir que o modal do `lanche` mostre os grupos híbridos acima e mantenha as variantes prontas acessíveis no mesmo fluxo.
- [ ] Rodar `npx vitest run client/src/components/meal-planner/MealCustomizationDialog.test.tsx client/src/pages/MealPlanPage.test.tsx`.
- [ ] Commit: `feat: centraliza a personalização das refeições em modal`.

### Tarefa 4: Integrar com a página, mapa global e regressões finais

**Arquivos:** `client/src/pages/MealPlanPage.tsx`, `client/src/pages/MealPlanPage.test.tsx`, `client/src/lib/mealPlannerState.test.ts`, `client/src/lib/mealPlannerCustomization.test.ts`

- [ ] Ligar o CTA do card ao estado local `openMealKey` + `MealCustomizationDraft`.
- [ ] Confirmar o modal aplicando apenas `activeVariantByMeal[mealKey]` e `selectedSubstitutionsByMeal[mealKey]` no `plannerState`.
- [ ] Manter o `Mapa de trocas` global interativo, agora incluindo `lanche`, usando o mesmo `selectedSubstitutionsByMeal`.
- [ ] Atualizar `O que vale hoje`, favoritos e `buildWeeklyShoppingGroups` para refletirem a composição confirmada sem mudanças adicionais de storage.
- [ ] Rodar `npx vitest run client/src/lib/mealPlannerState.test.ts client/src/lib/mealPlannerCustomization.test.ts client/src/components/meal-planner/MealCustomizationDialog.test.tsx client/src/pages/MealPlanPage.test.tsx`.
- [ ] Rodar `npm run check`.
- [ ] Commit: `feat: sincroniza modal, mapa global e lista de compras`.

## Testes e cenários de aceite

- Card limpo: cada refeição principal mostra status, resumo, CTA de personalização, salvar e marcar como feita, sem blocos de troca expostos.
- Modal: abrir uma refeição carrega o estado atual; cancelar não persiste; salvar persiste e reabre com as escolhas já selecionadas.
- Café, almoço e jantar: trocar itens no modal altera `O que vale hoje`, favoritos e lista semanal.
- Lanche: o modal mostra grupos híbridos e continua oferecendo `Sem glúten` e `Atalho prático` como variantes prontas.
- Mapa global: continua clicável, agora também para `lanche`, e segue forçando a refeição para `base` quando uma troca é aplicada.
- Lista de compras: deriva sempre da composição final válida, nunca do plano base bruto.
- Regressão: `favoritas`, `pendentes`, hidratação, histórico e checklist semanal permanecem sem alteração comportamental.

## Assunções e defaults

- O `Mapa de trocas / Consulta ampliada` continua na tela principal e segue interativo; o modal vira o fluxo principal do card, não o único ponto de ação do módulo.
- O `lanche` entra em modelo híbrido nesta entrega; catálogo ampliado completo para ele fica fora deste corte.
- O formato persistido atual é suficiente; esta entrega não altera `MEAL_PLANNER_STORAGE_VERSION`.
- O modal confirma uma refeição por vez; não haverá “salvar tudo” nem edição em lote.
- Grupos com múltipla escolha ficam previstos pelo metadado, mas a configuração ativa desta entrega usa somente seleção única.
