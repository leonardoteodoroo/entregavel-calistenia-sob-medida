# Playbook de Meta Ads — Calistenia Feminina em Casa

Atualizado em: 10 de março de 2026

Base usada:

- Referência estratégica local:
  - `docs/diretrizes_da_marca.md`
  - `calistenia-feminina-conteudo-entregavel.txt`
  - `DESIGN_SYSTEM.md`
- Validação externa atual:
  - Meta Help Center
  - Meta Business Help Center
  - Meta Ads Guide
  - Meta for Developers

## 1. Resumo executivo

Para esse produto, eu não montaria a conta em cima de uma “lista mágica de interesses”.

Motivo:

- A própria Meta informa que alguns `detailed targeting options` foram combinados, sumiram ou podem variar por conta, idioma e contexto.
- A Meta também removeu `detailed targeting exclusions` de novos conjuntos; a remoção passou a valer para campanhas ativas a partir de **31 de março de 2025**.
- A direção atual da plataforma favorece `broad targeting`, `Advantage+ audience`, `Custom Audiences` e `Lookalikes`.

Conclusão prática:

- Para esse produto, o setup mais confiável é:
  - `cold broad`
  - `cold broad por faixa etária`
  - `cold detailed targeting leve` apenas como teste complementar
  - `warm retargeting`
  - `lookalike`

Minha recomendação:

- Não abrir o criativo frio falando `R$ 19,90`.
- Testar preço apenas em:
  - remarketing
  - criativo de oferta
  - anúncio comparativo de valor

## 2. O que a Meta oficialmente suporta hoje

### 2.1 Públicos e targeting que seguem existindo

Validado em documentação oficial da Meta:

- `Age`
- `Gender`
- `Locations`
- `Languages`
- `Detailed targeting`
- `Custom Audiences`
- `Lookalike Audiences`
- `Advantage+ audience`
- `Advantage+ custom audience`
- `Advantage+ lookalike`
- `Advantage+ detailed targeting`
- `Advantage+ placements`

### 2.2 O que mudou e importa para você

Validado em documentação oficial:

- `Detailed targeting exclusions` foram removidos para novos ad sets e deixaram de valer em campanhas ativas a partir de **31 de março de 2025**.
- A Meta afirma que algumas opções de `detailed targeting` foram combinadas.
- A Meta afirma que alguns interesses e opções podem não aparecer em certos idiomas ou contas.
- A Meta recomenda considerar `broad targeting` quando quiser mais volume e mais espaço para otimização.

Implicação prática:

- Não baseie a estratégia inteira em interesses específicos.
- Use interesses só como camada de teste, nunca como pilar central da conta.

### 2.3 Observação importante sobre “interesses que de fato existem”

O que eu consigo validar de forma oficial na internet é:

- o tipo de targeting existe
- a categoria existe
- a Meta ainda suporta o mecanismo

O que eu não consigo garantir externamente sem entrar na sua conta:

- o nome exato de cada interesse disponível hoje no seu Ads Manager
- se um interesse está disponível no seu idioma da conta
- se um interesse aparece para esse objetivo específico

Isso não é limitação minha; a própria Meta documenta que esses itens variam.

Por isso, no plano abaixo eu separo:

- `públicos oficiais e estáveis`
- `sementes opcionais de busca de interesse`, para você usar só se aparecerem no seu Ads Manager

## 3. Estrutura de campanha recomendada para esse produto

### 3.1 Objetivo

Se você tem rastreamento minimamente confiável:

- usar `Sales`

Se você ainda não tem evento de compra bem alimentado:

- começar em `Sales`, mas monitorar se o volume é baixo demais
- em paralelo, se necessário, usar uma estrutura secundária com `Landing Page Views` ou etapa intermediária própria

### 3.2 Tipo de campanha

Para ticket baixo e produto simples:

- começar com teste de criativo e público em `ABO`
- depois mover vencedores para escala

### 3.3 Posicionamentos

Recomendação:

- `Advantage+ placements` ligado

Motivo:

- é a direção oficial atual da Meta
- reduz risco de você matar entrega no começo

### 3.4 Gênero

Recomendação inicial:

- `Women`

### 3.5 Localização

Recomendação inicial:

- `Brasil`

Se quiser abrir teste de qualidade:

- `Brasil` completo
- depois teste separado com capitais e regiões Sul/Sudeste se volume permitir

## 4. Faixas etárias que eu testaria

Base estratégica do produto:

