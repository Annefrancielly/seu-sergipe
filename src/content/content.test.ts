import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";

import { findDuplicateSlugs, resolveDishes } from "../lib/menu.ts";
import { chefPickSlugs, dishes, menuCategories } from "./menu.ts";

describe("integridade do cardápio", () => {
  it("não possui pratos com slug repetido", () => {
    assert.deepEqual(findDuplicateSlugs(dishes), []);
  });

  it("toda sugestão da chef aponta para um prato existente", () => {
    assert.doesNotThrow(() => resolveDishes(chefPickSlugs, dishes));
  });

  it("todo prato pertence a uma categoria cadastrada", () => {
    const categorySlugs = new Set(menuCategories.map((category) => category.slug));
    const orphans = dishes.filter((dish) => !categorySlugs.has(dish.categorySlug));
    assert.deepEqual(
      orphans.map((dish) => dish.slug),
      [],
    );
  });

  it("toda foto de prato existe na pasta public", () => {
    const missing = dishes
      .map((dish) => dish.photo?.src)
      .filter((src): src is string => src !== undefined)
      .filter((src) => !existsSync(new URL(`../../public${src}`, import.meta.url)));
    assert.deepEqual(missing, []);
  });
});
