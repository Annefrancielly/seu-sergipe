export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

export type DishTag = "reserva-previa" | "sem-alcool" | "consultar-disponibilidade";

export type Price = {
  label?: string;
  amountInCents: number;
};


export type MenuCategory = {
  slug: string;
  name: string;
  description: string;
  cover?: ImageAsset;
  notes?: readonly string[];
};

export type Dish = {
  slug: string;
  name: string;
  categorySlug: string;
  description?: string;
  group?: string;
  story?: string;
  photo?: ImageAsset;
  prices?: readonly Price[];
  items?: readonly string[];
  steps?: number;
  note?: string;
  tags?: readonly DishTag[];
};

export type Weekday =
  | "domingo"
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado";

export type ServicePeriod = {
  label: string;
  opens: string;
  closes: string;
};

export type OpeningHours = {
  day: Weekday;
  periods: readonly ServicePeriod[];
};

export type EventFormat = {
  slug: string;
  title: string;
  description: string;
};

export type AgendaText = {
  title: string;
  description?: string;
  schedule?: string;
  location?: string;
};

export type AgendaItem = {
  slug: string;
  kind: "evento" | "workshop";
  date: string;
  until?: string;
  time?: string;
  endTime?: string;
  priceInCents?: number;
  text: { pt: AgendaText; en: AgendaText };
};

export type Testimonial = {
  author: string;
  text: string;
  source: "google" | "depoimento-autorizado";
  rating?: 1 | 2 | 3 | 4 | 5;
  date?: string;
};
