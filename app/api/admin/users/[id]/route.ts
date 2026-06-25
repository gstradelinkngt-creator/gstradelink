import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth/requireAdmin";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * DELETE /api/admin/users/[id]
 *
 * Permanently removes a user from auth.users (the profiles row cascades
 * away via the ON DELETE CASCADE foreign key). Runs server-side with the
 * service-role key — the only way to delete an auth user.
 *
 * Guards:
 *   - caller must be an authenticated admin
 *   - cannot delete your own account
 *   - cannot delete the last remaining admin (avoids lockout)
 */
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    const { user, isAdmin } = await getAdminUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    if (user.id === id) {
        return NextResponse.json(
            { error: "You cannot delete your own account." },
            { status: 400 },
        );
    }

    const admin = createAdminClient();

    // Prevent deleting the last admin.
    const { data: target } = await admin
        .from("profiles")
        .select("role")
        .eq("id", id)
        .single();

    if (target?.role === "admin") {
        const { count } = await admin
            .from("profiles")
            .select("id", { count: "exact", head: true })
            .eq("role", "admin");

        if ((count ?? 0) <= 1) {
            return NextResponse.json(
                { error: "Cannot delete the last remaining admin." },
                { status: 400 },
            );
        }
    }

    const { error } = await admin.auth.admin.deleteUser(id);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
