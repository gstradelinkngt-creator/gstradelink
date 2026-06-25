export default function Loading() {
  return (
    <div className="aurora min-h-screen w-full overflow-hidden md:pb-16">
      {/* ── Hero skeleton ───────────────────────────────────────── */}
      <section className="aurora-grid relative overflow-hidden pb-6 pt-12 sm:pt-16">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-2.5 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mb-3 h-9 w-64 max-w-full animate-pulse rounded-lg bg-white/10" />
            <div className="mb-7 h-3 w-80 max-w-full animate-pulse rounded-full bg-white/[0.07]" />
            <div className="glass h-12 w-full max-w-xl animate-pulse rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Filter bar skeleton ─────────────────────────────────── */}
      <section className="relative z-20 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="glass-strong rounded-2xl p-2 sm:p-2.5">
          <div className="flex items-center gap-2 overflow-hidden">
            {[52, 76, 68, 72, 82, 82, 78].map((w, i) => (
              <div
                key={i}
                className="h-9 shrink-0 animate-pulse rounded-full"
                style={{
                  width: `${w}px`,
                  background:
                    i === 0 ? "rgba(220,169,99,0.35)" : "rgba(255,255,255,0.07)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Result count skeleton ───────────────────────────────── */}
      <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="h-3.5 w-36 animate-pulse rounded-full bg-white/[0.08]" />
      </section>

      {/* ── Product grid skeleton ───────────────────────────────── */}
      <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="glass ui-card rounded-2xl">
              <div
                className="ui-media ui-media-4-3 animate-pulse"
                style={{ background: `rgba(255,255,255,${0.04 + (i % 3) * 0.02})` }}
              />
              <div className="ui-card-body p-4">
                <div className="mb-2 h-3.5 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/[0.07]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
