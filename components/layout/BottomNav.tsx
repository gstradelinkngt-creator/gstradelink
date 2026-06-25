"use client";

import { Home, Package, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, href: "/", label: "Home", external: false },
    { icon: Package, href: "/products", label: "Catalogue", external: false },
    { icon: Phone, href: "tel:+9779845541939", label: "Call", external: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-none flex justify-center">
      <div
        className="bg-slate-900 border border-slate-800 flex items-center justify-around w-full max-w-sm px-2 py-2.5 shadow-2xl pointer-events-auto rounded-2xl"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.external
            ? false
            : item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "/";

          const itemClassName = cn(
            "relative flex flex-col items-center justify-center gap-1 min-w-[64px] px-2 py-2 rounded-xl transition-all duration-300",
            isActive 
              ? "text-amber-500 bg-slate-800" 
              : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
          );

          const content = (
            <>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-transform duration-300 active:scale-95"
              />
              <span className="text-[10px] font-semibold leading-none tracking-wide whitespace-nowrap">
                {item.label}
              </span>
            </>
          );

          if (item.external) {
            return (
              <a
                key={index}
                href={item.href}
                className={itemClassName}
                aria-label={item.label}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={itemClassName}
              aria-label={item.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
