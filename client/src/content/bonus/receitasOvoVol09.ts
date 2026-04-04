import type { Recipe } from "./bonusRecipeTypes";

export const receitasOvoVol09: Recipe[] = [
  {
    id: "ovo-081-ovo-verde-empanado",
    title: "81. Ovos Verdes Empanados",
    visual: {
      kind: "placeholder",
      alt: "Ovos inteiros empanados e fritos, cortados ao meio revelando um recheio esverdeado cremoso no lugar da gema",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Ovos dourados e super crocantes por fora, servidos cortados ao meio. O centro é preenchido com um creme verde vibrante de gemas com salsa. Estilo petisco gourmet. Resolução: 1376x768.",
      comment: "Ovos empanados e recheados",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "20 min",
      total: "35 min",
      extraLabel: "Diferente",
      extraValue: "Petisco",
    },
    servings: "6 unidades",
    premise:
      "Já experimentou empanar o ovo depois de cozido e recheado? Estes 'ovos verdes' são crocantes por fora e escondem uma pastinha cremosa de gemas com ervas por dentro. É aquele prato que todo mundo para pra perguntar como foi feito.",
    ingredients: [
      "6 ovos cozidos duros",
      "1 punhado generoso de salsa fresca",
      "1 colher (sopa) de maionese (ou iogurte grego)",
      "2 ovos crus (para empanar)",
      "Farinha de trigo e farinha de rosca",
      "Óleo para fritar, sal e pimenta",
    ],
    instructions:
      "Cozinhe o ovo, recheie com o creme verde e empane com carinho.",
    instructionsSteps: [
      "Corte os ovos cozidos ao meio no sentido do comprimento.",
      "Retire as gemas com cuidado e coloque em uma tigela. Reserve as claras intactas.",
      "Amasse as gemas e misture com a salsa bem picadinha, a maionese, sal e pimenta até formar uma pastinha verde.",
      "Preencha o buraco das claras com essa pasta e junte as duas metades para o ovo voltar ao formato original.",
      "Passe os ovos montados na farinha de trigo, depois no ovo batido e por último na farinha de rosca.",
      "Frite em óleo quente por apenas 2 minutos até dourar a casquinha. Escorra em papel toalha.",
    ],
    objection:
      "O ovo abriu na hora de fritar? O segredo é passar um pouquinho de clara crua ou ovo batido na borda antes de fechar as duas metades, funcionando como uma 'cola'. E o empanado duplo (trigo + ovo + rosca) ajuda a blindar o recheio.",
    masterTip:
      "Use uma faca úmida para cortar os ovos cozidos sem que a gema grude na lâmina e esfarele.",
  },
  {
    id: "ovo-082-ovo-recheado-atum",
    title: "82. Ovos Recheados com Atum",
    visual: {
      kind: "placeholder",
      alt: "Barquinhos de clara de ovo cozida recheados com uma pasta de atum e decorados com salsinha",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Metades de ovos brancos cozidos organizadas em um prato azul. Cada um tem uma montanha generosa de patê de atum com pedacinhos de tomate. Estilo lanche fresco e saudável. Resolução: 1376x768.",
      comment: "Ovos com patê de atum",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "15 min",
      extraLabel: "Proteico",
      extraValue: "Lanche Rápido",
    },
    servings: "4 porções",
    premise:
      "Procurando um lanche que sustenta e é ultra prático? Estes barquinhos de ovo com atum são a solução. Você usa a própria clara como suporte e cria um recheio rico e fresco. É o lanche perfeito para o pós-treino ou uma tarde produtiva.",
    ingredients: [
      "6 ovos cozidos duros",
      "1 lata de atum (escorrido)",
      "1 tomate sem sementes picadinho",
      "½ xícara de maionese light ou requeijão",
      "Sal, pimenta e cheiro-verde a gosto",
    ],
    instructions: "É só misturar, rechear e levar para gelar um pouquinho.",
    instructionsSteps: [
      "Corte os ovos cozidos ao meio e retire as gemas.",
      "Em uma tigela, amasse as gemas com um garfo e misture o atum, o tomate e a maionese.",
      "Tempere com sal, pimenta e cheiro-verde picadinho.",
      "Coloque colheradas desse creme dentro de cada metade de clara.",
      "Leve à geladeira por 30 minutos antes de servir para ficar bem refrescante.",
    ],
    objection:
      "A pasta ficou muito mole e escorreu? Lembre-se de escorrer muito bem o óleo ou a água da lata de atum antes de misturar. Se estiver usando tomate, tire bem as sementes e a aguinha dele para não desandar o patê.",
    masterTip:
      "Sirva sobre folhas de alface americana para dar uma crocância extra ao conjunto.",
  },
  {
    id: "ovo-083-mexidos-macios",
    title: "83. Ovos Mexidos 'Nuvem' com Ervas",
    visual: {
      kind: "placeholder",
      alt: "Ovos mexidos extremamente altos, fofos e amarelos brilhantes, servidos numa tigela branca",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Uma porção generosa de ovos mexidos muito leves e aerados. A textura parece uma nuvem amarela com pontos de salsinha verde. Ao lado, fatias de pão de forma tostados. Luz suave de café da manhã. Resolução: 1376x768.",
      comment: "Ovos mexidos com leite",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "10 min",
      extraLabel: "Cremoso",
      extraValue: "Clássico",
    },
    servings: "2 porções",
    premise:
      "O segredo para transformar aquele ovo mexido sem graça em uma nuvem fofinha de hotel é adicionar um pouco de leite e bater bem. O leite cria vapor durante o cozimento, fazendo o ovo crescer e ficar com uma textura aerada e macia.",
    ingredients: [
      "4 ovos grandes",
      "100ml de leite integral ou desnatado",
      "1 colher (chá) de azeite ou manteiga",
      "Sal e pimenta-do-reino",
      "Salsinha fresca picada",
    ],
    instructions:
      "O truque está em não deixar o ovo cozinhar demais até secar.",
    instructionsSteps: [
      "Quebre os ovos em uma tigela e bata com o leite e o sal por uns 2 minutos até espumar.",
      "Aqueça a frigideira com o azeite e coloque os ovos batidos.",
      "Use uma espátula para trazer o ovo das bordas para o centro, delicadamente, conforme ele for firmando.",
      "Desligue o fogo enquanto os ovos ainda estiverem levemente brilhantes e úmidos (eles terminam de cozinhar no próprio prato).",
      "Finalize com a salsinha e sirva imediatamente.",
    ],
    objection:
      "Meus ovos mexidos sempre soltam água no prato? Se você bater demais ou cozinhar em fogo muito baixo por muito tempo, a estrutura do ovo quebra e libera líquido. O fogo deve estar médio e o tempo total na panela deve ser curto.",
    masterTip:
      "Se quiser transformar em uma refeição completa, adicione rodelas de salsicha de boa qualidade ou peito de peru defumado no início do preparo.",
  },
  {
    id: "ovo-084-quiabo-bacon-ovos",
    title: "84. Ragu de Quiabo, Bacon e Ovos",
    visual: {
      kind: "placeholder",
      alt: "Panelinha de barro com quiabo em cubos num molho de tomate denso, com bacon e um ovo estalado no meio",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Vista superior de uma panela rústica com quiabos verdes brilhantes em molho de tomate. Pedaços de bacon crocante estão espalhados e um ovo de gema mole domina o centro. Estilo comida caseira brasileira. Resolução: 1376x768.",
      comment: "Quiabo com bacon e ovo",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "25 min",
      extraLabel: "Rústico",
      extraValue: "Almoço Rápido",
    },
    servings: "2 porções",
    premise:
      "Esta combinação é pura memória afetiva. O bacon traz o defumado, o quiabo tostado garante a textura e o molho de tomate une tudo para receber um ovo que cozinha ali mesmo no caldo. É uma refeição completa, forte e cheia de sabor brasileiro.",
    ingredients: [
      "3 ovos",
      "200g de bacon em cubinhos",
      "300g de quiabo limpo e seco (cortado em rodelas de 2cm)",
      "1 cebola picada e 2 dentes de alho",
      "1 lata de tomate pelado",
      "Tempero Lemon Pepper (opcional), coentro e sal",
    ],
    instructions: "O quiabo entra primeiro para tostar e não soltar baba.",
    instructionsSteps: [
      "Frite o bacon na própria gordura até ficar bem crocante. Retire e reserve o bacon.",
      "Na mesma panela, jogue o quiabo no fogo alto. Deixe tostar sem mexer muito para evitar a viscosidade.",
      "Junte a cebola e o alho e refogue até dourarem.",
      "Adicione o tomate pelado e um pouquinho de água. Deixe cozinhar tampado por 10 minutos.",
      "Volte o bacon para a panela e ajuste o sal e a pimenta.",
      "Abra espaços no molho e quebre os ovos. Tampe e deixe fritar no vapor até a clara firmar.",
    ],
    objection:
      "Tenho pavor da 'baba' do quiabo! O segredo é o choque térmico na frigideira bem quente e não mexer no início. O tomate (ácido) também ajuda muito a neutralizar a textura viscosa natural do quiabo.",
    masterTip:
      "Adicione uma pontinha de pimenta dedo-de-moça picada sem sementes para um toque picante que levanta o prato.",
  },
  {
    id: "ovo-085-omelete-calabresa",
    title: "85. Omelete Prática de Linguiça e Queijo",
    visual: {
      kind: "placeholder",
      alt: "Omelete dobrada ao meio com recheio visível de calabresa picadinha e mussarela derretida",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Frigideira antiaderente com uma omelete grossa e recheada. O queijo mussarela está derretendo e saindo pela lateral, junto com cubinhos de calabresa tostada. Finalizado com orégano. Resolução: 1376x768.",
      comment: "Omelete de linguiça",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Reforçado",
      extraValue: "Jantar Rápido",
    },
    servings: "2 porções",
    premise:
      "Para aqueles dias em que você quer um jantar que sustenta sem ter que cozinhar de verdade. A linguiça calabresa entrega todo o tempero que você precisa, e o queijo mussarela completa o conforto dessa omelete rústica e prática.",
    ingredients: [
      "4 ovos grandes",
      "150g de linguiça calabresa picadinha ou ralada",
      "150g de queijo mussarela ralado",
      "2 tomates sem pele e sem sementes picados",
      "Sal, pimenta, orégano e salsa fresca",
    ],
    instructions: "Bata bem os ovos para a massa ficar leve e aerada.",
    instructionsSteps: [
      "Bata os ovos com uma pitada de sal e pimenta em uma tigela.",
      "Em uma frigideira quente, frite os cubinhos de calabresa até ficarem dourados.",
      "Junte o tomate picado e refogue rápido.",
      "Despeje os ovos batidos sobre a linguiça e o tomate na frigideira.",
      "Espalhe o queijo mussarela por cima e tampe a panela em fogo baixo.",
      "Quando o topo firmar e o queijo derreter, dobre a omelete e sirva com salsa picada.",
    ],
    objection:
      "Sempre quebro a omelete na hora de dobrar! Use uma frigideira de tamanho adequado (não muito grande para a quantidade de ovos) e espere as bordas estarem bem soltas e douradas antes de tentar qualquer movimento.",
    masterTip:
      "Quer um resultado mais 'gourmet'? Adicione uma colher de requeijão no centro antes de fechar a omelete.",
  },
  {
    id: "ovo-086-ovo-cozido-canela",
    title: "86. Ovo Cozido com Toque de Canela",
    visual: {
      kind: "placeholder",
      alt: "Ovos cozidos cortados ao meio polvilhados com canela em pó, servidos numa tábua clara",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Dois ovos cozidos (gema cremosa) cortados ao meio. A gema amarela vibrante tem uma leve poeira de canela por cima. Ao fundo, uma xícara de café preto. Estilo café da manhã funcional light. Resolução: 1376x768.",
      comment: "Ovo com canela funcional",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Termogênico",
      extraValue: "Café Funcional",
    },
    servings: "1 porção",
    premise:
      "Parece estranho? Pode ser no começo, mas o consumo de canela com ovo no café da manhã é um truque termogênico incrível para acelerar o metabolismo. A canela ajuda a controlar os picos de insulina, transformando o seu ovo matinal em um aliado poderoso da dieta.",
    ingredients: [
      "2 ovos grandes",
      "Canela em pó de boa qualidade",
      "Flor de sal ou sal light (opcional)",
    ],
    instructions:
      "É a variação mais simples e eficaz para o seu café da manhã diário.",
    instructionsSteps: [
      "Ferva água em uma panela pequena.",
      "Coloque os ovos e cozinhe por exatos 7 minutos (gema cremosa) ou 10 minutos (gema firme).",
      "Passe os ovos por água fria, descasque e corte ao meio.",
      "Polvilhe uma pitada de canela sobre as gemas ainda quentes e sirva imediatamente.",
    ],
    objection:
      "Será que fica doce? A canela realça o sabor mineral do ovo sem deixá-lo necessariamente doce. É um sabor terroso e aromático que combina surpreendentemente bem com café preto sem açúcar.",
    masterTip:
      "Se quiser transformar em um lanche mais complexo, sirva com fatias de abacate; a gordura boa do abacate com a canela e o ovo é a tríade perfeita do emagrecimento.",
  },
  {
    id: "ovo-087-fritada-espanhola",
    title: "87. Fritada Espanhola (Tortilla Simples)",
    visual: {
      kind: "placeholder",
      alt: "Tortilha de batatas redonda e alta, dourada e firme, fatiada como uma pizza",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Uma tortilha espanhola alta e amarela, cheia de rodelas de batata e cebola. O exterior é bem dourado. Servida em um prato branco liso. Estilo minimalista e apetitoso. Resolução: 1376x768.",
      comment: "Tortilha de batatas espanhola",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "25 min",
      extraLabel: "Econômico",
      extraValue: "Comida Conforto",
    },
    servings: "4 porções",
    premise:
      "A Tortilla de Patatas é o orgulho da Espanha, mas você pode fazer uma versão rápida e deliciosa em casa com o que já tem na despensa. Usar a airfryer para as batatas deixa tudo mais rápido e menos calórico antes de unir aos ovos.",
    ingredients: [
      "5 a 6 ovos grandes",
      "2 batatas grandes cortadas em rodelas bem finas",
      "1 cebola grande fatiada",
      "Azeite de oliva e sal a gosto",
    ],
    instructions:
      "O truque é misturar as batatas cozidas nos ovos antes de levar para a frigideira.",
    instructionsSteps: [
      "Cozinhe as batatas na airfryer ou frite levemente no azeite até ficarem macias e douradas.",
      "Refogue a cebola no azeite até ficar transparente e macia.",
      "Em uma tigela grande, bata os ovos com o sal e misture as batatas e cebolas mornas. Deixe descansar por 2 minutos para os sabores unirem.",
      "Aqueça uma frigideira média com azeite e despeje a mistura.",
      "Cozinhe em fogo baixo até o fundo dourar bem e as bordas firmarem.",
      "Vire com a ajuda de um prato e doure o outro lado por 2 minutos.",
    ],
    objection:
      "Tenho medo de virar e fazer uma bagunça! Use um prato que seja maior que a boca da frigideira. Coloque o prato sobre a panela, vire com firmeza e deslize a tortilha de volta para o fogo. É o rito de passagem de todo cozinheiro!",
    masterTip:
      "Não corte as batatas em cubos, fatias finas garantem uma estrutura muito mais estável para a tortilha.",
  },
  {
    id: "ovo-088-omelete-nuvem-leite",
    title: "88. Omelete Nuvem (Fofinha)",
    visual: {
      kind: "placeholder",
      alt: "Omelete dobrada muito alta e esponjosa, decorada com ervas finas verdes",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Uma omelete dourada que parece um suflê, dobrada em um prato claro. O interior é visivelmente aerado. Ervas frescas picadas por cima dão o toque final. Estilo café da manhã elegante. Resolução: 1376x768.",
      comment: "Omelete fofinha aerada",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Gourmet",
      extraValue: "Cremosa",
    },
    servings: "2 porções",
    premise:
      "Esta omelete parece que veio de uma cafeteria francesa. Ao misturar o creme de leite nos ovos, você cria uma massa que infla e mantém a maciez por muito mais tempo. É a receita perfeita para quando você quer se sentir especial logo cedo.",
    ingredients: [
      "4 ovos grandes",
      "4 colheres (sopa) de creme de leite (pode ser o de caixinha)",
      "1 colher (sopa) de manteiga",
      "Ervas frescas (salsa, cebolinha, tomilho)",
      "Sal e pimenta-do-reino",
    ],
    instructions: "Bata rapidamente e leve logo para o fogo alto.",
    instructionsSteps: [
      "Bata os ovos com o creme de leite, sal e pimenta até ficar uma mistura homogênea.",
      "Derreta a manteiga em uma frigideira antiaderente quente.",
      "Despeje os ovos e deixe cozinhar em fogo médio-alto.",
      "Conforme as bordas firmarem, empurre levemente com um garfo permitindo que a parte líquida escorra para o fundo.",
      "Dobre a omelete ao meio quando estiver quase seca por cima, polvilhe as ervas e sirva.",
    ],
    objection:
      "Ela murcha muito rápido? Toda omelete alta tende a baixar um pouquinho ao encontrar o ar mais frio, mas o creme de leite ajuda a manter a estrutura fofinha por dentro mesmo depois de murchar levemente por fora.",
    masterTip:
      "Para um toque de chef, adicione uma pitada minúscula de fermento químico (de bolo) na massa antes de bater.",
  },
  {
    id: "ovo-089-mexidos-cogumelos",
    title: "89. Ovos Mexidos com Cogumelos",
    visual: {
      kind: "placeholder",
      alt: "Ovos mexidos cremosos com fatias escuras de cogumelos frescos salteados entre as claras e gemas",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Prato escuro com ovos mexidos úmidos. Fatias de cogumelos Paris e Shimeji douradas se destacam na mistura amarela. Toque de noz-moscada e tomilho fresco. Estilo jantar leve sofisticado. Resolução: 1376x768.",
      comment: "Ovos mexidos com cogumelos",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Sofisticado",
      extraValue: "Low Carb",
    },
    servings: "2 porções",
    premise:
      "Se você quer elevar o nível dos seus ovos mexidos, os cogumelos são o caminho. Eles trazem um sabor 'terroso' e uma textura carnuda que transforma um prato simples em algo digno de jantar. É uma opção chique, leve e cheia de aminoácidos complexos.",
    ingredients: [
      "6 ovos frescos",
      "200g de cogumelos frescos (Paris, Shimeji ou Portobello)",
      "Azeite de oliva extra virgem",
      "Noz-moscada ralada na hora",
      "Sal, pimenta e tomilho fresco",
    ],
    instructions:
      "Os cogumelos devem ser dourados primeiro para soltarem todo o sabor.",
    instructionsSteps: [
      "Limpe os cogumelos com um guardanapo seco e corte em fatias.",
      "Na frigideira com azeite, salteie os cogumelos em fogo alto até dourarem.",
      "Bata os ovos em uma tigela com sal e a noz-moscada.",
      "Reduza o fogo e despeje os ovos sobre os cogumelos.",
      "Mexa delicadamente até o ponto desejado, mantendo a cremosidade.",
      "Finalize com o tomilho fresco e sirva com uma fatia de pão integral.",
    ],
    objection:
      "Meus cogumelos soltaram muita água e deixaram o ovo mole! Nunca lave cogumelos em água corrente (eles são como esponjas). Limpe com um pano úmido ou papel toalha. Além disso, frite-os em fogo bem alto e só coloque o sal no final para não desidratarem prematuramente.",
    masterTip:
      "Um pinguinho de molho shoyu nos cogumelos enquanto douram dá uma cor linda e um sabor profundo (umami).",
  },
  {
    id: "ovo-090-pizzovo",
    title: "90. Pizzovo (Omelete Pizza)",
    visual: {
      kind: "placeholder",
      alt: "Omelete aberta redonda coberta com queijo derretido, rodelas de tomate, azeitonas e MUITO orégano",
      prompt:
        "Fotografia gastronômica horizontal (16:9). Uma omelete aberta numa frigideira, com cobertura idêntica a uma pizza Marguerita: queijo mussarela branco, rodelas vermelhas de tomate e azeitonas pretas. Orégano polvilhado por cima. Estilo criativo saudável. Resolução: 1376x768.",
      comment: "Omelete estilo pizza",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "10 min",
      extraLabel: "Sucesso",
      extraValue: "Rápido",
    },
    servings: "2 a 3 porções",
    premise:
      "Bateu aquela vontade de pizza mas quer manter a dieta? O Pizzovo é o salvador! Usamos uma base de ovos firme para sustentar a cobertura clássica de tomate, queijo e orégano. É rápido, mata o desejo da 'jacada' e é 100% low carb.",
    ingredients: [
      "4 ovos grandes",
      "200g de queijo mussarela ralado",
      "1 tomate grande em rodelas",
      "Azeitonas a gosto",
      "Orégano seco abundante",
      "Sal e um fio de azeite",
    ],
    instructions:
      "Prepare a base de ovo como se fosse a massa da pizza e tampe para derreter o queijo.",
    instructionsSteps: [
      "Bata os ovos com sal e despeje em uma frigideira antiaderente untada.",
      "Mantenha o fogo bem baixo. Quando a omelete estiver firme, espalhe o queijo mussarela por cima.",
      "Acomode as rodelas de tomate e as azeitonas.",
      "Polvilhe bastante orégano (é o cheiro de pizza!).",
      "Tampe a frigideira por 3 a 4 minutos até o queijo borbulhar de derretido.",
      "Deslize para um prato e corte em triângulos, como uma pizza real.",
    ],
    objection:
      "A base ficou queimada embaixo mas o queijo não derreteu em cima? O segredo é fogo MÍNIMO e a tampa da panela. A tampa cria um forno que derrete o queijo no vapor enquanto a base termina de assar lentamente.",
    masterTip:
      "Pode variar os recheios: adicione manjericão fresco, cubinhos de presunto ou até rodelas de cebola bem fininhas.",
  },
];
