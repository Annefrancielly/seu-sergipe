import type { Dish, MenuCategory, Price } from "@/types/content";

const reais = (value: number, label?: string): Price => ({ label, amountInCents: value * 100 });

const AUTORAL = "Cozinha Autoral";
const ORIGEM = "Cozinha de Origem";

const AVISO_INSUMOS =
  "O menu e alguns elementos dos pratos podem ser alterados conforme a inspiração da chef e a disponibilidade de insumos da região.";

export const menuCategories: readonly MenuCategory[] = [
  {
    slug: "menu-degustacao",
    name: "Menu Degustação",
    description: "Uma viagem em etapas pelos sabores de Sergipe, guiada pela chef.",
    layout: "cards",
    cover: {
      src: "/images/pratos/menu-degustacao-etapa.jpg",
      alt: "Etapa do menu degustação servida em cumbuca de cerâmica artesanal.",
      width: 1400,
      height: 933,
    },
    notes: [AVISO_INSUMOS],
  },
  {
    slug: "entradas",
    name: "Entradas & Snacks",
    description: "Para abrir o apetite e começar a conversa.",
    layout: "cards",
    cover: {
      src: "/images/pratos/quiabada-crocante.jpg",
      alt: "Quiabada crocante com flor azul em cumbuca branca.",
      width: 933,
      height: 1400,
      objectPosition: "50% 60%",
    },
    notes: [AVISO_INSUMOS],
  },
  {
    slug: "pratos-principais",
    name: "Pratos Principais",
    description: "Cozinha autoral e cozinha de origem, lado a lado.",
    layout: "cards",
    notes: [
      "Você é vegano ou vegetariano? Podemos reinventar os pratos da cozinha autoral. Surpreenda-se com as possibilidades.",
      AVISO_INSUMOS,
    ],
  },
  {
    slug: "moquecas",
    name: "Moquecas",
    description: "No leite de coco, com pirão, vinagrete e farofa.",
    layout: "cards",
    cover: {
      src: "/images/pratos/moqueca-encontro-das-aguas.jpg",
      alt: "Panela com polvo, camarões e pimentões, finalizada com coentro.",
      width: 720,
      height: 1280,
      objectPosition: "50% 72%",
    },
    notes: [AVISO_INSUMOS],
  },
  {
    slug: "pratos-infantis",
    name: "Pratos Infantis",
    description: "Pensados para os pequenos viajantes.",
    layout: "cards",
    notes: [AVISO_INSUMOS],
  },
  {
    slug: "hamburgueres",
    name: "Hambúrgueres",
    description: "Tradições sergipanas entre duas fatias de pão.",
    layout: "cards",
    notes: [
      "Todos os hambúrgueres são servidos com pão tostado na manteiga, queijo coalho maçaricado, emulsão de coentro, picles de maxixe e vinagrete de caju.",
      AVISO_INSUMOS,
    ],
  },
  {
    slug: "drinks",
    name: "Drinks",
    description: "Frutas da terra, gin sergipano e cachaça de Capela.",
    layout: "cards",
    notes: ["Os drinks podem ser servidos sem álcool. É só pedir ao garçom."],
  },
  {
    slug: "bebidas",
    name: "Bebidas",
    description: "Cervejas, doses, vinhos, sucos e cafés.",
    layout: "list",
    notes: [
      "Buscamos novidades para nossa carta de vinhos: consulte nossos garçons ou visite nossa adega para conhecer rótulos exclusivos.",
    ],
  },
  {
    slug: "sobremesas",
    name: "Sobremesas",
    description: "O clássico encontra o sabor típico de Sergipe.",
    layout: "cards",
    cover: {
      src: "/images/pratos/amorosa.jpg",
      alt: "Sobremesa com merengue maçaricado e caldas sobre prato de cerâmica azul.",
      width: 1400,
      height: 933,
    },
    notes: [AVISO_INSUMOS],
  },
];

