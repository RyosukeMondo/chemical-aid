"use client";
import React from "react";
import * as THREE from "three";
import Bond from "../../components/Bond";
import { COLORS, ELEMENT_RADII } from "../../constants";

// Tetrahedral ammonium NH4+
export default function MoleculeNH4() {
  const N_RADIUS = ELEMENT_RADII["N"];
  const H_RADIUS = ELEMENT_RADII["H"];

  const n = new THREE.Vector3(0, 0, 0);
  const R = 1.4;
  const t = (1 / Math.sqrt(3)) * R;
  const h1 = new THREE.Vector3( t,  t,  t);
  const h2 = new THREE.Vector3( t, -t, -t);
  const h3 = new THREE.Vector3(-t,  t, -t);
  const h4 = new THREE.Vector3(-t, -t,  t);
  const hyd = [h1, h2, h3, h4];

  return (
    <group>
      <mesh position={[n.x, n.y, n.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[N_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.N} metalness={0.15} roughness={0.5} />
      </mesh>
      {hyd.map((h, i) => (
        <group key={i}>
          <Bond a={n} b={h} ionicness={0} />
          <mesh position={[h.x, h.y, h.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[H_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.H} metalness={0.15} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
