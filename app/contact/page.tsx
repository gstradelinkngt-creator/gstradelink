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
    color: "#6D94C5",
    msg: "Hello GSTradeLink! I'm looking for a weighing scale. Could you help me find the right one?",
  },
  {
    icon: Wrench,
    label: "Book a repair / service",
    sub: "Scale repair or calibration",
    color: "#DCA963",
    msg: "Hello GSTradeLink! My weighing scale needs repair/calibration. Can you help me?",
  },
  {
    icon: Star,
    label: "Request a price quote",
    sub: "Bulk order or custom requirement",
    color: "#6D94C5",
    msg: "Hello GSTradeLink! I'd like a price quote for weighing equipment. Please share the details.",
  },
  {
    icon: Zap,
    label: "Spare parts enquiry",
    sub: "Genuine replacement parts",
    color: "#DCA963",
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
    tint: "#6D94C5",
  },
  {
    icon: Phone,
    label: "Phone / Landline",
    value: "+977 9845541939",
    href: "tel:+9779845541939",
    tint: "#DCA963",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "gstradelinkngt@gmail.com",
    href: "mailto:gstradelinkngt@gmail.com",
    tint: "#6D94C5",
  },
  {
    icon: Clock3,
    label: "Working Hours",
    value: "All days except Mon · 10 AM – 6 PM",
    href: null,
    tint: "#DCA963",
  },
];

