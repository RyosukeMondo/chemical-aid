"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "../constants";

export default function OrbitalElectron({
  center = new THREE.Vector3(),
  radius = 0.5,
  speed = 1,
  phase = 0,
}: {
  center?: THREE.Vector3;
  radius?: number;
  speed?: number;
  phase?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    const x = center.x + radius * Math.cos(t);
    const z = center.z + radius * Math.sin(t);
    const y = center.y + 0.05 * Math.sin(t * 2.0);
    ref.current.position.set(x, y, z);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial emissive={new THREE.Color(COLORS.e)} emissiveIntensity={1.2} color={COLORS.e} />
    </mesh>
  );
}
