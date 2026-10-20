import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const MAX_LINE_LENGTH = 2000;
const MAX_RULES = 100;

function parseHeadersFile(text: string): Map<string, Map<string, string>> {
  const rules = new Map<string, Map<string, string>>();
  let current: Map<string, string> | undefined;

  for (const line of text.split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    if (!line.startsWith(" ")) {
      current = new Map();
      rules.set(line.trim(), current);
      continue;
    }
    const separator = line.indexOf(":");
    assert.ok(current && separator > 0, `linha fora de uma regra: "${line}"`);
    current.set(line.slice(0, separator).trim().toLowerCase(), line.slice(separator + 1).trim());
  }

  return rules;
}

const text = readFileSync(new URL("../../public/_headers", import.meta.url), "utf8");
const rules = parseHeadersFile(text);
const site = rules.get("/*");

describe("public/_headers", () => {
  it("respeita os limites da Cloudflare", () => {
    assert.ok(rules.size <= MAX_RULES);
    for (const line of text.split("\n")) assert.ok(line.length <= MAX_LINE_LENGTH, `linha longa demais: ${line.slice(0, 40)}…`);
  });

  it("aplica os headers de segurança a todas as páginas", () => {
    assert.ok(site, "regra /* ausente");
    assert.equal(site.get("x-content-type-options"), "nosniff");
    assert.equal(site.get("x-frame-options"), "DENY");
    assert.match(site.get("strict-transport-security") ?? "", /max-age=\d{8,}/);
    assert.ok(site.has("referrer-policy"));
    assert.ok(site.has("permissions-policy"));
  });

  it("mantém as diretivas essenciais da CSP", () => {
    const csp = site?.get("content-security-policy") ?? "";
    for (const directive of [
      "default-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
    ]) {
      assert.ok(csp.includes(directive), `CSP sem ${directive}`);
    }
    assert.doesNotMatch(csp, /unsafe-eval/);
  });
});
