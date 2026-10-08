"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { useSessionRole } from "@/lib/admin/useSessionRole";

/** Floating "Edit" shortcut shown on public product pages to signed-in admins only. */
export function AdminEditLink({ productId }: { productId: string }) {
  const { isAdmin } = useSessionRole();
  if (!isAdmin) return null;

  return (
    <Link
      href={`/admin?edit=${productId}`}
      className="btn-ink fixed bottom-24 left-4 z-40 h-11 rounded-full px-4 text-sm shadow-float md:bottom-6 md:left-6"
    >
      <Pencil size={15} /> Edit this product
    </Link>
  );
}
