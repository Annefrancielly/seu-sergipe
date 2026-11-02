import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import chefPhoto from "@/assets/images/chef-seichele-barboza.jpg";
import { ArrowIcon } from "@/components/graphics/ArrowIcon";
import { Section } from "@/components/layout/Section";
import { portalsIntro } from "@/content/home";

type Portal = {
  href: string;
  eyebrow: string;
  title: string;
  text: string;
  image: StaticImageData | string;
  position?: string;
};

const portals: readonly Portal[] = [
  {
    href: "/chef",
    eyebrow: "A chef",
    title: "Seichele Barboza",
    text: "A história e a cozinha de quem conduz a casa.",
    image: chefPhoto,
    position: "50% 25%",
  },
  {
    href: "/eventos",
    eyebrow: "Eventos",
    title: "Celebre aqui",
    text: "Corporativo, casamentos e aniversários.",
    image: "/images/casa/mesa-montagem.jpg",
    position: "60% 50%",
  },
  {
    href: "/agenda",
    eyebrow: "Agenda da chef",
    title: "Workshops",
    text: "Encontros na cozinha com a chef.",
    image: "/images/casa/chef-encontro.jpg",
    position: "50% 40%",
  },
];

export function PortalsSection() {
  return (
    <Section id="conheca" surface="marrom" labelledBy="conheca-titulo" className="luz-de-vela py-secao [--vela-x:50%] [--vela-y:0%]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="surgir text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-emphasis">{portalsIntro.eyebrow}</p>
          <h2 id="conheca-titulo" className="mt-3 font-display text-4xl leading-none font-semibold uppercase sm:text-6xl">
            {portalsIntro.title}
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {portals.map((portal, index) => (
            <li key={portal.href} className={index === 0 ? "surgir" : index === 1 ? "surgir surgir-depois" : "surgir surgir-por-ultimo"}>
              <Link
                href={portal.href}
                className="group sombra-profunda relative isolate flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-[1.75rem] p-3 md:aspect-[3/4]"
              >
                <Image
                  src={portal.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="-z-20 object-cover transition-transform duration-[1600ms] ease-organic motion-safe:group-hover:scale-105"
                  style={{ objectPosition: portal.position }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(26_15_10/0.2)_0%,rgb(26_15_10/0)_35%,rgb(26_15_10/0.75)_100%)]"
                />
                <span aria-hidden="true" className="moldura-foto -z-10" />
                <span className="vidro-cafe block rounded-[1.25rem] p-5">
                  <span className="block text-xs uppercase tracking-[0.3em] text-emphasis">{portal.eyebrow}</span>
                  <span className="mt-2 block font-display text-3xl leading-none font-semibold uppercase">{portal.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed">{portal.text}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em]">
                    {portalsIntro.linkLabel}
                    <ArrowIcon className="transition-transform duration-300 ease-organic group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
