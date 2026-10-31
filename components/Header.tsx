"use client";

import React from "react";

export default function Header() {
  return (
    <header className="relative z-20 w-full border-b border-zinc-800 bg-black/85 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-w-[1720px]">
        {/* Brand with Uploaded Anargya Logo */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.anargyaits.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/anargya-logo-full.webp"
              alt="Anargya ITS Formula EV Team Logo"
              className="h-7 sm:h-8 w-auto object-contain brightness-105"
            />
          </a>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
              PITSTOP PULSE
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">v2.4</span>
          </div>
        </div>

        {/* Minimalist Data Status (Clean Motorsport Sans Typography) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* Live Stream Status Pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-emerald-400 font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE TELEMETRY
          </div>

          {/* Circuit Info */}
          <div className="rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-zinc-300">
            <span className="text-zinc-500 font-normal">TRACK:</span>{" "}
            <span className="font-semibold text-white">ITS CIRCUIT SURABAYA</span>
          </div>

          {/* Track Condition */}
          <div className="rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-zinc-300 hidden sm:block">
            <span className="text-zinc-500 font-normal">COND:</span>{" "}
            <span className="text-emerald-400 font-semibold">DRY</span>{" "}
            <span className="text-zinc-600">/</span>{" "}
            <span className="text-zinc-400">38.5°C</span>
          </div>

          {/* Realtime Sync */}
          <div className="rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-zinc-300 hidden lg:block">
            <span className="text-zinc-500 font-normal">SYNC:</span>{" "}
            <span className="text-cyan-400 font-semibold">ONLINE</span>{" "}
            <span className="text-[11px] text-zinc-500 tabular-nums">22ms</span>
          </div>
        </div>
      </div>
    </header>
  );
}
