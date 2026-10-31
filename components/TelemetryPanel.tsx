"use client";

import React from "react";
import dynamic from "next/dynamic";
import CarbonFiberTexture from "./CarbonFiberTexture";
import { TelemetryPoint } from "@/types/telemetry";

// Dynamically import Recharts component with SSR disabled to prevent hydration issues on deployment
const TelemetryChart = dynamic(() => import("./TelemetryChart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 w-full items-center justify-center rounded-lg bg-zinc-950/60 font-mono text-xs text-zinc-500">
      INITIALIZING TELEMETRY STREAM...
    </div>
  ),
});

interface TelemetryPanelProps {
  speed: number;        // 0 - 150 km/h
  throttle: number;     // 0 - 100%
  brake: number;        // 0 - 100%
  rpm: number;          // 0 - 12000 RPM
  steeringAngle: number;
  history: TelemetryPoint[];
}

export default function TelemetryPanel({
  speed,
  throttle,
  brake,
  rpm,
  steeringAngle,
  history,
}: TelemetryPanelProps) {
  // Speed percentage relative to max 150 km/h
  const speedPercentage = Math.min(100, Math.max(0, (speed / 150) * 100));

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md">
      {/* Carbon Fiber Texture Overlay */}
      <CarbonFiberTexture opacity={0.07} />

      <div className="relative z-10 flex flex-col font-mono">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              LIVE TELEMETRY GAUGES
            </h3>
          </div>
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
            FREQ: 10Hz
          </span>
        </div>

        {/* 3 Main Telemetry Progress Bars (Speed, Throttle, Brake) */}
        <div className="mt-4 space-y-4">
          {/* 1. SPEED BAR (0 - 150 km/h) with [SVG: Ikon Telemetri Dasar] Steering/Speed Icon */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                {/* 
                  ============================================================
                  [SVG: Ikon Telemetri Dasar - Steering Wheel Icon]
                  Placeholder for steering wheel SVG icon
                  ============================================================
                */}
                <div className="flex h-5 w-5 items-center justify-center rounded bg-zinc-800/90 text-cyan-400 border border-zinc-700/60">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                </div>
                <span className="font-bold text-zinc-300 tracking-wider">SPEED</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-cyan-400">{speed}</span>
                <span className="text-[10px] text-zinc-400">KM/H</span>
              </div>
            </div>

            {/* Speed Progress Bar with neon cyan styling */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-950 border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-150 ease-out"
                style={{ width: `${speedPercentage}%` }}
              />
              {/* Tick marks */}
              <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
                <span className="border-r border-white h-full" />
                <span className="border-r border-white h-full" />
                <span className="border-r border-white h-full" />
                <span className="border-r border-white h-full" />
              </div>
            </div>
          </div>

          {/* 2. THROTTLE (GAS) BAR (0 - 100%) with [SVG: Ikon Telemetri Dasar] Throttle Pedal Icon */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                {/* 
                  ============================================================
                  [SVG: Ikon Telemetri Dasar - Throttle Pedal Icon]
                  Placeholder for gas/throttle pedal SVG icon
                  ============================================================
                */}
                <div className="flex h-5 w-5 items-center justify-center rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M7 3h10v18H7z" />
                    <line x1="10" y1="7" x2="14" y2="7" />
                    <line x1="10" y1="11" x2="14" y2="11" />
                    <line x1="10" y1="15" x2="14" y2="15" />
                  </svg>
                </div>
                <span className="font-bold text-zinc-300 tracking-wider">THROTTLE (GAS)</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-emerald-400">{throttle}%</span>
              </div>
            </div>

            {/* Neon Green Throttle Progress Bar */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-950 border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-[#00ff66] shadow-[0_0_12px_rgba(0,255,102,0.8)] transition-all duration-150 ease-out"
                style={{ width: `${throttle}%` }}
              />
            </div>
          </div>

          {/* 3. BRAKE (REM) BAR (0 - 100%) with [SVG: Ikon Telemetri Dasar] Brake Pedal Icon */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                {/* 
                  ============================================================
                  [SVG: Ikon Telemetri Dasar - Brake Pedal Icon]
                  Placeholder for brake pedal SVG icon
                  ============================================================
                */}
                <div className="flex h-5 w-5 items-center justify-center rounded bg-red-950/60 text-rose-500 border border-red-800/60">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <rect x="5" y="5" width="14" height="14" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="font-bold text-zinc-300 tracking-wider">BRAKE (REM)</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-[#ff2a55]">{brake}%</span>
              </div>
            </div>

            {/* Neon Red Brake Progress Bar */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-950 border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-[#ff2a55] shadow-[0_0_12px_rgba(255,42,85,0.8)] transition-all duration-150 ease-out"
                style={{ width: `${brake}%` }}
              />
            </div>
          </div>
        </div>

        {/* Micro Telemetry Telemetry Gauges (RPM & Steering) */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 block">MOTOR RPM</span>
            <span className="text-base font-black text-amber-400">{rpm.toLocaleString()}</span>
            <div className="mt-1 h-1.5 w-full rounded bg-zinc-900 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-150"
                style={{ width: `${Math.min(100, (rpm / 12000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 block">STEERING ANGLE</span>
            <span className="text-base font-black text-white">
              {steeringAngle > 0 ? `+${steeringAngle}°` : `${steeringAngle}°`}
            </span>
            <div className="mt-1 flex items-center justify-center gap-1 text-[9px] text-zinc-400">
              <span>{steeringAngle < 0 ? "LEFT" : steeringAngle > 0 ? "RIGHT" : "CENTER"}</span>
            </div>
          </div>
        </div>

        {/* Live Recharts Telemetry Graph */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              REAL-TIME OSCILLOSCOPE (SPEED / THROTTLE / BRAKE)
            </span>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="text-cyan-400 font-bold">■ SPEED</span>
              <span className="text-emerald-400 font-bold">■ THROTTLE</span>
              <span className="text-rose-400 font-bold">■ BRAKE</span>
            </div>
          </div>

          <TelemetryChart data={history} />
        </div>
      </div>
    </div>
  );
}

