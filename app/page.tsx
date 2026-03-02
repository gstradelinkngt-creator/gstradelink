import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Wrench,
  Shield,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  MessageCircle,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { InteractiveMarquee } from "@/components/ui/InteractiveMarquee";

export const revalidate = 60;

async function getFeaturedCategories() {
  const supabase = await createClient();
  const categories = [
    "Precision & Pocket Mini Scales",
    "Kitchen & Compact Tabletop Scales",
    "Portable & Luggage Scales",
    "Heavy-Duty Hanging & Crane Scales",
    "Personal Health & Bathroom Scales",
    "Packaging & Miscellaneous Equipment",
  ] as const;
  const results = await Promise.all(
    categories.map(async (cat) => {
      const { data } = await supabase
        .from("products")
        .select("id, name, category, image_url")
        .eq("category", cat)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      return { category: cat, product: data };
    }),
  );
  return results;
}

async function getFeaturedProducts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, short_description, category, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

const CATEGORY_META: Record<
  string,
  { label: string; emoji: string; bg: string; desc: string }
> = {
  "Precision & Pocket Mini Scales": {
    label: "Precision Scales",
    emoji: "💎",
    bg: "#EEF4FB",
    desc: "High accuracy up to 0.001g",
  },
  "Kitchen & Compact Tabletop Scales": {
    label: "Kitchen Scales",
    emoji: "🥗",
    bg: "#FFFBF0",
    desc: "For homes & bakeries",
  },
  "Portable & Luggage Scales": {
    label: "Luggage Scales",
    emoji: "🧳",
    bg: "#F0F7F0",
    desc: "Travel & handheld",
  },
  "Heavy-Duty Hanging & Crane Scales": {
    label: "Crane & Industrial",
    emoji: "🏗️",
    bg: "#FFF5EE",
    desc: "Heavy-duty platforms",
  },
  "Personal Health & Bathroom Scales": {
    label: "Health & Baby",
    emoji: "👶",
    bg: "#EEF4FB",
    desc: "Personal weighing",
  },
  "Packaging & Miscellaneous Equipment": {
    label: "Packaging Equip",
    emoji: "📦",
    bg: "#F5F0FF",
    desc: "Sealers & blowers",
  },
};

