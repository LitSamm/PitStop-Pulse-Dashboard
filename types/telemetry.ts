export type TireCompound = "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET";

export interface TireData {
  wear: number; // 0 - 100%
  temp: number; // in Celsius
  pressure: number; // in PSI
}

export interface TelemetryPoint {
  time: string;
  speed: number;    // 0 - 150 km/h
  throttle: number; // 0 - 100%
  brake: number;    // 0 - 100%
  rpm: number;      // 0 - 12000 RPM
  gear: number;     // 1 - 6 or D/R for EV
}

export interface LapSector {
  sector: 1 | 2 | 3;
  time: string;
  status: "fastest" | "personal-best" | "normal";
}

export interface DriverState {
  id: string;
  name: string;
  number: string;
  team: string;
  position: string;
  gapToLeader: string;
  interval: string;
  currentLap: number;
  totalLaps: number;
  lastLapTime: string;
  bestLapTime: string;
  batterySoc: number; // State of Charge %
  batteryTemp: number; // in Celsius
  motorPowerKw: number; // kW output
}

export interface PitStrategyState {
  currentCompound: TireCompound;
  tireLapsOld: number;
  overallTireWear: number; // e.g. 65%
  optimalPitWindow: string; // e.g. "Lap 15 - 17"
  pitRecommendation: string; // "BOX THIS LAP" or "STAY OUT"
  recommendedCompound: TireCompound;
  estimatedPitLoss: number; // in seconds, e.g. 18.5s
  tires: {
    fl: TireData;
    fr: TireData;
    rl: TireData;
    rr: TireData;
  };
}

