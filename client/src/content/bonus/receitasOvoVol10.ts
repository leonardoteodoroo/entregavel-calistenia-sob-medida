import type { Recipe } from "./bonusRecipeTypes";

export const receitasOvoVol10: Recipe[] = [
  {
    id: "ovo-091-omelete-abobora-forno",
    title: "91. Omelete de Abóbora de Forno",
    visual: {
      kind: "placeholder",
      alt: "Omelete alta e laranjada servida em quadrados, com textura de suflê e queijo gratinado por cima",
      prompt: "Fotografia gastronômica horizontal (16:9). Refratário de cerâmica com uma omelete de abóbora assada e dourada. Cortada em quadrados perfeitos que mostram a cor laranja vibrante da abóbora e o verde da salsa. Estilo saudável e suculento. Resolução: 1376x768.",
      comment: "Omelete de abóbora assada",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "15 min", total: "45 min", extraLabel: "Leve", extraValue: "Assada" },
    servings: "6 porções",
    premise: "Esta omelete de forno tem uma textura que lembra um suflê, mas é muito mais prática. A abóbora cozida traz doçura e uma cor linda, além de deixar a massa super úmida. É perfeita para preparar enquanto você faz outras coisas e servir um almoço rico e leve.",
    ingredients: [
      "5 ovos grandes",
      "500g de abóbora cabotiá ou paulista (em cubinhos pequenos)",
      "2 colheres (sopa) de requeijão ou cream cheese",
      "1 cebola média picadinha",
      "1 colher (sopa) de queijo parmesão ralado",
      "1 colher (chá) de fermento em pó",
      "Sal e salsa picada abundantes"
    ],
    instructions: "O truque é levar ao forno para ela crescer e gratinar por igual.",
    instructionsSteps: [
      "Bata os ovos com o requeijão, a cebola picada, o sal e a salsa até ficar bem misturado.",
      "Junte os cubinhos de abóbora (crus ou levemente pré-cozidos no vapor) e o fermento.",
      "Misture tudo delicadamente com uma colher.",
      "Despeje em uma forma untada e polvilhada com um pouquinho de farinha ou farelo de aveia.",
      "Salpique o queijo ralado por cima e asse em forno preaquecido (180°C) por uns 30 minutos.",
      "Sirva cortada em quadrados bem bonitos."
    ],
    objection: "A minha abóbora ficou dura no meio? Se você cortar pedaços muito grandes da abóbora crua, ela pode demorar mais que o ovo para assar. O segredo é picar em cubos bem pequenos (tipo 1cm) ou dar uma pré-cozida de 5 minutos no micro-ondas antes de misturar.",
    masterTip: "Substituir a salsa por sálvia fresca eleva o sabor da abóbora a um nível de restaurante chique."
  },
  {
    id: "ovo-092-mexidos-soja-proteico",
    title: "92. Ovos Mexidos Proteicos (Opção Veggie)",
    visual: {
      kind: "placeholder",
      alt: "Ovos mexidos com grânulos de proteína vegetal, bem temperados com ervas secas e azeite",
      prompt: "Fotografia gastronômica horizontal (16:9). Tigela rústica com ovos mexidos misturados a um refogado de soja bem sequinho. Note os fios de manjericão fresco por cima. Estilo fitness funcional. Resolução: 1376x768.",
      comment: "Ovos mexidos com proteína de soja",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "30 min (hidratação)", total: "40 min", extraLabel: "Alta Proteína", extraValue: "Vegetariano" },
    servings: "2 porções",
    premise: "Para quem quer bater as metas de proteína do dia sem exagerar na carne, esta combinação de ovos com proteína de soja granulada é imbatível. Ela absorve o tempero do refogado e dá uma textura 'carnuda' aos ovos mexidos, criando um prato que sacia por horas.",
    ingredients: [
      "2 ovos grandes",
      "30g de proteína de soja granulada fina",
      "1 cebola picada e 1 dente de alho",
      "Manjericão, orégano, sal e um fio de azeite"
    ],
    instructions: "Hidratar bem a soja é o passo mais importante para o sabor.",
    instructionsSteps: [
      "Deixe a soja de molho em água quente (com um pingo de vinagre ou limão) por 30 minutos. Escorra e aperte bem para sair todo o líquido.",
      "Em uma frigideira com azeite, refogue a cebola e o alho até dourarem.",
      "Junte a soja escorrida e frite bem por uns 3 minutos para ela pegar o gosto do refogado e ficar sequinha.",
      "Tempere com as ervas e o sal.",
      "Adicione os ovos batidos e mexa na panela até estarem cozidos e úmidos."
    ],
    objection: "A soja ficou com gosto de papelão? A proteína de soja é neutra e precisa de muito tempero. Use o limão na hidratação para tirar aquele cheiro característico e não economize no manjericão e no alho durante o refogado.",
    masterTip: "Esguiche meio limão sobre a soja no momento da fritura para garantir um sabor fresco."
  },
  {
    id: "ovo-093-virado-vagem-ovo",
    title: "93. Virado de Vagem e Ovos",
    visual: {
      kind: "placeholder",
      alt: "Prato rústico com um mexido de farinha de milho, vagem verde e pedaços de ovos mexidos, decorado com azeitonas pretas",
      prompt: "Fotografia gastronômica horizontal (16:9). Prato fundo de cerâmica com um virado úmido de vagem, farinha de milho e ovos. As vagens verdes brilhantes contrastam com o amarelo do ovo e o preto das azeitonas. Estilo comida de interior. Resolução: 1376x768.",
      comment: "Virado de vagem com ovo",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "10 min", total: "20 min", extraLabel: "Regional", extraValue: "Comida de Casa" },
    servings: "3 porções",
    premise: "O virado é aquela comida típica brasileira que resolve qualquer almoço. Aqui, unimos a crocância da vagem fatiada com a maciez dos ovos e a textura da farinha de milho. É um prato confortável, daqueles que lembram cozinha de vó e que pedem apenas um arroz branco como acompanhamento.",
    ingredients: [
      "4 ovos grandes",
      "300g de vagem fresca (cortada em pedaços de 3cm)",
      "2 xícaras de farinha de milho em flocos",
      "½ xícara de azeitonas pretas picadas",
      "Manteiga de boa qualidade e cebola picada",
      "Sal e pimenta a gosto"
    ],
    instructions: "O segredo é deixar a vagem macia antes de unir ao restante.",
    instructionsSteps: [
      "Na panela, refogue a cebola e a vagem na manteiga em fogo baixo até a vagem ficar macia (mas ainda firme ao dente).",
      "Tempere com sal e pimenta.",
      "Junte a farinha de milho e cozinhe por uns 3 minutos, mexendo para ela umedecer com a manteiga e o vapor da vagem.",
      "Em outra frigideira, faça ovos mexidos rápidos com o restante da manteiga.",
      "Misture os ovos prontos e as azeitonas ao virado e sirva imediatamente."
    ],
    objection: "A mistura ficou muito seca e esfarelando? Isso acontece se faltar gordura (manteiga) ou se a farinha cozinhar demais sozinha. O virado deve ser 'úmido'. Se estiver seco, pingue uma ou duas colheres de água quente ou mais um pouco de manteiga no final.",
    masterTip: "Adicione uma pimenta dedo-de-moça picadinha para dar um 'calor' especial ao virado."
  },
  {
    id: "ovo-094-pastel-ovo-caipira",
    title: "94. Pastel de Ovo (Feira em Casa)",
    visual: {
      kind: "placeholder",
      alt: "Pastel dourado e crocante com bolhas na massa, aberto ao meio revelando um ovo de gema mole dentro",
      prompt: "Fotografia gastronômica horizontal (16:9). Um pastel grande e super crocante (com bolhinhas de fritura) sobre um guardanapo de papel. Ao morder, vê-se o ovo inteiro frito lá dentro com a gema brilhante escorrendo levemente. Estilo comida de rua brasileira. Resolução: 1376x768.",
      comment: "Pastel recheado com ovo",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "5 min", total: "15 min", extraLabel: "Fim de Semana", extraValue: "Crocante" },
    servings: "1 pastel por pessoa",
    premise: "Você já comeu o famoso pastel de ovo de feira? Ele é uma técnica divertida onde quebramos o ovo cru diretamente dentro da massa de pastel antes de fechar e fritar. É a experiência suprema de crocância por fora e gema suculenta por dentro.",
    ingredients: [
      "Massa de pastel de feira (tamanho grande)",
      "1 ovo para cada pastel",
      "Orégano e sal",
      "Óleo para fritar"
    ],
    instructions: "O desafio é fechar a massa sem deixar o ovo escapar.",
    instructionsSteps: [
      "Abra a massa de pastel em um prato fundo (isso ajuda a segurar o ovo no lugar).",
      "Quebre o ovo cru com muito cuidado sobre o centro da massa.",
      "Tempere imediatamente com sal e orégano.",
      "Dobre a massa e feche as bordas com um garfo, apertando muito bem para não vazar o ovo no óleo quente.",
      "Frite em óleo bem quente. Para gema mole, retire assim que dourar. Para gema firme, deixe dourar um pouco mais em fogo médio."
    ],
    objection: "O ovo vazou todo e sujou o óleo! O truque do prato fundo é essencial para o ovo não escorregar. Além disso, verifique se a massa não tem furos e aperte bem os dentes do garfo nas bordas.",
    masterTip: "Pode acrescentar uma fatia de mussarela ou um pouco de carne moída pronta junto com o ovo para um 'Pastel Turbinado'."
  },
  {
    id: "ovo-095-ovoiche-sanduiche-fit",
    title: "95. 'Ovoíche' (O Sanduíche sem Pão)",
    visual: {
      kind: "placeholder",
      alt: "Torre pequena feita de dois ovos cozidos grandes cortados ao meio recheados com queijo, tomate e rúcula, presos com um palito",
      prompt: "Fotografia gastronômica horizontal (16:9). Buffet de petiscos frescos. Ovos cozidos imitando mini sanduíches: as metades de clara são o pão, recheadas com camadas coloridas de queijo, rodela de tomate e folha de rúcula. Presos por palitos longos com uma azeitona na ponta. Estilo elegante e zero carb. Resolução: 1376x768.",
      comment: "Sanduíche de ovo cozido",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "10 min", total: "20 min", extraLabel: "Zero Carbo", extraValue: "Criativo" },
    servings: "3 'sanduíches'",
    premise: "Quer um sanduíche mas está fugindo do glúten? O 'Ovoíche' usa o próprio ovo cozido como se fosse um mini pão de hambúrguer. Você corta ao meio, recheia com tudo que gosta e tem um snack proteico, lindo e super instagramável.",
    ingredients: [
      "3 ovos grandes cozidos duros",
      "Fatias pequenas de queijo minas ou mussarela",
      "Rodelas de tomate cereja ou tomate comum (pequenas)",
      "Folhas de rúcula fresca",
      "Azeitonas e chia (opcional)",
      "Palitos de dente para prender"
    ],
    instructions: "É um trabalho artesanal de montagem que compensa no visual e no sabor.",
    instructionsSteps: [
      "Cozinhe os ovos por 10 a 12 minutos para ficarem bem firmes. Passe na água fria e descasque.",
      "Corte o ovo ao meio no sentido horizontal (como um pãozinho).",
      "Coloque uma folha de rúcula na base, uma fatia de queijo e uma rodela de tomate.",
      "Feche com a outra metade do ovo.",
      "Espete um palito no centro para segurar tudo e finalize com uma azeitona na ponta do palito.",
      "Polvilhe chia por cima para decorar."
    ],
    objection: "O ovo escorrega e o sanduíche não para em pé? Se o ovo estiver muito úmido, ele vai deslizar. Seque as metades de ovo com papel toalha antes de montar. O palito é essencial para a estrutura.",
    masterTip: "Pode passar uma pontinha de mostarda dijon dentro do ovo para um sabor mais picante e sofisticado."
  },
  {
    id: "ovo-096-panqueca-doce-maca",
    title: "96. Panqueca Doce de Maçã e Canela",
    visual: {
      kind: "placeholder",
      alt: "Panqueca amarelada e macia dobrada num prato, com fatias de maçã caramelizada aparecendo",
      prompt: "Fotografia gastronômica horizontal (16:9). Uma panqueca dourada servida num prato de porcelana clara, polvilhada com canela. Ao lado, uma maçã fatiada. O estilo é de um café da manhã doce e saudável em uma manhã ensolarada. Resolução: 1376x768.",
      comment: "Panqueca de maçã funcional",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "5 min", total: "10 min", extraLabel: "Doce & Saudável", extraValue: "Sem Açúcar" },
    servings: "1 porção por pessoa",
    premise: "Quem disse que o ovo só brilha no salgado? Esta panqueca de apenas dois ingredientes (ovo e maçã) é o nosso segredo para um café da manhã doce, funcional e sem culpa. A maçã ralada solta seu açúcar natural e a canela perfuma a cozinha inteira.",
    ingredients: [
      "1 ovo grande",
      "1 maçã pequena bem ralada (com casca)",
      "1 colher (chá) de canela em pó",
      "Um fiozinho de óleo de coco para untar"
    ],
    instructions: "Mistura tudo e vai pra frigideira, é rápido assim!",
    instructionsSteps: [
      "Rale a maçã no ralo grosso (pode manter a casca para mais fibras).",
      "Em uma tigela, bata o ovo com a canela e misture a maçã ralada.",
      "Aqueça uma frigideira antiaderente untada.",
      "Despeje a mistura e espalhe com o dorso da colher para ficar redondinha.",
      "Doure dos dois lados em fogo médio, tomando cuidado para não quebrar na hora de virar."
    ],
    objection: "Ela ficou mole demais e quebrou quando tentei virar? A maçã solta água, o que torna a panqueca delicada. O truque é usar uma frigideira pequena e esperar ela estar bem dourada nas bordas antes de usar uma espátula larga para virar com segurança.",
    masterTip: "Sirva com um fio de mel ou xarope de agave e algumas nozes picadas por cima."
  },
  {
    id: "ovo-097-cookies-coco-clara",
    title: "97. Beijinhos de Coco e Clara (Cookies Light)",
    visual: {
      kind: "placeholder",
      alt: "Pequenos biscoitos brancos e rústicos de coco saindo do forno numa assadeira",
      prompt: "Fotografia gastronômica horizontal (16:9). Biscoitos de coco redondos e fofinhos (tipo suspiros rústicos) em cima de papel manteiga. A cor é branca com pontas levemente douradas. Estilo snack saudável e leve. Resolução: 1376x768.",
      comment: "Cookies de clara de ovo e coco",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "10 min", total: "30 min", extraLabel: "Low Carb", extraValue: "Snack Doce" },
    servings: "Rende 12 a 15 biscoitinhos",
    premise: "Sobrou clara de alguma receita? Transforme em cookies! Com apenas claras e coco ralado, você faz um biscoitinho leve, que derrete na boca e mata a vontade de doce sem pesar na dieta. É o acompanhamento ideal para o chá da tarde.",
    ingredients: [
      "4 claras de ovo",
      "200g de coco ralado seco (sem açúcar)",
      "100g de adoçante culinário ou açúcar mascavo",
      "1 colher (sopa) de amido de milho (maizena)"
    ],
    instructions: "Bater as claras em neve é o que garante a leveza do biscoito.",
    instructionsSteps: [
      "Misture o coco, o adoçante e o amido em uma tigela.",
      "Bata as claras na batedeira até ficarem em neve bem firme (até virar a tigela e elas não caírem).",
      "Misture delicadamente o seco nas claras usando uma espátula, com movimentos de baixo para cima para não perder o ar.",
      "Distribua pequenas porções na assadeira forrada com papel manteiga.",
      "Asse em forno preaquecido (180°C) por 15 minutos até dourar levemente."
    ],
    objection: "Eles ficaram murchos depois de esfriar? Guarde em um pote bem fechado assim que esfriarem por completo. Se o tempo estiver úmido, eles tendem a absorver água do ar. Mas o sabor continua maravilhoso!",
    masterTip: "Afunde um pedacinho de chocolate amargo no centro de cada cookie antes de levar ao forno para uma surpresa deliciosa."
  },
  {
    id: "ovo-098-torta-pao-iogurte",
    title: "98. Torta Rápida de Pão e Iogurte",
    visual: {
      kind: "placeholder",
      alt: "Torta de forno quadrada feita de cubos de pão imersos num creme de ovo, servida quente",
      prompt: "Fotografia gastronômica horizontal (16:9). Torta de forno dourada no refratário quadrado. Dá pra ver os cubinhos de pão e a crosta de queijo parmesão ralado por cima. Estilo refeição rápida reconfortante. Resolução: 1376x768.",
      comment: "Torta de pão de ovo com iogurte",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "10 min", total: "35 min", extraLabel: "Prático", extraValue: "Aproveitamento" },
    servings: "3 porções fartas",
    premise: "Esta torta é um achado! O iogurte natural deixa o creme de ovos muito mais leve e aerado, e o pão comum (integral ou branco) absorve todo esse caldo, virando uma torta suculenta por dentro e crocante por cima. Ótima para um jantar de última hora.",
    ingredients: [
      "3 ovos grandes",
      "1 copo de iogurte natural (170g)",
      "4 fatias de pão de forma ou pão amanhecido em cubos",
      "4 colheres (sopa) de parmesão ralado",
      "Sal, noz-moscada e um fio de azeite"
    ],
    instructions: "O pão precisa de um minuto para 'beber' o creme antes de ir pro forno.",
    instructionsSteps: [
      "Bata os ovos com o iogurte, sal e noz-moscada.",
      "Corte o pão em quadradinhos e coloque em um refratário untado.",
      "Despeje o creme de iogurte sobre o pão e aperte com uma colher para ele absorver bem o líquido.",
      "Polvilhe o parmesão por cima.",
      "Leve ao forno (200°C) por 20 a 25 minutos até dourar e firmar."
    ],
    objection: "O fundo ficou molhado demais? Se o pão não absorver todo o iogurte, ele pode cozinhar em excesso no fundo. Espere uns 3 minutos com o pão mergulhado no creme antes de colocar no forno, assim o líquido será distribuído por igual.",
    masterTip: "Adicione cubinhos de presunto ou tomate cereja no meio do pão para deixar a torta mais colorida e completa."
  },
  {
    id: "ovo-099-gemada-vovo-cremosa",
    title: "99. Gemada Cremosa da Vovó",
    visual: {
      kind: "placeholder",
      alt: "Taça de vidro com um creme de gema pálido e fofinho, servido com uma pequena canela em pau ao lado",
      prompt: "Fotografia gastronômica horizontal (16:9). Close em uma taça elegante contendo gemada batida longa mente, de cor quase branca. Super aerada. Fundo com luz quente de lareira ou sala aconchegante. Resolução: 1376x768.",
      comment: "Gemada clássica batida",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "5 min", total: "15 min", extraLabel: "Energético", extraValue: "Conforto" },
    servings: "2 porções (ou uma taça grande)",
    premise: "Muita gente torce o nariz, mas quem conhece sabe: uma gema bem batida com açúcar vira um creme tão aveludado e potente que é quase um abraço em forma de doce. É a bebida energética natural que gerações usaram para aquecer o corpo nas noites frias.",
    ingredients: [
      "5 gemas frescas (peneiradas para tirar a película)",
      "5 colheres (sopa) de açúcar ou adoçante culinário",
      "Canela em pó (opcional)",
      "Café quente ou leite quente para acompanhar"
    ],
    instructions: "Bater muito bem é o segredo para sumir o gosto de ovo e virar um creme pálido.",
    instructionsSteps: [
      "Coloque as gemas e o açúcar na batedeira.",
      "Bata em velocidade alta por pelo menos 10 ou 15 minutos.",
      "A mistura deve mudar de cor (de amarelo para quase branco) e triplicar de volume, ficando muito leve.",
      "Sirva pura, ou acrescente café bem quente por cima, misturando devagar."
    ],
    objection: "Tenho medo de salmonela com a gema crua! Use sempre ovos frescos de procedência garantida. Se preferir, você pode bater as gemas no açúcar em banho-maria (sem encostar a tigela na água quente) até ficarem mornas e aeradas, garantindo assim o cozimento térmico.",
    masterTip: "Um tiquinho de raspas de limão ou extrato de baunilha na batedeira retira qualquer resquício de cheiro de ovo."
  },
  {
    id: "ovo-100-frittata-espinafre",
    title: "100. Frittata Clássica de Espinafre",
    visual: {
      kind: "placeholder",
      alt: "Omelete de forno grossa e verde servida numa travessa de branco, fatiada mostrando o espinafre suculento por dentro",
      prompt: "Fotografia gastronômica horizontal (16:9). Uma frittata elegante e fofa, rica em folhas de espinafre verde oliva. A superfície é manchada de dourado do queijo assado. Estilo café da manhã europeu chique. Resolução: 1376x768.",
      comment: "Frittata de ovos e espinafre",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: { prep: "10 min", total: "20 min", extraLabel: "Saudável", extraValue: "Low Carb" },
    servings: "2 a 3 porções",
    premise: "Chegamos à receita número 100 com um clássico absoluto. A frittata de espinafre é o equilíbrio perfeito entre leveza e nutrição. Diferente da omelete, a frittata termina no forno, o que dá a ela uma altura e maciez superiores. É o fechamento perfeito para a nossa primeira centena.",
    ingredients: [
      "3 a 4 ovos grandes",
      "1 xícara de espinafre fresco picado",
      "½ cebola picadinha",
      "Azeite, sal e pimenta-do-reino",
      "Parmesão ralado para finalizar"
    ],
    instructions: "Começa no fogão e termina de dourar no calor do forno.",
    instructionsSteps: [
      "Refogue a cebola e o espinafre no azeite até murcharem bem.",
      "Em uma tigela, bata bem os ovos e junte o refogado de espinafre.",
      "Misture tudo e despeje de volta em uma frigideira (que possa ir ao forno) ou assadeira pequena.",
      "Mantenha no fogo baixo por 2 minutos para firmar a base.",
      "Leve ao forno por 15 minutos até inflar levemente e dourar o topo com parmesão.",
      "Sirva quente ou morna."
    ],
    objection: "Minha frittata ficou solada e dura? O ovo não pode 'assar' até secar demais. Assim que o centro estiver firme (se você balançar o prato ele não deve estar líquido), retire do forno. O calor residual termina o trabalho.",
    masterTip: "Adicione uns cubinhos de queijo feta ou ricota para pedaços de cremosidade extra no meio do verde do espinafre."
  }
];