- mulher em rotina real
- iniciantes e retomada
- pouca identificação com “fitness agressivo”
- promessa emocional de constância, energia, confiança e corpo menos travado

Faixas que eu priorizaria:

### Faixa principal

- `32–45`

Motivo:

- combina com o coração da proposta
- tende a bater melhor com dor real de rotina, cansaço, recomeço e falta de tempo

### Faixa secundária

- `36–49`

Motivo:

- muito alinhada com a persona descrita na estratégia da marca

### Faixa de expansão

- `46–54`

Motivo:

- pode responder bem ao ângulo de mobilidade, confiança, corpo ativo e treino possível

### Faixa que eu deixaria por último

- `25–31`

Motivo:

- pode comprar, mas tende a exigir criativo um pouco diferente
- costuma responder menos ao discurso de “retomada gentil” e mais a estética, praticidade e corpo

## 5. Públicos para testar

## 5.1 Público 1 — Cold Broad Core

- Nome: `BROAD_W_32_45_BR`
- Gênero: `Women`
- Idade: `32–45`
- Local: `Brasil`
- Advantage+ audience: `ligado`
- Detailed targeting: `vazio`

Uso:

- melhor ponto de partida

Por que testar:

- a Meta hoje favorece entrega ampla com mais sinais para otimização

## 5.2 Público 2 — Cold Broad Retomada

- Nome: `BROAD_W_36_49_BR`
- Gênero: `Women`
- Idade: `36–49`
- Local: `Brasil`
- Advantage+ audience: `ligado`
- Detailed targeting: `vazio`

Uso:

- público mais aderente à persona central

## 5.3 Público 3 — Cold Broad Expansão Madura

- Nome: `BROAD_W_46_54_BR`
- Gênero: `Women`
- Idade: `46–54`
- Local: `Brasil`
- Advantage+ audience: `ligado`
- Detailed targeting: `vazio`

Uso:

- expansão
- pode funcionar especialmente em criativo com ângulo de mobilidade, disposição e constância

## 5.4 Público 4 — Detailed Targeting Leve

- Nome: `DT_W_30_50_HOME_WELLNESS`
- Gênero: `Women`
- Idade: `30–50`
- Local: `Brasil`
- Advantage+ audience: `desligado no primeiro teste`
- Detailed targeting: `usar no máximo 1–3 temas por conjunto`

Sementes de busca para procurar dentro do Ads Manager:

- treino em casa
- exercícios em casa
- atividade física
- saúde e bem-estar
- pilates
- yoga
- perda de peso
- vida saudável
- condicionamento físico

Regra:

- use apenas o que realmente aparecer na sua conta
- não empilhe 7 ou 8 interesses no mesmo conjunto

Uso:

- teste complementar

## 5.5 Público 5 — Instagram Engagers

- Nome: `CA_IG_ENGAGERS_365D`
- Fonte: `Instagram account custom audience`
- Janela: `365 dias`
- Idade: `25–54`
- Gênero: `Women`

Uso:

- remarketing quente

## 5.6 Público 6 — Video Viewers

- Nome: `CA_VIDEO_25_50_365D`
- Fonte: `Video custom audience`
- Regra:
  - viewers `25%`
  - viewers `50%`
- Janela: `365 dias`
- Idade: `25–54`

Uso:

- remarketing morno

## 5.7 Público 7 — Site Visitors

- Nome: `CA_SITE_180D`
- Fonte: `Website custom audience`
- Janela:
  - `30 dias`
  - `60 dias`
  - `180 dias`

Uso:

- remarketing
- reimpacto de quem visitou e não comprou

## 5.8 Público 8 — Lookalike de Engajados

- Nome: `LAL_1_3_IG_ENGAGERS`
- Fonte: `Instagram engagers` ou `website visitors de alta intenção`
- Percentual:
  - `1%`
  - `1–3%`
- Idade: `30–50`
- Gênero: `Women`

Uso:

- prospecção com um pouco mais de direção

## 5.9 Público 9 — Lookalike de Compradoras

- Nome: `LAL_1_2_BUYERS`
- Fonte: `purchase custom audience`
- Percentual:
  - `1%`
  - `1–2%`

Uso:

- melhor público de escala, se você já tiver compras suficientes

## 6. Ordem de prioridade dos públicos

Se eu fosse começar amanhã:

