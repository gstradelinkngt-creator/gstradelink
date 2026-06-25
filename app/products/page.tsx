import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilterBar } from "@/components/products/CategoryFilterBar";
import { createClient } from "@/lib/supabase/server";
import { Search, Sparkles, Wrench, X } from "lucide-react";
import type { Product } from "@/types";
import type { CategoryChip } from "@/components/products/CategoryFilterBar";
import { PRODUCT_CATEGORIES, CATEGORY_SHORT_LABELS } from "@/lib/categories";

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

  const categoryChips: CategoryChip[] = [
    ...FILTER_CATEGORIES.map((cat) => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      href: buildCategoryHref(cat),
      isService: false,
    })),
    // Services chip — links directly to the services page (not a product filter)
    {
      category: "services-link",
      label: "Services",
      href: "/services",
      isService: true,
    },
  ];

  const hasActiveFilters = selectedCategory !== "All" || Boolean(searchQuery);
  const activeLabel = CATEGORY_LABELS[selectedCategory];

  return (
    <div className="aurora min-h-screen w-full overflow-hidden md:pb-16">
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="aurora-grid relative overflow-hidden pb-6 pt-12 sm:pt-16">
        <div
          className="aurora-orb aurora-orb--blue"
          style={{ width: 360, height: 360, top: -120, left: -80 }}
        />
        <div
          className="aurora-orb aurora-orb--gold"
          style={{ width: 300, height: 300, top: -40, right: -100 }}
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em]" style={{ color: "#DCA963" }}>
              <Sparkles size={12} />
              Our Inventory
            </span>

            <h1
              className="mb-3 font-bold text-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              Product <span className="text-gradient-gold">Catalogue</span>
            </h1>

            <p
              className="mx-auto mb-7"
              style={{ color: "#AECAE9", fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", maxWidth: "440px", lineHeight: 1.6 }}
            >
              Precision scales, genuine spare parts, and professional service —
              all in one place.
            </p>

            {/* Search */}
            <form action="/products" method="get" className="relative mx-auto max-w-xl">
              {selectedCategory !== "All" && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}
              <div className="glass relative flex w-full items-center overflow-hidden rounded-full">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <Search size={18} style={{ color: "rgba(255,255,255,0.55)" }} />
                </span>
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search products..."
                  className="h-12 w-full bg-transparent pl-11 pr-[6.5rem] text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ui-btn ui-btn-sm btn-gold absolute inset-y-1.5 right-1.5"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── Filter bar ──────────────────────────── */}
      <section className="relative z-20 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="glass-strong rounded-2xl p-2 sm:p-2.5">
          <CategoryFilterBar
            chips={categoryChips}
            selectedCategory={selectedCategory}
          />
        </div>
      </section>

      {/* ─────────────────────────── Results bar ─────────────────────────── */}
      <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p style={{ fontSize: "0.875rem", color: "#AECAE9" }}>
              Showing{" "}
              <span style={{ fontWeight: 700, color: "#FFFFFF" }}>
                {productList.length}
              </span>{" "}
              {productList.length === 1 ? "product" : "products"}
            </p>

            {selectedCategory !== "All" && (
              <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ color: "#DCA963" }}>
                {activeLabel}
              </span>
            )}

            {searchQuery && (
              <span style={{ fontSize: "0.875rem", color: "#AECAE9" }}>
                for{" "}
                <span style={{ fontWeight: 600, fontStyle: "italic", color: "#FFFFFF" }}>
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 transition-all hover:gap-2"
              style={{ fontSize: "0.75rem", fontWeight: 600, color: "#FCA5A5", textDecoration: "none" }}
            >
              <X size={14} />
              Clear filters
            </Link>
          )}
        </div>
      </section>

      {/* ──────────────────────────── Product grid ──────────────────────────── */}
      <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {productList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass mx-auto max-w-md rounded-3xl px-6 py-16 text-center sm:px-12" style={{ borderStyle: "dashed" }}>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(109,148,197,0.15)" }}>
              <Search size={28} style={{ color: "#6D94C5" }} />
            </div>
            <p className="mb-2 font-bold text-white" style={{ fontSize: "1.125rem" }}>
              No products found
            </p>
            <p className="mb-6" style={{ fontSize: "0.875rem", color: "#AECAE9", lineHeight: 1.6 }}>
              {searchQuery
                ? `We couldn't find anything matching "${searchQuery}". Try a different search term.`
                : "No products in this category right now. Try browsing all products."}
            </p>
            <div className="flex justify-center">
              <Link href="/products" className="ui-btn ui-btn-md btn-gold">
                View all products
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ──────────────────────────── Services CTA ──────────────────────────── */}
      {selectedCategory === "All" && !searchQuery && productList.length > 0 && (
        <section className="mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="glass-strong glass-hover group flex flex-col items-center justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:p-6"
            style={{ textDecoration: "none" }}
          >
            <div className="flex items-center gap-4">
              <div className="glass-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <Wrench size={22} style={{ color: "#DCA963" }} />
              </div>
              <div className="text-center sm:text-left">
                <p className="mb-0.5 font-bold text-white" style={{ fontSize: "1rem" }}>
                  Need repair or calibration?
                </p>
                <p style={{ color: "#AECAE9", fontSize: "0.8rem" }}>
                  On-site maintenance and expert support across Chitwan
                </p>
              </div>
            </div>
            <span className="ui-btn ui-btn-md btn-gold shrink-0">
              View Services <span aria-hidden="true">→</span>
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
