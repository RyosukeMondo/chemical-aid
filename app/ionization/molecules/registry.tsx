"use client";
import React from "react";
import MoleculeCO3 from "../components/MoleculeCO3";
import MoleculeNO3 from "./shapes/MoleculeNO3";
import MoleculeSO4 from "./shapes/MoleculeSO4";
import MoleculeNH4 from "./shapes/MoleculeNH4";
import MoleculeCH3COO from "./shapes/MoleculeCH3COO";
import MoleculePO4 from "./shapes/MoleculePO4";
import MoleculeClO3 from "./shapes/MoleculeClO3";
import MoleculeHCO3 from "./shapes/MoleculeHCO3";
import MoleculePO3 from "./shapes/MoleculePO3";
import MoleculeNO2 from "./shapes/MoleculeNO2";
import MoleculeClO4 from "./shapes/MoleculeClO4";

// Return a JSX element for a supported polyatomic ion label, otherwise null
export function renderMoleculeForLabel(label: string): React.ReactNode | null {
  const clean = label.replace(/\s/g, "");
  if (/CO3/i.test(clean)) return <MoleculeCO3 />;
  if (/NO3-?/i.test(clean)) return <MoleculeNO3 />;
  if (/SO4/i.test(clean)) return <MoleculeSO4 />;
  if (/NH4\+?/i.test(clean)) return <MoleculeNH4 />;
  if (/(CH3COO|C2H3O2)-?/i.test(clean)) return <MoleculeCH3COO />;
  if (/PO4\s*3-?|PO4-?3/i.test(clean) || /PO4/i.test(clean)) return <MoleculePO4 />;
  if (/ClO3-?/i.test(clean)) return <MoleculeClO3 />;
  if (/HCO3-?/i.test(clean)) return <MoleculeHCO3 />;
  if (/PO3\s*3-?|PO3-?3/i.test(clean) || /PO3/i.test(clean)) return <MoleculePO3 />;
  if (/NO2-?/i.test(clean)) return <MoleculeNO2 />;
  if (/ClO4-?/i.test(clean)) return <MoleculeClO4 />;
  return null;
}