1. `BROAD_W_32_45_BR`
2. `BROAD_W_36_49_BR`
3. `CA_IG_ENGAGERS_365D`
4. `CA_VIDEO_25_50_365D`
5. `LAL_1_3_IG_ENGAGERS`
6. `DT_W_30_50_HOME_WELLNESS`
7. `BROAD_W_46_54_BR`

## 7. O que um anúncio da Meta tem hoje

Na prática, para seus anúncios, pense nestes campos:

- `Primary Text`
- `Headline`
- `Description`
- `CTA button`
- `Creative`
- `Destination URL`

## 8. Limites ideais de caracteres

Observação importante:

- A Meta publica melhor os `limites recomendados por placement` do que um “máximo universal” simples.
- Os máximos técnicos de API existem, mas truncamento e performance acontecem muito antes.
- Para vender bem, o número que importa mais é o `ideal`, não o teto bruto.

### 8.1 Ideais práticos validados em fontes oficiais da Meta

#### Feed com imagem ou vídeo

- `Primary Text`: `50–150 caracteres`
- `Headline`: `27 caracteres`

#### Carousel em feed

- `Primary Text`: `80 caracteres`
- `Headline`: `45 caracteres`
- `Description`: `18 caracteres`

#### Reels

- `Primary Text`: `40 caracteres`
- `Headline`: `55 caracteres`

### 8.2 Máximos técnicos oficiais

Em documentação oficial para `asset_feed_spec`, a Meta mostra:

- `Title`: até `255`
- `Description`: até `255`
- `Body`: até `1024`

Em documentação oficial de `multi-language ads`, a Meta mostra um teto maior para alguns fluxos:

- `Title`: até `255`
- `Body`: até `4096`
- `Description`: até `10000`

Leitura correta:

- não use esses números como meta de copy
- use como teto técnico
- para performance, continue nos limites ideais por placement

## 9. Minha regra prática para você

### Frio

- `Primary Text`: até `110–140`
- `Headline`: até `27–40`
- `Description`: curta, opcional

### Remarketing

- `Primary Text`: até `125`
- `Headline`: até `40`
- `Description`: até `18–30`

### Reels

- texto principal curto
- promessa rápida
- arte limpa
- sem bloco de texto grande

## 10. Devo falar R$ 19,90 no anúncio?

Minha recomendação:

- `não` como criativo frio principal

Motivo:

- seu produto vende mais por identificação e alívio do que por preço
- `R$ 19,90` muito cedo pode baratear a percepção
- o criativo frio precisa vender:
  - “isso foi feito para mim”
  - “isso cabe na minha vida”
  - “eu consigo”

Onde eu testaria preço:

- remarketing
- anúncio comparativo de valor
- criativo de oferta

Como eu testaria:

- versão A: sem preço
- versão B: “acesso por menos de uma refeição fora”
- versão C: “28 dias por R$ 19,90”

## 11. Cinco variações de anúncio para testar

## Variação 1 — Recomeço gentil

- Ângulo: voltar sem culpa
- Melhor público:
  - `BROAD_W_36_49_BR`
  - `CA_IG_ENGAGERS_365D`
- CTA: `Saiba mais`

Primary Text:
`Parou de treinar? Então não volte no extremo. Volte do jeito certo: em casa, no seu ritmo, com 10 a 20 minutos por dia.`

Headline:
`Volte sem se cobrar`

Description:
`Treino possível em casa`

Gancho visual:

- mulher real
- 35 a 42 anos
- ambiente doméstico bonito e simples
- expressão calma
- começo de movimento, não performance extrema

## Variação 2 — 10 minutos contam

- Ângulo: falta de tempo
- Melhor público:
  - `BROAD_W_32_45_BR`
  - `DT_W_30_50_HOME_WELLNESS`
- CTA: `Saiba mais`

Primary Text:
`Você não precisa de 1 hora. Precisa de um plano que caiba na sua rotina. Sessões curtas, em casa, para criar constância de verdade.`

Headline:
`10 minutos já contam`

Description:
`Sem academia`

Gancho visual:

- relógio discreto
- canto de treino em casa
- sensação de rotina real

## Variação 3 — Sem academia

- Ângulo: praticidade e autonomia
- Melhor público:
  - `BROAD_W_32_45_BR`
  - `BROAD_W_46_54_BR`
- CTA: `Saiba mais`

Primary Text:
`Sem academia. Sem equipamento obrigatório. Sem treinos longos. Só um plano simples para mulheres reais voltarem a se sentir bem no próprio corpo.`

