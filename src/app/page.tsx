import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main
      id="conteudo"
      data-surface="verde"
      className="grid min-h-dvh place-items-center bg-surface px-6 text-ink"
    >
      <div className="max-w-prose text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          {siteConfig.tagline}
        </p>
        <h1 className="mt-4 text-5xl font-semibold">{siteConfig.name}</h1>
        <p className="mt-6 text-lg">
          Fundação técnica pronta. A experiência visual começa na Etapa 1.
        </p>
      </div>
    </main>
  );
}
