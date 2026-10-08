"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, MessageCircle, Phone, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

const ITEMS = [
  { icon: Home, href: "/", label: "Home" },
  { icon: LayoutGrid, href: "/products", label: "Products" },
  { icon: Wrench, href: "/services", label: "Repair" },
  { icon: Phone, href: SITE.phoneHref, label: "Call", external: true },
];

/** Mobile-only bottom bar: page shortcuts + a prominent WhatsApp action. */
export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-md items-center gap-1">
        {ITEMS.map(({ icon: Icon, href, label, external }) => {
          const active = !external && (href === "/" ? pathname === "/" : pathname.startsWith(href));
          const cls = cn(
            "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[0.68rem] font-medium transition-colors",
            active ? "text-ink" : "text-ink-mute",
          );
          const inner = (
            <>
              <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </>
          );
          return external ? (
            <a key={label} href={href} className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={label} href={href} className={cls} aria-current={active ? "page" : undefined}>
              {inner}
            </Link>
          );
        })}
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa ml-1 h-12 flex-[1.3] text-sm"
        >
          <MessageCircle size={18} /> Chat
        </a>
      </div>
    </nav>
  );
};
