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
  const waLink = `https://wa.me/9779845541939?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="aurora min-h-screen w-full overflow-hidden md:pb-12">
      <div
        className="aurora-orb aurora-orb--blue"
        style={{ width: 380, height: 380, top: -120, right: -120 }}
      />
      <div
        className="aurora-orb aurora-orb--gold"
        style={{ width: 300, height: 300, top: 200, left: -140, opacity: 0.5 }}
      />

      {/* ── Breadcrumb bar ──────────────────────────────────────── */}
      <section className="glass-subtle relative z-10 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="motion-safe:animate-fade-up flex items-center justify-between gap-3 text-sm">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
              style={{ color: "#AECAE9" }}
            >
              <ArrowLeft size={15} />
              <span>Back to catalogue</span>
            </Link>

            <span className="glass hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-block" style={{ color: "#AECAE9" }}>
              {product.category}
            </span>
          </div>
        </div>
      </section>

      {/* ── Product content ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — Image + trust chips */}
          <div className="motion-safe:animate-fade-up flex flex-col gap-5">
            <div className="glass relative overflow-hidden rounded-3xl">
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
                  <div className="flex h-full w-full items-center justify-center text-6xl" style={{ color: "rgba(174,202,233,0.6)" }}>
                    ⚖️
                  </div>
                )}
              </div>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2.5">
              {["Calibratable", "Warranty support", "On-site service"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="glass rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold"
                    style={{ color: "#AECAE9" }}
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right — Info & CTA */}
          <article className="motion-safe:animate-fade-up flex flex-col py-4 sm:py-6 lg:py-8">
            <span className="glass-gold mb-5 self-start rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "#F2D89A" }}>
              {product.category}
            </span>

            <h1
              className="font-bold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", lineHeight: 1.12 }}
            >
              {product.name}
            </h1>

            <p
              className="mt-4 max-w-2xl leading-relaxed sm:mt-5"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: "#AECAE9", lineHeight: 1.7 }}
            >
              {product.short_description ||
                "High-precision weighing instrument designed for retail, industrial, and professional workflows."}
            </p>

            {/* Feature list */}
            <div className="mt-8 space-y-3">
              {[
                { icon: ShieldCheck, text: "Genuine products with trusted after-sales support.", tint: "#6D94C5" },
                { icon: Wrench, text: "Setup, maintenance, and repair services available.", tint: "#DCA963" },
                { icon: Truck, text: "Fast delivery and support in Bharatpur and nearby areas.", tint: "#6D94C5" },
              ].map(({ icon: Icon, text, tint }) => (
                <div key={text} className="glass flex items-start gap-3 rounded-xl px-4 py-3.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${tint}26`, border: `1px solid ${tint}55` }}
                  >
                    <Icon size={16} style={{ color: tint }} />
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#E6EEF8", fontWeight: 500, lineHeight: 1.5 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn ui-btn-lg flex-1 text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#25D366,#128C7E)",
                  boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)",
                }}
              >
                <MessageCircle size={18} fill="white" /> Chat on WhatsApp
              </a>
              <a href="tel:+9779845541939" className="ui-btn ui-btn-lg btn-glass flex-1">
                Call for pricing
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
