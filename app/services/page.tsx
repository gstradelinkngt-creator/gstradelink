import type { Metadata } from "next";
import {
  Wrench,
  CheckCircle,
  Package,
  Settings,
  Scale,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional weighing scale calibration, repair services, and genuine spare parts in Bharatpur, Chitwan.",
};

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "OIML Certification & Calibration",
    desc: "Government-approved calibration services ensuring your weighing scales meet all legal metrology standards for commercial trading. We handle the paperwork and certification process.",
    features: ["Standardized weight testing", "Certificate issuance", "Annual renewal tracking"],
  },
  {
    icon: Wrench,
    title: "Expert Scale Repair",
    desc: "Fast and reliable repair services for all major brands of digital scales and beam balances. Our experienced technicians can fix load cells, displays, and motherboard issues.",
    features: ["On-site diagnostics", "Motherboard repairs", "Load cell replacement"],
  },
  {
    icon: Package,
    title: "Genuine Spare Parts",
    desc: "We stock a comprehensive range of genuine spare parts including batteries, adaptors, load cells, displays, and keypads to ensure your equipment runs smoothly without downtime.",
    features: ["Original manufacturer parts", "Batteries & chargers", "Component upgrades"],
  },
  {
    icon: Settings,
    title: "Installation & Setup",
    desc: "Complete setup and configuration for heavy-duty industrial platforms and complex weighing systems, including software integration and user training.",
    features: ["Platform assembly", "Indicator configuration", "Staff training"],
  },
];

const WA_BASE = "https://wa.me/9779845541939?text=";

export default function ServicesPage() {
  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-hidden md:pb-12">
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24 border-b border-slate-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                <CheckCircle size={14} className="text-amber-500" />
                Expert Services · Bharatpur
              </span>

              <h1
                className="mb-6 font-bold text-slate-50"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                Calibration & <br className="hidden lg:block" />
                <span className="text-amber-500 italic block mt-2">
                  Repair Services
                </span>
              </h1>

              <p
                className="mx-auto lg:mx-0 mb-10 text-slate-400"
                style={{ fontSize: "clamp(1.05rem, 2vw, 1.15rem)", maxWidth: "34rem", lineHeight: 1.75 }}
              >
                From government-approved OIML calibration to motherboard repairs and spare part replacements, our technicians keep your business weighing accurately.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I need to book a repair/calibration service.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 sm:w-auto shadow-sm"
                >
                  <Wrench size={20} /> Book a Service
                </a>
                <Link href="/contact" className="flex items-center justify-center gap-2.5 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-8 py-4 rounded-xl transition-all sm:w-auto shadow-sm">
                  <MessageCircle size={18} /> Contact Us
                </Link>
              </div>
            </div>

            {/* Focal visual */}
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="relative w-full max-w-sm">
                <div className="bg-slate-900 border border-slate-800 flex aspect-square items-center justify-center rounded-[3rem] shadow-xl relative z-10 hover:border-slate-700 transition-colors">
                  <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-amber-500 shadow-lg transition-transform duration-500 hover:scale-105">
                    <Scale size={64} className="text-slate-950" />
                  </div>
                  <div className="absolute -left-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
                    <ShieldCheck size={26} className="text-amber-500" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
                    <Wrench size={24} className="text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Services Grid ──────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6 lg:px-8 pb-16">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">Our Core Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto lg:mx-0">
            We provide end-to-end support for your weighing equipment. Whether you need a quick battery replacement or a full industrial platform installation, we are ready to help.
          </p>
        </div>

        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors rounded-3xl p-8 shadow-sm flex flex-col group">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 transition-transform group-hover:scale-110 shrink-0">
                  <service.icon size={28} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>
                
                <ul className="space-y-3 mt-auto pt-6 border-t border-slate-800">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-medium text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ─────────────────────────── Bottom CTA ─────────────────────────── */}
      <section className="mx-auto mt-10 w-full max-w-7xl px-6 lg:px-8 pb-20">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="bg-slate-900 border border-slate-800 relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 shadow-lg">
            <div className="relative z-10 flex flex-col items-center justify-between gap-10 md:flex-row md:gap-16">
              <div className="text-center md:text-left flex-1 max-w-xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-500">
                  Available Now
                </p>
                <h2 className="mb-5 font-bold text-slate-50" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  Need immediate scale repairs?
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Drop off your scale at our Bharatpur store or request a technician to visit your site. We fix most issues within 24 hours.
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto md:flex-col shrink-0">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like to book an immediate service.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm md:w-64"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
                <Link href="/products" className="flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-8 py-4 rounded-xl transition-all shadow-sm md:w-64">
                  Browse Spare Parts <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
