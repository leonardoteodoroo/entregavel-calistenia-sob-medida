# Veo 2 Fast no Flow: Compatibilidade dos Prompts de Exercícios 16:9

## Objetivo

Verificar, com base em fontes oficiais atuais consultadas em `8 de março de 2026`, se os prompts criados em `shared/prompts/exercise-video-prompts-16x9-veo3.md` servem para `Veo 2 - Fast` no `Google Flow`, e definir a melhor forma de pedir um exercício completo de `1 a 8 segundos`, com prioridade máxima para `execução total do movimento`.

## Resposta curta

Sim, o prompt que criamos `serve como base` para `Veo 2 - Fast`, principalmente porque ele já está em `inglês`, `16:9`, `uma cena`, `uma câmera`, `uma repetição`, e descreve `início, meio e fim`.

Mas ele `não está ideal como está` para `Veo 2 - Fast`.

O ajuste principal é este:

- manter a estrutura de câmera + sujeito + ambiente + ação em `8 segundos`
- `encurtar` o prompt um pouco
- `reduzir` negativos longos em formato `no ...`
- `não depender de Ingredients`, porque `Veo 2 - Fast` no Flow `não suporta Ingredients to Video`
- quando houver `Frames to Video`, preferir `First frame` ou `First + last frame` em `landscape`
- se usar `First frame`, o prompt deve falar `mais de movimento` e `menos de identidade`

## O que a documentação oficial diz em 2026

### 1. O suporte real do Veo 2 Fast no Flow

Na página `Learn about Flow models & supported features`, consultada em `8 de março de 2026`, o Google informa:

- `Veo 2 - Fast` suporta `Text to Video` em `landscape only`
- `Veo 2 - Fast` suporta `Frames to Video: First` em `landscape only`
- `Veo 2 - Fast` suporta `Frames to Video: First + last` em `landscape only`
- `Veo 2 - Fast` suporta `Camera Control` em `landscape only`
- `Veo 2 - Fast` suporta `Extend` em `landscape only`
- `Veo 2 - Fast` `não` suporta `Ingredients to Video`

Conclusão prática:

- o seu uso em `16:9` está alinhado com o modelo
- a percepção de que ele `não aceita referências` está `parcialmente correta`
- o que ele `não aceita` no Flow atual é `Ingredients to Video`
- mas `frames` continuam sendo suportados em `landscape`

Nota de data:

- um blog oficial do Google de `25 de junho de 2025` descrevia `Ingredients to Video` como recurso de `Veo 2`
- a matriz atual do `Flow Help`, consultada em `8 de março de 2026`, mostra outro estado do produto
- para decisão prática hoje, a `fonte de verdade` deve ser a página atual de suporte do Flow

### 2. O que o Veo 2 suporta como modelo

Na documentação do `Veo 2` no Vertex AI, atualizada em `6 de março de 2026`, o Google informa:

- `Veo 2` trabalha com vídeos de `5 a 8 segundos`
- suporta `16:9` e `9:16`
- usa `prompts em inglês`
- suporta `text to video`
- suporta `image to video`
- suporta `reference image to video`
- o modelo está na linha estável `veo-2.0-generate-001`

Conclusão prática:

- os prompts devem continuar em `inglês`
- seu alvo de `8 segundos` está correto
- o foco em `uma repetição clara` combina com a janela oficial do modelo

### 3. Como o Google recomenda escrever prompts para Veo

Na página `Veo on Vertex AI video generation prompt guide`, atualizada em `5 de março de 2026`, o Google recomenda estruturar o prompt por componentes como:

- `subject`
- `action`
- `scene or context`
- `camera angles`
- `camera movements`
- `visual style`
- `temporal elements`

O mesmo guia também diz:

- você `não precisa usar todos os elementos em todo prompt`
- a estrutura certa ajuda o modelo a obedecer melhor
- negativos existem, mas o Google recomenda evitar linguagem muito instrutiva com `no` ou `don't`

Conclusão prática:

- nosso prompt atual está `bem alinhado` na parte estrutural
- ele está `menos alinhado` na parte de negativos, porque usa muitos blocos do tipo `no text, no subtitle, no captions...`

