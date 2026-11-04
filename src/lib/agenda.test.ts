import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { AgendaItem } from "@/types/content";

import { formatAgendaDate, isValidAgendaDate, sortAgenda, upcomingAgenda } from "./agenda.ts";

const item = (slug: string, date: string, time?: string, until?: string): AgendaItem => ({
  slug,
  kind: "evento",
  date,
  time,
  until,
  text: { pt: { title: slug }, en: { title: slug } },
});

describe("agenda", () => {
  it("formata a data em português sem deslocamento de fuso", () => {
    assert.equal(formatAgendaDate("2026-12-05"), "05 de dez");
  });

  it("formata a data em inglês", () => {
    assert.equal(formatAgendaDate("2026-12-05", "en"), "Dec 5");
  });

  it("devolve o texto original quando a data é inválida", () => {
    assert.equal(formatAgendaDate("2026-02-30"), "2026-02-30");
    assert.equal(isValidAgendaDate("05/12/2026"), false);
  });

  it("ordena por data e horário sem alterar a lista original", () => {
    const list = [item("c", "2026-12-10", "19:00"), item("a", "2026-12-05", "10:00"), item("b", "2026-12-05", "15:00")];
    assert.deepEqual(sortAgenda(list).map((entry) => entry.slug), ["a", "b", "c"]);
    assert.equal(list[0]?.slug, "c");
  });

  it("esconde datas que já passaram e mantém eventos recorrentes até o último dia", () => {
    const list = [
      item("passado", "2026-11-07"),
      item("hoje", "2026-11-10"),
      item("recorrente", "2026-11-01", "07:00", "2027-01-31"),
    ];
    assert.deepEqual(upcomingAgenda(list, "2026-11-10").map((entry) => entry.slug), ["recorrente", "hoje"]);
  });
});
