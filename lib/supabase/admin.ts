import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. SERVER-ONLY.
 *
 * Bypasses Row-Level Security and can call the Auth admin API
 * (e.g. deleting auth.users). NEVER import this into a Client Component
 * or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.",
        );
    }

    return createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
}
