"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WaterDipole({ position, lookAt, flip = false }: { position: THREE.Vector3; lookAt: THREE.Vector3; flip?: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(() => {
    ref.current.lookAt(lookAt);
    if (flip) ref.current.rotateY(Math.PI);
  });
  return (
    <group ref={ref} position={position as any}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color={"#ef4444"} />
      </mesh>
      <mesh position={[0.28, 0.08, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={"#60a5fa"} />
      </mesh>
      <mesh position={[-0.28, 0.08, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={"#60a5fa"} />
      </mesh>
    </group>
  );
}
