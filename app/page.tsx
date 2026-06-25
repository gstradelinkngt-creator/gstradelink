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
    bg: "#1B2A3F",
    desc: "High accuracy up to 0.001g",
  },
  "Kitchen & Compact Tabletop Scales": {
    label: "Kitchen Scales",
    emoji: "🥗",
    bg: "#2A2418",
    desc: "For homes & bakeries",
  },
  "Portable & Luggage Scales": {
    label: "Luggage Scales",
    emoji: "🧳",
    bg: "#16271F",
    desc: "Travel & handheld",
  },
  "Heavy-Duty Hanging & Crane Scales": {
    label: "Crane & Industrial",
    emoji: "🏗️",
    bg: "#2A1F18",
    desc: "Heavy-duty platforms",
  },
  "Personal Health & Bathroom Scales": {
    label: "Health & Baby",
    emoji: "👶",
    bg: "#1B2A3F",
    desc: "Personal weighing",
  },
  "Packaging & Miscellaneous Equipment": {
    label: "Packaging Equip",
    emoji: "📦",
    bg: "#241B33",
    desc: "Sealers & blowers",
  },
};

const TRUST_ITEMS = [
  { Icon: Shield, label: "Authorized dealer" },
  { Icon: Wrench, label: "Expert repair" },
  { Icon: CheckCircle, label: "OIML calibration" },
];

const STATS = [
  { value: "500+", label: "Happy Customers", sub: "Businesses served", Icon: Users },
  { value: "8+", label: "Years Experience", sub: "In Bharatpur since 2015", Icon: Award },
  { value: "24h", label: "Response Time", sub: "Fast on-site service", Icon: Zap },
];

const WHY_US = [
  {
    icon: Wrench,
    title: "Expert Repair",
    desc: "All major brands serviced by certified technicians with years of hands-on experience.",
    tint: "#6D94C5",
  },
  {
    icon: Shield,
    title: "Genuine Parts",
    desc: "Authorized distributor stocking only original, manufacturer-approved spare parts.",
    tint: "#DCA963",
  },
  {
    icon: CheckCircle,
    title: "OIML Calibration",
    desc: "Govt-recognized calibration certificates accepted by legal & commercial authorities.",
    tint: "#6D94C5",
  },
  {
    icon: Clock,
    title: "24h Response",
    desc: "Fast on-site service across all of Chitwan — we come to you when you need us most.",
    tint: "#DCA963",
  },
  {
    icon: Star,
    title: "500+ Customers",
    desc: "Serving retail shops, factories, and institutions across Chitwan since 2015.",
    tint: "#6D94C5",
  },
  {
    icon: MapPin,
    title: "Walk-in Store",
    desc: "Visit us at Bharatpur-3, Chitwan — showroom open Sun–Sat (except Mon), 10 AM – 6 PM.",
    tint: "#DCA963",
  },
];

const WA = "https://wa.me/9779845541939";

