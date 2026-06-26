"use client";

/**
 * SiteShell — renders the public site chrome (Navbar, Footer, WhatsApp button,
 * BottomNav) only on non-admin routes. Admin pages get a clean, isolated layout
 * without any public navigation leaking in.
 */
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { FooterWrapper } from "./FooterWrapper";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { BottomNav } from "./BottomNav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin routes own their full-screen layout — no public nav/footer
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="grow pb-28 md:pb-0">{children}</main>
      <FooterWrapper />
      <FloatingWhatsApp />
      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  );
}
