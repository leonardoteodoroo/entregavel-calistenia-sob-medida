# Plano de Auditoria e Qualidade: Bônus 3 (365 Maneiras de Comer Ovo)

## Contexto e Objetivo

Garantir que todas as centenas de receitas geradas ou refinadas por IA a partir da nossa base de arquivos `.txt` sejam humanas, reais, plausíveis e obedeçam o tom de voz "Editorial Wellness Minimalista" (Sempre na Moda).

Como são muitas receitas (+300), a auditoria será feita em **lotes (batches) de 5 em 5 receitas**, permitindo um controle contínuo e a atualização deste documento em tempo real (Log de Auditoria).

## Critérios Rigorosos de Aceitação

Cada lote de 5 receitas passará pelo crivo das seguintes regras, e **NENHUMA** receita que falhar será aceita no aplicativo:

1. **Fundamento Prático (No Bullshit):** A receita faz sentido físico/químico na vida real? (Ex: Não existe "ovo cozido no palito" em 1 minuto num micro-ondas).
2. **Combate ao Textão de IA:** A premissa (`premise`), objeção (`objection`) e dica mestre (`masterTip`) não podem parecer geradas roboticamente. Zero palavras rebuscadas como "Nesta egrégia receita...", "No vasto universo culinário...". O texto deve ser de amiga para amiga, quente e acolhedor.
3. **Ingredientes Plausíveis e Saudáveis:** As substituições propostas nos ingredientes fazem sentido financeiro e regional no Brasil? Tudo está alinhado com a nossa pegada wellness/saudável?
4. **Adequação do Tempo e Porção:** Os tempos de preparo (prep/totalTime) são condizentes com os passos reais descritos?

## Fluxo de Execução

1. A IA extrai e formata 5 receitas brutas do `.json` guardado (processado pelo script `parseOvoRecipes.mjs`).
2. A IA preenche os metadados ricos (premise, objection, masterTip).
3. A IA **audita** logo após as 5 serem geradas.
4. Se passarem e soarem humanas, a IA preenche o **LOG EM TEMPO REAL** abaixo com as 5 aprovadas e escreve elas no `client/src/content/bonus/receitasOvoVolXX.ts`.
5. Se reprovarem ou soarem vazias, o log aponta o `[ERRO]`, a IA descarta e refaz, antes de continuar o trabalho.

---

# 📋 LOG DE AUDITORIA EM TEMPO REAL

Aqui documentaremos o progresso de 5 em 5 receitas.

### Lote Atual: Volume 01 (Receitas 001 a 010) - _Retroativo_

- **[APROVADO]** Receitas 001 a 005 `(Toast de Ovo com Requeijão, Ovo Pochê Perfeito, Ovo Enformado no Pão, Shakshuka Prática, Tomate Recheado com Ovo)`. Contexto palpável, tempo realista e objeções focadas em medos reais (ex: ovo vazar do pão).
- **[APROVADO]** Receitas 006 a 010 `(Pão com Ovo na Airfryer, Pão Cremoso, Ovo Frito Saudável na Água, Ninho de Ovo com Legumes, Crepioca Recheada)`. Truques de cozinha críveis (ex: água na panela para o ovo frito), nada "robótico".

### Lote Atual: Volume 02 (Lote 01: Receitas 011 a 015)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 011 a 015 `(Ovos em Nuvem com Bacon, Omelete de Berinjela Saudável, Nuvem Suprema de Presunto e Queijo, Toast Mexido Mais Cremoso do Mundo, Caldo Dourado de Ovos Vapt-Vupt)`. Objeções humanizadas desmistificando mitos como berinjela amarga e leite em pó doce. Ingredientes super aderentes à realidade brasileira.

### Lote Atual: Volume 02 (Lote 02: Receitas 016 a 020)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 016 a 020 `(Sopa Stracciatella da Vovó, Ninho Salgado de Batata com Ovo, Omelete Divina no Pão de Sal, Crepioca Dourada com Queijo Frescal, Salgadinho Elegante de Ovos e Milho)`. Tempos ajustados para a realidade de cada técnica (ex: assar a omelete inteira dentro do pão). Sem linguagem robótica.

