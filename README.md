# PitStop Pulse: Live Telemetry & Strategy Dashboard
### Anargya ITS Formula EV Team — Surabaya, Indonesia

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

**PitStop Pulse** adalah antarmuka web satu halaman (*single-page live telemetry workstation*) berkinerja tinggi yang dirancang untuk memantau performa balap gokart listrik / Formula Student EV (*Electric Vehicle*) dari **Anargya ITS Formula EV Team** secara *real-time*.

Aplikasi ini menyajikan visualisasi data telemetri komprehensif mulai dari pemetaan lintasan sirkuit dinamis, simulasi posisi mobil, status sistem tenaga EV, hingga algoritma rekomendasi strategi *pit stop* dengan estetika *dark mode* berteknologi tinggi khas paddock balap profesional.

---

## Fitur Utama (Key Features)

### 1. Tata Letak 3-Kolom Modern (Cockpit Layout)
- **Kolom Kiri — Profil Pembalap & Lap Info**:
  - Avatar pembalap dengan helm balap transparan dan badge posisi langsung (`P1`, start dari P3).
  - Tampilan waktu lap (*Live Ticking Lap Timer*) dengan format presisi hingga milidetik (`01:14.382`).
  - Analisis delta benchmark lap (*Best Lap Purple*, *Last Lap Delta*, dan *Sector Time Status* SEC 1-3).
  - Sistem tenaga EV (*Battery SoC progress bar*, cooling loop camera, suhu baterai 42°C, dan output motor kW).
- **Kolom Tengah — Peta Sirkuit ITS Surabaya (Fokus Visual Utama)**:
  - Siluet sirkuit berbasis data aerial drone Sirkuit Gokart ITS Surabaya.
  - Garis lintasan beriluminasi neon cyan–emerald (`#00f0ff` ke `#00ff66`) dengan filter glow dinamis.
  - Penanda mobil (*Top-Down Kart Marker*) dengan radar target animasi yang melacak lintasan secara presisi.
  - Titik referensi belokan (*T1 Carousel*, *T3 Paddock*, *T5 Infield*, *T8 South Loop*, *DRS Zone*, dan *Speed Trap* 148 km/h).
  - Track HUD telemetry bar (kecepatan langsung, progress lap, lateral G-Force, status DRS).
- **Kolom Kanan — Live Telemetry Gauges & Pit Strategy**:
  - Tiga indikator progress bar horizontal berfrekuensi 10Hz untuk Kecepatan (`SPEED [KM/H]`), Gas (`THROTTLE [GAS]`), dan Rem (`BRAKE [REM]`).
  - Oscilloskop telemetri langsung (*Real-Time Oscilloscope*) berbasis Recharts.
  - Monitor putaran motor (*Motor RPM*) dan sudut kemudi (*Steering Angle*) dengan onboard cockpit camera feed.
  - Antarmuka rekomendasi strategi *pit stop* kru radio (Target Undercut Delta +2.4s).
  - Kompon ban F1/Pirelli (*Soft*, *Medium*, *Hard*) dengan metrik spesifik:
    - **`Tire Wear: 65%`**
    - **`Optimal Pit Window: Lap 15`**
  - Diagram *thermal heatmap* 4 roda (FL, FR, RL, RR) dengan temperatur real-time dan tekanan PSI.

### 2. Tipografi Humanis & Non-Robotik
- Menggunakan tipografi modern **Plus Jakarta Sans** untuk antarmuka yang proporsional, tajam, dan elegan.
- Menghilangkan kesan kaku (*typewriter/terminal hacker*) dan hanya menggunakan monospaced `tabular-nums` khusus pada digit stopwatch berkecepatan tinggi agar tidak terjadi pergeseran tata letak (*zero jitter / no layout shift*).

### 3. Tekstur & Hardware Styling
- Latar belakang global hitam pekat (`bg-black`) dengan footage ambient sirkuit/garage berefek blur tebal (`blur-3xl`, opacity 15%).
- Kartu metrik `bg-zinc-900/95` dengan border tipis transparan dan overlay mikro serat karbon (*Carbon Fiber Texture*).
- Brandmark resmi **Anargya ITS Formula EV Team** pada navbar dan lambang helix pada footer.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Visualisasi Grafik**: [Recharts](https://recharts.org/) (Client-side dynamic render)
- **Desain & Aset**: Brandmark Anargya ITS, aset footage tim, SVG sirkuit kustom, CSS gradient/filter glow.

---

## Struktur Proyek

```
├── app/
│   ├── globals.css              # Dark theme, motorsport scrollbar, glowing filters
│   ├── layout.tsx               # Root layout & metadata
│   └── page.tsx                 # Dashboard utama (3-column layout)
├── components/
│   ├── Header.tsx               # Anargya ITS navbar brand & telemetry status
│   ├── DriverProfile.tsx        # Profil driver, lap stopwatch, EV powertrain status
│   ├── TrackMap.tsx             # Peta sirkuit ITS Surabaya & marker mobil dinamis
│   ├── TelemetryPanel.tsx       # Gauges kecepatan, gas, rem, RPM & Recharts oscilloscope
│   ├── TelemetryChart.tsx       # Recharts real-time multi-line oscilloscope
│   ├── StrategyPanel.tsx        # Rekomendasi pit stop, ban, dan heatmap 4 roda
│   └── CarbonFiberTexture.tsx   # Tekstur karbon prosedural
├── hooks/
│   └── useTelemetry.ts          # State simulasi telemetri (10Hz) & Supabase channel template
├── public/
│   └── images/                  # Aset foto tim balap, sirkuit, avatar & logo Anargya
├── types/
│   └── telemetry.ts             # Interface TypeScript untuk telemetri & strategi
├── tailwind.config.ts           # Konfigurasi Tailwind & palet neon racing
└── package.json
```

---

## Memulai (Getting Started)

### Prasyarat
- Node.js versi 18.17 atau lebih baru
- npm / pnpm / yarn

### Instalasi & Menjalankan Lokal

```bash
# 1. Clone repositori
git clone https://github.com/LitSamm/PitStop-Pulse-Dashboard.git
cd PitStop-Pulse-Dashboard

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka di browser
# Akses http://localhost:3000
```

### Build Produksi

```bash
# Buat build produksi yang dioptimalkan
npm run build

# Jalankan server produksi
npm run start
```

---

## Integrasi Supabase Realtime

Komponen telemetri dibangun secara modular sehingga siap disambungkan langsung ke backend database **Supabase** atau websocket telemetri gokart. Di file `hooks/useTelemetry.ts`, Anda dapat mengaktifkan listener Supabase Channel:

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
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

