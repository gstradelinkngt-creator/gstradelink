import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilterBar } from "@/components/products/CategoryFilterBar";
import { createClient } from "@/lib/supabase/server";
import { Search, Sparkles, Wrench, X, ArrowRight } from "lucide-react";
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
    <div className="bg-slate-950 min-h-screen w-full overflow-hidden md:pb-16">
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="relative overflow-hidden pb-8 pt-12 sm:pt-16 border-b border-slate-900">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center flex flex-col items-center">
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-500">
              <Sparkles size={14} />
              Our Inventory
            </span>

            <h1
              className="mb-4 font-bold text-slate-50"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              Product <span className="text-amber-500">Catalogue</span>
            </h1>

            <p
              className="mx-auto mb-8 max-w-md text-slate-400"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", lineHeight: 1.6 }}
            >
              Precision scales, genuine spare parts, and professional service —
              all in one place.
            </p>

            {/* Search */}
            <form action="/products" method="get" className="relative mx-auto w-full max-w-xl">
              {selectedCategory !== "All" && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}
              <div className="relative flex w-full items-center overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-sm focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-all">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <Search size={18} className="text-slate-500" />
                </span>
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search products..."
                  className="h-14 w-full bg-transparent pl-12 pr-[7.5rem] text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none border-none ring-0"
                />
                <button
                  type="submit"
                  className="absolute inset-y-2 right-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-5 rounded-lg transition-colors text-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── Filter bar ──────────────────────────── */}
      <section className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-3 shadow-sm overflow-hidden">
          <CategoryFilterBar
            chips={categoryChips}
            selectedCategory={selectedCategory}
          />
        </div>
      </section>

      {/* ─────────────────────────── Results bar ─────────────────────────── */}
      <section className="mx-auto mt-6 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-50">
                {productList.length}
              </span>{" "}
              {productList.length === 1 ? "product" : "products"}
            </p>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-semibold text-amber-500 uppercase tracking-wide">
                {activeLabel}
              </span>
            )}

            {searchQuery && (
              <span className="text-sm text-slate-400">
                for{" "}
                <span className="font-semibold italic text-slate-50">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 transition-all hover:gap-2 text-xs font-semibold text-red-400 hover:text-red-300"
            >
              <X size={14} />
              Clear filters
            </Link>
          )}
        </div>
      </section>

      {/* ──────────────────────────── Product grid ──────────────────────────── */}
      <section className="mx-auto mt-8 max-w-7xl px-6 lg:px-8 pb-16">
        {productList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl bg-slate-900 border border-dashed border-slate-700 p-10 text-center sm:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
              <Search size={28} className="text-slate-400" />
            </div>
            <p className="mb-3 font-bold text-slate-50 text-xl">
              No products found
            </p>
            <p className="mb-8 text-sm text-slate-400 leading-relaxed">
              {searchQuery
                ? `We couldn't find anything matching "${searchQuery}". Try a different search term.`
                : "No products in this category right now. Try browsing all products."}
            </p>
            <div className="flex justify-center">
              <Link href="/products" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-6 py-3 rounded-lg transition-colors">
                View all products
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ──────────────────────────── Services CTA ──────────────────────────── */}
      {selectedCategory === "All" && !searchQuery && productList.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <Link
            href="/services"
            className="group flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:flex-row sm:p-8 transition-colors hover:border-slate-700"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 transition-transform group-hover:scale-105">
                <Wrench size={24} className="text-amber-500" />
              </div>
              <div className="text-center sm:text-left">
                <p className="mb-1 font-bold text-slate-50 text-lg">
                  Need repair or calibration?
                </p>
                <p className="text-sm text-slate-400">
                  On-site maintenance and expert support across Chitwan
                </p>
              </div>
            </div>
            <span className="bg-slate-800 group-hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-lg shrink-0 transition-colors flex items-center gap-2">
              View Services <ArrowRight size={16} />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
