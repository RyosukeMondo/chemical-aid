"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../../constants";
import { useVisualSettings } from "../../VisualSettingsContext";

// Perchlorate ClO4- : tetrahedral around Cl; resonance across all Cl–O bonds
export default function MoleculeClO4() {
  const { bondScale, viewMode, cpkScale } = useVisualSettings();
  const clRadius = viewMode === "cpk" ? VDW_RADII["Cl"] * cpkScale : ELEMENT_RADII["Cl"];
  const oRadius = viewMode === "cpk" ? VDW_RADII["O"] * cpkScale : ELEMENT_RADII["O"];

  // Tetrahedral positions normalized, scaled by R
  const R0 = 1.5;
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;
  const cl = new THREE.Vector3(0, 0, 0);
  const t = (1 / Math.sqrt(3)) * R;
  const o1 = new THREE.Vector3( t,  t,  t);
  const o2 = new THREE.Vector3( t, -t, -t);
  const o3 = new THREE.Vector3(-t,  t, -t);
  const o4 = new THREE.Vector3(-t, -t,  t);
  const oxy = [o1, o2, o3, o4];

  return (
    <group>
      <mesh position={[cl.x, cl.y, cl.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[clRadius, 48, 48]} />
        <meshStandardMaterial color={COLORS.Cl} metalness={0.15} roughness={0.5} />
      </mesh>
      {oxy.map((o, i) => (
        <group key={i}>
          {viewMode === "ball-and-stick" ? <CovalentBond a={cl} b={o} order={1.5} resonance /> : null}
          <mesh position={[o.x, o.y, o.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[oRadius, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          {viewMode === "ball-and-stick" ? <ElectronPairDots center={o} pairs={2} ringRadius={0.4} /> : null}
        </group>
      ))}
    </group>
  );
}
