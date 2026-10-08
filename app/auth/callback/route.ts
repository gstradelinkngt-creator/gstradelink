import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/safeNext";

/**
 * OAuth callback: exchanges the code for a session cookie, then sends admins
 * to where they were heading. Non-admins are returned to the login page with
 * an explanation rather than silently bounced to the homepage.
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = safeNext(searchParams.get("next"));

    if (!code) {
        return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`);
    }

    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !user) {
        console.error("[auth/callback] Code exchange failed:", error?.message);
        return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`);
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    // No profile yet → let the proxy bootstrap it on the way into /admin.
    if (profile && profile.role !== "admin") {
        return NextResponse.redirect(`${origin}/admin/login?error=not_admin`);
    }

    return NextResponse.redirect(`${origin}${next}`);
}
