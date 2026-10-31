"use client";

import React from "react";
import Header from "@/components/Header";
import DriverProfile from "@/components/DriverProfile";
import TrackMap from "@/components/TrackMap";
import TelemetryPanel from "@/components/TelemetryPanel";
import StrategyPanel from "@/components/StrategyPanel";
import { useTelemetry } from "@/hooks/useTelemetry";

export default function PitStopPulseDashboard() {
  // Use our real-time simulation hook (runs at 200ms interval)
  const {
    speed,
    throttle,
    brake,
    rpm,
    steeringAngle,
    trackProgress,
    history,
    lapTimeFormatted,
    driver,
    strategy,
  } = useTelemetry(200);

  return (
    <div className="relative min-h-screen w-full bg-black text-zinc-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* 
        ========================================================================
        1. GLOBAL BACKGROUND (Asset Placement)
        Fullscreen div at lowest z-index with thick blur effect (backdrop-blur-xl),
        dedicated for [Image: Blurred Pit Garage WebP/JPG] as ambient background.
        ========================================================================
      */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* 
          [Image: Blurred Pit Garage WebP/JPG]
          Replace or uncomment the <img> below when placing your image asset:
          <img
            src="/images/blurred-pit-garage.webp"
            alt="Pit Garage Ambient"
            className="h-full w-full object-cover opacity-20 filter blur-2xl"
          />
        */}

        {/* Ambient atmospheric motorsport lighting & garage glow fallback */}
        <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full bg-amber-600/10 blur-[160px]" />
        <div className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[150px]" />

        {/* Thick blur filter overlay as required */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      </div>

      {/* Top Navigation & Status Bar */}
      <Header />

      {/* Main 3-Column Dashboard Grid */}
      <main className="relative z-10 mx-auto max-w-[1720px] p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 xl:gap-6">
          {/* 
            ====================================================================
            KOLOM KIRI (Left Column - 3 cols on xl, 4 on lg):
            Driver Profile & Lap Info
            - Circular avatar placeholder for [Image: Driver Helmet/Profile Transparent PNG]
            - Driver name, P1 badge
            - Current Lap Time ticking real-time with large monospace font
            - EV Powertrain & battery telemetry
            ====================================================================
          */}
          <section className="lg:col-span-4 xl:col-span-3">
            <DriverProfile
              driver={driver}
              lapTimeFormatted={lapTimeFormatted}
            />
          </section>

          {/* 
            ====================================================================
            KOLOM TENGAH (Center Column - 5 cols on xl, 4 on lg):
            Track Map & Live Position (Fokus Visual Utama)
            - Large central canvas / box
            - Placeholder [SVG: Siluet Sirkuit / Track Map] with neon glowing line
            - Dynamic marker for [Image: Top-Down Kart/Car Transparent PNG]
            - Animated movement around the track path
            ====================================================================
          */}
          <section className="lg:col-span-4 xl:col-span-5 flex flex-col">
            <TrackMap
              trackProgress={trackProgress}
              currentSpeed={speed}
            />
          </section>

          {/* 
            ====================================================================
            KOLOM KANAN (Right Column - 4 cols):
            Live Telemetry & Pit Strategy
            - Telemetry Panel:
              * Speed, Throttle (Green Neon), Brake (Red) progress bars
              * Placeholders for [SVG: Ikon Telemetri Dasar] (pedal & steering wheel)
              * Live real-time Recharts oscilloscope chart
            - Strategy Panel:
              * Pit stop recommendation UI
              * Status ban with [SVG: Ikon Kompon Ban] (red/yellow/white circles)
              * Exact required metrics: "Tire Wear: 65%" & "Optimal Pit Window: Lap 15"
              * 4-wheel tire degradation & thermal heatmap
            ====================================================================
          */}
          <section className="lg:col-span-4 xl:col-span-4 flex flex-col gap-5">
            <TelemetryPanel
              speed={speed}
              throttle={throttle}
              brake={brake}
              rpm={rpm}
              steeringAngle={steeringAngle}
              history={history}
            />

            <StrategyPanel
              strategy={strategy}
              currentLap={driver.currentLap}
            />
          </section>
        </div>
      </main>

      {/* Bottom Minimal Footer Status */}
      <footer className="mt-8 border-t border-zinc-900 bg-zinc-950/80 px-6 py-3 font-mono text-[11px] text-zinc-500 backdrop-blur-md">
        <div className="mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row max-w-[1720px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>PITSTOP PULSE TELEMETRY ENGINE v2.4 // SUPABASE REALTIME PROTOCOL READY</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>PACKET LOSS: 0.00%</span>
            <span>LATENCY: 18ms</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

