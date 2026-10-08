import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCT_CATEGORIES, CATEGORY_ADMIN_LABELS, type ProductCategory } from "@/lib/categories";
import { SITE } from "@/lib/site";
import { HoursTable } from "@/components/site/HoursTable";
import type { Product } from "@/types";

export const revalidate = 60;

type HomeProduct = Pick<Product, "id" | "name" | "short_description" | "category" | "image_url">;

async function getProducts(): Promise<HomeProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, short_description, category, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) console.error("Error fetching products:", error);
  return (data ?? []) as HomeProduct[];
}

const CATEGORY_BLURB: Record<ProductCategory, string> = {
  "Precision & Pocket Mini Scales": "Jewellery, lab and pocket scales down to 0.001 g",
  "Kitchen & Compact Tabletop Scales": "Counter scales for shops, kitchens and bakeries",
  "Portable & Luggage Scales": "Handheld hanging scales for travel and trade",
  "Heavy-Duty Hanging & Crane Scales": "Crane and hanging scales up to 300 kg",
  "Personal Health & Bathroom Scales": "Bathroom, health and baby scales",
  "Packaging & Miscellaneous Equipment": "Impulse sealers and packing tools",
};

const SERVICES = [
  { title: "Calibration & certification", desc: "OIML-standard testing with certificates accepted for commercial trade." },
  { title: "Repair, any brand", desc: "Load cells, displays, keypads and boards diagnosed and fixed — most within 24 hours." },
  { title: "Genuine spare parts", desc: "Batteries, adaptors, load cells and pans kept in stock at the shop." },
  { title: "Installation & training", desc: "Platform and industrial scales set up on site, with staff walkthroughs." },
];

const REASONS = [
  { k: "Since 2015", v: "A decade of selling and fixing scales in Bharatpur." },
  { k: "Walk-in shop", v: "See and test a scale before you buy it." },
  { k: "On-site visits", v: "Technicians travel across Chitwan for bigger installs." },
  { k: "Fast replies", v: "WhatsApp and phone enquiries answered the same day." },
];

