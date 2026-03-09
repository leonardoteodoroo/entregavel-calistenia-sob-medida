# Estudo Atualizado: Construção Ideal de Vídeo no Veo 3 para Flow

> Data de consolidação: 8 de março de 2026
>
> Escopo: `Google Flow / Gemini Pro`, uso prático sem API, com foco em `Veo 3 / Veo 3.1`
>
> Objetivo: descobrir a melhor construção para vídeos curtos de `8 segundos`, sem fala, sem música e sem legenda, priorizando `consistência visual`, `clareza de movimento`, `câmera`, `ambiente` e `encadeamento de clipes`

## Como ler este estudo

- `[Fato oficial]`: suportado diretamente por documentação oficial do Google.
- `[Inferência prática]`: conclusão operacional derivada de documentação oficial, ajustada ao caso de uso de exercícios.
- `[Fonte complementar]`: tática observada em material técnico recente de 2026, útil, mas não normativa.

## Resposta curta

- A melhor base para o seu caso, em março de 2026, é: `Flow + Veo 3.1`, com clipes de `8s`, câmera `quase estática`, `um único momento por clipe`, `um único exercício por clipe`, `um único ambiente`, `uma única identidade visual`.
- Para consistência forte, o melhor fluxo não é depender só de texto. O melhor fluxo é `Frames` e `Ingredients` sempre que a interface/modelo permitir.
- Para exercícios, `9:16` funciona bem em movimentos em pé com uma única pessoa centralizada. `16:9` costuma ser melhor para exercícios laterais, deslocamentos, parede, cadeira, solo e quadrúpede.
- Para reduzir risco de áudio, fala e legenda, o caminho mais seguro é `não pedir áudio`, `não usar aspas`, `não escrever diálogo`, `não induzir performance de fala`, e manter a cena como `demonstração puramente visual`.
- Para “vídeo longo”, o melhor resultado não vem de uma geração única complexa. Vem de `blocos de 8s`, reaproveitando `frames salvos`, `ingredients`, `end frames` e montagem no `Scenebuilder`.
- Para exercício, o melhor clipe quase nunca é o mais “cinematográfico”. É o mais `legível biomecanicamente`.

## 1. O que o ecossistema Google realmente oferece hoje

### 1.1 Estado atual relevante para Flow

- `[Fato oficial]` O Flow é o produto prático do Google para criação de clipes, cenas e histórias com consistência, usando modelos como `Veo 2` e `Veo 3.1`.
- `[Fato oficial]` Em `Flow`, você pode criar vídeo a partir de `texto`, `ingredients` e `frames`.
- `[Fato oficial]` O Help Center atual do Flow mostra suporte a `Veo 3.1 - Fast` e `Veo 3.1 - Quality`, mas os recursos mudam por modelo.
- `[Fato oficial]` O Flow avisa e pode trocar automaticamente para um modelo compatível quando você tenta usar um recurso que não existe no modelo ativo.

### 1.2 O que importa para consistência

- `[Fato oficial]` `Ingredients to Video` existe para reutilizar as mesmas imagens como referência consistente de personagem e objetos de um clipe para o outro.
- `[Fato oficial]` O Flow recomenda referências em fundo limpo ou segmentado e orienta que o texto complemente, e não contradiga, os insumos visuais.
- `[Fato oficial]` O Flow permite salvar um frame de um vídeo como imagem e reutilizá-lo depois como `ingredient`, `start frame` ou `end frame`.
- `[Fato oficial]` O `Scenebuilder` permite sequenciar clipes, reorganizar, aparar e pré-visualizar a sequência.

### 1.3 O que importa para câmera e edições

- `[Fato oficial]` O Flow tem modo de edição de câmera em clipes já gerados.
- `[Fato oficial]` A matriz atual de modelos do Flow lista `Camera Control` como indisponível em `Veo 3.1 Fast` e `Veo 3.1 Quality`.
- `[Inferência prática]` Isso sugere que, se você usar o controle dedicado de câmera no Flow, há risco de fallback para modelo compatível. Para consistência máxima em `Veo 3.1`, é melhor descrever a câmera no prompt e travar composição com `Frames`, em vez de depender do modo de câmera como pilar principal.

### 1.4 O que importa para áudio, fala e legendas

