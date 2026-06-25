import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Truck,
  Wrench,
  Phone
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
    <div className="bg-slate-950 min-h-screen w-full overflow-hidden md:pb-16">
      {/* ── Breadcrumb bar ──────────────────────────────────────── */}
      <section className="border-b border-slate-900 bg-slate-950 relative z-10">
        <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between gap-3 text-sm">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to catalogue</span>
            </Link>

            <span className="hidden rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-semibold text-slate-400 sm:inline-block">
              {product.category}
            </span>
          </div>
        </div>
      </section>

      {/* ── Product content ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-8 sm:pt-12 lg:px-8 pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — Image + trust chips */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-2 sm:p-4 shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-800">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl text-slate-600">
                    ⚖️
                  </div>
                )}
              </div>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3">
              {["Calibratable", "Warranty support", "On-site service"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 shadow-sm"
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right — Info & CTA */}
          <article className="flex flex-col py-2 sm:py-6">
            <span className="mb-5 self-start rounded-full bg-slate-900 border border-slate-800 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 shadow-sm">
              {product.category}
            </span>

            <h1
              className="font-bold leading-tight tracking-tight text-slate-50"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              {product.name}
            </h1>

            <p
              className="mt-6 max-w-2xl text-slate-400"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.7 }}
            >
              {product.short_description ||
                "High-precision weighing instrument designed for retail, industrial, and professional workflows."}
            </p>

            {/* Feature list */}
            <div className="mt-10 space-y-4">
              {[
                { icon: ShieldCheck, text: "Genuine products with trusted after-sales support." },
                { icon: Wrench, text: "Setup, maintenance, and repair services available." },
                { icon: Truck, text: "Fast delivery and support in Bharatpur and nearby areas." },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4 rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 shadow-sm transition-colors hover:border-slate-700">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">
                    <Icon size={20} className="text-amber-500" />
                  </span>
                  <span className="text-slate-300 font-medium text-sm leading-relaxed self-center">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold px-6 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
              <a 
                href="tel:+9779845541939" 
                className="flex-1 flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-6 py-4 rounded-xl transition-all"
              >
                <Phone size={18} /> Call for pricing
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
