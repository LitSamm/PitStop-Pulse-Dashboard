"use client";

import React from "react";
import dynamic from "next/dynamic";
import { TelemetryPoint } from "@/types/telemetry";

// Dynamically import Recharts component with SSR disabled to prevent hydration issues
const TelemetryChart = dynamic(() => import("./TelemetryChart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-36 w-full items-center justify-center rounded-lg bg-zinc-950/60 text-xs text-zinc-500 font-medium">
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
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-4 sm:p-5 backdrop-blur-md">
      {/* Carbon fiber subtle texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

      <div className="relative z-10 flex flex-col">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              LIVE TELEMETRY GAUGES
            </h3>
          </div>
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
            FREQ: 10Hz
          </span>
        </div>

        {/* 3 Main Telemetry Progress Bars (Speed, Throttle, Brake) */}
        <div className="mt-4 space-y-4">
          {/* 1. SPEED BAR (0 - 150 km/h) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 text-[10px] font-black text-cyan-400 border border-cyan-800/60">
                  SPD
                </span>
                <span className="font-bold text-zinc-200 tracking-wider">SPEED</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-cyan-400 tabular-nums">{speed}</span>
                <span className="text-[11px] text-zinc-400 font-semibold">KM/H</span>
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

          {/* 2. THROTTLE (GAS) BAR (0 - 100%) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-black text-emerald-400 border border-emerald-800/60">
                  THR
                </span>
                <span className="font-bold text-zinc-200 tracking-wider">THROTTLE (GAS)</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-emerald-400 tabular-nums">{throttle}%</span>
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

          {/* 3. BRAKE (REM) BAR (0 - 100%) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-950/80 px-1.5 py-0.5 text-[10px] font-black text-rose-500 border border-red-800/60">
                  BRK
                </span>
                <span className="font-bold text-zinc-200 tracking-wider">BRAKE (REM)</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-[#ff2a55] tabular-nums">{brake}%</span>
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

        {/* Telemetry Gauges (RPM & Steering) */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 font-semibold block uppercase">MOTOR RPM</span>
            <span className="text-base font-extrabold text-amber-400 tabular-nums">{rpm.toLocaleString()}</span>
            <div className="mt-1 h-1.5 w-full rounded bg-zinc-900 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-150"
                style={{ width: `${Math.min(100, (rpm / 12000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/80">
            <span className="text-[10px] text-zinc-500 font-semibold block uppercase">STEERING ANGLE</span>
            <span className="text-base font-extrabold text-white tabular-nums">
              {steeringAngle > 0 ? `+${steeringAngle}°` : `${steeringAngle}°`}
            </span>
            <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-semibold text-zinc-400">
              <span>{steeringAngle < 0 ? "LEFT" : steeringAngle > 0 ? "RIGHT" : "CENTER"}</span>
            </div>
          </div>
        </div>

        {/* Cockpit Steering Telemetry Camera Asset */}
        <div className="relative mt-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cockpit-steering.webp"
            alt="ITS Electric Kart Cockpit & Steering Telemetry"
            className="h-24 w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            ONBOARD COCKPIT DISPLAY
          </div>
          <div className="absolute bottom-1.5 right-2 text-xs font-semibold text-zinc-200 bg-black/70 px-2 py-0.5 rounded border border-zinc-700/50 tabular-nums">
            STEER: {steeringAngle > 0 ? `+${steeringAngle}°` : `${steeringAngle}°`}
          </div>
        </div>

        {/* Live Recharts Telemetry Graph */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              REAL-TIME OSCILLOSCOPE
            </span>
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="text-cyan-400">■ SPD</span>
              <span className="text-emerald-400">■ THR</span>
              <span className="text-rose-400">■ BRK</span>
            </div>
          </div>

          <TelemetryChart data={history} />
        </div>
      </div>
    </div>
  );
}
