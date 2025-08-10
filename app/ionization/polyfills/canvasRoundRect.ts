"use client";
export {};

// Canvas 2D roundRect polyfill (client-side)
declare global {
  interface CanvasRenderingContext2D {
    roundRect: (
      x: number,
      y: number,
      w: number,
      h: number,
      r?: number | number[]
    ) => void;
  }
}

type RoundRectFn = (
  x: number,
  y: number,
  w: number,
  h: number,
  r?: number | number[]
) => void;

type CtxWithRoundRect = CanvasRenderingContext2D & {
  roundRect?: RoundRectFn;
};

if (
  typeof window !== "undefined" &&
  typeof CanvasRenderingContext2D !== "undefined"
) {
  const proto = CanvasRenderingContext2D.prototype as CtxWithRoundRect;
  if (!proto.roundRect) {
    proto.roundRect = function (
      this: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number | number[] = 8
    ) {
      const radiiArr: number[] = Array.isArray(r) ? r : [r, r, r, r];
      const [r1, r2, r3, r4] = radiiArr.map((v) => Math.max(0, Math.min(v, Math.min(w, h) / 2)));
      this.beginPath();
      this.moveTo(x + r1, y);
      this.lineTo(x + w - r2, y);
      this.quadraticCurveTo(x + w, y, x + w, y + r2);
      this.lineTo(x + w, y + h - r3);
      this.quadraticCurveTo(x + w, y + h, x + w - r3, y + h);
      this.lineTo(x + r4, y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - r4);
      this.lineTo(x, y + r1);
      this.quadraticCurveTo(x, y, x + r1, y);
      this.closePath();
    } as RoundRectFn;
  }
}