### 4. Boas práticas para vídeo curto

Na página `Best practices for Veo on Vertex AI`, atualizada em `5 de março de 2026`, o Google recomenda:

- usar prompts `claros e específicos`
- `evitar quotation marks`
- para vídeos curtos, focar em `um único momento`
- separar cenas em clipes distintos em vez de tentar fazer vários eventos no mesmo prompt

Conclusão prática para exercício:

- `um exercício por clipe`
- `uma repetição por clipe`
- `uma câmera por clipe`
- `um ambiente por clipe`
- `um começo, um meio e um fim`

### 5. Prompt rewriter do Veo 2

Na página `Turn off Veo on Vertex AI's prompt rewriter`, atualizada em `5 de março de 2026`, o Google informa:

- o `prompt rewriter` do Veo 2 fica `ativado por padrão`
- esse rewriter pode adicionar descrição de vídeo e câmera
- vídeos tendem a ficar `melhores` com prompt enhancement ligado
- a observação de `menos de 30 palavras` se refere à `entrega do prompt reescrito na resposta da API`, não a uma regra pública dizendo que o prompt ideal do Veo 2 precisa ser ultracurto

Conclusão prática:

- `não há fonte oficial dizendo que Veo 2 Fast exige prompt muito curto`
- a leitura mais segura é: `prompt claro, detalhado, mas sem excesso`

### 6. Áudio

Na página de `Flow models & supported features`, o recurso de `Audio Generation` aparece como experimental e `somente no Veo 3.1`.

Conclusão prática:

- para `Veo 2 - Fast`, você `não precisa gastar prompt` falando de silêncio
- é melhor `simplesmente não mencionar áudio`

## Diagnóstico do nosso prompt atual

Arquivo analisado:

- `shared/prompts/exercise-video-prompts-16x9-veo3.md`

### O que já funciona bem para Veo 2 Fast

- prompts em `inglês`
- todos em `16:9`
- todos com `uma cena`
- todos com `uma câmera`
- todos focados em `uma repetição`
- todos descrevem `movement over 8 seconds`
- todos mantêm `personagem + roupa + ambiente` consistentes no próprio texto
- todos usam `full-body` e câmera estável na maior parte dos casos

Isso significa que o arquivo atual `não precisa ser descartado`.

### O que eu mudaria para Veo 2 Fast

#### 1. Menos negativos longos

Hoje muitos prompts terminam com listas longas como:

- `no text`
- `no subtitle`
- `no captions`
- `no watermark`
- `no logo`
- `no extra people`
- vários outros `no ...`

Isso entra em conflito com a recomendação oficial de evitar linguagem negativa muito instrutiva.

Melhor para `Veo 2 - Fast`:

- manter só os negativos mais críticos
- preferir uma cauda curta, por exemplo:
  - `text overlay, subtitles, captions, watermark, logo, extra people, camera shake, wide-angle distortion`

#### 2. Menos peso em estética secundária

Para exercício, o objetivo não é imagem glamourosa, mas `legibilidade do gesto`.

Então, em `Veo 2 - Fast`, eu reduziria:

- adjetivos estéticos redundantes
- floreio de estilo
- listas muito longas de exclusões

E manteria:

- câmera
- enquadramento
- sujeito
- ambiente
- trajetória do movimento
- checkpoints biomecânicos

#### 3. Se usar frame, mudar a lógica do prompt

A recomendação oficial para `image-to-video` é:

- usar uma imagem inicial forte
- o prompt deve falar `mais de movimento`
- e `não recontar toda a imagem`

Ou seja:

- `Text to Video`: repetir personagem, roupa, ambiente e ação
- `Frames to Video`: falar quase só de ação, ritmo, câmera e biomecânica

## Recomendação operacional para exercício completo em Veo 2 Fast

## Modo 1: Text to Video puro

Use quando:

- você quer testar rápido
- não vai usar frame inicial
- aceita consistência média de personagem, mas quer prioridade total para o movimento

Estratégia:

- prompt `médio`
- `uma repetição`
- `uma câmera fixa`
- `início -> transição -> fim`
- ambiente simples e estável
- poucos negativos

## Modo 2: Frames to Video com First frame

Use quando:

