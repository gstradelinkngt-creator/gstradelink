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
    })
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
  { label: string; emoji: string; desc: string }
> = {
  "Precision & Pocket Mini Scales": {
    label: "Precision Scales",
    emoji: "💎",
    desc: "High accuracy up to 0.001g",
  },
  "Kitchen & Compact Tabletop Scales": {
    label: "Kitchen Scales",
    emoji: "🥗",
    desc: "For homes & bakeries",
  },
  "Portable & Luggage Scales": {
    label: "Luggage Scales",
    emoji: "🧳",
    desc: "Travel & handheld",
  },
  "Heavy-Duty Hanging & Crane Scales": {
    label: "Crane & Industrial",
    emoji: "🏗️",
    desc: "Heavy-duty platforms",
  },
  "Personal Health & Bathroom Scales": {
    label: "Health & Baby",
    emoji: "👶",
    desc: "Personal weighing",
  },
  "Packaging & Miscellaneous Equipment": {
    label: "Packaging Equip",
    emoji: "📦",
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
  },
  {
    icon: Shield,
    title: "Genuine Parts",
    desc: "Authorized distributor stocking only original, manufacturer-approved spare parts.",
  },
  {
    icon: CheckCircle,
    title: "OIML Calibration",
    desc: "Govt-recognized calibration certificates accepted by legal & commercial authorities.",
  },
  {
    icon: Clock,
    title: "24h Response",
    desc: "Fast on-site service across all of Chitwan — we come to you when you need us most.",
  },
  {
    icon: Star,
    title: "500+ Customers",
    desc: "Serving retail shops, factories, and institutions across Chitwan since 2015.",
  },
  {
    icon: MapPin,
    title: "Walk-in Store",
    desc: "Visit us at Bharatpur-3, Chitwan — showroom open Sun–Sat (except Mon), 10 AM – 6 PM.",
  },
];

const WA = "https://wa.me/9779845541939";

