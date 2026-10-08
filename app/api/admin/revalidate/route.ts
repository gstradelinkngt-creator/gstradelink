import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth/requireAdmin";

/**
 * POST /api/admin/revalidate  { productId?: string }
 *
 * Called by the admin panel after a product change so the public catalogue
 * updates immediately instead of waiting for the 60 s ISR window.
 */
export async function POST(request: Request) {
    const { user, isAdmin } = await getAdminUser();
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    if (!isAdmin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const body = (await request.json().catch(() => ({}))) as { productId?: unknown };

    revalidatePath("/");
    revalidatePath("/products");
    if (typeof body.productId === "string" && /^[0-9a-f-]{36}$/i.test(body.productId)) {
        revalidatePath(`/products/${body.productId}`);
    }

    return NextResponse.json({ revalidated: true });
}
