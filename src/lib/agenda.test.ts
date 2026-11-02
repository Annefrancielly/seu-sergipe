import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatWorkshopDate, isValidWorkshopDate, sortWorkshops } from "./agenda.ts";

const workshop = (slug: string, date: string, time: string) => ({ slug, title: slug, date, time, description: "" });

describe("agenda", () => {
  it("formata a data em português sem deslocamento de fuso", () => {
    assert.equal(formatWorkshopDate("2026-12-05"), "05 de dez");
  });

  it("devolve o texto original quando a data é inválida", () => {
    assert.equal(formatWorkshopDate("2026-02-30"), "2026-02-30");
    assert.equal(isValidWorkshopDate("05/12/2026"), false);
  });

  it("ordena por data e horário sem alterar a lista original", () => {
    const list = [workshop("c", "2026-12-10", "19:00"), workshop("a", "2026-12-05", "10:00"), workshop("b", "2026-12-05", "15:00")];
    assert.deepEqual(sortWorkshops(list).map((item) => item.slug), ["a", "b", "c"]);
    assert.equal(list[0]?.slug, "c");
  });
});