export default async function Home() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#E8EBE3" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2B4D72 0%, #3E5E85 60%, #4A6E99 100%)",
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Dot-grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='4' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            opacity: 0.06,
          }}
        />
        {/* Decorative glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: 0,
            top: 0,
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(230,240,250,0.15) 0%, transparent 70%)",
            transform: "translate(30%, -40%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            bottom: 0,
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle, rgba(203,220,235,0.1) 0%, transparent 70%)",
            transform: "translate(-30%, 40%)",
          }}
        />

        <div
          className="relative z-10 w-full px-5 sm:px-8 py-16 sm:py-20"
          style={{ maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            style={{
              padding: "6px 16px",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.20)",
            }}
          >
            <CheckCircle
              size={13}
              style={{ color: "#DCA963", flexShrink: 0 }}
            />
            <span>Trusted Since 2015 • Bharatpur, Chitwan</span>
          </div>

          <h1
            className="font-bold text-white mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Professional <span style={{ color: "#DCA963" }}>Weighing</span>{" "}
            Solutions in Chitwan
          </h1>

          <p
            className="mb-10"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "#E6F0FA",
              lineHeight: 1.7,
              maxWidth: "36rem",
              margin: "0 auto 2.5rem",
            }}
          >
            Authorized dealer for digital scales &amp; beam balances. Expert
            repair services and genuine spare parts in Bharatpur.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              href="/products"
              className="hover:-translate-y-0.5 transition-all"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 28px",
                borderRadius: "4px",
                background: "#FFFFFF",
                color: "#3E5E85",
                fontWeight: 700,
                fontSize: "0.9rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                textDecoration: "none",
              }}
            >
              Shop Products <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/9779765662427"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:-translate-y-0.5 transition-all"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 28px",
                borderRadius: "4px",
                background: "#25D366",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} fill="white" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section
        style={{
          background: "#1A2433",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 16px" }}>
          <div className="grid grid-cols-3">
            {[
              {
                value: "500+",
                label: "Happy Customers",
                sub: "Businesses served",
                Icon: Users,
              },
              {
                value: "8+",
                label: "Years Experience",
                sub: "In Bharatpur since 2015",
                Icon: Award,
              },
              {
                value: "24h",
                label: "Response Time",
                sub: "Fast on-site service",
                Icon: Zap,
              },
            ].map(({ value, label, sub, Icon }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(20px, 4vw, 36px) clamp(8px, 2vw, 16px)",
                  textAlign: "center",
                  borderRight:
                    i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "clamp(32px, 5vw, 44px)",
                    height: "clamp(32px, 5vw, 44px)",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "4px",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} style={{ color: "#CBDCEB" }} />
                </div>
                <div
                  style={{
                    fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.62rem, 1.5vw, 0.85rem)",
                    fontWeight: 600,
                    color: "#93B2D6",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </div>
                <div
                  className="hidden sm:block"
                  style={{
                    fontSize: "0.68rem",
                    color: "#5C6B7B",
                    lineHeight: 1.3,
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: "#F0F2EE" }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto">
          <ScrollReveal direction="up" delay={0} distance={24}>
            <div className="text-center mb-10 sm:mb-12">
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#557BAA",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}
              >
                What We Offer
              </p>
              <h2
                className="font-bold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                  color: "#111111",
                  letterSpacing: "-0.025em",
                }}
              >
                Browse by Category
              </h2>
              <p
                style={{
                  color: "#5C6B7B",
                  fontSize: "0.9rem",
                  maxWidth: "28rem",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                From retail counters to heavy-duty industrial platforms — we
                have it all.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative w-full py-4">
            <InteractiveMarquee
              speed={35}
              gap={20}
              pauseOnInteractionDuration={3000}
              className="py-2"
            >
              {featuredCategories.map(({ category, product }, idx) => {
                const meta = CATEGORY_META[category];
                return (
                  <Link
                    key={`${category}-${idx}`}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="relative shrink-0 overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                    style={{
                      width: "calc(100vw / 2.2)", // Mobile: show ~2 cards
                      maxWidth: "280px", // Desktop: fixed sensible width
                      borderRadius: "4px",
                      aspectRatio: "3/4",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      display: "block",
                    }}
                  >
                    {product?.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={meta.label}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-5xl"
                        style={{ background: meta.bg }}
                      >
                        {meta.emoji}
                      </div>
                    )}
                    {/* gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(26,36,51,0.92) 0%, rgba(26,36,51,0.25) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
                      <span
                        className="text-white font-bold block"
                        style={{
                          fontSize: "clamp(0.8rem, 2vw, 1rem)",
                          lineHeight: 1.3,
                        }}
                      >
                        {meta.label}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.65)",
                          fontSize: "0.72rem",
                          display: "block",
                          marginTop: "3px",
                        }}
                      >
                        {meta.desc}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          marginTop: "8px",
                          color: "#DCA963",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        View all <ChevronRight size={11} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </InteractiveMarquee>

            {/* Hint for users */}
            <div
              className="flex items-center justify-center gap-2 mt-4 text-xs"
              style={{ color: "#8798AD" }}
            >
              <span
                className="inline-block w-8 h-0.5 rounded-full"
                style={{ background: "#CBDCEB" }}
              />
              <span>Drag to explore or wait for auto-scroll</span>
              <span
                className="inline-block w-8 h-0.5 rounded-full"
                style={{ background: "#CBDCEB" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-24" style={{ background: "#E8EBE3" }}>
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto">
            {/* Section header */}
            <ScrollReveal direction="up" delay={0} distance={24}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 sm:mb-12">
                <div>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#557BAA",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    Top Picks
                  </p>
                  <h2
                    className="font-bold"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                      color: "#111111",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Featured Products
                  </h2>
                  <p
                    style={{
                      color: "#5C6B7B",
                      fontSize: "0.875rem",
                      marginTop: "6px",
                    }}
                  >
                    Our most popular weighing equipment
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 group shrink-0"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#557BAA",
                    textDecoration: "none",
                  }}
                >
                  Browse all products{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={60} distance={20}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                {featuredProducts.map((product) => {
                  const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
                  const waLink = `https://wa.me/9779765662427?text=${encodeURIComponent(waMsg)}`;
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "4px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        border: "1px solid #CBDCEB",
                      }}
                    >
                      {/* Product image */}
                      <Link
                        href={`/products/${product.id}`}
                        className="block relative"
                        style={{
                          aspectRatio: "4/3",
                          background: "#EEF4FB",
                          overflow: "hidden",
                        }}
                      >
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, 33vw"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              fontSize: "2.5rem",
                              background: "#EEF4FB",
                            }}
                          >
                            ⚖️
                          </div>
                        )}
                        {/* Category badge */}
                        <div
                          className="absolute top-2.5 left-2.5"
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            background: "rgba(62,94,133,0.85)",
                            color: "#ffffff",
                            backdropFilter: "blur(4px)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {product.category}
                        </div>
                      </Link>

                      {/* Product info */}
                      <div
                        className="flex flex-col flex-1"
                        style={{ padding: "14px 14px 14px" }}
                      >
                        <Link
                          href={`/products/${product.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <h3
                            className="font-semibold line-clamp-2 hover:text-primary-600 transition-colors"
                            style={{
                              fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
                              color: "#111111",
                              lineHeight: 1.4,
                              marginBottom: "4px",
                            }}
                          >
                            {product.name}
                          </h3>
                        </Link>
                        {product.short_description && (
                          <p
                            className="line-clamp-1"
                            style={{
                              color: "#AAAAAA",
                              fontSize: "0.72rem",
                              marginBottom: "10px",
                            }}
                          >
                            {product.short_description}
                          </p>
                        )}
                        <div className="mt-auto flex gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "8px 0",
                              borderRadius: "4px",
                              border: "1.5px solid #CBDCEB",
                              color: "#3E5E85",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              textDecoration: "none",
                              background: "transparent",
                              transition: "all 0.15s",
                            }}
                          >
                            Details
                          </Link>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "5px",
                              padding: "8px 0",
                              borderRadius: "4px",
                              background: "#3E5E85",
                              color: "#ffffff",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              textDecoration: "none",
                              transition: "all 0.15s",
                            }}
                          >
                            <MessageCircle size={12} fill="white" /> Enquire
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* View all CTA */}
            <ScrollReveal direction="up" delay={0} distance={16}>
              <div className="mt-10 text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
                  style={{
                    padding: "13px 32px",
                    borderRadius: "4px",
                    background: "#3E5E85",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(62,94,133,0.25)",
                  }}
                >
                  View All Products <ArrowRight size={15} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: "#F0F2EE" }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto">
          <ScrollReveal direction="up" delay={0} distance={24}>
            <div className="text-center mb-10 sm:mb-14">
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#557BAA",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}
              >
                Our Strengths
              </p>
              <h2
                className="font-bold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                  color: "#111111",
                  letterSpacing: "-0.025em",
                }}
              >
                Why Choose GSTradeLink?
              </h2>
              <p
                style={{
                  color: "#5C6B7B",
                  fontSize: "0.9rem",
                  maxWidth: "28rem",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                8+ years of weighing expertise in Bharatpur — built on trust,
                quality, and service.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80} distance={20}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[
                {
                  icon: Wrench,
                  title: "Expert Repair",
                  desc: "All major brands serviced by certified technicians with years of hands-on experience.",
                  iconBg: "#3E5E85",
                  cardBorder: "#CBDCEB",
                },
                {
                  icon: Shield,
                  title: "Genuine Parts",
                  desc: "Authorized distributor stocking only original, manufacturer-approved spare parts.",
                  iconBg: "#DCA963",
                  cardBorder: "#E8DFCA",
                },
                {
                  icon: CheckCircle,
                  title: "OIML Calibration",
                  desc: "Govt-recognized calibration certificates accepted by legal & commercial authorities.",
                  iconBg: "#1A2433",
                  cardBorder: "#CBDCEB",
                },
                {
                  icon: Clock,
                  title: "24h Response",
                  desc: "Fast on-site service across all of Chitwan — we come to you when you need us most.",
                  iconBg: "#557BAA",
                  cardBorder: "#CBDCEB",
                },
                {
                  icon: Star,
                  title: "500+ Customers",
                  desc: "Serving retail shops, factories, and institutions across Chitwan since 2015.",
                  iconBg: "#C28D44",
                  cardBorder: "#E8DFCA",
                },
                {
                  icon: MapPin,
                  title: "Walk-in Store",
                  desc: "Visit us at Bharatpur-10, Chitwan — showroom open Mon to Sat, 10 AM – 6 PM.",
                  iconBg: "#3E5E85",
                  cardBorder: "#CBDCEB",
                },
              ].map(({ icon: Icon, title, desc, iconBg, cardBorder }) => (
                <div
                  key={title}
                  className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
                  style={{
                    padding: "24px 28px",
                    background: "#FFFFFF",
                    borderRadius: "4px",
                    border: `1px solid ${cardBorder}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="group-hover:scale-105 transition-transform"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: iconBg,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: "#111111",
                      fontSize: "1rem",
                      marginBottom: "6px",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: "#5C6B7B",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: "#1A2433" }}
      >
        {/* Decorative blobs */}
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
            width: "250px",
            height: "250px",
            background: "rgba(242,192,71,0.08)",
            borderRadius: "50%",
            transform: "translate(-30%, 50%)",
          }}
        />

        <ScrollReveal direction="up" delay={0} distance={28}>
          <div
            className="relative z-10 text-center"
            style={{ maxWidth: "36rem", margin: "0 auto", padding: "0 20px" }}
          >
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                padding: "6px 16px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "0.72rem",
                color: "#ffffff",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <MessageCircle size={12} fill="white" /> Quick Response Guaranteed
            </div>
            <h2
              className="font-bold text-white mb-3"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Ready to get a quote?
            </h2>
            <p
              style={{
                color: "#AECAE9",
                fontSize: "0.9rem",
                marginBottom: "36px",
                lineHeight: 1.7,
              }}
            >
              Message us on WhatsApp — we respond within 24 hours and deliver
              across all of Chitwan.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href="https://wa.me/9779765662427"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-0.5 transition-all"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "4px",
                  background: "#25D366",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                }}
              >
                <MessageCircle size={17} fill="white" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+9779765662427"
                className="hover:-translate-y-0.5 transition-all"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
