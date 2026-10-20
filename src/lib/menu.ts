import type { Dish } from "@/types/content";

export function findDuplicateSlugs(dishes: readonly Dish[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const dish of dishes) {
    if (seen.has(dish.slug)) duplicates.add(dish.slug);
    seen.add(dish.slug);
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
