import type { Testimonial } from "@/types/content";

export const testimonialsIntro = {
  title: "O que nossos clientes dizem",
  lead: "Histórias de quem já sentou à nossa mesa.",
  reviewsLabel: "Ver avaliações no Google",
} as const;

export const googleRatingSummary = {
  rating: 4.7,
  countLabel: "mais de 500 avaliações",
  checkedAt: "2026-10-19",
} as const;

export const testimonials: readonly Testimonial[] = [
  {
    author: "Elizabeth G.",
    text: "Se eu fizesse uma lista dos melhores lugares que já conheci no mundo, o Seu Sergipe estaria com certeza no topo. (…) O menu degustação foi uma verdadeira viagem pela gastronomia sergipana, com pratos muito criativos, ingredientes locais e sabores que surpreendem a cada etapa.",
    source: "google",
    rating: 5,
  },
  {
    author: "Thane T.",
    text: "Um dos melhores restaurantes em que já comi na vida. O ambiente é lindo, aconchegante e retrata muito bem a cultura do povo sergipano. A comida é extremamente saborosa, criativa e valoriza de forma incrível a culinária local.",
    source: "google",
    rating: 5,
  },
  {
    author: "Marcio S.",
    text: "Seichele é uma Lady nordestina. Nos recebe com um calor e carinho singular.",
    source: "google",
    rating: 5,
  },
  {
    author: "Fernando H. A.",
    text: "Definitivamente uma das melhores experiências gastronômicas que tive em Aracaju. A começar pelo ambiente: rústico e, ao mesmo tempo, confortável, charmoso e acolhedor.",
    source: "google",
    rating: 5,
  },
  {
    author: "Rose A.",
    text: "Em minha visita a minha terra natal, pretendia resgatar lembranças queridas em cada visita, em cada abraço, em cada prato.",
    source: "google",
    rating: 5,
  },
  {
    author: "Vinicius J.",
    text: "Melhor experiência em Aracaju. Pedimos uma mariscada de entrada e um risoto com camarões e o polvo à sergipana como pratos principais.",
    source: "google",
    rating: 5,
  },
];