export const dishes: readonly Dish[] = [
  // Menu Degustação
  {
    slug: "menu-sensacoes",
    name: "Menu Sensações",
    categorySlug: "menu-degustacao",
    steps: 10,
    description:
      "A chef Seichele Barboza cria com exclusividade o menu para você. A vivência acontece em 10 etapas, com harmonização de drinks e em espaço exclusivo no Seu Sergipe.",
    prices: [reais(350)],
    tags: ["reserva-previa"],
  },
  {
    slug: "experiencia-do-cabrunco",
    name: "Experiência do Cabrunco",
    categorySlug: "menu-degustacao",
    steps: 8,
    description:
      "A chef Seichele Barboza te leva por uma viagem de sabores marcantes da nossa terra, buscando inspiração nas tradições sergipanas.",
    items: [
      "Couvert",
      "Amuse-bouche",
      "Snack",
      "Entradas",
      "Pratos principais",
      "Intermezzo",
      "Sobremesa",
    ],
    prices: [
      reais(210, "Sem harmonização"),
      reais(250, "Harmonizado com drinks"),
      reais(270, "Harmonizado com vinho"),
    ],
  },
  {
    slug: "origem-sergipana",
    name: "Origem Sergipana",
    categorySlug: "menu-degustacao",
    steps: 4,
    description:
      "Entrada, amuse-bouche, prato principal e sobremesa. Você escolhe o prato principal no cardápio.",
    note: "Exceto os pratos com polvo, rabada, moquecas e carneiro.",
    prices: [
      reais(160, "Sem harmonização"),
      reais(195, "Harmonizado com drinks"),
      reais(210, "Harmonizado com vinho"),
    ],
  },

  // Entradas & Snacks
  {
    slug: "chamego-bom",
    name: "Chamego bom",
    categorySlug: "entradas",
    group: AUTORAL,
    description: "Chips de batata-doce em páprica defumada e emulsão de coentro.",
    story:
      "Inspirada no Quilombo da Mussuca, a chef Seichele mostra a versatilidade dos insumos do Nordeste.",
    prices: [reais(25)],
  },
  {
    slug: "quiabada-crocante",
    name: "Quiabada crocante",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Releitura da típica quiabada sergipana, com referência aos bolinhos de capitão. Picles de maxixe e coulis de tamarindo dão acidez e presença ao prato.",
    note: "4 unidades",
    prices: [reais(44)],
    photo: {
      src: "/images/pratos/quiabada-crocante.jpg",
      alt: "Bolinho empanado e dourado, coberto por lascas de queijo e uma flor azul, sobre emulsão verde em cumbuca branca.",
      width: 933,
      height: 1400,
      objectPosition: "50% 60%",
    },
  },
  {
    slug: "moquequinha-de-aratu",
    name: "Moquequinha de Aratu",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Um preparo típico sergipano são as moquecas assadas no forno e cobertas na folha de bananeira. Com essa inspiração, a chef recria o prato com o catado supercrocante e aioli de umbu-cajá.",
    note: "4 unidades",
    prices: [reais(46)],
  },
  {
    slug: "coxinha-de-arraia",
    name: "Coxinha de arraia",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Arraia selada na manteiga de garrafa e desfiada; a massa é elaborada com moqueca e farinha de mandioca, e a finalização vem com aioli de dendê.",
    note: "4 unidades",
    prices: [reais(46)],
  },
  {
    slug: "a-polvorosa",
    name: "A Polvorosa",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Cubos de polvo grelhados na manteiga noisette, molho teriyaki de cachaça de Capela, crocante de maxixe e picles de amendoim cozido.",
    note: "6 unidades",
    prices: [reais(68)],
  },
  {
    slug: "couvert-da-chef",
    name: "Couvert da Chef",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Torradas na manteiga de garrafa com chuva de parmesão, emulsão de coentro e tomate confit.",
    prices: [reais(25)],
  },
  {
    slug: "ceviche-bonito-e-cheiroso",
    name: "Ceviche Bonito & Cheiroso",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Mix de peixes sergipanos embebido em leite de tigre de castanha de caju, sumo de cítricos, castanhas e caju fresco, finalizado com azeite de coentro.",
    prices: [reais(64)],
  },
  {
    slug: "tartar",
    name: "Tartar",
    categorySlug: "entradas",
    group: AUTORAL,
    description:
      "Filé-mignon curado na casa, temperado com mix de ervas Seu Sergipe, picles de uricuri, emulsão de manjericão, crudo de cau e Dijon e o crocante do dia.",
    prices: [reais(65)],
  },
  {
    slug: "mariscada-sem-vergonha",
    name: "Mariscada 'sem vergonha'",
    categorySlug: "entradas",
    group: ORIGEM,
    description:
      "A nossa mariscada é elaborada com leite de coco caseiro, camarão, sururu, ostra, aratu e caranguejo.",
    story:
      "A mariscada é um prato típico criado por mulheres marisqueiras nos manguezais do Nordeste.",
    prices: [reais(29)],
  },
  {
    slug: "tripinha-croc-croc",
    name: "Tripinha croc croc",
    categorySlug: "entradas",
    group: ORIGEM,
    description:
      "A tripa é escalfada, assada e frita por imersão, servida com farofa d'água, vinagrete de caju e emulsão de coentro.",
    story: "Um preparo típico do sertão de Sergipe.",
    prices: [reais(45)],
  },
  {
    slug: "figado-mestre-do-sabor-entrada",
    name: "Fígado Mestre do Sabor",
    categorySlug: "entradas",
    group: ORIGEM,
    description:
      "Fígado marinado no molho negro Seu Sergipe, grelhado com cebolas e pimentões à moda sergipana, finalizado na manteiga noisette, com vinagrete de caju e farofa d'água ácida.",
    prices: [reais(46)],
  },

  // Pratos Principais
  {
    slug: "risoto-bonito-e-cheiroso",
    name: "Risoto Bonito & Cheiroso",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Camarão em duas fases, grelhado e crocante, risoto de arroz de praia com fundo de moqueca, vinagrete de caju e farofa de saburica defumada.",
    story: "Uma homenagem ao Rio São Francisco.",
    prices: [reais(94)],
  },
  {
    slug: "marminino",
    name: "Marminino",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Nhoque de batata-doce com camarões grelhados, molho de queijo parmesão do estado e queijo coalho, finalizado com tomate confit e chuva de parmesão.",
    prices: [reais(89)],
  },
  {
    slug: "arroz-de-camarao",
    name: "Arroz de camarão",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Arroz cremoso com camarões grelhados, refogados com tomate, pimentões, alho e pimenta de cheiro no tempero especial da chef, servido na panela de barro com chuva de parmesão.",
    prices: [reais(89)],
  },
  {
    slug: "polvo-a-sergipana",
    name: "Polvo à Sergipana",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Polvo grelhado no mix de ervas Seu Sergipe, molho velouté de moqueca, talharim ao alho e ervas frescas, tomate confit, finalizado com lâminas de parmesão do estado.",
    prices: [reais(130)],
  },
  {
    slug: "risoto-de-polvo",
    name: "Risoto de Polvo",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Polvo grelhado servido com risoto, parmesão do estado, azeite de coentro e vinagrete de caju.",
    prices: [reais(130)],
  },
  {
    slug: "ze-peixe",
    name: "Zé Peixe",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Pescada-amarela maturada em especiarias, aligot de dendê, quiabos ou maxixe grelhados, salada verde com amendoim cozido, queijo coalho e requeijão, farofa de cominho e coentro.",
    story: "Uma homenagem ao grande prático que foi um marco na marinha mundial.",
    prices: [reais(94)],
  },
  {
    slug: "xoco",
    name: "Xocó",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Tilápia levemente marinada, grelhada com mix de ervas Seu Sergipe, salada do dia e arroz cremoso de majongome.",
    story: "Uma referência à tribo Kariri-Xocó.",
    prices: [reais(76)],
  },
  {
    slug: "voce-e-o-chef",
    name: "Você é o Chef",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Você será o chef e vai escolher a sua proteína favorita: filé-mignon, camarões ou peixe. Para acompanhar, nossa salada com manga, castanha de caju, majongome, alface, rúcula, coentro, tomate confit, queijo coalho e molho com leite de castanhas.",
    prices: [reais(98)],
  },
  {
    slug: "sertao-sergipano",
    name: "Sertão Sergipano",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Filé-mignon curado em especiarias, selado no azeite e finalizado na manteiga noisette, mix de feijões e favas, pirão de leite, farofa de semente de cominho e coentro e minissalada de maxixe e amendoim cozido.",
    prices: [reais(95)],
  },
  {
    slug: "veio",
    name: "Véio",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Filé-mignon curado em especiarias, talharim na manteiga noisette e manjericão ao molho de queijos da terra, tomate confit e azeite trufado.",
    prices: [reais(94)],
  },
  {
    slug: "nhoque-da-terra-veg",
    name: "Nhoque da Terra Veg",
    categorySlug: "pratos-principais",
    group: AUTORAL,
    description:
      "Nhoque de batata-doce, molho à base de queijo coalho e parmesão, tomate confit, lâminas de queijo parmesão e manteiga noisette.",
    prices: [reais(74)],
  },
  {
    slug: "figado-mestre-do-sabor",
    name: "Fígado Mestre do Sabor",
    categorySlug: "pratos-principais",
    group: ORIGEM,
    description:
      "Fígado marinado no molho negro Seu Sergipe, grelhado com cebolas e pimentões à moda sergipana, finalizado na manteiga noisette, com vinagrete de caju apimentado e farofa d'água.",
    prices: [reais(68)],
  },
  {
    slug: "baiao-de-tres",
    name: "Baião de Três",
    categorySlug: "pratos-principais",
    group: ORIGEM,
    description:
      "Feijão-verde com arroz refogado com bacon, charque, paio, cebola, alho, pimentões, pimenta de cheiro e tomates, finalizado com queijo coalho maçaricado.",
    prices: [reais(74)],
  },
  {
    slug: "carneiro-de-dona-cida",
    name: "Carneiro de Dona Cida",
    categorySlug: "pratos-principais",
    group: ORIGEM,
    description:
      "Carneiro cozido pela mainha da chef em caldo saboroso, servido com pirão delícia, arroz grudadinho, farofa d'água e vinagrete.",
    prices: [reais(86)],
    tags: ["consultar-disponibilidade"],
  },
  {
    slug: "rabada-de-mainha",
    name: "Rabada de Mainha",
    categorySlug: "pratos-principais",
    group: ORIGEM,
    description:
      "Rabada desmanchando de macia, pirão cremoso, arroz de castanha, farofa d'água e vinagrete.",
    prices: [reais(84)],
  },

  // Moquecas
  {
    slug: "moqueca-du-cabrunco",
    name: "Moqueca du Cabrunco",
    categorySlug: "moquecas",
    description:
      "Peixe e camarão no molho de moqueca com leite de coco, rodelas de tomate, cebola, pimentão e pimenta de cheiro, um leve toque de gengibre, pirão, vinagrete, farofa de saburica defumada e arroz de castanha.",
    prices: [reais(95, "Individual"), reais(180, "Casal")],
  },
  {
    slug: "moqueca-encontro-das-aguas",
    name: "Moqueca Encontro das Águas",
    categorySlug: "moquecas",
    description:
      "Peixe, polvo e camarão no molho de leite de coco, com pirão, tomate, cebola, pimentão, pimenta de cheiro e um leve toque de gengibre. Acompanha vinagrete, farofa de saburica defumada e arroz de castanha.",
    prices: [reais(110, "Individual"), reais(198, "Casal")],
    photo: {
      src: "/images/pratos/moqueca-encontro-das-aguas.jpg",
      alt: "Panela escura com polvo, camarões e pimentões coloridos, finalizada com coentro, ao lado de uma panela de camarões com limão.",
      width: 720,
      height: 1280,
      objectPosition: "50% 72%",
    },
  },
  {
    slug: "moqueca-de-banana-da-terra",
    name: "Moqueca de Banana-da-terra",
    categorySlug: "moquecas",
    description:
      "Banana-da-terra no molho de leite de coco, pirão, rodelas de tomate, cebola, pimentão e pimenta de cheiro, um leve toque de gengibre, picles de maxixe, vinagrete de caju, farofa de semente de coentro e arroz de castanha.",
    prices: [reais(90, "Individual"), reais(170, "Casal")],
  },

  // Pratos Infantis
  {
    slug: "sergipinho",
    name: "Sergipinho",
    categorySlug: "pratos-infantis",
    description:
      "Escalope de filé-mignon, arroz grudadinho, batata sauté ou batata frita e farofa.",
    prices: [reais(54)],
  },
  {
    slug: "meu-dengo",
    name: "Meu Dengo",
    categorySlug: "pratos-infantis",
    description:
      "Escalope de filé-mignon, talharim na manteiga, molho de queijo e chuva de parmesão.",
    note: "Também pode ser servido com molho de tomate.",
    prices: [reais(54)],
  },

  // Hambúrgueres
  {
    slug: "hamburguer-de-aratu",
    name: "Hambúrguer de Aratu",
    categorySlug: "hamburgueres",
    description:
      "A chef traz a inspiração da tradição sergipana num crocante de moquequinha de aratu com farinha de mandioca.",
    story:
      "Releitura das típicas moquecas de aratu, servidas em folha de bananeira no nosso estado.",
    prices: [reais(50)],
  },
  {
    slug: "hamburguer-de-polvo",
    name: "Hambúrguer de Polvo",
    categorySlug: "hamburgueres",
    description: "Tentáculos de polvo grelhados com mix de ervas Seu Sergipe, tomate confit e parmesão ralado.",
    prices: [reais(67)],
  },
  {
    slug: "sao-goncalo",
    name: "São Gonçalo",
    categorySlug: "hamburgueres",
    description:
      "A chef Seichele brinca com o seu paladar servindo camarões crocantes ao molho de queijo com uricuri e bacon, uma verdadeira explosão de sabores.",
    story: "Uma homenagem ao grupo folclórico São Gonçalo.",
    prices: [reais(55)],
  },
  {
    slug: "caboclinho",
    name: "Caboclinho",
    categorySlug: "hamburgueres",
    description:
      "Blend de 130 g com carne curada, queijo coalho maçaricado, emulsão de coentro, picles de cebola-roxa e vinagrete de caju.",
    prices: [reais(36)],
  },
  {
    slug: "lambe-sujo",
    name: "Lambe Sujo",
    categorySlug: "hamburgueres",
    description:
      "Blend de 180 g com cebola caramelizada, bacon, emulsão de coentro, vinagrete de caju e picles de maxixe.",
    story: "Inspirado na festa do Lambe Sujo e Caboclinho.",
    prices: [reais(45)],
  },
  {
    slug: "hamburguer-de-quiabada",
    name: "Hambúrguer de Quiabada",
    categorySlug: "hamburgueres",
    description:
      "Blend crocante de quiabada, cebola caramelizada, picles de maxixe, emulsão de coentro e vinagrete de caju.",
    prices: [reais(38)],
  },

  // Drinks
  {
    slug: "tamarindo-ao-extremo",
    name: "Tamarindo ao extremo",
    categorySlug: "drinks",
    description:
      "Coulis de tamarindo, tônica, gin sergipano The Legend, alecrim, pimenta-rosa e canela maçaricada.",
    prices: [reais(36)],
  },
  {
    slug: "caju-amigo",
    name: "Caju amigo",
    categorySlug: "drinks",
    description:
      "Caju confit, caju fresco, cachaça, limão, anis-estrelado, pimenta-rosa e pimenta de cheiro.",
    prices: [reais(36)],
  },
  {
    slug: "moranguinho-nordeste",
    name: "Moranguinho Nordeste",
    categorySlug: "drinks",
    description:
      "Redução de morango, morangos frescos, tônica, limão, calda de gengibre, gin sergipano The Legend e borda de farofa de coco.",
    prices: [reais(36)],
  },
  {
    slug: "por-do-sol-na-cinelandia",
    name: "Pôr do Sol na Cinelândia",
    categorySlug: "drinks",
    description:
      "Redução de hibisco e maracujá com especiarias, calda de gengibre, tônica e vodka, com leve toque de limão.",
    prices: [reais(34)],
  },
  {
    slug: "aperol-spritz",
    name: "Aperol Spritz",
    categorySlug: "drinks",
    description: "Aperol, laranja-baía, espumante e água com gás.",
    prices: [reais(39)],
  },
  {
    slug: "aracajito",
    name: "Aracajito",
    categorySlug: "drinks",
    description: "Mojito revisitado com toque de gengibre, limão-taiti, rum, hortelã e água com gás.",
    prices: [reais(35)],
  },
  {
    slug: "sao-joao",
    name: "São João",
    categorySlug: "drinks",
    description: "Vodka, paçoca, amendoim, leite condensado e alegria.",
    prices: [reais(34)],
  },
  {
    slug: "caipirinha-a-beira-mar",
    name: "Caipirinha à Beira-Mar",
    categorySlug: "drinks",
    description: "Limão-taiti, cachaça da Braba, açúcar, manjericão e raspas de limão.",
    prices: [reais(30)],
  },
  {
    slug: "dry-martini",
    name: "Dry Martini",
    categorySlug: "drinks",
    description: "Gin The Legend, vermute branco, gelo e azeitona.",
    prices: [reais(34)],
  },
  {
    slug: "negroni-de-lampiao",
    name: "Negroni de Lampião",
    categorySlug: "drinks",
    description: "Campari, gin The Legend e vermute rosso.",
    prices: [reais(36)],
  },
  {
    slug: "gin-tonica-a-sergipana",
    name: "Gin Tônica à Sergipana",
    categorySlug: "drinks",
    description: "Gin The Legend, tônica e frutas sergipanas da estação.",
    note: "Consulte o bartender sobre as frutas do dia.",
    prices: [reais(38)],
  },
  {
    slug: "mangaba-e-agua-de-coco",
    name: "Mangaba & Água de coco",
    categorySlug: "drinks",
    description: "Redução de mangaba e água de coco.",
    prices: [reais(34)],
  },
  {
    slug: "mangaba-city",
    name: "Mangaba City",
    categorySlug: "drinks",
    description: "Redução de mangaba, limão, laranja, manjericão, tônica ou água com gás.",
    prices: [reais(34)],
    tags: ["sem-alcool"],
  },
  {
    slug: "sodas-seu-sergipe",
    name: "Sodas Seu Sergipe",
    categorySlug: "drinks",
    description:
      "A Soda Sergipana leva redução de maracujá e hibisco com especiarias, limão, calda de gengibre, manjericão, pimenta-rosa, tônica ou água com gás.",
    items: [
      "Soda Sergipana",
      "Soda de Mangaba",
      "Soda de Tamarindo",
      "Soda de Caju",
      "Soda de Maracujá",
      "Soda de Morango",
    ],
    prices: [reais(30)],
    tags: ["sem-alcool"],
  },

  // Bebidas
  { slug: "heineken", name: "Heineken long neck", categorySlug: "bebidas", group: "Cervejas", prices: [reais(15)] },
  { slug: "corona", name: "Corona", categorySlug: "bebidas", group: "Cervejas", prices: [reais(14)] },
  { slug: "budweiser", name: "Budweiser long neck", categorySlug: "bebidas", group: "Cervejas", prices: [reais(14)] },
  { slug: "heineken-zero", name: "Heineken Zero long neck", categorySlug: "bebidas", group: "Cervejas", prices: [reais(14)] },
  { slug: "eisenbahn-pilsen", name: "Eisenbahn Pilsen long neck", categorySlug: "bebidas", group: "Cervejas", prices: [reais(12)] },
  { slug: "estrella-galicia", name: "Estrella Galicia Premium", categorySlug: "bebidas", group: "Cervejas", prices: [reais(13)] },
  { slug: "stella-artois", name: "Stella Artois long neck", categorySlug: "bebidas", group: "Cervejas", prices: [reais(14)] },
  { slug: "baden-baden-witbier", name: "Baden Baden Witbier", categorySlug: "bebidas", group: "Cervejas", prices: [reais(9)] },
  { slug: "baden-baden-coentro", name: "Baden Baden Coentro", categorySlug: "bebidas", group: "Cervejas", prices: [reais(9)] },
  { slug: "baden-baden-artesanal", name: "Baden Baden artesanal 600 ml", categorySlug: "bebidas", group: "Cervejas", prices: [reais(30)] },

  { slug: "licor-43", name: "Licor 43", categorySlug: "bebidas", group: "Doses", prices: [reais(28)] },
  { slug: "amarula", name: "Amarula", categorySlug: "bebidas", group: "Doses", prices: [reais(25)] },
  { slug: "cachaca-germana", name: "Cachaça Germana", categorySlug: "bebidas", group: "Doses", prices: [reais(16)] },
  { slug: "cachaca-seleta", name: "Cachaça Seleta", categorySlug: "bebidas", group: "Doses", prices: [reais(15)] },
  { slug: "cachaca-ypioca", name: "Cachaça Ypióca", categorySlug: "bebidas", group: "Doses", prices: [reais(14)] },
  { slug: "cachaca-de-capela", name: "Cachaça de Capela", categorySlug: "bebidas", group: "Doses", prices: [reais(10)] },
  { slug: "chivas-12", name: "Whisky Chivas 12 anos", categorySlug: "bebidas", group: "Doses", prices: [reais(23)] },
  { slug: "jack-daniels", name: "Whisky Jack Daniel's", categorySlug: "bebidas", group: "Doses", prices: [reais(20)] },
  { slug: "old-parr", name: "Whisky Old Parr", categorySlug: "bebidas", group: "Doses", prices: [reais(20)] },

  { slug: "vinho-taca", name: "Taça de vinho", description: "Tinto, branco ou espumante.", categorySlug: "bebidas", group: "Vinhos", prices: [reais(32)] },
  { slug: "taxa-de-rolha", name: "Taxa de rolha", categorySlug: "bebidas", group: "Vinhos", prices: [reais(30)] },

  {
    slug: "sucos-especiais",
    name: "Sucos especiais",
    categorySlug: "bebidas",
    group: "Sucos e refrescos",
    items: [
      "Morango, limão e gengibre",
      "Morango com limão",
      "Acerola, limão e alecrim",
      "Acerola com laranja",
      "Abacaxi com hortelã",
    ],
    prices: [reais(14)],
  },
  {
    slug: "milk-shake-de-mangaba",
    name: "Milk shake de mangaba",
    description: "Com calda de tamarindo.",
    categorySlug: "bebidas",
    group: "Sucos e refrescos",
    prices: [reais(28)],
  },
  {
    slug: "sucos",
    name: "Sucos",
    categorySlug: "bebidas",
    group: "Sucos e refrescos",
    items: [
      "Manga",
      "Maracujá",
      "Mangaba",
      "Caju",
      "Acerola",
      "Tamarindo",
      "Abacaxi",
      "Limão",
      "Laranja",
      "Morango",
    ],
    note: "Consulte a disponibilidade das frutas da estação.",
    prices: [reais(11)],
  },

  {
    slug: "refrigerantes",
    name: "Refrigerantes",
    categorySlug: "bebidas",
    group: "Refrigerantes e águas",
    items: ["Coca-Cola", "Guaraná", "Fanta", "Coca-Cola Zero", "Guaraná Zero"],
    prices: [reais(8)],
  },
  { slug: "tonica", name: "Tônica Antarctica", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(8)] },
  { slug: "tonica-zero", name: "Tônica Antarctica Zero", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(8)] },
  { slug: "schweppes-citrus", name: "Schweppes Citrus", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(8)] },
  { slug: "h2o", name: "H2O", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(8)] },
  { slug: "agua-de-coco", name: "Água de coco (copo)", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(10)] },
  { slug: "agua-minalba", name: "Água Minalba", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(11)] },
  { slug: "agua-minalba-gas", name: "Água Minalba com gás", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(12)] },
  { slug: "agua-cristal", name: "Água Cristal", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(8)] },
  { slug: "agua-cristal-gas", name: "Água Cristal com gás", categorySlug: "bebidas", group: "Refrigerantes e águas", prices: [reais(9)] },

  { slug: "cha-de-ervas", name: "Chá fresco de ervas", categorySlug: "bebidas", group: "Cafés e chás", prices: [reais(10)] },
  { slug: "cafe-coado", name: "Café coado", categorySlug: "bebidas", group: "Cafés e chás", prices: [reais(10)] },
  { slug: "cafe-expresso", name: "Café expresso Lavazza", categorySlug: "bebidas", group: "Cafés e chás", prices: [reais(11)] },

  // Sobremesas
  {
    slug: "creme-brulee-de-mangaba",
    name: "Crème brûlée de Mangaba",
    categorySlug: "sobremesas",
    description:
      "A união entre a acidez da mangaba, o gelado do creme e o crocante do caramelo maçaricado.",
    story:
      "Uma homenagem à fruta-símbolo do nosso estado: a chef une o clássico ao sabor típico de Sergipe.",
    prices: [reais(22)],
  },
  {
    slug: "ne-banana-nao",
    name: "Né Banana não",
    categorySlug: "sobremesas",
    description:
      "Marmelo de caju com especiarias, lâminas de queijo coalho maçaricado, praliné de castanha ralado e bolinhas de ambrosia.",
    prices: [reais(24)],
  },
  {
    slug: "amorosa",
    name: "Amorosa",
    categorySlug: "sobremesas",
    description:
      "Pão de ló de semente de coentro, brigadeiro de amendoim cozido, creme de limão e toffee de caramelo salgado.",
    story:
      "Um brinde à história de Antônia Amorosa, cantora sergipana de repercussão nacional.",
    prices: [reais(26)],
    photo: {
      src: "/images/pratos/amorosa.jpg",
      alt: "Sobremesa com merengue maçaricado, frutinhas, creme amarelo e calda vermelha sobre prato de cerâmica azul.",
      width: 1400,
      height: 933,
    },
  },
  {
    slug: "pudim-de-coco-verde",
    name: "Pudim de coco verde",
    categorySlug: "sobremesas",
    description: "Pudim elaborado com carne de coco verde, redução de vinho do Porto e crisps de gengibre.",
    prices: [reais(26)],
  },
  {
    slug: "bolinho-de-chuva-da-dada",
    name: "Bolinho de Chuva da Dada",
    categorySlug: "sobremesas",
    description: "Bolinho de chuva fofinho servido com brigadeiro de café e calda de doce de leite.",
    prices: [reais(35)],
  },
  {
    slug: "jardim-da-seichele",
    name: "Jardim da Seichele",
    categorySlug: "sobremesas",
    description:
      "Sobremesa servida num lindo jarro de flor, com bolo de cacau, ganache de chocolate meio amargo e crumble crocante.",
    prices: [reais(26)],
  },
];

export const chefPickSlugs: readonly string[] = [
  "quiabada-crocante",
  "moqueca-encontro-das-aguas",
  "amorosa",
];
