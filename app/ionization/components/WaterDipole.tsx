"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "../constants";

export default function WaterDipole({ position, lookAt, flip = false }: { position: THREE.Vector3; lookAt: THREE.Vector3; flip?: boolean }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(() => {
    ref.current.lookAt(lookAt);
    if (flip) ref.current.rotateY(Math.PI);
  });
  return (
    <group ref={ref} position={[position.x, position.y, position.z] as [number, number, number]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color={COLORS.O} />
      </mesh>
      <mesh position={[0.28, 0.08, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={COLORS.H} />
      </mesh>
      <mesh position={[-0.28, 0.08, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={COLORS.H} />
      </mesh>
    </group>
  );
}
