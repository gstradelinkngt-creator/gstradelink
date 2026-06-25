export default function Loading() {
  return (
    <div className="min-h-screen bg-background-secondary pb-28 md:pb-12">
      {/* ── Sticky header skeleton ──────────────────────────────── */}
      <section
        className="sticky top-0 z-30 backdrop-blur-md shadow-sm border-b"
        style={{
          background: "rgba(232, 235, 227, 0.96)",
          borderColor: "rgba(203, 220, 235, 0.5)",
        }}
      >
        <div className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-5 pb-4 md:pt-7 md:pb-5 mx-auto">
          {/* Title row skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 md:mb-6 animate-pulse">
            <div>
              <div
                className="h-2.5 rounded-full w-20 mb-3"
                style={{ background: "rgba(62,94,133,0.12)" }}
              />
              <div
                className="h-8 sm:h-10 rounded w-52 mb-2.5 max-w-full"
                style={{ background: "rgba(62,94,133,0.10)" }}
              />
              <div
                className="hidden sm:block h-3 rounded-full w-80 max-w-full"
                style={{ background: "rgba(62,94,133,0.07)" }}
              />
            </div>
            <div
              className="hidden sm:block h-7 w-32 rounded animate-pulse"
              style={{ background: "rgba(62,94,133,0.08)" }}
            />
          </div>

          {/* Search bar skeleton */}
          <div
            className="w-full h-11 sm:h-12 rounded-full border mb-4 animate-pulse"
            style={{
              background: "rgba(255,255,255,0.8)",
              borderColor: "#CBDCEB",
            }}
          />

          {/* Category chips skeleton */}
          <div className="flex items-center gap-1.5">
            {/* Left arrow placeholder */}
            <div
              className="hidden sm:block w-7 h-7 rounded-full shrink-0 animate-pulse"
              style={{ background: "rgba(62,94,133,0.08)" }}
            />

            {/* Chips */}
            <div className="flex gap-2 overflow-hidden flex-1">
              {[52, 76, 68, 72, 82, 82, 78, 72].map((w, i) => (
                <div
                  key={i}
                  className="h-8 shrink-0 rounded-full animate-pulse"
                  style={{
                    width: `${w}px`,
                    background:
                      i === 0 ? "rgba(62,94,133,0.18)" : "rgba(62,94,133,0.09)",
                  }}
                />
              ))}
            </div>

            {/* Right arrow placeholder */}
            <div
              className="hidden sm:block w-7 h-7 rounded-full shrink-0 animate-pulse"
              style={{ background: "rgba(62,94,133,0.08)" }}
            />
          </div>
        </div>
      </section>

      {/* ── Result count skeleton ───────────────────────────────── */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-5 mx-auto">
        <div
          className="h-3.5 w-36 rounded-full animate-pulse"
          style={{ background: "rgba(62,94,133,0.08)" }}
        />
      </section>

      {/* ── Product grid skeleton ───────────────────────────────── */}
      <section className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid #CBDCEB",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Image placeholder */}
              <div
                className="animate-pulse"
                style={{
                  aspectRatio: "4/3",
                  background: `rgba(62,94,133,${0.04 + (i % 3) * 0.02})`,
                }}
              />
              {/* Text placeholders */}
              <div style={{ padding: "14px" }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div
                    className="h-3.5 rounded-full flex-1 animate-pulse"
                    style={{ background: "rgba(62,94,133,0.10)" }}
                  />
                  <div
                    className="w-7 h-7 rounded-full shrink-0 animate-pulse"
                    style={{ background: "rgba(62,94,133,0.07)" }}
                  />
                </div>
                <div
                  className="h-3 rounded-full w-2/3 animate-pulse"
                  style={{ background: "rgba(62,94,133,0.06)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
