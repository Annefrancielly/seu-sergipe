export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Kitchen = "autoral" | "origem";

export type DishTag =
  | "adaptavel-vegetariano"
  | "adaptavel-vegano"
  | "reserva-previa";

export type MenuCategory = {
  slug: string;
  name: string;
  description?: string;
};

export type Dish = {
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  kitchen?: Kitchen;
  story?: string;
  photo?: ImageAsset;
  priceInCents?: number;
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

export type Testimonial = {
  author: string;
  text: string;
  source: "google" | "depoimento-autorizado";
  rating?: 1 | 2 | 3 | 4 | 5;
  date?: string;
};