- `[Fato oficial]` O próprio Google classifica a geração de áudio no `Veo 3.1` como recurso experimental.
- `[Fato oficial]` O Help Center do Flow informa que `speech generation may incorrectly trigger on-screen subtitles`.
- `[Fato oficial]` A documentação de prompting do Google recomenda evitar aspas quando o objetivo é não induzir renderização de texto.
- `[Fato oficial]` A documentação oficial do Vertex indica que o `prompt rewriter` não pode ser desligado nos modelos `Veo 3` e `Veo 3.1`.
- `[Inferência prática]` Isso reforça a necessidade de escrever prompts já bem estruturados e específicos, porque o modelo pode expandir o texto automaticamente e você não terá um modo “raw prompt” equivalente ao do Veo 2.
- `[Inferência prática]` Para o seu caso, o melhor caminho é não tratar áudio como algo a ser “negado”, e sim como algo a ser simplesmente omitido do prompt.

## 2. O que de fato está disponível no Flow em março de 2026

### 2.1 Matriz prática de uso

| Necessidade | Melhor recurso no Flow | Situação oficial atual | Uso recomendado |
| --- | --- | --- | --- |
| Explorar uma ideia do zero | `Text to Video` | Disponível em `Veo 3.1 Fast` e `Quality` | Bom para primeira exploração, ruim como único método de consistência |
| Travar composição inicial | `Frames to Video` com first frame | Disponível em `Veo 3.1 Fast` e `Quality` | Excelente para exercícios e para câmera fixa |
| Travar início e fim do gesto | `Frames to Video` com first + last | Disponível em `Veo 3.1 Fast` e `Quality` | Muito útil para uma repetição legível em 8s |
| Preservar personagem/roupa/objeto | `Ingredients to Video` | Help atual aponta suporte em `Veo 3.1 Fast` | Melhor recurso de consistência visual em Flow quando disponível |
| Estender um clipe aprovado | `Extend` | Disponível no ecossistema atual; matriz do Flow indica restrição importante por modelo/ratio | Bom para continuar ação aprovada, não para reinventar a cena |
| Editar câmera depois | `Camera` | Existe no Flow, mas a matriz não lista suporte em Veo 3.1 | Usar com cautela; melhor tratar como secundário |

- `[Fato oficial]` Na matriz atual do Flow, `Frames to Video` com `first` e com `first + last` aparecem em `Veo 3.1 Fast` e `Veo 3.1 Quality`, ambos com `16:9` e `9:16`.
- `[Fato oficial]` Na mesma matriz, `Ingredients to Video` aparece em `Veo 3.1 Fast` e não aparece em `Veo 3.1 Quality`.
- `[Fato oficial]` Na mesma matriz, `Extend` aparece com recorte `landscape only` para os modelos `Veo 3.1`.
- `[Inferência prática]` Se o seu objetivo é biblioteca vertical `9:16` com forte consistência, `Frames` e `Ingredients` tendem a ser pilares mais estáveis do que `Extend`.

### 2.2 Diferença importante entre 2025 e 2026

- `[Fato oficial]` Em um post oficial do Google de 25 de junho de 2025, `Ingredients to Video`, `Jump To` e `Extend` ainda eram descritos em torno do fluxo de `Veo 2`, com promessa de levar capacidades ao `Veo 3`.
- `[Fato oficial]` O Help Center atual do Flow, acessado em 8 de março de 2026, já mostra `Veo 3.1` em produção e `Ingredients to Video` suportado no `Veo 3.1 Fast`.
- `[Inferência prática]` Isso significa que muita orientação de 2025 ainda ajuda conceitualmente, mas parte do material de creators mais antigo está desatualizada sobre disponibilidade real no Flow.

## 3. Melhor configuração base para clipes de 8 segundos

### 3.1 Configuração recomendada

| Item | Recomendação principal | Motivo |
| --- | --- | --- |
| Modelo | `Veo 3.1 Fast` para consistência operacional; `Veo 3.1 Quality` para versão final de clipe isolado | Fast tende a ser melhor para iteração e, no Flow atual, é o modelo associado a `Ingredients` |
| Duração | `8s` | É o melhor espaço para mostrar uma repetição completa sem correria |
| Quantidade de eventos | `1 cena, 1 exercício, 1 câmera` | Alinha com a recomendação oficial de focar vídeos curtos em um único momento |
| Movimento de câmera | `Estático` ou `mínimo` | Melhora legibilidade biomecânica e reduz drift |
| Lente percebida | `Natural`, sem wide agressivo | Evita distorção corporal |
| Ambiente | `Casa simples, limpa, neutra, sem clutter` | Facilita repetição e consistência |
| Luz | `Difusa, lateral suave, sempre igual` | Reduz mudança de aparência entre clipes |
| Ritmo | `1 repetição lenta e controlada` | O exercício precisa ser entendível, não “bonito” |

