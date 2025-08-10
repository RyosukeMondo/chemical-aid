"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII } from "../../constants";

// Tetrahedral phosphate PO4^3-
export default function MoleculePO4() {
  const P_RADIUS = ELEMENT_RADII["P"];
  const O_RADIUS = ELEMENT_RADII["O"];
  const R = 1.65;

  const p = new THREE.Vector3(0, 0, 0);
  const o1 = new THREE.Vector3(R, 0, 0);
  const o2 = new THREE.Vector3(-R, 0, 0);
  const o3 = new THREE.Vector3(0, R, 0);
  const o4 = new THREE.Vector3(0, 0, R);
  const oxy = [o1, o2, o3, o4];

  return (
    <group>
      <mesh position={[p.x, p.y, p.z]} castShadow receiveShadow>
        <sphereGeometry args={[P_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.P} metalness={0.15} roughness={0.5} />
      </mesh>
      {oxy.map((o, i) => (
        <group key={i}>
          {/* delocalized P–O bonds visualized as partial double */}
          <CovalentBond a={p} b={o} order={1.5} resonance />
          <mesh position={[o.x, o.y, o.z]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          <ElectronPairDots center={o} pairs={2} ringRadius={0.4} />
        </group>
      ))}
    </group>
  );
}
