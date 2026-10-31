"use client";

import React from "react";

interface CarbonFiberTextureProps {
  className?: string;
  opacity?: number; // 0.05 - 0.10
  imageUrl?: string; // Optional user image path: e.g. "/textures/carbon-fiber.jpg"
}

/**
 * CarbonFiberTexture
 * Provides the hardware racing texture required for cards.
 * Includes a CSS carbon-fiber weave pattern fallback and a dedicated slot for
 * [Image: Seamless Carbon Fiber Texture JPG] with 5-10% opacity.
 */
export default function CarbonFiberTexture({
  className = "",
  opacity = 0.08,
  imageUrl,
}: CarbonFiberTextureProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* 
        [Image: Seamless Carbon Fiber Texture JPG] 
        Replace the background-image below with your texture asset or <img> tag:
        e.g., <img src="/images/carbon-fiber.jpg" className="w-full h-full object-cover" />
      */}
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="Carbon Fiber Texture"
          className="h-full w-full object-cover"
        />
      ) : (
        /* Realistic CSS procedural carbon fiber weave fallback */
        <div
          className="h-full w-full"
          style={{
            backgroundColor: "#121214",
            backgroundImage: `
              radial-gradient(black 15%, transparent 16%),
              radial-gradient(black 15%, transparent 16%),
              linear-gradient(45deg, transparent 48%, #1f1f23 49%, #1f1f23 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, #1f1f23 49%, #1f1f23 51%, transparent 52%)
            `,
            backgroundSize: "6px 6px, 6px 6px, 12px 12px, 12px 12px",
            backgroundPosition: "0 0, 3px 3px, 0 0, 0 0",
          }}
        />
      )}
    </div>
  );
}