### Lote Atual: Volume 03 (Lote 01: Receitas 021 a 025)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 021 a 025 `(Salada Levíssima Sem Maionese, Omelete Rústico de Bacon e Provolone, Maionese Secreta de Ovo Cozido, Omelete Divinal de Batata Frita, Muffin Mágico de Bacon com Casquinha)`. Foco total em soluções práticas e dicas mestres ricas. Explicações críveis sobre emulsão (maionese usando ovos cozidos funciona e foi bem fundamentada).

### Lote Atual: Volume 03 (Lote 02: Receitas 026 a 030)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 026 a 030 `(Ovos Mexidos Veludos com Alho-Poró, Salada Nuvem de Ovo Ralado, Ovos Marinheiros de Atum, Cestinha Assada de Pimentão e Ovos, Omelete Forçuda de Batata-Doce)`. Sem textos robóticos, e com pulos do gato sensatos (ex: como evitar que a abóbora/batata doce chore água na omelete).

### Lote Atual: Volume 04 (Lote 01: Receitas 031 a 035)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 031 a 035 (Arroz Frito com Ovo e Legumes, Caçarola Proteica de Batata-Doce, Empadão Indireto de Arroz, Fritada Leve de Chuchu, Omelete Suprema Assada). Linguagem revisada e fundamentada, sem jargões ou "robótismos", com soluções criativas para problemas do dia a dia.

### Lote Atual: Volume 04 (Lote 02: Receitas 036 a 040)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 036 a 040 (Salada Crocante com Rabanete, Omelete de Aveia e Linhaça, Maionese de Iogurte, Rocambole de Salmão, Farofa Molhadinha). Correção de estilo poético excessivo para o tom prático "Editorial Wellness" da marca Sempre na Moda. Totalmente prático e factível.

### Lote Atual: Volume 05 (Lote 01: Receitas 041 a 045)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 041 a 045 `(Wrap Ovo Dinâmico, Purê Proteico de Ovo, Salada Abacate e Ovo, Tapioca Recheada Fit, Omelete Infância Assada)`. Linguagem perfeitamente aderente, sem textos poéticos ou vazios. Omeletes e lanches rápidos e plausíveis.

### Lote Atual: Volume 05 (Lote 02: Receitas 046 a 050)

- **Status:** [APROVADO] Executado.
- **Log:** Receitas 046 a 050 `(Panqueca Flexível Sem Farinha, Pastelinhos Gratinados na Nuvem, Saladinha Divertida de Codorna, Fios Estrelados Nipo-Brasileira, Falso Pão de Alho de Forno)`. Foco na reinvenção de clássicos usando ovo como aglutinador. Dicas de textura cruciais para que o "Falso Pão de Alho" cresça no forno, tudo sem gerar expectativas falsas.

### Lote Atual: Volume 06 (Lote 01: Receitas 051 a 055)

- **Status:** Aguardando execução.
- **Log:** ...

### Lote Atual: Volume 06 (Lote 02: Receitas 056 a 060)

- **Status:** Aguardando execução.
- **Log:** ...

_(Este log crescerá continuamente até a Receita 365)_

- **Volume 06 (51-60)**: Reescrevemos tudo, consertamos repetições de palavras e passamos no TSC. Ovos no Caldo de Feijão, Carbonara Autêntico e Pizza de Batata foram ajustados. Removido 'Pulo do Gato' do objeto interno da receita.
- **Volume 07 (61-70)**: **[APROVADO]**. Omelete Vegetariana, Arroz Carreteiro e Lasanha Fria de Omelete. Ajustamos o texto da receita 70 (Cupcake de Bacon) que estava com linguagem exagerada. Auditoria garante tom prático e realista.
- **Volume 08 (71-80)**: **[APROVADO]**. Mantido tom prático, sem as notas poéticas confusas do TXT original. Incluído variações internacionais.
- **Volume 09 (81-90)**: **[APROVADO]**. Ovos recheados, opções termogênicas e Pizzovo integrados. Tom de voz consistente.
- **Volume 10 (91-100)**: **[APROVADO]**. Fechamento da primeira centena com Ovoíche, Panqueca doce e Frittata. Auditoria final ok.
