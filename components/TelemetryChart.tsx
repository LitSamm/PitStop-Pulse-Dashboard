"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TelemetryPoint } from "@/types/telemetry";

interface TelemetryChartProps {
  data: TelemetryPoint[];
}

export default function TelemetryChart({ data }: TelemetryChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-36 w-full items-center justify-center rounded-lg bg-zinc-950/60 text-xs text-zinc-500 font-medium">
        INITIALIZING TELEMETRY STREAM...
      </div>
    );
  }

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -24, bottom: 0 }}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="time"
            stroke="#71717a"
            fontSize={9}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis stroke="#71717a" fontSize={9} tickLine={false} domain={[0, 150]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#09090b",
              borderColor: "#27272a",
              borderRadius: "8px",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
            labelStyle={{ color: "#a1a1aa" }}
          />
          {/* Speed Line (Cyan) */}
          <Line
            type="monotone"
            dataKey="speed"
            name="Speed (km/h)"
            stroke="#00f0ff"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          {/* Throttle Line (Neon Green) */}
          <Line
            type="monotone"
            dataKey="throttle"
            name="Throttle (%)"
            stroke="#00ff66"
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={false}
          />
          {/* Brake Line (Neon Red) */}
          <Line
            type="monotone"
            dataKey="brake"
            name="Brake (%)"
            stroke="#ff2a55"
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

