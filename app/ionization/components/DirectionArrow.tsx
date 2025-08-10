"use client";
import * as THREE from "three";
import React from "react";
import { COLORS } from "../constants";

export default function DirectionArrow({
  from,
  to,
  color = COLORS.arrow,
  headSize = 0.12,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color?: string;
  headSize?: number;
}) {
  const dir = new THREE.Vector3().subVectors(to, from);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  return (
    <group position={mid as any} quaternion={quat as any}>
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, Math.max(0.001, len - headSize), 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, len * 0.5 - headSize * 0.5, 0] as any}>
        <coneGeometry args={[0.06, headSize, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
