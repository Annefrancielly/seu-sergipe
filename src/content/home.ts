import type { Locale } from "@/i18n/config";

const pt = {
  hero: {
    words: ["Arte", "Sergipanidade", "Gastronomia"],
    lead: "Aqui, Sergipe chega à mesa sem pressa.",
    reserveLabel: "Reservar mesa",
    menuLabel: "Ver cardápio",
  },
  intro: {
    title: "Conheça o nosso restaurante",
    body:
      "Ingredientes da nossa terra, receitas que atravessam gerações e o olhar autoral da chef Seichele Barboza se encontram em pratos que contam de onde a gente vem — do mangue ao sertão, da capital ao interior do interior.",
    closing: "Sente-se, prove e fique um pouco mais.",
  },
  tastingMenus: {
    eyebrow: "Menus degustação",
    title: "Viva a experiência Seu Sergipe",
    lead: "Comer aqui é viajar sem sair da mesa.",
    revealLabel: "Descobrir",
    closeLabel: "Voltar",
    reserveLabel: "Quero viver esta experiência",
    note: "As etapas podem variar conforme a inspiração da chef e os insumos da região.",
    detailsLabel: "Detalhes no cardápio",
  },
  chefPicks: {
    eyebrow: "Sugestões da chef",
    menuLabel: "Cardápio completo",
    tasteLabel: "Quero provar",
  },
  portals: {
    eyebrow: "Para além da mesa",
    title: "Conheça mais",
    linkLabel: "Conhecer",
    chef: { eyebrow: "A chef", title: "Seichele Barboza", text: "A história e a cozinha de quem conduz a casa." },
    events: { eyebrow: "Eventos", title: "Celebre aqui", text: "Corporativo, casamentos e aniversários." },
    agenda: { eyebrow: "Agenda", title: "Programação", text: "Música, cafés e workshops com a chef." },
  },
  visit: {
    eyebrow: "Visite-nos",
    title: "Onde a viagem começa",
    directionsLabel: "Como chegar",
    reserveLabel: "Reservar mesa",
    hoursTitle: "Horários",
    reviewsTitle: "Quem já sentou à nossa mesa",
    reviewsCarousel: "Avaliações de clientes",
    ratingSuffix: "de 5 no Google",
  },
};

export type HomeContent = typeof pt;

const en: HomeContent = {
  hero: {
    words: ["Arte", "Sergipanidade", "Gastronomia"],
    lead: "Here, Sergipe comes to the table, unhurried.",
    reserveLabel: "Book a table",
    menuLabel: "See the menu",
  },
  intro: {
    title: "Discover our restaurant",
    body:
      "Ingredients from our land, recipes passed down through generations and the signature touch of chef Seichele Barboza come together in dishes that tell where we come from: from the mangroves to the sertão backlands, from the capital to the deepest countryside.",
    closing: "Take a seat, taste, and stay a little longer.",
  },
  tastingMenus: {
    eyebrow: "Tasting menus",
    title: "Live the Seu Sergipe experience",
    lead: "Here, every meal is a journey without leaving the table.",
    revealLabel: "Discover",
    closeLabel: "Back",
    reserveLabel: "I want this experience",
    note: "Courses may vary with the chef's inspiration and the region's seasonal ingredients.",
    detailsLabel: "Details on the menu",
  },
  chefPicks: {
    eyebrow: "Chef's picks",
    menuLabel: "Full menu",
    tasteLabel: "I want to try it",
  },
  portals: {
    eyebrow: "Beyond the table",
    title: "Discover more",
    linkLabel: "Explore",
    chef: { eyebrow: "The chef", title: "Seichele Barboza", text: "The story and the cooking of the woman who leads the house." },
    events: { eyebrow: "Events", title: "Celebrate here", text: "Corporate events, weddings and birthdays." },
    agenda: { eyebrow: "Agenda", title: "What's on", text: "Music, breakfasts and workshops with the chef." },
  },
  visit: {
    eyebrow: "Visit us",
    title: "Where the journey begins",
    directionsLabel: "Get directions",
    reserveLabel: "Book a table",
    hoursTitle: "Opening hours",
    reviewsTitle: "Guests who have sat at our table",
    reviewsCarousel: "Guest reviews",
    ratingSuffix: "out of 5 on Google",
  },
};

export const homeContent: Record<Locale, HomeContent> = { pt, en };
