import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Scale,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  Settings,
  Package,
  Truck,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional weighing scale repair, OIML calibration, and maintenance services in Bharatpur, Chitwan. On-site service with 24-hour response time.",
};

const WA_BASE = "https://wa.me/9779845541939?text=";

const MAIN_SERVICES = [
  {
    icon: Wrench,
    title: "Scale Repair",
    subtitle: "All Brands & Models",
    description:
      "Expert diagnosis and repair for digital scales, beam balances, platform scales, and industrial weighing systems.",
    features: [
      "Load cell replacement & repair",
      "Display & indicator repair",
      "PCB & electronic repairs",
      "Mechanical parts replacement",
    ],
    color: "#6D94C5",
    waMessage:
      "Hello GSTradeLink! I need repair service for my weighing scale. Can you help?",
  },
  {
    icon: Scale,
    title: "OIML Calibration",
    subtitle: "Certified & Legal",
    description:
      "Government-recognized calibration certificates accepted by legal metrology and commercial authorities.",
    features: [
      "OIML-compliant calibration",
      "Legal metrology certificates",
      "Traceability documentation",
      "Annual calibration contracts",
    ],
    color: "#DCA963",
    waMessage:
      "Hello GSTradeLink! I need OIML calibration for my weighing equipment. Please provide details.",
  },
  {
    icon: Settings,
    title: "Preventive Maintenance",
    subtitle: "Keep Scales Accurate",
    description:
      "Regular maintenance programs to prevent breakdowns, extend equipment life, and maintain accuracy.",
    features: [
      "Scheduled inspections",
      "Cleaning & adjustment",
      "Performance testing",
      "Detailed maintenance reports",
    ],
    color: "#6D94C5",
    waMessage:
      "Hello GSTradeLink! I'm interested in preventive maintenance for my scales. Can you share more info?",
  },
];

const ADDITIONAL_SERVICES = [
  {
    icon: Package,
    title: "Spare Parts",
    description: "Genuine components for all major brands",
    color: "#6D94C5",
  },
  {
    icon: Truck,
    title: "On-Site Service",
    description: "We come to your location across Chitwan",
    color: "#DCA963",
  },
  {
    icon: ShieldCheck,
    title: "AMC Contracts",
    description: "Annual coverage with priority support",
    color: "#6D94C5",
  },
];

const STATS = [
  { value: "8+", label: "Years", icon: Award },
  { value: "500+", label: "Scales Serviced", icon: Wrench },
  { value: "24h", label: "Response", icon: Clock },
  { value: "100%", label: "Satisfaction", icon: Users },
];

const PROCESS_STEPS = [
  { step: "01", title: "Contact", description: "Reach out via WhatsApp or phone", icon: MessageCircle },
  { step: "02", title: "Diagnosis", description: "We assess and provide a quote", icon: Settings },
  { step: "03", title: "Service", description: "Repair with genuine parts", icon: Wrench },
  { step: "04", title: "Delivery", description: "Collect or we deliver to you", icon: Truck },
];

