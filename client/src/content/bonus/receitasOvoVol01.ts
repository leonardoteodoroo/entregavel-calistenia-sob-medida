import type { Recipe } from "./bonusRecipeTypes";

export const receitasOvoVol01: Recipe[] = [
  {
    id: "ovo-001-toast-requeijao",
    title: "1. Toast de Ovo com Requeijão",
    visual: {
      kind: "placeholder",
      alt: "Toast crocante coberto com ovos mexidos cremosos e requeijão",
      prompt:
        "Fotografia gastronômica horizontal (16:9), luz natural de manhã iluminando um toast rústico com ovos mexidos extremamente cremosos e requeijão, servido em um prato de cerâmica fosca cor taupe. Tons Ivory e Rose ao fundo. Estilo editorial wellness minimalista. Resolução: 1376x768.",
      comment: "Placeholder para Toast de Ovo",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "10 min",
      extraLabel: "Rendimento",
      extraValue: "2 porções",
    },
    servings: "2 porções",
    premise:
      "Sabe aquele dia que você quer um café da manhã rápido, mas com cara de hotel? Esse toast une a crocância do pão torradinho com a cremosidade do requeijão derretido no ovo. Perfeito para começar o dia maravilhosa!",
    ingredients: [
      "2 ovos",
      "1 colher (sopa) de requeijão cremoso (ou creme de ricota)",
      "1 pitada de sal",
      "Um fio de azeite (ou manteiga) para a frigideira",
      "2 fatias do seu pão favorito",
    ],
    instructions:
      "Você dá uma aquecida na frigideira, bate os ovos rapidinho e joga lá. O segredo é mexer de fora pra dentro e desligar o fogo enquanto ainda está molhadinho, para o requeijão derreter só com o calor da panela. Depois é só colocar no pão e dar uma tostada na Airfryer.",
    instructionsSteps: [
      "Aqueça o azeite ou manteiga na frigideira em fogo baixo.",
      "Bata levemente os ovos com o sal e coloque na frigideira.",
      "Mexa com uma espátula, trazendo as bordas para o centro.",
      "Com os ovos ainda úmidos, desligue o fogo e misture o requeijão.",
      "Espalhe por cima das fatias de pão.",
      "Leve à Airfryer ou forno por uns minutinhos só para o pão dourar por baixo e o topo gratinar.",
    ],
    objection:
      "Acha que o pão vai ficar mole e encharcado? O truque é colocar o creme de ovos no pão em temperatura ambiente e levar ao calor forte da Airfryer logo em seguida. Assim, cria casquinha embaixo e não passa do ponto em cima.",
    masterTip:
      "Esfregue meio dente de alho cru no pão antes de colocar os ovos. Dá um aroma maravilhoso de padaria artesanal!",
  },
  {
    id: "ovo-002-ovo-poche",
    title: "2. Ovo Pochê Perfeito",
    visual: {
      kind: "placeholder",
      alt: "Ovo pochê perfeito com a gema mole escorrendo sobre o prato",
      prompt:
        "Fotografia gastronômica horizontal (16:9), close-up de um ovo pochê perfeito sendo cortado, com a gema dourada e cremosa escorrendo suavemente. Fundo clean e iluminado, estilo editorial wellness. Resolução: 1376x768.",
      comment: "Placeholder para Ovo Pochê",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "2 min",
      total: "6 min",
      extraLabel: "Rendimento",
      extraValue: "2 porções",
    },
    servings: "2 porções",
    premise:
      "Ovo pochê parece coisa de chef, ne? Mas juro que é super fácil quando você pega o jeito. A gema molinha escorrendo é aquele toque elegante pra você se sentir em um restaurante chique dentro da própria cozinha.",
    ingredients: [
      "3 xícaras (chá) de água",
      "2 ovos frescos (isso ajuda muito a clara não espalhar)",
      "1 colher (sopa) de vinagre branco",
      "Sal e pimenta do reino a gosto",
    ],
    instructions:
      "Você ferve a água com o vinagre, desliga o fogo e coloca o ovo com cuidado. Ele vai cozinhar super delicado na água quente, sem aquela fervura forte destruindo tudo.",
    instructionsSteps: [
      "Coloque a água e o vinagre em uma frigideira funda ou panela e deixe ferver.",
      "Assim que ferver, desligue o fogo.",
      "Quebre o ovo em uma xícara pequena e deslize ele com bastante delicadeza para dentro da água.",
      "Tampe a panela rapidamente.",
      "Deixe lá por cerca de 4 minutinhos, até a clara firmar.",
      "Retire com uma escumadeira, escorra a aguinha e tempere com sal e pimenta.",
    ],
    objection:
      "A clara sempre desmancha e vira uma bagunça na panela? O erro mais comum é deixar a água fervendo borbulhante. Desligando o fogo logo antes de colocar o ovo, a água continua quente o suficiente para cozinhar, mas calminha o bastante pra não quebrar a clara.",
    masterTip:
      "Sirva por cima de uma torrada bem crocante com um fundinho de espinafre refogado. Fica de outro mundo!",
  },
  {
    id: "ovo-003-ovo-enformado",
    title: "3. Ovo Enformado no Pão",
    visual: {
      kind: "placeholder",
      alt: "Ovo cozido no centro de uma fatia de pão de forma torrada",
      prompt:
        "Fotografia gastronômica horizontal (16:9), vista de cima de uma fatia de pão de forma tostado com um ovo perfeitamente cozido no centro. Servido em prato de cerâmica claro, luz natural da manhã. Estilo editorial wellness minimalista. Resolução: 1376x768.",
      comment: "Placeholder para Ovo Enformado",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "3 min",
      total: "8 min",
      extraLabel: "Rendimento",
      extraValue: "1 porção",
    },
    servings: "1 porção",
    premise:
      "Divertido, lindo e muito prático. Essa receita junta o pão com ovo tradicional num prato só, onde a torrada vira uma forminha que tosta junto com o ovo. Ótima opção pra variar a rotina sem sujar muita coisa.",
    ingredients: [
      "1 ovo",
      "1 fatia do seu pão de forma (sem casca fica mais fácil)",
      "1 dente de alho amassadinho",
      "1 colher (chá) de manteiga",
      "1 colher (chá) de salsinha picada",
      "Sal e pimenta do reino a gosto",
    ],
    instructions:
      "É só fazer um buraco no meio da fatia do pão, colocar na frigideira com manteiga e quebrar o ovo bem no centrinho. O pão frita de um lado enquanto o ovo cozinha no meio. Super simples!",
    instructionsSteps: [
      "Esfregue um pouquinho do alho nos dois lados do pão para dar gosto.",
      "Faça um buraco bem no centro da fatia usando um copo ou cortador pequeno (guarde esse miolinho).",
      "Derreta a manteiga na frigideira em fogo médio.",
      "Coloque o pão com o furo e o miolinho do lado para tostar. Quando dourar o fundo, vire.",
      "Quebre o ovo com cuidado bem no meio do buraco do pão.",
      "Tampe a frigideira para cozinhar o topo do ovo no vapor por uns minutinhos. Desligue.",
      "Tempere com sal, pimenta e salsinha por cima.",
    ],
    objection:
      "Dá medo do ovo vazar por baixo do pão, né? Dá uma leve pressionadinha nas bordas da fatia com a espátula assim que você quebrar o ovo. O calor gruda a base do pão na panela resolvendo o problema.",
    masterTip:
      "Coloca um tiquinho de queijo parmesão ralado na bordinha do pão antes de desligar pra fazer uma crostinha perfeita.",
  },
  {
    id: "ovo-004-shakshuka-simples",
    title: "4. Shakshuka Prática",
    visual: {
      kind: "placeholder",
      alt: "Ovos cozidos em molho de tomate vibrante na frigideira",
      prompt:
        "Fotografia gastronômica horizontal (16:9), frigideira de ferro fundido rústica cheia de um molho de tomate vibrante com ovos cozidos envoltos no molho. Finalizado com ervas frescas. Estilo editorial wellness minimalista. Resolução: 1376x768.",
      comment: "Placeholder para Shakshuka",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "5 min",
      total: "15 min",
      extraLabel: "Rendimento",
      extraValue: "2 porções",
    },
    servings: "2 porções",
    premise:
      "Sabe aquele jantar fácil com cara de chique? Os ovos são cozidos direto num molho de tomate bem temperadinho. Fica super reconfortante e é perfeito pra limpar a frigideira com uma boa torrada.",
    ingredients: [
      "4 ovos",
      "1 pimentão vermelho pequeno picadinho",
      "1 xícara e meia do molho de tomate da sua preferência",
      "Fio de azeite",
      "Pimenta calabresa (se gostar de um ardorzinho)",
      "Sal e manjericão fresco a gosto",
    ],
    instructions:
      "Você dá uma murchada no pimentão com azeite, joga o molho de tomate e deixa encorpar. Aí, com a colher, abre uns espaços no molho e quebra os ovos ali dentro pra cozinharem cobertos na própria panela.",
    instructionsSteps: [
      "Em uma frigideira média, refogue o pimentão no azeite com uma pitada de sal por uns 5 minutinhos.",
      "Coloque o molho de tomate e deixe apurar até começar a dar umas borbulhadas leves.",
      "Abra 4 'buraquinhos' no molho encorpado com uma colher.",
      "Quebre um ovo em cada buraco com cuidado.",
      "Coloque um tiquinho de sal sobre cada gema.",
      "Tampe a frigideira e deixe de 4 a 5 minutos no fogo médio até a clara ficar mais firme e a gema no ponto.",
      "Finalize com manjericão fresco por cima.",
    ],
    objection:
      "Tem medo do molho de tomate espirrar no fogão inteiro? O esquema é manter o fogo super baixo depois que tampar a panela. É esse calor mais calmo que cozinha tudo com perfeição sem fazer sujeira.",
    masterTip:
      "Joga uns pedacinhos de ricota ou queijo feta por cima. O toque salgadinho do queijo com a acidez do tomate fica absurdo!",
  },
  {
    id: "ovo-005-tomate-recheado",
    title: "5. Tomate Recheado com Ovo",
    visual: {
      kind: "placeholder",
      alt: "Tomate assado suculento recheado com ovo e queijo derretido",
      prompt:
        "Fotografia gastronômica horizontal (16:9), tomates vermelhos maduros assados, recheados com ovo cozido perfeito e queijo gratinado derretido. Servido em uma travessa com folhas de manjericão, luz natural e quente. Estilo editorial wellness. Resolução: 1376x768.",
      comment: "Placeholder para Tomate Recheado",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "40 min",
      extraLabel: "Rendimento",
      extraValue: "6 porções",
    },
    servings: "6 porções",
    premise:
      "Lindo de ver e delícia pra comer! A acidez docinha do tomate assado faz aquela cama perfeita pro ovinho e o queijo derretido. Funciona demais como acompanhamento leve ou prato principal mais caprichado.",
    ingredients: [
      "6 tomates maduros mas com a pele firme",
      "6 ovos (os menores, pra não transbordar)",
      "Um punhadão de mussarela ralada (ou queijo minas curado)",
      "Salsinha fresca picadinha a gosto",
      "Sal e pimenta do reino",
    ],
    instructions:
      "Você tira a 'tampa' dos tomates, limpa o miolo por dentro e faz uma caminha com queijo. Depois quebra o ovo lá no fundo, tempera e bota pra assar até a clara ficar branquinha.",
    instructionsSteps: [
      "Corte a tampa dos tomates e dê um pequeno corte reto na base só pra ele não rolar na assadeira.",
      "Tire o miolo cheio de sementes com uma colher de chá, virando uns copinhos. Escorra o caldo que ficar.",
      "Tempere o dentro dos tomates com um pouquinho de sal e pimenta.",
      "Coloque um chorinho de queijo ralado debaixo, fazendo o fundo.",
      "Quebre o ovo em cima do queijo com cuidado.",
      "Arranje os tomatinhos numa forma forrada com papel alumínio (salva na hora de lavar a louça).",
      "Forno a 180°C por uns 25 a 30 minutos, até o ovo firmar do seu gosto.",
    ],
    objection:
      "Tá com trauma do tomate derreter todo no forno que nem purê? Usa tomates não tão moles. Se ele estiver muito maduro, a água interna ferve e desmonta ele inteirinho. Outra dica é não aumentar a temperatura pra mais de 180°C.",
    masterTip:
      "Esfregue o dentro do tomate com folhas de manjericão amassadas antes mesmo de colocar o queijo. Fica chique demais!",
  },
  {
    id: "ovo-006-pao-ovo-airfryer",
    title: "6. Pão com Ovo na Airfryer",
    visual: {
      kind: "placeholder",
      alt: "Pão recheado com ovo assado dourado com mussarela derretida",
      prompt:
        "Fotografia gastronômica horizontal (16:9), vista lateral de um pão de forma crocante escavado, com um ovo dourado assado no centro, levemente gratinado com queijo. Iluminação natural aconchegante. Estilo editorial wellness. Resolução: 1376x768.",
      comment: "Placeholder para Pão com Ovo Airfryer",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "2 min",
      total: "12 min",
      extraLabel: "Rendimento",
      extraValue: "1 porção",
    },
    servings: "1 porção",
    premise:
      "Sabe aqueles dias que a preguiça bate e você só quer jogar algo na Airfryer? Essa é a receita perfeita. Suja zero panelas, fica super crocante nas bordas e macio no meio. Um salva-vidas no café ou lanche da tarde.",
    ingredients: [
      "1 ovo",
      "1 fatia do seu pão de forma preferido (tente os mais grossinhos, tipo brioche)",
      "1 fatia de mussarela (opcional, mas super recomendo)",
      "Um tiquinho de sal e orégano",
    ],
    instructions:
      "É só amassar o miolo do pão pra fazer uma caminha, quebrar o ovo dentro, jogar os temperos e a mussarela por cima, e botar direto na gaveta da Airfryer.",
    instructionsSteps: [
      "Com as costas de uma colher, amasse o centro da fatia de pão, criando uma covinha.",
      "Cuidado para não rasgar o fundo, é só para dar espaço pro ovo não vazar.",
      "Quebre o ovo com jeitinho direto nesse buraco.",
      "Tempere com o sal e o orégano.",
      "Rasgue a mussarela com a mão e ajeite nas bordinhas ou por cima de tudo.",
      "Leve pra Airfryer a 160ºC por uns 10 minutinhos (fique de olho, cada máquina é de um jeito!).",
    ],
    objection:
      "E se o vento forte da Airfryer voar com o ovo cru e sujar tudo? A sacada é amassar bem o miolo e deixar as bordinhas do pão altas formando um 'murinho'. Outro detalhe é não passar de 160ºC, pro vento não virar um furacão ali dentro e não queimar a borda.",
    masterTip:
      "Bota o pão sozinho pra tostar só por 1 minutinho na Airfryer antes de amassar o miolo. Isso dá uma selada na base e impede o ovo cru de deixar a fatia encharcada.",
  },
  {
    id: "ovo-007-pao-cremoso-airfryer",
    title: "7. Pão com Ovo Cremoso na Airfryer",
    visual: {
      kind: "placeholder",
      alt: "Metades de pão francês recheadas com requeijão e ovo",
      prompt:
        "Fotografia gastronômica horizontal (16:9), pão francês rústico cortado ao meio, borbulhando com um recheio extremamente suculento de ovos mexidos, requeijão e queijo. Textura apetitosa, luz focada no recheio cremoso. Estilo editorial wellness. Resolução: 1376x768.",
      comment: "Placeholder para Pão Cremoso",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "4 min",
      total: "9 min",
      extraLabel: "Rendimento",
      extraValue: "2 porções",
    },
    servings: "2 porções",
    premise:
      "Imagina o clássico pão francês quentinho e crocante, abraçando o recheio de ovos mais aveludado e molhadinho de todos. O requeijão se mistura ao ovo quase como um creme. É de comer rezando!",
    ingredients: [
      "2 ovos",
      "1 pão francês (seja de sal ou integral) cortado ao meio de comprido",
      "1 colherada de capricho de um bom requeijão cremoso",
      "1 fatia de mussarela (ou outro queijo que derreta bem)",
      "Azeite pra untar a panela e um pouquinho de sal",
    ],
    instructions:
      "Primeiro a gente dá aquele susto no ovo na panela pra não ressecar, mistura o requeijão, joga no meio do pão francês e coloca a mussarela por cima. Aí vai pra Airfryer só pro pão estalar e o queijo borbulhar.",
    instructionsSteps: [
      "Sujoje a frigideira com um fiozinho de azeite e faça ovos mexidos no fogo baixo. Coloque um tiquinho de sal.",
      "Presta atenção: desligue a panela quando o ovo ainda estiver bem úmido e brilhoso.",
      "Com a panela já desligada, coloque o requeijão e mexa no próprio calor pra virar um creme lindo.",
      "Afunde um pouquinho do miolo das metades do pão francês com os dedos pra caber mais recheio.",
      "Jogue esse creme de ovo nas metades do pão e cubra cada lado com a mussarela.",
      "Coloca na Airfryer a 200ºC por uns 4 a 5 minutinhos só pra gratinar.",
    ],
    objection:
      "Dá vontade de tacar o ovo cru com requeijão no pão e botar na Airfryer de uma vez, né? Não faça isso! O pão francês vai virar pedra de tão duro antes do ovo assar. Fazer o ovinho cremoso antes na panela é o que garante essa textura de padaria profissional.",
    masterTip:
      "Polvilhe uma pitadinha de cheiro-verde picadinho ou orégano em cima da mussarela pouco antes de fechar a gaveta da Airfryer.",
  },
  {
    id: "ovo-008-ovo-frito-agua",
    title: "8. Ovo Frito Saudável na Água",
    visual: {
      kind: "placeholder",
      alt: "Ovo fritando perfeitamente em imersão rasa de água sem óleo",
      prompt:
        "Fotografia gastronômica horizontal (16:9), close de um ovo sendo perfeitamente finalizado numa frigideira antiaderente clara, rodeado por uma fina película de água evaporando, sem bordas queimadas no ovo, estética clean impecável e fit. Estilo editorial wellness. Resolução: 1376x768.",
      comment: "Placeholder para Ovo Frito na Água",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "1 min",
      total: "4 min",
      extraLabel: "Rendimento",
      extraValue: "2 porções",
    },
    servings: "2 porções",
    premise:
      "Tem dia que a gente quer o sabor de um ovo bem estaladinho de padaria, mas sem usar nada de óleo. Fritar na água é o truque de mestre! Não fica branquelo e sem graça igual ovo cozido e salva sua cota de calorias do dia.",
    ingredients: [
      "2 ovos",
      "Um tiquinho de água filtrada (só o suficiente pra cobrir muito rasinho o fundo da panela, papo de 3 colheres de sopa)",
      "Sal e pimenta do reino a gosto",
    ],
    instructions:
      "Você coloca uma fina película de água numa panela pequena, deixa ferver e quebra o ovo em cima. A água faz ele fritar sem grudar, e, se o fundo for bom, ele até dá aquela leve tostadinha de leve quando a água seca toda.",
    instructionsSteps: [
      "Pegue sua menor e melhor frigideira antiaderente. Sendo pequena, a água concentra melhor.",
      "Coloque a aguinha rasa no fundo e ligue no fogo baixo até ferver.",
      "Quebre o ovo primeiro numa xícara, assim se ele espirrar (ou não estiver legal), você não estraga tudo.",
      "Deslize ele pra piscina rasinha de água fervente. Coloque o sal e a pimenta.",
      "Deixa lá! A clara cozinha por baixo e nunca gruda.",
      "Quando a base clarear e firmar, bota uma tampa na panela por 1 minutinho que a gema acaba de chegar no vapor.",
    ],
    objection:
      "Tem gente diz que ovo frito na água tem cheiro estranho de granja. Mentira! A mágica é deixar secar perfeitamente a água. Quando sumir aquele finzinho de líquido da panela, deixa o próprio ovo dar uma tostadinha suave na base só com calor do teflon antes de desligar.",
    masterTip:
      "Sujinho de nada: pingue meeeia gota (sim, de leve mesmo) de azeite num guardanapo e passe na panela fria antes de botar a água. Dá um sabor incrível com calorias quase zero.",
  },
  {
    id: "ovo-009-ninho-legumes",
    title: "9. Ninho de Ovo com Legumes",
    visual: {
      kind: "placeholder",
      alt: "Ninho feito de fios delicados de legumes assados contendo um ovo dourado",
      prompt:
        "Fotografia gastronômica horizontal (16:9), tirinhas finíssimas tipo espaguete de cenoura verde escuro da abobrinha formando um laço perfeitamente redondo que 'nana' um ovo cozinho molinho ao cento, tons vibrantes contrastes, prato limpo off whit. Estilo editorial wellness minimalista. Resolução: 1376x768.",
      comment: "Placeholder para Ninho de Legumes",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "10 min",
      total: "15 min",
      extraLabel: "Rendimento",
      extraValue: "N/A",
    },
    servings: "Vários ninhos pequenos",
    premise:
      "Quer transformar aquele lanche sem graça ou o prato do jantar em algo maravilhoso e ainda super focado nos nutrientes? Esse ninho feito todinho de fios cruzadinhos de vegetais assando abraçado com o ovo é uma lindeza e cheio de saciedade.",
    ingredients: [
      "1 ou 2 ovos pra cada ninho que for fazer",
      "1 fio de azeite de oliva",
      "1 cenoura e 1 abobrinha fatiadas em ziguezague fininho (estilo macarrão)",
      "Sal e um alecrim ou erva fresca que gostar",
    ],
    instructions:
      "O negócio é ralar ou fatiar os legumes compridinhos, fazer um laço (um círculo) no meio da panela e quebrar os benditos ovinhos bem no miolo. A panela cuida de tostar a bordinha enquanto o meio macio do ovo derrete ali dentro.",
    instructionsSteps: [
      "No fundo de uma panela larga antiaderente, umedeça com um pouco de azeite e ligue em fogo médio.",
      "Com a mão ou pegador de macarrão, junte as fitas das cenouras e abobrinhas no formato de círculos, deixando um oco bem no meio como um ninho.",
      "Deixe dar uma seladinha suave nos legumes por uns 2 ou 3 minutinhos.",
      "Quebre com muito amor e carinho um ovo bem no 'buraco' central vegetariano desse ninho.",
      "Tempere a parte do ovinho que sobrou aparecendo e jogue florzinhas de tempero.",
      "Tampe a panela por 5 minutinhos em fogo baixo pra clara firmar em perfeição pelo calorzinho retido.",
    ],
    objection:
      "Tem receio de a água da abobrinha derreter tudo e não virar nada frito? É verdade, elas choram muita água mesmo. O segredo? Depois de ralar no formato de espaguete, dê uma bela espremida nos fios com folhas de papel toalha pra drenar a aguinha extração antes de ir pro fogo.",
    masterTip:
      "Sabe aqueles cortadores ou spiralizers bem manuais? Pra fazer essa receita eles são seus melhores amigos da preguiça de cortar fios.",
  },
  {
    id: "ovo-010-crepioca-recheada",
    title: "10. Crepioca Clássica Recheada",
    visual: {
      kind: "placeholder",
      alt: "Crepioca fina, dobrada ao meio perfeitamente douradinha recheada de frango com queijo cremoso farto e molinho",
      prompt:
        "Fotografia gastronômica horizontal (16:9), zoom numa Crepioca recheadíssima ao centro de um prato fosco rosa acinzentado servida junto guardanapo de linho sob luz cálida para a manhã perfeita de paz em casa. Estilo editorial wellness minimalista. Resolução: 1376x768.",
      comment: "Placeholder para Crepioca Recheada",
      aspectRatio: "16 / 9",
      width: 1376,
      height: 768,
    },
    time: {
      prep: "3 min",
      total: "6 min",
      extraLabel: "Rendimento",
      extraValue: "1 porção",
    },
    servings: "1 porção",
    premise:
      "A salvadora daquelas fomes de fim de tarde! Substitui àquela farinhada do pão de boa e com a elasticidade certinha que uma crepioca de respeito deveria ter. Chega de crepiocas borrachudas e pesadas.",
    ingredients: [
      "1 ovo (temperatura normal de casa é o ideal)",
      "1 colher (sopa) gorda daquela tapioca pronta para uso comercial",
      "Uma pitada amiga de sal",
      "Aqui mora a liberdade: frango desfiado com minas frescal, cream cheese ou atum...",
    ],
    instructions:
      "Batendo na mão no garfo numa mini tijelinha até desfazer as bolotas brancas. Ai deita na frigideira de forma bonita pros dois lados amaciarem sem rasgar e é sucesso.",
    instructionsSteps: [
      "Quebre o ovo sem preguiça e misture na hora com as colheradas do amido da tapioca hidratada de goma e o tiquinho de salzinho.",
      "O rolê é um garfinho agitado bem até que nenhum pelotão empolado permaneça rindo na tigelinha pra te desanimar.",
      "Unte pouco e acenda uma frigideirinha de chapa antiaderente pros teflons segurarem as cascas limpas.",
      "Despeje aquela poça branca fluída e deixe fritar fogo médio tampado pro abafado curar e inflar um tiquinho da beirada dela.",
      "Vire ela pra gratinada levinha e bem calistênico e calmo no miolo esparrame teu super hiper mega cheiroso das proteínas pra fechar a panqueca em duas.",
    ],
    objection:
      "A crepioca não fica uma boia de praia mole rasgando depois? A pressa é o grande demônio nos apressadinhos dos ovos na chapa! Não quebre na virada do lado ainda pastoso líquido demais. Aguenta as beiras arrepiarem, fica paciente pro calor desgrudá-la livre da base pra só depois passar as espátulas ao redor! Magia pura sem virar o terror e sem encharcar",
    masterTip:
      "Escondidinho perfeito: adicione minúsculas florzinhas verdes em coentros picinhos pelo corpo inteiro amofinando no queijinho branco antes de lacrar o taco gostosão da chapa. Cor super viva no corte macio!",
  },
];
