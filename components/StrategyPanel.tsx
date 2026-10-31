"use client";

import React from "react";
import { AlertTriangle, Wrench, ShieldAlert, ArrowRight, Gauge } from "lucide-react";
import CarbonFiberTexture from "./CarbonFiberTexture";
import { PitStrategyState, TireCompound } from "@/types/telemetry";

interface StrategyPanelProps {
  strategy: PitStrategyState;
  currentLap: number;
}

export default function StrategyPanel({
  strategy,
  currentLap,
}: StrategyPanelProps) {
  // Helper to render [SVG: Ikon Kompon Ban] (circle with red/yellow/white border)
  const renderTireCompoundIcon = (
    compound: TireCompound,
    size: "sm" | "md" | "lg" = "md"
  ) => {
    let borderColor = "border-yellow-400 text-yellow-400";
    let letter = "M";
    let name = "MEDIUM";

    if (compound === "SOFT") {
      borderColor = "border-rose-500 text-rose-500";
      letter = "S";
      name = "SOFT";
    } else if (compound === "HARD") {
      borderColor = "border-white text-white";
      letter = "H";
      name = "HARD";
    } else if (compound === "INTERMEDIATE") {
      borderColor = "border-emerald-500 text-emerald-500";
      letter = "I";
      name = "INTER";
    } else if (compound === "WET") {
      borderColor = "border-blue-500 text-blue-500";
      letter = "W";
      name = "WET";
    }

    const sizeClasses =
      size === "lg"
        ? "h-10 w-10 text-sm border-2"
        : size === "sm"
        ? "h-6 w-6 text-[10px] border"
        : "h-8 w-8 text-xs border-2";

    return (
      <div className="flex items-center gap-2">
        {/* 
          ============================================================
          [SVG: Ikon Kompon Ban] 
          Pirelli / F1 style circle with red/yellow/white border
          ============================================================
        */}
        <div
          className={`flex ${sizeClasses} items-center justify-center rounded-full bg-zinc-950 font-black font-mono shadow-md ${borderColor}`}
        >
          {letter}
        </div>
        <span className="font-mono text-xs font-bold text-zinc-200">{name}</span>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md">
      {/* Carbon Fiber Texture Overlay */}
      <CarbonFiberTexture opacity={0.07} />

      <div className="relative z-10 flex flex-col font-mono">
        {/* Strategy Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              PIT STRATEGY & TIRE MANAGEMENT
            </h3>
          </div>
          <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">
            PLAN A
          </span>
        </div>

        {/* Primary Strategy Alert Banner */}
        <div className="mt-4 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-3.5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <AlertTriangle className="h-4 w-4 animate-bounce" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-amber-400 font-bold tracking-wider uppercase block">
                CREW RADIO RECOMMENDATION
              </span>
              <div className="text-sm font-black text-white mt-0.5">
                {strategy.pitRecommendation}
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Box window opens at Lap 14. Target undercut delta vs P2 is +2.4s.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Required: "Tire Wear: 65%" & "Optimal Pit Window: Lap 15" */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* Tire Wear Card */}
          <div className="rounded-lg bg-zinc-950/80 p-3 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 uppercase block tracking-wider">
              AVERAGE TIRE WEAR
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              {/* Exact user requested text: Tire Wear: 65% */}
              <span className="text-xl sm:text-2xl font-black text-rose-400">
                {strategy.overallTireWear}%
              </span>
              <span className="text-[10px] text-zinc-400 font-normal">DEGRADATION</span>
            </div>
            {/* Visual Wear Bar */}
            <div className="mt-2 h-1.5 w-full rounded bg-zinc-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                style={{ width: `${strategy.overallTireWear}%` }}
              />
            </div>
          </div>

          {/* Optimal Pit Window Card */}
          <div className="rounded-lg bg-zinc-950/80 p-3 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 uppercase block tracking-wider">
              PIT WINDOW
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              {/* Exact user requested text: Optimal Pit Window: Lap 15 */}
              <span className="text-xl sm:text-2xl font-black text-amber-400">
                {strategy.optimalPitWindow}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 mt-2 block font-semibold">
              IN {15 - currentLap > 0 ? `${15 - currentLap} LAPS` : "NOW"}
            </span>
          </div>
        </div>

        {/* Current Tire Compound & Strategy Switch */}
        <div className="mt-4 rounded-lg bg-zinc-950/60 p-3 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3 text-[11px] text-zinc-400">
            <span>CURRENT FITTED</span>
            <span>RECOMMENDED NEXT</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Current Fitted Tire [SVG: Ikon Kompon Ban] */}
            <div className="flex flex-col">
              {renderTireCompoundIcon(strategy.currentCompound, "md")}
              <span className="text-[10px] text-zinc-500 mt-1">12 Laps Old</span>
            </div>

            <div className="flex flex-col items-center px-2">
              <ArrowRight className="h-4 w-4 text-zinc-500" />
              <span className="text-[9px] text-zinc-600 mt-1">SWAP</span>
            </div>

            {/* Recommended Next Tire [SVG: Ikon Kompon Ban] */}
            <div className="flex flex-col items-end">
              {renderTireCompoundIcon(strategy.recommendedCompound, "md")}
              <span className="text-[10px] text-emerald-400 mt-1">Fresh Set (Slick)</span>
            </div>
          </div>
        </div>

        {/* 4-Tire Thermal and Degradation Diagram */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              4-WHEEL TIRE HEATMAP & STATUS
            </span>
            <span className="text-[10px] text-zinc-500">OPTIMAL RANGE: 85° - 105°C</span>
          </div>

          {/* Kart / Car Chassis 4-Tire Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Front Left (FL) */}
            <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-cyan-400">FL (FRONT LEFT)</span>
                <span className="text-zinc-400">{strategy.tires.fl.pressure} PSI</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-zinc-200">
                  {strategy.tires.fl.temp}°C
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {strategy.tires.fl.wear}% WEAR
                </span>
              </div>
            </div>

            {/* Front Right (FR) */}
            <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-cyan-400">FR (FRONT RIGHT)</span>
                <span className="text-zinc-400">{strategy.tires.fr.pressure} PSI</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-zinc-200">
                  {strategy.tires.fr.temp}°C
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {strategy.tires.fr.wear}% WEAR
                </span>
              </div>
            </div>

            {/* Rear Left (RL) */}
            <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-cyan-400">RL (REAR LEFT)</span>
                <span className="text-zinc-400">{strategy.tires.rl.pressure} PSI</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-zinc-200">
                  {strategy.tires.rl.temp}°C
                </span>
                <span className="text-xs font-bold text-rose-400">
                  {strategy.tires.rl.wear}% WEAR
                </span>
              </div>
            </div>

            {/* Rear Right (RR) */}
            <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-cyan-400">RR (REAR RIGHT)</span>
                <span className="text-zinc-400">{strategy.tires.rr.pressure} PSI</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-zinc-200">
                  {strategy.tires.rr.temp}°C
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {strategy.tires.rr.wear}% WEAR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

