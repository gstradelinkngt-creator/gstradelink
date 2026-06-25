import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

interface AdminCheck {
    user: User | null;
    isAdmin: boolean;
}

/**
 * Verifies the current request is from an authenticated admin.
 *
 * Uses the cookie-bound server client (real JWT verification via getUser)
 * and checks profiles.role = 'admin'. Use this in Route Handlers / Server
 * Actions before performing any privileged operation.
 */
export async function getAdminUser(): Promise<AdminCheck> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { user: null, isAdmin: false };

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    return { user, isAdmin: profile?.role === "admin" };
}
