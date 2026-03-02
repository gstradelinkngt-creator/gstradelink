"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";

  // Redirect if already authenticated
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(nextPath);
    });
  }, [router, nextPath]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/admin` },
    });
    if (oauthError) {
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(145deg, #0F1825 0%, #1A2433 40%, #0A1120 100%)" }}
    >
      {/* Ambient glows */}
      <div className="fixed top-0 right-0 pointer-events-none" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(220,169,99,0.07) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
      <div className="fixed bottom-0 left-0 pointer-events-none" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(62,94,133,0.12) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />
      {/* Grid texture */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")` }} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm transition-opacity hover:opacity-100" style={{ color: "rgba(174,202,233,0.6)" }}>
          <ArrowRight size={14} className="rotate-180" />
          Back to website
        </Link>

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Gold accent bar */}
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #DCA963 0%, #3E5E85 60%, transparent 100%)" }} />

          <div className="p-8 sm:p-10">
            {/* Logo & header */}
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-[68px] h-[68px] rounded-2xl mb-6"
                style={{ background: "linear-gradient(135deg, rgba(62,94,133,0.25), rgba(43,77,114,0.25))", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
              >
                <Image src="/logo.png" alt="GSTradeLink" width={40} height={40} className="object-contain" />
              </div>
              <h1 className="font-bold text-white mb-2" style={{ fontSize: "1.75rem", letterSpacing: "-0.025em" }}>
                Admin Portal
              </h1>
              <p style={{ color: "rgba(174,202,233,0.6)", fontSize: "0.9rem" }}>
                Sign in to manage products &amp; users
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-2xl mb-6" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
                <p className="text-sm" style={{ color: "#FCA5A5" }}>{error}</p>
              </div>
            )}

            {/* Google OAuth button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #DCA963 0%, #b87a2e 100%)",
                boxShadow: "0 6px 24px rgba(220,169,99,0.28)",
                color: "#fff",
                fontSize: "0.95rem",
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path fill="#fff" fillOpacity=".9" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.4 7.5 29 6 24 6 13 6 4 15 4 25s9 19 20 19 20-9 20-19c0-1.2-.1-2.4-.4-3.5z" />
                </svg>
              )}
              {loading ? "Redirecting to Google…" : "Continue with Google"}
            </button>

            {/* Security note */}
            <p className="text-center mt-8 text-xs" style={{ color: "rgba(174,202,233,0.35)" }}>
              <Lock size={11} className="inline mr-1" />
              Secured with Supabase Authentication
            </p>
          </div>
        </div>

        <p className="text-center mt-7 text-xs" style={{ color: "rgba(174,202,233,0.4)" }}>
          © {new Date().getFullYear()} GSTradeLink. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A1120" }}>
          <div className="w-8 h-8 border-2 border-white/10 border-t-[#DCA963]/60 rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
