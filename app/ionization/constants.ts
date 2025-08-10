export const COLORS: Record<string, string> = {
  // CPK color palette
  H: "#FFFFFF",
  C: "#909090",
  N: "#3050F8",
  O: "#FF0D0D",
  F: "#90E050",
  Cl: "#1FF01F",
  Br: "#A62929",
  I: "#940094",
  S: "#FFFF30",
  P: "#FF8000",
  Na: "#AB5CF2",
  bond: "#94a3b8",
  e: "#fef08a",
  arrow: "#fca5a5",
};

export const REACTIONS: Partial<Record<CompoundKey, string[]>> = {
  HCl: ["HCl(aq) → H+(aq) + Cl-(aq)"],
  NaCl: ["NaCl(s) → Na+(aq) + Cl-(aq)"],
  NaOH: ["NaOH(s) → Na+(aq) + OH-(aq)"],
  "Ba(OH)2": ["Ba(OH)2(s) → Ba2+(aq) + 2 OH-(aq)"],
  "Ca(OH)2": ["Ca(OH)2(s) → Ca2+(aq) + 2 OH-(aq)"],
  H2SO4: ["H2SO4(aq) ⇌ H+(aq) + HSO4-(aq)", "HSO4-(aq) ⇌ H+(aq) + SO4 2-(aq)"],
  HNO3: ["HNO3(aq) → H+(aq) + NO3-(aq)"],
  CH3COOH: ["CH3COOH(aq) ⇌ CH3COO-(aq) + H+(aq)"],
  NH3: ["NH3(aq) + H2O(l) ⇌ NH4+(aq) + OH-(aq)"],
  "CO2+H2O": ["CO2(aq) + H2O(l) ⇌ H2CO3(aq)", "H2CO3(aq) ⇌ HCO3-(aq) + H+(aq)"],
  H3PO4: ["H3PO4(aq) ⇌ H+(aq) + H2PO4-(aq)", "H2PO4-(aq) ⇌ H+(aq) + HPO4 2-(aq)", "HPO4 2-(aq) ⇌ H+(aq) + PO4 3-(aq)"],
  HClO3: ["HClO3(aq) → H+(aq) + ClO3-(aq)"],
  NaHCO3: ["NaHCO3(s) → Na+(aq) + HCO3-(aq)"],
  Na3PO3: ["Na3PO3(s) → 3 Na+(aq) + PO3 3-(aq)"],
  NaNO2: ["NaNO2(s) → Na+(aq) + NO2-(aq)"],
  HClO4: ["HClO4(aq) → H+(aq) + ClO4-(aq)"],
};

export const ION_COLORS = {
  cation: "#ef4444",
  anion: "#60a5fa",
  poly: "#22c55e",
};

// Preset electronegativity differences (ΔEN) used as defaults per compound
// Values are pedagogical approximations to drive interaction consistency.
export const PRESET_EN: Partial<Record<CompoundKey, number>> = {
  HCl: 0.9,
  NaCl: 2.1,
  // strong base salts / hydroxides
  NaOH: 2.1,
  "Ba(OH)2": 1.3,
  "Ca(OH)2": 1.0,
  // strong/weak acids
  H2SO4: 1.9,
  HNO3: 1.7,
  CH3COOH: 0.9,
  NH3: 0.9, // interacts with H2O to form NH4+ + OH-
  "CO2+H2O": 1.0,
  H3PO4: 1.6,
  HClO3: 1.6,
  NaHCO3: 1.9,
  Na3PO3: 1.9,
  NaNO2: 1.9,
  HClO4: 2.0,
};

export function getPresetEN(compound: CompoundKey): number {
  return PRESET_EN[compound] ?? 2.0;
}

export type CompoundKey =
  | "HCl"
  | "NaCl"
  | "CuCl2"
  | "NaOH"
  | "Ba(OH)2"
  | "Ca(OH)2"
  | "H2SO4"
  | "HNO3"
  | "CH3COOH"
  | "NH3"
  | "CO2+H2O"
  | "H3PO4"
  | "HClO3"
  | "NaHCO3"
  | "Na3PO3"
  | "NaNO2"
  | "HClO4";

export type IonSpec = { label: string; charge: number; count: number };

// Visual radii (not physical), to unify atom sizes across scenes
export const ELEMENT_RADII: Record<string, number> = {
  H: 0.45,
  Na: 0.65,
  Cl: 0.8,
  C: 0.55,
  O: 0.62,
  N: 0.56,
  S: 0.7,
  P: 0.68,
};

// CPK van der Waals radii (Å) – used for space-filling view, scaled in components
export const VDW_RADII: Record<string, number> = {
  H: 1.2,
  C: 1.7,
  N: 1.55,
  O: 1.52,
  F: 1.47,
  P: 1.8,
  S: 1.8,
  Cl: 1.75,
  Br: 1.85,
  I: 1.98,
  Na: 2.27,
};

export const COMPOUND_LIBRARY: Record<CompoundKey, IonSpec[] | null> = {
  HCl: null, // handled by diatomic scene
  NaCl: null, // handled by diatomic scene
  CuCl2: [
    { label: "Cu2+", charge: +2, count: 1 },
    { label: "Cl-", charge: -1, count: 2 },
  ],
  NaOH: [
    { label: "Na+", charge: +1, count: 1 },
    { label: "OH-", charge: -1, count: 1 },
  ],
  "Ba(OH)2": [
    { label: "Ba2+", charge: +2, count: 1 },
    { label: "OH-", charge: -1, count: 2 },
  ],
  "Ca(OH)2": [
    { label: "Ca2+", charge: +2, count: 1 },
    { label: "OH-", charge: -1, count: 2 },
  ],
  H2SO4: [
    { label: "H+", charge: +1, count: 2 },
    { label: "SO4 2-", charge: -2, count: 1 },
  ],
  HNO3: [
    { label: "H+", charge: +1, count: 1 },
    { label: "NO3-", charge: -1, count: 1 },
  ],
  CH3COOH: [
    { label: "H+", charge: +1, count: 1 },
    { label: "CH3COO-", charge: -1, count: 1 },
  ],
  NH3: [
    { label: "NH4+", charge: +1, count: 1 },
    { label: "OH-", charge: -1, count: 1 },
  ],
  "CO2+H2O": [
    { label: "H+", charge: +1, count: 2 },
    { label: "CO3 2-", charge: -2, count: 1 },
  ],
  H3PO4: [
    { label: "H+", charge: +1, count: 3 },
    { label: "PO4 3-", charge: -3, count: 1 },
  ],
  HClO3: [
    { label: "H+", charge: +1, count: 1 },
    { label: "ClO3-", charge: -1, count: 1 },
  ],
  NaHCO3: [
    { label: "Na+", charge: +1, count: 1 },
    { label: "HCO3-", charge: -1, count: 1 },
  ],
  Na3PO3: [
    { label: "Na+", charge: +1, count: 3 },
    { label: "PO3 3-", charge: -3, count: 1 },
  ],
  NaNO2: [
    { label: "Na+", charge: +1, count: 1 },
    { label: "NO2-", charge: -1, count: 1 },
  ],
  HClO4: [
    { label: "H+", charge: +1, count: 1 },
    { label: "ClO4-", charge: -1, count: 1 },
  ],
};
