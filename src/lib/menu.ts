import type { Dish, MenuCategory } from "@/types/content";

export function findDuplicateSlugs(items: readonly { slug: string }[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const { slug } of items) {
    if (seen.has(slug)) duplicates.add(slug);
    seen.add(slug);
  }

  return [...duplicates];
}

export function resolveDishes(
  slugs: readonly string[],
  dishes: readonly Dish[],
): Dish[] {
  const bySlug = new Map(dishes.map((dish) => [dish.slug, dish]));

  return slugs.map((slug) => {
    const dish = bySlug.get(slug);
    if (!dish) {
      throw new Error(`Prato não encontrado no cardápio: "${slug}"`);
    }
    return dish;
  });
}

export function dishesInCategory(dishes: readonly Dish[], categorySlug: string): Dish[] {
  return dishes.filter((dish) => dish.categorySlug === categorySlug);
}

export type DishGroup = {
  title?: string;
  dishes: Dish[];
};

export function groupDishes(dishes: readonly Dish[]): DishGroup[] {
  const groups: DishGroup[] = [];

  for (const dish of dishes) {
    const last = groups.at(-1);
    if (last && last.title === dish.group) {
      last.dishes.push(dish);
    } else {
      groups.push({ title: dish.group, dishes: [dish] });
    }
  }

  return groups;
}

export type CategoryNeighbors = {
  previous?: MenuCategory;
  next?: MenuCategory;
};

export function categoryNeighbors(
  categories: readonly MenuCategory[],
  slug: string,
): CategoryNeighbors {
  const index = categories.findIndex((category) => category.slug === slug);
  if (index === -1) return {};
  return { previous: categories[index - 1], next: categories[index + 1] };
}

export const DISH_TAG_LABELS: Record<NonNullable<Dish["tags"]>[number], string> = {
  "reserva-previa": "Somente com reserva prévia",
  "sem-alcool": "Sem álcool",
  "consultar-disponibilidade": "Consulte a disponibilidade",
};

export function interestPhrase(dish: Dish): string {
  if (dish.categorySlug === "menu-degustacao") {
    return dish.name.startsWith("Menu")
      ? `Tenho interesse no ${dish.name}.`
      : `Tenho interesse no menu degustação ${dish.name}.`;
  }
  return `Vi ${dish.name} no cardápio e quero provar!`;
}

export function lowestPrice(dish: Dish): number | undefined {
  const amounts = dish.prices?.map((price) => price.amountInCents) ?? [];
  return amounts.length > 0 ? Math.min(...amounts) : undefined;
}
