"use client";

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

if (
  typeof window !== "undefined" &&
  typeof (CanvasRenderingContext2D as any) !== "undefined" &&
  !(CanvasRenderingContext2D.prototype as any).roundRect
) {
  (CanvasRenderingContext2D.prototype as any).roundRect = function (
    this: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: any = 8
  ) {
    const ctx = this;
    const radii = Array.isArray(r) ? r : [r, r, r, r];
    const [r1, r2, r3, r4] = radii.map((v) => Math.max(0, Math.min(v, Math.min(w, h) / 2)));
    ctx.beginPath();
    ctx.moveTo(x + r1, y);
    ctx.lineTo(x + w - r2, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r2);
    ctx.lineTo(x + w, y + h - r3);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r3, y + h);
    ctx.lineTo(x + r4, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r4);
    ctx.lineTo(x, y + r1);
    ctx.quadraticCurveTo(x, y, x + r1, y);
    ctx.closePath();
  } as any;
}
