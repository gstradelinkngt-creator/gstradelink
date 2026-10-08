"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExternalLink, LogOut, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { ToastProvider } from "./AdminToast";
import { ProductsManager } from "./ProductsManager";
import { UsersManager } from "./UsersManager";

type Tab = "products" | "users";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "products", label: "Products", icon: Package },
  { id: "users", label: "Team", icon: Users },
];

interface AdminAppProps {
  email: string;
  userId: string;
}

export function AdminApp(props: AdminAppProps) {
  return (
    <ToastProvider>
      <Suspense fallback={null}>
        <AdminAppInner {...props} />
      </Suspense>
    </ToastProvider>
  );
}

function AdminAppInner({ email, userId }: AdminAppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab: Tab = searchParams.get("tab") === "users" ? "users" : "products";
  const [signingOut, setSigningOut] = useState(false);

  /** Updates query params without a navigation/scroll jump. */
  const setParams = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-dvh flex-col">
      {/* ── Top bar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" title="View website">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white p-1">
              <Image src="/logo.png" alt="" width={36} height={36} className="h-full w-full object-contain" />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-base font-bold tracking-tight text-ink">GSTradeLink</span>
              <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal-deep">
                Admin
              </span>
            </span>
          </Link>

          <nav className="ml-2 flex items-center gap-1 rounded-xl border border-line bg-surface p-1" aria-label="Admin sections">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setParams({ tab: id === "products" ? null : id, edit: null, new: null })}
                aria-current={tab === id ? "page" : undefined}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
                  tab === id ? "bg-ink text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink-soft hover:text-ink md:inline-flex"
            >
              View site <ExternalLink size={14} />
            </Link>
            <span
              className="hidden max-w-[12rem] truncate rounded-lg bg-surface px-3 py-1.5 text-xs text-ink-soft ring-1 ring-line lg:block"
              title={email}
            >
              {email}
            </span>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              title="Sign out"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {tab === "products" ? (
          <ProductsManager
            editId={searchParams.get("edit")}
            creating={searchParams.get("new") === "1"}
            onOpenEditor={(id) => setParams(id ? { edit: id, new: null } : { new: "1", edit: null })}
            onCloseEditor={() => setParams({ edit: null, new: null })}
          />
        ) : (
          <UsersManager currentUserId={userId} />
        )}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-1 px-4 py-4 text-xs text-ink-mute sm:flex-row sm:px-6">
          <span>GSTradeLink admin</span>
          <span className="font-mono uppercase tracking-wider">Maintained by OMX Lab</span>
        </div>
      </footer>
    </div>
  );
}
