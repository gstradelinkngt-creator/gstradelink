import type { Metadata } from "next";

/**
 * Admin layout — intentionally stripped of the public site's Navbar/Footer
 * (handled by SiteShell in the root layout). Sets noindex so search engines
 * never index admin pages.
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SiteShell (root layout) detects /admin pathname and renders
  // children directly — no public Navbar or Footer is injected.
  // The admin-dark class activates dark-scoped CSS var overrides so
  // global light-mode input/select styles don't bleed into the dark UI.
  return <div className="admin-dark">{children}</div>;
}

