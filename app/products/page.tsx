import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryFilterBar } from "@/components/products/CategoryFilterBar";
import { createClient } from "@/lib/supabase/server";
import { Search, Sparkles, Wrench, X } from "lucide-react";
import type { Product } from "@/types";
import type { CategoryChip } from "@/components/products/CategoryFilterBar";

export const revalidate = 60;

// ── All filterable product categories ────────────────────────────────────────
const PRODUCT_CATEGORIES = [
  "All",
  "Precision & Pocket Mini Scales",
  "Kitchen & Compact Tabletop Scales",
  "Portable & Luggage Scales",
  "Heavy-Duty Hanging & Crane Scales",
  "Personal Health & Bathroom Scales",
  "Packaging & Miscellaneous Equipment",
] as const;

type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Short display labels for each category chip
const CATEGORY_LABELS: Record<ProductCategory, string> = {
  All: "All",
  "Precision & Pocket Mini Scales": "Precision",
  "Kitchen & Compact Tabletop Scales": "Kitchen",
  "Portable & Luggage Scales": "Luggage",
  "Heavy-Duty Hanging & Crane Scales": "Industrial",
  "Personal Health & Bathroom Scales": "Health & Baby",
  "Packaging & Miscellaneous Equipment": "Packaging",
};

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCategory(value?: string): ProductCategory {
  if (!value) return "All";
  const match = PRODUCT_CATEGORIES.find(
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
  const buildCategoryHref = (category: ProductCategory) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (searchQuery) params.set("q", searchQuery);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  };

  const categoryChips: CategoryChip[] = [
    ...PRODUCT_CATEGORIES.map((cat) => ({
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
    <div
      className="min-h-screen pb-28 md:pb-16"
      style={{ background: "#F4F6F2" }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          Hero Section - Clean & Minimal
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1A2433 0%, #2B4D72 60%, #3E5E85 100%)",
          paddingTop: "clamp(32px, 5vw, 56px)",
          paddingBottom: "clamp(28px, 4vw, 48px)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#DCA963",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                <Sparkles size={12} />
                Our Inventory
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-bold text-white mb-3"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              Product Catalogue
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mb-6"
              style={{
                color: "#AECAE9",
                fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
                maxWidth: "420px",
                lineHeight: 1.6,
              }}
            >
              Precision scales, genuine spare parts, and professional service —
              all in one place.
            </p>

            {/* Search Bar */}
            <form
              action="/products"
              method="get"
              className="relative max-w-xl mx-auto"
            >
              {selectedCategory !== "All" && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}

              <div
                className="relative flex items-center w-full overflow-hidden transition-all"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "9999px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search
                    size={18}
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  />
                </div>

                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search products..."
                  className="w-full h-12 pl-11 pr-24 bg-transparent text-white placeholder:text-white/40 text-sm focus:outline-none"
                />

                <button
                  type="submit"
                  className="absolute inset-y-1.5 right-1.5 inline-flex items-center justify-center px-5 text-xs font-bold rounded-full transition-all hover:brightness-110"
                  style={{
                    background: "#DCA963",
                    color: "#1A2433",
                  }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom curve */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 1440 40"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "40px" }}
          >
            <path
              d="M0,40 C480,0 960,0 1440,40 L1440,40 L0,40 Z"
              fill="#F4F6F2"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Category Filter Bar
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-3 relative z-20">
        <div
          className="rounded-2xl p-2 sm:p-2.5"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid rgba(203,220,235,0.5)",
          }}
        >
          <CategoryFilterBar
            chips={categoryChips}
            selectedCategory={selectedCategory}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Results Info Bar
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <p style={{ fontSize: "0.875rem", color: "#5C6B7B" }}>
              Showing{" "}
              <span style={{ fontWeight: 700, color: "#1A2433" }}>
                {productList.length}
              </span>{" "}
              {productList.length === 1 ? "product" : "products"}
            </p>

            {selectedCategory !== "All" && (
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "#EEF4FB",
                  border: "1px solid #CBDCEB",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#3E5E85",
                }}
              >
                {activeLabel}
              </span>
            )}

            {searchQuery && (
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#5C6B7B",
                }}
              >
                for{" "}
                <span
                  style={{
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "#1A2433",
                  }}
                >
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 transition-all hover:gap-2"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#EF4444",
                textDecoration: "none",
              }}
            >
              <X size={14} />
              Clear filters
            </Link>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Product Grid
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {productList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* ── Empty state ───────────────────────────────────────────────── */
          <div
            className="text-center py-16 px-6 sm:px-12 mx-auto max-w-md"
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              border: "2px dashed #CBDCEB",
            }}
          >
            <div
              className="mx-auto mb-5 flex items-center justify-center"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#EEF4FB",
              }}
            >
              <Search size={28} style={{ color: "#6D94C5" }} />
            </div>

            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#1A2433",
                marginBottom: "8px",
              }}
            >
              No products found
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#5C6B7B",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              {searchQuery
                ? `We couldn't find anything matching "${searchQuery}". Try a different search term.`
                : "No products in this category right now. Try browsing all products."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{
                  background: "#3E5E85",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 14px rgba(62,94,133,0.25)",
                }}
              >
                View all products
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          Services CTA - Clean Banner
      ════════════════════════════════════════════════════════════════════════ */}
      {selectedCategory === "All" && !searchQuery && productList.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <Link
            href="/services"
            className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #1A2433 0%, #2B4D72 100%)",
              boxShadow: "0 8px 32px rgba(26,36,51,0.2)",
              textDecoration: "none",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(220,169,99,0.15)",
                  border: "1px solid rgba(220,169,99,0.3)",
                }}
              >
                <Wrench size={22} style={{ color: "#DCA963" }} />
              </div>
              <div className="text-center sm:text-left">
                <p
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: "2px",
                  }}
                >
                  Need repair or calibration?
                </p>
                <p
                  style={{
                    color: "rgba(174,202,233,0.8)",
                    fontSize: "0.8rem",
                  }}
                >
                  On-site maintenance and expert support across Chitwan
                </p>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3"
              style={{
                padding: "10px 20px",
                borderRadius: "9999px",
                background: "#DCA963",
                color: "#1A2433",
              }}
            >
              View Services
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
