import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { clampSlideIndex, getCarouselState } from "./carousel.ts";

const slideOffsets = [0, 320, 640, 960];

describe("getCarouselState", () => {
  it("identifica o início do carrossel", () => {
    assert.deepEqual(
      getCarouselState({ scrollLeft: 0, clientWidth: 400, scrollWidth: 1300, slideOffsets }),
      { index: 0, atStart: true, atEnd: false },
    );
  });

  it("escolhe o slide mais próximo da posição de rolagem", () => {
    const state = getCarouselState({
      scrollLeft: 600,
      clientWidth: 400,
      scrollWidth: 1300,
      slideOffsets,
    });
    assert.equal(state.index, 2);
    assert.equal(state.atStart, false);
  });

  it("identifica o fim do carrossel com tolerância de subpixel", () => {
    const state = getCarouselState({
      scrollLeft: 899.5,
      clientWidth: 400,
      scrollWidth: 1300,
      slideOffsets,
    });
    assert.equal(state.atEnd, true);
  });

  it("marca início e fim quando todos os slides cabem na tela", () => {
    assert.deepEqual(
      getCarouselState({ scrollLeft: 0, clientWidth: 1400, scrollWidth: 1400, slideOffsets }),
      { index: 0, atStart: true, atEnd: true },
    );
  });

  it("lida com carrossel vazio", () => {
    assert.equal(
      getCarouselState({ scrollLeft: 0, clientWidth: 400, scrollWidth: 400, slideOffsets: [] })
        .index,
      0,
    );
  });
});

describe("clampSlideIndex", () => {
  it("mantém o índice dentro dos limites", () => {
    assert.equal(clampSlideIndex(-1, 4), 0);
    assert.equal(clampSlideIndex(2, 4), 2);
    assert.equal(clampSlideIndex(9, 4), 3);
    assert.equal(clampSlideIndex(3, 0), 0);
  });
});
