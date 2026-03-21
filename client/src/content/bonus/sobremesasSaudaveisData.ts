import { toPublicPath } from "@/content/siteConfig";

import type { Recipe, RecipeBook } from "./bonusRecipeTypes";

export const introData = {
  title: "SOBREMESAS SAUDAVEIS",
  author: "@semprenamoda.loja",
  volume: "VOL. 2",
  observations: [
    "Amiga, aqui nem toda receita e individual. A regra de ouro e simples: escolha uma porcao por dia e curta seu docinho sem exagero.",
    "A meta dessas sobremesas e matar a vontade de doce com ingredientes mais inteligentes, sem perder a praticidade da rotina real.",
    "Tem receita pra geladeira, freezer, liquidificador e microondas, porque sobremesa boa precisa caber na sua vida e nao o contrario.",
    "E aquele lembrete importante de sempre: essas ideias ajudam demais no dia a dia, mas nao substituem um plano alimentar individualizado com nutricionista.",
  ],
};

const BONUS_RECIPE_IMAGE_BASE = "bonus/sobremesas-saudaveis";

export const recipes: Recipe[] = [
  {
    id: "01",
    title: "Mousse de Maracuja",
    premise:
      "Bateu vontade de um docinho leve depois do almoco, mas voce nao quer cair naquele ciclo de sobremesa pesada? Essa mousse geladinha resolve rapidinho.",
    servings: "2 porcoes",
    time: {
      prep: "5 min",
      total: "35 min",
      extraLabel: "Finalizacao",
      extraValue: "Geladeira 30 min",
    },
    ingredients: [
      "1 copo de iogurte desnatado",
      "1 polpa de maracuja",
      "30g ou 1 scoop de whey protein",
      "Adocante a gosto",
    ],
    instructions:
      "Voce so precisa misturar tudo ate o creme ficar bem uniforme, sem pelotinhas de whey. Depois coloca em um refratario ou em tacinhas e leva pra geladeira ate firmar e ficar naquela textura de sobremesa de vitrine.",
    instructionsSteps: [
      "Coloque o iogurte, a polpa de maracuja, o whey e o adocante em uma tigela.",
      "Misture bem ate virar um creme liso.",
      "Distribua em um refratario ou em tacinhas.",
      "Leve pra geladeira ate gelar bem antes de servir.",
    ],
    objection:
      "Pode parecer que vai ficar com gosto forte de whey, mas o maracuja rouba a cena e deixa tudo com cara de sobremesa caprichada.",
    masterTip:
      "Se quiser mais textura, deixa umas sementinhas da polpa por cima na hora de servir. Fica lindo e da aquela sensacao de doce de restaurante.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/01-mousse-maracuja.webp`),
      alt: "Mousse de maracuja servida em taca de vidro",
    },
  },
  {
    id: "02",
    title: "Shake de Uva Roxa",
    premise:
      "Tem dias em que voce quer um doce gelado, rapido e com cara de lanche premium. Esse shake entrega tudo sem te prender na cozinha.",
    servings: "1 porcao",
    time: {
      prep: "5 min",
      total: "5 min",
      extraLabel: "Finalizacao",
      extraValue: "Liquidificador 2 min",
    },
    ingredients: [
      "4 colheres de sopa de iogurte desnatado",
      "Essencia de baunilha a gosto",
      "20ml de agua",
      "100g de uva roxa sem caroco",
      "Gelo e adocante a gosto",
    ],
    instructions:
      "Joga tudo no liquidificador e bate ate ficar bem cremoso, com aquela cor linda de sobremesa de cafeteria. Sirva na hora pra aproveitar a textura mais geladinha.",
    instructionsSteps: [
      "Coloque o iogurte, a essencia, a agua, as uvas, o gelo e o adocante no liquidificador.",
      "Bata ate ficar bem cremoso e uniforme.",
      "Sirva imediatamente.",
    ],
    objection:
      "Achou que ia ficar ralo? O truque esta no iogurte e no gelo, que deixam o shake encorpado e com cara de sobremesa batida na hora.",
    masterTip:
      "Se quiser um visual ainda mais bonito, reserve duas uvinhas cortadas e finalize no copo antes de servir.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/02-shake-uva-roxa.webp`),
      alt: "Shake de uva roxa servido em copo alto",
    },
  },
  {
    id: "03",
    title: "Shake de Frutas",
    premise:
      "Quando a vontade de doce vem junto com calor, esse shake tropical vira aquele respiro rapido que parece carinho no meio do dia.",
    servings: "1 porcao",
    time: {
      prep: "6 min",
      total: "6 min",
      extraLabel: "Finalizacao",
      extraValue: "Liquidificador 2 min",
    },
    ingredients: [
      "100ml de agua gelada",
      "1 kiwi",
      "2 fatias de abacaxi",
      "4 morangos",
      "2 colheres de cha de linhaca",
      "Gelo e adocante a gosto",
    ],
    instructions:
      "Descasca, pica, bate e pronto. A mistura fica fresquinha, perfumada e com uma acidez boa que corta a vontade de doce sem pesar.",
    instructionsSteps: [
      "Descasque e pique o kiwi, o abacaxi e os morangos.",
      "Coloque tudo no liquidificador com a agua, a linhaca, o gelo e o adocante.",
      "Bata ate ficar liso.",
      "Sirva em seguida.",
    ],
    objection:
      "Mistura de frutas pode virar bagunca de sabor, ne? Aqui nao. O abacaxi puxa o frescor, o kiwi da personalidade e o morango arredonda tudo.",
    masterTip:
      "Se voce gosta de textura mais grossinha, use menos agua e mais gelo. Fica quase um smoothie de colher.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/03-shake-frutas.webp`),
      alt: "Shake de frutas servido em copo transparente",
    },
  },
  {
    id: "04",
    title: "Smoothie de Frutas Vermelhas",
    premise:
      "Quer aquele docinho bonito, gelado e com cara de cafezinho arrumado em casa? Esse smoothie resolve em minutos e ainda fica lindo.",
    servings: "1 porcao",
    time: {
      prep: "5 min",
      total: "5 min",
      extraLabel: "Finalizacao",
      extraValue: "Liquidificador 2 min",
    },
    ingredients: [
      "1 pote de iogurte natural desnatado gelado",
      "4 morangos congelados",
      "4 amoras congeladas",
      "1 banana congelada",
      "Gelo e adocante a gosto",
    ],
    instructions:
      "Bata tudo ate o creme ficar sedoso e bem gelado. A banana entra pra trazer corpo e deixar a sobremesa com textura de milk-shake mais natural.",
    instructionsSteps: [
      "Coloque o iogurte e as frutas congeladas no liquidificador.",
      "Adicione gelo e adocante a gosto.",
      "Bata ate formar um creme espesso.",
      "Sirva na hora.",
    ],
    objection:
      "Smoothie de fruta costuma derreter rapido? Se usar as frutas bem congeladas, ele fica firme o suficiente pra comer com calma e aproveitar.",
    masterTip:
      "Sirva em uma tacinha e finalize com uma amora por cima. Parece sobremesa de brunch chique.",
    visual: {
      kind: "asset",
      src: toPublicPath(
        `${BONUS_RECIPE_IMAGE_BASE}/04-smoothie-frutas-vermelhas.webp`
      ),
      alt: "Smoothie de frutas vermelhas em taca baixa",
    },
  },
  {
    id: "05",
    title: "Sorvete de Chocolate",
    premise:
      "A vontade de chocolate bateu forte? Esse sorvete e o tipo de sobremesa que da sensacao de premio, sem virar exagero.",
    servings: "4 porcoes",
    time: {
      prep: "10 min",
      total: "1 h",
      extraLabel: "Finalizacao",
      extraValue: "Freezer 50 min",
    },
    ingredients: [
      "5 bananas maduras congeladas",
      "1/2 colher de rapadura ou mel",
      "4 colheres de cacau",
      "4 colheres de leite desnatado liquido",
      "Chocolate amargo para decorar",
    ],
    instructions:
      "Bata tudo ate virar um creme espesso, daqueles que voce precisa parar de vez em quando pra raspar a lateral. Depois e so levar ao congelador ate ganhar mais estrutura e finalizar com chocolate ralado por cima.",
    instructionsSteps: [
      "Coloque as bananas congeladas, a rapadura ou mel, o cacau e o leite no liquidificador ou processador.",
      "Bata ate virar um creme homogeneo.",
      "Transfira para um recipiente.",
      "Leve ao congelador ate ficar mais firme.",
      "Finalize com chocolate amargo ralado antes de servir.",
    ],
    objection:
      "Banana no sorvete nao vai dominar o sabor? O cacau forte e o toque de chocolate amargo puxam tudo pro lado da sobremesa chocolatuda, pode confiar.",
    masterTip:
      "Se quiser textura mais de gelato, tira do freezer uns minutinhos antes de servir. Fica cremoso na medida certa.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/05-sorvete-chocolate.webp`),
      alt: "Sorvete de chocolate servido em bowl claro",
    },
  },
  {
    id: "06",
    title: "Sorvete de Banana",
    premise:
      "Essa e daquelas receitas curinga pra quando voce quer um doce rapido e ainda aproveitar a fruta que ja esta madura demais.",
    servings: "2 porcoes",
    time: {
      prep: "10 min",
      total: "2 h 10 min",
      extraLabel: "Finalizacao",
      extraValue: "Freezer 2 h",
    },
    ingredients: [
      "2 bananas",
      "1 unidade de outra fruta de sua preferencia",
      "Adocante a gosto",
      "Sugestoes: morango, manga, maracuja",
    ],
    instructions:
      "Pica, congela, bate e pronto. O resultado e um creme gelado super simples que voce pode variar toda semana sem enjoar.",
    instructionsSteps: [
      "Pique as bananas e a fruta escolhida.",
      "Leve tudo ao congelador por cerca de 2 horas.",
      "Bata as frutas congeladas com adocante no liquidificador ou processador ate formar um creme.",
      "Sirva na hora ou volte ao freezer por alguns minutos se quiser mais firme.",
    ],
    objection:
      "Sem leite, sem creme, sem nada? Sim. A propria banana faz o trabalho e vira uma base incrivelmente cremosa quando bate congelada.",
    masterTip:
      "Se usar morango, o sabor fica mais romantico. Se usar manga, fica com cara de sobremesa de verao. Vale brincar com o que voce tiver em casa.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/06-sorvete-banana.webp`),
      alt: "Sorvete de banana servido com frutas frescas",
    },
  },
  {
    id: "07",
    title: "Sorvete de Manga",
    premise:
      "Quer uma sobremesa tropical com cara de coisa elaborada, mas sem trabalho? Esse sorvete entrega um sabor diferente e super refrescante.",
    servings: "4 porcoes",
    time: {
      prep: "12 min",
      total: "2 h 12 min",
      extraLabel: "Finalizacao",
      extraValue: "Freezer 2 h",
    },
    ingredients: [
      "2 mangas sem fiapos cortadas",
      "2 inhames medios descascados e cortados",
      "Gengibre picado a gosto",
      "Adocante a gosto",
    ],
    instructions:
      "Voce bate tudo ate ficar bem uniforme, coloca em um recipiente e leva ao freezer. O inhame entra como truque silencioso: da corpo e deixa o sorvete mais bonito na colher.",
    instructionsSteps: [
      "Corte as mangas e os inhames em pedacos menores.",
      "Bata com o gengibre e o adocante ate formar um creme.",
      "Transfira para um recipiente com tampa.",
      "Leve ao freezer ate congelar.",
    ],
    objection:
      "Inhame em sobremesa assusta um pouco, eu sei. Mas ele quase some no sabor e so deixa a textura mais aveludada.",
    masterTip:
      "Se voce gosta de um toque mais sofisticado, capricha no gengibre. Ele levanta a manga e deixa tudo com cara de receita especial.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/07-sorvete-manga.webp`),
      alt: "Sorvete de manga servido em bowl com lascas de manga",
    },
  },
  {
    id: "08",
    title: "Sorvete de Morango",
    premise:
      "Tem receita que parece infancia com cara de autocuidado adulto. Esse sorvete de morango e exatamente isso.",
    servings: "2 porcoes",
    time: {
      prep: "8 min",
      total: "8 min",
      extraLabel: "Finalizacao",
      extraValue: "Liquidificador 3 min",
    },
    ingredients: [
      "200g de morangos congelados",
      "1/2 iogurte desnatado",
      "Hortela a gosto",
      "Adocante a gosto",
    ],
    instructions:
      "Bata tudo ate o morango virar um creme bem rosado e uniforme. Fica com aquela textura entre sobremesa gelada e frozen, perfeita pra comer na hora.",
    instructionsSteps: [
      "Coloque os morangos congelados, o iogurte, a hortela e o adocante no liquidificador ou processador.",
      "Bata ate formar um creme rosado.",
      "Sirva imediatamente.",
    ],
    objection:
      "Vai ficar aguado por causa do iogurte? Nao, porque o morango congelado segura a textura e deixa o resultado super cremoso.",
    masterTip:
      "Hortela e opcional, mas quando entra da aquela sensacao de sobremesa fresca e mais refinada.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/08-sorvete-morango.webp`),
      alt: "Sorvete de morango servido em bowl claro",
    },
  },
  {
    id: "09",
    title: "Picole de Frutas Vermelhas",
    premise:
      "Quer deixar a sobremesa pronta na semana e ter um docinho gelado sem pensar muito? Esse picole e o tipo de carta na manga que ajuda demais.",
    servings: "6 porcoes",
    time: {
      prep: "12 min",
      total: "4 h 12 min",
      extraLabel: "Finalizacao",
      extraValue: "Freezer 4 h",
    },
    ingredients: [
      "3 xicaras de frutas vermelhas (morango, cereja, amora e mirtilo)",
      "200mL de suco de laranja",
      "100mL de agua gelada",
      "Adocante a gosto",
    ],
    instructions:
      "Reserva parte das frutas em pedacinhos, bate o resto e monta nas forminhas. Quando congela, fica aquele picole bonito por dentro, com jeitinho de sobremesa comprada pronta.",
    instructionsSteps: [
      "Separe 1 xicara das frutas e corte em pedacinhos.",
      "Bata o restante das frutas com o suco de laranja, a agua e o adocante.",
      "Distribua os pedacos de fruta nas forminhas de picole.",
      "Complete com a mistura batida.",
      "Leve ao freezer ate congelar por completo.",
    ],
    objection:
      "Picole caseiro costuma cristalizar, ne? O segredo aqui e a fruta batida com suco, que ajuda a manter uma textura mais gostosa.",
    masterTip:
      "Se usar forminha transparente, voce ainda ganha um efeito lindo com as rodelinhas de fruta aparecendo.",
    visual: {
      kind: "asset",
      src: toPublicPath(
        `${BONUS_RECIPE_IMAGE_BASE}/09-picole-frutas-vermelhas.webp`
      ),
      alt: "Picoles de frutas vermelhas alinhados em superficie clara",
    },
  },
  {
    id: "10",
    title: "Mousse de Chocolate Proteico",
    premise:
      "Quando a vontade e de sobremesa chocolatuda de verdade, essa mousse entra como aquele bonus caprichado que parece sobremesa de ocasiao especial.",
    servings: "8 porcoes",
    time: {
      prep: "15 min",
      total: "3 h 15 min",
      extraLabel: "Finalizacao",
      extraValue: "Geladeira 3 h",
    },
    ingredients: [
      "150g de leite em po desnatado",
      "300ml de leite liquido desnatado morno",
      "200g de whey protein sabor chocolate",
      "2 envelopes de gelatina sem sabor",
      "200ml de leite de coco com baixo teor de gordura",
      "100g de cacau em po 100%",
      "Coco ralado para polvilhar",
    ],
    instructions:
      "Dissolve a gelatina, bate tudo no liquidificador e leva pra geladeira numa forma de pudim ou travessa. O resultado fica firme, intenso e com aquela cara linda de sobremesa de domingo.",
    instructionsSteps: [
      "Dissolva a gelatina no leite liquido morno.",
      "Coloque a gelatina dissolvida no liquidificador com o restante dos ingredientes.",
      "Bata ate a mistura ficar bem uniforme.",
      "Despeje em uma forma de pudim ou travessa.",
      "Cubra e leve pra geladeira por cerca de 3 horas.",
      "Polvilhe coco ralado antes de servir.",
    ],
    objection:
      "Mousse proteica parece promessa boa demais pra ser verdade, eu sei. Mas aqui a gelatina faz o trabalho pesado e deixa a textura bonita de verdade.",
    masterTip:
      "Se quiser servir em porcoes individuais, monta em tacinhas. Alem de pratico, ja fica com cara de sobremesa pronta pra visita.",
    visual: {
      kind: "asset",
      src: toPublicPath(
        `${BONUS_RECIPE_IMAGE_BASE}/10-mousse-chocolate-proteico.webp`
      ),
      alt: "Mousse de chocolate proteico servida em forma de pudim",
    },
  },
  {
    id: "11",
    title: "Chocolate Quente Proteico",
    premise:
      "Tem noite que pede cobertor, silencio e uma xicara quentinha. Esse chocolate quente encaixa exatamente nesse momento.",
    servings: "1 porcao",
    time: {
      prep: "5 min",
      total: "10 min",
      extraLabel: "Finalizacao",
      extraValue: "Fogo 5 min",
    },
    ingredients: [
      "1 xicara de leite desnatado",
      "1 colher de sopa de cacau",
      "1 colher de sopa de acucar demerara",
      "1 colher de sopa de licor de chocolate",
      "1 colher de cha generosa de amido de milho diluida em um pouco de agua",
      "1 scoop ou 30g de whey protein de chocolate",
    ],
    instructions:
      "Mistura a base, leva ao fogo e mexe ate engrossar. Fica com aquela textura aconchegante de chocolate quente de cafeteria, mas numa versao mais esperta pro dia a dia.",
    instructionsSteps: [
      "Misture o leite, o cacau, o whey e o acucar em uma panela.",
      "Leve ao fogo e mexa bem.",
      "Acrescente o licor e o amido diluido.",
      "Continue mexendo em fogo medio ate ferver e engrossar.",
      "Sirva bem quente.",
    ],
    objection:
      "Whey no fogo pode empelotar? Pode, se voce descuidar. O segredo e mexer desde o comeco e manter o fogo medio sem pressa.",
    masterTip:
      "Sirva numa caneca bonita e finalize com um tiquinho de cacau por cima. Muda totalmente a experiencia.",
    visual: {
      kind: "asset",
      src: toPublicPath(
        `${BONUS_RECIPE_IMAGE_BASE}/11-chocolate-quente-proteico.webp`
      ),
      alt: "Chocolate quente proteico servido em caneca clara",
    },
  },
  {
    id: "12",
    title: "Cookies Saudaveis",
    premise:
      "Quer um docinho rapido com cara de biscoito recem-feito, mas sem ligar forno nem fazer bagunca? Esses cookies resolvem em minutos.",
    servings: "2 porcoes",
    time: {
      prep: "8 min",
      total: "10 min",
      extraLabel: "Finalizacao",
      extraValue: "Micro-ondas 2 min",
    },
    ingredients: [
      "1 colher de sopa de farinha de aveia",
      "1 colher de sopa de acucar mascavo",
      "1 colher de sopa de adocante culinario",
      "Chocolate 70% cacau em lascas",
      "1 colher de sopa de margarina light",
      "1 colher de cha de essencia de baunilha",
      "1 gema",
    ],
    instructions:
      "Mistura tudo, distribui em forminhas de silicone, joga as lascas por cima e leva ao microondas. Em pouco tempo voce tem um cookie macio por dentro, com jeitinho de sobremesa improvisada que deu certo demais.",
    instructionsSteps: [
      "Separe todos os ingredientes em um recipiente.",
      "Misture bem ate formar uma massa uniforme.",
      "Distribua em forminhas individuais de silicone.",
      "Salpique as lascas de chocolate por cima.",
      "Leve ao microondas por cerca de 2 minutos.",
      "Desenforme com ajuda de um garfo e sirva.",
    ],
    objection:
      "Cookie de microondas parece estranho, eu sei. Mas em porcao individual ele funciona super bem e vira aquele docinho express que salva a vontade na hora.",
    masterTip:
      "Se seu microondas for muito potente, pare um pouco antes dos 2 minutos. Melhor tirar levemente macio do que deixar passar do ponto.",
    visual: {
      kind: "asset",
      src: toPublicPath(`${BONUS_RECIPE_IMAGE_BASE}/12-cookies-saudaveis.webp`),
      alt: "Cookies saudaveis com lascas de chocolate servidos em prato claro",
    },
  },
];

const sobremesasSaudaveisBook: RecipeBook = {
  intro: introData,
  recipes,
  storageKey: "cf-sobremesas-saudaveis-progress-v1",
  searchPlaceholder: "Buscar sobremesa...",
  emptyStateCopy: "Nenhuma sobremesa encontrada para sua busca.",
};

export default sobremesasSaudaveisBook;
