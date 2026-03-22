# Plano de Implementação: Navegação Dinâmica de Treino

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fazer com que o ícone "Treino" na barra de navegação inferior (mobile) redirecione para o próximo dia pendente no programa de 28 dias, em vez de abrir fixo na Semana 1.

**Architecture:** Implementar uma lógica centralizada para calcular o "Próximo Treino" com base no `localStorage` sob a chave `cf-checked-days`. O componente `MobileStickyNav` deve interceptar o clique no item "treino" e sobrescrever o caminho padrão com a rota dinâmica `/semana/{semana}/dia/{dia}`.

**Tech Stack:** React, Wouter, Lucide React, LocalStorage API.

---

### Task 1: Criar Hook ou Utilitário de Cálculo de Progresso

**Files:**

- Modify: `client/src/lib/weekMenuState.ts` (ou criar novo arquivo se for mais limpo)

**Step 1: Identificar a lógica de cálculo**
A lógica já existe em `ChecklistPage.tsx`. Vamos extraí-la para um utilitário reutilizável.

**Step 2: Implementar a função `getNextWorkoutPath`**

```typescript
export function getNextWorkoutPath(): string {
  try {
    const saved = localStorage.getItem("cf-checked-days");
    const checkedDays: number[] = saved ? JSON.parse(saved) : [];

    // Encontrar o primeiro dia (1-28) não concluído
    const firstMissing =
      Array.from({ length: 28 }, (_, i) => i + 1).find(
        d => !checkedDays.includes(d)
      ) || 1; // Padrão dia 1 se nada foi feito ou tudo concluído

    const week = Math.ceil(firstMissing / 7);
    return `/semana/${week}/dia/${firstMissing}`;
  } catch {
    return "/semana/1"; // Fallback seguro
  }
}
```

**Step 3: Testar manualmente no console do navegador**
Testar se a função retorna o caminho esperado injetando valores no `localStorage`.

### Task 2: Integrar Lógica Dinâmica no MobileStickyNav

**Files:**

- Modify: `client/src/components/navigation/MobileStickyNav.tsx`

**Step 1: Adicionar processamento dinâmico no `handleItemClick`**

Modificar para detectar se o item clicado é o "treino" e atualizar o caminho.

```tsx
// Dentro de MobileStickyNav.tsx
const handleItemClick = (
  event: ReactMouseEvent<HTMLLIElement>,
  index: number,
  path: string
) => {
  const item = stickyNavItems[index];
  let targetPath = path;

  if (item.key === "treino") {
    targetPath = getNextWorkoutPath();
  }

  // ... lógica de ripple e navegação existente usando targetPath
};
```

**Step 2: Ajustar detecção de ativo**
Verificar se o `isActive` em `navigation.ts` ainda funciona corretamente (ele usa `startsWith("/semana/")`, o que deve continuar válido).

### Task 3: Verificação e Validação

**Step 1: Cenário 1 - Novo Usuário**

- Limpar `localStorage`.
- Clicar em "Treino".
- Esperado: Ir para `/semana/1/dia/1`.

**Step 2: Cenário 2 - Usuário com progresso**

- Marcar Dia 1 no Checklist.
- Clicar em "Treino".
- Esperado: Ir para `/semana/1/dia/2`.

**Step 3: Cenário 3 - Transição de Semana**

- Marcar até o Dia 7.
- Clicar em "Treino".
- Esperado: Ir para `/semana/2/dia/8`.

**Step 4: Commit das alterações**

```bash
git add client/src/...
git commit -m "feat: make mobile training icon dynamic based on progress"
```
