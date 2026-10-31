"use client";

import React from "react";
import { Activity, Radio, Cpu, Thermometer, CloudSun } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-10 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="mx-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Brand & System Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-black tracking-widest text-white uppercase flex items-center gap-2">
                PITSTOP <span className="text-cyan-400">PULSE</span>
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE STREAM
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-wider">
              TELEMETRY & STRATEGY SYSTEM // ELECTRIC RACING DIVISION
            </p>
          </div>
        </div>

        {/* Live Race Telemetry Metadata */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs">
          {/* Circuit info */}
          <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-zinc-300">
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-zinc-500">TRACK:</span>
            <span className="font-semibold text-white">SILVERSTONE GP</span>
          </div>

          {/* Weather & Track Condition */}
          <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-zinc-300">
            <CloudSun className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-zinc-500">COND:</span>
            <span className="font-semibold text-emerald-400">DRY</span>
            <span className="text-zinc-600">|</span>
            <Thermometer className="h-3.5 w-3.5 text-rose-400" />
            <span className="text-zinc-500">TRK:</span>
            <span className="font-semibold text-white">38.5°C</span>
          </div>

          {/* Supabase / Backend Sync Status */}
          <div className="hidden sm:flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-zinc-300">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-zinc-500">SYNC:</span>
            <span className="text-cyan-400 font-semibold">SUPABASE REALTIME</span>
            <span className="text-[10px] text-zinc-400 font-normal">24ms</span>
          </div>
        </div>
      </div>
    </header>
  );
}

