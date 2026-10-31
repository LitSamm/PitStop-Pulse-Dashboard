# PitStop Pulse: Live Telemetry & Strategy Dashboard

Sebuah antarmuka web dashboard satu halaman (*single-page telemetry dashboard*) berkecepatan tinggi bertema balap modern (*Dark Mode high-tech motorsport HUD*) untuk simulasi performa gokart listrik/F1 secara real-time.

Dibangun dengan **Next.js (App Router)**, **Tailwind CSS**, **Recharts**, dan **Lucide Icons**, dirancang modular agar mudah dihubungkan dengan backend **Supabase** atau external telemetry websocket/API.

---

## 🏎️ Struktur Modular & Komponen

```
├── app/
│   ├── globals.css              # Global dark mode, scrollbar, glow utility & styles
│   ├── layout.tsx               # Next.js Root Layout & metadata
│   └── page.tsx                 # Halaman utama (Grid 3-Kolom & Ambient Garage Background)
├── components/
│   ├── Header.tsx               # Status bar, sync indicator, weather & track info
│   ├── DriverProfile.tsx        # Kolom Kiri: Avatar, nama, P1, ticking lap timer, EV SoC
│   ├── TrackMap.tsx             # Kolom Tengah: Siluet sirkuit neon, animasi live kart marker
│   ├── TelemetryPanel.tsx       # Kolom Kanan: Progress bar Speed, Throttle, Brake & Oscilloscope
│   ├── TelemetryChart.tsx       # Real-time Recharts line chart (Speed, Throttle, Brake)
│   ├── StrategyPanel.tsx        # Kolom Kanan: Rekomendasi Pit, status ban, wear 65%, optimal lap 15
│   └── CarbonFiberTexture.tsx   # Tekstur hardware serat karbon procedural & image slot
├── hooks/
│   └── useTelemetry.ts          # State simulation (100-500ms) & Supabase realtime hook template
├── types/
│   └── telemetry.ts             # TypeScript definitions untuk telemetri & strategi ban
└── package.json
```

---

## 🎨 Penempatan Asset (Asset Placement Guide)

Setiap placeholder aset visual telah disiapkan dengan tanda komentar yang jelas di dalam kode komponen:

1. **Ambient Pit Garage Background**
   - **File**: `app/page.tsx`
   - **Slot**: `[Image: Blurred Pit Garage WebP/JPG]` pada div layar penuh ber-`backdrop-blur-xl` di layer terbawah (`-z-10`).
   - Tersedia fallback pencahayaan ambient motorsport neon cyan & amber.

2. **Seamless Carbon Fiber Texture**
   - **File**: `components/CarbonFiberTexture.tsx`
   - **Slot**: `[Image: Seamless Carbon Fiber Texture JPG]` dengan opacity 5-10%.
   - Dilengkapi fallback procedural CSS weave pattern sehingga langsung tampak bertekstur hardware balap.

3. **Driver Helmet / Profile Image**
   - **File**: `components/DriverProfile.tsx`
   - **Slot**: `[Image: Driver Helmet/Profile Transparent PNG]` di dalam lingkaran avatar `group`.
   - Tersedia fallback vector SVG helm balap futuristik dengan visor glow.

4. **Siluet Sirkuit & Top-Down Kart Marker**
   - **File**: `components/TrackMap.tsx`
   - **Slot 1**: `[SVG: Siluet Sirkuit / Track Map]` dengan garis neon glow filter (cyan/emerald).
   - **Slot 2**: `[Image: Top-Down Kart/Car Transparent PNG]` pada marker dinamis yang bergerak mengelilingi path sirkuit.

5. **Ikon Telemetri Dasar (Pedal & Setir)**
   - **File**: `components/TelemetryPanel.tsx`
   - **Slot**: `[SVG: Ikon Telemetri Dasar]` di samping label Speed (steering wheel), Throttle (pedal gas), dan Brake (pedal rem).

6. **Ikon Kompon Ban (Pirelli / F1 Circles)**
   - **File**: `components/StrategyPanel.tsx`
   - **Slot**: `[SVG: Ikon Kompon Ban]` lingkaran border merah (`Soft - S`), kuning (`Medium - M`), putih (`Hard - H`), hijau (`Inter - I`), biru (`Wet - W`).

---

## ⚡ Menjalankan Proyek

```bash
# 1. Jalankan development server
npm run dev

# 2. Buka di browser
http://localhost:3000

# 3. Production build (sudah teruji sukses)
npm run build
npm run start
```

---

## 🔌 Menghubungkan ke Supabase Realtime

Di dalam file `hooks/useTelemetry.ts`, Anda dapat mengganti simulator `setInterval` dengan Supabase Realtime Channel:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

useEffect(() => {
  const channel = supabase
    .channel("telemetry_live")
    .on("broadcast", { event: "telemetry_update" }, ({ payload }) => {
      setSpeed(payload.speed);
      setThrottle(payload.throttle);
      setBrake(payload.brake);
      setRpm(payload.rpm);
      setTrackProgress(payload.trackProgress);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

