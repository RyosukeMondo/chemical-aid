"use client";
import React, { createContext, useContext } from "react";

export type VisualSettings = {
  showResonanceGlow: boolean;
  showLonePairs: boolean;
};

const VisualSettingsContext = createContext<VisualSettings>({
  showResonanceGlow: true,
  showLonePairs: true,
});

export const VisualSettingsProvider = ({ children, value }: { children: React.ReactNode; value: VisualSettings }) => {
  return <VisualSettingsContext.Provider value={value}>{children}</VisualSettingsContext.Provider>;
};

export function useVisualSettings() {
  return useContext(VisualSettingsContext);
}