### 3.2 Modelo mais indicado por fase do trabalho

- `[Inferência prática]` Para o seu fluxo real:
  - `Exploração`: `Veo 3.1 Fast` com 2 a 4 saídas por rodada, quando o custo permitir.
  - `Lock visual`: salvar frame do melhor clipe e migrar para `Frames` ou `Ingredients`.
  - `Final`: repetir a mesma construção no melhor modelo/qualidade disponível no seu Flow naquele momento.
- `[Inferência prática]` A consistência final vem mais de `insumos travados` do que de “resolução alta”.
- `[Fato oficial]` O Google documenta suporte a `720p` e `1080p` para Veo 3, com `4k` em contextos limitados de preview.
- `[Inferência prática]` Para Flow-first, trate `1080p` como bônus de acabamento, não como o fator principal de qualidade.

## 4. 9:16 ou 16:9 para treino

### 4.1 Quando usar 9:16

- `[Inferência prática]` Use `9:16` como padrão quando:
  - há `uma pessoa só`
  - o exercício é `em pé`
  - o movimento cabe no eixo vertical
  - o objetivo é leitura rápida em celular
  - não há deslocamento lateral grande
- `[Inferência prática]` Exemplos: marcha parada, elevação de joelhos leve, panturrilha, agachamento parcial, respiração, wall push-up frontal simples.

### 4.2 Quando usar 16:9

- `[Inferência prática]` Use `16:9` quando:
  - o exercício é `lateral`
  - existe `apoio` que precisa ficar inteiro no quadro
  - existe `deslocamento lateral`
  - o exercício é `no solo`
  - você precisa ver `mat + corpo + suporte` ao mesmo tempo
- `[Inferência prática]` Exemplos: avanço com apoio, agachamento assistido com cadeira, push-up inclinada, bird dog, dead bug, ponte de glúteos, prancha adaptada, step touch lateral.

### 4.3 Regra rápida

- `[Inferência prática]` Se o exercício perde legibilidade quando você fecha o enquadramento, use `16:9`.
- `[Inferência prática]` Se o exercício continua legível com a pessoa centralizada da cabeça aos pés, `9:16` pode ser o formato principal.

## 5. Fórmula de prompt recomendada para Flow

### 5.1 Fórmula oficial resumida

- `[Fato oficial]` O Google resume bons prompts para Veo como:
  - `Cinematography`
  - `Subject`
  - `Action`
  - `Context`
  - `Style & Ambiance`

### 5.2 Fórmula adaptada para o seu caso

- `[Inferência prática]` Para exercícios no Flow, a ordem mais útil é:
  1. `Shot and framing`
  2. `Identity lock`
  3. `Exercise action`
  4. `Environment and support`
  5. `Lighting and realism`
  6. `Continuity lock`
  7. `Exclusions`

### 5.3 Leitura operacional da fórmula

- `Shot and framing`: tipo de plano, ângulo, altura da câmera, lente, estabilidade.
- `Identity lock`: mesma mulher, mesma faixa etária, mesma roupa, mesma aparência, mesma escala corporal.
- `Exercise action`: uma repetição específica, lenta, legível, com amplitude conservadora.
- `Environment and support`: sala doméstica simples, parede neutra, piso claro, cadeira ou parede quando aplicável.
- `Lighting and realism`: luz suave, fotorealismo, anatomia limpa, sem estética publicitária.
- `Continuity lock`: mesma câmera, mesmo cômodo, mesma distância, mesmo apoio, mesma luz.
- `Exclusions`: texto, watermark, crowd, performance vocal, microfone, subtitle, logo.

### 5.4 Observações complementares de 2026

- `[Fonte complementar]` O guia recente da LTX reforça uma prática que combina bem com o Flow: separar com clareza `camera`, `action` e `audio`, em vez de misturar tudo em uma frase longa.
- `[Fonte complementar]` O mesmo material também reforça que consistência entre tomadas melhora quando você repete `traços distintivos fixos` no texto, além de reutilizar referência visual.
- `[Inferência prática]` Para o seu caso, isso significa que um prompt de exercício tende a ficar melhor quando o bloco de câmera vem primeiro, o bloco de identidade vem inteiro e o bloco de ação vem limpo, sem floreio narrativo.

## 6. Estratégia “sem áudio, sem fala, sem música, sem legenda”

### 6.1 O que fazer

