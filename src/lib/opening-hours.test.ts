import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { OpeningHours } from "@/types/content";

import {
  availableTimeSlots,
  describeOpenStatus,
  formatHour,
  getOpenStatus,
  getZonedIsoDate,
  getZonedMoment,
  groupOpeningHours,
  listTimeSlots,
  toMinutes,
  weekdayFromIsoDate,
} from "./opening-hours.ts";

const lunch = { label: "Almoço", opens: "12:00", closes: "15:00" };
const sundayLunch = { label: "Almoço", opens: "12:00", closes: "17:00" };
const dinner = { label: "Jantar", opens: "18:00", closes: "22:00" };

const hours: OpeningHours[] = [
  { day: "segunda", periods: [lunch, dinner] },
  { day: "terca", periods: [lunch, dinner] },
  { day: "quarta", periods: [lunch, dinner] },
  { day: "quinta", periods: [lunch, dinner] },
  { day: "sexta", periods: [lunch, dinner] },
  { day: "sabado", periods: [lunch, dinner] },
  { day: "domingo", periods: [sundayLunch] },
];

describe("formatação de horários", () => {
  it("converte e formata horas", () => {
    assert.equal(toMinutes("18:30"), 1110);
    assert.equal(formatHour("18:00"), "18h");
    assert.equal(formatHour("18:30"), "18h30");
    assert.throws(() => toMinutes("25:00"));
  });
});

describe("groupOpeningHours", () => {
  it("agrupa dias consecutivos com os mesmos períodos", () => {
    assert.deepEqual(
      groupOpeningHours(hours).map((row) => row.days),
      ["Segunda a sábado", "Domingo"],
    );
  });

  it("separa dias sem funcionamento", () => {
    const withClosedMonday = hours.map((entry) =>
      entry.day === "segunda" ? { ...entry, periods: [] } : entry,
    );
    const rows = groupOpeningHours(withClosedMonday);
    assert.equal(rows[0]?.days, "Segunda");
    assert.equal(rows[0]?.periods.length, 0);
    assert.equal(rows[1]?.days, "Terça a sábado");
  });
});

describe("getZonedMoment", () => {
  it("usa o fuso do restaurante, não o do visitante", () => {
    const moment = getZonedMoment(new Date("2026-10-23T23:30:00Z"));
    assert.deepEqual(moment, { weekday: "sexta", minutes: 20 * 60 + 30 });
  });

  it("vira o dia corretamente perto da meia-noite UTC", () => {
    const moment = getZonedMoment(new Date("2026-10-24T02:00:00Z"));
    assert.deepEqual(moment, { weekday: "sexta", minutes: 23 * 60 });
  });
});

describe("getOpenStatus", () => {
  it("informa o período aberto", () => {
    const status = getOpenStatus(hours, { weekday: "sexta", minutes: toMinutes("13:00") });
    assert.equal(describeOpenStatus(status), "Aberto agora · almoço até 15h");
  });

  it("aponta a próxima abertura no mesmo dia", () => {
    const status = getOpenStatus(hours, { weekday: "sexta", minutes: toMinutes("16:00") });
    assert.equal(describeOpenStatus(status), "Fechado agora · abre hoje às 18h");
  });

  it("considera o horário de fechamento como fechado", () => {
    const status = getOpenStatus(hours, { weekday: "sexta", minutes: toMinutes("22:00") });
    assert.equal(describeOpenStatus(status), "Fechado agora · abre amanhã às 12h");
  });

  it("pula para o próximo dia quando não há mais períodos", () => {
    const status = getOpenStatus(hours, { weekday: "domingo", minutes: toMinutes("18:00") });
    assert.equal(describeOpenStatus(status), "Fechado agora · abre amanhã às 12h");
  });

  it("retorna desconhecido sem horários cadastrados", () => {
    assert.equal(describeOpenStatus(getOpenStatus([], { weekday: "sexta", minutes: 0 })), undefined);
  });
});

describe("listTimeSlots", () => {
  it("gera horários de meia em meia hora até 30 minutos antes de fechar", () => {
    assert.deepEqual(listTimeSlots(hours, "sexta"), [
      { label: "Almoço", slots: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"] },
      {
        label: "Jantar",
        slots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
      },
    ]);
  });

  it("respeita o domingo só com almoço", () => {
    const groups = listTimeSlots(hours, "domingo");
    assert.equal(groups.length, 1);
    assert.equal(groups[0]?.slots.at(-1), "16:30");
  });
});

describe("availableTimeSlots", () => {
  const fridayAt19h = new Date("2026-10-23T22:00:00Z");

  it("remove horários que já passaram quando a data é hoje", () => {
    const groups = availableTimeSlots(hours, "2026-10-23", fridayAt19h);
    assert.deepEqual(groups, [{ label: "Jantar", slots: ["19:30", "20:00", "20:30", "21:00", "21:30"] }]);
  });

  it("mantém todos os horários em datas futuras", () => {
    assert.equal(availableTimeSlots(hours, "2026-10-24", fridayAt19h).length, 2);
  });

  it("não oferece horários em datas passadas ou inválidas", () => {
    assert.deepEqual(availableTimeSlots(hours, "2026-10-22", fridayAt19h), []);
    assert.deepEqual(availableTimeSlots(hours, "", fridayAt19h), []);
  });

  it("calcula hoje no fuso do restaurante", () => {
    assert.equal(getZonedIsoDate(new Date("2026-10-24T02:00:00Z")), "2026-10-23");
  });
});

describe("weekdayFromIsoDate", () => {
  it("identifica o dia da semana da data escolhida", () => {
    assert.equal(weekdayFromIsoDate("2026-10-25"), "domingo");
    assert.equal(weekdayFromIsoDate("data"), undefined);
  });
});
