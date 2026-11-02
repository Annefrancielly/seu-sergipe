import type { EventFormat } from "@/types/content";

export const eventsIntro = {
  eyebrow: "Eventos",
  title: "Celebre no Seu Sergipe",
  lead: "Encontros pensados pela chef, com a cozinha sergipana como anfitriã e o salão reservado para quem você escolher.",
  closingTitle: "Conte o que você imagina",
  closing: "Diga a data, o número de convidados e o tipo de celebração. A gente monta a proposta com você.",
  quoteLabel: "Pedir orçamento",
} as const;

export const eventFormats: readonly EventFormat[] = [
  {
    slug: "corporativo",
    title: "Corporativo",
    description: "Reuniões, confraternizações e encontros de equipe com a cozinha sergipana à mesa.",
  },
  {
    slug: "casamentos",
    title: "Casamentos",
    description: "Celebrações íntimas, com um menu pensado pela chef para o dia de vocês.",
  },
  {
    slug: "aniversarios",
    title: "Aniversários",
    description: "Para reunir quem você ama em volta de uma mesa farta de Sergipe.",
  },
];
