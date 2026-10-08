import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | GSTradeLink Chitwan",
    default: "GSTradeLink | Digital Beam Balance Sales & Repair",
  },
  description:
    "Authorized dealer for digital scales, beam balances, and weighing equipment in Bharatpur, Chitwan. Expert repair services and genuine spare parts available.",
  keywords: [
    "Digital Scale",
    "Weighing Machine",
    "Bharatpur",
    "Chitwan",
    "Beam Balance Repair",
    "Industrial Scales Nepal",
  ],
  openGraph: {
    title: "GSTradeLink - Precision Weighing Solutions",
    description: "Sales and Repair of Digital Balances in Bharatpur.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} flex min-h-screen flex-col bg-paper font-body text-ink antialiased`}
      >
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
