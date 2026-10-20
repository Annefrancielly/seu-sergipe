import { formatPrice } from "@/lib/price";
import type { Dish } from "@/types/content";

type MenuListProps = {
  dishes: readonly Dish[];
};

export function MenuList({ dishes }: MenuListProps) {
  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.slug} id={dish.slug} className="py-2.5">
          <div className="flex items-baseline gap-3">
            <span className="font-semibold">{dish.name}</span>
            <span aria-hidden="true" className="flex-1 border-b border-dotted border-ink/30" />
            {dish.prices?.map((price) => (
              <span key={price.amountInCents} className="font-display text-lg tabular-nums text-emphasis">
                {formatPrice(price.amountInCents)}
              </span>
            ))}
          </div>
          {dish.description && <p className="mt-1 text-sm">{dish.description}</p>}
          {dish.items && <p className="mt-1 text-sm">{dish.items.join(" · ")}</p>}
          {dish.note && <p className="mt-1 text-sm italic">{dish.note}</p>}
        </li>
      ))}
    </ul>
  );
}
