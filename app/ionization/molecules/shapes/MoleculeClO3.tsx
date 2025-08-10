"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../../constants";
import { useVisualSettings } from "../../VisualSettingsContext";

// Chlorate ion ClO3- (approx. trigonal pyramidal around Cl). Resonance across Cl–O.
export default function MoleculeClO3() {
  const { bondScale, angleOffsetDeg, viewMode, cpkScale } = useVisualSettings();
  const CL_RADIUS = viewMode === "cpk" ? VDW_RADII["Cl"] * cpkScale : ELEMENT_RADII["Cl"];
  const O_RADIUS = viewMode === "cpk" ? VDW_RADII["O"] * cpkScale : ELEMENT_RADII["O"];
  const R0 = 1.6; // visual bond length
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;

  // Slight pyramid: place O in xy-plane, center Cl slightly above
  const baseHeight = 0.25;
  const height = baseHeight + (angleOffsetDeg * 0.003); // map degrees to small z height change
  const cl = new THREE.Vector3(0, 0, height);
  const o1 = new THREE.Vector3(R, 0, 0);
  const angle = THREE.MathUtils.degToRad(120 + angleOffsetDeg);
  const o2 = new THREE.Vector3(R * Math.cos(angle), R * Math.sin(angle), 0);
  const o3 = new THREE.Vector3(R * Math.cos(2 * angle), R * Math.sin(2 * angle), 0);
  const oxy = [o1, o2, o3];

  return (
    <group>
      <mesh position={[cl.x, cl.y, cl.z]} castShadow receiveShadow>
        <sphereGeometry args={[CL_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.Cl} metalness={0.15} roughness={0.5} />
      </mesh>

      {oxy.map((o, i) => (
        <group key={i}>
          {/* Resonance depiction across three Cl–O bonds */}
          {viewMode === "ball-and-stick" ? <CovalentBond a={cl} b={o} order={1.5} resonance /> : null}
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
