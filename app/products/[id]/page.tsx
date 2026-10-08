import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, MessageCircle, Package, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORY_ADMIN_LABELS, type ProductCategory } from "@/lib/categories";
import { SITE, productEnquiry } from "@/lib/site";
import type { Product } from "@/types";

export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, short_description, category")
    .eq("id", id)
    .single();

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description:
      product.short_description ??
      `${product.category} available at GSTradeLink Bharatpur. Contact us for pricing and availability.`,
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) notFound();

  // A few related items from the same category
  const { data: related } = await supabase
    .from("products")
    .select("id, name, short_description, category, image_url")
    .eq("category", product.category)
    .eq("is_active", true)
    .neq("id", product.id)
    .order("created_at", { ascending: false })
    .limit(4);

  const categoryHref = `/products?category=${encodeURIComponent(product.category)}`;
  const categoryLabel = CATEGORY_ADMIN_LABELS[product.category as ProductCategory] ?? product.category;

  return (
    <div className="pb-20">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="container-site pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-mute">
          <li>
            <Link href="/products" className="inline-flex items-center gap-1.5 hover:text-ink">
              <ArrowLeft size={15} /> Catalogue
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={categoryHref} className="hover:text-ink">
              {categoryLabel}
            </Link>
          </li>
          <li aria-hidden className="hidden sm:block">/</li>
          <li className="hidden max-w-[16rem] truncate text-ink sm:block" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* ── Product ─────────────────────────────────────────── */}
      <section className="container-site mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 lg:sticky lg:top-28 lg:self-start">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package size={56} className="text-ink-mute" />
            </div>
          )}
        </div>

        <article className="flex flex-col lg:py-4">
          <Link href={categoryHref} className="eyebrow self-start hover:text-ink">
            {categoryLabel}
          </Link>
          <h1 className="mt-3 text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
            {product.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {product.short_description ||
              "Reliable weighing instrument for retail, kitchen and workshop use. Ask us for exact capacity and readability options."}
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <p className="font-display text-lg font-semibold tracking-tight text-ink">Price &amp; availability</p>
            <p className="mt-1 text-sm text-ink-soft">
              Prices change with stock — message us and we&apos;ll reply with today&apos;s price, usually within a few hours.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <a href={productEnquiry(product.name)} target="_blank" rel="noopener noreferrer" className="btn-wa h-12">
                <MessageCircle size={18} /> Ask on WhatsApp
              </a>
              <a href={SITE.phoneHref} className="btn-line h-12">
                <Phone size={17} /> Call the shop
              </a>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {[
              { icon: ShieldCheck, title: "Genuine product", text: "Sold with after-sales support from our Bharatpur shop." },
              { icon: Wrench, title: "Calibration & repair", text: "Setup, calibration and repair available from our workshop." },
              { icon: Truck, title: "Delivery around Chitwan", text: "Pick up in-store or ask about delivery and on-site setup." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 py-4">
                <Icon size={20} className="mt-0.5 shrink-0 text-signal-deep" />
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-0.5 text-sm text-ink-soft">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ── Related ─────────────────────────────────────────── */}
      {related && related.length > 0 && (
        <section className="container-site mt-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink">More {categoryLabel.toLowerCase()}</h2>
            <Link href={categoryHref} className="shrink-0 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              View all
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p as Product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
