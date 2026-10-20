import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Dish } from "@/types/content";

import {
  categoryNeighbors,
  findDuplicateSlugs,
  groupDishes,
  interestPhrase,
  lowestPrice,
  resolveDishes,
} from "./menu.ts";

const dish = (slug: string): Dish => ({
  slug,
  name: slug,
  description: "",
  categorySlug: "teste",
});

describe("resolveDishes", () => {
  it("retorna os pratos na ordem das referências", () => {
    const dishes = [dish("a"), dish("b"), dish("c")];
    const result = resolveDishes(["c", "a"], dishes);
    assert.deepEqual(
      result.map((item) => item.slug),
      ["c", "a"],
    );
  });

  it("falha quando uma referência não existe no cardápio", () => {
    assert.throws(
      () => resolveDishes(["inexistente"], [dish("a")]),
      /inexistente/,
    );
  });
});

describe("findDuplicateSlugs", () => {
  it("aponta slugs repetidos", () => {
    assert.deepEqual(
      findDuplicateSlugs([dish("a"), dish("b"), dish("a")]),
      ["a"],
    );
  });

  it("retorna lista vazia quando não há repetição", () => {
    assert.deepEqual(findDuplicateSlugs([dish("a"), dish("b")]), []);
  });
});

describe("groupDishes", () => {
  it("agrupa pratos consecutivos do mesmo grupo mantendo a ordem", () => {
    const groups = groupDishes([
      { ...dish("a"), group: "Autoral" },
      { ...dish("b"), group: "Autoral" },
      { ...dish("c"), group: "Origem" },
    ]);
    assert.deepEqual(
      groups.map((group) => [group.title, group.dishes.map((item) => item.slug)]),
      [
        ["Autoral", ["a", "b"]],
        ["Origem", ["c"]],
      ],
    );
  });

  it("cria um único grupo sem título quando não há grupos", () => {
    const groups = groupDishes([dish("a"), dish("b")]);
    assert.equal(groups.length, 1);
    assert.equal(groups[0]?.title, undefined);
  });
});

describe("categoryNeighbors", () => {
  const categories = ["a", "b", "c"].map((slug) => ({
    slug,
    name: slug,
    description: "",
    layout: "cards" as const,
  }));

  it("encontra a categoria anterior e a próxima", () => {
    const { previous, next } = categoryNeighbors(categories, "b");
    assert.equal(previous?.slug, "a");
    assert.equal(next?.slug, "c");
  });

  it("não tem anterior na primeira nem próxima na última", () => {
    assert.equal(categoryNeighbors(categories, "a").previous, undefined);
    assert.equal(categoryNeighbors(categories, "c").next, undefined);
  });
});

describe("interestPhrase", () => {
  it("adapta a frase para menus degustação", () => {
    assert.equal(
      interestPhrase({ ...dish("x"), name: "Menu Sensações", categorySlug: "menu-degustacao" }),
      "Tenho interesse no Menu Sensações.",
    );
    assert.equal(
      interestPhrase({ ...dish("x"), name: "Origem Sergipana", categorySlug: "menu-degustacao" }),
      "Tenho interesse no menu degustação Origem Sergipana.",
    );
  });

  it("usa a frase de desejo para os demais itens", () => {
    assert.equal(interestPhrase({ ...dish("x"), name: "Amorosa" }), "Vi Amorosa no cardápio e quero provar!");
  });
});

describe("lowestPrice", () => {
  it("retorna o menor preço entre as opções", () => {
    assert.equal(
      lowestPrice({ ...dish("x"), prices: [{ amountInCents: 21000 }, { amountInCents: 16000 }] }),
      16000,
    );
    assert.equal(lowestPrice(dish("x")), undefined);
  });
});
