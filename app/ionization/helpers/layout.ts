import * as THREE from "three";
import type { IonSpec } from "../constants";

export function expandIonSpecs(ions: IonSpec[]): IonSpec[] {
  const list: IonSpec[] = [];
  ions.forEach((s) => {
    for (let i = 0; i < s.count; i++) list.push({ ...s, count: 1 });
  });
  return list;
}

export function positionsOnRing(count: number, radius = 2.6): THREE.Vector3[] {
  const n = Math.max(1, count);
  return Array.from({ length: count }, (_, i) => {
    const theta = (i / n) * Math.PI * 2;
    return new THREE.Vector3(radius * Math.cos(theta), i % 2 ? 0.25 : -0.25, radius * Math.sin(theta));
  });
}
