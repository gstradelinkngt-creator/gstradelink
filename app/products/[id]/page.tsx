import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const waMsg = `Hello GSTradeLink! I'm interested in the ${product.name}. Could you please share availability and pricing?`;
  const waLink = `https://wa.me/9779765662427?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="min-h-screen bg-background-secondary pb-28 md:pb-12">
      {/* ── Breadcrumb bar ──────────────────────────────────────── */}
      <section style={{ background: "#1A2433" }} className="text-white">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 motion-safe:animate-fade-up text-sm">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: "#AECAE9" }}
            >
              <ArrowLeft size={15} />
              <span className="hover:text-white transition-colors">
                Back to catalogue
              </span>
            </Link>

            <span
              className="font-medium hidden sm:inline-block"
              style={{
                color: "#8798AD",
                fontSize: "0.75rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "3px 12px",
                borderRadius: "9999px",
              }}
            >
              {product.category}
            </span>
          </div>
        </div>
      </section>

      {/* ── Product content ─────────────────────────────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Image + trust chips */}
          <div className="flex flex-col gap-5 motion-safe:animate-fade-up">
            <article
              className="overflow-hidden relative min-h-[320px] sm:min-h-[420px]"
              style={{
                background: "#FFFFFF",
                border: "1px solid #CBDCEB",
                borderRadius: "4px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div className="relative aspect-[4/3] sm:aspect-square">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain p-6 sm:p-10"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    priority
                  />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center text-6xl"
                    style={{ background: "#EEF4FB", color: "#AECAE9" }}
                  >
                    ⚖️
                  </div>
                )}
              </div>
            </article>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2.5">
              {["Calibratable", "Warranty support", "On-site service"].map(
                (chip) => (
                  <div
                    key={chip}
                    style={{
                      background: "#EEF4FB",
                      color: "#3E5E85",
                      border: "1px solid #CBDCEB",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                    }}
                  >
                    {chip}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right — Info & CTA */}
          <article className="motion-safe:animate-fade-up flex flex-col py-4 sm:py-6 lg:py-8">
            {/* Category badge */}
            <span
              className="self-start mb-5 font-semibold text-xs uppercase tracking-wider"
              style={{
                padding: "5px 14px",
                borderRadius: "9999px",
                background: "#EEF4FB",
                color: "#3E5E85",
                border: "1px solid #CBDCEB",
              }}
            >
              {product.category}
            </span>

            <h1
              className="font-bold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                color: "#111111",
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
              }}
            >
              {product.name}
            </h1>

            <p
              className="mt-4 sm:mt-5 leading-relaxed max-w-2xl"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                color: "#5C6B7B",
                lineHeight: 1.7,
              }}
            >
              {product.short_description ||
                "High-precision weighing instrument designed for retail, industrial, and professional workflows."}
            </p>

            {/* Feature list */}
            <div className="mt-8 space-y-3">
              {[
                {
                  icon: ShieldCheck,
                  text: "Genuine products with trusted after-sales support.",
                  iconColor: "#3E5E85",
                  bg: "#EEF4FB",
                  border: "#CBDCEB",
                },
                {
                  icon: Wrench,
                  text: "Setup, maintenance, and repair services available.",
                  iconColor: "#DCA963",
                  bg: "#FFFBF0",
                  border: "#F0E0B0",
                },
                {
                  icon: Truck,
                  text: "Fast delivery and support in Bharatpur and nearby areas.",
                  iconColor: "#3E5E85",
                  bg: "#EEF4FB",
                  border: "#CBDCEB",
                },
              ].map(({ icon: Icon, text, iconColor, bg, border }) => (
                <div
                  key={text}
                  className="flex items-start gap-3"
                  style={{
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: "4px",
                    padding: "14px 16px",
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: iconColor,
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "#1A2433",
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 font-bold transition-all hover:-translate-y-0.5"
                style={{
                  height: "48px",
                  borderRadius: "4px",
                  background: "#25D366",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                }}
              >
                <MessageCircle size={18} fill="white" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+9779765662427"
                className="inline-flex flex-1 items-center justify-center gap-2 font-bold transition-all hover:-translate-y-0.5"
                style={{
                  height: "48px",
                  borderRadius: "4px",
                  border: "1.5px solid #CBDCEB",
                  background: "#FFFFFF",
                  color: "#1A2433",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                Call for pricing
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ── Mobile sticky CTA ───────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 w-full px-4 sm:px-6 pb-6 pt-4 md:hidden z-40"
        style={{
          background: "linear-gradient(to top, #E8EBE3 60%, transparent)",
        }}
      >
        <div className="max-w-lg mx-auto">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 font-bold active:scale-[0.98] transition-all"
            style={{
              height: "48px",
              borderRadius: "4px",
              background: "#25D366",
              color: "#ffffff",
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
            }}
          >
            <MessageCircle size={18} fill="white" />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
