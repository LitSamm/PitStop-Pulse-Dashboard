"use client";

import React, { useRef, useEffect, useState } from "react";
import { Compass, Navigation2, Zap, MapPin } from "lucide-react";
import CarbonFiberTexture from "./CarbonFiberTexture";

interface TrackMapProps {
  trackProgress: number; // 0 to 1
  currentSpeed: number;
}

export default function TrackMap({
  trackProgress,
  currentSpeed,
}: TrackMapProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [carCoords, setCarCoords] = useState<{ x: number; y: number; angle: number }>({
    x: 180,
    y: 430,
    angle: 0,
  });

  // Circuit SVG path definition (Silverstone-inspired modern GP circuit)
  const trackPathData =
    "M 180 430 C 220 430, 310 430, 420 430 C 470 430, 520 410, 540 370 C 560 330, 530 290, 480 280 C 430 270, 390 280, 360 250 C 330 220, 330 180, 380 150 C 430 120, 540 130, 580 160 C 620 190, 670 170, 680 120 C 690 70, 640 50, 560 50 C 480 50, 410 70, 340 70 C 270 70, 220 90, 180 130 C 140 170, 120 220, 100 270 C 80 320, 80 370, 120 410 C 140 430, 160 430, 180 430 Z";

  // Calculate dynamic car position and orientation along SVG track path
  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const path = pathRef.current;
      const totalLength = path.getTotalLength();
      const currentDist = (trackProgress % 1) * totalLength;

      // Current coordinate
      const pt = path.getPointAtLength(currentDist);

      // Ahead coordinate to calculate heading angle
      const aheadDist = (currentDist + 2) % totalLength;
      const ptAhead = path.getPointAtLength(aheadDist);

      const dx = ptAhead.x - pt.x;
      const dy = ptAhead.y - pt.y;
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      setCarCoords({
        x: pt.x,
        y: pt.y,
        angle: angleDeg,
      });
    } catch {
      // fallback in case of SSR or rendering delay
    }
  }, [trackProgress]);

  // Current sector determination
  const currentSector =
    trackProgress < 0.33 ? "SECTOR 1" : trackProgress < 0.66 ? "SECTOR 2" : "SECTOR 3";

  return (
    <div className="relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md">
      {/* Carbon Fiber Hardware Texture */}
      <CarbonFiberTexture opacity={0.07} />

      {/* High-Tech Tactical Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header Info Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-zinc-800/80 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-cyan-400" />
          <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
            CIRCUIT OVERVIEW & LIVE POSITION
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="rounded bg-cyan-950/70 px-2 py-0.5 text-[11px] font-bold text-cyan-400 border border-cyan-800/60">
            {currentSector}
          </span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">SILVERSTONE GP // 5.891 KM</span>
        </div>
      </div>

      {/* Main Track Map Box / Canvas Area (Visual Focus) */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-4">
        {/* Radar concentric target circles in background */}
        <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-cyan-500/10" />
        <div className="pointer-events-none absolute h-96 w-96 rounded-full border border-zinc-800/40" />

        <div className="relative w-full max-w-[680px] aspect-[750/480]">
          {/* 
            ==================================================================
            [SVG: Siluet Sirkuit / Track Map] with Neon Line
            ==================================================================
          */}
          <svg
            viewBox="50 30 670 430"
            className="h-full w-full filter drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <defs>
              {/* Neon Glow Filter */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Linear Gradient for track line */}
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="40%" stopColor="#00ff88" />
                <stop offset="70%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Track Kerb Pattern */}
              <pattern id="kerbPattern" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="5" height="10" fill="#ef4444" />
                <rect x="5" width="5" height="10" fill="#ffffff" />
              </pattern>
            </defs>

            {/* Track Asphalt Bed / Dark Background Path */}
            <path
              d={trackPathData}
              fill="none"
              stroke="#0f172a"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner track border */}
            <path
              d={trackPathData}
              fill="none"
              stroke="#1e293b"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Neon Racing Circuit Centerline [SVG: Siluet Sirkuit] */}
            <path
              ref={pathRef}
              d={trackPathData}
              fill="none"
              stroke="url(#trackGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonGlow)"
            />

            {/* Start / Finish Line Checkered Bar */}
            <g transform="translate(180, 415)">
              <rect x="-3" y="0" width="6" height="30" fill="#ffffff" />
              <line x1="-3" y1="15" x2="3" y2="15" stroke="#000000" strokeWidth="3" />
              <text
                x="-12"
                y="-6"
                fill="#ffffff"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                START / FINISH
              </text>
            </g>

            {/* Track Sector Demarcations */}
            {/* Sector 1 End */}
            <g transform="translate(480, 280)">
              <circle cx="0" cy="0" r="4" fill="#a855f7" />
              <text x="8" y="4" fill="#a855f7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                SEC 1 (23.4s)
              </text>
            </g>

            {/* Sector 2 End */}
            <g transform="translate(560, 50)">
              <circle cx="0" cy="0" r="4" fill="#10b981" />
              <text x="8" y="-4" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                SEC 2 (27.8s)
              </text>
            </g>

            {/* Speed Trap Indicator */}
            <g transform="translate(420, 430)">
              <polygon points="0,-4 4,4 -4,4" fill="#fbbf24" />
              <text x="-20" y="24" fill="#fbbf24" fontSize="8" fontFamily="monospace">
                SPEED TRAP: 148 km/h
              </text>
            </g>

            {/* DRS Zone 1 */}
            <g transform="translate(250, 420)">
              <rect x="0" y="-12" width="60" height="12" rx="2" fill="#065f46" stroke="#059669" strokeWidth="0.8" />
              <text x="12" y="-3" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">
                DRS ZONE
              </text>
            </g>
          </svg>

          {/* 
            ==================================================================
            Dynamic Dot / Marker for [Image: Top-Down Kart/Car Transparent PNG]
            Positioned dynamically using trackProgress and SVG path coordinates
            ==================================================================
          */}
          <div
            className="absolute z-20 pointer-events-none transition-transform duration-100 ease-linear"
            style={{
              left: `${(carCoords.x / 750) * 100}%`,
              top: `${(carCoords.y / 480) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${carCoords.angle + 90}deg)`,
            }}
          >
            {/* 
              ============================================================
              [Image: Top-Down Kart/Car Transparent PNG]
              Insert your transparent top-down car/kart PNG here:
              e.g.:
              <img 
                src="/images/top-down-kart.png" 
                alt="Kart" 
                className="h-10 w-10 object-contain drop-shadow-[0_0_12px_#00f0ff]" 
              />
              ============================================================
            */}
            <div className="relative group flex items-center justify-center">
              {/* Pulsing radar target ring */}
              <div className="absolute -inset-2 rounded-full border border-cyan-400/80 animate-ping" />
              <div className="absolute -inset-1 rounded-full bg-cyan-400/20 shadow-[0_0_15px_rgba(0,240,255,0.9)]" />

              {/* High-tech Top-Down Gokart/F1 SVG Graphic Placeholder */}
              <svg
                width="32"
                height="44"
                viewBox="0 0 32 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 filter drop-shadow-[0_0_8px_#00f5d4]"
              >
                {/* Front wing */}
                <rect x="2" y="2" width="28" height="4" rx="2" fill="#06b6d4" />
                {/* Nosecone */}
                <path d="M12 6L14 18H18L20 6H12Z" fill="#38bdf8" />
                {/* Cockpit / Driver Helmet Top View */}
                <circle cx="16" cy="22" r="3.5" fill="#f59e0b" stroke="#000000" strokeWidth="1" />
                {/* Sidepods & Electric Battery Chassis */}
                <rect x="5" y="16" width="6" height="16" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                <rect x="21" y="16" width="6" height="16" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                {/* Rear Wing */}
                <rect x="1" y="38" width="30" height="4" rx="1.5" fill="#0284c7" />
                {/* Wheels (FL, FR, RL, RR) */}
                <rect x="0" y="5" width="4" height="8" rx="1.5" fill="#18181b" stroke="#38bdf8" strokeWidth="0.5" />
                <rect x="28" y="5" width="4" height="8" rx="1.5" fill="#18181b" stroke="#38bdf8" strokeWidth="0.5" />
                <rect x="0" y="30" width="4.5" height="9" rx="1.5" fill="#18181b" stroke="#38bdf8" strokeWidth="0.5" />
                <rect x="27.5" y="30" width="4.5" height="9" rx="1.5" fill="#18181b" stroke="#38bdf8" strokeWidth="0.5" />
                {/* Rain light */}
                <circle cx="16" cy="40" r="1.5" fill="#ef4444" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Track HUD Telemetry Bar */}
      <div className="relative z-10 mt-auto grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-zinc-800/80 font-mono text-xs">
        <div className="rounded-lg bg-zinc-950/60 p-2 border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 uppercase block">LIVE SPEED</span>
          <span className="text-lg font-black text-cyan-300">{currentSpeed} <span className="text-xs font-normal text-zinc-400">km/h</span></span>
        </div>

        <div className="rounded-lg bg-zinc-950/60 p-2 border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 uppercase block">TRACK PROGRESS</span>
          <span className="text-lg font-black text-white">{Math.round(trackProgress * 100)}%</span>
        </div>

        <div className="rounded-lg bg-zinc-950/60 p-2 border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 uppercase block">LATERAL G-FORCE</span>
          <span className="text-lg font-black text-amber-400">
            {trackProgress > 0.25 && trackProgress < 0.35 ? "2.6G" : "0.8G"}
          </span>
        </div>

        <div className="rounded-lg bg-zinc-950/60 p-2 border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 uppercase block">DRS STATUS</span>
          <span className="text-lg font-black text-emerald-400">
            {trackProgress > 0.35 && trackProgress < 0.55 ? "ENABLED" : "STANDBY"}
          </span>
        </div>
      </div>
    </div>
  );
}