- o movimento é mais importante que a identidade
- você quer estabilizar pose inicial
- o modelo está desviando do exercício

Estratégia:

- gerar uma imagem inicial limpa
- usar `Frames to Video: First`
- no prompt, focar em:
  - direção do movimento
  - ritmo
  - alinhamento corporal
  - o que precisa ficar visível

Esta é a melhor estratégia oficial disponível hoje para o seu caso quando `Ingredients` não estão disponíveis.

## Modo 3: Frames to Video com First + last frame

Use quando:

- a pose final do exercício é crítica
- o modelo está errando o fim do gesto
- você precisa forçar começo e fim de forma mais rígida

Estratégia:

- definir frame inicial
- definir frame final
- usar prompt curto para descrever apenas a transição entre eles

Para exercícios, isso é especialmente útil em:

- `agachamento assistido`
- `agachamento parcial`
- `bird dog`
- `dead bug`
- `ponte de glúteos`
- `push-up inclinada`
- `wall push-up`

## Minha conclusão sobre o comprimento ideal do prompt

### Fato oficial

O Google:

- recomenda prompts `detalhados`
- recomenda prompts `claros e específicos`
- não publicou, nas fontes consultadas, uma regra oficial dizendo que `Veo 2 Fast` funciona melhor com prompt `curto`, `médio` ou `longo`

### Inferência prática

Para o seu caso, o melhor equilíbrio não é `curto demais` nem `grande demais`.

O melhor ponto parece ser:

- `prompt médio`
- com ordem forte
- com foco na `trajetória do movimento`
- sem muitas camadas negativas
- sem tentar descrever tudo que não importa

Em outras palavras:

- `Veo 2 Fast` não pede prompt mini
- mas também não ganha nada com prompt inchado

## Template recomendado para Veo 2 Fast: Text to Video

```text
16:9 horizontal video, full-body static shot, natural lens, stable camera, level horizon.

Adult Brazilian woman around 35, dark brown low ponytail, teal sports bra, charcoal high-waist leggings, white training sneakers, minimal home workout corner, neutral wall, light wood floor, soft daylight from the left.

One slow controlled repetition of [EXERCISE NAME].

Movement over 8 seconds: begin in [START POSITION]; then [MID TRANSITION]; finish in [END POSITION].

Keep [KEY BODY PARTS / SUPPORT OBJECTS] clearly visible throughout the clip. The movement must read as a clean beginner-friendly exercise demonstration with clear biomechanics and no extra scene changes.

text overlay, subtitles, captions, watermark, logo, extra people, camera shake, wide-angle distortion
```

## Template recomendado para Veo 2 Fast: First frame

```text
16:9 horizontal video, full-body static shot, natural lens, stable camera.

The woman performs one slow controlled repetition of [EXERCISE NAME] over 8 seconds. Begin from the provided first frame, then [MID TRANSITION], and finish in [END POSITION].

Keep [KEY BODY PARTS / SUPPORT OBJECTS] clearly visible. Preserve the same environment, outfit, framing, lighting, and body scale from the first frame. Clean biomechanical movement, one scene, one camera, one repetition.

text overlay, subtitles, captions, watermark, logo, extra people, camera shake, wide-angle distortion
```

## Template recomendado para Veo 2 Fast: First + last frame

```text
16:9 horizontal video, full-body static shot, natural lens, stable camera.

Using the provided first and last frames, generate one slow controlled repetition of [EXERCISE NAME] across 8 seconds. Create a smooth, realistic transition from the start pose to the final pose, with a clear middle phase and consistent full-body biomechanics.

Keep [KEY BODY PARTS / SUPPORT OBJECTS] clearly visible. Preserve the same environment, outfit, framing, lighting, and body scale across the full clip. One scene, one camera, one repetition.

text overlay, subtitles, captions, watermark, logo, extra people, camera shake, wide-angle distortion
```

## Exemplo de adaptação prática

### Exemplo: Agachamento assistido no Veo 2 Fast

### Versão recomendada para Text to Video