Headline:
`Treino feminino em casa`

Description:
`28 dias de constância`

Gancho visual:

- sala clara
- tapete
- roupa neutra
- postura confiante

## Variação 4 — Constância vale mais

- Ângulo: disciplina sem culpa
- Melhor público:
  - `CA_VIDEO_25_50_365D`
  - `CA_SITE_180D`
- CTA: `Saiba mais`

Primary Text:
`Perdeu um dia? Continue no próximo. Esse plano não foi feito para perfeição. Foi feito para constância.`

Headline:
`Constância > perfeição`

Description:
`Continue no seu ritmo`

Gancho visual:

- checklist
- marcação de dias
- sensação de progresso simples

## Variação 5 — Sentir-se bem no corpo

- Ângulo: transformação emocional
- Melhor público:
  - `BROAD_W_36_49_BR`
  - `LAL_1_3_IG_ENGAGERS`
- CTA: `Saiba mais`

Primary Text:
`Não é só sobre emagrecer. É sobre se sentir mais forte, mais presente e mais confiante no próprio corpo.`

Headline:
`Volte a se sentir bem`

Description:
`Movimento real`

Gancho visual:

- pós-treino leve
- sorriso discreto
- energia serena

## 12. Variações de criativo por formato

### 12.1 Criativo estático

Melhor para:

- promessa simples
- identificação imediata
- público frio

Estrutura:

- uma mulher
- um benefício
- pouco texto na arte

### 12.2 Vídeo curto

Melhor para:

- dor + alívio
- rotina
- recomeço

Estrutura:

1. dor real
2. alívio
3. prova visual
4. CTA simples

### 12.3 UGC estilo depoimento

Melhor para:

- warm
- lookalike
- criativo 2 ou 3 de escala

Estrutura:

- “eu achava que precisava de motivação”
- “o que eu precisava era de algo possível”

### 12.4 Reels

Melhor para:

- hook rápido
- estética leve
- criativo vertical

Regra oficial relevante:

- preserve áreas seguras
- deixe folga visual no topo, base e laterais

## 13. Prompt da modelo principal

Use este prompt como base:

`Mulher brasileira de 35 a 42 anos, bonita mas acessível, aparência natural, corpo saudável e real, sem definição extrema, postura boa, expressão serena e confiante, energia acolhedora, cabelo natural levemente arrumado, maquiagem discreta, roupa de treino elegante e neutra em tons off-white, areia, taupe e rosé queimado, fotografada em casa real e organizada, luz natural suave da manhã, atmosfera clean e premium acessível, sem estética de atleta profissional, sem academia, sem sensualização, enquadramento editorial wellness, realismo fotográfico alto, textura de pele natural, ambiente doméstico sofisticado porém crível, tapete de treino, sensação de bem-estar, constância e recomeço possível`

Negativo:

`sem corpo trincado, sem influencer fitness, sem neon, sem academia de luxo, sem pose sexy, sem musculatura extrema, sem maquiagem pesada, sem cara de publicidade agressiva`

## 14. Prompt da imagem 16:9 para Hotmart

`Capa horizontal 16:9 para produto digital de treino feminino em casa, estilo editorial wellness minimalista, mostrar mulher brasileira real entre 35 e 42 anos em ambiente doméstico bonito e claro, usando roupa neutra elegante, em pose de movimento leve de calistenia adaptada, luz natural suave, paleta off-white, areia, taupe, rosé queimado e verde sálvia, composição premium acessível, visual sofisticado e confiável, espaço negativo bem planejado para título, sensação de recomeço, constância, leveza e confiança, sem academia, sem equipamentos complexos, sem estética maromba, imagem comercial de alta conversão, alta nitidez, realismo fotográfico, resolução 1920x1080`

Texto sugerido para sobreposição na arte:

- `Calistenia Feminina em Casa`
- `28 dias para criar constância`

Negativo:

`sem visual hardcore, sem corpo de atleta profissional, sem roxo, sem preto dominante, sem suor exagerado, sem sofrimento extremo, sem bagunça, sem poluição visual`

## 15. Prompt do avatar da cliente ideal

`Crie um retrato editorial realista da cliente ideal de um produto de calistenia feminina em casa: mulher brasileira de 36 a 49 anos, rotina corrida, mistura de trabalho, casa e cansaço mental, aparência natural e simpática, corpo real, sem estética fitness extrema, expressão de quem quer se sentir melhor no próprio corpo, energia de recomeço, confiança leve, autocuidado possível, roupa casual clean, ambiente doméstico real e organizado, luz natural, tom visual acolhedor, elegante e humano, estilo wellness premium acessível, foco em identificação e credibilidade`

