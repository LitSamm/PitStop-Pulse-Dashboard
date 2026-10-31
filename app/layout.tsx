import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PitStop Pulse: Live Telemetry & Strategy Dashboard",
  description:
    "Real-time electric gokart & racing car performance telemetry and pit strategy dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="min-h-screen bg-black text-zinc-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}

