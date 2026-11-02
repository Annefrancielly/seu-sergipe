import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  image: StaticImageData | string;
  imagePosition?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, image, imagePosition, children }: PageHeroProps) {
  return (
    <section
      data-surface="verde"
      aria-labelledby="pagina-titulo"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-surface text-ink md:min-h-[88svh]"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div aria-hidden="true" className="hero-veu absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-6xl px-6 pt-36 pb-12 md:pb-14">
        <div className="surgir max-w-2xl md:vidro md:rounded-[1.75rem] md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-emphasis">{eyebrow}</p>
          <h1 id="pagina-titulo" className="mt-3 font-display text-5xl leading-[0.95] font-semibold uppercase sm:text-7xl">
            {title}
          </h1>
          {lead && <p className="mt-5 leading-relaxed md:text-lg">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
