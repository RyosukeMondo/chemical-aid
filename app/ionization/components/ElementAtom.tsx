"use client";
import React from "react";
import { COLORS, ELEMENT_RADII } from "../constants";
import BillboardSpriteLabel from "./BillboardSpriteLabel";

export default function ElementAtom({
  element,
  position = [0, 0, 0],
  radius = ELEMENT_RADII[element],
  charge = 0,
  label,
}: {
  element: "H" | "Cl" | "Na" | "C" | "O";
  position?: [number, number, number];
  radius?: number;
  charge?: number;
  label?: string;
}) {
  const color = COLORS[element];
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.5} />
      </mesh>
      <BillboardSpriteLabel text={`${element}${charge > 0 ? "+" : charge < 0 ? "−" : ""}`} />
      {label ? <BillboardSpriteLabel text={label} offset={[0, -radius - 0.3, 0]} small /> : null}
    </group>
  );
}