export default async function Home() {
  const products = await getProducts();

  const withImage = products.filter((p) => p.image_url);
  const hero = withImage.slice(0, 3);
  const featured = products.slice(0, 8);

  const categories = PRODUCT_CATEGORIES.map((category) => {
    const inCat = products.filter((p) => p.category === category);
    return {
      category,
      count: inCat.length,
      image: inCat.find((p) => p.image_url)?.image_url ?? null,
    };
  });

  return (
    <>
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span className="h-px w-6 bg-signal" />
              Authorized dealer · {SITE.address.replace(", Nepal", "")}
            </p>
            <h1 className="mt-6 text-[clamp(2.6rem,6.2vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
              Scales that weigh it <span className="relative whitespace-nowrap">
                right
                <svg aria-hidden viewBox="0 0 200 12" className="absolute -bottom-1 left-0 h-3 w-full text-signal" preserveAspectRatio="none">
                  <path d="M2 8c40-6 120-8 196-2" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              , every time.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
              Digital scales and beam balances for shops, kitchens, jewellers and warehouses — plus calibration,
              repair and genuine spare parts from our shop in Bharatpur.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn-ink h-13 px-6 text-[0.95rem]">
                Browse {products.length > 0 ? `${products.length} products` : "products"} <ArrowRight size={18} />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-line h-13 px-6 text-[0.95rem]">
                <MessageCircle size={18} className="text-wa" /> Ask on WhatsApp
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 border-t border-line pt-6">
              {[
                { v: "0.001 g", k: "Finest readability" },
                { v: "300 kg", k: "Heaviest crane scale" },
                { v: `${new Date().getFullYear() - SITE.since}+ yrs`, k: "In Bharatpur" },
              ].map(({ v, k }) => (
                <div key={k} className="pr-3">
                  <dt className="sr-only">{k}</dt>
                  <dd className="font-mono text-lg font-medium tabular-nums text-ink sm:text-xl">{v}</dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-mute">{k}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Product mosaic */}
          {hero.length === 3 && (
            <div className="relative mx-auto grid w-full max-w-xl grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
              <Link
                href={`/products/${hero[0].id}`}
                className="group relative row-span-2 aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-paper-2 shadow-float"
              >
                <Image src={hero[0].image_url!} alt={hero[0].name} fill priority sizes="(max-width: 1024px) 55vw, 32vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute inset-x-3 bottom-3 rounded-xl bg-white/90 px-3 py-2 text-sm font-semibold text-ink backdrop-blur">
                  <span className="line-clamp-1">{hero[0].name}</span>
                </span>
              </Link>
              {hero.slice(1).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group relative aspect-square overflow-hidden rounded-[1.5rem] bg-paper-2 shadow-lift">
                  <Image src={p.image_url!} alt={p.name} fill priority sizes="(max-width: 1024px) 40vw, 24vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </Link>
              ))}

              {/* LCD readout chip */}
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-float sm:-left-6">
                <div className="rounded-lg bg-[#c9d8c1] px-3 py-1.5 font-mono text-xl font-medium tabular-nums tracking-tight text-[#1f2a1d] shadow-inner">
                  0.001<span className="ml-1 text-sm">g</span>
                </div>
                <div className="text-xs leading-tight text-ink-soft">
                  Precision
                  <br />
                  <span className="font-semibold text-ink">you can test in-store</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="ruler" aria-hidden />
      </section>

      {/* ─────────────────────────── Categories ─────────────────────────── */}
      <section className="container-site py-20 md:py-28">
        <SectionHead
          eyebrow="Shop by category"
          title="Find the right scale for the job"
          action={{ href: "/products", label: "Full catalogue" }}
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categories.map(({ category, count, image }) => (
            <li key={category}>
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[box-shadow,border-color] duration-300 hover:border-line-strong hover:shadow-lift sm:flex-row"
              >
                <span className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-paper-2 sm:aspect-auto sm:w-[42%]">
                  {image && (
                    <Image src={image} alt="" fill sizes="(max-width: 640px) 50vw, 18vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  )}
                </span>
                <span className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-ink sm:text-lg">
                    {CATEGORY_ADMIN_LABELS[category]}
                  </span>
                  <span className="mt-1.5 hidden text-sm leading-snug text-ink-soft sm:block">{CATEGORY_BLURB[category]}</span>
                  <span className="mt-auto flex items-center justify-between pt-4 font-mono text-[0.7rem] uppercase tracking-wider text-ink-mute">
                    {count} {count === 1 ? "model" : "models"}
                    <ArrowUpRight size={16} className="text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ──────────────────────── Latest products ──────────────────────── */}
      {featured.length > 0 && (
        <section className="border-y border-line bg-paper-2/60">
          <div className="container-site py-20 md:py-28">
            <SectionHead
              eyebrow="New in the shop"
              title="Latest arrivals"
              action={{ href: "/products", label: "See all products" }}
            />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────── Services (ink band) ──────────────────────── */}
      <section className="bg-ink text-white">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow !text-white/50">Workshop</p>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Scale acting up? We repair and calibrate every brand.
            </h2>
            <p className="mt-5 max-w-md text-white/65">
              Bring it to the shop or have a technician visit your site. Most issues are fixed within 24 hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent("Hello GSTradeLink! My weighing scale needs repair/calibration.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa h-12 px-6"
              >
                <MessageCircle size={18} /> Book a repair
              </a>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 font-semibold text-white transition-colors hover:border-white/50"
              >
                All services <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <ol className="divide-y divide-white/10 border-y border-white/10">
            {SERVICES.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ──────────────────────── Why us + visit ──────────────────────── */}
      <section className="container-site py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead eyebrow="Why GSTradeLink" title="A local shop that stands behind what it sells" />
            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {REASONS.map(({ k, v }) => (
                <div key={k} className="border-t border-ink pt-4">
                  <dt className="font-display text-lg font-semibold tracking-tight text-ink">{k}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Visit the shop</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{SITE.address}</p>
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep transition-colors hover:bg-signal hover:text-white"
                aria-label="Open in Google Maps"
              >
                <MapPin size={20} />
              </a>
            </div>
            <HoursTable className="mt-6" />
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a href={SITE.phoneHref} className="btn-ink h-12 text-sm">
                <Phone size={16} /> {SITE.phoneDisplay}
              </a>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line h-12 text-sm">
                Get directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">{title}</h2>
      </div>
      {action && (
        <Link href={action.href} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink">
          <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-ink">{action.label}</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
