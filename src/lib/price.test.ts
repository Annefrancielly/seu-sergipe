import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatPrice } from "./price.ts";

const normalize = (text: string) => text.replace(/\s/g, " ");

describe("formatPrice", () => {
  it("omite os centavos em valores inteiros", () => {
    assert.equal(normalize(formatPrice(9400)), "R$ 94");
  });

  it("mostra os centavos quando existem", () => {
    assert.equal(normalize(formatPrice(9450)), "R$ 94,50");
  });

  it("usa separador de milhar brasileiro", () => {
    assert.equal(normalize(formatPrice(125000)), "R$ 1.250");
  });

  it("rejeita valores inválidos", () => {
    assert.throws(() => formatPrice(-100));
    assert.throws(() => formatPrice(10.5));
  });
});