export default async function Home() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="aurora min-h-screen w-full overflow-hidden">
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="aurora-grid relative overflow-hidden">
        {/* Glow orbs */}
        <div
          className="aurora-orb aurora-orb--blue"
          style={{ width: 420, height: 420, top: -140, left: -100 }}
        />
        <div
          className="aurora-orb aurora-orb--gold"
          style={{ width: 360, height: 360, top: 20, right: -120 }}
        />
        <div
          className="aurora-orb aurora-orb--deep"
          style={{ width: 520, height: 520, bottom: -260, left: "28%" }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* Content */}
            <div className="text-center lg:text-left">
              <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium sm:text-sm">
                <CheckCircle size={14} style={{ color: "#DCA963" }} />
                <span className="text-white/90">
                  Trusted Since 2015 · Bharatpur, Chitwan
                </span>
              </span>

              <h1
                className="mb-5 font-bold tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.08 }}
              >
                <span className="text-white">Professional </span>
                <span className="text-gradient-gold">Weighing</span>
                <br className="hidden sm:block" />
                <span className="text-white"> Solutions in </span>
                <span className="text-aurora">Chitwan</span>
              </h1>

              <p
                className="mx-auto mb-8 max-w-xl lg:mx-0"
                style={{
                  color: "#AECAE9",
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  lineHeight: 1.7,
                }}
              >
                Authorized dealer for digital scales &amp; beam balances. Expert
                repair services and genuine spare parts in Bharatpur.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/products"
                  className="ui-btn ui-btn-lg btn-gold w-full sm:w-auto"
                >
                  Shop Products <ArrowRight size={16} />
                </Link>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-lg btn-glass w-full sm:w-auto"
                >
                  <MessageCircle size={16} fill="white" /> WhatsApp Us
                </a>
              </div>

              {/* Mini trust row */}
              <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
                {TRUST_ITEMS.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 text-sm"
                    style={{ color: "#93B2D6" }}
                  >
                    <Icon size={15} style={{ color: "#DCA963" }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Focal glass visual (desktop) */}
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="relative w-full max-w-sm">
                <div className="glass-strong animate-glass-float relative flex aspect-square items-center justify-center rounded-[2.5rem]">
                  <div className="glow-blue flex h-36 w-36 items-center justify-center rounded-3xl" style={{ background: "linear-gradient(135deg,#3E5E85,#2B4D72)" }}>
                    <svg
                      className="h-20 w-20 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.4}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75C6.583 21.58 5 22.328 5 23.25v.75c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75v-.75c0-.922-1.583-1.67-2.815-2.25C15.882 20.515 14.472 20.25 13 20.25H12zM12 3L8.25 8.25h7.5L12 3z"
                      />
                    </svg>
                  </div>

                  {/* Floating verified badge */}
                  <div className="glass-gold absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl">
                    <CheckCircle size={26} style={{ color: "#DCA963" }} />
                  </div>
                  {/* Floating location badge */}
                  <div className="glass absolute -bottom-3 -left-3 flex h-12 w-12 items-center justify-center rounded-2xl">
                    <MapPin size={20} style={{ color: "#AECAE9" }} />
                  </div>
                </div>

                {/* Open-status info chip */}
                <div className="glass absolute -bottom-5 left-6 right-6 flex items-center gap-3 rounded-2xl px-5 py-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-sm font-semibold text-white">
                    Precision you can trust
                  </span>
                  <span className="ml-auto text-xs" style={{ color: "#93B2D6" }}>
                    Mon–Sat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS STRIP ═══════════════════════════ */}
      <section className="relative z-20 mx-auto -mt-6 w-full max-w-5xl px-5 sm:px-8 sm:-mt-10">
        <div className="glass-strong grid grid-cols-3 overflow-hidden rounded-3xl">
          {STATS.map(({ value, label, sub, Icon }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center gap-1.5 px-2 py-6 text-center sm:px-4 sm:py-8 ${
                i < 2 ? "border-r border-white/10" : ""
              }`}
            >
              <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 sm:h-11 sm:w-11" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon size={16} style={{ color: "#DCA963" }} />
              </span>
              <span
                className="font-extrabold leading-none text-white"
                style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)" }}
              >
                {value}
              </span>
              <span
                className="font-semibold leading-tight"
                style={{ fontSize: "clamp(0.62rem, 1.5vw, 0.85rem)", color: "#AECAE9" }}
              >
                {label}
              </span>
              <span className="hidden text-[0.68rem] leading-tight sm:block" style={{ color: "#7E93AB" }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ CATEGORIES ═══════════════════════════ */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" delay={0} distance={24}>
            <div className="mb-10 text-center sm:mb-12">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#DCA963" }}>
                What We Offer
              </p>
              <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                Browse by Category
              </h2>
              <p className="mx-auto mt-3 max-w-md" style={{ color: "#AECAE9", fontSize: "0.9rem", lineHeight: 1.6 }}>
                From retail counters to heavy-duty industrial platforms — we have
                it all.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative w-full py-2">
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
                    className="glass glass-hover group relative block shrink-0 overflow-hidden rounded-2xl"
                    style={{
                      width: "calc(100vw / 2.2)",
                      maxWidth: "280px",
                      aspectRatio: "3/4",
                    }}
                  >
                    {product?.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={meta.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(8,15,24,0.94) 0%, rgba(8,15,24,0.3) 50%, transparent 100%)",
                      }}
                    />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <span
                        className="block font-bold text-white"
                        style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", lineHeight: 1.3 }}
                      >
                        {meta.label}
                      </span>
                      <span
                        className="mt-0.5 block"
                        style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}
                      >
                        {meta.desc}
                      </span>
                      <span
                        className="mt-2 inline-flex items-center gap-1 font-bold"
                        style={{ color: "#DCA963", fontSize: "0.72rem" }}
                      >
                        View all <ChevronRight size={11} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </InteractiveMarquee>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs" style={{ color: "#7E93AB" }}>
              <span className="inline-block h-0.5 w-8 rounded-full bg-white/15" />
              <span>Drag to explore or wait for auto-scroll</span>
              <span className="inline-block h-0.5 w-8 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ FEATURED PRODUCTS ════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <ScrollReveal direction="up" delay={0} distance={24}>
              <div className="mb-10 flex flex-col justify-between gap-3 sm:mb-12 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#DCA963" }}>
                    Top Picks
                  </p>
                  <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                    Featured Products
                  </h2>
                  <p className="mt-1.5" style={{ color: "#AECAE9", fontSize: "0.875rem" }}>
                    Our most popular weighing equipment
                  </p>
                </div>
                <Link
                  href="/products"
                  className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold"
                  style={{ color: "#DCA963" }}
                >
                  Browse all products
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={60} distance={20}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
                {featuredProducts.map((product) => {
                  const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
                  const waLink = `${WA}?text=${encodeURIComponent(waMsg)}`;
                  return (
                    <div
                      key={product.id}
                      className="glass glass-hover ui-card group rounded-2xl"
                    >
                      <Link
                        href={`/products/${product.id}`}
                        className="ui-media ui-media-4-3 block"
                        style={{ background: "rgba(255,255,255,0.04)" }}
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
                          <div className="flex h-full w-full items-center justify-center text-4xl">
                            ⚖️
                          </div>
                        )}
                        <span className="glass-subtle absolute left-2.5 top-2.5 rounded-full px-2 py-1 text-[9px] font-bold tracking-wide text-white">
                          {product.category}
                        </span>
                      </Link>

                      <div className="ui-card-body p-3.5">
                        <Link href={`/products/${product.id}`}>
                          <h3
                            className="mb-1 line-clamp-2 font-semibold text-white transition-colors group-hover:text-[#DCA963]"
                            style={{ fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)", lineHeight: 1.4 }}
                          >
                            {product.name}
                          </h3>
                        </Link>
                        {product.short_description && (
                          <p className="line-clamp-1" style={{ color: "#8FA6C2", fontSize: "0.72rem" }}>
                            {product.short_description}
                          </p>
                        )}
                        <div className="mt-auto flex gap-2 pt-3">
                          <Link
                            href={`/products/${product.id}`}
                            className="ui-btn ui-btn-sm btn-glass flex-1"
                          >
                            Details
                          </Link>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ui-btn ui-btn-sm btn-gold flex-1"
                          >
                            <MessageCircle size={12} fill="currentColor" /> Enquire
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0} distance={16}>
              <div className="mt-10 text-center">
                <Link
                  href="/products"
                  className="ui-btn ui-btn-lg btn-glass"
                >
                  View All Products <ArrowRight size={15} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════ WHY CHOOSE US ═══════════════════════════ */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <ScrollReveal direction="up" delay={0} distance={24}>
            <div className="mb-10 text-center sm:mb-14">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#DCA963" }}>
                Our Strengths
              </p>
              <h2 className="font-bold text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                Why Choose GSTradeLink?
              </h2>
              <p className="mx-auto mt-3 max-w-md" style={{ color: "#AECAE9", fontSize: "0.9rem", lineHeight: 1.6 }}>
                8+ years of weighing expertise in Bharatpur — built on trust,
                quality, and service.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80} distance={20}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {WHY_US.map(({ icon: Icon, title, desc, tint }) => (
                <div
                  key={title}
                  className="glass glass-hover ui-card group rounded-2xl p-6 sm:p-7"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
                    style={{
                      background: `${tint}26`,
                      border: `1px solid ${tint}55`,
                    }}
                  >
                    <Icon size={22} style={{ color: tint }} />
                  </div>
                  <h3 className="mb-1.5 font-bold text-white" style={{ fontSize: "1rem" }}>
                    {title}
                  </h3>
                  <p style={{ color: "#AECAE9", fontSize: "0.875rem", lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════ FINAL CTA ═══════════════════════════ */}
      <section className="relative px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
        <ScrollReveal direction="up" delay={0} distance={28}>
          <div className="glass-strong relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              className="aurora-orb aurora-orb--gold"
              style={{ width: 280, height: 280, top: -120, right: -60, opacity: 0.5 }}
            />
            <div
              className="aurora-orb aurora-orb--blue"
              style={{ width: 260, height: 260, bottom: -140, left: -60, opacity: 0.5 }}
            />
            <div className="relative z-10 mx-auto max-w-xl">
              <span className="glass-gold mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: "#F2D89A" }}>
                <MessageCircle size={12} fill="currentColor" /> Quick Response Guaranteed
              </span>
              <h2 className="mb-3 font-bold text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                Ready to get a quote?
              </h2>
              <p className="mb-9" style={{ color: "#AECAE9", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Message us on WhatsApp — we respond within 24 hours and deliver
                across all of Chitwan.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-lg w-full text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg,#25D366,#128C7E)",
                    boxShadow: "0 10px 30px -8px rgba(37,211,102,0.55)",
                  }}
                >
                  <MessageCircle size={17} fill="white" /> Chat on WhatsApp
                </a>
                <a
                  href="tel:+9779845541939"
                  className="ui-btn ui-btn-lg btn-glass w-full sm:w-auto"
                >
                  <Phone size={15} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