- `[Fato oficial]` O Google só gera áudio quando ele é orientado pelo prompt no fluxo de áudio experimental.
- `[Inferência prática]` Logo, o método mais seguro é:
  - não mencionar `audio`
  - não mencionar `music`
  - não mencionar `voiceover`
  - não mencionar `dialogue`
  - não mencionar `narration`
  - não mencionar `lyrics`
- `[Fato oficial]` A documentação do Google também recomenda evitar aspas quando não se quer induzir texto.
- `[Inferência prática]` Portanto, para o seu caso, evite aspas completamente.

### 6.2 O que descrever no lugar

- `[Inferência prática]` Em vez de escrever o que você não quer ouvir, descreva o que você quer ver:
  - `purely visual exercise demonstration`
  - `neutral facial expression`
  - `relaxed mouth`
  - `no direct address to camera` se a interface ou o prompt tolerar essa formulação
  - `focus on body mechanics and visible joint alignment`

### 6.3 Se aparecer legenda mesmo assim

- `[Fato oficial]` O Google reconhece que speech pode acionar subtitles de forma incorreta.
- `[Inferência prática]` Se isso acontecer:
  1. regenere a partir do mesmo frame ou ingredient
  2. simplifique o prompt
  3. remova qualquer pista de fala ou performance
  4. evite close facial dramático
  5. mantenha a boca neutra e a ação centrada no corpo

### 6.4 Bloco de exclusão sugerido

- `[Inferência prática]` Se a interface expuser campo de exclusão, use uma lista curta em forma de substantivos:

```text
subtitle, captions, on-screen text, dialogue, lyrics, singer performance, microphone, watermark, logo
```

- `[Inferência prática]` Se o Flow não expuser campo separado no seu plano/interface atual, deixe isso como cláusula final curta, sem exagerar:

```text
Purely visual exercise demonstration, neutral face, relaxed mouth, no direct address to camera.
```

## 7. Regras de consistência que não podem mudar

### 7.1 Lock universal

- `[Inferência prática]` Em todos os clipes da mesma sequência, não mude:
  - identidade corporal
  - faixa etária aparente
  - cabelo
  - roupa
  - tênis
  - ambiente
  - direção de luz
  - apoio
  - altura da câmera
  - distância da câmera
  - lente percebida
  - velocidade do gesto

### 7.2 Lock do projeto atual

- `[Inferência prática]` O seu projeto já tem um bom lock visual em [character-base-prompts.md](../../shared/prompts/character-base-prompts.md).
- `[Inferência prática]` O seu projeto também já tem uma lógica refinada de câmera e biomecânica em [exercise-complete-prompts.md](../../shared/prompts/exercise-complete-prompts.md).
- `[Inferência prática]` Para Veo, o ideal não é reinventar tudo. É transpor para vídeo:
  - o mesmo personagem
  - o mesmo cômodo
  - a mesma luz
  - os mesmos apoios
  - a mesma lógica de “o que precisa ficar visível”

### 7.3 Regra mais importante

- `[Inferência prática]` Em vídeo de exercício, consistência não é só rosto igual. É:
  - câmera igual
  - chão igual
  - objeto igual
  - distância igual
  - amplitude do gesto igual

### 7.4 Tática complementar útil

- `[Fonte complementar]` Materiais técnicos recentes de 2026, como o guia da LTX, sugerem um fluxo simples e forte para consistência: gerar um `establishing shot`, salvar esse resultado como referência e repetir as mesmas características distintivas do sujeito em todos os prompts seguintes.
- `[Inferência prática]` Traduzindo isso para o seu projeto:
  - aprove o primeiro clipe ou frame “herói”
  - salve esse frame
  - use esse frame como referência da sequência
  - não reescreva a identidade a cada vez de um jeito novo

## 8. Quando usar Text, Frames, Ingredients ou Extend

### 8.1 Text to Video

- `[Fato oficial]` É o modo mais livre.
- `[Inferência prática]` Use para:
  - explorar o look geral
  - descobrir um bom ambiente
  - testar o enquadramento-base
- `[Inferência prática]` Não use como único método para biblioteca inteira de exercícios.

### 8.2 Frames to Video

- `[Fato oficial]` O Google recomenda que, em imagem-para-vídeo, o prompt foque mais em `motion` do que em redescrever a imagem.
- `[Inferência prática]` Para exercício, esse é um dos melhores modos.
- `[Inferência prática]` Use quando:
  - você já aprovou o frame inicial
  - quer travar câmera e ambiente
  - quer só animar o movimento

### 8.3 First + Last Frame

- `[Fato oficial]` O Google suporta first and last frame em Veo 3.1.
- `[Inferência prática]` Esse modo é excelente quando você sabe exatamente:
  - pose inicial
  - pose final
  - caminho desejado entre as duas
