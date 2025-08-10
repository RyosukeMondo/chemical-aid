"use client";
import React, { createContext, useContext } from "react";

export type VisualSettings = {
  showResonanceGlow: boolean;
  showLonePairs: boolean;
  bondScale: number; // global multiplier for visual bond lengths
  angleOffsetDeg: number; // global additive offset for angles where applicable
  viewMode: "ball-and-stick" | "cpk"; // rendering style
  cpkScale: number; // global multiplier for CPK vdW radii
};

const VisualSettingsContext = createContext<VisualSettings>({
  showResonanceGlow: true,
  showLonePairs: true,
  bondScale: 1.0,
  angleOffsetDeg: 0,
  viewMode: "ball-and-stick",
  cpkScale: 1.0,
});

export const VisualSettingsProvider = ({ children, value }: { children: React.ReactNode; value: VisualSettings }) => {
  return <VisualSettingsContext.Provider value={value}>{children}</VisualSettingsContext.Provider>;
};

export function useVisualSettings() {
  return useContext(VisualSettingsContext);
}
