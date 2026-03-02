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
  Zap,
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
    color: "#3E5E85",
    bg: "linear-gradient(135deg, #EEF4FB 0%, #E4EDF7 100%)",
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
    bg: "linear-gradient(135deg, #FFFBF0 0%, #FFF6E0 100%)",
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
    color: "#557BAA",
    bg: "linear-gradient(135deg, #EEF4FB 0%, #E4EDF7 100%)",
    waMessage:
      "Hello GSTradeLink! I'm interested in preventive maintenance for my scales. Can you share more info?",
  },
];

const ADDITIONAL_SERVICES = [
  {
    icon: Package,
    title: "Spare Parts",
    description: "Genuine components for all major brands",
    color: "#1A2433",
  },
  {
    icon: Truck,
    title: "On-Site Service",
    description: "We come to your location across Chitwan",
    color: "#3E5E85",
  },
  {
    icon: ShieldCheck,
    title: "AMC Contracts",
    description: "Annual coverage with priority support",
    color: "#DCA963",
  },
];

const STATS = [
  { value: "8+", label: "Years", icon: Award },
  { value: "500+", label: "Scales Serviced", icon: Wrench },
  { value: "24h", label: "Response", icon: Clock },
  { value: "100%", label: "Satisfaction", icon: Users },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Contact",
    description: "Reach out via WhatsApp or phone",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Diagnosis",
    description: "We assess and provide a quote",
    icon: Settings,
  },
  {
    step: "03",
    title: "Service",
    description: "Repair with genuine parts",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Delivery",
    description: "Collect or we deliver to you",
    icon: Truck,
  },
];

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen pb-24 md:pb-16"
      style={{ background: "#F4F6F2" }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          Hero Section - Premium & Spacious
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(145deg, #0F1825 0%, #1A2433 30%, #2B4D72 70%, #3E5E85 100%)",
          paddingTop: "clamp(80px, 12vw, 140px)",
          paddingBottom: "clamp(100px, 14vw, 160px)",
        }}
      >
        {/* Animated gradient orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: "5%",
            top: "10%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(220,169,99,0.12) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: "-10%",
            bottom: "0%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(174,202,233,0.15) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2.5"
              style={{
                padding: "10px 24px",
                borderRadius: "9999px",
                background: "rgba(220,169,99,0.15)",
                border: "1px solid rgba(220,169,99,0.3)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#DCA963",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              <Sparkles size={14} />
              Professional Services
            </span>
          </div>

          <h1
            className="font-bold text-white mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Expert Scale
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #DCA963 0%, #F5D89A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Repair & Calibration
            </span>
          </h1>

          <p
            className="mx-auto mb-10"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(174,202,233,0.9)",
              maxWidth: "600px",
              lineHeight: 1.8,
            }}
          >
            From quick fixes to certified OIML calibration — our experienced
            technicians keep your weighing equipment accurate and reliable.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I need service for my weighing scale. Can you help?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "#FFFFFF",
                fontSize: "0.95rem",
                boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
              }}
            >
              <MessageCircle size={20} fill="white" />
              Book on WhatsApp
            </a>
            <a
              href="tel:+9779845541939"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "2px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                fontSize: "0.95rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <Phone size={18} />
              +977 9845541939
            </a>
          </div>
        </div>

        {/* Bottom curve */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            <path
              d="M0,80 C480,20 960,20 1440,80 L1440,80 L0,80 Z"
              fill="#F4F6F2"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Stats Strip - Floating Card
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <ScrollReveal direction="up" delay={0} distance={30}>
          <div
            className="grid grid-cols-4 divide-x divide-[#E8EDF3]"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)",
              padding: "clamp(24px, 4vw, 40px) 0",
            }}
          >
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center px-4">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #EEF4FB 0%, #E4EDF7 100%)",
                  }}
                >
                  <Icon size={20} style={{ color: "#3E5E85" }} />
                </div>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    color: "#1A2433",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#8798AD",
                    marginTop: "6px",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Main Services - Large Cards
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="text-center mb-16">
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#DCA963",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "12px",
              }}
            >
              Core Services
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                color: "#1A2433",
                letterSpacing: "-0.03em",
              }}
            >
              What We Do Best
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {MAIN_SERVICES.map(
            (
              {
                icon: Icon,
                title,
                subtitle,
                description,
                features,
                color,
                bg,
                waMessage,
              },
              index,
            ) => (
              <ScrollReveal
                key={title}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={100}
                distance={40}
              >
                <div
                  className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "24px",
                    boxShadow:
                      "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)",
                    border: "1px solid #E8EDF3",
                  }}
                >
                  <div
                    className="grid md:grid-cols-2 gap-0"
                    style={{
                      minHeight: "340px",
                    }}
                  >
                    {/* Left - Icon & Visual */}
                    <div
                      className="relative flex items-center justify-center p-12"
                      style={{
                        background: bg,
                        borderRadius: index % 2 === 0 ? "24px 0 0 24px" : "0",
                        order: index % 2 === 0 ? 0 : 1,
                      }}
                    >
                      {/* Large icon */}
                      <div
                        className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "32px",
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 16px 48px ${color}25`,
                        }}
                      >
                        <Icon size={52} style={{ color }} strokeWidth={1.5} />
                      </div>

                      {/* Decorative rings */}
                      <div
                        className="absolute w-[200px] h-[200px] rounded-full border-2 opacity-20"
                        style={{ borderColor: color }}
                      />
                      <div
                        className="absolute w-[280px] h-[280px] rounded-full border opacity-10"
                        style={{ borderColor: color }}
                      />
                    </div>

                    {/* Right - Content */}
                    <div
                      className="flex flex-col justify-center p-10 lg:p-14"
                      style={{
                        order: index % 2 === 0 ? 1 : 0,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          marginBottom: "8px",
                        }}
                      >
                        {subtitle}
                      </p>

                      <h3
                        className="font-bold mb-4"
                        style={{
                          fontSize: "clamp(1.5rem, 3vw, 2rem)",
                          color: "#1A2433",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {title}
                      </h3>

                      <p
                        style={{
                          fontSize: "1rem",
                          color: "#5C6B7B",
                          lineHeight: 1.7,
                          marginBottom: "24px",
                        }}
                      >
                        {description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle
                              size={16}
                              style={{ color: "#25D366", flexShrink: 0 }}
                            />
                            <span
                              style={{ fontSize: "0.85rem", color: "#5C6B7B" }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href={`${WA_BASE}${encodeURIComponent(waMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{
                          background: color,
                          color: "#FFFFFF",
                          boxShadow: `0 4px 16px ${color}40`,
                        }}
                      >
                        Get Quote
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ),
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Additional Services - Clean Grid
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="text-center mb-12">
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#1A2433",
                letterSpacing: "-0.02em",
              }}
            >
              Also Available
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {ADDITIONAL_SERVICES.map(
            ({ icon: Icon, title, description, color }, index) => (
              <ScrollReveal
                key={title}
                direction="up"
                delay={index * 80}
                distance={24}
              >
                <div
                  className="group text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8EDF3",
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${color}12`,
                    }}
                  >
                    <Icon size={28} style={{ color }} />
                  </div>

                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontSize: "1.1rem",
                      color: "#1A2433",
                    }}
                  >
                    {title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#8798AD",
                      lineHeight: 1.5,
                    }}
                  >
                    {description}
                  </p>
                </div>
              </ScrollReveal>
            ),
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          How It Works - Horizontal Timeline
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div
            className="relative overflow-hidden rounded-3xl p-10 sm:p-14 lg:p-16"
            style={{
              background:
                "linear-gradient(145deg, #1A2433 0%, #2B4D72 60%, #3E5E85 100%)",
            }}
          >
            {/* Decorative element */}
            <div
              className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(220,169,99,0.15) 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <div className="relative z-10">
              <div className="text-center mb-14">
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#DCA963",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: "10px",
                  }}
                >
                  Simple Process
                </p>
                <h2
                  className="font-bold text-white"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  How It Works
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {PROCESS_STEPS.map(
                  ({ step, title, description, icon: StepIcon }, index) => (
                    <div key={step} className="relative text-center">
                      {/* Connector line */}
                      {index < PROCESS_STEPS.length - 1 && (
                        <div
                          className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px]"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(220,169,99,0.5) 0%, transparent 100%)",
                          }}
                        />
                      )}

                      <div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <StepIcon size={32} style={{ color: "#DCA963" }} />
                      </div>

                      <p
                        className="font-bold text-white mb-2"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(174,202,233,0.8)",
                          lineHeight: 1.5,
                        }}
                      >
                        {description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Service Area Banner
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-10 rounded-2xl"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8EDF3",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-5">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #EEF4FB 0%, #E4EDF7 100%)",
                }}
              >
                <MapPin size={24} style={{ color: "#3E5E85" }} />
              </div>
              <div>
                <h3
                  className="font-bold"
                  style={{ fontSize: "1.2rem", color: "#1A2433" }}
                >
                  Serving Bharatpur & All of Chitwan
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#8798AD" }}>
                  On-site service available with 24-hour response time
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Bharatpur",
                "Ratnanagar",
                "Sauraha",
                "Narayanghat",
                "Tandi",
              ].map((area) => (
                <span
                  key={area}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    background: "#EEF4FB",
                    border: "1px solid #CBDCEB",
                    color: "#3E5E85",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Bottom CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div
            className="text-center py-16 px-8 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, #EEF4FB 0%, #E4EDF7 50%, #FFFBF0 100%)",
              border: "1px solid #CBDCEB",
            }}
          >
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                color: "#1A2433",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="mx-auto mb-8"
              style={{
                color: "#5C6B7B",
                fontSize: "1rem",
                maxWidth: "450px",
                lineHeight: 1.7,
              }}
            >
              Contact us today for a free consultation. We&apos;ll diagnose the
              issue and provide a transparent quote.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like to book a service for my weighing scale.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                }}
              >
                <MessageCircle size={18} fill="white" />
                WhatsApp Us
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1"
                style={{
                  background: "#1A2433",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 24px rgba(26,36,51,0.2)",
                }}
              >
                Browse Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
