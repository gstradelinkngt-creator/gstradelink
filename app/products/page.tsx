import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilterBar } from "@/components/products/CategoryFilterBar";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, MessageCircle, Search, Wrench, X } from "lucide-react";
import type { Product } from "@/types";
import type { CategoryChip } from "@/components/products/CategoryFilterBar";
import { PRODUCT_CATEGORIES, CATEGORY_SHORT_LABELS, CATEGORY_ADMIN_LABELS } from "@/lib/categories";
import { waLink } from "@/lib/site";

export const revalidate = 60;

// ── All filterable product categories ────────────────────────────────────────
// Canonical category list lives in lib/categories.ts (single source of truth,
// mirrored by the DB CHECK constraint). "All" is the filter-only pseudo-option.
const FILTER_CATEGORIES = ["All", ...PRODUCT_CATEGORIES] as const;

type FilterCategory = (typeof FILTER_CATEGORIES)[number];

// Short display labels for each category chip
const CATEGORY_LABELS: Record<FilterCategory, string> = {
  All: "All",
  ...CATEGORY_SHORT_LABELS,
};

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCategory(value?: string): FilterCategory {
  if (!value) return "All";
  const match = FILTER_CATEGORIES.find(
    (c) => c.toLowerCase() === value.toLowerCase(),
  );
  return match ?? "All";
}

export default async function ProductsPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const selectedCategory = normalizeCategory(
    getFirstParam(searchParams.category),
  );
  const rawQuery = getFirstParam(searchParams.q)?.trim() ?? "";
  const searchQuery = rawQuery.slice(0, 60);

  // ── Fetch products ──────────────────────────────────────────────────────────
  const supabase = await createClient();
  let request = supabase
    .from("products")
    .select("id, name, short_description, category, image_url, is_active")
    .eq("is_active", true);

  if (selectedCategory !== "All") {
    request = request.eq("category", selectedCategory);
  }

  if (searchQuery) {
    const sanitized = searchQuery.replace(/[,%]/g, " ");
    request = request.or(
      `name.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%`,
    );
  }

  const { data: products, error } = await request.order("created_at", {
    ascending: false,
  });

  if (error) console.error("Error fetching products:", error);

  const productList: Product[] = (products ?? []) as Product[];

  // ── Build category chip data (pre-computed hrefs for the client component) ──
  const buildCategoryHref = (category: FilterCategory) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (searchQuery) params.set("q", searchQuery);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  };

  const categoryChips: CategoryChip[] = FILTER_CATEGORIES.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    href: buildCategoryHref(cat),
  }));

  const hasActiveFilters = selectedCategory !== "All" || Boolean(searchQuery);
  const activeLabel = CATEGORY_LABELS[selectedCategory];

  return (
    <div className="pb-20">
      {/* ───────────────────────────── Header ───────────────────────────── */}
      <section className="container-site pt-10 md:pt-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Catalogue · {productList.length} {productList.length === 1 ? "item" : "items"}</p>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
              {selectedCategory === "All" ? "All products" : CATEGORY_ADMIN_LABELS[selectedCategory]}
            </h1>
            <p className="mt-3 text-ink-soft">
              Ask on WhatsApp for today&apos;s price and stock — most items are ready to pick up in Bharatpur.
            </p>
          </div>

          <form action="/products" method="get" role="search" className="w-full lg:max-w-sm">
            {selectedCategory !== "All" && <input type="hidden" name="category" value={selectedCategory} />}
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-line-strong bg-surface pl-4 pr-1.5 transition-shadow focus-within:border-ink focus-within:shadow-lift">
              <Search size={18} className="shrink-0 text-ink-mute" />
              <input
                id="product-search"
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search by name or capacity…"
                className="h-full min-w-0 flex-1 bg-transparent text-[0.95rem] text-ink focus:outline-none"
              />
              <button type="submit" className="btn-ink h-9 px-4 text-sm">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ──────────────────────────── Filter bar ──────────────────────────── */}
      <div className="sticky top-16 z-30 mt-8 border-y border-line bg-paper/90 backdrop-blur-xl md:top-[72px]">
        <div className="container-site py-2.5">
          <CategoryFilterBar chips={categoryChips} selectedCategory={selectedCategory} />
        </div>
      </div>

      {/* ─────────────────────────── Results bar ─────────────────────────── */}
      {hasActiveFilters && (
        <div className="container-site mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-soft">
          <span>
            <span className="font-semibold text-ink">{productList.length}</span>{" "}
            {productList.length === 1 ? "result" : "results"}
            {searchQuery && (
              <>
                {" "}for <span className="font-semibold text-ink">&ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
            {selectedCategory !== "All" && (
              <>
                {" "}in <span className="font-semibold text-ink">{activeLabel}</span>
              </>
            )}
          </span>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink hover:border-ink"
          >
            <X size={13} /> Clear
          </Link>
        </div>
      )}

      {/* ──────────────────────────── Product grid ──────────────────────────── */}
      <section className="container-site mt-6">
        {productList.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-[1.75rem] border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-paper-2">
              <Search size={24} className="text-ink-mute" />
            </div>
            <p className="mt-5 font-display text-xl font-semibold text-ink">Nothing matches that yet</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {searchQuery
                ? `We couldn't find "${searchQuery}" in the catalogue. We stock more than we list — ask us directly.`
                : "No products in this category right now. Ask us — we can usually source it."}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
              <Link href="/products" className="btn-line h-11 px-5 text-sm">
                View all products
              </Link>
              <a
                href={waLink(`Hello GSTradeLink! I'm looking for: ${searchQuery || activeLabel}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa h-11 px-5 text-sm"
              >
                <MessageCircle size={16} /> Ask on WhatsApp
              </a>
            </div>
          </div>
        )}
      </section>

      {/* ──────────────────────────── Services CTA ──────────────────────────── */}
      {!hasActiveFilters && productList.length > 0 && (
        <section className="container-site mt-16">
          <Link
            href="/services"
            className="group flex flex-col gap-5 rounded-[1.75rem] bg-ink p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Wrench size={22} className="text-signal" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight">Already own a scale?</p>
                <p className="mt-1 text-white/60">We repair and calibrate every brand — in the shop or on site.</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-semibold">
              Repair &amp; calibration
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
