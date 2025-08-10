"use client";
import React, { useState } from "react";
import { REACTIONS } from "./ionization/constants";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
// Extracted modules
import DiatomicSceneExt from "./ionization/scenes/DiatomicScene";
import IonicDissociationScene from "./ionization/scenes/IonicDissociationScene";
import { COMPOUND_LIBRARY as LIB, CompoundKey } from "./ionization/constants";
import "./ionization/polyfills/canvasRoundRect";
import { VisualSettingsProvider } from "./ionization/VisualSettingsContext";

export default function IonizationPlayground() {
  const [compound, setCompound] = useState<CompoundKey>("HCl");
  const [deltaEN, setDeltaEN] = useState(1.0);
  const [ionize, setIonize] = useState(false);
  const [showWater, setShowWater] = useState(true);
  const [showResonanceGlow, setShowResonanceGlow] = useState(true);
  const [showLonePairs, setShowLonePairs] = useState(true);
  const [bondScale, setBondScale] = useState(1.0);
  const [angleOffsetDeg, setAngleOffsetDeg] = useState(0);
  const [viewMode, setViewMode] = useState<"ball-and-stick" | "cpk">("ball-and-stick");
  const [cpkScale, setCpkScale] = useState(0.4);
  const isDiatomic = compound === "HCl" || compound === "NaCl";
  const presetEN = compound === "HCl" ? 0.9 : compound === "NaCl" ? 2.1 : 2.0;
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 bg-slate-50">
      <div className="lg:col-span-2 shadow-xl bg-white rounded-2xl border border-slate-200">
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">電離・結合インタラクティブ</h1>
          <p className="text-sm text-slate-600">
            電子(e⁻)の偏り、結合の性質(共有⇄イオン)、電離の様子を直感的に学べます。
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">化合物</label>
            <select
              value={compound}
              onChange={(e) => setCompound(e.target.value as CompoundKey)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <optgroup label="二原子分子">
                <option value="HCl">HCl (塩化水素)</option>
                <option value="NaCl">NaCl (塩化ナトリウム)</option>
              </optgroup>
              <optgroup label="主な電離例">
                <option value="CuCl2">CuCl2</option>
                <option value="NaOH">NaOH</option>
                <option value="Ba(OH)2">Ba(OH)2</option>
                <option value="Ca(OH)2">Ca(OH)2</option>
                <option value="H2SO4">H2SO4</option>
                <option value="HNO3">HNO3</option>
                <option value="CH3COOH">CH3COOH</option>
                <option value="NH3">NH3 (aq)</option>
                <option value="CO2+H2O">CO2 + H2O</option>
                <option value="H3PO4">H3PO4</option>
                <option value="HClO3">HClO3</option>
                <option value="NaHCO3">NaHCO3</option>
                <option value="Na3PO3">Na3PO3</option>
                <option value="NaNO2">NaNO2</option>
                <option value="HClO4">HClO4</option>
              </optgroup>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              電気陰性度の差 ΔEN
              <span className="ml-2 text-slate-500">(目安: {presetEN.toFixed(1)})</span>
            </label>
            <input
              type="range"
              min={0}
              max={3.5}
              step={0.1}
              value={deltaEN}
              onChange={(e) => setDeltaEN(parseFloat(e.target.value))}
              className="w-full accent-slate-600"
              disabled={!isDiatomic}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>共有結合</span>
              <span>イオン的</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={ionize}
                onChange={(e) => setIonize(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              電離を強調
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showWater}
                onChange={(e) => setShowWater(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              水和(溶媒)を表示
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showResonanceGlow}
                onChange={(e) => setShowResonanceGlow(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              共鳴グローを表示
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showLonePairs}
                onChange={(e) => setShowLonePairs(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              孤立電子対を表示
            </label>
          </div>

          <div className="flex gap-2">
            <button
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50"
              onClick={() => {
                setDeltaEN(presetEN);
                setIonize(false);
                setBondScale(1.0);
                setAngleOffsetDeg(0);
              }}
            >
              標準に戻す
            </button>
            <button
              className="rounded-md bg-slate-900 text-white px-3 py-2 text-sm shadow-sm hover:bg-slate-800"
              onClick={() => setIonize((s) => !s)}
            >
              {ionize ? "結合へ戻す" : "電離アニメ"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">表示モード</label>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-md border text-sm ${viewMode === "ball-and-stick" ? "bg-slate-800 text-white" : "bg-white text-slate-700"}`}
                onClick={() => setViewMode("ball-and-stick")}
              >
                Ball-and-Stick
              </button>
              <button
                className={`px-3 py-1 rounded-md border text-sm ${viewMode === "cpk" ? "bg-slate-800 text-white" : "bg-white text-slate-700"}`}
                onClick={() => setViewMode("cpk")}
              >
                CPK
              </button>
            </div>
          </div>

          {viewMode === "cpk" ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">CPK 半径スケール</label>
              <input
                type="range"
                min={0.2}
                max={0.8}
                step={0.01}
                value={cpkScale}
                onChange={(e) => setCpkScale(parseFloat(e.target.value))}
                className="w-full accent-slate-600"
              />
              <div className="text-xs text-slate-500">{cpkScale.toFixed(2)}×</div>
            </div>
          ) : null}

          {viewMode === "ball-and-stick" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">結合長スケール (全体)</label>
                <input
                  type="range"
                  min={0.7}
                  max={1.5}
                  step={0.01}
                  value={bondScale}
                  onChange={(e) => setBondScale(parseFloat(e.target.value))}
                  className="w-full accent-slate-600"
                />
                <div className="text-xs text-slate-500">{bondScale.toFixed(2)}×</div>
              </div>
            </>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">角度オフセット (°)</label>
            <input
              type="range"
              min={-20}
              max={20}
              step={1}
              value={angleOffsetDeg}
              onChange={(e) => setAngleOffsetDeg(parseInt(e.target.value))}
              className="w-full accent-slate-600"
            />
            <div className="text-xs text-slate-500">{angleOffsetDeg}°</div>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed bg-white rounded-2xl p-3 shadow-inner border border-slate-200">
            <p className="mb-1">📌 観察ポイント</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                矢印は e⁻ が <b>どちら側に偏る</b>かを示します。
              </li>
              <li>
                ΔEN を上げると結合の棒が <b>薄く</b>なり、イオン性が増します。
              </li>
              <li>
                Cl 側の電子が増え、H/Na は <b>＋</b>、Cl は <b>−</b> に帯電します。
              </li>
              <li>溶媒(水)の双極子がイオンを安定化 (水和) します。</li>
            </ul>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed bg-white rounded-2xl p-3 shadow-inner border border-slate-200">
            <p className="mb-1">⚗️ 反応式</p>
            {(REACTIONS[compound] ?? ["（この化合物の反応式は未定義です）"]).map((eq, idx) => (
              <div key={idx} className="font-mono text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 mb-1">
                {eq}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 relative shadow-2xl bg-white rounded-2xl border border-slate-200">
        <div className="p-0 h-[70vh] lg:h-full rounded-2xl overflow-hidden">
          <Canvas camera={{ position: [0, 1.6, 5], fov: 50 }} shadows>
            <VisualSettingsProvider value={{ showResonanceGlow, showLonePairs, bondScale, angleOffsetDeg, viewMode, cpkScale }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 6, 5]} intensity={0.9} castShadow />
              {isDiatomic ? (
                <DiatomicSceneExt
                  compound={compound as "HCl" | "NaCl"}
                  deltaEN={deltaEN}
                  ionize={ionize}
                  showWater={showWater}
                />
              ) : (
                <IonicDissociationScene ions={LIB[compound]!} showWater={showWater} />
              )}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <shadowMaterial opacity={0.15} />
              </mesh>
              <OrbitControls enablePan enableRotate enableZoom />
            </VisualSettingsProvider>
          </Canvas>
        </div>
        <motion.div
          className="absolute right-3 top-3 text-xs bg-white/80 backdrop-blur px-3 py-1 rounded-full shadow"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ドラッグで回転 / ホイールで拡大縮小
        </motion.div>
      </div>
    </div>
  );
}
