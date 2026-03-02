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
    color: "#3E5E85",
    bg: "#EEF4FB",
    border: "#CBDCEB",
    msg: "Hello GSTradeLink! I'm looking for a weighing scale. Could you help me find the right one?",
  },
  {
    icon: Wrench,
    label: "Book a repair / service",
    sub: "Scale repair or calibration",
    color: "#C28D44",
    bg: "#FFFBF0",
    border: "#F0D99A",
    msg: "Hello GSTradeLink! My weighing scale needs repair/calibration. Can you help me?",
  },
  {
    icon: Star,
    label: "Request a price quote",
    sub: "Bulk order or custom requirement",
    color: "#557BAA",
    bg: "#EEF4FB",
    border: "#CBDCEB",
    msg: "Hello GSTradeLink! I'd like a price quote for weighing equipment. Please share the details.",
  },
  {
    icon: Zap,
    label: "Spare parts enquiry",
    sub: "Genuine replacement parts",
    color: "#1A2433",
    bg: "#F0F4F8",
    border: "#CBDCEB",
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
  // 0=Sun … 6=Sat
  const dayIdx = new Date().getDay();
  return HOURS[dayIdx]?.day ?? null;
}

export default function ContactPage() {
  const todayLabel = getTodayLabel();

  return (
    <div
      className="min-h-screen pb-24 md:pb-12"
      style={{ background: "#E8EBE3" }}
    >
      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #1A2433 0%, #2B4D72 55%, #3E5E85 100%)",
          padding: "clamp(72px, 10vw, 120px) 20px clamp(80px, 11vw, 130px)",
        }}
      >
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            opacity: 0.055,
          }}
        />
        {/* Decorative glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: 0,
            top: 0,
            width: "clamp(200px, 40vw, 460px)",
            height: "clamp(200px, 40vw, 460px)",
            background:
              "radial-gradient(circle, rgba(174,202,233,0.16) 0%, transparent 70%)",
            transform: "translate(30%, -40%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            bottom: 0,
            width: "clamp(150px, 30vw, 340px)",
            height: "clamp(150px, 30vw, 340px)",
            background:
              "radial-gradient(circle, rgba(220,169,99,0.12) 0%, transparent 70%)",
            transform: "translate(-30%, 40%)",
          }}
        />
        {/* Subtle arc ring top-right */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            right: "5%",
            top: "50%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            transform: "translateY(-50%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left motion-safe:animate-fade-up">
              {/* Badge */}
              <span
                className="inline-flex items-center gap-2 mb-6 sm:mb-8 mx-auto lg:mx-0"
                style={{
                  padding: "6px 18px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#AECAE9",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <CheckCircle size={11} style={{ color: "#DCA963" }} />
                Contact GSTradeLink · Bharatpur
              </span>

              <h1
                className="font-bold text-white mb-5"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                }}
              >
                Get expert support{" "}
                <span
                  style={{
                    color: "#DCA963",
                    fontStyle: "italic",
                  }}
                >
                  quickly
                </span>
              </h1>

              <p
                className="mx-auto lg:mx-0"
                style={{
                  fontSize: "clamp(0.88rem, 2vw, 1.05rem)",
                  color: "#AECAE9",
                  maxWidth: "34rem",
                  lineHeight: 1.75,
                  marginBottom: "40px",
                }}
              >
                Tell us your precision weighing requirement. Our team will
                suggest the right product, calibration schedule, or repair plan
                — usually within a few hours.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like some help with a weighing scale.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "13px 28px",
                    borderRadius: "4px",
                    background: "#25D366",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 6px 24px rgba(37,211,102,0.32)",
                  }}
                >
                  <MessageCircle size={17} fill="white" /> Chat on WhatsApp
                </a>
                <a
                  href="tel:+9779845541939"
                  className="hover:-translate-y-0.5 transition-all"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "13px 28px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.10)",
                    border: "1.5px solid rgba(255,255,255,0.22)",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={15} /> Call now
                </a>
              </div>
            </div>

            {/* Right-side dynamic illustration */}
            <div className="relative hidden lg:flex justify-center items-center">
              <div
                className="absolute"
                style={{
                  width: "360px",
                  height: "360px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  filter: "blur(2px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <div
                role="img"
                aria-label="Precision weighing scale illustration"
                className="contact-hero-scale-float"
                style={{
                  width: "clamp(260px, 28vw, 360px)",
                  height: "clamp(260px, 28vw, 360px)",
                  position: "relative",
                  filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.25))",
                }}
              >
                {/* Beam & pans */}
                <div
                  className="contact-hero-pan-swing"
                  style={{
                    position: "absolute",
                    top: "48px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "260px",
                    height: "86px",
                    transformOrigin: "center 16px",
                  }}
                >
                  <div
                    style={{
                      height: "6px",
                      background: "linear-gradient(90deg, #DCA963, #F1D59B)",
                      borderRadius: "999px",
                      boxShadow: "0 4px 10px rgba(220,169,99,0.3)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      left: "26px",
                      width: "2px",
                      height: "38px",
                      background: "rgba(255,255,255,0.7)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "26px",
                      width: "2px",
                      height: "38px",
                      background: "rgba(255,255,255,0.7)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "44px",
                      left: "-2px",
                      width: "92px",
                      height: "12px",
                      borderRadius: "999px",
                      background: "#EEF4FB",
                      border: "1px solid #CBDCEB",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "44px",
                      right: "-2px",
                      width: "92px",
                      height: "12px",
                      borderRadius: "999px",
                      background: "#EEF4FB",
                      border: "1px solid #CBDCEB",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  />
                </div>

                {/* Pillar */}
                <div
                  style={{
                    position: "absolute",
                    top: "78px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "120px",
                    background: "linear-gradient(180deg, #3E5E85, #1A2433)",
                    borderRadius: "999px",
                    boxShadow: "0 8px 20px rgba(26,36,51,0.35)",
                  }}
                />

                {/* Display */}
                <div
                  style={{
                    position: "absolute",
                    top: "188px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "120px",
                    height: "34px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#AECAE9",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  GST
                </div>

                {/* Base */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "48px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "220px",
                    height: "18px",
                    borderRadius: "999px",
                    background: "linear-gradient(90deg, #1A2433, #2B4D72)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.35)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "28px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "160px",
                    height: "10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                />

                {/* Needle glow */}
                <div
                  className="contact-hero-needle-pulse"
                  style={{
                    position: "absolute",
                    top: "116px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    background: "rgba(220,169,99,0.2)",
                    boxShadow: "0 0 22px rgba(220,169,99,0.35)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 1440 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "48px" }}
          >
            <path
              d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z"
              fill="#E8EBE3"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT INFO CARDS  (no hero overlap — clean grid below)
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-10 sm:mt-14">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: MapPin,
                label: "Store Location",
                value: "Bharatpur-3, Chitwan, Nepal",
                href: "https://maps.google.com/?q=Bharatpur+Chitwan+Nepal",
                iconBg: "#3E5E85",
                accent: "#EEF4FB",
              },
              {
                icon: Phone,
                label: "Phone / Landline",
                value: "+977 9845541939",
                href: "tel:+9779845541939",
                iconBg: "#DCA963",
                accent: "#FFFBF0",
              },
              {
                icon: Mail,
                label: "Email Address",
                value: "gstradelinkngt@gmail.com",
                href: "mailto:gstradelinkngt@gmail.com",
                iconBg: "#557BAA",
                accent: "#EEF4FB",
              },
              {
                icon: Clock3,
                label: "Working Hours",
                value: "All days except Mon · 10 AM – 6 PM",
                href: null,
                iconBg: "#1A2433",
                accent: "#F0F4F8",
              },
            ].map(({ icon: Icon, label, value, href, iconBg }) => (
              <div
                key={label}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  padding: "clamp(16px, 3vw, 24px)",
                  background: "#FFFFFF",
                  borderRadius: "6px",
                  border: "1px solid #CBDCEB",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: iconBg,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    boxShadow: `0 4px 12px ${iconBg}55`,
                  }}
                >
                  <Icon size={18} color="white" />
                </div>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#8798AD",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="transition-colors hover:text-[#3E5E85]"
                    style={{
                      color: "#111111",
                      fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                      fontWeight: 600,
                      textDecoration: "none",
                      lineHeight: 1.45,
                      wordBreak: "break-word",
                    }}
                  >
                    {value}
                  </a>
                ) : (
                  <p
                    style={{
                      color: "#111111",
                      fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                      fontWeight: 600,
                      lineHeight: 1.45,
                    }}
                  >
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT: WhatsApp templates  +  Hours & Location
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-10 sm:mt-14">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* ── Left: WhatsApp Quick-Message Templates ───────────── */}
          <ScrollReveal direction="left" delay={0} distance={32}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #CBDCEB",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  padding: "22px 24px 20px",
                  borderBottom: "1px solid #EEF4FB",
                  background:
                    "linear-gradient(135deg, #EEF4FB 0%, #F8FAFD 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#25D366",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(37,211,102,0.28)",
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={18} fill="white" color="white" />
                  </div>
                  <div>
                    <h2
                      style={{
                        fontWeight: 700,
                        color: "#111111",
                        fontSize: "1rem",
                        lineHeight: 1.2,
                      }}
                    >
                      Message us on WhatsApp
                    </h2>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#8798AD",
                        marginTop: "2px",
                      }}
                    >
                      Tap a template — we reply within a few hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Templates */}
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {WA_TEMPLATES.map(
                  ({ icon: Icon, label, sub, color, bg, border, msg }) => (
                    <a
                      key={label}
                      href={`${WA_BASE}${encodeURIComponent(msg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
                      style={{
                        padding: "14px 16px",
                        borderRadius: "6px",
                        background: bg,
                        border: `1.5px solid ${border}`,
                        textDecoration: "none",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: `0 3px 10px ${color}44`,
                        }}
                        className="transition-transform duration-200 group-hover:scale-110"
                      >
                        <Icon size={17} color="white" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#111111",
                            fontSize: "0.875rem",
                            lineHeight: 1.3,
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: "#8798AD",
                            marginTop: "2px",
                          }}
                        >
                          {sub}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        style={{ color: color, flexShrink: 0 }}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  ),
                )}
              </div>

              {/* Footer hint */}
              <div
                style={{
                  padding: "14px 24px",
                  borderTop: "1px solid #EEF4FB",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#25D366",
                    boxShadow: "0 0 0 3px rgba(37,211,102,0.22)",
                    flexShrink: 0,
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <p style={{ fontSize: "0.72rem", color: "#8798AD" }}>
                  Usually online — fast response on WhatsApp
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right: Hours + Location ───────────────────────────── */}
          <ScrollReveal direction="right" delay={80} distance={32}>
            <div className="flex flex-col gap-5">
              {/* Working Hours Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "8px",
                  border: "1px solid #CBDCEB",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "18px 22px 16px",
                    borderBottom: "1px solid #EEF4FB",
                    background:
                      "linear-gradient(135deg, #1A2433 0%, #2B4D72 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock3 size={16} color="#DCA963" />
                  </div>
                  <div>
                    <h2
                      style={{
                        fontWeight: 700,
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        lineHeight: 1.2,
                      }}
                    >
                      Working Hours
                    </h2>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#93B2D6",
                        marginTop: "2px",
                      }}
                    >
                      Store open 6 days a week
                    </p>
                  </div>
                </div>

                <div style={{ padding: "4px 0" }}>
                  {HOURS.map(({ day, time, open }) => {
                    const isToday = day === todayLabel;
                    return (
                      <div
                        key={day}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 22px",
                          background: isToday
                            ? "linear-gradient(90deg, #EEF4FB 0%, #F8FBFE 100%)"
                            : "transparent",
                          borderLeft: isToday
                            ? "3px solid #3E5E85"
                            : "3px solid transparent",
                          transition: "background 0.15s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {isToday && (
                            <span
                              style={{
                                fontSize: "0.55rem",
                                fontWeight: 800,
                                color: "#3E5E85",
                                background: "#D5E4F4",
                                padding: "2px 6px",
                                borderRadius: "9999px",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                              }}
                            >
                              Today
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: isToday ? 700 : 500,
                              color: isToday ? "#1A2433" : "#5C6B7B",
                            }}
                          >
                            {day}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: open
                              ? isToday
                                ? "#3E5E85"
                                : "#5C6B7B"
                              : "#EF4444",
                          }}
                        >
                          {time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location card */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "8px",
                  border: "1px solid #CBDCEB",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* Map placeholder — styled as a branded map preview */}
                <a
                  href="https://maps.google.com/?q=Bharatpur+Chitwan+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative"
                  style={{
                    height: "140px",
                    background:
                      "linear-gradient(135deg, #EEF4FB 0%, #D5E4F4 100%)",
                    overflow: "hidden",
                    textDecoration: "none",
                  }}
                >
                  {/* Grid lines mimicking a map */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(62,94,133,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(62,94,133,0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {/* Road lines */}
                  <div className="absolute inset-0 flex items-center">
                    <div
                      style={{
                        height: "3px",
                        width: "100%",
                        background: "rgba(255,255,255,0.9)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex justify-center">
                    <div
                      style={{
                        width: "3px",
                        height: "100%",
                        background: "rgba(255,255,255,0.9)",
                        boxShadow: "1px 0 4px rgba(0,0,0,0.08)",
                      }}
                    />
                  </div>
                  {/* Pin */}
                  <div
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50% 50% 50% 0",
                        background: "#3E5E85",
                        transform: "rotate(-45deg)",
                        boxShadow: "0 4px 16px rgba(62,94,133,0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MapPin
                        size={16}
                        color="white"
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "rgba(62,94,133,0.25)",
                        margin: "0 auto",
                        marginTop: "2px",
                      }}
                    />
                  </div>
                  {/* Open in maps overlay */}
                  <div
                    className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(26,36,51,0.15)" }}
                  >
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        background: "rgba(62,94,133,0.85)",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        backdropFilter: "blur(4px)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Open in Maps <ArrowRight size={10} />
                    </span>
                  </div>
                </a>

                {/* Address row */}
                <div
                  style={{
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EEF4FB",
                      border: "1px solid #CBDCEB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={16} style={{ color: "#3E5E85" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#111111",
                        fontSize: "0.875rem",
                      }}
                    >
                      GSTradeLink Store
                    </p>
                    <p
                      style={{
                        color: "#5C6B7B",
                        fontSize: "0.78rem",
                        marginTop: "2px",
                        lineHeight: 1.5,
                      }}
                    >
                      Bharatpur-3, Chitwan, Nepal
                    </p>
                    <a
                      href="https://maps.google.com/?q=Bharatpur+Chitwan+Nepal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 transition-colors hover:text-[#2B4D72]"
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#3E5E85",
                        textDecoration: "none",
                      }}
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

      {/* ═══════════════════════════════════════════════════════════
          DIRECT CONTACT STRIP  (phone + email inline)
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-8 sm:mt-10">
        <ScrollReveal direction="up" delay={0} distance={20}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Phone,
                badge: "Call us",
                title: "+977 9845541939",
                sub: "Landline · Mon–Sat 10 AM–6 PM",
                href: "tel:+9779845541939",
                iconBg: "#DCA963",
                btnLabel: "Call now",
                btnStyle: {
                  background: "#DCA963",
                  color: "#1A2433",
                } as React.CSSProperties,
              },
              {
                icon: Mail,
                badge: "Email",
                title: "gstradelinkngt@gmail.com",
                sub: "We reply within 24 hours",
                href: "mailto:gstradelinkngt@gmail.com",
                iconBg: "#3E5E85",
                btnLabel: "Send email",
                btnStyle: {
                  background: "#3E5E85",
                  color: "#ffffff",
                } as React.CSSProperties,
              },
            ].map(
              ({
                icon: Icon,
                badge,
                title,
                sub,
                href,
                iconBg,
                btnLabel,
                btnStyle,
              }) => (
                <div
                  key={badge}
                  className="group flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    padding: "20px 22px",
                    background: "#FFFFFF",
                    borderRadius: "6px",
                    border: "1px solid #CBDCEB",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      background: iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: `0 4px 14px ${iconBg}55`,
                    }}
                  >
                    <Icon size={20} color="white" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: "#8798AD",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {badge}
                    </p>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#111111",
                        fontSize: "clamp(0.82rem, 1.8vw, 0.95rem)",
                        marginTop: "2px",
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#8798AD",
                        marginTop: "2px",
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                  <a
                    href={href}
                    className="shrink-0 inline-flex items-center font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      ...btnStyle,
                      padding: "8px 16px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {btnLabel}
                  </a>
                </div>
              ),
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-8 sm:mt-10">
        <ScrollReveal direction="up" delay={0} distance={24}>
          <div
            className="relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1A2433 0%, #2B4D72 55%, #3E5E85 100%)",
              borderRadius: "8px",
              padding: "clamp(28px, 4vw, 52px) clamp(20px, 4vw, 48px)",
              boxShadow: "0 8px 32px rgba(26,36,51,0.22)",
            }}
          >
            {/* Decorative elements */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: 0,
                top: 0,
                width: "300px",
                height: "300px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "50%",
                transform: "translate(40%, -50%)",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                left: 0,
                bottom: 0,
                width: "220px",
                height: "220px",
                background: "rgba(220,169,99,0.07)",
                borderRadius: "50%",
                transform: "translate(-30%, 50%)",
              }}
            />
            <div
              className="absolute pointer-events-none hidden md:block"
              style={{
                right: "10%",
                bottom: "10%",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
              <div style={{ maxWidth: "480px" }}>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#93B2D6",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "10px",
                  }}
                >
                  Fastest response
                </p>
                <h2
                  className="font-bold text-white"
                  style={{
                    fontSize: "clamp(1.4rem, 3.5vw, 2.1rem)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                    marginBottom: "12px",
                  }}
                >
                  Ready to get a quote or book a service?
                </h2>
                <p
                  style={{
                    color: "#93B2D6",
                    fontSize: "clamp(0.82rem, 1.5vw, 0.9rem)",
                    lineHeight: 1.7,
                  }}
                >
                  We reply within a few hours. Share your requirement and
                  we&apos;ll recommend the right scale, repair plan, or spare
                  part.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <a
                  href={`${WA_BASE}${encodeURIComponent("Hello GSTradeLink! I'd like to get a quote.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    padding: "13px 28px",
                    borderRadius: "4px",
                    background: "#25D366",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 18px rgba(37,211,102,0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <MessageCircle size={17} fill="white" /> Chat on WhatsApp
                </a>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    padding: "13px 28px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.18)",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
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
