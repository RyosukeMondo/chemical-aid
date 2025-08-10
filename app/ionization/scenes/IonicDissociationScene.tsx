"use client";
import React, { useMemo } from "react";
import { IonSpec } from "../constants";
import { expandIonSpecs, positionsOnRing } from "../helpers/layout";
import IonParticle from "../components/IonParticle";
import HydrationShellRing from "../components/HydrationShellRing";

export default function IonicDissociationScene({ ions, showWater }: { ions: IonSpec[]; showWater: boolean }) {
  const items = useMemo(() => expandIonSpecs(ions), [ions]);
  const positions = useMemo(() => positionsOnRing(items.length, 2.6), [items]);
  return (
    <group>
      {items.map((spec, i) => (
        <group key={i}>
          <IonParticle position={positions[i]} spec={spec} />
          {showWater ? <HydrationShellRing center={positions[i]} cation={spec.charge > 0} /> : null}
        </group>
      ))}
    </group>
  );
}
