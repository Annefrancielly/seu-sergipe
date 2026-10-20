import Link from "next/link";

import { WaveDivider } from "@/components/graphics/WaveDivider";

export default function NotFound() {
  return (
    <main id="conteudo">
      <div
        data-surface="creme"
        className="grid min-h-[70dvh] place-items-center bg-surface px-6 py-secao text-ink"
      >
        <div className="max-w-prose text-center">
          <h1 className="font-display text-4xl">Esse caminho não leva a lugar nenhum</h1>
          <p className="mt-4 text-lg">A página que você procura não existe ou mudou de endereço.</p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-action px-6 py-3 font-semibold text-on-action"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
      <WaveDivider from="creme" to="marrom" withLine />
    </main>
  );
}