```text
16:9 horizontal video, full-body static shot, slight 3/4 lateral view at hip-to-waist height, natural lens, stable camera, level horizon.

Adult Brazilian woman around 35, dark brown low ponytail, teal sports bra, charcoal high-waist leggings, white training sneakers, minimal home workout corner, neutral wall, light wood floor, soft daylight from the left.

One slow controlled repetition of assisted squat using a simple dining chair for light balance only.

Movement over 8 seconds: begin standing upright with feet hip-width apart and both hands resting lightly on the top edge of the chair back; then move the hips backward first, soften the knees, and let the torso incline slightly while keeping the heels grounded; finish in a comfortable supported squat depth with the chair centered in front of the body, chest open, knees aligned with the feet.

Keep the chair back, both hands, feet, knees, hips, and spine clearly visible throughout the clip. Clear beginner-friendly biomechanics, one scene, one camera, one repetition.

text overlay, subtitles, captions, watermark, logo, extra people, camera shake, wide-angle distortion
```

### Versão recomendada para First frame

```text
16:9 horizontal video, full-body static shot, slight 3/4 lateral view at hip-to-waist height, natural lens, stable camera.

The woman performs one slow controlled assisted squat repetition over 8 seconds. Begin from the provided first frame, then move the hips backward first, soften the knees, and finish in a comfortable supported squat depth with the chair still used only for light balance.

Keep the chair back, both hands, feet, knees, hips, and spine clearly visible. Preserve the same environment, outfit, framing, lighting, and body scale from the first frame. Clean biomechanics, one scene, one camera, one repetition.

text overlay, subtitles, captions, watermark, logo, extra people, camera shake, wide-angle distortion
```

## Regras práticas para converter os 24 prompts atuais para Veo 2 Fast

1. Manter `16:9`, `full-body`, `stable camera`, `one repetition`, `movement over 8 seconds`.
2. Manter a descrição da personagem e do ambiente quando for `Text to Video`.
3. Cortar listas longas de exclusões e deixar só os artefatos mais prováveis.
4. Não mencionar áudio, fala, narração ou música.
5. Quando houver `First frame`, trocar a lógica para `motion-first`.
6. Quando o exercício tiver pose final crítica, testar `First + last frame`.
7. Não usar câmera dramática para exercícios; `static shot` é melhor que inventar cinema.

## Conclusão final

Em `8 de março de 2026`, a melhor leitura oficial é esta:

- `Veo 2 - Fast` é um bom candidato para os seus exercícios em `16:9`
- o arquivo atual `serve como base`
- mas o ideal é uma `versão enxugada e adaptada` para `Veo 2 - Fast`
- `Ingredients` não são o caminho nesse modelo no Flow atual
- `Frames` continuam sendo o melhor recurso de consistência disponível em `landscape`
- para o seu objetivo, eu priorizaria:
  - `First frame` quando o modelo errar a execução
  - `First + last frame` quando o fim do exercício for crítico
  - `Text to Video` puro para prototipar

Se eu fosse consolidar uma regra única:

- `Veo 2 Fast para exercício = prompt médio + câmera fixa + uma repetição + biomecânica explícita + poucos negativos + frame inicial quando necessário`

## Fontes oficiais

- Flow Help, `Learn about Flow models & supported features`, consultado em `2026-03-08`:
  - https://support.google.com/flow/answer/16352836?hl=en
- Flow Help, `Create videos in Flow`, consultado em `2026-03-08`:
  - https://support.google.com/flow/answer/16353334?hl=en
- Google Cloud, `Veo on Vertex AI video generation prompt guide`, `Last updated 2026-03-05 UTC`:
  - https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide
- Google Cloud, `Best practices for Veo on Vertex AI`, consultado em `2026-03-08`:
  - https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/best-practice
- Google Cloud, `Turn off Veo on Vertex AI's prompt rewriter`, `Last updated 2026-03-05 UTC`:
  - https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/turn-the-prompt-rewriter-off
- Google Cloud, `Veo 2`, `Last updated 2026-03-06 UTC`:
  - https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/2-0-generate
- Google Blog, `New ways to create and refine content in Flow`, `2026-02-25`:
  - https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates-february-2026
- Google Blog, `5 tips for getting started with Flow`, `2025-06-25`:
  - https://blog.google/innovation-and-ai/products/flow-video-tips
