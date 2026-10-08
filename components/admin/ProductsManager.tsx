"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ExternalLink, ImageOff, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { CATEGORY_ADMIN_LABELS, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/categories";
import { refreshPublicPages, removeProductImage } from "@/lib/admin/products";
import type { Product } from "@/types";
import { useToast } from "./AdminToast";
import { ProductEditor } from "./ProductEditor";
import { Switch } from "./Switch";

type StatusFilter = "all" | "live" | "hidden";

const fetchProducts = () => supabase.from("products").select("*").order("created_at", { ascending: false });

interface ProductsManagerProps {
  editId: string | null;
  creating: boolean;
  /** null id = create a new product */
  onOpenEditor: (id: string | null) => void;
  onCloseEditor: () => void;
}

export function ProductsManager({ editId, creating, onOpenEditor, onCloseEditor }: ProductsManagerProps) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const apply = useCallback(
    ({ data, error }: { data: unknown; error: unknown }) => {
      if (error) toast("error", "Couldn't load products. Check your connection and refresh.");
      else setProducts((data ?? []) as Product[]);
      setLoading(false);
    },
    [toast],
  );

  const load = () => {
    setLoading(true);
    fetchProducts().then(apply);
  };

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then((r) => !cancelled && apply(r));
    return () => {
      cancelled = true;
    };
  }, [apply]);

  const counts = useMemo(
    () => ({
      all: products.length,
      live: products.filter((p) => p.is_active).length,
      hidden: products.filter((p) => !p.is_active).length,
    }),
    [products],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (status === "all" || (status === "live" ? p.is_active : !p.is_active)) &&
        (!q || p.name.toLowerCase().includes(q) || (p.short_description ?? "").toLowerCase().includes(q)),
    );
  }, [products, query, category, status]);

  const editing = editId ? (products.find((p) => p.id === editId) ?? null) : null;
  const editorOpen = creating || Boolean(editing);

  const toggleLive = async (p: Product) => {
    setBusyId(p.id);
    // Optimistic update, rolled back on failure
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, is_active: !p.is_active } : x)));
    const { error } = await supabase.from("products").update({ is_active: !p.is_active }).eq("id", p.id);
    if (error) {
      setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, is_active: p.is_active } : x)));
      toast("error", `Couldn't update "${p.name}".`);
    } else {
      toast("success", p.is_active ? `"${p.name}" hidden from the site.` : `"${p.name}" is live.`);
      refreshPublicPages(p.id);
    }
    setBusyId(null);
  };

  const remove = async (p: Product) => {
    setBusyId(p.id);
    setConfirmDeleteId(null);
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast("error", `Couldn't delete "${p.name}".`);
    } else {
      await removeProductImage(p.image_url);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      toast("success", `"${p.name}" deleted.`);
      refreshPublicPages(p.id);
    }
    setBusyId(null);
  };

  const onSaved = (saved: Product, isNew: boolean) => {
    setProducts((prev) => (isNew ? [saved, ...prev] : prev.map((x) => (x.id === saved.id ? saved : x))));
    refreshPublicPages(saved.id);
  };

  return (
    <div>
      {/* ── Heading ─────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-ink">Products</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {loading ? "Loading…" : `${counts.live} live · ${counts.hidden} hidden · ${counts.all} total`}
          </p>
        </div>
        <button type="button" onClick={() => onOpenEditor(null)} className="btn-ink h-11 px-5 text-sm">
          <Plus size={17} /> Add product
        </button>
      </div>

      {/* ── Toolbar ─────────────────────────────────────── */}
      <div className="mt-6 flex flex-col gap-2 lg:flex-row">
        <label className="flex h-11 w-full shrink-0 items-center gap-2 rounded-xl border border-line bg-surface px-3.5 focus-within:border-ink lg:w-auto lg:flex-1">
          <Search size={17} className="shrink-0 text-ink-mute" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink focus:outline-none"
          />
        </label>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="cat-filter">
            Category
          </label>
          <select
            id="cat-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory | "all")}
            className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 text-sm text-ink focus:border-ink focus:outline-none lg:w-52 lg:flex-none"
          >
            <option value="all">All categories</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_ADMIN_LABELS[c]}
              </option>
            ))}
          </select>
          <div className="flex h-11 shrink-0 rounded-xl border border-line bg-surface p-1" role="group" aria-label="Status">
            {(["all", "live", "hidden"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                aria-pressed={status === s}
                className={cn(
                  "rounded-lg px-3 text-sm font-medium capitalize transition-colors",
                  status === s ? "bg-ink text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={load}
            title="Reload"
            aria-label="Reload products"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft hover:text-ink"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : undefined} />
          </button>
        </div>
      </div>

      {/* ── List ────────────────────────────────────────── */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
        {loading && products.length === 0 ? (
          <ul className="divide-y divide-line">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className="flex items-center gap-4 p-4">
                <div className="h-14 w-14 animate-pulse rounded-xl bg-paper-2" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 animate-pulse rounded-full bg-paper-2" />
                  <div className="h-3 w-1/4 animate-pulse rounded-full bg-paper-2" />
                </div>
              </li>
            ))}
          </ul>
        ) : visible.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              {products.length === 0 ? "No products yet" : "Nothing matches these filters"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {products.length === 0
                ? "Add your first product to start the catalogue."
                : "Try a different search, category or status."}
            </p>
            {products.length === 0 && (
              <button type="button" onClick={() => onOpenEditor(null)} className="btn-ink mt-5 h-10 px-4 text-sm">
                <Plus size={16} /> Add product
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {visible.map((p) => (
              <li
                key={p.id}
                className={cn(
                  "group flex items-center gap-3 p-3 transition-colors hover:bg-paper/60 sm:gap-4 sm:px-4",
                  !p.is_active && "bg-paper/40",
                )}
              >
                <button
                  type="button"
                  onClick={() => onOpenEditor(p.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4"
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-paper-2">
                    {p.image_url ? (
                      <Image src={p.image_url} alt="" fill sizes="56px" className={cn("object-cover", !p.is_active && "opacity-50 grayscale")} />
                    ) : (
                      <ImageOff size={18} className="absolute inset-0 m-auto text-ink-mute" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className={cn("block truncate font-semibold", p.is_active ? "text-ink" : "text-ink-mute")}>
                      {p.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-mute">
                      {CATEGORY_ADMIN_LABELS[p.category] ?? p.category}
                      <span className="hidden sm:inline">
                        {" · "}added {new Date(p.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </span>
                  </span>
                </button>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <label className="flex items-center gap-2 pr-1 sm:pr-2" title={p.is_active ? "Live on site — click to hide" : "Hidden — click to publish"}>
                    <span className={cn("hidden text-xs font-medium sm:inline", p.is_active ? "text-wa-deep" : "text-ink-mute")}>
                      {p.is_active ? "Live" : "Hidden"}
                    </span>
                    <Switch
                      checked={p.is_active}
                      disabled={busyId === p.id}
                      onChange={() => toggleLive(p)}
                      label={`${p.name} visible on site`}
                    />
                  </label>

                  {confirmDeleteId === p.id ? (
                    <span className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => remove(p)}
                        className="h-8 rounded-lg bg-red-600 px-3 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="h-8 rounded-lg px-2.5 text-xs font-semibold text-ink-soft hover:bg-paper-2"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <>
                      <IconButton label="Edit" onClick={() => onOpenEditor(p.id)} className="hidden sm:flex">
                        <Pencil size={15} />
                      </IconButton>
                      <IconButton label="View on site" href={`/products/${p.id}`} className="hidden sm:flex">
                        <ExternalLink size={15} />
                      </IconButton>
                      <IconButton label="Delete" onClick={() => setConfirmDeleteId(p.id)} danger>
                        <Trash2 size={15} />
                      </IconButton>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editorOpen && (
        <ProductEditor
          key={editing?.id ?? "new"}
          product={editing}
          onClose={onCloseEditor}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  href,
  danger,
  className,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cn(
    "flex h-9 w-9 items-center justify-center rounded-lg text-ink-mute transition-colors",
    danger ? "hover:bg-red-50 hover:text-red-600" : "hover:bg-paper-2 hover:text-ink",
    className,
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label} className={cls}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} title={label} aria-label={label} className={cls}>
      {children}
    </button>
  );
}
