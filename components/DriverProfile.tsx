"use client";

import React from "react";
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
    <div className="flex flex-col gap-4">
      {/* 1. Driver Profile Card */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-4 sm:p-5 backdrop-blur-md">
        {/* Carbon fiber subtle texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

        <div className="relative z-10 flex flex-col items-center sm:items-start">
          {/* Header Tag */}
          <div className="mb-4 flex w-full items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                PROFIL PEMBALAP
              </span>
            </div>
            <span className="rounded bg-zinc-800/90 px-2 py-0.5 text-xs font-bold text-cyan-400 border border-zinc-700/60">
              #01
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            {/* Circular Avatar with Driver Helmet */}
            <div className="relative group shrink-0">
              <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-zinc-700/80 bg-zinc-950 p-1 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/driver-avatar.webp"
                    alt="ITS Kart Driver in Helmet"
                    className="h-full w-full object-cover scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Live Position Badge on Avatar */}
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-xs font-black text-black shadow-lg ring-2 ring-zinc-950">
                  {driver.position}
                </div>
              </div>
            </div>

            {/* Driver Name & Team Details */}
            <div className="flex flex-col text-center sm:text-left min-w-0">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                {driver.team}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase truncate">
                {driver.name}
              </h2>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="text-emerald-400 font-bold tabular-nums">{driver.gapToLeader}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400 tabular-nums">{driver.interval}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-4 grid w-full grid-cols-2 gap-2.5 text-xs">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">POSISI</span>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-amber-400 tracking-tight">{driver.position}</span>
                <span className="text-[11px] text-emerald-400 font-bold">▲ 2 (St. P3)</span>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">LAP</span>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tracking-tight tabular-nums">{driver.currentLap}</span>
                <span className="text-xs text-zinc-500 font-medium">/{driver.totalLaps}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Live Ticking Lap Timer Card */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-4 sm:p-5 backdrop-blur-md">
        {/* Carbon fiber subtle texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                WAKTU LAP // LIVE
              </span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-cyan-950/60 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300 border border-cyan-800/50">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              RUNNING
            </span>
          </div>

          {/* Large Ticking Display (Using tabular-nums font-mono for anti-jitter) */}
          <div className="mt-3 flex flex-col items-center justify-center rounded-lg border border-cyan-500/20 bg-zinc-950/90 py-3 px-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-cyan-300 tabular-nums drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              {lapTimeFormatted}
            </div>
            <div className="mt-1 flex items-center gap-4 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
              <span>MIN</span>
              <span>SEC</span>
              <span>MILLIS</span>
            </div>
          </div>

          {/* Lap Deltas & Benchmark Comparison */}
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md bg-zinc-950/60 px-3 py-2 border border-zinc-800/60">
              <span className="text-zinc-400 text-xs font-semibold">
                BEST LAP
              </span>
              <span className="font-bold text-purple-400 tracking-wide tabular-nums">
                {driver.bestLapTime}
                <span className="ml-1.5 text-[11px] text-purple-400/80 font-medium">(PURPLE)</span>
              </span>
            </div>

            <div className="flex items-center justify-between rounded-md bg-zinc-950/60 px-3 py-2 border border-zinc-800/60">
              <span className="text-zinc-400 text-xs font-semibold">
                LAST LAP
              </span>
              <span className="font-semibold text-zinc-200 tracking-wide tabular-nums">
                {driver.lastLapTime}
                <span className="ml-1.5 text-[11px] text-emerald-400 font-bold">-0.218s</span>
              </span>
            </div>
          </div>

          {/* Sector Split Times */}
          <div className="mt-3 pt-3 border-t border-zinc-800/80">
            <span className="text-[11px] uppercase text-zinc-400 tracking-wider block mb-2 font-bold">
              SECTOR TIME STATUS
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded border border-purple-500/40 bg-purple-950/20 py-1.5 px-1">
                <span className="text-[10px] text-purple-300 block font-semibold">SEC 1</span>
                <span className="font-bold text-purple-200 text-xs tabular-nums">23.418s</span>
              </div>
              <div className="rounded border border-emerald-500/40 bg-emerald-950/20 py-1.5 px-1">
                <span className="text-[10px] text-emerald-300 block font-semibold">SEC 2</span>
                <span className="font-bold text-emerald-200 text-xs tabular-nums">27.894s</span>
              </div>
              <div className="rounded border border-amber-500/40 bg-amber-950/20 py-1.5 px-1">
                <span className="text-[10px] text-amber-300 block font-semibold">SEC 3</span>
                <span className="font-bold text-amber-200 text-xs tabular-nums">22.372s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Electric Gokart Powertrain Telemetry Card */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-4 sm:p-5 backdrop-blur-md">
        {/* Carbon fiber subtle texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                SISTEM TENAGA EV
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
              OPTIMAL
            </span>
          </div>

          <div className="mt-3 space-y-3 text-xs">
            {/* Battery SoC Progress */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400 font-semibold">
                  BATTERY SoC
                </span>
                <span className="font-bold text-cyan-400 tabular-nums">{driver.batterySoc.toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${driver.batterySoc}%` }}
                />
              </div>
            </div>

            {/* Real Hardware Footage Thumbnail */}
            <div className="relative mt-2 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/img_7390.webp"
                alt="ITS EV Powertrain & Cooling System"
                className="h-28 w-full object-cover object-[center_62%] transition-opacity duration-300 hover:opacity-100"
              />
              <div className="absolute top-1.5 left-2 flex items-center gap-1.5 rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                COOLING LOOP CAM
              </div>
            </div>

            {/* Battery Temp & Motor kW Output */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase">BATTERY TEMP</span>
                <span className="font-extrabold text-zinc-100 text-sm tabular-nums">{driver.batteryTemp}°C</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">NOMINAL (MAX 60°)</span>
              </div>

              <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase">MOTOR POWER</span>
                <span className="font-extrabold text-cyan-300 text-sm tabular-nums">{driver.motorPowerKw} kW</span>
                <span className="text-[10px] text-zinc-400 block mt-0.5 font-medium">PEAK 115 kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
