"use client";
import React from "react";
import * as THREE from "three";
import { ION_COLORS, IonSpec } from "../constants";
import BillboardSpriteLabel from "./BillboardSpriteLabel";
import { renderMoleculeForLabel } from "../molecules/registry";

export default function IonParticle({ position, spec }: { position: THREE.Vector3; spec: IonSpec }) {
  const isPoly = /[A-Z]{2,}/.test(spec.label.replace(/\s/g, ""));
  const isCation = spec.charge > 0;
  const color = isPoly ? ION_COLORS.poly : isCation ? ION_COLORS.cation : ION_COLORS.anion;
  const radius = isPoly ? 0.38 : 0.28 + Math.min(0.12, Math.abs(spec.charge) * 0.06);
  const labelCompact = spec.label.replace(/\s/g, "");
  const Molecule = isPoly ? renderMoleculeForLabel(labelCompact) : null;
  const posArr: [number, number, number] = [position.x, position.y, position.z];
  const labelYOffset = Molecule ? 2.2 : radius + 0.28;
  return (
    <group position={posArr}>
      {Molecule ? (
        <group>{Molecule}</group>
      ) : (
        <mesh>
          <sphereGeometry args={[radius, 28, 28]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </mesh>
      )}
      <BillboardSpriteLabel text={spec.label} offset={[0, labelYOffset, 0]} small />
    </group>
  );
}
