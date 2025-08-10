export const COLORS: Record<string, string> = {
  H: "#e2e8f0",
  Cl: "#86efac",
  Na: "#93c5fd",
  bond: "#94a3b8",
  e: "#fef08a",
  arrow: "#fca5a5",
};

export const ION_COLORS = {
  cation: "#ef4444",
  anion: "#60a5fa",
  poly: "#22c55e",
};

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
  | "CO2+H2O";

export type IonSpec = { label: string; charge: number; count: number };

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
};
