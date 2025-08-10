"use client";
import React from "react";
import * as THREE from "three";
import CovalentBond from "../../components/CovalentBond";
import ElectronPairDots from "../../components/ElectronPairDots";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../../constants";
import { useVisualSettings } from "../../VisualSettingsContext";

// Bicarbonate HCO3- : trigonal planar around carbon; one OH, two O with resonance
export default function MoleculeHCO3() {
  const { bondScale, angleOffsetDeg, viewMode, cpkScale } = useVisualSettings();
  const C_RADIUS = viewMode === "cpk" ? VDW_RADII["C"] * cpkScale : ELEMENT_RADII["C"];
  const O_RADIUS = viewMode === "cpk" ? VDW_RADII["O"] * cpkScale : ELEMENT_RADII["O"];
  const H_RADIUS = viewMode === "cpk" ? VDW_RADII["H"] * cpkScale : ELEMENT_RADII["H"];
  const R0 = 1.55; // C–O visual bond length
  const OH_R0 = 0.95; // O–H visual bond length
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;
  const OH_R = viewMode === "cpk" ? OH_R0 : OH_R0 * bondScale;
  const angle = THREE.MathUtils.degToRad(120 + angleOffsetDeg);

  const c = new THREE.Vector3(0, 0, 0);
  const o1 = new THREE.Vector3(R, 0, 0); // choose as OH oxygen
  const o2 = new THREE.Vector3(R * Math.cos(angle), R * Math.sin(angle), 0);
  const o3 = new THREE.Vector3(R * Math.cos(2 * angle), R * Math.sin(2 * angle), 0);

  // Place H attached to o1 along direction from O away from C
  const dirOC = new THREE.Vector3().subVectors(o1, c).normalize();
  const h = new THREE.Vector3().addVectors(o1, dirOC.multiplyScalar(OH_R));

  return (
    <group>
      {/* Carbon center */}
      <mesh position={[c.x, c.y, c.z]} castShadow receiveShadow>
        <sphereGeometry args={[C_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.C} metalness={0.15} roughness={0.5} />
      </mesh>

      {/* OH arm: single C–O plus O–H */}
      {viewMode === "ball-and-stick" ? <CovalentBond a={c} b={o1} order={1} /> : null}
      <mesh position={[o1.x, o1.y, o1.z]} castShadow receiveShadow>
        <sphereGeometry args={[O_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.O} metalness={0.15} roughness={0.5} />
      </mesh>
      {viewMode === "ball-and-stick" ? <ElectronPairDots center={o1} pairs={2} ringRadius={0.4} /> : null}
      {viewMode === "ball-and-stick" ? <CovalentBond a={o1} b={h} order={1} /> : null}
      <mesh position={[h.x, h.y, h.z]} castShadow receiveShadow>
        <sphereGeometry args={[H_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.H} metalness={0.1} roughness={0.4} />
      </mesh>

      {/* Resonance O atoms: delocalized double-like bonds */}
      {[o2, o3].map((o, i) => (
        <group key={i}>
          {viewMode === "ball-and-stick" ? <CovalentBond a={c} b={o} order={1.5} resonance /> : null}
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
