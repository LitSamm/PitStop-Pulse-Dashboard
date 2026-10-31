"use client";

import React from "react";
import Header from "@/components/Header";
import DriverProfile from "@/components/DriverProfile";
import TrackMap from "@/components/TrackMap";
import TelemetryPanel from "@/components/TelemetryPanel";
import StrategyPanel from "@/components/StrategyPanel";
import { useTelemetry } from "@/hooks/useTelemetry";

export default function PitStopPulseDashboard() {
  // Use real-time simulation telemetry hook (200ms update rate)
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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-zinc-100 selection:bg-cyan-400 selection:text-black">
      {/* 
        ========================================================================
        1. Desain Tema & Latar Belakang (Asset Placement)
        Global Background: Warna dasar hitam pekat (bg-black).
        Lapisan paling bawah (z-0) dengan efek blur tebal (backdrop-blur-xl)
        menampilkan [Image: Blurred Pit Garage / Ambient Track WebP].
        ========================================================================
      */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ambient-track.webp"
          alt="Ambient Pit Garage Background"
          className="h-full w-full object-cover opacity-15 filter blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/90 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Dark Minimalist Navigation Header with Anargya Brandmark */}
      <Header />

      {/* 
        ========================================================================
        2. Tata Letak Halaman (Grid Layout 3 Kolom)
        - Kolom Kiri: Driver Profile & Lap Info
        - Kolom Tengah: Track Map & Live Position (Fokus Visual Utama)
        - Kolom Kanan: Live Telemetry & Pit Strategy
        ========================================================================
      */}
      <main className="relative z-10 mx-auto max-w-[1720px] px-3 py-4 sm:px-5 sm:py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* 
            KOLOM KIRI (Left Column - 3 cols on xl, 4 on lg):
            Driver Profile & Lap Info
            - Avatar with [Image: Driver Helmet/Profile Transparent PNG]
            - Nama pembalap, posisi P1, dan Lap Time ticking real-time monospace
            - EV Powertrain & battery telemetry
          */}
          <section
            className="flex flex-col gap-4 lg:col-span-4 xl:col-span-3"
            aria-label="Profil Pembalap dan Status Kendaraan"
          >
            <DriverProfile
              driver={driver}
              lapTimeFormatted={lapTimeFormatted}
            />
          </section>

          {/* 
            KOLOM TENGAH (Center Column - 5 cols on xl, 8 on lg):
            Track Map & Live Position (Fokus Visual Utama)
            - [SVG: Siluet Sirkuit / Track Map] pola sirkuit ITS Surabaya dengan garis neon
            - Dynamic kart marker [Image: Top-Down Kart/Car Transparent PNG]
            - Sektor, Speed Trap, DRS Zone, dan HUD Telemetry Bar
          */}
          <section
            className="flex flex-col lg:col-span-8 xl:col-span-5"
            aria-label="Peta Sirkuit dan Posisi Langsung"
          >
            <TrackMap
              trackProgress={trackProgress}
              currentSpeed={speed}
            />
          </section>

          {/* 
            KOLOM KANAN (Right Column - 4 cols on xl, 12 on lg):
            Live Telemetry & Pit Strategy
            - Telemetry Panel: Speed, Throttle (Green Neon), Brake (Red)
            - Real-time oscilloscope chart (Recharts)
            - Strategy Panel: Rekomendasi pit stop, Tire Wear 65%, Optimal Pit Window: Lap 15,
              kompon ban ([SVG: Ikon Kompon Ban]), dan 4-wheel heatmap.
          */}
          <section
            className="flex flex-col gap-5 lg:col-span-12 xl:col-span-4"
            aria-label="Telemetri Langsung dan Strategi Pit"
          >
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

      {/* Clean Dark Motorsports Footer */}
      <footer className="relative z-10 mt-8 border-t border-zinc-800/80 bg-black/90 px-4 py-4 text-xs text-zinc-400 font-medium sm:px-6">
        <div className="mx-auto flex max-w-[1720px] flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/anargya-helix.webp"
              alt="Anargya Helix Mark"
              className="h-3.5 w-auto object-contain opacity-75"
            />
            <span className="font-semibold text-zinc-300">ANARGYA ITS FORMULA EV TEAM</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">SURABAYA, INDONESIA</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400 font-semibold tracking-wide">PITSTOP PULSE TELEMETRY // REAL-TIME SYSTEM READY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
