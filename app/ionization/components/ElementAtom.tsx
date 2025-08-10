"use client";
import React from "react";
import { COLORS } from "../constants";
import BillboardSpriteLabel from "./BillboardSpriteLabel";

export default function ElementAtom({
  element,
  position = [0, 0, 0],
  radius = 0.5,
  charge = 0,
  label,
}: {
  element: "H" | "Cl" | "Na";
  position?: [number, number, number];
  radius?: number;
  charge?: number;
  label?: string;
}) {
  const color = COLORS[element];
  return (
    <group position={position as any}>
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.5} />
      </mesh>
      <BillboardSpriteLabel text={`${element}${charge > 0 ? "+" : charge < 0 ? "−" : ""}`} />
      {label ? <BillboardSpriteLabel text={label} offset={[0, -radius - 0.3, 0]} small /> : null}
    </group>
  );
}
