import Link from "next/link";

import { BrandSeal } from "@/components/brand/BrandSeal";
import { InstagramIcon, WhatsAppIcon } from "@/components/graphics/SocialIcons";
import { ReservationTrigger } from "@/components/reservation/ReservationTrigger";
import { siteConfig } from "@/config/site";
import { openingHours } from "@/content/opening-hours";
import { type Locale, localizePath } from "@/i18n/config";
import { ui } from "@/i18n/ui";
import { formatHourRange, groupOpeningHours, periodLabel } from "@/lib/opening-hours";
import { buildWhatsAppUrl } from "@/lib/reservation";

const linkClasses = "underline decoration-1 underline-offset-4 hover:decoration-2";
const headingClasses = "text-sm font-semibold uppercase tracking-[0.25em] text-emphasis";
const iconCircleClasses =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-current " +
  "transition-[background-color,scale] duration-300 ease-organic group-hover:bg-ink/10 group-active:scale-95";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { address, contact, links } = siteConfig;
  const t = ui[locale];
  const rows = groupOpeningHours(openingHours, locale);
  const year = new Date().getFullYear();

  return (
    <footer data-surface="marrom" className="bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p>
              <span className="sr-only">{siteConfig.name} — {siteConfig.tagline}</span>
              <BrandSeal className="mx-auto w-40 md:mx-0 md:w-44" />
            </p>
            <p lang="pt-BR" className="mx-auto mt-6 max-w-xs font-display text-xl leading-snug md:mx-0">
              {t.footer.motto}
            </p>
            <ReservationTrigger className="mt-8">{t.footer.reserve}</ReservationTrigger>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClasses}>{t.footer.visit}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {address.street}
              <br />
              {address.neighborhood}, {address.city} – {address.state}
              <br />
              {t.footer.postalCode} {address.postalCode}
            </address>
            <a href={links.maps} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block ${linkClasses}`}>
              {t.footer.directions}<span className="sr-only"> {t.footer.directionsNewTab}</span>
            </a>
          </div>

          <div className="lg:col-span-2">
            <h2 className={headingClasses}>{t.footer.hours}</h2>
            <dl className="mt-4 space-y-3 leading-relaxed">
              {rows.map((row) => (
                <div key={row.days}>
                  <dt className="font-semibold">{row.days}</dt>
                  {row.periods.length === 0 ? (
                    <dd>{t.hours.closed}</dd>
                  ) : (
                    row.periods.map((period) => (
                      <dd key={period.label}>
                        {periodLabel(period.label, locale)}: {formatHourRange(period.opens, period.closes, locale)}
                      </dd>
                    ))
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClasses}>{t.footer.contact}</h2>
            <ul className="mt-4 inline-flex flex-col items-start gap-3 text-left md:flex md:flex-row md:flex-wrap md:items-center md:gap-x-5">
              <li>
                <a
                  href={buildWhatsAppUrl(contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold tabular-nums"
                >
                  <span className={iconCircleClasses}>
                    <WhatsAppIcon />
                  </span>
                  <span className="sr-only">WhatsApp: </span>
                  {contact.phoneDisplay}
                  <span className="sr-only"> {t.newTab}</span>
                </a>
              </li>
              <li>
                <a
                  href={links.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold"
                >
                  <span className={iconCircleClasses}>
                    <InstagramIcon />
                  </span>
                  Instagram
                  <span className="sr-only"> {links.instagram.handle} {t.newTab}</span>
                </a>
              </li>
            </ul>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm">{t.footer.restaurantEmail}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${links.email}`} className={`break-all ${linkClasses}`}>
                    {links.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm">{t.footer.chefEmail}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${links.chefBusinessEmail}`} className={`break-all ${linkClasses}`}>
                    {links.chefBusinessEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-ink/25 pt-6 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {siteConfig.name} · {siteConfig.tagline}
          </p>
          <nav aria-label={t.navigation.footer}>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {t.navigation.items.map((item) => (
                <li key={item.href}>
                  <Link href={localizePath(locale, item.href)} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#conteudo" className={linkClasses}>
                  {t.footer.backToTop}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
