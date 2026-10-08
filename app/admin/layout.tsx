import type { Metadata } from "next";

/**
 * Admin layout — the public Navbar/Footer are skipped by SiteShell for
 * /admin routes. noindex keeps admin pages out of search engines.
 */
export const metadata: Metadata = {
  title: "Admin | GSTradeLink",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-paper">{children}</div>;
}
