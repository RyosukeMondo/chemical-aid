"use client";
import React, { useMemo } from "react";
import * as THREE from "three";
import Bond from "../components/Bond";
import DirectionArrow from "../components/DirectionArrow";
import ElementAtom from "../components/ElementAtom";
import HydrationShellRing from "../components/HydrationShellRing";
import IonParticle from "../components/IonParticle";
import { IonSpec } from "../constants";
import { expandIonSpecs } from "../helpers/layout";
import { getAttachmentPoint } from "../helpers/attachments";

function isPolyatomic(label: string): boolean {
  return /[A-Z]{2,}/.test(label.replace(/\s/g, ""));
}

function parseElementFromLabel(label: string): string | null {
  const m = label.trim().match(/^([A-Z][a-z]?)/);
  return m ? m[1] : null;
}

export default function BinaryIonScene({
  ions,
  deltaEN,
  ionize,
  showWater,
}: {
  ions: IonSpec[];
  deltaEN: number;
  ionize: boolean;
  showWater: boolean;
}) {
  // Expand multiplicities so we can render duplicated particles to reflect stoichiometry
  const { cations, anions } = useMemo(() => {
    const expanded = expandIonSpecs(ions);
    const cats = expanded.filter((s) => s.charge > 0);
    const ans = expanded.filter((s) => s.charge < 0);
    return { cations: cats, anions: ans };
  }, [ions]);

  // Interaction logic mirrors DiatomicScene
  const ionicness = Math.min(1, Math.max(0, deltaEN / 3.5)) * (ionize ? 1 : 0.75);
  const separation = THREE.MathUtils.lerp(2.2, 4.2, ionicness * 0.7);
  const catPos = new THREE.Vector3(-separation / 2, 0, 0);
  const anPos = new THREE.Vector3(separation / 2, 0, 0);

  const showCharge = deltaEN >= 1;
  const renderSide = (spec: IonSpec, isCation: boolean, position: THREE.Vector3) => {
    const labelCompact = spec.label.replace(/\s/g, "");
    const poly = isPolyatomic(labelCompact);
    if (!poly) {
      const el = parseElementFromLabel(labelCompact);
      const allowed = new Set(["H", "Cl", "Na", "C", "O"]);
      if (el && allowed.has(el)) {
        return <ElementAtom element={el as "H" | "Cl" | "Na" | "C" | "O"} position={[position.x, position.y, position.z]} charge={spec.charge} showCharge={showCharge} />;
      }
    }
    // Fallback/polyatomic: use IonParticle (handles molecule rendering + label)
    return <IonParticle position={position} spec={spec} showCharge={showCharge} />;
  };

  // Generate clustered positions around a center for duplicated ions on each side
  const clusterPositions = (center: THREE.Vector3, count: number, spread = 0.6): THREE.Vector3[] => {
    if (count <= 1) return [center.clone()];
    const arr: THREE.Vector3[] = [];
    const half = (count - 1) / 2;
    for (let i = 0; i < count; i++) {
      const k = i - half; // symmetric index around 0
      const zOffset = k * spread;
      // Keep identical x and y; vary only z so distance along x-axis remains equal (ΔEN driven)
      arr.push(new THREE.Vector3(center.x, center.y, center.z + zOffset));
    }
    return arr;
  };

  // Scale clustering radius with main separation so intra-side spacing looks reasonable
  const clusterR = THREE.MathUtils.lerp(0.45, 1.0, ionicness * 0.8);
  const catCenters = clusterPositions(catPos, cations.length, clusterR);
  const anCenters = clusterPositions(anPos, anions.length, clusterR);

  return (
    <group>
      {/* Bonds/arrows: choose linking strategy based on counts for clearer topology */}
      {(() => {
        const links: React.ReactNode[] = [];
        if (cations.length === 1 && anions.length >= 1) {
          // Single cation to each anion
          const aCenter = catCenters[0] ?? catPos;
          const aPos = getAttachmentPoint(cations[0].label, aCenter, "right");
          anCenters.forEach((bCenter, i) => {
            const bPos = getAttachmentPoint(anions[i]?.label ?? anions[0].label, bCenter, "left");
            links.push(
              <group key={`link-sa-${i}`}>
                <Bond a={aPos} b={bPos} ionicness={ionicness} />
                <DirectionArrow from={aPos} to={bPos} />
              </group>
            );
          });
        } else if (anions.length === 1 && cations.length >= 1) {
          // Each cation to the single anion (e.g., H2SO4 -> two H+ to one SO4 2-)
          const bCenter = anCenters[0] ?? anPos;
          const bPos = getAttachmentPoint(anions[0].label, bCenter, "left");
          catCenters.forEach((aCenter, i) => {
            const aPos = getAttachmentPoint(cations[i]?.label ?? cations[0].label, aCenter, "right");
            links.push(
              <group key={`link-as-${i}`}>
                <Bond a={aPos} b={bPos} ionicness={ionicness} />
                <DirectionArrow from={aPos} to={bPos} />
              </group>
            );
          });
        } else {
          // Pairwise links; extras connect to nearest opposite
          const m = Math.min(cations.length, anions.length);
          for (let i = 0; i < m; i++) {
            const aCenter = catCenters[i];
            const bCenter = anCenters[i];
            const aPos = getAttachmentPoint(cations[i].label, aCenter, "right");
            const bPos = getAttachmentPoint(anions[i].label, bCenter, "left");
            links.push(
              <group key={`link-p-${i}`}>
                <Bond a={aPos} b={bPos} ionicness={ionicness} />
                <DirectionArrow from={aPos} to={bPos} />
              </group>
            );
          }
          if (cations.length > anions.length && anCenters.length > 0) {
            const bCenter = anCenters[0];
            const bPos = getAttachmentPoint(anions[0].label, bCenter, "left");
            for (let i = m; i < cations.length; i++) {
              const aCenter = catCenters[i];
              const aPos = getAttachmentPoint(cations[i].label, aCenter, "right");
              links.push(
                <group key={`link-extra-cat-${i}`}>
                  <Bond a={aPos} b={bPos} ionicness={ionicness} />
                  <DirectionArrow from={aPos} to={bPos} />
                </group>
              );
            }
          }
          if (anions.length > cations.length && catCenters.length > 0) {
            const aCenter = catCenters[0];
            const aPos = getAttachmentPoint(cations[0].label, aCenter, "right");
            for (let i = m; i < anions.length; i++) {
              const bCenter = anCenters[i];
              const bPos = getAttachmentPoint(anions[i].label, bCenter, "left");
              links.push(
                <group key={`link-extra-an-${i}`}>
                  <Bond a={aPos} b={bPos} ionicness={ionicness} />
                  <DirectionArrow from={aPos} to={bPos} />
                </group>
              );
            }
          }
        }
        return links;
      })()}

      {/* Render duplicated particles per side to reflect counts */}
      {catCenters.map((p, i) => (
        <group key={`cat-${i}`}>{renderSide(cations[i] ?? cations[0], true, p)}</group>
      ))}
      {anCenters.map((p, i) => (
        <group key={`an-${i}`}>{renderSide(anions[i] ?? anions[0], false, p)}</group>
      ))}

      {showWater ? <HydrationShellRing center={catPos} cation /> : null}
      {showWater ? <HydrationShellRing center={anPos} cation={false} /> : null}
    </group>
  );
}