export default async function Home() {
  const [featuredCategories, featuredProducts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-hidden">
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-900">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left flex flex-col space-y-6">
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium sm:text-sm bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle size={14} className="text-amber-500" />
                  <span>Trusted Since 2015 · Bharatpur, Chitwan</span>
                </span>
              </div>

              <h1
                className="font-bold tracking-tight text-slate-50"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.1 }}
              >
                <span>Professional </span>
                <span className="text-amber-500">Weighing</span>
                <br className="hidden sm:block" />
                <span> Solutions in </span>
                <span className="text-amber-500">Chitwan</span>
              </h1>

              <p
                className="mx-auto max-w-xl lg:mx-0 text-slate-400"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  lineHeight: 1.7,
                }}
              >
                Authorized dealer for digital scales &amp; beam balances. Expert
                repair services and genuine spare parts in Bharatpur.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start pt-6">
                <Link
                  href="/products"
                  className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-semibold px-6 py-3.5 rounded-lg transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Shop Products <ArrowRight size={18} />
                </Link>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium px-6 py-3.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>

              {/* Mini trust row */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4 lg:justify-start pt-6 border-t border-slate-800/60 max-w-xl mx-auto lg:mx-0 w-full">
                {TRUST_ITEMS.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 text-sm text-slate-400 font-medium"
                  >
                    <Icon size={16} className="text-amber-500 shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Focal visual (desktop) */}
            <div className="relative hidden items-center justify-center lg:flex z-10">
              <div className="relative w-full max-w-sm">
                <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-8 z-10">
                  <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-inner">
                    <svg
                      className="h-20 w-20 text-slate-300"
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
                </div>

                {/* Trust info chip */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl px-5 py-4 bg-slate-900 border border-slate-800 shadow-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse shrink-0" />
                  <span className="text-sm font-semibold text-slate-50 truncate">
                    Precision you can trust
                  </span>
                  <span className="ml-auto text-xs font-medium text-slate-400 shrink-0">
                    Mon–Sat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS STRIP ═══════════════════════════ */}
      <section className="block w-full relative z-20 bg-slate-950">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-2xl shadow-lg divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {STATS.map(({ value, label, sub, Icon }, i) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center sm:px-6 sm:py-10"
            >
              <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700 sm:h-14 sm:w-14">
                <Icon size={20} className="text-amber-500 shrink-0" />
              </span>
              <span
                className="font-extrabold text-slate-50 leading-none"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                {value}
              </span>
              <span
                className="font-semibold text-slate-300 leading-tight"
                style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
              >
                {label}
              </span>
              <span className="text-[0.8rem] font-medium text-slate-500">
                {sub}
              </span>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CATEGORIES ═══════════════════════════ */}
      <section className="block w-full py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0} distance={24}>
            <div className="mb-12 text-center flex flex-col space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                What We Offer
              </p>
              <h2 className="font-bold text-slate-50" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                Browse by Category
              </h2>
              <p className="mx-auto max-w-md text-slate-400 text-base">
                From retail counters to heavy-duty industrial platforms — we have
                it all.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative w-full">
            <InteractiveMarquee
              speed={35}
              gap={24}
              pauseOnInteractionDuration={3000}
              className="py-4 px-2"
            >
              {featuredCategories.map(({ category, product }, idx) => {
                const meta = CATEGORY_META[category];
                return (
                  <Link
                    key={`${category}-${idx}`}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block shrink-0 rounded-2xl bg-slate-900 border border-slate-800 p-5 transition-colors hover:border-slate-700 w-[260px] group"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-slate-800 relative mb-5 flex items-center justify-center p-4">
                      {product?.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={meta.label}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                          sizes="260px"
                        />
                      ) : (
                        <div className="text-5xl">
                          {meta.emoji}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-50 text-base mb-1 line-clamp-1">
                        {meta.label}
                      </span>
                      <span className="text-slate-400 text-sm line-clamp-1">
                        {meta.desc}
                      </span>
                      <span className="mt-3 flex items-center gap-1 font-semibold text-amber-500 text-sm">
                        View all <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </InteractiveMarquee>

            <div className="mt-6 flex items-center justify-center gap-3 text-xs font-medium text-slate-500">
              <span className="inline-block h-px w-8 bg-slate-800" />
              <span>Drag to explore</span>
              <span className="inline-block h-px w-8 bg-slate-800" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ FEATURED PRODUCTS ════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="block w-full py-16 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" delay={0} distance={24}>
              <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                    Top Picks
                  </p>
                  <h2 className="font-bold text-slate-50" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                    Featured Products
                  </h2>
                  <p className="text-slate-400 text-base">
                    Our most popular weighing equipment
                  </p>
                </div>
                <Link
                  href="/products"
                  className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Browse all products
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={60} distance={20}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.map((product) => {
                  const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
                  const waLink = `${WA}?text=${encodeURIComponent(waMsg)}`;
                  return (
                    <div
                      key={product.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col group transition-colors hover:border-slate-700"
                    >
                      <Link
                        href={`/products/${product.id}`}
                        className="aspect-square overflow-hidden rounded-lg bg-slate-800 relative mb-5 block"
                      >
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl">
                            ⚖️
                          </div>
                        )}
                        <span className="absolute left-3 top-3 max-w-[85%] rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-md uppercase truncate">
                          {product.category}
                        </span>
                      </Link>

                      <div className="flex flex-col flex-1 mt-2">
                        <Link href={`/products/${product.id}`} className="mb-2">
                          <h3 className="line-clamp-2 font-bold text-slate-50 transition-colors group-hover:text-amber-500 text-lg">
                            {product.name}
                          </h3>
                        </Link>
                        {product.short_description && (
                          <p className="line-clamp-3 text-slate-400 text-sm mb-6">
                            {product.short_description}
                          </p>
                        )}
                        <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
                          <Link
                            href={`/products/${product.id}`}
                            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium px-4 py-2.5 rounded-lg flex items-center justify-center text-sm transition-colors text-center"
                          >
                            Details
                          </Link>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-semibold px-4 py-2.5 rounded-lg flex justify-center items-center gap-1.5 text-sm transition-colors shadow-sm text-center"
                          >
                            <MessageCircle size={15} className="shrink-0" /> Enquire
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════ WHY CHOOSE US ═══════════════════════════ */}
      <section className="block w-full py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0} distance={24}>
            <div className="mb-12 text-center flex flex-col space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                Our Strengths
              </p>
              <h2 className="font-bold text-slate-50" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}>
                Why Choose GSTradeLink?
              </h2>
              <p className="mx-auto max-w-md text-slate-400 text-base">
                8+ years of weighing expertise in Bharatpur — built on trust,
                quality, and service.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80} distance={20}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_US.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-start"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-amber-500 shrink-0">
                    <Icon size={24} className="shrink-0" />
                  </div>
                  <h3 className="mb-2 font-bold text-slate-50 text-lg">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════ FINAL CTA ═══════════════════════════ */}
      <section className="block w-full py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0} distance={28}>
            <div className="mx-auto w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-16 text-center shadow-xl">
              <div className="mx-auto max-w-xl flex flex-col items-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-slate-800 border border-slate-700 text-amber-500">
                <MessageCircle size={14} /> Quick Response Guaranteed
              </span>
              <h2 className="mb-4 font-bold text-slate-50" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                Ready to get a quote?
              </h2>
              <p className="mb-10 text-slate-400 text-base sm:text-lg max-w-md mx-auto">
                Message us on WhatsApp — we respond within 24 hours and deliver
                across all of Chitwan.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-auto sm:flex-row mt-4">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2.5 w-full sm:w-auto shadow-sm transition-colors"
                >
                  <MessageCircle size={20} className="shrink-0" /> Chat on WhatsApp
                </a>
                <a
                  href="tel:+9779845541939"
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2.5 w-full sm:w-auto transition-colors"
                >
                  <Phone size={18} className="shrink-0" /> Call Now
                </a>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
