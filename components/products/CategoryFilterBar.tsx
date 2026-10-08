"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryChip {
  category: string;
  label: string;
  href: string;
}

interface CategoryFilterBarProps {
  chips: CategoryChip[];
  selectedCategory: string;
}

/** Horizontally scrollable category chips; keeps the active chip in view. */
export function CategoryFilterBar({ chips, selectedCategory }: CategoryFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const active = el?.querySelector<HTMLElement>("[aria-current='page']");
    if (!el || !active) return;
    const { left, right } = active.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    if (left < box.left || right > box.right) {
      el.scrollTo({ left: active.offsetLeft - 16, behavior: "smooth" });
    }
  }, [selectedCategory]);

  return (
    <div
      ref={scrollRef}
      className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0 [mask-image:linear-gradient(90deg,transparent,#000_20px,#000_calc(100%-32px),transparent)] sm:[mask-image:none]"
    >
      {chips.map(({ category, label, href }) => {
        const active = selectedCategory === category;
        return (
          <Link
            key={category}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex h-9 shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors",
              active
                ? "bg-ink text-white"
                : "border border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default CategoryFilterBar;
