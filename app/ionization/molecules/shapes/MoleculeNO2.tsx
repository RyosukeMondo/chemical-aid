"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../../constants";
import { useVisualSettings } from "../../VisualSettingsContext";

// Nitrite NO2- : bent geometry; two equivalent N–O bonds with resonance
export default function MoleculeNO2() {
  const { bondScale, angleOffsetDeg, viewMode, cpkScale } = useVisualSettings();
  const N_RADIUS = viewMode === "cpk" ? VDW_RADII["N"] * cpkScale : ELEMENT_RADII["N"];
  const O_RADIUS = viewMode === "cpk" ? VDW_RADII["O"] * cpkScale : ELEMENT_RADII["O"];
  const R0 = 1.5; // base visual N–O length
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;

  const n = new THREE.Vector3(0, 0, 0);
  const angle = ((110 + angleOffsetDeg) * Math.PI) / 180; // bent ~110° + offset
  const o1 = new THREE.Vector3(R, 0, 0);
  const o2 = new THREE.Vector3(R * Math.cos(angle), R * Math.sin(angle), 0);

  return (
    <group>
      <mesh position={[n.x, n.y, n.z]} castShadow receiveShadow>
        <sphereGeometry args={[N_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.N} metalness={0.15} roughness={0.5} />
      </mesh>

      {[o1, o2].map((o, i) => (
        <group key={i}>
          {viewMode === "ball-and-stick" ? <CovalentBond a={n} b={o} order={1.5} resonance /> : null}
          <mesh position={[o.x, o.y, o.z]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          {viewMode === "ball-and-stick" ? <ElectronPairDots center={o} pairs={2} ringRadius={0.38} /> : null}
        </group>
      ))}
    </group>
  );
}
