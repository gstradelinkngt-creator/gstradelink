import { supabase } from "@/lib/supabase";

export const BUCKET = "product-images";
const MAX_EDGE = 1600;

/**
 * Downscales a photo to at most 1600px on its longest edge and re-encodes it
 * as WebP. Phone photos drop from several MB to a few hundred KB, which keeps
 * the public catalogue fast. Falls back to the original file if the browser
 * can't decode it.
 */
export async function compressImage(file: File): Promise<Blob> {
    try {
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
        const w = Math.round(bitmap.width * scale);
        const h = Math.round(bitmap.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
        bitmap.close();
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
        return blob && blob.size < file.size ? blob : file;
    } catch {
        return file;
    }
}

/** Uploads a product photo and returns its public URL. */
export async function uploadProductImage(file: File): Promise<string> {
    const blob = await compressImage(file);
    const ext = blob.type === "image/webp" ? "webp" : (file.name.split(".").pop() ?? "jpg");
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
        contentType: blob.type || file.type,
        cacheControl: "31536000",
    });
    if (error) throw error;
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Extracts the in-bucket object path from a public storage URL. */
export function storagePathFromUrl(url: string | null): string | null {
    if (!url) return null;
    const marker = `/${BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.slice(idx + marker.length).split("?")[0] || null;
}

/** Best-effort image cleanup — never blocks the calling action. */
export async function removeProductImage(url: string | null) {
    const path = storagePathFromUrl(url);
    if (!path) return;
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) console.warn("[admin] image cleanup failed:", error.message);
}

/** Refreshes the public pages after a change (fire-and-forget). */
export function refreshPublicPages(productId?: string) {
    fetch("/api/admin/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
    }).catch(() => {});
}
