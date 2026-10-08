import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm text-signal-deep">Error 404</p>
      <div className="mt-4 rounded-xl bg-[#c9d8c1] px-5 py-3 font-mono text-5xl font-medium tabular-nums text-[#1f2a1d] shadow-inner">
        0.000<span className="ml-1 text-2xl">g</span>
      </div>
      <h1 className="mt-8 max-w-xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
        Nothing on the scale here.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-soft">
        This page doesn&apos;t exist or has moved. Try the catalogue, or head back home.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/products" className="btn-ink h-12 px-6">
          Browse products
        </Link>
        <Link href="/" className="btn-line h-12 px-6">
          <ArrowLeft size={17} /> Back home
        </Link>
      </div>
    </section>
  );
}
