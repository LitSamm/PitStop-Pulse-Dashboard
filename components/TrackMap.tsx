"use client";

import React, { useRef, useEffect, useState } from "react";

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
    x: 216.8,
    y: 129.8,
    angle: 0,
  });

  // Authentic ITS Gokart Circuit SVG Path (Derived from aerial drone footage)
  // Features: Top Carousel Roundabout, Downhill Chute, West Paddock Sweeper,
  // 3-Tier Infield Switchback Hairpins, South Sweeper, and the Long Diagonal Backstraight.
  const trackPathData =
    "M 216.8 129.8 C 189.3 106.1, 193.6 90.9, 182.1 81.1 C 170.5 71.3, 158.2 68.3, 147.4 71.0 C 136.6 73.7, 121.4 87.5, 117.1 97.3 C 112.7 107.1, 115.6 121.7, 121.4 129.8 C 127.2 137.9, 140.2 142.6, 151.7 146.0 C 163.3 149.4, 178.1 142.0, 190.8 150.1 C 203.4 158.2, 216.8 177.4, 227.6 194.7 C 238.4 211.9, 248.9 235.2, 255.8 253.5 C 262.6 271.7, 273.5 286.3, 268.8 304.2 C 264.1 322.1, 244.9 344.8, 227.6 361.0 C 210.3 377.2, 170.9 389.0, 164.7 401.5 C 158.6 414.0, 177.7 432.0, 190.8 436.0 C 203.8 440.1, 225.8 437.7, 242.8 425.9 C 259.8 414.0, 277.1 384.6, 292.6 365.0 C 308.2 345.4, 325.1 321.8, 336.0 308.3 C 346.8 294.7, 350.1 285.3, 357.7 283.9 C 365.2 282.6, 374.3 290.0, 381.5 300.1 C 388.7 310.3, 388.7 330.6, 401.0 344.8 C 413.3 359.0, 435.3 373.5, 455.2 385.3 C 475.1 397.1, 507.6 407.3, 520.2 415.7 C 532.9 424.2, 536.5 430.3, 531.1 436.0 C 525.7 441.8, 505.8 447.8, 487.7 450.2 C 469.7 452.6, 442.6 448.9, 422.7 450.2 C 402.8 451.6, 381.1 452.2, 368.5 458.3 C 355.9 464.4, 345.0 477.9, 346.8 486.7 C 348.6 495.5, 361.3 507.0, 379.3 511.0 C 397.4 515.1, 428.1 511.7, 455.2 511.0 C 482.3 510.4, 516.6 511.0, 541.9 507.0 C 567.2 502.9, 588.9 496.9, 606.9 486.7 C 625.0 476.6, 657.5 463.1, 650.3 446.2 C 643.1 429.3, 596.1 409.0, 563.6 385.3 C 531.1 361.7, 491.3 331.2, 455.2 304.2 C 419.1 277.2, 386.6 252.1, 346.8 223.1 C 307.1 194.0, 244.2 153.4, 216.8 129.8 Z";

  // Pit Lane / Paddock Bypass Path (bypasses Turn 3 on the west)
  const pitLanePathData =
    "M 268.8 304.2 C 255.0 325.0, 235.0 350.0, 205.0 380.0 C 185.0 400.0, 160.0 425.0, 175.0 436.0 C 190.0 442.0, 210.0 435.0, 242.8 425.9";

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
    trackProgress < 0.32
      ? "SEC 1: CAROUSEL & CHUTE"
      : trackProgress < 0.68
      ? "SEC 2: INFIELD SWITCHBACKS"
      : "SEC 3: BACK STRAIGHT";

  return (
    <div className="relative flex h-full min-h-[500px] sm:min-h-[540px] flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/95 p-4 sm:p-5 backdrop-blur-md">
      {/* Carbon fiber subtle texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-zinc-800/80 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            PETA SIRKUIT & LIVE POSITION
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 font-semibold text-zinc-300">
            {currentSector}
          </span>
          <span className="hidden sm:inline text-zinc-500 font-medium">ITS CIRCUIT SURABAYA</span>
        </div>
      </div>

      {/* Main Track Map Box / Canvas Area (Visual Focus) */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-2">
        <div className="relative w-full max-w-[720px] aspect-[750/580]">
          {/* 
            ==================================================================
            [SVG: Siluet Sirkuit / Track Map] - Authentic ITS Circuit Pattern
            ==================================================================
          */}
          <svg
            viewBox="80 40 600 500"
            className="h-full w-full"
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

              {/* Linear Gradient for neon track line */}
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#00ff66" />
                <stop offset="100%" stopColor="#00f0ff" />
              </linearGradient>

              {/* Track Kerb Pattern */}
              <pattern id="kerbPattern" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="5" height="10" fill="#ef4444" />
                <rect x="5" width="5" height="10" fill="#ffffff" />
              </pattern>
            </defs>

            {/* Infield Grass / Runoff Texture Areas */}
            <circle cx="158" cy="110" r="28" fill="#042f2e" opacity="0.4" stroke="#0d9488" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="135" y="113" fill="#14b8a6" fontSize="9" fontFamily="inherit" fontWeight="bold">
              CAROUSEL
            </text>

            {/* Paddock & Pit Lane Building Footprint Graphic */}
            <g opacity="0.7">
              <rect x="135" y="360" width="28" height="42" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
              <text x="120" y="415" fill="#a1a1aa" fontSize="8" fontFamily="inherit" fontWeight="600">
                ITS PADDOCK
              </text>
            </g>

            {/* Pit Lane Service Road */}
            <path
              d={pitLanePathData}
              fill="none"
              stroke="#0f172a"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={pitLanePathData}
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />

            {/* Track Asphalt Bed / Dark Background Path */}
            <path
              d={trackPathData}
              fill="none"
              stroke="#090d16"
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

            {/* Turn Demarcations & Kerb Highlights */}
            {/* Turn 1: Carousel Hairpin */}
            <g transform="translate(117, 97)">
              <circle cx="0" cy="0" r="3" fill="#00f0ff" />
              <text x="-34" y="-6" fill="#00f0ff" fontSize="8.5" fontFamily="inherit" fontWeight="bold">
                T1 CAROUSEL
              </text>
            </g>

            {/* Turn 3: Paddock Sweeper */}
            <g transform="translate(165, 401)">
              <circle cx="0" cy="0" r="3" fill="#38bdf8" />
              <text x="-50" y="14" fill="#38bdf8" fontSize="8.5" fontFamily="inherit" fontWeight="600">
                T3 PADDOCK
              </text>
            </g>

            {/* Turn 5: Infield Hairpin */}
            <g transform="translate(358, 284)">
              <circle cx="0" cy="0" r="3.5" fill="#a855f7" />
              <text x="-26" y="-8" fill="#c084fc" fontSize="8.5" fontFamily="inherit" fontWeight="bold">
                T5 INFIELD HAIRPIN
              </text>
            </g>

            {/* Turn 6-7: Midfield Switchback */}
            <g transform="translate(531, 436)">
              <circle cx="0" cy="0" r="3" fill="#10b981" />
              <text x="8" y="4" fill="#34d399" fontSize="8.5" fontFamily="inherit" fontWeight="600">
                T6 SWITCHBACK
              </text>
            </g>

            {/* Turn 8: South Sweeper */}
            <g transform="translate(347, 487)">
              <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
              <text x="-50" y="14" fill="#fbbf24" fontSize="8.5" fontFamily="inherit" fontWeight="bold">
                T8 SOUTH LOOP
              </text>
            </g>

            {/* Turn 9: Launch into Straight */}
            <g transform="translate(650, 446)">
              <circle cx="0" cy="0" r="3" fill="#10b981" />
              <text x="-16" y="16" fill="#34d399" fontSize="8.5" fontFamily="inherit" fontWeight="600">
                T9 LAUNCH
              </text>
            </g>

            {/* Start / Finish Line Checkered Bar (on the Long Back Straight) */}
            <g transform="translate(455, 304) rotate(-33)">
              <rect x="-3" y="-12" width="6" height="24" fill="#ffffff" />
              <line x1="-3" y1="0" x2="3" y2="0" stroke="#000000" strokeWidth="2.5" />
              <text
                x="8"
                y="3"
                fill="#ffffff"
                fontSize="8.5"
                fontWeight="bold"
                fontFamily="inherit"
              >
                START / FINISH
              </text>
            </g>

            {/* Speed Trap Indicator on High-Speed Main Straight */}
            <g transform="translate(346, 223)">
              <polygon points="0,-4 4,4 -4,4" fill="#fbbf24" />
              <text x="8" y="2" fill="#fbbf24" fontSize="8" fontFamily="inherit" fontWeight="bold">
                SPEED TRAP: 148 km/h
              </text>
            </g>

            {/* DRS Acceleration Zone along Main Back Straight */}
            <g transform="translate(563, 385) rotate(-33)">
              <rect x="-30" y="-10" width="60" height="9" rx="2" fill="#065f46" stroke="#059669" strokeWidth="0.8" />
              <text x="-24" y="-3" fill="#34d399" fontSize="7.5" fontFamily="inherit" fontWeight="bold">
                DRS ZONE // ACCEL
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
              top: `${(carCoords.y / 580) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${carCoords.angle + 90}deg)`,
            }}
          >
            {/* Top-Down Gokart/F1 Graphic */}
            <div className="relative group flex items-center justify-center">
              {/* Pulsing radar target ring */}
              <div className="absolute -inset-2.5 rounded-full border border-cyan-400/80 animate-ping" />
              <div className="absolute -inset-1 rounded-full bg-cyan-400/30 shadow-[0_0_18px_rgba(0,240,255,0.95)]" />

              <svg
                width="34"
                height="46"
                viewBox="0 0 32 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 filter drop-shadow-[0_0_10px_#00f5d4]"
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
      <div className="relative z-10 mt-auto grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-zinc-800/80 text-xs">
        <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/70">
          <span className="text-[10px] text-zinc-500 uppercase block font-semibold">LIVE SPEED</span>
          <span className="text-base sm:text-lg font-black text-cyan-300 tabular-nums">
            {currentSpeed} <span className="text-xs font-semibold text-zinc-400">km/h</span>
          </span>
        </div>

        <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/70">
          <span className="text-[10px] text-zinc-500 uppercase block font-semibold">TRACK PROGRESS</span>
          <span className="text-base sm:text-lg font-black text-white tabular-nums">{Math.round(trackProgress * 100)}%</span>
        </div>

        <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/70">
          <span className="text-[10px] text-zinc-500 uppercase block font-semibold">LATERAL G-FORCE</span>
          <span className="text-base sm:text-lg font-black text-amber-400 tabular-nums">
            {trackProgress > 0.28 && trackProgress < 0.65 ? "2.7G (APEX)" : "0.6G"}
          </span>
        </div>

        <div className="rounded-lg bg-zinc-950/70 p-2.5 border border-zinc-800/70">
          <span className="text-[10px] text-zinc-500 uppercase block font-semibold">DRS STATUS</span>
          <span className="text-base sm:text-lg font-black text-emerald-400">
            {trackProgress > 0.72 && trackProgress < 0.98 ? "ENABLED" : "STANDBY"}
          </span>
        </div>
      </div>
    </div>
  );
}
