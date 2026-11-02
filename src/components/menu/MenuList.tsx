import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { DISH_TAG_LABELS } from "@/lib/menu";
import { formatPrice } from "@/lib/price";
import type { Dish, Price } from "@/types/content";

function Prices({ prices }: { prices: readonly Price[] }) {
  return (
    <span className="flex shrink-0 flex-wrap items-baseline justify-end gap-x-4 gap-y-1">
      {prices.map((price) => (
        <span key={`${price.label ?? ""}-${price.amountInCents}`} className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
          {price.label && <span className="text-xs text-ink/60">{price.label}</span>}
          <span className="font-display text-xl tabular-nums text-emphasis">{formatPrice(price.amountInCents)}</span>
        </span>
      ))}
    </span>
  );
}

type MenuListProps = {
  dishes: readonly Dish[];
  locale: Locale;
};

export function MenuList({ dishes, locale }: MenuListProps) {
  return (
    <ul className="mt-4">
      {dishes.map((dish) => {
        const labelledPrices = (dish.prices?.length ?? 0) > 1;

        return (
          <li key={dish.slug} id={dish.slug} className="scroll-mt-16 py-4">
            <div className="flex items-baseline gap-3">
              <span className="min-w-0 font-semibold uppercase tracking-[0.06em]">
                {dish.name}
                {dish.steps !== undefined && (
                  <span className="ml-2 text-xs font-normal tracking-[0.2em] text-emphasis">{ui[locale].dish.steps(dish.steps)}</span>
                )}
              </span>
              <span aria-hidden="true" className="min-w-6 flex-1 border-b border-dotted border-ink/25" />
              {dish.prices && !labelledPrices && <Prices prices={dish.prices} />}
            </div>
            {dish.description && <p className="mt-1.5 max-w-[38rem] text-sm leading-relaxed text-ink/70">{dish.description}</p>}
            {dish.items && <p className="mt-1.5 max-w-[38rem] text-sm leading-relaxed text-ink/60">{dish.items.join(" · ")}</p>}
            {dish.prices && labelledPrices && (
              <div className="mt-2">
                <Prices prices={dish.prices} />
              </div>
            )}
            {(dish.note || dish.tags) && (
              <p className="mt-1.5 text-xs italic text-ink/55">
                {[dish.note, ...(dish.tags ?? []).map((tag) => DISH_TAG_LABELS[locale][tag])].filter(Boolean).join(" · ")}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