export default function ContactPage() {
  const todayLabel = getTodayLabel();

  return (
    <div className="aurora min-h-screen w-full overflow-hidden md:pb-12">
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="aurora-grid relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="aurora-orb aurora-orb--blue" style={{ width: 420, height: 420, top: -120, right: -80 }} />
        <div className="aurora-orb aurora-orb--gold" style={{ width: 320, height: 320, bottom: -120, left: -60, opacity: 0.5 }} />

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em]" style={{ color: "#AECAE9" }}>
                <CheckCircle size={11} style={{ color: "#DCA963" }} />
                Contact GSTradeLink · Bharatpur
              </span>

              <h1
                className="mb-5 font-bold text-white"
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                Get expert support{" "}
                <span className="text-gradient-gold" style={{ fontStyle: "italic" }}>
                  quickly
                </span>
              </h1>

              <p
                className="mx-auto lg:mx-0"
                style={{ fontSize: "clamp(0.88rem, 2vw, 1.05rem)", color: "#AECAE9", maxWidth: "34rem", lineHeight: 1.75, marginBottom: "40px" }}
              >
                Tell us your precision weighing requirement. Our team will
                suggest the right product, calibration schedule, or repair plan
                — usually within a few hours.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like some help with a weighing scale.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-lg w-full text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                  style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)" }}
                >
                  <MessageCircle size={17} fill="white" /> Chat on WhatsApp
                </a>
                <a href="tel:+9779845541939" className="ui-btn ui-btn-lg btn-glass w-full sm:w-auto">
                  <Phone size={15} /> Call now
                </a>
              </div>
            </div>

            {/* Focal glass visual */}
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="relative w-full max-w-sm">
                <div className="glass-strong animate-glass-float flex aspect-square items-center justify-center rounded-[2.5rem]">
                  <div className="glow-gold flex h-32 w-32 items-center justify-center rounded-3xl" style={{ background: "linear-gradient(135deg,#DCA963,#C28D44)" }}>
                    <MessageCircle size={56} className="text-white" />
                  </div>
                  <div className="glass absolute -left-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Phone size={22} style={{ color: "#AECAE9" }} />
                  </div>
                  <div className="glass absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Mail size={20} style={{ color: "#DCA963" }} />
                  </div>
                </div>
                <div className="glass absolute -bottom-5 left-6 right-6 flex items-center gap-3 rounded-2xl px-5 py-4">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#25D366]" />
                  <span className="text-sm font-semibold text-white">Usually replies in hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Contact info cards ──────────────────────── */}
      <section className="mx-auto mt-2 w-full max-w-[1200px] px-4 sm:mt-6 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href, tint }) => (
              <div key={label} className="glass glass-hover ui-card rounded-2xl p-4 sm:p-5">
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${tint}26`, border: `1px solid ${tint}55` }}
                >
                  <Icon size={18} style={{ color: tint }} />
                </div>
                <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.1em]" style={{ color: "#93B2D6" }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-semibold text-white transition-colors hover:text-[#DCA963]"
                    style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", lineHeight: 1.45, wordBreak: "break-word" }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-semibold text-white" style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", lineHeight: 1.45 }}>
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ──────────────── WhatsApp templates + Hours & Location ──────────────── */}
      <section className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:mt-14 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* WhatsApp templates */}
          <ScrollReveal direction="left" delay={0} distance={32}>
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5" style={{ background: "rgba(37,211,102,0.08)" }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#25D366", boxShadow: "0 4px 12px rgba(37,211,102,0.4)" }}>
                  <MessageCircle size={18} fill="white" color="white" />
                </span>
                <div>
                  <h2 className="font-bold text-white" style={{ fontSize: "1rem", lineHeight: 1.2 }}>
                    Message us on WhatsApp
                  </h2>
                  <p style={{ fontSize: "0.75rem", color: "#93B2D6", marginTop: "2px" }}>
                    Tap a template — we reply within a few hours
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 p-4">
                {WA_TEMPLATES.map(({ icon: Icon, label, sub, color, msg }) => (
                  <a
                    key={label}
                    href={`${WA_BASE}${encodeURIComponent(msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glass-hover group flex items-center gap-4 rounded-xl p-3.5"
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `${color}26`, border: `1px solid ${color}55` }}
                    >
                      <Icon size={17} style={{ color }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white" style={{ fontSize: "0.875rem", lineHeight: 1.3 }}>{label}</p>
                      <p style={{ fontSize: "0.72rem", color: "#93B2D6", marginTop: "2px" }}>{sub}</p>
                    </div>
                    <ArrowRight size={16} style={{ color }} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Hours + location */}
          <ScrollReveal direction="right" delay={80} distance={32}>
            <div className="flex flex-col gap-5">
              {/* Working hours "table" */}
              <div className="glass overflow-hidden rounded-2xl">
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <Clock3 size={16} color="#DCA963" />
                  </span>
                  <div>
                    <h2 className="font-bold text-white" style={{ fontSize: "0.95rem", lineHeight: 1.2 }}>Working Hours</h2>
                    <p style={{ fontSize: "0.7rem", color: "#93B2D6", marginTop: "2px" }}>Store open 6 days a week</p>
                  </div>
                </div>

                <div className="py-1">
                  {HOURS.map(({ day, time, open }) => {
                    const isToday = day === todayLabel;
                    return (
                      <div
                        key={day}
                        className="flex items-center justify-between px-5 py-2.5"
                        style={{
                          background: isToday ? "rgba(220,169,99,0.1)" : "transparent",
                          borderLeft: isToday ? "3px solid #DCA963" : "3px solid transparent",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {isToday && (
                            <span
                              className="rounded-full px-1.5 py-0.5 text-[0.55rem] font-extrabold uppercase tracking-wide"
                              style={{ color: "#1a1206", background: "#DCA963" }}
                            >
                              Today
                            </span>
                          )}
                          <span style={{ fontSize: "0.8rem", fontWeight: isToday ? 700 : 500, color: isToday ? "#FFFFFF" : "#AECAE9" }}>
                            {day}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: open ? (isToday ? "#DCA963" : "#93B2D6") : "#FCA5A5" }}>
                          {time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="glass overflow-hidden rounded-2xl">
                <a
                  href="https://maps.google.com/?q=Bharatpur+Chitwan+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                  style={{ height: "140px", background: "linear-gradient(135deg, #142235 0%, #1d3047 100%)", textDecoration: "none" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(109,148,197,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(109,148,197,0.12) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center">
                    <div style={{ height: "3px", width: "100%", background: "rgba(255,255,255,0.18)" }} />
                  </div>
                  <div className="absolute inset-0 flex justify-center">
                    <div style={{ width: "3px", height: "100%", background: "rgba(255,255,255,0.18)" }} />
                  </div>
                  <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -100%)" }}>
                    <div
                      className="flex items-center justify-center"
                      style={{ width: "36px", height: "36px", borderRadius: "50% 50% 50% 0", background: "#DCA963", transform: "rotate(-45deg)", boxShadow: "0 4px 16px rgba(220,169,99,0.5)" }}
                    >
                      <MapPin size={16} color="#1a1206" style={{ transform: "rotate(45deg)" }} />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "rgba(8,15,24,0.25)" }}>
                    <span className="glass-strong inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.68rem] font-bold text-white">
                      Open in Maps <ArrowRight size={10} />
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-4">
                  <span className="glass-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                    <MapPin size={16} style={{ color: "#DCA963" }} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-white" style={{ fontSize: "0.875rem" }}>GSTradeLink Store</p>
                    <p style={{ color: "#AECAE9", fontSize: "0.78rem", marginTop: "2px", lineHeight: 1.5 }}>
                      Bharatpur-3, Chitwan, Nepal
                    </p>
                    <a
                      href="https://maps.google.com/?q=Bharatpur+Chitwan+Nepal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 font-bold transition-colors hover:text-white"
                      style={{ fontSize: "0.72rem", color: "#DCA963", textDecoration: "none" }}
                    >
                      Get directions <ArrowRight size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────── Bottom CTA ─────────────────────────── */}
      <section className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12">
            <div className="aurora-orb aurora-orb--gold" style={{ width: 280, height: 280, top: -120, right: -40, opacity: 0.5 }} />
            <div className="aurora-orb aurora-orb--blue" style={{ width: 240, height: 240, bottom: -120, left: -40, opacity: 0.5 }} />
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-10">
              <div className="text-center md:text-left" style={{ maxWidth: "480px" }}>
                <p className="mb-2.5 text-[0.68rem] font-bold uppercase tracking-[0.12em]" style={{ color: "#93B2D6" }}>
                  Fastest response
                </p>
                <h2 className="mb-3 font-bold text-white" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.1rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  Ready to get a quote or book a service?
                </h2>
                <p style={{ color: "#AECAE9", fontSize: "clamp(0.82rem, 1.5vw, 0.9rem)", lineHeight: 1.7 }}>
                  We reply within a few hours. Share your requirement and we&apos;ll
                  recommend the right scale, repair plan, or spare part.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:flex-col">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like to get a quote.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-lg w-full text-white transition-transform hover:-translate-y-0.5 sm:flex-1 md:w-64"
                  style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)" }}
                >
                  <MessageCircle size={17} fill="white" /> Chat on WhatsApp
                </a>
                <Link href="/products" className="ui-btn ui-btn-lg btn-glass w-full sm:flex-1 md:w-64">
                  Browse Products <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
