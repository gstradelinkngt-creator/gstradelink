import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/requireAdmin";
import { safeNext } from "@/lib/auth/safeNext";
import { LoginCard } from "@/components/admin/LoginCard";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  not_admin: "That Google account doesn't have admin access. Ask an existing admin to grant it.",
  auth_callback_failed: "Sign-in didn't complete. Please try again.",
};

/**
 * Server-side check first: an admin with a valid session cookie is sent
 * straight to the dashboard — no login screen, no client-side flash.
 */
export default async function LoginPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await props.searchParams;
  const next = safeNext(typeof sp.next === "string" ? sp.next : null);
  const errorKey = typeof sp.error === "string" ? sp.error : null;

  const { user, isAdmin } = await getAdminUser();
  if (user && isAdmin) redirect(next);

  return (
    <LoginCard
      next={next}
      error={errorKey ? (ERRORS[errorKey] ?? "Sign-in failed. Please try again.") : null}
      signedInAs={user && !isAdmin ? (user.email ?? null) : null}
    />
  );
}
