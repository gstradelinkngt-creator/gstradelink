import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Repair & Calibration Services",
  description:
    "Weighing scale calibration, repair for all brands, genuine spare parts and installation in Bharatpur, Chitwan.",
};

const SERVICES = [
  {
    title: "Calibration & OIML certification",
    desc: "Your scale tested against certified standard weights and adjusted to legal metrology tolerances. We prepare the certificate and remind you when renewal is due.",
    features: ["Standard-weight testing", "Certificate issued", "Annual renewal reminders"],
    msg: "Hello GSTradeLink! I need my scale calibrated / certified.",
  },
  {
    title: "Repair for every brand",
    desc: "Dead displays, drifting readings, broken keypads, failed load cells or boards — fixed by experienced technicians, for all major brands.",
    features: ["On-site diagnostics", "Load cell & board repair", "Most jobs done in 24 hours"],
    msg: "Hello GSTradeLink! My weighing scale needs repair.",
  },
  {
    title: "Genuine spare parts",
    desc: "Batteries, adaptors, load cells, displays, pans and keypads kept in stock, so your counter isn't left without a scale.",
    features: ["Original manufacturer parts", "Batteries & chargers", "Component upgrades"],
    msg: "Hello GSTradeLink! I need a spare part for my scale.",
  },
  {
    title: "Installation & setup",
    desc: "Platform and industrial scales assembled, levelled and configured on site — including indicator setup and a walkthrough for your staff.",
    features: ["On-site assembly", "Indicator configuration", "Staff training"],
    msg: "Hello GSTradeLink! I need a scale installed on site.",
  },
];

const STEPS = [
  { t: "Tell us the problem", d: "Send a photo or short video on WhatsApp, or bring the scale to the shop." },
  { t: "We diagnose and fix it", d: "Our technicians find the fault and repair it — most issues within 24 hours." },
  { t: "Collect it calibrated", d: "Repaired, tested against standard weights, and ready to use." },
];

export default function ServicesPage() {
  return (
    <div className="pb-20">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="container-site grid gap-10 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="h-px w-6 bg-signal" /> Workshop · Bharatpur
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            Repair and calibration for every scale.
          </h1>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-ink-soft">
            From a jeweller&apos;s 0.001 g balance to a 300 kg crane scale — we fix it, certify it and keep it weighing
            accurately.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink("Hello GSTradeLink! I need to book a repair/calibration service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa h-12 px-6"
            >
              <MessageCircle size={18} /> Book a service
            </a>
            <a href={SITE.phoneHref} className="btn-line h-12 px-6">
              <Phone size={17} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
      <div className="ruler" aria-hidden />

      {/* ── Services ─────────────────────────────────────── */}
      <section className="container-site py-20 md:py-24">
        <ol className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <li key={s.title} className="flex flex-col rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
              <span className="font-mono text-sm text-signal-deep">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-wa/10">
                      <Check size={12} strokeWidth={3} className="text-wa-deep" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-ink"
              >
                <span className="border-b border-ink/30 pb-0.5 group-hover:border-ink">Ask about this</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="bg-ink text-white">
        <div className="container-site py-20 md:py-24">
          <p className="eyebrow !text-white/50">How it works</p>
          <h2 className="mt-4 max-w-xl text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            How a repair works.
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.t} className="border-t border-white/15 pt-6">
                <span className="font-mono text-sm text-signal">Step {i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="container-site mt-20">
        <div className="flex flex-col gap-6 rounded-[1.75rem] border border-line bg-surface p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink">Need a replacement instead?</h2>
            <p className="mt-2 text-ink-soft">Browse the scales and spare parts we keep in stock.</p>
          </div>
          <Link href="/products" className="btn-ink h-12 shrink-0 px-6">
            Browse products <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
