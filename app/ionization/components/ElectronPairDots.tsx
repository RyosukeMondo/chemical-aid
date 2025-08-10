"use client";
import React from "react";
import * as THREE from "three";
import { COLORS } from "../constants";
import { useVisualSettings } from "../VisualSettingsContext";

/**
 * ElectronPairDots: renders n lone-pair dots around a center on a small ring.
 * This is a simple visual hint, not a strict quantum representation.
 */
export default function ElectronPairDots({
  center,
  pairs = 2,
  ringRadius = 0.35,
}: {
  center: THREE.Vector3;
  pairs?: number; // number of pairs to render (2 -> four dots)
  ringRadius?: number;
}) {
  const { showLonePairs } = useVisualSettings();
  if (!showLonePairs) return null;
  const totalDots = pairs * 2;
  const dots = Array.from({ length: totalDots }, (_, i) => {
    const theta = (i / totalDots) * Math.PI * 2;
    return new THREE.Vector3(
      center.x + ringRadius * Math.cos(theta),
      center.y + ringRadius * Math.sin(theta),
      center.z
    );
  });
  return (
    <group>
      {dots.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z] as [number, number, number]} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={COLORS.e} metalness={0.1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
