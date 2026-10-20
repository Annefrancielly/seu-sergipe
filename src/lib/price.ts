const withoutCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const withCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(amountInCents: number): string {
  if (!Number.isInteger(amountInCents) || amountInCents < 0) {
    throw new Error(`Preço inválido: ${amountInCents}`);
  }
  const formatter = amountInCents % 100 === 0 ? withoutCents : withCents;
  return formatter.format(amountInCents / 100);
}
