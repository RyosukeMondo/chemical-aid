"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII } from "../../constants";

// Tetrahedral sulfate SO4 2-
export default function MoleculeSO4() {
  const S_RADIUS = ELEMENT_RADII["S"];
  const O_RADIUS = ELEMENT_RADII["O"];

  // Tetrahedral positions normalized, scaled by R
  const R = 1.5;
  const s = new THREE.Vector3(0, 0, 0);
  const t = (1 / Math.sqrt(3)) * R;
  const o1 = new THREE.Vector3( t,  t,  t);
  const o2 = new THREE.Vector3( t, -t, -t);
  const o3 = new THREE.Vector3(-t,  t, -t);
  const o4 = new THREE.Vector3(-t, -t,  t);
  const oxy = [o1, o2, o3, o4];

  return (
    <group>
      <mesh position={[s.x, s.y, s.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[S_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.S} metalness={0.15} roughness={0.5} />
      </mesh>
      {oxy.map((o, i) => (
        <group key={i}>
          {/* sulfate resonance: depict delocalized S–O as ~1.5 order bonds */}
          <CovalentBond a={s} b={o} order={1.5} resonance />
          <mesh position={[o.x, o.y, o.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          <ElectronPairDots center={o} pairs={2} ringRadius={0.4} />
        </group>
      ))}
    </group>
  );
}
