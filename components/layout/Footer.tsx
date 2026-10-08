import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { PRODUCT_CATEGORIES, CATEGORY_ADMIN_LABELS } from "@/lib/categories";
import { SITE } from "@/lib/site";

const PAGES = [
  { label: "Product catalogue", href: "/products" },
  { label: "Repair & calibration", href: "/services" },
  { label: "Contact & hours", href: "/contact" },
];

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`mt-auto bg-ink text-white/70 ${className ?? ""}`}>
      <div className="ruler opacity-25" aria-hidden />
      <div className="container-site grid gap-12 pb-12 pt-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">
              <Image src="/logo.png" alt="" width={44} height={44} className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-white">GSTradeLink</span>
          </Link>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
            Digital scales, beam balances and spare parts — sold, calibrated and repaired in Bharatpur since{" "}
            {SITE.since}.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-wa h-10 px-4 text-sm">
              WhatsApp us
            </a>
            <a
              href={SITE.phoneHref}
              className="inline-flex h-10 items-center rounded-xl border border-white/15 px-4 text-sm font-semibold text-white transition-colors hover:border-white/40"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <FooterCol title="Pages" className="md:col-span-2">
          {PAGES.map((p) => (
            <FooterLink key={p.href} href={p.href}>
              {p.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Categories" className="md:col-span-2">
          {PRODUCT_CATEGORIES.map((c) => (
            <FooterLink key={c} href={`/products?category=${encodeURIComponent(c)}`}>
              {CATEGORY_ADMIN_LABELS[c]}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Visit" className="md:col-span-3">
          <li>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              {SITE.address}
            </a>
          </li>
          <li>{SITE.hoursShort}</li>
          <li>
            <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-white">
              {SITE.email}
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 pb-28 text-xs text-white/45 sm:flex-row md:pb-5">
          <p>© {new Date().getFullYear()} GSTradeLink. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="font-mono uppercase tracking-wider">Bharatpur · Chitwan · Nepal</span>
            {/* Discreet admin access */}
            <Link href="/admin/login" aria-label="Admin login" className="text-white/25 transition-colors hover:text-white/60">
              <Lock size={11} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/40">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[0.92rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
