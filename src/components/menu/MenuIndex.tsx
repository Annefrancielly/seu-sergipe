import type { MenuCategory } from "@/types/content";

type MenuIndexProps = {
  categories: readonly MenuCategory[];
};

export function MenuIndex({ categories }: MenuIndexProps) {
  return (
    <nav
      aria-label="Seções do cardápio"
      data-surface="verde"
      className="sticky top-[calc(5rem+env(safe-area-inset-top))] z-30 border-y border-ink/[0.06] bg-musgo-noite/85 text-ink backdrop-blur-md"
    >
      <div className="overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="mx-auto flex w-max">
          {categories.map((category) => (
            <li key={category.slug}>
              <a
                href={`#${category.slug}`}
                className="inline-flex min-h-12 items-center px-3 text-xs uppercase tracking-[0.18em] whitespace-nowrap text-ink/75 transition-colors hover:text-accent"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
