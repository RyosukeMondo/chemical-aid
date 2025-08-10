"use client";
import React, { useMemo } from "react";
import * as THREE from "three";
import WaterDipole from "./WaterDipole";

export default function HydrationShellRing({ center, cation }: { center: THREE.Vector3; cation: boolean }) {
  const waters = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 12; i++) {
      const theta = (i / 12) * Math.PI * 2;
      arr.push(new THREE.Vector3(center.x + 1.8 * Math.cos(theta), center.y + (i % 2 ? 0.3 : -0.3), center.z + 1.8 * Math.sin(theta)));
    }
    return arr;
  }, [center, cation]);

  return (
    <group>
      {waters.map((p, i) => (
        <WaterDipole key={i} position={p} lookAt={center} flip={cation} />
      ))}
    </group>
  );
}
