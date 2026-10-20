import type { Dish, MenuCategory } from "@/types/content";

export const menuCategories: readonly MenuCategory[] = [
  { slug: "entradas", name: "Entradas e snacks" },
  { slug: "moquecas", name: "Moquecas" },
  { slug: "sobremesas", name: "Sobremesas" },
];

export const dishes: readonly Dish[] = [
  {
    slug: "quiabada-crocante",
    name: "Quiabada crocante",
    description:
      "Releitura da típica quiabada sergipana, com referência aos bolinhos de capitão. Picles de maxixe e coulis de tamarindo dão acidez e presença ao prato.",
    categorySlug: "entradas",
    photo: {
      src: "/images/pratos/quiabada-crocante.jpg",
      alt: "Bolinho empanado e dourado, coberto por lascas de queijo e uma flor azul, sobre emulsão verde em cumbuca branca.",
      width: 933,
      height: 1400,
      objectPosition: "50% 60%",
    },
  },
  {
    slug: "moqueca-encontro-das-aguas",
    name: "Moqueca Encontro das Águas",
    description:
      "Peixe, polvo e camarão no molho de leite de coco, com pirão, tomate, cebola, pimentão, pimenta de cheiro e um leve toque de gengibre. Acompanha vinagrete, farofa de saburica defumada e arroz de castanha.",
    categorySlug: "moquecas",
    photo: {
      src: "/images/pratos/moqueca-encontro-das-aguas.jpg",
      alt: "Panela escura com polvo, camarões e pimentões coloridos, finalizada com coentro, ao lado de uma panela de camarões com limão.",
      width: 720,
      height: 1280,
      objectPosition: "50% 72%",
    },
  },
  {
    slug: "amorosa",
    name: "Amorosa",
    description:
      "Pão de ló de semente de coentro, brigadeiro de amendoim cozido, creme de limão e toffee de caramelo salgado.",
    categorySlug: "sobremesas",
    story:
      "Um brinde à história de Antônia Amorosa, cantora sergipana de repercussão nacional.",
    photo: {
      src: "/images/pratos/amorosa.jpg",
      alt: "Sobremesa com merengue maçaricado, frutinhas, creme amarelo e calda vermelha sobre prato de cerâmica azul.",
      width: 1400,
      height: 933,
    },
  },
];

export const chefPickSlugs: readonly string[] = [
  "quiabada-crocante",
  "moqueca-encontro-das-aguas",
  "amorosa",
];
