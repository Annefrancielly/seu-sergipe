import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Carousel } from "@/components/ui/Carousel";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { siteConfig } from "@/config/site";
import { googleRatingSummary, testimonials, testimonialsIntro } from "@/content/testimonials";

const ratingFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function TestimonialsSection() {
  const rating = ratingFormatter.format(googleRatingSummary.rating);

  return (
    <Section id="avaliacoes" surface="verde" labelledBy="avaliacoes-titulo" className="py-secao">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="avaliacoes-titulo" className="font-display text-4xl leading-tight sm:text-5xl">
            {testimonialsIntro.title}
          </h2>
          <p className="mt-4 text-lg">{testimonialsIntro.lead}</p>
        </div>
        <p className="shrink-0">
          <span className="font-display text-6xl leading-none text-emphasis">{rating}</span>
          <span className="ml-2 text-lg">de 5 no Google</span>
          <span className="mt-1 block text-sm">{googleRatingSummary.countLabel}</span>
        </p>
      </div>

      {testimonials.length > 0 && (
        <Carousel label="Avaliações de clientes" className="mx-auto mt-12 max-w-6xl">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
              shape={index % 2 === 0 ? "folha" : "folha-inversa"}
            />
          ))}
        </Carousel>
      )}

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <ButtonLink href={siteConfig.links.googleReviews} withArrow>
          {testimonialsIntro.reviewsLabel}
        </ButtonLink>
      </div>
    </Section>
  );
}
