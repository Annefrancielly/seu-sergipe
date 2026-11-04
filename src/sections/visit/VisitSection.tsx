import { PhotoBackdrop } from "@/components/graphics/PhotoBackdrop";
import { OpenStatus } from "@/components/hours/OpenStatus";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Carousel } from "@/components/ui/Carousel";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { siteConfig } from "@/config/site";
import { homeContent } from "@/content/home";
import { openingHours } from "@/content/opening-hours";
import { googleRatingSummary, testimonials, testimonialsText } from "@/content/testimonials";
import { type Locale, localeMeta } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { formatHourRange, groupOpeningHours, periodLabel } from "@/lib/opening-hours";

export function VisitSection({ locale }: { locale: Locale }) {
  const { address } = siteConfig;
  const visitIntro = homeContent[locale].visit;
  const reviewsText = testimonialsText[locale];
  const rows = groupOpeningHours(openingHours, locale);
  const ratingFormatter = new Intl.NumberFormat(localeMeta[locale].intl, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section
      id="visite"
      data-surface="verde"
      aria-labelledby="visite-titulo"
      className="relative isolate overflow-hidden bg-surface py-secao text-ink"
    >
      <PhotoBackdrop image="/images/casa/fachada-noite.jpg" focus="direita" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12 md:gap-8">
        <div className="surgir text-center md:col-span-5 md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-emphasis">{visitIntro.eyebrow}</p>
          <h2 id="visite-titulo" className="mt-3 font-display text-4xl leading-none sm:text-6xl">
            {visitIntro.title}
          </h2>
          <address className="mt-6 text-lg not-italic leading-relaxed">
            {address.street}
            <br />
            {address.neighborhood}, {address.city} – {address.state}
          </address>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <ReservationTrigger>{visitIntro.reserveLabel}</ReservationTrigger>
            <ButtonLink href={siteConfig.links.maps} variant="secondary" locale={locale}>
              {visitIntro.directionsLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="surgir surgir-depois vidro rounded-[1.75rem] p-7 sm:p-9 md:col-span-6 md:col-start-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-3xl">{visitIntro.hoursTitle}</h3>
            <OpenStatus />
          </div>
          <dl className="mt-5 space-y-5">
            {rows.map((row) => (
              <div key={row.days}>
                <dt className="text-xs uppercase tracking-[0.24em] text-emphasis">{row.days}</dt>
                <dd className="mt-2">
                  {row.periods.length === 0 ? (
                    <p>{ui[locale].hours.closed}</p>
                  ) : (
                    <ul className="space-y-1">
                      {row.periods.map((period) => (
                        <li key={period.label} className="flex justify-between gap-6 border-b border-ink/15 pb-1">
                          <span>{periodLabel(period.label, locale)}</span>
                          <span className="tabular-nums">{formatHourRange(period.opens, period.closes, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {testimonials.length > 0 && (
        <div className="mt-20">
          <div className="surgir mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <h3 className="font-display text-3xl leading-none sm:text-4xl">{visitIntro.reviewsTitle}</h3>
            <p className="flex items-baseline gap-2">
              <span className="font-display text-5xl leading-none text-emphasis">
                {ratingFormatter.format(googleRatingSummary.rating)}
              </span>
              <span className="text-sm">
                {visitIntro.ratingSuffix} · {reviewsText.countLabel}
              </span>
            </p>
          </div>
          <Carousel label={visitIntro.reviewsCarousel} className="surgir surgir-depois mx-auto mt-8 max-w-6xl">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} locale={locale} />
            ))}
          </Carousel>
          <div className="mx-auto mt-4 max-w-6xl px-6 text-center md:text-left">
            <ButtonLink href={siteConfig.links.googleReviews} variant="link" withArrow locale={locale}>
              {reviewsText.reviewsLabel}
            </ButtonLink>
          </div>
        </div>
      )}
    </section>
  );
}