- `[Inferência prática]` Para exercício, esse é provavelmente o melhor modo para uma repetição didática em 8s.

### 8.4 Ingredients to Video

- `[Fato oficial]` O Flow e o Vertex documentam uso de até três imagens de referência para manter o sujeito consistente.
- `[Inferência prática]` Esse é o melhor modo quando a prioridade é:
  - mesma mulher
  - mesma roupa
  - mesmo apoio
  - mesma leitura de cena
- `[Inferência prática]` Se você puder escolher apenas um recurso para consistência entre vários exercícios, escolha `Ingredients`.

### 8.5 Extend

- `[Fato oficial]` O Flow permite estender clipes e o usuário descreve como a ação deve continuar.
- `[Fato oficial]` O Help Center também informa que clipes estendidos não aceitam certos outros modos de edição depois.
- `[Inferência prática]` Use `Extend` só depois que o clipe-base já estiver correto.
- `[Inferência prática]` Não use `Extend` para corrigir um clipe ruim. Use para prolongar um clipe bom.

## 9. Estratégia para “vídeo longo” a partir de blocos de 8s

### 9.1 O que não fazer

- `[Fato oficial]` O Google recomenda focar vídeos curtos em uma única cena.
- `[Inferência prática]` Então não peça, no mesmo clipe de 8s:
  - estabelecer o ambiente
  - mudar ângulo
  - demonstrar o exercício
  - voltar com outra câmera
  - fazer narrativa

### 9.2 O que fazer

- `[Inferência prática]` Fluxo recomendado:
  1. gerar ou escolher um `anchor frame`
  2. criar um clipe de `1 repetição`
  3. salvar frames bons
  4. usar o melhor frame como insumo do próximo clipe
  5. montar tudo no `Scenebuilder`

### 9.3 Padrão ideal de um clipe de exercício de 8s

- `[Inferência prática]` Estrutura sugerida:
  - `00:00-00:01`: pose clara de início
  - `00:01-00:06`: execução principal
  - `00:06-00:08`: finalização ou retorno legível

### 9.4 Padrão ideal de sequência mais longa

- `[Inferência prática]` Para um “vídeo longo” com muitos exercícios:
  - um clipe por exercício
  - mesma identidade visual
  - mesma linguagem de câmera
  - transições montadas, não geradas como mini-filme único
- `[Inferência prática]` Para um único exercício mais complexo:
  - clipe 1: repetição completa em ângulo principal
  - clipe 2: repetição ou continuação em mesmo ângulo
  - só depois, se necessário, um ângulo secundário

### 9.5 Timestamp prompting: usar ou não?

- `[Fato oficial]` O Google e fontes complementares mostram que timestamp prompting existe e pode criar mini-sequências dentro do clipe.
- `[Inferência prática]` Para o seu caso, isso não deve ser o padrão.
- `[Inferência prática]` Timestamp em exercício tende a:
  - reduzir legibilidade biomecânica
  - aumentar drift de câmera
  - transformar instrução em montagem
- `[Inferência prática]` Use timestamp só para teaser ou abertura, não para o clipe principal de demonstração.

## 10. Matriz de câmera por família de exercício

| Família | Ângulo principal | Altura da câmera | Formato preferido | Movimento | Recurso mais útil | Observação |
| --- | --- | --- | --- | --- | --- | --- |
| Em pé frontal | frontal leve ou 3/4 frontal | quadril a peito | `9:16` | estática | `Ingredients` ou `Text` | boa para simetria de braços e joelhos |
| Em pé lateral | lateral real ou 3/4 lateral | quadril ou cintura | `16:9` | estática | `Frames` | melhor para agachar, inclinar, avançar |
| Deslocamento lateral | aberto, leve 3/4 ou lateral | quadril | `16:9` | estática ampla | `Frames` ou `Text` | importante não cortar pés e trajeto |
| Apoio em parede/cadeira | 3/4 lateral | quadril a cintura | `16:9` | estática | `Ingredients` + `Frames` | apoio deve ficar totalmente visível |
| Solo supino | lateral alta ou 3/4 lateral levemente elevada | tronco médio | `16:9` | estática | `Frames` | mat, cabeça, quadril e pés precisam coexistir |
| Quadrúpede | 3/4 lateral | altura do tronco | `16:9` | estática | `Frames` ou `Ingredients` | precisa mostrar apoios e extensão ao mesmo tempo |

### 10.1 Leitura prática da matriz

