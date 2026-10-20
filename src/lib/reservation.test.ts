import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  MAX_FIELD_LENGTH,
  buildReservationMessage,
  buildWhatsAppUrl,
  formatReservationDate,
  formatReservationTime,
  sanitizeField,
} from "./reservation.ts";

const PHONE = "5579988695326";

describe("buildWhatsAppUrl", () => {
  it("monta o link sem mensagem", () => {
    assert.equal(buildWhatsAppUrl(PHONE), "https://wa.me/5579988695326");
  });

  it("ignora mensagem vazia ou só com espaços", () => {
    assert.equal(buildWhatsAppUrl(PHONE, "   "), "https://wa.me/5579988695326");
  });

  it("codifica espaços, acentos, quebras de linha e caracteres reservados", () => {
    const url = buildWhatsAppUrl(PHONE, "Olá & bem-vindos?\nMesa #2");
    assert.equal(
      url,
      "https://wa.me/5579988695326?text=Ol%C3%A1%20%26%20bem-vindos%3F%0AMesa%20%232",
    );
  });

  it("preserva o texto original após a decodificação", () => {
    const message = "Reserva para 4 pessoas — aniversário 🎉";
    const url = new URL(buildWhatsAppUrl(PHONE, message));
    assert.equal(url.searchParams.get("text"), message);
  });

  it("rejeita números fora do formato internacional brasileiro", () => {
    assert.throws(() => buildWhatsAppUrl("(79) 98869-5326"));
    assert.throws(() => buildWhatsAppUrl("79988695326"));
    assert.throws(() => buildWhatsAppUrl("5579988695326/../evil"));
  });
});

describe("sanitizeField", () => {
  it("normaliza espaços e quebras de linha", () => {
    assert.equal(sanitizeField("  Ana \n  Maria  "), "Ana Maria");
  });

  it("retorna undefined para campos vazios", () => {
    assert.equal(sanitizeField("   "), undefined);
    assert.equal(sanitizeField(undefined), undefined);
  });

  it("limita o tamanho do campo", () => {
    assert.equal(sanitizeField("a".repeat(1000))?.length, MAX_FIELD_LENGTH);
  });
});

describe("formatReservationDate", () => {
  it("formata a data em português sem deslocamento de fuso", () => {
    assert.equal(formatReservationDate("2026-10-23"), "sexta-feira, 23/10");
  });

  it("rejeita datas inexistentes e formatos inválidos", () => {
    assert.equal(formatReservationDate("2026-02-30"), undefined);
    assert.equal(formatReservationDate("23/10/2026"), undefined);
    assert.equal(formatReservationDate(""), undefined);
  });
});

describe("formatReservationTime", () => {
  it("formata horas cheias e fracionadas", () => {
    assert.equal(formatReservationTime("20:00"), "20h");
    assert.equal(formatReservationTime("12:30"), "12h30");
  });

  it("rejeita horários inválidos", () => {
    assert.equal(formatReservationTime("24:00"), undefined);
    assert.equal(formatReservationTime("8h"), undefined);
  });
});

describe("buildReservationMessage", () => {
  it("inclui apenas os campos preenchidos e válidos", () => {
    const message = buildReservationMessage(
      {
        intro: "Vi a Moquequinha de Aratu no site e quero provar!",
        name: "Ana",
        date: "2026-10-23",
        time: "20:00",
        guests: 4,
        occasion: "  ",
      },
      "Seu Sergipe",
    );

    assert.equal(
      message,
      [
        "Olá! Gostaria de reservar uma mesa no Seu Sergipe.",
        "Vi a Moquequinha de Aratu no site e quero provar!",
        "",
        "• Nome: Ana",
        "• Data: sexta-feira, 23/10",
        "• Horário: 20h",
        "• Pessoas: 4",
      ].join("\n"),
    );
  });

  it("descarta quantidades de pessoas inválidas", () => {
    for (const guests of [0, -2, 2.5, 1000]) {
      const message = buildReservationMessage({ guests }, "Seu Sergipe");
      assert.equal(message.includes("Pessoas"), false);
    }
  });

  it("gera apenas a saudação quando nada foi informado", () => {
    assert.equal(
      buildReservationMessage({}, "Seu Sergipe"),
      "Olá! Gostaria de reservar uma mesa no Seu Sergipe.",
    );
  });
});
