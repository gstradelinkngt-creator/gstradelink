"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Phone, Shield, X } from "lucide-react";
import { cn, getStoreOpenState } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { PRODUCT_CATEGORIES, CATEGORY_ADMIN_LABELS } from "@/lib/categories";
import { SITE } from "@/lib/site";
import { useSessionRole } from "@/lib/admin/useSessionRole";

const CATEGORY_LINKS = PRODUCT_CATEGORIES.map((c) => ({
  label: CATEGORY_ADMIN_LABELS[c],
  href: `/products?category=${encodeURIComponent(c)}`,
}));

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", children: CATEGORY_LINKS },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [storeOpen, setStoreOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setStoreOpen(getStoreOpenState().open);
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const { user, isAdmin } = useSessionRole();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation (state adjusted during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setProductsOpen(false);
    setUserMenuOpen(false);
  }

  // Close desktop popovers on outside click
  useEffect(() => {
    if (!productsOpen && !userMenuOpen) return;
    const close = () => {
      setProductsOpen(false);
      setUserMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [productsOpen, userMenuOpen]);

  // Lock scroll + Escape for the mobile sheet
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-line bg-paper/85 shadow-[0_1px_0_rgb(17_26_39/0.02)] backdrop-blur-xl"
          : "border-transparent bg-paper",
      )}
    >
      <nav className="container-site flex h-16 items-center justify-between gap-6 md:h-[72px]" aria-label="Main">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" aria-label="GSTradeLink home">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1 transition-transform duration-300 group-hover:-rotate-3">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-full w-full object-contain" priority />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[1.15rem] font-bold tracking-tight text-ink">GSTradeLink</span>
            <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-mute">
              Weighing · Chitwan
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href} className="relative">
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProductsOpen((v) => !v);
                      setUserMenuOpen(false);
                    }}
                    aria-expanded={productsOpen}
                    aria-haspopup="true"
                    className={cn(
                      "relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-[0.92rem] font-medium transition-colors",
                      isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                    <ChevronDown size={15} className={cn("transition-transform", productsOpen && "rotate-180")} />
                    {isActive(item.href) && <ActiveMark />}
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-2xl border border-line bg-surface p-2 shadow-float"
                      >
                        <Link
                          href="/products"
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-paper"
                        >
                          All products
                          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-mute">Catalogue</span>
                        </Link>
                        <div className="my-1 h-px bg-line" />
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative block rounded-lg px-3.5 py-2 text-[0.92rem] font-medium transition-colors",
                    isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <ActiveMark />}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <StoreStatus open={storeOpen} className="hidden xl:inline-flex" />
          <a href={SITE.phoneHref} className="btn-line hidden h-10 px-4 text-sm md:inline-flex">
            <Phone size={15} /> <span className="hidden lg:inline">{SITE.phoneDisplay}</span>
            <span className="lg:hidden">Call</span>
          </a>
          {isAdmin ? (
            <Link href="/admin" className="btn-ink hidden h-10 px-4 text-sm md:inline-flex">
              <LayoutDashboard size={15} /> Manage products
            </Link>
          ) : (
            <Link href="/contact" className="btn-ink hidden h-10 px-4 text-sm md:inline-flex">
              Get a quote
            </Link>
          )}

          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen((v) => !v);
                  setProductsOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-sm font-semibold text-ink"
                aria-label="Account menu"
                aria-expanded={userMenuOpen}
              >
                {user.user_metadata?.avatar_url ? (
                  <Image src={user.user_metadata.avatar_url} alt="" width={40} height={40} className="h-full w-full object-cover" />
                ) : (
                  user.email?.[0]?.toUpperCase()
                )}
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-line bg-surface p-2 shadow-float"
                  >
                    <p className="truncate px-3 py-2 text-xs text-ink-mute">{user.email}</p>
                    {isAdmin && (
                      <Link href="/admin" className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-paper">
                        <Shield size={16} /> Admin panel
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut size={16} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-paper shadow-float lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <StoreStatus open={storeOpen} />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-baseline justify-between rounded-xl px-3 py-3 font-display text-2xl font-semibold tracking-tight",
                          isActive(item.href) ? "bg-surface text-ink" : "text-ink-soft",
                        )}
                      >
                        {item.label}
                        {isActive(item.href) && <span className="h-2 w-2 rounded-full bg-signal" />}
                      </Link>
                    </li>
                  ))}
                </ul>

                {isAdmin && (
                  <Link href="/admin" className="btn-ink mt-6 h-12 w-full text-sm">
                    <LayoutDashboard size={16} /> Manage products
                  </Link>
                )}

                <p className="eyebrow mt-8 px-3">Shop by category</p>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {CATEGORY_LINKS.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="block rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-medium text-ink"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-line p-5">
                <a href={SITE.phoneHref} className="btn-line h-12 text-sm">
                  <Phone size={16} /> Call
                </a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-wa h-12 text-sm">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

function ActiveMark() {
  return <span className="absolute inset-x-3.5 -bottom-[13px] h-[2px] rounded-full bg-signal md:-bottom-[17px]" />;
}

export function StoreStatus({ open, className }: { open: boolean | null; className?: string }) {
  if (open === null) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-ink-soft",
        className,
      )}
    >
      <span className={cn("relative h-2 w-2 rounded-full", open ? "bg-wa" : "bg-red-500")}>
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-wa/60" />}
      </span>
      {open ? "Open now" : "Closed now"}
    </span>
  );
}
