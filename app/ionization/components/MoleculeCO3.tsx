"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "./CovalentBond";
import ElectronPairDots from "./ElectronPairDots";

/**
 * Trigonal planar ball-and-stick model for carbonate ion CO3^2-.
 * - C at center (z = 0)
 * - 3 O atoms arranged 120° apart in the XY plane
 * - Reuses existing Bond component (opaque, covalent-like)
 */
export default function MoleculeCO3() {
  // Geometry parameters
  const C_COLOR = "#374151"; // slate-700-ish for carbon
  const O_COLOR = "#ef4444"; // red-500 for oxygen
  const C_RADIUS = 0.55;
  const O_RADIUS = 0.62;
  const R = 1.6; // distance from carbon to each oxygen (visualized scale)

  // Render in local coordinates so parent <group position=...> is the center
  const cPos = new THREE.Vector3(0, 0, 0);
  const o1 = new THREE.Vector3(R, 0, 0);
  const o2 = new THREE.Vector3(R * Math.cos((2 * Math.PI) / 3), R * Math.sin((2 * Math.PI) / 3), 0);
  const o3 = new THREE.Vector3(R * Math.cos((4 * Math.PI) / 3), R * Math.sin((4 * Math.PI) / 3), 0);

  const oxygens = [o1, o2, o3];

  return (
    <group>
      {/* Carbon center */}
      <mesh position={[cPos.x, cPos.y, cPos.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[C_RADIUS, 48, 48]} />
        <meshStandardMaterial color={C_COLOR} metalness={0.15} roughness={0.5} />
      </mesh>

      {/* Oxygens and bonds */}
      {oxygens.map((o, i) => (
        <group key={i}>
          {/* resonance-delocalized C-O bonds (approximate) */}
          <CovalentBond a={cPos} b={o} order={1.5} resonance />
          <mesh position={[o.x, o.y, o.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={O_COLOR} metalness={0.15} roughness={0.5} />
          </mesh>
          {/* show two lone-pair pairs per O for a simple hint */}
          <ElectronPairDots center={o} pairs={2} ringRadius={0.42} />
        </group>
      ))}
    </group>
  );
}
