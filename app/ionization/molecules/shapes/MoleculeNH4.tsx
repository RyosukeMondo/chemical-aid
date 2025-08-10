"use client";
import React from "react";
import * as THREE from "three";
import Bond from "../../components/Bond";
import { COLORS, ELEMENT_RADII, VDW_RADII } from "../../constants";
import { useVisualSettings } from "../../VisualSettingsContext";

// Tetrahedral ammonium NH4+
export default function MoleculeNH4() {
  const { bondScale, viewMode, cpkScale } = useVisualSettings();
  const N_RADIUS = viewMode === "cpk" ? VDW_RADII["N"] * cpkScale : ELEMENT_RADII["N"];
  const H_RADIUS = viewMode === "cpk" ? VDW_RADII["H"] * cpkScale : ELEMENT_RADII["H"];

  const n = new THREE.Vector3(0, 0, 0);
  const R0 = 1.4;
  const R = viewMode === "cpk" ? R0 : R0 * bondScale;
  const t = (1 / Math.sqrt(3)) * R;
  const h1 = new THREE.Vector3( t,  t,  t);
  const h2 = new THREE.Vector3( t, -t, -t);
  const h3 = new THREE.Vector3(-t,  t, -t);
  const h4 = new THREE.Vector3(-t, -t,  t);
  const hyd = [h1, h2, h3, h4];

  return (
    <group>
      <mesh position={[n.x, n.y, n.z] as [number, number, number]} castShadow receiveShadow>
        <sphereGeometry args={[N_RADIUS, 48, 48]} />
        <meshStandardMaterial color={COLORS.N} metalness={0.15} roughness={0.5} />
      </mesh>
      {hyd.map((h, i) => (
        <group key={i}>
          {viewMode === "ball-and-stick" ? <Bond a={n} b={h} ionicness={0} /> : null}
          <mesh position={[h.x, h.y, h.z] as [number, number, number]} castShadow receiveShadow>
            <sphereGeometry args={[H_RADIUS, 48, 48]} />
            <meshStandardMaterial color={COLORS.H} metalness={0.15} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
