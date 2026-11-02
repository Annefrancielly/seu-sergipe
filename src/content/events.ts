import type { Locale } from "@/i18n/config";
import type { EventFormat } from "@/types/content";

const pt = {
  eyebrow: "Eventos",
  title: "Celebre no Seu Sergipe",
  lead: "Encontros pensados pela chef, com a cozinha sergipana como anfitriã e o salão reservado para quem você escolher.",
  formatsTitle: "Formatos de evento",
  closingTitle: "Conte o que você imagina",
  closing: "Diga a data, o número de convidados e o tipo de celebração. A gente monta a proposta com você.",
  quoteLabel: "Pedir orçamento",
  quoteMessage: (format?: string) =>
    format
      ? `Olá! Vim pelo site do Seu Sergipe e quero um orçamento de evento: ${format}.`
      : "Olá! Vim pelo site do Seu Sergipe e quero um orçamento de evento.",
  formats: [
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
  ] as readonly EventFormat[],
};

export type EventsContent = typeof pt;

const en: EventsContent = {
  eyebrow: "Events",
  title: "Celebrate at Seu Sergipe",
  lead: "Gatherings designed by the chef, with Sergipe's cuisine as your host and the dining room reserved for the people you choose.",
  formatsTitle: "Event formats",
  closingTitle: "Tell us what you have in mind",
  closing: "Share the date, the number of guests and the kind of celebration. We'll put the proposal together with you.",
  quoteLabel: "Request a quote",
  quoteMessage: (format?: string) =>
    format
      ? `Hello! I found Seu Sergipe through the website and would like a quote for an event: ${format}.`
      : "Hello! I found Seu Sergipe through the website and would like a quote for an event.",
  formats: [
    {
      slug: "corporativo",
      title: "Corporate",
      description: "Meetings, year-end parties and team gatherings with Sergipe's cuisine at the table.",
    },
    {
      slug: "casamentos",
      title: "Weddings",
      description: "Intimate celebrations, with a menu the chef designs for your day.",
    },
    {
      slug: "aniversarios",
      title: "Birthdays",
      description: "Bring the people you love together around a generous Sergipe table.",
    },
  ],
};

export const eventsContent: Record<Locale, EventsContent> = { pt, en };