## 16. Três coisas que você ainda não tinha pedido e deveria usar

## 16.1 Regra de preço no funil

Não usar `R$ 19,90` como headline principal no frio.

Melhor uso:

- frio: vender mecanismo + identificação
- morno: vender facilidade + tempo
- quente: vender oferta + risco baixo + preço

## 16.2 Regra de corte e escala

Defina antes de subir:

- quantos cliques sem venda derrubam o anúncio
- quantas vendas validam o criativo
- qual CPA máximo ainda fecha conta

Sem isso, você vai “achar” que um anúncio é ruim cedo demais ou deixar anúncio ruim rodando.

## 16.3 Tracking e naming

Se você quer vender com consistência:

- padronize nome de campanha, conjunto e anúncio
- use UTM em tudo
- confirme se compra, checkout iniciado e LPV estão chegando corretamente

Se o rastreamento no Hotmart estiver fraco:

- considere uma bridge page própria antes da Hotmart
- isso te devolve controle de evento e remarketing

## 17. Minha montagem inicial da conta

Se eu fosse começar simples:

Campanha 1:

- `Sales`
- `ABO`

Conjuntos:

- `BROAD_W_32_45_BR`
- `BROAD_W_36_49_BR`
- `DT_W_30_50_HOME_WELLNESS`
- `CA_IG_ENGAGERS_365D`
- `CA_VIDEO_25_50_365D`

Criativos iniciais:

- `Recomeço gentil`
- `10 minutos contam`
- `Sem academia`
- `Constância > perfeição`
- `Volte a se sentir bem`

## 18. Minha recomendação final

Para esse produto, eu apostaria primeiro em:

- criativo emocional e identificável
- mulheres `32–49`
- broad + warm + lookalike
- preço só como teste secundário

O centro da venda não é “barato”.
O centro da venda é:

- `isso cabe na minha vida`
- `isso foi feito para mim`
- `eu consigo manter`

## 19. Fontes atuais usadas

### Meta Help Center / Business

- About reaching new audiences:
  - https://www.facebook.com/help/157306091096340
- About Detailed Targeting:
  - https://www.facebook.com/help/182371508761821
- About custom audiences:
  - https://www.facebook.com/help/744354708981227
- Lookalike Audiences:
  - https://www.facebook.com/help/365463786964246
- About Advantage+ lookalike:
  - https://www.facebook.com/help/1212225059146059
- About Meta Advantage+:
  - https://www.facebook.com/help/733979527611858
- About Lookalike Audiences:
  - https://www.facebook.com/business/help/164749007013531

### Meta Ads Guide

- Image ad specs on Facebook Feed:
  - https://www.facebook.com/business/ads-guide/update/image
- Video ad specs on Facebook Feed:
  - https://www.facebook.com/business/ads-guide/update/video
- Carousel ad specs on Facebook Feed:
  - https://www.facebook.com/business/ads-guide/update/carousel/facebook-feed/link-clicks
- Video ad specs on Facebook Reels:
  - https://www.facebook.com/business/ads-guide/update/video/facebook-facebook-reels
- Image ad specs on Instagram Feed:
  - https://www.facebook.com/business/ads-guide/update/image/instagram-feed

### Meta for Developers

- Ad Creative asset feed options:
  - https://developers.facebook.com/docs/marketing-api/ad-creative/asset-feed-spec/options
- Ad Creative reference:
  - https://developers.facebook.com/docs/marketing-api/reference/ad-creative
- Multi-language ads:
  - https://developers.facebook.com/docs/marketing-api/multi-language-ads

## 20. Nota de método

Onde eu afirmo algo como “existe hoje”:

- estou me baseando em documentação oficial atual da Meta

Onde eu recomendo faixa etária, ordem de teste ou ângulo:

- isso é inferência estratégica minha com base no seu produto e no posicionamento da marca

Onde eu cito limites ideais de caracteres por placement:

- estou usando o Meta Ads Guide atual
- em alguns casos o texto ideal apareceu no snippet oficial indexado pelo buscador, porque as páginas da Ads Guide são parcialmente dinâmicas

Leitura correta:

- os formatos e estruturas acima estão atualizados
- os nomes exatos de certos interesses podem variar dentro da sua conta
