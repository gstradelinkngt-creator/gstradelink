import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/requireAdmin";
import { AdminApp } from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

/**
 * The proxy already blocks non-admins; this server check lets the dashboard
 * render immediately with the admin's identity instead of re-checking the
 * session in the browser behind a spinner.
 */
export default async function AdminPage() {
  const { user, isAdmin } = await getAdminUser();
  if (!user || !isAdmin) redirect("/admin/login");

  return <AdminApp email={user.email ?? "admin"} userId={user.id} />;
}
