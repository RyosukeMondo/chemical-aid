"use client";
import React from "react";
import MoleculeCO3 from "../components/MoleculeCO3";
import MoleculeNO3 from "./shapes/MoleculeNO3";
import MoleculeSO4 from "./shapes/MoleculeSO4";
import MoleculeNH4 from "./shapes/MoleculeNH4";
import MoleculeCH3COO from "./shapes/MoleculeCH3COO";

// Return a JSX element for a supported polyatomic ion label, otherwise null
export function renderMoleculeForLabel(label: string): React.ReactNode | null {
  const clean = label.replace(/\s/g, "");
  if (/CO3/i.test(clean)) return <MoleculeCO3 />;
  if (/NO3-?/i.test(clean)) return <MoleculeNO3 />;
  if (/SO4/i.test(clean)) return <MoleculeSO4 />;
  if (/NH4\+?/i.test(clean)) return <MoleculeNH4 />;
  if (/(CH3COO|C2H3O2)-?/i.test(clean)) return <MoleculeCH3COO />;
  return null;
}
