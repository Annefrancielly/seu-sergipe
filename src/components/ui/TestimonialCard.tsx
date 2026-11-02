import type { Locale } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import type { Testimonial } from "@/types/content";

const STAR_PATH =
  "M12 3 L14.6 8.6 L20.6 9.3 L16.1 13.4 L17.3 19.4 L12 16.4 L6.7 19.4 L7.9 13.4 L3.4 9.3 L9.4 8.6 Z";

type TestimonialCardProps = {
  testimonial: Testimonial;
  shape?: "folha" | "folha-inversa";
  locale?: Locale;
};

export function TestimonialCard({ testimonial, shape = "folha", locale = "pt" }: TestimonialCardProps) {
  const { author, text, rating, source, date } = testimonial;
  const t = ui[locale].testimonial;

  return (
    <figure
      className={`vidro-cafe flex h-full flex-col p-7 ${shape === "folha" ? "rounded-folha" : "rounded-folha-inversa"}`}
    >
      {rating && (
        <div className="flex items-center gap-1 text-accent">
          {Array.from({ length: 5 }, (_, index) => (
            <svg key={index} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-5">
              <path
                d={STAR_PATH}
                className={index < rating ? "fill-current" : "traco-marca"}
              />
            </svg>
          ))}
          <span className="sr-only">{t.rating(rating)}</span>
        </div>
      )}
      <blockquote lang="pt-BR" className="mt-4 text-lg leading-relaxed">
        <p>{text}</p>
      </blockquote>
      <figcaption className="mt-auto pt-6">
        <span className="block font-semibold">{author}</span>
        <span className="block text-sm text-emphasis">
          {t.sources[source]}
          {date && ` · ${date}`}
        </span>
        {t.originalLanguage && <span className="mt-1 block text-xs text-ink/60">{t.originalLanguage}</span>}
      </figcaption>
    </figure>
  );
}
