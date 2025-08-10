"use client";
import React from "react";
import * as THREE from "three";
import { COLORS } from "../constants";
import { useVisualSettings } from "../VisualSettingsContext";

/**
 * CovalentBond: visual bond with support for bond order and resonance glow.
 * - order < 1.5: single cylinder
 * - order >= 1.5: double cylinders slightly offset (suggests double/resonance)
 */
export default function CovalentBond({
  a,
  b,
  order = 1,
  resonance = false,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  order?: 1 | 1.5 | 2;
  resonance?: boolean;
}) {
  const { showResonanceGlow } = useVisualSettings();
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  const euler = new THREE.Euler().setFromQuaternion(quat);

  const radiusSingle = 0.08;
  const radiusDouble = 0.07;
  const offset = 0.08; // lateral offset for double bond look
  const baseColor: THREE.ColorRepresentation = COLORS.bond;
  const metalness: number = 0.2;
  const roughness: number = 0.5;
  const useGlow = resonance && showResonanceGlow;
  const emissive: THREE.ColorRepresentation = useGlow ? "#fde68a" : "#000000";
  const emissiveIntensity: number = useGlow ? 0.2 : 0;

  if (order >= 1.5) {
    // Build two cylinders offset along X axis in local bond space
    return (
      <group position={[mid.x, mid.y, mid.z] as [number, number, number]} rotation={[euler.x, euler.y, euler.z]}>
        <group position={[offset / 2, 0, 0] as [number, number, number]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[radiusDouble, radiusDouble, len, 24]} />
            <meshStandardMaterial color={baseColor} metalness={metalness} roughness={roughness} emissive={emissive} emissiveIntensity={emissiveIntensity} />
          </mesh>
        </group>
        <group position={[-offset / 2, 0, 0] as [number, number, number]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[radiusDouble, radiusDouble, len, 24]} />
            <meshStandardMaterial color={baseColor} metalness={metalness} roughness={roughness} emissive={emissive} emissiveIntensity={emissiveIntensity} />
          </mesh>
        </group>
      </group>
    );
  }

  return (
    <group position={[mid.x, mid.y, mid.z] as [number, number, number]} rotation={[euler.x, euler.y, euler.z]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radiusSingle, radiusSingle, len, 24]} />
        <meshStandardMaterial color={baseColor} metalness={metalness} roughness={roughness} emissive={emissive} emissiveIntensity={emissiveIntensity} />
      </mesh>
    </group>
  );
}
