import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="aurora relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden p-6">
      <div className="aurora-orb aurora-orb--blue" style={{ width: 360, height: 360, top: -100, left: -80 }} />
      <div className="aurora-orb aurora-orb--gold" style={{ width: 300, height: 300, bottom: -120, right: -80, opacity: 0.5 }} />

      <div className="glass-strong relative z-10 w-full max-w-md rounded-3xl px-8 py-12 text-center">
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(109,148,197,0.16)", border: "1px solid rgba(109,148,197,0.3)" }}
        >
          <Search size={36} style={{ color: "#DCA963" }} />
        </div>

        <h1 className="mb-2 font-bold text-white" style={{ fontSize: "2rem", lineHeight: 1.2 }}>
          Page Not Found
        </h1>
        <p style={{ color: "#AECAE9", fontSize: "1rem", lineHeight: 1.6 }}>
          We couldn&apos;t find the page you were looking for. It might have been
          removed, renamed, or didn&apos;t exist in the first place.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="ui-btn ui-btn-md btn-gold w-full sm:w-auto">
            Return Home
          </Link>
          <Link href="/products" className="ui-btn ui-btn-md btn-glass w-full sm:w-auto">
            View Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
