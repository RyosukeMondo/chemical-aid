"use client";
import React, { useMemo, useEffect } from "react";
import * as THREE from "three";

export default function BillboardSpriteLabel({
  text,
  offset = [0, 0.9, 0],
  small = false,
}: {
  text: string;
  offset?: [number, number, number];
  small?: boolean;
}) {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d")!;
    const fontSize = small ? 36 : 64;
    ctx.font = `bold ${fontSize}px system-ui`;
    const padding = 24;
    const w = Math.ceil(ctx.measureText(text).width) + padding * 2;
    const h = fontSize + padding * 2;
    c.width = w;
    c.height = h;
    const ctx2 = c.getContext("2d")!;
    ctx2.font = `bold ${fontSize}px system-ui`;
    ctx2.fillStyle = "rgba(15,23,42,0.9)";
    (ctx2 as any).roundRect ? (ctx2 as any).roundRect(0, 0, w, h, 16) : ctx2.fillRect(0, 0, w, h);
    ctx2.fill();
    ctx2.fillStyle = "white";
    ctx2.textBaseline = "middle";
    ctx2.fillText(text, padding, h / 2);
    return c;
  }, [text, small]);

  const scale = [canvas.width / 250, canvas.height / 250, 1] as [number, number, number];
  const tex = useMemo(() => new THREE.CanvasTexture(canvas), [canvas]);
  useEffect(() => {
    tex.needsUpdate = true;
  }, [tex]);
  return (
    <sprite position={offset as any} scale={scale as any}>
      <spriteMaterial map={tex} transparent />
    </sprite>
  );
}
