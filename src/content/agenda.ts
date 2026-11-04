import type { Locale } from "@/i18n/config";
import type { AgendaItem } from "@/types/content";

const pt = {
  eyebrow: "Agenda",
  title: "Programação da casa",
  lead: "Música, cafés, encontros e workshops com a chef Seichele Barboza. Confira as próximas datas.",
  upcomingTitle: "Próximas datas",
  emptyTitle: "Novas datas em breve",
  emptyText: "Quer ser avisado da próxima programação? Fale com a gente pelo WhatsApp.",
  notifyLabel: "Quero ser avisado",
  notifyMessage: "Olá! Quero ser avisado da próxima programação do Seu Sergipe.",
  joinLabel: "Quero participar",
  joinMessage: (title: string, date: string) => `Olá! Quero participar de "${title}" (${date}).`,
  kinds: { evento: "Evento", workshop: "Workshop" } as Record<AgendaItem["kind"], string>,
  from: "A partir de",
  perPerson: "por pessoa",
  venue: "Local",
};

export type AgendaContent = typeof pt;

const en: AgendaContent = {
  eyebrow: "Agenda",
  title: "What's on",
  lead: "Music, breakfasts, gatherings and workshops with chef Seichele Barboza. See the upcoming dates.",
  upcomingTitle: "Upcoming dates",
  emptyTitle: "New dates coming soon",
  emptyText: "Want to hear about what's next? Message us on WhatsApp.",
  notifyLabel: "Notify me",
  notifyMessage: "Hello! I'd like to hear about upcoming events at Seu Sergipe.",
  joinLabel: "I want to join",
  joinMessage: (title: string, date: string) => `Hello! I'd like to join "${title}" (${date}).`,
  kinds: { evento: "Event", workshop: "Workshop" },
  from: "From",
  perPerson: "per person",
  venue: "Venue",
};

export const agendaContent: Record<Locale, AgendaContent> = { pt, en };

export const agendaItems: readonly AgendaItem[] = [
  {
    slug: "cafe-da-manha-domingos",
    kind: "evento",
    date: "2026-11-01",
    until: "2027-01-31",
    time: "07:00",
    endTime: "10:00",
    priceInCents: 5000,
    text: {
      pt: {
        title: "Café da manhã · Domingos à mesa Seu Sergipe",
        schedule: "Todos os domingos",
        description: "Aos domingos, um encontro marcado à mesa: café da manhã em edição especial durante três meses.",
      },
      en: {
        title: "Breakfast · Domingos à mesa Seu Sergipe",
        schedule: "Every Sunday",
        description: "A standing Sunday date at our table: a special-edition breakfast, running for three months.",
      },
    },
  },
  {
    slug: "blues-e-soul-thais-e-vini-bufato",
    kind: "evento",
    date: "2026-11-07",
    time: "20:00",
    text: {
      pt: {
        title: "Blues & Soul com Thaís e Vini Bufato",
        description:
          "Menu experimental com a chef Seichele Barboza. Uma noite para sentir a música, brindar à vida e experimentar a melhor gastronomia.",
      },
      en: {
        title: "Blues & Soul with Thaís and Vini Bufato",
        description:
          "An experimental menu by chef Seichele Barboza. A night to feel the music, raise a glass to life and enjoy the finest food.",
      },
    },
  },
  {
    slug: "cafe-e-pilates-onix",
    kind: "evento",
    date: "2026-11-08",
    text: {
      pt: { title: "Café + Pilates Ônix" },
      en: { title: "Café + Pilates Ônix" },
    },
  },
  {
    slug: "vinho-e-jazz",
    kind: "evento",
    date: "2026-11-28",
    text: {
      pt: { title: "Vinho & jazz" },
      en: { title: "Wine & Jazz" },
    },
  },
  {
    slug: "aula-do-mar",
    kind: "workshop",
    date: "2026-11-30",
    time: "18:30",
    priceInCents: 26000,
    text: {
      pt: { title: "Aula do Mar", description: "Ceviche, tartar, crudo e carpaccio.", location: "Merine" },
      en: { title: "Aula do Mar", description: "Ceviche, tartare, crudo and carpaccio.", location: "Merine" },
    },
  },
];
