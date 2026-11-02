import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, it } from "node:test";

import { isValidWorkshopDate } from "../lib/agenda.ts";
import { dishesInCategory, findDuplicateSlugs, resolveDishes } from "../lib/menu.ts";
import { toMinutes } from "../lib/opening-hours.ts";
import { workshops } from "./agenda.ts";
import { eventsContent } from "./events.ts";
import { chefPickSlugs, dishes, menuCategories } from "./menu.ts";
import { categoriesEn, dishesEn, groupsEn, priceLabelsEn } from "./menu.en.ts";
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

  it("toda foto de prato e de categoria existe na pasta public", () => {
    const missing = [...dishes.map((dish) => dish.photo?.src), ...menuCategories.map((category) => category.cover?.src)]
      .filter((src): src is string => src !== undefined)
      .filter((src) => !existsSync(new URL(`../../public${src}`, import.meta.url)));
    assert.deepEqual(missing, []);
  });
});

describe("regras do cardápio", () => {
  it("todo item tem pelo menos um preço positivo", () => {
    const withoutPrice = dishes.filter(
      (dish) => !dish.prices?.length || dish.prices.some((price) => price.amountInCents <= 0),
    );
    assert.deepEqual(
      withoutPrice.map((dish) => dish.slug),
      [],
    );
  });

  it("todo prato e drink tem descrição no cardápio", () => {
    const withoutDescription = dishes.filter(
      (dish) => dish.categorySlug !== "bebidas" && !dish.description,
    );
    assert.deepEqual(
      withoutDescription.map((dish) => dish.slug),
      [],
    );
  });

  it("toda categoria tem pelo menos um item", () => {
    const empty = menuCategories.filter(
      (category) => !dishes.some((dish) => dish.categorySlug === category.slug),
    );
    assert.deepEqual(
      empty.map((category) => category.slug),
      [],
    );
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

describe("integridade da home e das páginas", () => {
  it("todo menu degustação tem foto para o card da home", () => {
    const withoutPhoto = dishesInCategory(dishes, "menu-degustacao").filter((menu) => !menu.photo);
    assert.deepEqual(
      withoutPhoto.map((menu) => menu.slug),
      [],
    );
  });

  it("os formatos de evento têm slugs únicos e descrição nos dois idiomas", () => {
    const { pt, en } = eventsContent;
    assert.deepEqual(findDuplicateSlugs(pt.formats), []);
    assert.deepEqual(
      en.formats.map((format) => format.slug),
      pt.formats.map((format) => format.slug),
    );
    for (const format of [...pt.formats, ...en.formats]) assert.ok(format.description.trim().length > 0);
  });

  it("todo workshop tem data válida e horário no formato HH:MM", () => {
    for (const workshop of workshops) {
      assert.ok(isValidWorkshopDate(workshop.date), `data inválida em ${workshop.slug}`);
      assert.match(workshop.time, /^\d{2}:\d{2}$/);
    }
  });
});

const BRAND_ITEM_LISTS = new Set(["sodas-seu-sergipe"]);

describe("versão em inglês do cardápio", () => {
  it("toda categoria tem nome e descrição em inglês", () => {
    const missing = menuCategories.filter((category) => !categoriesEn[category.slug]);
    assert.deepEqual(
      missing.map((category) => category.slug),
      [],
    );
  });

  it("todo prato com descrição tem descrição em inglês", () => {
    const missing = dishes.filter((dish) => dish.description && !dishesEn[dish.slug]?.description);
    assert.deepEqual(
      missing.map((dish) => dish.slug),
      [],
    );
  });

  it("toda observação, lista de itens e foto de prato tem versão em inglês", () => {
    const missing = dishes.filter((dish) => {
      const text = dishesEn[dish.slug];
      const needsNote = /[a-zà-ú]{3}/i.test(dish.note ?? "") && !text?.note;
      const needsItems = dish.items !== undefined && !BRAND_ITEM_LISTS.has(dish.slug) && dish.categorySlug !== "bebidas" && !text?.items;
      const needsAlt = dish.photo !== undefined && !text?.photoAlt;
      return needsNote || needsItems || needsAlt;
    });
    assert.deepEqual(
      missing.map((dish) => dish.slug),
      [],
    );
  });

  it("listas traduzidas têm o mesmo número de itens do original", () => {
    for (const dish of dishes) {
      const items = dishesEn[dish.slug]?.items;
      if (items) assert.equal(items.length, dish.items?.length, dish.slug);
    }
  });

  it("todo grupo e rótulo de preço tem tradução", () => {
    const groups = [...new Set(dishes.map((dish) => dish.group).filter((group) => group !== undefined))];
    const labels = [...new Set(dishes.flatMap((dish) => dish.prices ?? []).map((price) => price.label).filter((label) => label !== undefined))];
    assert.deepEqual(groups.filter((group) => !groupsEn[group]), []);
    assert.deepEqual(labels.filter((label) => !priceLabelsEn[label]), []);
  });

  it("não traduz pratos inexistentes", () => {
    const slugs = new Set(dishes.map((dish) => dish.slug));
    assert.deepEqual(Object.keys(dishesEn).filter((slug) => !slugs.has(slug)), []);
  });
});