- `[Inferência prática]` `9:16` é o formato default para exercícios verticais simples.
- `[Inferência prática]` `16:9` é o formato default para tudo que pede mais contexto espacial.
- `[Inferência prática]` Para quase todos os exercícios, `câmera parada` é melhor do que movimento bonito.
- `[Inferência prática]` Se o corpo inteiro ou o apoio não cabem sem parecer apertado, o ângulo ou o formato estão errados.

## 11. Regras específicas para exercícios

### 11.1 O que faz um vídeo de exercício parecer “certo”

- `[Inferência prática]` O exercício precisa ser entendido em 1 a 2 segundos.
- `[Inferência prática]` As articulações que definem a correção precisam aparecer.
- `[Inferência prática]` O apoio, quando existe, precisa ficar visível o tempo todo.
- `[Inferência prática]` A amplitude precisa ser conservadora e repetível.

### 11.2 O que faz parecer “errado”

- `[Inferência prática]`
  - câmera dinâmica demais
  - lente aberta demais
  - crop em pés, joelhos, mãos ou apoio
  - fundo bagunçado
  - mudança de roupa ou escala corporal
  - expressão facial performática de propaganda
  - mouth movement que parece fala
  - montagem de trailer em vez de demonstração

### 11.3 Regra biomecânica central

- `[Inferência prática]` Em exercício, clareza vence estilo. Se você tiver que escolher entre uma imagem “mais bonita” e uma execução “mais legível”, escolha a mais legível.

## 12. Templates finais para Flow

> Observação: os templates abaixo estão em inglês porque o restante dos prompts do projeto já opera melhor assim e porque o ecossistema de prompting do Veo costuma responder melhor com formulação cinematográfica em inglês.

### 12.1 Template mestre universal

```text
Full-body [shot type] shot, [camera angle], [camera height], natural lens, stable camera, level horizon.

The same adult Brazilian woman, around 35 years old, realistic athletic body, medium-light tan skin, dark brown eyes, dark brown hair tied in a low ponytail, calm neutral expression, teal sports bra, charcoal high-waist leggings, white training sneakers.

She performs one slow, controlled repetition of [exercise name], with clear body mechanics and readable joint alignment.

Environment: minimal home workout corner, neutral wall, light wood floor, clean domestic setting, no clutter, no gym aesthetic.

Lighting: soft diffused daylight from the left, low contrast, photorealistic, natural anatomy, realistic body proportions.

Continuity lock: same woman, same outfit, same room, same support object, same camera distance, same camera height, same lens feel.

Purely visual exercise demonstration, focused on movement clarity and consistency.

Exclusions: subtitle, captions, on-screen text, watermark, logo, crowd, microphone, singer performance, dramatic camera shake, wide-angle distortion.
```

### 12.2 Template curto para geração rápida

```text
Full-body static [angle] shot of the same adult Brazilian woman in a minimal home workout corner performing one slow controlled repetition of [exercise]. Natural lens, photorealistic, soft daylight from the left, same outfit, same room, same camera, purely visual movement demonstration, clear biomechanics, no on-screen text or subtitle.
```

### 12.3 Template para Text to Video

```text
Full-body static [shot type] shot, [angle], [height], natural lens.
The same adult Brazilian woman performs one slow controlled repetition of [exercise].
Environment: minimal home workout corner, neutral wall, light wood floor, clean domestic setting.
Lighting: soft diffused daylight from the left.
Photorealistic, realistic anatomy, clear joint alignment, readable movement, same woman identity across future clips.
Purely visual exercise demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, microphone, dramatic camera shake, wide-angle distortion.
```

### 12.4 Template para Frames to Video

```text
Animate the approved start frame into one slow controlled repetition of [exercise].
Keep the exact same woman, the exact same room, the exact same camera, the exact same support placement, and the exact same lighting.
Only the body movement changes.
Stable camera, natural lens, clear biomechanics, purely visual exercise demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, lip-sync, dramatic camera shake.
```

### 12.5 Template para First + Last Frame

```text
Create a smooth 8-second transition from the provided first frame to the provided last frame.
Keep the exact same woman, room, camera, support object, lighting, and body scale.
Show one slow controlled repetition of [exercise] between the two locked poses.
Stable camera, natural lens, photorealistic, clear joint alignment, purely visual exercise demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, lip-sync, dramatic camera shake.
```

### 12.6 Template para Ingredients to Video

