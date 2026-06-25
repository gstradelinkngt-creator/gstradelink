import type { Metadata } from "next";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle,
  ArrowRight,
  Wrench,
  Package,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact GSTradeLink for product enquiries, weighing machine service, and spare parts support in Chitwan.",
};

const WA_BASE = "https://wa.me/9779845541939?text=";

const WA_TEMPLATES = [
  {
    icon: Package,
    label: "Enquire about a product",
    sub: "Ask about availability & pricing",
    msg: "Hello GSTradeLink! I'm looking for a weighing scale. Could you help me find the right one?",
  },
  {
    icon: Wrench,
    label: "Book a repair / service",
    sub: "Scale repair or calibration",
    msg: "Hello GSTradeLink! My weighing scale needs repair/calibration. Can you help me?",
  },
  {
    icon: Star,
    label: "Request a price quote",
    sub: "Bulk order or custom requirement",
    msg: "Hello GSTradeLink! I'd like a price quote for weighing equipment. Please share the details.",
  },
  {
    icon: Zap,
    label: "Spare parts enquiry",
    sub: "Genuine replacement parts",
    msg: "Hello GSTradeLink! I need a spare part for my weighing scale. Can you help?",
  },
];

const HOURS = [
  { day: "Sunday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Monday", time: "Closed", open: false },
  { day: "Tuesday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Wednesday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Thursday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Friday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Saturday", time: "10:00 AM – 6:00 PM", open: true },
];

function getTodayLabel() {
  const dayIdx = new Date().getDay();
  return HOURS[dayIdx]?.day ?? null;
}

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: "Store Location",
    value: "Bharatpur-3, Chitwan, Nepal",
    href: "https://maps.google.com/?q=Bharatpur+Chitwan+Nepal",
  },
  {
    icon: Phone,
    label: "Phone / Landline",
    value: "+977 9845541939",
    href: "tel:+9779845541939",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "gstradelinkngt@gmail.com",
    href: "mailto:gstradelinkngt@gmail.com",
  },
  {
    icon: Clock3,
    label: "Working Hours",
    value: "All days except Mon · 10 AM – 6 PM",
    href: null,
  },
];

