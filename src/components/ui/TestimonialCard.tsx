import type { Testimonial } from "@/types/content";

const SOURCE_LABELS: Record<Testimonial["source"], string> = {
  google: "Avaliação no Google",
  "depoimento-autorizado": "Depoimento",
};

const STAR_PATH =
  "M12 3 L14.6 8.6 L20.6 9.3 L16.1 13.4 L17.3 19.4 L12 16.4 L6.7 19.4 L7.9 13.4 L3.4 9.3 L9.4 8.6 Z";

type TestimonialCardProps = {
  testimonial: Testimonial;
  shape?: "folha" | "folha-inversa";
};

export function TestimonialCard({ testimonial, shape = "folha" }: TestimonialCardProps) {
  const { author, text, rating, source, date } = testimonial;

  return (
    <figure
      data-surface="creme"
      className={`flex h-full flex-col bg-surface p-7 text-ink ${shape === "folha" ? "rounded-folha" : "rounded-folha-inversa"}`}
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
          <span className="sr-only">Nota {rating} de 5</span>
        </div>
      )}
      <blockquote className="mt-4 text-lg leading-relaxed">
        <p>{text}</p>
      </blockquote>
      <figcaption className="mt-auto pt-6">
        <span className="block font-semibold">{author}</span>
        <span className="block text-sm text-emphasis">
          {SOURCE_LABELS[source]}
          {date && ` · ${date}`}
        </span>
      </figcaption>
    </figure>
  );
}
