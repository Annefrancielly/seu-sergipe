import { dishes, menuCategories } from "@/content/menu";
import { categoriesEn, dishesEn, groupsEn, priceLabelsEn } from "@/content/menu.en";
import type { Locale } from "@/i18n/config";
import type { Dish, MenuCategory } from "@/types/content";

function translateDish(dish: Dish): Dish {
  const text = dishesEn[dish.slug];
  return {
    ...dish,
    name: text?.name ?? dish.name,
    description: text?.description ?? dish.description,
    note: text?.note ?? dish.note,
    items: text?.items ?? dish.items,
    group: dish.group ? (groupsEn[dish.group] ?? dish.group) : undefined,
    prices: dish.prices?.map((price) => ({
      ...price,
      label: price.label ? (priceLabelsEn[price.label] ?? price.label) : undefined,
    })),
    photo: dish.photo && { ...dish.photo, alt: text?.photoAlt ?? dish.photo.alt },
  };
}

function translateCategory(category: MenuCategory): MenuCategory {
  const text = categoriesEn[category.slug];
  return text ? { ...category, name: text.name, description: text.description, notes: text.notes } : category;
}

const englishMenu = {
  categories: menuCategories.map(translateCategory),
  dishes: dishes.map(translateDish),
};

export function getMenu(locale: Locale): { categories: readonly MenuCategory[]; dishes: readonly Dish[] } {
  return locale === "en" ? englishMenu : { categories: menuCategories, dishes };
}
