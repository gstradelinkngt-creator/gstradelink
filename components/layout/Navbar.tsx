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
import { cn } from "@/lib/utils";
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
  const pathname = usePathname();
  const router = useRouter();

  // Auth state listener
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
        {
          label: "Precision Scales",
          href: "/products?category=Precision%20%26%20Pocket%20Mini%20Scales",
        },
        {
          label: "Kitchen Scales",
          href: "/products?category=Kitchen%20%26%20Compact%20Tabletop%20Scales",
        },
        {
          label: "Luggage Scales",
          href: "/products?category=Portable%20%26%20Luggage%20Scales",
        },
        {
          label: "Industrial & Crane Scales",
          href: "/products?category=Heavy-Duty%20Hanging%20%26%20Crane%20Scales",
        },
        {
          label: "Health & Baby",
          href: "/products?category=Personal%20Health%20%26%20Bathroom%20Scales",
        },
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

  // BUG FIX: Only pathname in dep array to avoid infinite loop.
  // Previously isOpen & activeDropdown were listed, causing setIsOpen → re-render → effect → setIsOpen loop.
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
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
    // Strip query string — pathname never contains query params
    const hrefPath = href.split("?")[0];
    return pathname.startsWith(hrefPath);
  };

  return (
    <div>
      {/* Top contact bar */}
      <div
        className="hidden xl:block py-2 border-b border-white/10"
        style={{ background: "#1A2433" }}
      >
        <div className="container-fluid">
          <div
            className="flex items-center justify-between text-sm"
            style={{ color: "#AECAE9" }}
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={13} />
                <span>+977-56-878965</span>
              </div>
              <span className="text-white/20">•</span>
              <span>Open all days except Monday · 10:00 AM – 6:00 PM</span>
            </div>
            <a
              href="https://wa.me/9779765662427"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-white"
              style={{ color: "#DCA963" }}
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
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "backdrop-blur-md shadow-sm border-b border-border-primary"
            : "",
        )}
        style={{
          background: isScrolled ? "rgba(255,255,255,0.97)" : "#FFFFFF",
        }}
      >
        <div className="container-fluid">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="GSTradeLink Logo"
                width={200}
                height={56}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="hidden sm:block">
                <div
                  className="font-bold text-xl transition-colors"
                  style={{ color: "#1A2433" }}
                >
                  GSTradeLink
                </div>
                <div
                  className="text-[10px] uppercase tracking-widest font-semibold"
                  style={{ color: "#8798AD" }}
                >
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
                          "flex items-center gap-1.5 px-2 py-2 text-sm font-semibold transition-colors",
                          isActivePath(item.href)
                            ? "text-primary-600"
                            : "text-foreground-secondary hover:text-primary-600",
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180",
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
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border-primary p-2 z-50 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                  isActivePath(child.href)
                                    ? "text-primary-600 bg-primary-50"
                                    : "text-foreground-secondary hover:text-primary-600 hover:bg-primary-50",
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
                        "px-2 py-2 text-sm font-semibold transition-colors",
                        isActivePath(item.href)
                          ? "text-primary-600"
                          : "text-foreground-secondary hover:text-primary-600",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="ml-4 pl-8 border-l border-border-primary flex items-center gap-3">
                <a
                  href="https://wa.me/9779765662427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold transition-all whitespace-nowrap hover:-translate-y-0.5"
                  style={{
                    background: "#3E5E85",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    boxShadow: "0 4px 14px rgba(62,94,133,0.35)",
                    textDecoration: "none",
                  }}
                >
                  Get Quote
                </a>

                {/* Auth: Avatar / Login */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowUserMenu(v => !v); }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:ring-2 hover:ring-primary-200"
                      style={{ background: "#3E5E85", color: "#fff" }}
                      title={user.email ?? "Account"}
                    >
                      {user.user_metadata?.avatar_url ? (
                        <Image src={user.user_metadata.avatar_url} alt="Avatar" width={36} height={36} className="w-full h-full rounded-full object-cover" />
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
                          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border-primary p-2 z-50"
                        >
                          <div className="px-3 py-2 mb-1 border-b border-border-primary">
                            <p className="text-xs font-semibold text-foreground-primary truncate">{user.email}</p>
                          </div>
                          <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-foreground-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors" onClick={() => setShowUserMenu(false)}>
                            <Shield size={14} /> Admin Panel
                          </Link>
                          <button onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                            <LogOut size={14} /> Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/admin/login"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-primary-50"
                    style={{ border: "1.5px solid #CBDCEB", color: "#3E5E85" }}
                    title="Admin Login"
                  >
                    <User size={16} />
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-foreground-secondary hover:text-foreground-primary hover:bg-background-secondary transition-colors"
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

        {/* Mobile Navigation - Premium Design */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#0F1825]/60 backdrop-blur-md z-40 lg:hidden"
                onClick={() => setIsOpen(false)}
              />

              {/* Sidebar Panel */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] z-50 lg:hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #1A2433 0%, #0F1825 100%)",
                  boxShadow: "-8px 0 40px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Header with Logo */}
                  <div className="relative px-5 pt-5 pb-4">
                    {/* Close button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      <X size={20} />
                    </button>

                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5 shrink-0"
                        style={{
                          background: "#FFFFFF",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }}
                      >
                        <Image
                          src="/logo.png"
                          alt="GSTradeLink Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div
                          className="font-bold text-lg leading-tight"
                          style={{ color: "#FFFFFF" }}
                        >
                          GSTradeLink
                        </div>
                        <div
                          className="text-[10px] uppercase tracking-[0.15em] font-medium mt-0.5"
                          style={{ color: "#DCA963" }}
                        >
                          Bharatpur · Chitwan
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Bar */}
                  <div
                    className="mx-4 mb-4 px-4 py-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "#25D366",
                            boxShadow: "0 0 8px rgba(37,211,102,0.6)",
                          }}
                        />
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>
                          Open Now
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1.5"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        <Clock size={12} />
                        <span>10 AM – 6 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 overflow-y-auto px-4 pb-4">
                    <nav className="space-y-1.5">
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
                        const navItem = navItems.find(
                          (n) => n.label === item.label,
                        );
                        const hasChildren =
                          item.hasChildren && navItem?.children;

                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                          >
                            {hasChildren ? (
                              <div>
                                <button
                                  onClick={(e) => toggleDropdown(item.label, e)}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200",
                                    isActive
                                      ? "bg-[#3E5E85]"
                                      : "hover:bg-white/5",
                                  )}
                                >
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                      background: isActive
                                        ? "rgba(255,255,255,0.15)"
                                        : "rgba(255,255,255,0.08)",
                                    }}
                                  >
                                    <Icon
                                      size={18}
                                      style={{
                                        color: isActive ? "#FFFFFF" : "#AECAE9",
                                      }}
                                    />
                                  </div>
                                  <span
                                    className="flex-1 text-left font-medium text-[15px]"
                                    style={{
                                      color: isActive ? "#FFFFFF" : "#AECAE9",
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                  <ChevronDown
                                    size={16}
                                    className={cn(
                                      "transition-transform duration-200",
                                      activeDropdown === item.label &&
                                      "rotate-180",
                                    )}
                                    style={{
                                      color: isActive
                                        ? "#FFFFFF"
                                        : "rgba(174,202,233,0.5)",
                                    }}
                                  />
                                </button>

                                <AnimatePresence>
                                  {activeDropdown === item.label &&
                                    navItem?.children && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div
                                          className="ml-6 mt-1.5 pl-4 py-2 space-y-1"
                                          style={{
                                            borderLeft:
                                              "2px solid rgba(62,94,133,0.4)",
                                          }}
                                        >
                                          {navItem.children.map((child) => (
                                            <Link
                                              key={child.href}
                                              href={child.href}
                                              className={cn(
                                                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all",
                                                isActivePath(child.href)
                                                  ? "bg-[#3E5E85]/50 text-white"
                                                  : "text-[#93B2D6] hover:text-white hover:bg-white/5",
                                              )}
                                              onClick={() => setIsOpen(false)}
                                            >
                                              <ChevronRight
                                                size={14}
                                                style={{ opacity: 0.5 }}
                                              />
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
                                  "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200",
                                  isActive
                                    ? "bg-[#3E5E85]"
                                    : "hover:bg-white/5",
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                  style={{
                                    background: isActive
                                      ? "rgba(255,255,255,0.15)"
                                      : "rgba(255,255,255,0.08)",
                                  }}
                                >
                                  <Icon
                                    size={18}
                                    style={{
                                      color: isActive ? "#FFFFFF" : "#AECAE9",
                                    }}
                                  />
                                </div>
                                <span
                                  className="font-medium text-[15px]"
                                  style={{
                                    color: isActive ? "#FFFFFF" : "#AECAE9",
                                  }}
                                >
                                  {item.label}
                                </span>
                              </Link>
                            )}
                          </motion.div>
                        );
                      })}
                    </nav>

                    {/* Contact Info Section */}
                    <div className="mt-6 pt-5 border-t border-white/10">
                      <p
                        className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-3 px-1"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Contact Info
                      </p>
                      <div className="space-y-2.5">
                        <a
                          href="tel:+97756878965"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/5"
                          style={{ color: "#93B2D6" }}
                        >
                          <Phone size={15} style={{ color: "#DCA963" }} />
                          <span className="text-sm">+977-56-878965</span>
                        </a>
                        <a
                          href="mailto:info@gstradelink.com.np"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/5"
                          style={{ color: "#93B2D6" }}
                        >
                          <Mail size={15} style={{ color: "#DCA963" }} />
                          <span className="text-sm">
                            info@gstradelink.com.np
                          </span>
                        </a>
                        <div
                          className="flex items-center gap-3 px-3 py-2.5"
                          style={{ color: "#93B2D6" }}
                        >
                          <MapPin size={15} style={{ color: "#DCA963" }} />
                          <span className="text-sm">Bharatpur-10, Chitwan</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA Buttons */}
                  <div
                    className="p-4 space-y-2.5"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
                    }}
                  >
                    <a
                      href="https://wa.me/9779765662427"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-[0.98]"
                      style={{
                        background:
                          "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                        color: "#FFFFFF",
                        boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                      }}
                    >
                      <MessageCircle size={18} fill="white" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+9779765662427"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10 active:scale-[0.98]"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#FFFFFF",
                      }}
                    >
                      <Phone size={16} />
                      Call Us Now
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
