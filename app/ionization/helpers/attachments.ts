import * as THREE from "three";
import { ELEMENT_RADII } from "../constants";

function baseOffsetForLabel(labelCompact: string): number {
  // Approximate molecular extents for different polyatomic ions (in scene units)
  // Tuned for readability rather than physical accuracy.
  if (/^OH-$/i.test(labelCompact)) return 0.55;
  if (/^(NO3-|NO2-)$/i.test(labelCompact)) return 0.8;
  if (/^(SO4\s?2-|SO3\s?2-)$/i.test(labelCompact)) return 0.95;
  if (/^(CO3\s?2-|HCO3-)$/i.test(labelCompact)) return 0.9;
  if (/^(PO4\s?3-|PO3\s?3-)$/i.test(labelCompact)) return 1.0;
  if (/^ClO4-$/i.test(labelCompact)) return 1.05;
  if (/^CH3COO-$/i.test(labelCompact)) return 1.0;
  if (/^NH4\+$/i.test(labelCompact)) return 0.75;
  return 0.7; // default polyatomic size
}

export function getAttachmentPoint(
  label: string,
  center: THREE.Vector3,
  towards: "left" | "right"
): THREE.Vector3 {
  const labelCompact = label.replace(/\s/g, "");
  const dir = towards === "left" ? -1 : 1;

  // If it looks like a single element (H, Na, Cl, C, O, etc.), use element radius
  const singleEl = labelCompact.match(/^([A-Z][a-z]?)\+*\-*/);
  if (singleEl && singleEl[1] && !/[A-Z]{2,}/.test(labelCompact)) {
    const el = singleEl[1] as keyof typeof ELEMENT_RADII;
    const r = ELEMENT_RADII[el] ?? 0.6;
    return new THREE.Vector3(center.x + dir * (r + 0.25), center.y, center.z);
  }

  // Polyatomic: use a heuristic molecular half-extent
  const L = baseOffsetForLabel(labelCompact);
  return new THREE.Vector3(center.x + dir * L, center.y, center.z);
}