```text
Using the provided subject images as the same character reference, create a full-body static [angle] shot of the same woman performing one slow controlled repetition of [exercise].
Minimal home workout corner, neutral wall, light wood floor, soft daylight from the left.
Keep the same identity, same outfit, same scale, same room feel, same support object placement, and same camera position.
Photorealistic, realistic anatomy, clear biomechanics, purely visual exercise demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, microphone, singer performance, dramatic camera shake.
```

### 12.7 Template adaptado ao projeto atual

```text
Full-body static [angle] shot, [camera height], natural lens.

The same Brazilian woman from the exercise project, around 35 years old, medium-light tan skin, oval face, dark brown almond eyes, dark brown hair tied in a low ponytail with a center part, realistic athletic body proportions, calm focused expression, teal sports bra, charcoal high-waist leggings, white training sneakers.

She performs one slow controlled repetition of [exercise name], beginner-friendly, conservative range of motion, clear and readable body mechanics.

Environment: minimal home workout corner, neutral wall, light wood floor, realistic domestic setting, no clutter, no gym atmosphere.

Lighting: soft diffused daylight from the left, natural color grading, photorealistic.

Continuity lock: same woman, same outfit, same room, same support object position, same camera, same body scale.

Purely visual exercise demonstration, focused on movement clarity.

Exclusions: subtitle, captions, on-screen text, watermark, logo, extra people, microphone, singer performance, dramatic camera shake, wide-angle body warping.
```

## 13. Receitas práticas por caso

### 13.1 Exercício em pé simples

```text
Full-body static 3/4 front shot at waist height, natural lens.
The same adult Brazilian woman performs one slow controlled repetition of standing knee raise.
Minimal home workout corner, neutral wall, light wood floor, soft daylight from the left.
Photorealistic, clear balance mechanics, feet and knees always visible, purely visual movement demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, microphone, dramatic camera shake.
```

### 13.2 Exercício com cadeira

```text
Full-body static 3/4 side shot at hip height, natural lens.
The same adult Brazilian woman performs one slow controlled repetition of assisted squat using a dining chair for light balance only.
Keep the chair fully visible, same support distance, same room, same lighting, same camera.
Photorealistic, clear heel grounding, clear hip-back squat mechanics, purely visual exercise demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, microphone, dramatic camera shake, wide-angle distortion.
```

### 13.3 Exercício no solo

```text
Full-body static elevated 3/4 side shot, natural lens.
The same adult Brazilian woman performs one slow controlled repetition of dead bug on an exercise mat.
Keep head, arms, pelvis, knees, feet, and mat clearly visible.
Minimal home workout corner, soft daylight from the left, photorealistic, clear core mechanics, purely visual exercise demonstration.
Exclusions: subtitle, captions, on-screen text, watermark, logo, microphone, dramatic camera shake.
```

## 14. Checklist operacional de geração

- Escolher se o clipe é `exploração`, `lock` ou `final`.
- Definir `9:16` ou `16:9` antes de escrever o prompt.
- Escolher entre `Text`, `Frames`, `First + Last` ou `Ingredients`.
- Fixar identidade, roupa, ambiente, luz e apoio.
- Escrever `um único exercício`, `uma única repetição`, `uma única câmera`.
- Remover qualquer menção a áudio, fala, música, narração, entrevista, apresentação.
- Evitar aspas.
- Gerar poucas variações por rodada e selecionar uma vencedora.
- Salvar frames bons imediatamente.
- Reusar frames e ingredients em vez de recomeçar do zero.

## 15. Checklist de revisão do resultado

- O exercício é entendível em até 2 segundos?
- Cabeça, tronco, quadris, joelhos e pés estão visíveis quando necessário?
- O apoio ficou inteiro no quadro quando existe?
- A câmera parece a mesma do clipe anterior?
- O ambiente continua o mesmo?
- A mulher continua a mesma?
- A roupa continua a mesma?
- A boca parece neutra, sem fala?
- Surgiu legenda, texto, watermark ou logo?
- A amplitude do exercício está conservadora e realista?

## 16. Respostas objetivas às perguntas principais

### Qual é a melhor estrutura de prompt no Flow para consistência?

- `[Resposta]` `Shot + identity lock + action + environment + lighting + continuity lock + exclusions`.

### Quando usar text, frames, ingredients ou extend?

- `[Resposta]`
  - `Text`: explorar.
  - `Frames`: travar composição.
  - `First + Last`: travar começo e fim da repetição.
  - `Ingredients`: travar personagem e objetos.
  - `Extend`: prolongar um clipe já bom.

### Como construir um exercício inteiro em blocos de 8s?

- `[Resposta]` Um exercício por clipe, uma repetição por clipe, reaproveitando frames e montando no `Scenebuilder`.

