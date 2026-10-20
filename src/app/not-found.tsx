import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="grid min-h-dvh place-items-center bg-surface px-6 text-ink"
    >
      <div className="max-w-prose text-center">
        <h1 className="text-4xl font-semibold">Esse caminho não leva a lugar nenhum</h1>
        <p className="mt-4 text-lg">
          A página que você procura não existe ou mudou de endereço.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-verde-profundo px-6 py-3 text-creme"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