export default function ContactPage() {
  const todayLabel = getTodayLabel();

  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-hidden md:pb-12">
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24 border-b border-slate-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                <CheckCircle size={14} className="text-amber-500" />
                Contact GSTradeLink · Bharatpur
              </span>

              <h1
                className="mb-6 font-bold text-slate-50"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                Get expert support{" "}
                <span className="text-amber-500 italic block mt-2">
                  quickly
                </span>
              </h1>

              <p
                className="mx-auto lg:mx-0 mb-10 text-slate-400"
                style={{ fontSize: "clamp(1.05rem, 2vw, 1.15rem)", maxWidth: "34rem", lineHeight: 1.75 }}
              >
                Tell us your precision weighing requirement. Our team will
                suggest the right product, calibration schedule, or repair plan
                — usually within a few hours.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like some help with a weighing scale.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 sm:w-auto shadow-sm"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
                <a href="tel:+9779845541939" className="flex items-center justify-center gap-2.5 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-8 py-4 rounded-xl transition-all sm:w-auto shadow-sm">
                  <Phone size={18} /> Call now
                </a>
              </div>
            </div>

            {/* Focal visual */}
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="relative w-full max-w-sm">
                <div className="bg-slate-900 border border-slate-800 flex aspect-square items-center justify-center rounded-[3rem] shadow-xl relative z-10 hover:border-slate-700 transition-colors">
                  <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-amber-500 shadow-lg transition-transform duration-500 hover:scale-105">
                    <MessageCircle size={64} className="text-slate-950" />
                  </div>
                  <div className="absolute -left-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
                    <Phone size={26} className="text-amber-500" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-md">
                    <Mail size={24} className="text-amber-500" />
                  </div>
                </div>
                <div className="absolute -bottom-6 left-8 right-8 flex items-center justify-center gap-3 rounded-2xl bg-slate-900 border border-slate-800 px-6 py-4 shadow-lg z-20">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-sm font-bold text-slate-50">Usually replies in hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Contact info cards ──────────────────────── */}
      <section className="mx-auto mt-8 w-full max-w-7xl px-6 lg:px-8 pt-6">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors rounded-3xl p-6 sm:p-8 shadow-sm group flex flex-col items-start">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 transition-transform group-hover:scale-110">
                  <Icon size={24} className="text-amber-500" />
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-bold text-slate-50 transition-colors hover:text-amber-500"
                    style={{ fontSize: "1.05rem", lineHeight: 1.5, wordBreak: "break-word" }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-bold text-slate-50" style={{ fontSize: "1.05rem", lineHeight: 1.5 }}>
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ──────────────── WhatsApp templates + Hours & Location ──────────────── */}
      <section className="mx-auto mt-14 w-full max-w-7xl px-6 lg:px-8 pb-16">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* WhatsApp templates */}
          <ScrollReveal direction="left" delay={0} distance={32}>
            <div className="bg-slate-900 border border-slate-800 overflow-hidden rounded-3xl shadow-sm">
              <div className="flex items-center gap-4 border-b border-slate-800 px-8 py-6 bg-slate-800/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] shadow-[0_4px_12px_rgba(37,211,102,0.3)]">
                  <MessageCircle size={24} className="text-slate-950" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-50 text-lg">
                    Message us on WhatsApp
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Tap a template — we reply within a few hours
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 p-5">
                {WA_TEMPLATES.map(({ icon: Icon, label, sub, msg }) => (
                  <a
                    key={label}
                    href={`${WA_BASE}${encodeURIComponent(msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 rounded-2xl bg-slate-950 border border-slate-800 p-5 hover:border-slate-700 transition-colors shadow-sm"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} className="text-amber-500" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-50 text-base mb-1">{label}</p>
                      <p className="text-sm text-slate-400">{sub}</p>
                    </div>
                    <ArrowRight size={20} className="text-slate-500 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-500" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Hours + location */}
          <ScrollReveal direction="right" delay={80} distance={32}>
            <div className="flex flex-col gap-8">
              {/* Working hours */}
              <div className="bg-slate-900 border border-slate-800 overflow-hidden rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 border-b border-slate-800 px-8 py-6 bg-slate-800/30">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700">
                    <Clock3 size={24} className="text-amber-500" />
                  </span>
                  <div>
                    <h2 className="font-bold text-slate-50 text-lg">Working Hours</h2>
                    <p className="text-sm text-slate-400 mt-1">Store open 6 days a week</p>
                  </div>
                </div>

                <div className="py-2">
                  {HOURS.map(({ day, time, open }) => {
                    const isToday = day === todayLabel;
                    return (
                      <div
                        key={day}
                        className="flex items-center justify-between px-8 py-3.5 border-l-4 transition-colors"
                        style={{
                          backgroundColor: isToday ? "rgba(245, 158, 11, 0.05)" : "transparent",
                          borderColor: isToday ? "#f59e0b" : "transparent",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {isToday && (
                            <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                              Today
                            </span>
                          )}
                          <span className={`text-base ${isToday ? 'font-bold text-slate-50' : 'font-medium text-slate-300'}`}>
                            {day}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${open ? (isToday ? 'text-amber-500' : 'text-slate-400') : 'text-red-400'}`}>
                          {time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="bg-slate-900 border border-slate-800 overflow-hidden rounded-3xl shadow-sm">
                <a
                  href="https://maps.google.com/?q=Bharatpur+Chitwan+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-40 bg-slate-950"
                >
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                      <MapPin size={28} className="text-slate-950" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-slate-950/40">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-slate-50">
                      Open in Maps <ArrowRight size={12} className="text-amber-500" />
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-8 bg-slate-800/30 border-t border-slate-800">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700">
                    <MapPin size={24} className="text-amber-500" />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-50 text-lg">GSTradeLink Store</p>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                      Bharatpur-3, Chitwan, Nepal
                    </p>
                    <a
                      href="https://maps.google.com/?q=Bharatpur+Chitwan+Nepal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 font-bold text-amber-500 hover:text-amber-400 transition-colors text-sm"
                    >
                      Get directions <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────── Bottom CTA ─────────────────────────── */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6 lg:px-8 pb-20">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="bg-slate-900 border border-slate-800 relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 shadow-lg">
            <div className="relative z-10 flex flex-col items-center justify-between gap-10 md:flex-row md:gap-16">
              <div className="text-center md:text-left flex-1 max-w-xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-500">
                  Fastest response
                </p>
                <h2 className="mb-5 font-bold text-slate-50" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  Ready to get a quote or book a service?
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  We reply within a few hours. Share your requirement and we&apos;ll
                  recommend the right scale, repair plan, or spare part.
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto md:flex-col shrink-0">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like to get a quote.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm md:w-64"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
                <Link href="/products" className="flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-8 py-4 rounded-xl transition-all shadow-sm md:w-64">
                  Browse Products <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
