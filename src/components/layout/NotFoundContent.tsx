import Link from "next/link";

import { WaveDivider } from "@/components/graphics/WaveDivider";

export function NotFoundContent() {
  return (
    <main id="conteudo">
      <div
        data-surface="verde"
        className="grid min-h-[70dvh] place-items-center bg-surface px-6 pt-32 pb-secao text-ink"
      >
        <div className="max-w-prose text-center">
          <h1 className="font-display text-4xl">Esse caminho não leva a lugar nenhum</h1>
          <p className="mt-4 text-lg">A página que você procura não existe ou mudou de endereço.</p>
          <p lang="en-US" className="mt-6 text-ink/70">
            This page doesn&apos;t exist or has moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/pt" className="inline-block rounded-full bg-action px-6 py-3 font-semibold text-on-action">
              Voltar para o início
            </Link>
            <Link
              href="/en"
              lang="en-US"
              className="inline-block rounded-full border-2 border-current px-6 py-3 font-semibold"
            >
              Go to the homepage
            </Link>
          </div>
        </div>
      </div>
      <WaveDivider from="verde" to="marrom" withLine />
    </main>
  );
}
