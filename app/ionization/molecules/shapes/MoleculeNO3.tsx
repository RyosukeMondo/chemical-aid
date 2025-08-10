"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII } from "../../constants";

// Trigonal planar nitrate NO3-
export default function MoleculeNO3() {
  const N_RADIUS = ELEMENT_RADII["N"];
  const O_RADIUS = ELEMENT_RADII["O"];
  const R = 1.55;

  const n = new THREE.Vector3(0, 0, 0);
  const o1 = new THREE.Vector3(R, 0, 0);
  const o2 = new THREE.Vector3(R * Math.cos((2 * Math.PI) / 3), R * Math.sin((2 * Math.PI) / 3), 0);
  const o3 = new THREE.Vector3(R * Math.cos((4 * Math.PI) / 3), R * Math.sin((4 * Math.PI) / 3), 0);
  const oxy = [o1, o2, o3];

  return (
    <group>
      <mesh position={[n.x, n.y, n.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[N_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.N} metalness={0.15} roughness={0.5} />
      </mesh>
      {oxy.map((o, i) => (
        <group key={i}>
          <CovalentBond a={n} b={o} order={1.5} resonance />
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
