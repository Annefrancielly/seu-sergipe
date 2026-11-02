import type { Locale } from "@/i18n/config";

const pt = {
  eyebrow: "A chef",
  name: "Seichele Barboza",
  lead: "Seichele cozinha como quem conta a história da própria família — e, por extensão, a de Sergipe.",
  historyTitle: "Trajetória",
  paragraphs: [
    "Pesquisadora dos costumes alimentares do nosso povo e formada em Gastronomia, ela aplica técnicas do mundo a ingredientes que nasceram aqui.",
    "Leva essa cozinha para outros lugares com o projeto Seu Sergipe Pelo Mundo e transforma barro em arte junto à comunidade ribeirinha de Santana de São Francisco.",
    "Fora da cozinha, atua em projetos com comunidades quilombolas, indígenas e ribeirinhas.",
  ],
  quote:
    "A base dos meus passos é a promoção da paz, da cultura e da educação. Esse tripé é a chave para a transformação do mundo.",
  signature: "Bonita & Cheirosa",
  photoAlt: "Chef Seichele Barboza sorrindo ao pôr do sol, de óculos de lentes rosadas e dólmã claro.",
  picks: {
    title: "Sugestões da Chef",
    lead: "Cada prato guarda uma história. Comece por estas.",
    reserveLabel: "Reserve sua mesa",
    reservationIntro: "Vim pela página da chef e quero reservar uma mesa.",
    agendaLabel: "Agenda da chef",
  },
};

export type ChefContent = typeof pt;

const en: ChefContent = {
  eyebrow: "The chef",
  name: "Seichele Barboza",
  lead: "Seichele cooks the way one tells the story of one's own family, and with it, the story of Sergipe.",
  historyTitle: "Her story",
  paragraphs: [
    "A researcher of our people's food customs with a degree in Gastronomy, she applies techniques from around the world to ingredients born here.",
    "She takes this cuisine to other places through the Seu Sergipe Pelo Mundo project and turns clay into art alongside the riverside community of Santana de São Francisco.",
    "Outside the kitchen, she works on projects with Afro-Brazilian quilombola, Indigenous and riverside communities.",
  ],
  quote:
    "Every step I take is grounded in promoting peace, culture and education. These three pillars are the key to transforming the world.",
  signature: "Bonita & Cheirosa",
  photoAlt: "Chef Seichele Barboza smiling at sunset, wearing rose-tinted glasses and a light chef's jacket.",
  picks: {
    title: "Chef's Picks",
    lead: "Every dish holds a story. Start with these.",
    reserveLabel: "Book your table",
    reservationIntro: "I found you through the chef's page and would like to book a table.",
    agendaLabel: "Chef's workshops",
  },
};

export const chefContent: Record<Locale, ChefContent> = { pt, en };
