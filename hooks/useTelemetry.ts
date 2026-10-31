"use client";

import { useState, useEffect, useRef } from "react";
import { DriverState, PitStrategyState, TelemetryPoint } from "@/types/telemetry";

const INITIAL_DRIVER_STATE: DriverState = {
  id: "DRV-01",
  name: "ALEXANDER RIVERA",
  number: "01",
  team: "PULSE RACING EV WORKS",
  position: "P1",
  gapToLeader: "LEADER",
  interval: "+1.842s (vs P2)",
  currentLap: 12,
  totalLaps: 25,
  lastLapTime: "01:14.102",
  bestLapTime: "01:13.684",
  batterySoc: 78,
  batteryTemp: 41.5,
  motorPowerKw: 84.6,
};

const INITIAL_STRATEGY_STATE: PitStrategyState = {
  currentCompound: "MEDIUM",
  tireLapsOld: 12,
  overallTireWear: 65,
  optimalPitWindow: "Lap 15",
  pitRecommendation: "BOX IN 3 LAPS (LAP 15)",
  recommendedCompound: "SOFT",
  estimatedPitLoss: 18.2,
  tires: {
    fl: { wear: 68, temp: 92, pressure: 21.4 },
    fr: { wear: 64, temp: 94, pressure: 21.6 },
    rl: { wear: 70, temp: 98, pressure: 20.8 },
    rr: { wear: 66, temp: 96, pressure: 21.0 },
  },
};

