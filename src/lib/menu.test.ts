import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Dish } from "@/types/content";

import { findDuplicateSlugs, resolveDishes } from "./menu.ts";

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
