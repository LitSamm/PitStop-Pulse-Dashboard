import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PitStop Pulse | Anargya ITS EV Team",
  description:
    "Live telemetry and race strategy dashboard for the Anargya ITS EV Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
