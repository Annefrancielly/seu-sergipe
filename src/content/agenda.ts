import type { Locale } from "@/i18n/config";
import type { Workshop } from "@/types/content";

const pt = {
  eyebrow: "Agenda da chef",
  title: "Workshops com Seichele Barboza",
  lead: "Encontros na cozinha do Seu Sergipe para aprender, provar e conversar sobre os ingredientes e as tradições da nossa terra.",
  upcomingTitle: "Próximas datas",
  emptyTitle: "Novas datas em breve",
  emptyText: "Quer ser avisado das próximas turmas? Fale com a gente pelo WhatsApp.",
  notifyLabel: "Quero ser avisado",
  notifyMessage: "Olá! Quero ser avisado das próximas datas de workshops da chef Seichele Barboza.",
  joinLabel: "Quero participar",
  joinMessage: (title: string, date: string) => `Olá! Quero participar do workshop "${title}" (${date}).`,
};

export type AgendaContent = typeof pt;

const en: AgendaContent = {
  eyebrow: "Chef's workshops",
  title: "Workshops with Seichele Barboza",
  lead: "Sessions in the Seu Sergipe kitchen to learn, taste and talk about the ingredients and traditions of our land.",
  upcomingTitle: "Upcoming dates",
  emptyTitle: "New dates coming soon",
  emptyText: "Want to hear about the next sessions? Message us on WhatsApp.",
  notifyLabel: "Notify me",
  notifyMessage: "Hello! I'd like to hear about the next workshop dates with chef Seichele Barboza.",
  joinLabel: "I want to join",
  joinMessage: (title: string, date: string) => `Hello! I'd like to join the workshop "${title}" (${date}).`,
};

export const agendaContent: Record<Locale, AgendaContent> = { pt, en };

export const workshops: readonly Workshop[] = [];
