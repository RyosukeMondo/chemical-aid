"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "./CovalentBond";
import ElectronPairDots from "./ElectronPairDots";
import { useVisualSettings } from "../VisualSettingsContext";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../constants";

/**
 * Trigonal planar ball-and-stick model for carbonate ion CO3^2-.
 * - C at center (z = 0)
 * - 3 O atoms arranged 120° apart in the XY plane
 * - Reuses existing Bond component (opaque, covalent-like)
 */
export default function MoleculeCO3() {
  const { bondScale, angleOffsetDeg, viewMode, cpkScale } = useVisualSettings();
  // Radii by mode
  const C_RADIUS = viewMode === "cpk" ? VDW_RADII["C"] * cpkScale : ELEMENT_RADII["C"];
  const O_RADIUS = viewMode === "cpk" ? VDW_RADII["O"] * cpkScale : ELEMENT_RADII["O"];
  const R0 = 1.6; // base distance from carbon to each oxygen (visualized scale)
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;
  const angle = THREE.MathUtils.degToRad(120 + angleOffsetDeg);

  // Render in local coordinates so parent <group position=...> is the center
  const cPos = new THREE.Vector3(0, 0, 0);
  const o1 = new THREE.Vector3(R, 0, 0);
  const o2 = new THREE.Vector3(R * Math.cos(angle), R * Math.sin(angle), 0);
  const o3 = new THREE.Vector3(R * Math.cos(2 * angle), R * Math.sin(2 * angle), 0);

  const oxygens = [o1, o2, o3];

  return (
    <group>
      {/* Carbon center */}
      <mesh position={[cPos.x, cPos.y, cPos.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[C_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.C} metalness={0.15} roughness={0.5} />
      </mesh>

      {/* Oxygens and bonds */}
      {oxygens.map((o, i) => (
        <group key={i}>
          {/* resonance-delocalized C-O bonds (approximate) */}
          {viewMode === "ball-and-stick" ? <CovalentBond a={cPos} b={o} order={1.5} resonance /> : null}
          <mesh position={[o.x, o.y, o.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          {/* show two lone-pair pairs per O for a simple hint */}
          {viewMode === "ball-and-stick" ? <ElectronPairDots center={o} pairs={2} ringRadius={0.42} /> : null}
        </group>
      ))}
    </group>
  );
}
