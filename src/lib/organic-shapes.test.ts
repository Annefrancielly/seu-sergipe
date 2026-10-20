import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { ORGANIC_SHAPES, shapeToMaskImage } from "./organic-shapes.ts";

describe("shapeToMaskImage", () => {
  it("gera uma url() com SVG codificado", () => {
    const mask = shapeToMaskImage("M0 0 L100 0 L100 100 Z");
    assert.match(mask, /^url\("data:image\/svg\+xml,%3Csvg/);
    assert.equal(mask.endsWith('")'), true);
    assert.equal(/[<>"]/.test(mask.slice(5, -2)), false);
  });

  it("preserva o desenho original após a decodificação", () => {
    const outline = ORGANIC_SHAPES.seixo.outline;
    const encoded = shapeToMaskImage(outline).slice('url("data:image/svg+xml,'.length, -2);
    assert.equal(decodeURIComponent(encoded).includes(`d='${outline}'`), true);
  });
});

describe("ORGANIC_SHAPES", () => {
  it("todo arco de destaque começa em um ponto do contorno", () => {
    for (const [name, shape] of Object.entries(ORGANIC_SHAPES)) {
      const arcStart = shape.accentArc.split(" ").slice(0, 2).join(" ").replace("M", "");
      assert.equal(
        shape.outline.includes(arcStart),
        true,
        `o arco de "${name}" deve partir do contorno`,
      );
    }
  });
});
