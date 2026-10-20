import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";

import { findDuplicateSlugs, resolveDishes } from "../lib/menu.ts";
import { toMinutes } from "../lib/opening-hours.ts";
import { chefPickSlugs, dishes, menuCategories } from "./menu.ts";
import { openingHours } from "./opening-hours.ts";
import { testimonials } from "./testimonials.ts";

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

describe("integridade dos horários", () => {
  it("cada dia aparece uma única vez", () => {
    const days = openingHours.map((entry) => entry.day);
    assert.equal(new Set(days).size, days.length);
  });

  it("todo período abre antes de fechar e não se sobrepõe ao anterior", () => {
    for (const entry of openingHours) {
      let previousClose = -1;
      for (const period of entry.periods) {
        const opens = toMinutes(period.opens);
        const closes = toMinutes(period.closes);
        assert.ok(opens < closes, `${entry.day}: ${period.label} fecha antes de abrir`);
        assert.ok(opens >= previousClose, `${entry.day}: ${period.label} sobrepõe o período anterior`);
        previousClose = closes;
      }
    }
  });
});

describe("integridade das avaliações", () => {
  it("toda avaliação tem autor, texto e nota válida", () => {
    for (const testimonial of testimonials) {
      assert.ok(testimonial.author.trim().length > 0);
      assert.ok(testimonial.text.trim().length > 0);
      if (testimonial.rating !== undefined) {
        assert.ok(testimonial.rating >= 1 && testimonial.rating <= 5);
      }
    }
  });

  it("autores aparecem apenas com nome e iniciais do sobrenome", () => {
    const fullSurnames = testimonials.filter((testimonial) =>
      testimonial.author.split(" ").slice(1).some((part) => !/^[A-ZÀ-Ú]\.$/.test(part)),
    );
    assert.deepEqual(
      fullSurnames.map((testimonial) => testimonial.author),
      [],
    );
  });
});
