"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/**
 * Current signed-in user (from the persisted session cookie) and whether
 * they are an admin. Used for admin shortcuts on public pages; all real
 * authorisation still happens server-side and in RLS.
 */
export function useSessionRole() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const resolve = async (u: User | null) => {
            if (cancelled) return;
            setUser(u);
            if (!u) {
                setIsAdmin(false);
                return;
            }
            const { data } = await supabase.from("profiles").select("role").eq("id", u.id).single();
            if (!cancelled) setIsAdmin(data?.role === "admin");
        };

        supabase.auth.getSession().then(({ data: { session } }) => resolve(session?.user ?? null));
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            resolve(session?.user ?? null);
        });

        return () => {
            cancelled = true;
            subscription.unsubscribe();
        };
    }, []);

    return { user, isAdmin };
}
