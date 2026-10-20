import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveDeployment } from "./deployment.ts";

const PRODUCTION = { WORKERS_CI_BRANCH: "main", SITE_URL: "https://seu-sergipe.exemplo.workers.dev" };

describe("resolveDeployment", () => {
  it("usa localhost e bloqueia indexação no build local", () => {
    const deployment = resolveDeployment({});
    assert.equal(deployment.siteUrl.href, "http://localhost:3000/");
    assert.equal(deployment.isProduction, false);
    assert.equal(deployment.allowIndexing, false);
  });

  it("trata o build da branch main na Cloudflare como produção e descarta caminhos da URL", () => {
    const deployment = resolveDeployment({ ...PRODUCTION, SITE_URL: "https://seusergipe.com.br/qualquer/caminho" });
    assert.equal(deployment.isProduction, true);
    assert.equal(deployment.siteUrl.href, "https://seusergipe.com.br/");
  });

  it("trata outras branches como prévia", () => {
    const deployment = resolveDeployment({ WORKERS_CI_BRANCH: "previa-cliente" });
    assert.equal(deployment.isProduction, false);
  });

  it("deixa SITE_ENV prevalecer sobre a branch", () => {
    assert.equal(resolveDeployment({ ...PRODUCTION, SITE_ENV: "preview" }).isProduction, false);
    assert.equal(resolveDeployment({ SITE_ENV: "production", SITE_URL: PRODUCTION.SITE_URL }).isProduction, true);
  });

  it("só libera a indexação em produção com SITE_INDEXING=on", () => {
    assert.equal(resolveDeployment(PRODUCTION).allowIndexing, false);
    assert.equal(resolveDeployment({ ...PRODUCTION, SITE_INDEXING: "on" }).allowIndexing, true);
    assert.equal(resolveDeployment({ WORKERS_CI_BRANCH: "previa-cliente", SITE_INDEXING: "on" }).allowIndexing, false);
  });

  it("exige SITE_URL com https em produção e recusa URL inválida", () => {
    assert.throws(() => resolveDeployment({ WORKERS_CI_BRANCH: "main" }), /SITE_URL/);
    assert.throws(() => resolveDeployment({ ...PRODUCTION, SITE_URL: "http://seusergipe.com.br" }), /https/);
    assert.throws(() => resolveDeployment({ SITE_URL: "seusergipe" }));
  });
});
