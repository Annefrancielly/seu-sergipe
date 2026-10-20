import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/price";
import type { Price } from "@/types/content";

type PriceListProps = {
  prices: readonly Price[];
  className?: string;
};

export function PriceList({ prices, className }: PriceListProps) {
  const [single] = prices;

  if (prices.length === 1 && single && !single.label) {
    return (
      <p className={cn("font-display text-2xl tabular-nums text-emphasis", className)}>
        {formatPrice(single.amountInCents)}
      </p>
    );
  }

  return (
    <dl className={cn("space-y-1.5", className)}>
      {prices.map((price) => (
        <div key={price.label ?? price.amountInCents} className="flex items-baseline justify-between gap-4">
          <dt className="text-sm">{price.label}</dt>
          <dd className="font-display text-xl tabular-nums text-emphasis">{formatPrice(price.amountInCents)}</dd>
        </div>
      ))}
    </dl>
  );
}
