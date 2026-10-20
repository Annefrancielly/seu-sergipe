import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveDeployment } from "./deployment.ts";

describe("resolveDeployment", () => {
  it("usa localhost e bloqueia indexação fora da Vercel", () => {
    const deployment = resolveDeployment({});
    assert.equal(deployment.siteUrl.href, "http://localhost:3000/");
    assert.equal(deployment.isProduction, false);
    assert.equal(deployment.allowIndexing, false);
  });

  it("prefere SITE_URL ao domínio de produção da Vercel e descarta caminhos", () => {
    const deployment = resolveDeployment({
      SITE_URL: "https://seusergipe.com.br/qualquer/caminho",
      VERCEL_PROJECT_PRODUCTION_URL: "seu-sergipe.vercel.app",
    });
    assert.equal(deployment.siteUrl.href, "https://seusergipe.com.br/");
  });

  it("usa o domínio de produção da Vercel quando SITE_URL não existe", () => {
    const deployment = resolveDeployment({ VERCEL_PROJECT_PRODUCTION_URL: "seu-sergipe.vercel.app" });
    assert.equal(deployment.siteUrl.href, "https://seu-sergipe.vercel.app/");
  });

  it("só libera a indexação em produção com SITE_INDEXING=on", () => {
    const production = { VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "seu-sergipe.vercel.app" };
    assert.equal(resolveDeployment(production).allowIndexing, false);
    assert.equal(resolveDeployment({ ...production, SITE_INDEXING: "on" }).allowIndexing, true);
    assert.equal(resolveDeployment({ VERCEL_ENV: "preview", SITE_INDEXING: "on" }).allowIndexing, false);
  });

  it("recusa URL sem https em produção e URL inválida", () => {
    assert.throws(() => resolveDeployment({ VERCEL_ENV: "production", SITE_URL: "http://seusergipe.com.br" }), /https/);
    assert.throws(() => resolveDeployment({ SITE_URL: "seusergipe" }));
  });
});
