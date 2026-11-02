import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isLocale, languageAlternates, localizePath, switchLocalePath } from "./config.ts";

describe("idiomas", () => {
  it("reconhece apenas os idiomas do site", () => {
    assert.equal(isLocale("pt"), true);
    assert.equal(isLocale("en"), true);
    assert.equal(isLocale("es"), false);
  });

  it("prefixa o caminho com o idioma, preservando âncoras", () => {
    assert.equal(localizePath("pt", "/"), "/pt");
    assert.equal(localizePath("en", "/cardapio"), "/en/cardapio");
    assert.equal(localizePath("en", "/#menus"), "/en#menus");
    assert.equal(localizePath("pt", "/cardapio#menu-degustacao"), "/pt/cardapio#menu-degustacao");
  });

  it("não altera links externos", () => {
    assert.equal(localizePath("en", "https://wa.me/5579988695326"), "https://wa.me/5579988695326");
  });

  it("troca o idioma mantendo a página atual", () => {
    assert.equal(switchLocalePath("/pt/chef", "en"), "/en/chef");
    assert.equal(switchLocalePath("/en", "pt"), "/pt");
    assert.equal(switchLocalePath("/", "en"), "/en");
  });

  it("lista as versões de cada página para o Google", () => {
    assert.deepEqual(languageAlternates("/chef"), {
      "pt-BR": "/pt/chef",
      "en-US": "/en/chef",
      "x-default": "/pt/chef",
    });
  });
});
