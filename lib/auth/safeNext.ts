/**
 * Sanitises a post-login redirect target. Only same-origin absolute paths
 * are allowed — "//evil.com" and "https://…" fall back to /admin.
 */
export function safeNext(next: string | null | undefined, fallback = "/admin"): string {
    if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
        return fallback;
    }
    return next;
}