### Qual ângulo usar por família de exercício?

- `[Resposta]`
  - frontal simples: `9:16`
  - lateral: `16:9`
  - deslocamento lateral: `16:9`
  - apoio em parede/cadeira: `16:9`
  - solo supino: `16:9`
  - quadrúpede: `16:9`

### Como reduzir áudio, fala e legenda?

- `[Resposta]` Omitir áudio do prompt, evitar aspas, não pedir fala, manter face neutra, usar exclusões curtas se a interface permitir.

### Qual a diferença prática entre 9:16 e 16:9 para treino?

- `[Resposta]` `9:16` é melhor para corpo em pé e leitura mobile. `16:9` é melhor quando o exercício precisa de espaço lateral, apoio ou leitura do mat.

## 17. Conclusão operacional

- `[Inferência prática]` Para o seu caso real, a “melhor configuração” não é um único número mágico do Veo.
- `[Inferência prática]` É uma combinação de decisões:
  - `Veo 3.1`
  - `8s`
  - `1 cena`
  - `câmera parada`
  - `fotorealismo`
  - `ambiente doméstico neutro`
  - `Frames/Ingredients sempre que possível`
  - `sem qualquer linguagem de áudio`
  - `16:9 quando o exercício pede contexto`
  - `9:16 quando a ação cabe verticalmente`
- `[Inferência prática]` Para biblioteca de exercícios, o caminho mais forte hoje é:
  - aprovar um visual-base
  - salvar frames
  - migrar para `Frames` ou `Ingredients`
  - usar `Scenebuilder` para compor o material longo

## Fontes oficiais

- Google Flow Help. `Get started with Flow`. Acessado em 8 de março de 2026. https://support.google.com/flow/answer/16353333?hl=en
- Google Flow Help. `Create videos in Flow`. Acessado em 8 de março de 2026. https://support.google.com/flow/answer/16353334?hl=en
- Google Flow Help. `Learn about Flow models & supported features`. Acessado em 8 de março de 2026. https://support.google.com/flow/answer/16352836?hl=en
- Google Flow Help. `Edit videos & build scenes in Flow`. Acessado em 8 de março de 2026. https://support.google.com/flow/answer/16935718?hl=en&ref_topic=16908930
- Google DeepMind. `How to create effective prompts with Veo 3`. Acessado em 8 de março de 2026. https://deepmind.google/models/veo/prompt-guide
- Google Cloud Blog. `Ultimate prompting guide for Veo 3.1`. 16 de outubro de 2025. https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- Google Developers Blog. `Veo 3 and Veo 3 Fast – new pricing, new configurations and better resolution`. 8 de setembro de 2025. https://developers.googleblog.com/veo-3-and-veo-3-fast-new-pricing-new-configurations-and-better-resolution
- Google Blog. `5 tips for getting started with Flow`. 25 de junho de 2025. https://blog.google/innovation-and-ai/products/flow-video-tips
- Vertex AI docs. `Best practices for Veo on Vertex AI`. Consultado em 8 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/best-practice
- Vertex AI docs. `Veo on Vertex AI video generation prompt guide`. Última atualização visível: 5 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide
- Vertex AI docs. `Generate videos with Veo on Vertex AI from text prompts`. Última atualização visível: 5 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos-from-text
- Vertex AI docs. `Generate videos with Veo on Vertex AI from an image`. Última atualização visível: 5 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos-from-an-image
- Vertex AI docs. `Generate Veo videos from reference images`. Última atualização visível: 5 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/use-reference-images-to-guide-video-generation
- Vertex AI docs. `Generate videos with Veo on Vertex AI using first and last video frames`. Consultado em 8 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos-from-first-and-last-frames
- Vertex AI docs. `Use Veo to extend videos`. Consultado em 8 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/extend-a-veo-video
- Vertex AI docs. `Turn off Veo on Vertex AI's prompt rewriter`. Última atualização visível: 5 de março de 2026. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/turn-the-prompt-rewriter-off

## Fontes complementares de 2026

- LTX Studio. `Veo 3.1 Prompt Guide: Best Veo 3.1 Prompts`. 26 de fevereiro de 2026. https://ltx.studio/blog/veo-prompt-guide
- CineD. `Google Veo 3.1 Ingredients to Video Update Adds Native Vertical Format, 4K Upscaling, and Enhanced Character Consistency`. 19 de janeiro de 2026. https://www.cined.com/google-veo-3-1-ingredients-to-video-update-adds-native-vertical-format-4k-upscaling-and-enhanced-character-consistency/
