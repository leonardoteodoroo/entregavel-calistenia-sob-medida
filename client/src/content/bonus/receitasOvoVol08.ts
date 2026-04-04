import type { Recipe } from "./bonusRecipeTypes";

export const receitasOvoVol08: Recipe[] = [
  {
    id: "ovo-071-pao-ovos-integral",
    title: "71. Pão de Ovos Integral",
    visual: {
      kind: "placeholder",
      alt: "Pão caseiro grande e moreno, com crosta rústica e cortes em cima, mostrando uma massa macia e amarelada por dentro",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Pão integral caseiro recém-saído do forno em cima de uma grade de resfriamento. A superfície é morena e polvilhada com um pouco de farinha, com cortes artísticos. Uma fatia está cortada ao lado, revelando o miolo rico e fofinho. Luz de manhã na cozinha. Estilo rústico e saudável. Resolução: 1376x768.",
      comment: "Pão de ovos integral caseiro",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "25 min",
      total: "2h 30 min",
      extraLabel: "Saudável",
      extraValue: "Integral",
    },
    servings: "1 pão grande (aprox. 12 fatias)",
    premise:
      "Não existe cheiro melhor do que o de pão caseiro assando. Esta versão integral usa quatro ovos na massa, o que garante uma estrutura muito mais rica e macia do que o pão comum. É perfeito para fatiar e comer com uma pontinha de manteiga derretida.",
    ingredients: [
      "2 xícaras de farinha de trigo comum",
      "2 e ½ xícaras de farinha de trigo integral",
      "2 colheres (sopa) de açúcar mascavo",
      "½ colher (sopa) de fermento biológico seco",
      "½ colher (sopa) de sal",
      "4 ovos médios",
      "2 colheres (sopa) de óleo de coco ou azeite",
      "150 ml de água morna",
      "1 ovo para pincelar",
    ],
    instructions:
      "O segredo do pão fofinho está na paciência para deixar a massa crescer.",
    instructionsSteps: [
      "Em uma tigela grande, misture as farinhas, o açúcar, o fermento e o sal.",
      "Faça um buraco no centro e coloque os ovos, o óleo e a água morna.",
      "Misture com as mãos até formar uma bola. Se estiver grudando demais, coloque um pouquinho mais de farinha, mas sem exagerar.",
      "Sove a massa em uma bancada enfarinhada por 15 minutos até ficar elástica.",
      "Coloque na tigela, cubra com um pano e deixe descansar por 1 hora e meia (ou até dobrar de tamanho).",
      "Amasse de leve para tirar o ar, modele o pão e deixe crescer na forma por mais 40 minutos.",
      "Pincela com ovo batido e asse em forno preaquecido (200°C) por uns 35 minutos até dourar bem.",
    ],
    objection:
      "O meu pão ficou duro e pesado? A água morna não pode estar quente, senão você mata o fermento. Além disso, se você colocar farinha demais na sova, o pão perde a umidade. Ele deve estar levemente pegajoso antes do primeiro descanso.",
    masterTip:
      "Faça cortes transversais no topo do pão com uma faca bem afiada logo antes de levar ao forno; isso ajuda o pão a expandir sem rachar e fica lindo.",
  },
  {
    id: "ovo-072-bolo-carne-ovos",
    title: "72. Bolo de Carne Recheado com Ovos",
    visual: {
      kind: "placeholder",
      alt: "Rolo de carne moída assado e envolto em bacon, fatiado ao meio revelando ovos cozidos inteiros no centro",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Um bolo de carne suculento coberto por fatias crocantes de bacon dourado. Ao centro, fatias mostram o ovo cozido com a gema bem amarela contrastando com a carne escura. Servido em uma tábua de madeira com ramos de alecrim. Estilo refeição de domingo. Resolução: 1376x768.",
      comment: "Bolo de carne com ovo",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "20 min",
      total: "1h 20 min",
      extraLabel: "Clássico",
      extraValue: "Comida de Família",
    },
    servings: "6 porções",
    premise:
      "Este bolo de carne é um espetáculo visual quando vai à mesa. Escondidos dentro da carne temperada e envolta em bacon, estão ovos inteiros cozidos. Ao cortar, cada fatia revela um centro perfeito e amarelado. É uma refeição completa e muito satisfatória.",
    ingredients: [
      "700g de carne moída (patinho ou acém)",
      "4 ovos (3 para cozinhar, 1 para a massa)",
      "100g de bacon em fatias",
      "2 cebolas médias bem picadinhas",
      "3 colheres (sopa) de azeite",
      "100g de farinha de rosca",
      "1 colher (sopa) de molho inglês",
      "Sal e pimenta a gosto",
    ],
    instructions:
      "O truque é montar as camadas para que o ovo fique bem centralizado.",
    instructionsSteps: [
      "Cozinhe 3 ovos por 7 minutos. Coloque na água gelada, descasque e reserve.",
      "Refogue a cebola no azeite até ficar transparente e deixe esfriar.",
      "Em uma tigela, misture a carne moída, a cebola frita, o molho inglês, o sal, a pimenta, o ovo cru e a farinha de rosca.",
      "Em um refratário untado, coloque metade da massa de carne e faça uma 'cova' no meio.",
      "Acomode os 3 ovos cozidos nessa cavidade e cubra com o restante da carne, fechando bem as laterais.",
      "Cubra o topo com as fatias de bacon, prendendo as pontas por baixo do bolo de carne.",
      "Asse em forno preaquecido (200°C) por cerca de 1 hora. Espere 15 minutos para fatiar.",
    ],
    objection:
      "O bolo de carne abriu e soltou água? É normal a carne soltar um pouco de suco. O segredo para não abrir é apertar bem a carne na hora de fechar sobre os ovos, garantindo que não fiquem bolhas de ar no interior.",
    masterTip:
      "Pincele um pouco de barbecue ou catchup sobre o bacon nos últimos 10 minutos de forno para um brilho extra e sabor defumado.",
  },
  {
    id: "ovo-073-mexidos-indianos",
    title: "73. Ovos Mexidos Indianos",
    visual: {
      kind: "placeholder",
      alt: "Ovos mexidos bem amarelos e úmidos misturados com pedacinhos de tomate, cebola e especiarias escuras",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Uma tigela pequena de cerâmica com ovos mexidos indianos (Akuri). Note as sementes de mostarda pretas espalhadas, cubinhos minúsculos de tomate e coentro fresco. Acompanhado de fatias de pão tostado. Estilo exótico e aromático. Resolução: 1376x768.",
      comment: "Ovos mexidos indianos",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Aromático",
      extraValue: "Sem Glúten",
    },
    servings: "2 porções",
    premise:
      "Se você gosta de começar o dia com energia e um perfume incrível na cozinha, esta é a sua receita. Diferente dos ovos mexidos comuns, aqui usamos sementes de mostarda fritas no óleo e gengibre fresco. É uma explosão de sabor que desperta o paladar.",
    ingredients: [
      "4 ovos levemente batidos",
      "1 cebola pequena finamente picada",
      "1 tomate sem sementes bem picadinho",
      "½ colher (chá) de sementes de mostarda pretas",
      "1 colher (café) de gengibre fresco ralado",
      "1 colher (sopa) de óleo ou ghee",
      "Cúrcuma (açafrão), coentro fresco, sal e pimenta",
    ],
    instructions:
      "O segredo é fritar as sementes de mostarda até elas começarem a estalar.",
    instructionsSteps: [
      "Aqueça o óleo em uma frigideira. Coloque as sementes de mostarda e espere 30 segundos (elas vão começar a 'pular').",
      "Junte a cebola e refogue por 3 minutos até murchar.",
      "Adicione o gengibre ralado e refogue por mais meio minuto.",
      "Coloque o tomate, a cúrcuma e misture bem por 2 minutos.",
      "Baixe o fogo e despeje os ovos batidos. Mexa devagar para ficarem cremosos mas cozidos.",
      "Finalize com sal, pimenta e bastante coentro fresco por cima.",
    ],
    objection:
      "Os ovos ficaram secos demais? No estilo indiano, os ovos demoram um pouquinho mais por causa do refogado, mas o fogo deve estar sempre baixo na hora de colocar os ovos para que eles mantenham a umidade.",
    masterTip:
      "Sirva com um pão tipo 'naan' ou uma torrada bem grossa com manteiga fria para contrastar com o calor das especiarias.",
  },
  {
    id: "ovo-074-mexido-brunch-chic",
    title: "74. Ovos Gourmet de Tomate Seco e Rúcula",
    visual: {
      kind: "placeholder",
      alt: "Ovos mexidos cremosos servidos sobre uma fatia de pão rústico, decorados com tomate seco e rúcula fresca",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Vista superior de um prato de brunch delicado. Ovos mexidos muito cremosos e claros, misturados com pedaços de tomate seco vermelho intenso e folhas verdes de rúcula. Polvilhados com parmesão. Estilo cafeteria moderna e sofisticada. Resolução: 1376x768.",
      comment: "Ovos gourmet com rúcula",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "20 min",
      extraLabel: "Gourmet",
      extraValue: "Brunch",
    },
    servings: "4 porções",
    premise:
      "Uma versão mais sofisticada do clássico ovo mexido, perfeita para um café da manhã tardio ou um almoço leve. O tomate seco traz uma doçura intensa que combina perfeitamente com o amarguinho da rúcula e a cremosidade do queijo mussarela.",
    ingredients: [
      "8 ovos grandes",
      "200g de mussarela picada",
      "200g de peito de peru ou lombo defumado picadinho",
      "1 xícara de tomate seco picado",
      "1 xícara de rúcula fresca e picada",
      "4 colheres (sopa) de manteiga derretida",
      "2 colheres (sopa) de farinha de trigo (para dar corpo)",
      "Sal e orégano a gosto",
    ],
    instructions:
      "Quase uma tortinha de frigideira que termina de gratinar no forno.",
    instructionsSteps: [
      "No liquidificador ou tigela, bata os ovos com a farinha e o sal até ficar bem aerado.",
      "Em uma frigideira grande untada, faça discos finos tipo panqueca com os ovos e doure dos dois lados.",
      "Misture o peito de peru, o queijo, o tomate seco e a rúcula em um recipiente.",
      "Coloque uma porção desse recheio no centro de cada 'disco' de ovo e enrole como um pequeno rocambole.",
      "Acomode os rolinhos em um refratário, regue com a manteiga derretida e queijo parmesão.",
      "Leve ao forno por 10 minutos apenas para derreter tudo e dar uma leve gratinada.",
    ],
    objection:
      "A massa de ovo ficou borrachuda? Bater bem os ovos e usar a farinha ajuda a criar uma estrutura que resiste ao recheio úmido do tomate seco. O segredo é não deixar o disco de ovo fritar demais antes de enrolar.",
    masterTip:
      "Se quiser algo ainda mais leve, troque o peito de peru por cubinhos de ricota temperada com ervas.",
  },
  {
    id: "ovo-075-ovo-primavera",
    title: "75. Ovo Primavera (Cumbuca Veggie)",
    visual: {
      kind: "placeholder",
      alt: "Frigideira colorida com legumes refogados e ovos estalados no centro, com cores vibrantes de cenoura, abobrinha e espinafre",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Frigideira de cerâmica colorida cheia de grão-de-bico, fatias de abobrinha e cenoura laranja vibrante. No centro, 4 ovos com a gema mole e brilhante estão embutidos no refogado. Salpicado de salsinha verde. Estilo saudável e fresco. Resolução: 1376x768.",
      comment: "Refogado de legumes com ovos",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "20 min",
      extraLabel: "Vegetariano",
      extraValue: "Completo",
    },
    servings: "4 porções",
    premise:
      "Uma refeição 'em uma panela só' que traz toda a cor da primavera para o seu prato. Usamos grão-de-bico para sustentar, abobrinha para leveza e ovos estalados direto no vapor dos legumes. É nutritivo, rápido e suja quase nada de louça.",
    ingredients: [
      "4 ovos",
      "1 xícara de grão-de-bico cozido",
      "½ abobrinha fatiada",
      "½ cenoura cortada em tirinhas finas",
      "1 xícara de espinafre picado",
      "¼ de cebola picada",
      "Azeite, curry, alecrim e sal",
    ],
    instructions:
      "Os ovos cozinham sobre os legumes, absorvendo todo o tempero.",
    instructionsSteps: [
      "Refogue a cebola no azeite com um pouco de manteiga até murchar.",
      "Adicione a cenoura, a abobrinha e o grão-de-bico. Tempere com curry e alecrim.",
      "Coloque um pinguinho de água e deixe cozinhar por 3 minutos com a panela tampada.",
      "Adicione o espinafre e misture rápido.",
      "Faça 4 buraquinhos no meio do refogado e quebre um ovo em cada um.",
      "Tampe novamente e deixe em fogo baixo por uns 5 minutos até a clara firmar (mas a gema continuar linda e mole).",
    ],
    objection:
      "Os legumes ficaram moles demais antes do ovo cozinhar? Comece o refogado com os legumes bem firmes. Como eles vão continuar cozinhando sob o vapor da tampa enquanto o ovo firma, eles chegam ao ponto perfeito juntos.",
    masterTip:
      "Um fio de azeite extra-virgem e uma pitada de flor de sal sobre as gemas no final fazem toda a diferença.",
  },
  {
    id: "ovo-076-tarteletes-arroz-ovo",
    title: "76. Tarteletes de Arroz e Ovo",
    visual: {
      kind: "placeholder",
      alt: "Pequenas cestinhas feitas de arroz dourado e crocante recheadas com um ovo inteiro assado",
      prompt:
        "Fotografia gastronômica horizontal (16:9). 4 forminhas de porcelana (ramequins) com uma base de arroz compactada e dourada saindo pelas bordas. No meio, um ovo assado com gema mole e pimenta moída por cima. Fundo de mesa de madeira rústica. Estilo rústico-chic. Resolução: 1376x768.",
      comment: "Tarteletes de arroz assado",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "15 min",
      total: "30 min",
      extraLabel: "Reaproveitamento",
      extraValue: "Elegante",
    },
    servings: "4 tarteletes",
    premise:
      "Sabe aquele arroz que sobrou de ontem? Ele pode virar a base de uma entrada sofisticada ou um lanche de dar água na boca. Criamos cestinhas crocantes de arroz que servem de 'ninho' para um ovo assado. É crocante por fora e cremoso por dentro.",
    ingredients: [
      "2 xícaras de arroz cozido",
      "4 ovos inteiros (mais 1 ovo batido para a massa)",
      "2 colheres (sopa) de creme de leite",
      "½ cebola picadinha e 1 dente de alho",
      "Queijo parmesão e páprica picante",
      "Cheiro-verde picadinho",
    ],
    instructions:
      "Modele as paredes de arroz na forminha para criar o espaço do ovo.",
    instructionsSteps: [
      "Em uma tigela, misture o arroz, o ovo batido, o creme de leite, a cebola, o alho e os temperos.",
      "Adicione um pouquinho de farinha de trigo (apenas o suficiente para dar liga, umas 2 colheres).",
      "Unte forminhas de muffin ou ramequins e forre o fundo e as laterais com essa massa de arroz, deixando um buraco no centro.",
      "Asse em forno preaquecido (200°C) por 15 minutos até as bordas de arroz ficarem firmes e coradas.",
      "Retire, quebre um ovo cru no meio de cada cestinha e tempere com sal.",
      "Volte ao forno por mais 10 minutos até o ovo chegar no ponto.",
    ],
    objection:
      "A cestinha de arroz desmanchou na hora de tirar da forma? O segredo é apertar bem o arroz contra as paredes da forminha na hora de modelar. Unte muito bem com manteiga para que a casquinha crocante solte inteira.",
    masterTip:
      "Coloque uma pontinha de cream cheese no fundo da cestinha de arroz antes de quebrar o ovo para um resultado ainda mais luxuoso.",
  },
  {
    id: "ovo-077-fritada-cebola-provolone",
    title: "77. Fritada de Cebola Roxa e Provolone",
    visual: {
      kind: "placeholder",
      alt: "Fritada redonda e dourada na frigideira, com aneis de cebola roxa visíveis e queijo provolone derretido",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Frigideira de ferro com uma fritada de ovos grossa e bem dourada. Fatias de cebola roxa caramelizada aparecem na superfície, misturadas com cubos de queijo provolone que esticam com o calor. Estilo rústico contemporâneo. Resolução: 1376x768.",
      comment: "Fritada de cebola roxa",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Sabor Marcante",
      extraValue: "Low Carb",
    },
    servings: "2 porções fartas",
    premise:
      "Esta fritada é para quem ama sabores intensos. O adocicado da cebola roxa caramelizada encontra o toque defumado do queijo provolone. É rápida de fazer, mas tem cara (e gosto!) de prato de restaurante.",
    ingredients: [
      "4 ovos grandes",
      "150g de cebola roxa fatiada",
      "100g de queijo provolone em cubinhos",
      "2 colheres (sopa) de leite (para maciez)",
      "3 colheres (sopa) de vinho branco (opcional)",
      "Azeite, sal e pimenta-do-reino",
    ],
    instructions:
      "O vinho branco ajuda a deglacear a panela e dá um aroma incrível à cebola.",
    instructionsSteps: [
      "Aqueça o azeite e refogue as cebolas até ficarem bem macias e escuras.",
      "Se usar, adicione o vinho e espere ele evaporar completamente.",
      "Bata os ovos com o leite, o sal e a pimenta.",
      "Misture os cubos de provolone nos ovos e despeje tudo sobre as cebolas na frigideira.",
      "Tampe a panela e deixe em fogo bem baixinho até a parte de cima secar.",
      "Vire com a ajuda de um prato para dourar o outro lado por apenas 1 minuto.",
    ],
    objection:
      "O sabor do provolone ficou forte demais? O provolone é um queijo de personalidade. Se preferir algo mais neutro, pode substituir metade da quantidade por mussarela comum, mantendo apenas o perfume do defumado.",
    masterTip:
      "Sirva acompanhado de uma salada de folhas amargas, como rúcula ou agrião, para equilibrar o peso do queijo e da cebola frita.",
  },
  {
    id: "ovo-078-muffin-omelete",
    title: "78. Muffins de Omelete (Bolinhos Salgados)",
    visual: {
      kind: "placeholder",
      alt: "Pequenos muffins salgados amarelos e fofos com pedacinhos de tomate, abobrinha e queijo",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Grade de resfriamento com 6 bolinhos de omelete dourados. É possível ver pedaços coloridos de tomate e abobrinha na massa. Estilo lanche prático wellness. Luz natural e clara. Resolução: 1376x768.",
      comment: "Muffins de omelete assada",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "20 min",
      extraLabel: "Praticidade",
      extraValue: "Lancheira",
    },
    servings: "Rende 8 unidades",
    premise:
      "Perfeitos para quem vive na correria. Esses bolinhos são omeletes assadas individualmente em forminhas. Você pode levar na bolsa, mandar na lancheira das crianças ou servir como um aperitivo saudável. São leves, macios e muito práticos.",
    ingredients: [
      "4 ovos batidos",
      "½ abobrinha ralada",
      "1 tomate sem semente picadinho",
      "100g de mussarela e 100g de presunto em cubinhos",
      "1 colher (café) de fermento em pó",
      "Manjericão fresco, sal e pimenta",
    ],
    instructions: "Misture tudo em uma tigela e distribua nas forminhas.",
    instructionsSteps: [
      "Tempere os ovos batidos com sal, pimenta e manjericão. Misture o fermento por último.",
      "Unte forminhas de silicone (aquelas de cupcake).",
      "Coloque um pouco de abobrinha, tomate, queijo e presunto no fundo de cada forma.",
      "Complete com o ovo batido, deixando um espacinho no topo (eles crescem um pouco).",
      "Asse no forno a 180°C por 15 minutos até ficarem dourados e firmes ao toque.",
      "Desenforme morno e aproveite.",
    ],
    objection:
      "Os bolinhos murcharam depois de sair do forno? Como são feitos quase puramente de ovo, eles incham no calor e baixam um pouco ao esfriar. Isso é normal e não afeta o sabor delicioso nem a textura macia.",
    masterTip:
      "Experimente adicionar uma pitada de parmesão por cima antes de assar para criar uma crostinha crocante deliciosa.",
  },
  {
    id: "ovo-079-pao-ovo-turbinado",
    title: "79. Pão com Ovo Turbinado",
    visual: {
      kind: "placeholder",
      alt: "Pão francês redondo recheado com ovo, queijo e bacon, parecendo um pequeno vulcão",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Pão italiano pequeno escavado e recheado com ovo, coberto com queijo cheddar derretido e pedacinhos de bacon. A gema está levemente líquida e brilhante. Estilo café da manhã de hotel. Resolução: 1376x768.",
      comment: "Pão redondo recheado com ovo",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Rápido",
      extraValue: "Café da Manhã",
    },
    servings: "1 unidade por pessoa",
    premise:
      "Esqueça o pão com ovo frito de sempre. Aqui, o pão vira o próprio recipiente! Escavamos o miolo, forramos com presunto e queijo, e quebramos o ovo lá dentro antes de levar pro forno. O resultado é um pão crocante por fora com um ovo suculento escondido no meio.",
    ingredients: [
      "Pão francês, italiano ou brioche (redondo é melhor)",
      "1 ovo para cada pão",
      "1 fatia de presunto e 2 colheres de queijo mussarela ralada",
      "Salsa picada e sal",
    ],
    instructions:
      "O presunto no fundo evita que o ovo umedeça demais a casca do pão.",
    instructionsSteps: [
      "Corte a tampinha do pão e retire o miolo delicadamente, formando uma 'tigelinha'.",
      "Forre o fundo e as laterais internas com a fatia de presunto.",
      "Quebre o ovo com cuidado dentro do pão.",
      "Cubra com o queijo e uma pitadinha de sal e salsa.",
      "Feche com a tampinha do pão e embrulhe em papel alumínio.",
      "Asse a 180°C por 10 minutos (gema mole) ou 15 minutos (gema firme). Retire o papel nos últimos 2 minutos para dourar o pão.",
    ],
    objection:
      "O ovo vazou e o pão ficou mole? Isso acontece se houver furos na base do pão ou se o presunto não forrar bem as paredes. Use um pão mais firme se for a primeira vez que tenta.",
    masterTip:
      "Passe uma camadinha fina de requeijão no lugar do miolo antes do presunto para uma surpresa cremosa extra.",
  },
  {
    id: "ovo-080-sopa-tomate-escalfados",
    title: "80. Sopa de Tomate e Ovos Escalfados",
    visual: {
      kind: "placeholder",
      alt: "Sopa vermelha de tomate cremosa com ovos cozidos diretamente no caldo, decorada com coentro",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Tigela de sopa de tomate densa e vermelha. No centro, dois ovos escalfados com a clara branca perolada e a gema começando a escorrer no caldo. Folhas de coentro dão o toque final. Estilo rústico e reconfortante. Resolução: 1376x768.",
      comment: "Sopa de tomate com ovos",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "30 min",
      extraLabel: "Reconfortante",
      extraValue: "Inverno",
    },
    servings: "4 porções de sopa",
    premise:
      "Esta é a definição de comida que abraça a alma. Uma sopa de tomate caseira, bem aveludada, onde os ovos são cozidos inteiros direto no caldo quente. Quando você quebra a gema e ela se mistura à sopa, o sabor atinge outro nível de cremosidade.",
    ingredients: [
      "6 tomates bem maduros",
      "4 ovos frescos",
      "1 cebola e 3 dentes de alho",
      "750ml de água ou caldo de legumes caseiro",
      "Azeite, sal, pimenta e folha de louro",
      "Coentro ou salsinha para finalizar",
    ],
    instructions:
      "O ovo entra no final, quando a sopa já está pronta e quente.",
    instructionsSteps: [
      "Refogue a cebola e o alho no azeite com a folha de louro.",
      "Junte os tomates picados (sem pele de preferência) e refogue bem até desmancharem.",
      "Adicione a água fervendo e deixe cozinhar por 15 minutos.",
      "Retire o louro e bata a sopa no liquidificador ou mixer até ficar lisa.",
      "Volte ao fogo baixo. Quando começar a borbulhar de leve, quebre os ovos com cuidado direto na sopa.",
      "Não mexa! Deixe cozinhar por 3 a 4 minutos no calor do caldo até os ovos ficarem escalfados.",
      "Sirva em pratos fundos com ervas frescas.",
    ],
    objection:
      "Os ovos se desmancharam e sumiram na sopa? Quebre o ovo primeiro em uma xícara e depois deslize-o suavemente para dentro da sopa em um ponto onde não haja bolhas fervendo muito forte. Isso mantém o ovo inteiro enquanto cozinha.",
    masterTip:
      "Esfregue um dente de alho em uma fatia de pão torrado e sirva para mergulhar na sopa. É o par perfeito.",
  },
];
