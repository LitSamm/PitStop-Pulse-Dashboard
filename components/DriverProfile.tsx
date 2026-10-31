"use client";

import React from "react";
import { Zap, Timer, Award, Flag, BatteryCharging, Gauge } from "lucide-react";
import CarbonFiberTexture from "./CarbonFiberTexture";
import { DriverState } from "@/types/telemetry";

interface DriverProfileProps {
  driver: DriverState;
  lapTimeFormatted: string; // Real-time ticking string e.g. "01:14.382"
}

export default function DriverProfile({
  driver,
  lapTimeFormatted,
}: DriverProfileProps) {
  return (
    <div className="relative flex flex-col gap-4">
      {/* 1. Driver Profile Card */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md">
        {/* Carbon Fiber Texture Overlay */}
        <CarbonFiberTexture opacity={0.07} />

        <div className="relative z-10 flex flex-col items-center sm:items-start">
          {/* Header Tag */}
          <div className="mb-4 flex w-full items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                TELEMETRY TELEGRAPH // DRIVER 01
              </span>
            </div>
            <span className="rounded bg-zinc-800/90 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-400 border border-zinc-700/60">
              #01
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            {/* Circular Avatar Placeholder for [Image: Driver Helmet/Profile Transparent PNG] */}
            <div className="relative group">
              <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-cyan-500/50 bg-gradient-to-b from-zinc-800 to-zinc-950 p-1.5 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-105">
                {/* 
                  ============================================================
                  [Image: Driver Helmet/Profile Transparent PNG]
                  Place your helmet/driver transparent PNG image here:
                  e.g.:
                  <img 
                    src="/images/driver-helmet.png" 
                    alt="Driver Helmet" 
                    className="h-full w-full object-contain" 
                  />
                  ============================================================
                */}
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-zinc-900/90 overflow-hidden border border-zinc-700/40">
                  {/* High-tech Racing Helmet SVG Vector Placeholder */}
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-cyan-400"
                  >
                    <path
                      d="M20 55C20 35 32 18 52 18C72 18 82 32 82 50C82 68 74 78 52 78C40 78 30 74 25 68L20 55Z"
                      fill="#18181b"
                      stroke="#06b6d4"
                      strokeWidth="3"
                    />
                    {/* Visor */}
                    <path
                      d="M48 35C65 35 78 40 80 50C82 60 72 63 56 63C46 63 38 58 36 50C34 40 40 35 48 35Z"
                      fill="url(#visorGrad)"
                      stroke="#00f5d4"
                      strokeWidth="2"
                    />
                    {/* Aerodynamic spoiler line */}
                    <path
                      d="M22 45C30 38 42 30 58 30"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M26 62L40 68"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="38" stroke="#3f3f46" strokeDasharray="4 4" />
                    <defs>
                      <linearGradient id="visorGrad" x1="36" y1="35" x2="80" y2="63" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00f5d4" stopOpacity="0.8" />
                        <stop offset="0.5" stopColor="#0284c7" stopOpacity="0.9" />
                        <stop offset="1" stopColor="#312e81" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Live Position Badge on Avatar */}
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 font-mono text-xs font-black text-black shadow-lg ring-2 ring-zinc-900">
                  {driver.position}
                </div>
              </div>
            </div>

            {/* Driver Name & Team Details */}
            <div className="flex flex-col text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {driver.team}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white font-mono uppercase">
                {driver.name}
              </h2>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono">
                <span className="text-emerald-400 font-bold">{driver.gapToLeader}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">{driver.interval}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 w-full font-mono text-xs">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Position</span>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-amber-400">{driver.position}</span>
                <span className="text-[11px] text-emerald-400 font-bold">▲ 2 (St. P3)</span>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Lap Count</span>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{driver.currentLap}</span>
                <span className="text-sm text-zinc-500 font-medium">/{driver.totalLaps}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Live Ticking Lap Timer Card */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md">
        <CarbonFiberTexture opacity={0.07} />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                CURRENT LAP TIME
              </span>
            </div>
            <span className="flex items-center gap-1 rounded bg-cyan-950/60 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-800/50">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              LIVE TICK
            </span>
          </div>

          {/* Large Monospace Ticking Display */}
          <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-cyan-500/20 bg-zinc-950/80 py-4 px-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <div className="font-mono text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              {lapTimeFormatted}
            </div>
            <div className="mt-1 flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>MIN</span>
              <span>SEC</span>
              <span>MILLIS</span>
            </div>
          </div>

          {/* Lap Deltas & Benchmark Comparison */}
          <div className="mt-4 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between rounded-md bg-zinc-950/50 px-3 py-2 border border-zinc-800/60">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-purple-400" />
                BEST LAP
              </span>
              <span className="font-bold text-purple-400 tracking-wider">
                {driver.bestLapTime}
                <span className="ml-1 text-[10px] text-purple-400/80">(PURPLE)</span>
              </span>
            </div>

            <div className="flex items-center justify-between rounded-md bg-zinc-950/50 px-3 py-2 border border-zinc-800/60">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Flag className="h-3.5 w-3.5 text-zinc-400" />
                LAST LAP
              </span>
              <span className="font-medium text-zinc-300 tracking-wider">
                {driver.lastLapTime}
                <span className="ml-1 text-[10px] text-emerald-400 font-bold">-0.218s</span>
              </span>
            </div>
          </div>

          {/* Micro Sector Split Times */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80">
            <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-2">
              SECTOR TIME STATUS
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
              <div className="rounded border border-purple-500/40 bg-purple-950/20 py-1.5 px-1">
                <span className="text-[9px] text-purple-300 block font-semibold">SEC 1</span>
                <span className="font-bold text-purple-300 text-[11px]">23.418s</span>
              </div>
              <div className="rounded border border-emerald-500/40 bg-emerald-950/20 py-1.5 px-1">
                <span className="text-[9px] text-emerald-300 block font-semibold">SEC 2</span>
                <span className="font-bold text-emerald-300 text-[11px]">27.894s</span>
              </div>
              <div className="rounded border border-amber-500/40 bg-amber-950/20 py-1.5 px-1">
                <span className="text-[9px] text-amber-300 block font-semibold">SEC 3</span>
                <span className="font-bold text-amber-300 text-[11px]">22.372s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Electric Gokart Powertrain Telemetry Card */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-md">
        <CarbonFiberTexture opacity={0.07} />

        <div className="relative z-10 flex flex-col font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                EV POWERTRAIN STATUS
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400">OPTIMAL</span>
          </div>

          <div className="mt-3 space-y-3 text-xs">
            {/* Battery SoC Progress */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-zinc-400 flex items-center gap-1">
                  <BatteryCharging className="h-3 w-3 text-cyan-400" />
                  BATTERY SOC
                </span>
                <span className="font-bold text-cyan-400">{driver.batterySoc.toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${driver.batterySoc}%` }}
                />
              </div>
            </div>

            {/* Battery Temp & Motor kW Output */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="rounded bg-zinc-950/70 p-2 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">BATTERY TEMP</span>
                <span className="font-bold text-zinc-200 text-sm">{driver.batteryTemp}°C</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">NOMINAL (MAX 60°)</span>
              </div>

              <div className="rounded bg-zinc-950/70 p-2 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">MOTOR POWER</span>
                <span className="font-bold text-cyan-300 text-sm">{driver.motorPowerKw} kW</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">PEAK 115 kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

