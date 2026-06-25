"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  Home,
  Package,
  Wrench,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  User,
  LogOut,
  Shield,
} from "lucide-react";
import { cn, getStoreOpenState } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const [storeOpen, setStoreOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const update = () => setStoreOpen(getStoreOpenState().open);
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
    router.refresh();
  };

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "All Products", href: "/products" },
        { label: "Precision Scales", href: "/products?category=Precision%20%26%20Pocket%20Mini%20Scales" },
        { label: "Kitchen Scales", href: "/products?category=Kitchen%20%26%20Compact%20Tabletop%20Scales" },
        { label: "Luggage Scales", href: "/products?category=Portable%20%26%20Luggage%20Scales" },
        { label: "Industrial & Crane Scales", href: "/products?category=Heavy-Duty%20Hanging%20%26%20Crane%20Scales" },
        { label: "Health & Baby", href: "/products?category=Personal%20Health%20%26%20Bathroom%20Scales" },
      ],
    },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setShowUserMenu(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setShowUserMenu(false);
    };
    if (activeDropdown || showUserMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown, showUserMenu]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    const hrefPath = href.split("?")[0];
    return pathname.startsWith(hrefPath);
  };

  return (
    <div>
      {/* Top contact bar */}
      <div className="hidden xl:block py-2.5 border-b border-slate-800 bg-slate-950">
        <div className="container-fluid px-6">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 font-medium">
                <Phone size={14} className="text-slate-400" />
                <span>+977 9845541939</span>
              </div>
              <span className="text-slate-700">•</span>
              <span className="text-slate-400">Open all days except Monday · 10:00 AM – 6:00 PM</span>
            </div>
            <a
              href="https://wa.me/9779845541939"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
            >
              <span>Fast response on WhatsApp ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          isScrolled
            ? "shadow-sm shadow-black/20 bg-slate-950/90 backdrop-blur-md border-slate-800"
            : "bg-slate-950/70 backdrop-blur-md border-slate-800/60"
        )}
      >
        <div className="container-fluid px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="aspect-square h-12 w-12 overflow-hidden rounded-lg bg-slate-800 flex items-center justify-center p-1.5 border border-slate-700/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="GSTradeLink Logo"
                  width={200}
                  height={56}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-slate-50 tracking-tight transition-colors">
                  GSTradeLink
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  Bharatpur · Chitwan
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={(e) => toggleDropdown(item.label, e)}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-2 text-sm font-medium transition-colors",
                          isActivePath(item.href)
                            ? "text-slate-50 font-semibold"
                            : "text-slate-300 hover:text-slate-50"
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-lg p-2 z-50 bg-slate-900 border border-slate-800 shadow-xl overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                                  isActivePath(child.href)
                                    ? "font-semibold text-slate-50 bg-slate-800"
                                    : "font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/60"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-2 py-2 text-sm font-medium transition-colors",
                        isActivePath(item.href)
                          ? "text-slate-50 font-semibold"
                          : "text-slate-300 hover:text-slate-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="ml-4 pl-8 border-l border-slate-800 flex items-center gap-4">
                <a
                  href="https://wa.me/9779845541939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold px-5 py-2 rounded-lg transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 whitespace-nowrap text-sm"
                >
                  Get Quote
                </a>

                {/* Auth: Avatar / Login */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowUserMenu(v => !v); }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:ring-2 hover:ring-amber-500/50 bg-slate-800 border border-slate-700 text-slate-50 overflow-hidden"
                      title={user.email ?? "Account"}
                    >
                      {user.user_metadata?.avatar_url ? (
                        <Image src={user.user_metadata.avatar_url} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        user.email?.[0]?.toUpperCase() ?? <User size={16} />
                      )}
                    </button>
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full right-0 mt-3 w-56 rounded-lg p-2 z-50 bg-slate-900 border border-slate-800 shadow-xl"
                        >
                          <div className="px-3 py-2 mb-2 border-b border-slate-800">
                            <p className="text-xs font-semibold text-slate-50 truncate">{user.email}</p>
                          </div>
                          <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/80 transition-colors" onClick={() => setShowUserMenu(false)}>
                            <Shield size={16} /> Admin Panel
                          </Link>
                          <button onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-slate-800/80 transition-colors mt-1">
                            <LogOut size={16} /> Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/admin/login"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-slate-50"
                    title="Admin Login"
                  >
                    <User size={16} />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              {/* Auth: Avatar / Login for Mobile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowUserMenu(v => !v); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:ring-2 hover:ring-amber-500/50 bg-slate-800 border border-slate-700 text-slate-50 overflow-hidden"
                    title={user.email ?? "Account"}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <Image src={user.user_metadata.avatar_url} alt="Avatar" width={36} height={36} className="w-full h-full object-cover" />
                    ) : (
                      user.email?.[0]?.toUpperCase() ?? <User size={14} />
                    )}
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-3 w-56 rounded-lg p-2 z-50 bg-slate-900 border border-slate-800 shadow-xl"
                      >
                        <div className="px-3 py-2 mb-2 border-b border-slate-800">
                          <p className="text-xs font-semibold text-slate-50 truncate">{user.email}</p>
                        </div>
                        <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/80 transition-colors" onClick={() => setShowUserMenu(false)}>
                          <Shield size={16} /> Admin Panel
                        </Link>
                        <button onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-slate-800/80 transition-colors mt-1">
                          <LogOut size={16} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-slate-50"
                  title="Admin Login"
                >
                  <User size={14} />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-slate-300 hover:text-slate-50 hover:bg-slate-800/80 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Sidebar Panel */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-[360px] z-50 lg:hidden bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col"
              >
                {/* Header with Logo */}
                <div className="relative px-6 pt-6 pb-5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="aspect-square h-12 w-12 overflow-hidden rounded-lg bg-slate-800 flex items-center justify-center p-1.5 border border-slate-700/60 shadow-sm shrink-0">
                      <Image
                        src="/logo.png"
                        alt="GSTradeLink Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xl text-slate-50 tracking-tight">
                        GSTradeLink
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-amber-500 mt-0.5">
                        Bharatpur · Chitwan
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="mx-6 mb-6 px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("w-2 h-2 rounded-full", storeOpen ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]")}
                    />
                    <span className="text-slate-300 font-medium">
                      {storeOpen ? "Open now" : "Closed now"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={14} />
                    <span>10 AM – 6 PM</span>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <nav className="flex flex-col space-y-2">
                    {[
                      { icon: Home, label: "Home", href: "/" },
                      {
                        icon: Package,
                        label: "Products",
                        href: "/products",
                        hasChildren: true,
                      },
                      { icon: Wrench, label: "Services", href: "/services" },
                      { icon: Mail, label: "Contact", href: "/contact" },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      const isActive = isActivePath(item.href);
                      const navItem = navItems.find((n) => n.label === item.label);
                      const hasChildren = item.hasChildren && navItem?.children;

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          {hasChildren ? (
                            <div className="flex flex-col">
                              <button
                                onClick={(e) => toggleDropdown(item.label, e)}
                                className={cn(
                                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors",
                                  isActive
                                    ? "bg-slate-800 border border-slate-700 text-slate-50"
                                    : "bg-transparent text-slate-300 hover:bg-slate-900 border border-transparent hover:border-slate-800"
                                )}
                              >
                                <div className={cn("w-8 h-8 rounded-md flex items-center justify-center shrink-0", isActive ? "bg-slate-700" : "bg-slate-800/50")}>
                                  <Icon size={18} className={isActive ? "text-slate-50" : "text-slate-400"} />
                                </div>
                                <span className={cn("flex-1 text-left font-medium text-[15px]", isActive ? "text-slate-50" : "text-slate-300")}>
                                  {item.label}
                                </span>
                                <ChevronDown
                                  size={16}
                                  className={cn(
                                    "transition-transform duration-200",
                                    activeDropdown === item.label ? "rotate-180 text-slate-50" : "text-slate-500"
                                  )}
                                />
                              </button>

                              <AnimatePresence>
                                {activeDropdown === item.label && navItem?.children && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="ml-8 mt-2 pl-4 py-2 space-y-1.5 border-l-2 border-slate-800">
                                      {navItem.children.map((child) => (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                                            isActivePath(child.href)
                                              ? "bg-slate-800 text-slate-50 font-medium"
                                              : "text-slate-400 hover:text-slate-50 hover:bg-slate-900"
                                          )}
                                          onClick={() => setIsOpen(false)}
                                        >
                                          <ChevronRight size={14} className="text-slate-500 opacity-50" />
                                          {child.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors",
                                isActive
                                  ? "bg-slate-800 border border-slate-700 text-slate-50"
                                  : "bg-transparent text-slate-300 hover:bg-slate-900 border border-transparent hover:border-slate-800"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center shrink-0", isActive ? "bg-slate-700" : "bg-slate-800/50")}>
                                <Icon size={18} className={isActive ? "text-slate-50" : "text-slate-400"} />
                              </div>
                              <span className={cn("font-medium text-[15px]", isActive ? "text-slate-50" : "text-slate-300")}>
                                {item.label}
                              </span>
                            </Link>
                          )}
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Contact Info Section */}
                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <p className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-4 px-1 text-slate-500">
                      Contact Info
                    </p>
                    <div className="flex flex-col space-y-3">
                      <a
                        href="tel:+9779845541939"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-slate-900 group"
                      >
                        <Phone size={16} className="text-amber-500 group-hover:text-amber-400" />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-slate-50">+977 9845541939</span>
                      </a>
                      <a
                        href="mailto:gstradelinkngt@gmail.com"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-slate-900 group"
                      >
                        <Mail size={16} className="text-amber-500 group-hover:text-amber-400" />
                        <span className="text-sm font-medium text-slate-300 group-hover:text-slate-50">gstradelinkngt@gmail.com</span>
                      </a>
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
                        <MapPin size={16} className="text-amber-500" />
                        <span className="text-sm font-medium text-slate-400">Bharatpur-3, Chitwan</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Buttons */}
                <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col gap-3">
                  <a
                    href="https://wa.me/9779845541939"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 shadow-sm"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+9779845541939"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
                  >
                    <Phone size={16} /> Call Us Now
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
