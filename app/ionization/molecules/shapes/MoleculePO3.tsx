"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../../constants";
import { useVisualSettings } from "../../VisualSettingsContext";

// Phosphite PO3^3- : trigonal pyramidal around P; depict resonance across P–O
export default function MoleculePO3() {
  const { bondScale, viewMode, cpkScale } = useVisualSettings();
  const P_RADIUS = viewMode === "cpk" ? VDW_RADII["P"] * cpkScale : ELEMENT_RADII["P"];
  const O_RADIUS = viewMode === "cpk" ? VDW_RADII["O"] * cpkScale : ELEMENT_RADII["O"];
  const R0 = 1.6;
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;

  const p = new THREE.Vector3(0, 0, 0.25); // slight pyramid height
  const o1 = new THREE.Vector3(R, 0, 0);
  const o2 = new THREE.Vector3(R * Math.cos((2 * Math.PI) / 3), R * Math.sin((2 * Math.PI) / 3), 0);
  const o3 = new THREE.Vector3(R * Math.cos((4 * Math.PI) / 3), R * Math.sin((4 * Math.PI) / 3), 0);
  const oxy = [o1, o2, o3];

  return (
    <group>
      <mesh position={[p.x, p.y, p.z]} castShadow receiveShadow>
        <sphereGeometry args={[P_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.P} metalness={0.15} roughness={0.5} />
      </mesh>
      {oxy.map((o, i) => (
        <group key={i}>
          {viewMode === "ball-and-stick" ? <CovalentBond a={p} b={o} order={1.5} resonance /> : null}
          <mesh position={[o.x, o.y, o.z]} castShadow receiveShadow>
            <sphereGeometry args={[O_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
          </mesh>
          {viewMode === "ball-and-stick" ? <ElectronPairDots center={o} pairs={2} ringRadius={0.4} /> : null}
        </group>
      ))}
    </group>
  );
}
