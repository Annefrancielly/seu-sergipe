import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import type { MenuCategory } from "@/types/content";

type CategoryCardProps = {
  category: MenuCategory;
  index: number;
};

export function CategoryCard({ category, index }: CategoryCardProps) {
  const radius = index % 2 === 0 ? "rounded-folha" : "rounded-folha-inversa";

  return (
    <Link href={`/cardapio/${category.slug}`} className="group block">
      <span className={cn("relative block aspect-square overflow-hidden transition-[scale] duration-150 group-active:scale-[0.97]", radius)}>
        {category.cover ? (
          <Image
            src={category.cover.src}
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 1024px) 20vw, 30vw"
            className="object-cover transition-transform duration-500 ease-organic motion-safe:group-hover:scale-105"
            style={{ objectPosition: category.cover.objectPosition }}
          />
        ) : (
          <span
            data-surface="marrom"
            className="flex size-full items-center justify-center bg-surface text-accent"
          >
            <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className="size-3/5">
              <path className="traco-marca" d="M10 62 C28 40 44 40 56 54 C68 68 82 66 90 46" />
              <path className="traco-marca" d="M10 76 C28 54 44 54 56 68 C68 82 82 80 90 60" />
            </svg>
          </span>
        )}
      </span>
      <span className="mt-2 block text-center text-sm font-semibold leading-tight underline-offset-4 group-hover:underline sm:text-left sm:text-base">
        {category.name}
      </span>
    </Link>
  );
}
