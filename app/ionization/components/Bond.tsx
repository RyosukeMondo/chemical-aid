"use client";
import React from "react";
import * as THREE from "three";
import { COLORS } from "../constants";

export default function Bond({ a, b, ionicness }: { a: THREE.Vector3; b: THREE.Vector3; ionicness: number }) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return (
    <group position={mid as any} quaternion={quat as any}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, len, 24]} />
        <meshStandardMaterial color={COLORS.bond} transparent opacity={Math.max(0.04, 1 - ionicness)} />
      </mesh>
    </group>
  );
}
