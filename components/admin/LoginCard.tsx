"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface LoginCardProps {
  next: string;
  error: string | null;
  /** Email of a signed-in user who is not an admin. */
  signedInAs: string | null;
}

export function LoginCard({ next, error, signedInAs }: LoginCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);

  const signIn = async () => {
    setLoading(true);
    setOauthError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Default target keeps the exact callback URL already on Supabase's redirect allow-list
        redirectTo: `${window.location.origin}/auth/callback?next=${next === "/admin" ? "/admin" : encodeURIComponent(next)}`,
        // Lets an admin with several Google accounts pick the right one.
        queryParams: { prompt: "select_account" },
      },
    });
    if (err) {
      setOauthError("Couldn't reach Google. Check your connection and try again.");
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const message = oauthError ?? error;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-paper px-5 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-mute hover:text-ink">
          <ArrowLeft size={15} /> Back to website
        </Link>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-float">
          <div className="ruler opacity-60" aria-hidden />
          <div className="p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white p-1.5">
              <Image src="/logo.png" alt="" width={48} height={48} className="h-full w-full object-contain" />
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-[-0.03em] text-ink">Admin sign-in</h1>
            <p className="mt-2 text-sm text-ink-soft">
              Manage products and team access for GSTradeLink. You stay signed in on this device.
            </p>

            {message && (
              <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {message}
              </p>
            )}

            {signedInAs ? (
              <div className="mt-6 space-y-3">
                <p className="rounded-xl bg-paper px-4 py-3 text-sm text-ink-soft">
                  Signed in as <span className="font-semibold text-ink">{signedInAs}</span>, which isn&apos;t an admin
                  account.
                </p>
                <button type="button" onClick={signOut} className="btn-line h-12 w-full text-sm">
                  Sign out and use another account
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signIn}
                disabled={loading}
                className="btn-ink mt-8 h-12 w-full text-[0.95rem] disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
                  </svg>
                )}
                {loading ? "Opening Google…" : "Continue with Google"}
              </button>
            )}

            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-mute">
              <Lock size={12} /> Access is limited to approved admin accounts
            </p>
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-[0.68rem] uppercase tracking-wider text-ink-mute">
          Maintained by OMX Lab
        </p>
      </div>
    </main>
  );
}