export default function ServicesPage() {
  return (
    <div className="aurora min-h-screen w-full overflow-hidden md:pb-16">
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="aurora-grid relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="aurora-orb aurora-orb--gold" style={{ width: 420, height: 420, top: 0, right: "5%" }} />
        <div className="aurora-orb aurora-orb--blue" style={{ width: 380, height: 380, bottom: -120, left: "-8%" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-7 flex justify-center">
            <span className="glass-gold inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#F2D89A" }}>
              <Sparkles size={14} />
              Professional Services
            </span>
          </div>

          <h1
            className="mb-6 font-bold text-white"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1.05 }}
          >
            Expert Scale
            <br />
            <span className="text-gradient-gold">Repair &amp; Calibration</span>
          </h1>

          <p
            className="mx-auto mb-10"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#AECAE9", maxWidth: "600px", lineHeight: 1.75 }}
          >
            From quick fixes to certified OIML calibration — our experienced
            technicians keep your weighing equipment accurate and reliable.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I need service for my weighing scale. Can you help?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn ui-btn-lg w-full text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)" }}
            >
              <MessageCircle size={20} fill="white" /> Book on WhatsApp
            </a>
            <a href="tel:+9779845541939" className="ui-btn ui-btn-lg btn-glass w-full sm:w-auto">
              <Phone size={18} /> +977 9845541939
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── Stats strip ─────────────────────────── */}
      <section className="relative z-20 mx-auto -mt-8 max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0} distance={30}>
          <div className="glass-strong grid grid-cols-2 gap-y-8 rounded-3xl py-8 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-white/10">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="px-4 text-center">
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "rgba(109,148,197,0.16)", border: "1px solid rgba(109,148,197,0.3)" }}>
                  <Icon size={20} style={{ color: "#DCA963" }} />
                </span>
                <p className="font-bold text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {value}
                </p>
                <p className="mt-1.5 font-medium" style={{ fontSize: "0.8rem", color: "#93B2D6" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ─────────────────────────── Main services ─────────────────────────── */}
      <section className="mx-auto mt-24 max-w-[1100px] px-4 sm:mt-32 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="mb-14 text-center sm:mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#DCA963" }}>
              Core Services
            </p>
            <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.03em" }}>
              What We Do Best
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {MAIN_SERVICES.map(({ icon: Icon, title, subtitle, description, features, color, waMessage }, index) => (
            <ScrollReveal key={title} direction={index % 2 === 0 ? "left" : "right"} delay={100} distance={40}>
              <div className="glass glass-hover group overflow-hidden rounded-3xl">
                <div className="grid md:grid-cols-2" style={{ minHeight: "340px" }}>
                  {/* Visual */}
                  <div
                    className="relative flex items-center justify-center overflow-hidden p-12"
                    style={{ background: `${color}14`, order: index % 2 === 0 ? 0 : 1 }}
                  >
                    <div
                      className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[2rem] transition-transform duration-500 group-hover:scale-110"
                      style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${color}66`, boxShadow: `0 16px 48px ${color}33` }}
                    >
                      <Icon size={52} style={{ color }} strokeWidth={1.5} />
                    </div>
                    <div className="absolute h-[200px] w-[200px] rounded-full border-2 opacity-20" style={{ borderColor: color }} />
                    <div className="absolute h-[280px] w-[280px] rounded-full border opacity-10" style={{ borderColor: color }} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-10 lg:p-14" style={{ order: index % 2 === 0 ? 1 : 0 }}>
                    <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em]" style={{ color }}>
                      {subtitle}
                    </p>
                    <h3 className="mb-4 font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}>
                      {title}
                    </h3>
                    <p className="mb-6" style={{ fontSize: "1rem", color: "#AECAE9", lineHeight: 1.7 }}>
                      {description}
                    </p>
                    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle size={16} style={{ color: "#25D366", flexShrink: 0 }} />
                          <span style={{ fontSize: "0.85rem", color: "#C7D6E8" }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={`${WA_BASE}${encodeURIComponent(waMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-btn ui-btn-md btn-gold self-start"
                    >
                      Get Quote <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────── Additional services ─────────────────────── */}
      <section className="mx-auto mt-24 max-w-[1100px] px-4 sm:mt-32 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="mb-12 text-center">
            <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}>
              Also Available
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {ADDITIONAL_SERVICES.map(({ icon: Icon, title, description, color }, index) => (
            <ScrollReveal key={title} direction="up" delay={index * 80} distance={24}>
              <div className="glass glass-hover ui-card group rounded-2xl p-8 text-center">
                <div
                  className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}1f`, border: `1px solid ${color}55` }}
                >
                  <Icon size={28} style={{ color }} />
                </div>
                <h3 className="mb-2 font-bold text-white" style={{ fontSize: "1.1rem" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#AECAE9", lineHeight: 1.5 }}>{description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ──────────────────────────── How it works ──────────────────────────── */}
      <section className="mx-auto mt-24 max-w-[1100px] px-4 sm:mt-32 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 sm:p-14 lg:p-16">
            <div className="aurora-orb aurora-orb--gold" style={{ width: 300, height: 300, top: -120, right: -60, opacity: 0.5 }} />

            <div className="relative z-10">
              <div className="mb-14 text-center">
                <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#DCA963" }}>
                  Simple Process
                </p>
                <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}>
                  How It Works
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {PROCESS_STEPS.map(({ step, title, description, icon: StepIcon }, index) => (
                  <div key={step} className="relative text-center">
                    {index < PROCESS_STEPS.length - 1 && (
                      <div
                        className="absolute left-[60%] top-10 hidden h-[2px] w-[80%] lg:block"
                        style={{ background: "linear-gradient(90deg, rgba(220,169,99,0.5) 0%, transparent 100%)" }}
                      />
                    )}
                    <div className="glass mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-2xl">
                      <StepIcon size={32} style={{ color: "#DCA963" }} />
                    </div>
                    <p className="mb-2 font-bold text-white" style={{ fontSize: "1.1rem" }}>{title}</p>
                    <p style={{ fontSize: "0.85rem", color: "#AECAE9", lineHeight: 1.5 }}>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─────────────────────────── Service area ─────────────────────────── */}
      <section className="mx-auto mt-16 max-w-[1100px] px-4 sm:mt-20 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="glass flex flex-col items-center justify-between gap-8 rounded-2xl p-8 sm:p-10 md:flex-row">
            <div className="flex items-center gap-5">
              <div className="glass-gold flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                <MapPin size={24} style={{ color: "#DCA963" }} />
              </div>
              <div>
                <h3 className="font-bold text-white" style={{ fontSize: "1.2rem" }}>
                  Serving Bharatpur &amp; All of Chitwan
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#AECAE9" }}>
                  On-site service available with 24-hour response time
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {["Bharatpur", "Ratnanagar", "Sauraha", "Narayanghat", "Tandi"].map((area) => (
                <span key={area} className="glass rounded-full px-4 py-2 text-sm font-semibold" style={{ color: "#AECAE9" }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ──────────────────────────── Bottom CTA ──────────────────────────── */}
      <section className="mx-auto mt-16 max-w-[1100px] px-4 sm:mt-20 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="glass-strong relative overflow-hidden rounded-3xl px-8 py-16 text-center">
            <div className="aurora-orb aurora-orb--blue" style={{ width: 300, height: 300, top: -140, left: -40, opacity: 0.5 }} />
            <div className="aurora-orb aurora-orb--gold" style={{ width: 260, height: 260, bottom: -140, right: -40, opacity: 0.5 }} />
            <div className="relative z-10">
              <h2 className="mb-4 font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", letterSpacing: "-0.02em" }}>
                Ready to Get Started?
              </h2>
              <p className="mx-auto mb-8" style={{ color: "#AECAE9", fontSize: "1rem", maxWidth: "450px", lineHeight: 1.7 }}>
                Contact us today for a free consultation. We&apos;ll diagnose the
                issue and provide a transparent quote.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like to book a service for my weighing scale.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-lg w-full text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                  style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)" }}
                >
                  <MessageCircle size={18} fill="white" /> WhatsApp Us
                </a>
                <Link href="/products" className="ui-btn ui-btn-lg btn-glass w-full sm:w-auto">
                  Browse Products <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
