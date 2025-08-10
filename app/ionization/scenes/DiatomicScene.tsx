"use client";
import React from "react";
import * as THREE from "three";
import Bond from "../components/Bond";
import DirectionArrow from "../components/DirectionArrow";
import ElementAtom from "../components/ElementAtom";
import OrbitalElectron from "../components/OrbitalElectron";
import HydrationShellRing from "../components/HydrationShellRing";

export default function DiatomicScene({
  compound,
  deltaEN,
  ionize,
  showWater,
}: {
  compound: "HCl" | "NaCl";
  deltaEN: number;
  ionize: boolean;
  showWater: boolean;
}) {
  const A: "H" | "Na" = compound === "HCl" ? "H" : "Na";
  const B = "Cl" as const;
  const ionicness = Math.min(1, Math.max(0, deltaEN / 3.5)) * (ionize ? 1 : 0.75);
  const separation = THREE.MathUtils.lerp(2.2, 4.2, ionicness * 0.7);
  const aPos = new THREE.Vector3(-separation / 2, 0, 0);
  const bPos = new THREE.Vector3(separation / 2, 0, 0);
  const qB = Math.round(ionicness * 1) * -1;
  const qA = -qB;
  const electronCount = compound === "NaCl" ? (qB === -1 ? 8 : 7) : 8;
  return (
    <>
      <Bond a={aPos} b={bPos} ionicness={ionicness} />
      <DirectionArrow from={aPos} to={bPos} />
      <group>
        <ElementAtom element={A} position={[aPos.x, aPos.y, aPos.z]} charge={qA} />
        <ElementAtom element={B} position={[bPos.x, bPos.y, bPos.z]} charge={qB} />
      </group>
      {Array.from({ length: electronCount }).map((_, i) => (
        <OrbitalElectron key={i} center={bPos} radius={0.9 + ((i % 3) * 0.08)} speed={0.8 + ((i % 4) * 0.05)} phase={i * 0.7} />
      ))}
      {showWater ? <HydrationShellRing center={aPos} cation={qA > 0} /> : null}
      {showWater ? <HydrationShellRing center={bPos} cation={qB > 0} /> : null}
    </>
  );
}
