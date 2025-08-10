"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII } from "../../constants";

// Acetate anion CH3COO-
// Centered at the carboxyl carbon (C2) at the origin; trigonal planar around C2; methyl group along +X.
export default function MoleculeCH3COO() {
  const C_RADIUS = ELEMENT_RADII["C"];
  const O_RADIUS = ELEMENT_RADII["O"];
  const H_RADIUS = ELEMENT_RADII["H"];

  // Key positions
  const c2 = new THREE.Vector3(0, 0, 0); // carboxyl carbon

  const R_CO = 1.45; // approximate C–O distance scale for display
  const R_CC = 1.54; // approximate C–C single bond distance scale

  // Place oxygens in trigonal plane (z=0), 120° apart around C2, and methyl carbon at 0°
  const o1 = new THREE.Vector3(R_CO * Math.cos((2 * Math.PI) / 3), R_CO * Math.sin((2 * Math.PI) / 3), 0);
  const o2 = new THREE.Vector3(R_CO * Math.cos((4 * Math.PI) / 3), R_CO * Math.sin((4 * Math.PI) / 3), 0);
  const c1 = new THREE.Vector3(R_CC, 0, 0); // methyl carbon

  // Tetrahedral hydrogens around c1 (offset by local axes)
  const R_CH = 1.1;
  const t = (1 / Math.sqrt(3)) * R_CH;
  const h1 = c1.clone().add(new THREE.Vector3( t,  t,  t));
  const h2 = c1.clone().add(new THREE.Vector3( t, -t, -t));
  const h3 = c1.clone().add(new THREE.Vector3(-t,  t, -t));

  return (
    <group>
      {/* C2 (carboxyl carbon) */}
      <mesh position={[c2.x, c2.y, c2.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[C_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.C} metalness={0.15} roughness={0.5} />
      </mesh>

      {/* Oxygens with resonance bonds and lone pairs */}
      {[o1, o2].map((o, i) => (
        <group key={i}>
          <CovalentBond a={c2} b={o} order={1.5} resonance />
          <mesh position={[o.x, o.y, o.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          <ElectronPairDots center={o} pairs={2} ringRadius={0.4} />
        </group>
      ))}

      {/* Methyl carbon (C1) and bond */}
      <CovalentBond a={c2} b={c1} order={1} />
      <mesh position={[c1.x, c1.y, c1.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[C_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.C} metalness={0.15} roughness={0.5} />
      </mesh>

      {/* Hydrogens around methyl carbon */}
      {[h1, h2, h3].map((h, i) => (
        <group key={i}>
          <CovalentBond a={c1} b={h} order={1} />
          <mesh position={[h.x, h.y, h.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[H_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.H} metalness={0.15} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
