import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/admin";

    console.log(`[auth/callback] Hit. origin=${origin}, code=${!!code}, next=${next}`);

    if (code) {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("[auth/callback] Code exchange failed:", error.message, error.name);
            return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent(error.message)}`);
        }

        if (user) {
            console.log(`[auth/callback] Session exchange successful for user ${user.id} (${user.email})`);

            // Check the profile role directly here
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (profileError) {
                console.error("[auth/callback] Error fetching profile for user:", profileError.message);
            } else if (profile) {
                console.log(`[auth/callback] User role is: ${profile.role}`);
                if (profile.role !== "admin") {
                    console.log(`[auth/callback] Redirecting non-admin user to home page: ${origin}/`);
                    return NextResponse.redirect(`${origin}/`);
                }
            }

            console.log(`[auth/callback] Redirecting admin user to: ${origin}${next}`);

            const isLocalUrl = next.startsWith("/");
            if (isLocalUrl) {
                return NextResponse.redirect(`${origin}${next}`);
            }
            return NextResponse.redirect(`${origin}/admin`);
        }
    } else {
        console.error("[auth/callback] No code parameter provided in URL.");
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/admin/login?error=auth_callback_failed`);
}
