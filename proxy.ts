import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

/**
 * Proxy (formerly Next.js Middleware): protect /admin/* routes server-side
 * with real JWT verification.
 *
 * 1. Verifies JWT via Supabase's getUser() (not cookie sniffing)
 * 2. Checks profiles.role = 'admin' with auto-bootstrap
 * 3. Refreshes session tokens via @supabase/ssr
 * 4. Adds security headers to admin responses
 *
 * Note: OAuth callback is handled by /auth/callback Route Handler, not here.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabase, response } = createMiddlewareClient(request);

  // ── Protect /admin routes (not /admin/login) ─────────────────────────────
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const redirectWithCookies = (url: URL) => {
      const redirectResponse = NextResponse.redirect(url);
      const cookiesToSet = response.headers.getSetCookie();
      for (const cookie of cookiesToSet) {
        redirectResponse.headers.append("Set-Cookie", cookie);
      }
      return redirectResponse;
    };

    if (userError || !user) {
      console.log("[middleware] No user found or error:", userError?.message || "User is null", "Redirecting to login");
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return redirectWithCookies(loginUrl);
    }

    // Role check
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.log(`[middleware] Error fetching profile for ${user.id}:`, profileError?.message);
      // Profile missing → auto-create. First user = admin.
      const { count } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      const isFirstUser = (count ?? 0) === 0;
      const assignedRole = isFirstUser ? "admin" : "user";
      console.log(`[middleware] Auto-creating profile for ${user.id} with role: ${assignedRole}`);

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: user.id, email: user.email, role: assignedRole });

      if (insertError) {
        console.warn("[middleware] profiles insert failed:", insertError.message);
      } else if (assignedRole !== "admin") {
        console.log(`[middleware] New user ${user.email} is not admin, redirecting to home.`);
        return redirectWithCookies(new URL("/?auth=not-authorized", request.url));
      }
    } else if (profile.role !== "admin") {
      console.log(`[middleware] User ${user.email} has role '${profile.role}', denying admin access.`);
      return redirectWithCookies(new URL("/?auth=not-authorized", request.url));
    }

    // Admin user authenticated successfully
    console.log(`[middleware] Admin access granted to ${user.email}`);
  }

  // ── Security headers for admin ───────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
