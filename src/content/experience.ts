export type TastingMenu = {
  slug: string;
  name: string;
  steps: number;
  description: string;
  reservationIntro: string;
  note?: string;
};

export const experienceIntro = {
  title: "Viva a experiência Seu Sergipe",
  lead: "Comer aqui é viajar sem sair da mesa.",
  body:
    "Entre conversas, cheiros e pratos que chegam um após o outro, você vai descobrindo um Sergipe que muita gente ainda não conhece — e que a gente tem orgulho de apresentar.",
  closing: "Afrouxe o cinto: a viagem já vai começar.",
  reserveLabel: "Faça sua reserva",
  menusTitle: "Menus Degustação",
  menusNote:
    "As etapas podem variar conforme a inspiração da chef e os insumos disponíveis na região.",
  photo: {
    src: "/images/pratos/menu-degustacao-etapa.jpg",
    alt: "Etapa do menu degustação servida em cumbuca de cerâmica artesanal, com fruto verde aberto sobre base vermelha.",
  },
} as const;

export const tastingMenus: readonly TastingMenu[] = [
  {
    slug: "origem-sergipana",
    name: "Origem Sergipana",
    steps: 4,
    description:
      "Um primeiro mergulho: entrada, amuse-bouche, o prato principal que você escolher no cardápio e sobremesa.",
    reservationIntro: "Tenho interesse no menu degustação Origem Sergipana.",
  },
  {
    slug: "experiencia-do-cabrunco",
    name: "Experiência do Cabrunco",
    steps: 8,
    description:
      "Uma viagem pelos sabores marcantes da nossa terra, inspirada nas tradições sergipanas, com opção de harmonização com drinks ou vinhos.",
    reservationIntro: "Tenho interesse no menu degustação Experiência do Cabrunco.",
  },
  {
    slug: "menu-sensacoes",
    name: "Menu Sensações",
    steps: 10,
    description:
      "Criado com exclusividade pela chef para a sua mesa, harmonizado com drinks e servido em espaço reservado.",
    reservationIntro: "Tenho interesse no Menu Sensações.",
    note: "Somente com reserva prévia",
  },
];
