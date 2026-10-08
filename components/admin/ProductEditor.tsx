"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { CATEGORY_OPTIONS, DEFAULT_CATEGORY, type ProductCategory } from "@/lib/categories";
import { removeProductImage, uploadProductImage } from "@/lib/admin/products";
import type { Product } from "@/types";
import { useToast } from "./AdminToast";
import { Switch } from "./Switch";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // pre-compression limit
const ALLOWED_MIME = ["image/png", "image/jpeg", "image/webp"];

interface ProductEditorProps {
  /** null → create mode */
  product: Product | null;
  onClose: () => void;
  onSaved: (product: Product, isNew: boolean) => void;
}

/** Slide-over panel for adding and editing a product. */
export function ProductEditor({ product, onClose, onSaved }: ProductEditorProps) {
  const { toast } = useToast();
  const isNew = product === null;

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<ProductCategory>(product?.category ?? DEFAULT_CATEGORY);
  const [desc, setDesc] = useState(product?.short_description ?? "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product?.image_url ?? null);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; image?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dirty =
    file !== null ||
    name !== (product?.name ?? "") ||
    category !== (product?.category ?? DEFAULT_CATEGORY) ||
    desc !== (product?.short_description ?? "") ||
    isActive !== (product?.is_active ?? true);

  const requestClose = () => {
    if (dirty && !saving && !window.confirm("Discard unsaved changes?")) return;
    onClose();
  };

  // Escape closes; lock background scroll; focus the name field
  useEffect(() => {
    nameRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Free object URLs for local previews
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const pickFile = (f: File | null | undefined) => {
    if (!f) return;
    if (!ALLOWED_MIME.includes(f.type)) {
      setErrors((e) => ({ ...e, image: "Use a PNG, JPG or WebP photo." }));
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, image: "That file is over 15 MB. Try a smaller photo." }));
      return;
    }
    setErrors((e) => ({ ...e, image: undefined }));
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Paste an image straight from the clipboard
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = [...(e.clipboardData?.items ?? [])].find((i) => i.type.startsWith("image/"));
      if (item) pickFile(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  });

  const save = async (andAnother: boolean) => {
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Give the product a name.";
    if (isNew && !file) nextErrors.image = "Add a product photo.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      return;
    }

    setSaving(true);
    try {
      const imageUrl = file ? await uploadProductImage(file) : (product?.image_url ?? null);
      const fields = {
        name: name.trim(),
        category,
        short_description: desc.trim() || null,
        image_url: imageUrl,
        is_active: isActive,
      };

      const { data, error } = isNew
        ? await supabase.from("products").insert(fields).select().single()
        : await supabase.from("products").update(fields).eq("id", product.id).select().single();
      if (error) throw error;

      // Replace succeeded → clean up the previous photo
      if (file && product?.image_url) await removeProductImage(product.image_url);

      onSaved(data as Product, isNew);
      toast("success", isNew ? `"${fields.name}" added${isActive ? " and live" : ""}.` : `"${fields.name}" saved.`);
      if (andAnother) {
        // Keep category + visibility (usually the same for a batch), clear the rest
        setName("");
        setDesc("");
        setFile(null);
        setPreview(null);
        setErrors({});
        nameRef.current?.focus();
      } else {
        onClose();
      }
    } catch (err) {
      toast("error", err instanceof Error ? err.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="editor-title">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={requestClose} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save(false);
        }}
        className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-paper shadow-float animate-slide-in-right"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id="editor-title" className="font-display text-xl font-semibold tracking-tight text-ink">
            {isNew ? "Add product" : "Edit product"}
          </h2>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-paper-2 hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
          {/* Photo */}
          <div>
            <span className="text-sm font-semibold text-ink">Photo</span>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                pickFile(e.dataTransfer.files?.[0]);
              }}
              className={cn(
                "relative mt-2 aspect-[4/3] overflow-hidden rounded-2xl border-2 border-dashed transition-colors",
                dragging ? "border-signal bg-signal-soft" : preview ? "border-transparent" : "border-line-strong bg-surface",
                errors.image && "border-red-400",
              )}
            >
              {preview ? (
                <>
                  <Image src={preview} alt="Product photo preview" fill sizes="576px" className="object-cover" unoptimized={preview.startsWith("blob:")} />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-1.5 rounded-lg bg-white/95 px-3 text-sm font-semibold text-ink shadow-lift hover:bg-white"
                  >
                    <ImagePlus size={15} /> Replace
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper-2 text-ink-soft">
                    <ImagePlus size={22} />
                  </span>
                  <span className="text-sm font-semibold text-ink">Drop a photo, click to browse, or paste</span>
                  <span className="text-xs text-ink-mute">PNG, JPG or WebP — resized automatically</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                tabIndex={-1}
                onChange={(e) => {
                  pickFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </div>
            {errors.image && <p className="mt-1.5 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="p-name" className="text-sm font-semibold text-ink">
              Name
            </label>
            <input
              id="p-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Fuzion Professional Scale 200g (0.01g)"
              maxLength={120}
              aria-invalid={Boolean(errors.name)}
              className={cn(
                "mt-2 h-11 w-full rounded-xl border bg-surface px-3.5 text-[0.95rem] text-ink focus:border-ink focus:outline-none",
                errors.name ? "border-red-400" : "border-line-strong",
              )}
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="p-cat" className="text-sm font-semibold text-ink">
              Category
            </label>
            <select
              id="p-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="mt-2 h-11 w-full rounded-xl border border-line-strong bg-surface px-3 text-[0.95rem] text-ink focus:border-ink focus:outline-none"
            >
              {CATEGORY_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="p-desc" className="text-sm font-semibold text-ink">
                Short description
              </label>
              <span className="font-mono text-xs text-ink-mute">{desc.length}/240</span>
            </div>
            <textarea
              id="p-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={240}
              rows={3}
              placeholder="Capacity, readability, power — what a customer asks first."
              className="mt-2 w-full resize-none rounded-xl border border-line-strong bg-surface px-3.5 py-3 text-[0.95rem] text-ink focus:border-ink focus:outline-none"
            />
          </div>

          {/* Visibility */}
          <label className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5">
            <span>
              <span className="block text-sm font-semibold text-ink">Show on website</span>
              <span className="block text-xs text-ink-mute">Hidden products stay saved but customers can&apos;t see them.</span>
            </span>
            <Switch checked={isActive} onChange={setIsActive} label="Show on website" />
          </label>
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-line bg-surface p-4 sm:flex-row sm:justify-end">
          <button type="button" onClick={requestClose} className="btn-line h-11 px-5 text-sm">
            Cancel
          </button>
          {isNew && (
            <button type="button" onClick={() => save(true)} disabled={saving} className="btn-line h-11 px-5 text-sm disabled:opacity-50">
              Save &amp; add another
            </button>
          )}
          <button type="submit" disabled={saving} className="btn-ink h-11 px-6 text-sm disabled:opacity-60">
            {saving && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            {saving ? "Saving…" : isNew ? "Add product" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