export function useTelemetry(pollingIntervalMs: number = 200) {
  // Live instantaneous values
  const [speed, setSpeed] = useState<number>(118);
  const [throttle, setThrottle] = useState<number>(85);
  const [brake, setBrake] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(8900);
  const [steeringAngle, setSteeringAngle] = useState<number>(4);
  const [trackProgress, setTrackProgress] = useState<number>(0.28); // 0 to 1 around circuit

  // History buffer for the live telemetry chart
  const [history, setHistory] = useState<TelemetryPoint[]>(() => {
    const initial: TelemetryPoint[] = [];
    const now = Date.now();
    for (let i = 24; i >= 0; i--) {
      const t = new Date(now - i * 1000);
      initial.push({
        time: t.toTimeString().split(" ")[0].slice(3),
        speed: 100 + Math.sin(i * 0.4) * 35,
        throttle: 70 + Math.sin(i * 0.5) * 25,
        brake: i % 6 === 0 ? 60 : 0,
        rpm: 8000 + Math.sin(i * 0.4) * 3000,
        gear: 4,
      });
    }
    return initial;
  });

  // High precision ticking lap timer
  const [lapElapsedMs, setLapElapsedMs] = useState<number>(44382);
  const [driver, setDriver] = useState<DriverState>(INITIAL_DRIVER_STATE);
  const [strategy, setStrategy] = useState<PitStrategyState>(INITIAL_STRATEGY_STATE);

  // Simulation physics state
  const physicsRef = useRef({
    speed: 118,
    throttle: 85,
    brake: 0,
    progress: 0.28,
    cornering: false,
    lapStart: Date.now() - 44382,
  });

  // Real-time ticking clock for lap timer (every ~33ms for smooth 30fps readout)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - physicsRef.current.lapStart) % 74000; // Lap cycle ~74s
      setLapElapsedMs(elapsed);
    }, 33);

    return () => clearInterval(timerInterval);
  }, []);

  // Real-time telemetry simulation (interval 100ms - 500ms as requested)
  useEffect(() => {
    /* 
      ========================================================================
      NOTE FOR SUPABASE / EXTERNAL API INTEGRATION:
      To switch from this mock generator to Supabase Realtime:
      
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const channel = supabase
        .channel('telemetry_live')
        .on('broadcast', { event: 'telemetry_update' }, (payload) => {
          const { speed, throttle, brake, rpm, trackProgress } = payload;
          setSpeed(speed);
          setThrottle(throttle);
          setBrake(brake);
          // update history...
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
      ========================================================================
    */

    const telemetryInterval = setInterval(() => {
      const p = physicsRef.current;

      // Realistic driving dynamics cycle: straights -> heavy braking -> cornering -> exit throttle
      p.progress = (p.progress + 0.006) % 1; // loop around circuit

      // Identify track section based on progress
      const isBrakingZone =
        (p.progress > 0.22 && p.progress < 0.26) ||
        (p.progress > 0.58 && p.progress < 0.63) ||
        (p.progress > 0.88 && p.progress < 0.92);

      const isCornerApex =
        (p.progress >= 0.26 && p.progress < 0.35) ||
        (p.progress >= 0.63 && p.progress < 0.72) ||
        (p.progress >= 0.92 && p.progress < 0.98);

      let nextThrottle = 0;
      let nextBrake = 0;
      let targetSpeed = 125;

      if (isBrakingZone) {
        nextBrake = Math.min(100, Math.floor(75 + Math.random() * 25));
        nextThrottle = 0;
        targetSpeed = 48 + Math.random() * 10;
        p.speed = Math.max(targetSpeed, p.speed - 12);
      } else if (isCornerApex) {
        nextBrake = 0;
        nextThrottle = Math.floor(35 + Math.random() * 25);
        targetSpeed = 65 + Math.random() * 15;
        p.speed = p.speed * 0.95 + targetSpeed * 0.05;
      } else {
        // High speed straight / acceleration
        nextBrake = 0;
        nextThrottle = Math.min(100, Math.floor(90 + Math.random() * 10));
        targetSpeed = 142 + Math.random() * 8;
        p.speed = Math.min(150, p.speed + 4.5);
      }

      p.throttle = nextThrottle;
      p.brake = nextBrake;

      const roundedSpeed = Math.round(p.speed);
      const computedRpm = Math.round(3500 + (p.speed / 150) * 8200 + (Math.random() * 300 - 150));
      const steer = isCornerApex ? (Math.random() > 0.5 ? 28 : -26) : Math.round((Math.random() - 0.5) * 6);

      setSpeed(roundedSpeed);
      setThrottle(nextThrottle);
      setBrake(nextBrake);
      setRpm(computedRpm);
      setSteeringAngle(steer);
      setTrackProgress(p.progress);

      // Append to history for real-time Recharts visualization
      setHistory((prev) => {
        const now = new Date();
        const timeStr = `${now.getMinutes().toString().padStart(2, "0")}:${now
          .getSeconds()
          .toString()
          .padStart(2, "0")}.${Math.floor(now.getMilliseconds() / 100)}`;

        const newPoint: TelemetryPoint = {
          time: timeStr,
          speed: roundedSpeed,
          throttle: nextThrottle,
          brake: nextBrake,
          rpm: computedRpm,
          gear: roundedSpeed > 110 ? 5 : roundedSpeed > 80 ? 4 : roundedSpeed > 50 ? 3 : 2,
        };

        const sliceStart = prev.length >= 25 ? prev.length - 24 : 0;
        return [...prev.slice(sliceStart), newPoint];
      });

      // Slowly modulate battery and tire wear
      setDriver((d) => ({
        ...d,
        batterySoc: Math.max(12, +(d.batterySoc - 0.002).toFixed(2)),
        batteryTemp: +(41.5 + (roundedSpeed / 150) * 2.5 + Math.random() * 0.4).toFixed(1),
        motorPowerKw: +(nextThrottle > 0 ? (nextThrottle / 100) * 98.4 : 0).toFixed(1),
      }));

      setStrategy((s) => ({
        ...s,
        overallTireWear: 65, // User requested exact metric: "Tire Wear: 65%"
        optimalPitWindow: "Lap 15", // User requested exact metric: "Optimal Pit Window: Lap 15"
      }));
    }, pollingIntervalMs);

    return () => clearInterval(telemetryInterval);
  }, [pollingIntervalMs]);

  // Format millisecond timer into mm:ss.ms string
  const formatLapTime = (ms: number): string => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor(ms % 1000);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(3, "0")}`;
  };

  return {
    speed,
    throttle,
    brake,
    rpm,
    steeringAngle,
    trackProgress,
    history,
    lapTimeFormatted: formatLapTime(lapElapsedMs),
    driver,
    strategy,
  };
}

