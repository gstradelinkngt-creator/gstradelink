export default function Loading() {
  return (
    <div className="pb-20" aria-busy="true" aria-label="Loading products">
      <section className="container-site pt-10 md:pt-14">
        <div className="h-3 w-32 animate-pulse rounded-full bg-paper-2" />
        <div className="mt-4 h-12 w-72 max-w-full animate-pulse rounded-xl bg-paper-2" />
        <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded-full bg-paper-2" />
      </section>

      <div className="mt-8 border-y border-line">
        <div className="container-site flex gap-2 overflow-hidden py-2.5">
          {[48, 88, 72, 76, 84, 104, 92].map((w, i) => (
            <div key={i} className="h-9 shrink-0 animate-pulse rounded-full bg-paper-2" style={{ width: w }} />
          ))}
        </div>
      </div>

      <section className="container-site mt-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="aspect-[4/3] animate-pulse bg-paper-2" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-4/5 animate-pulse rounded-full bg-paper-2" />
                <div className="h-3 w-1/2 animate-pulse rounded-full bg-paper-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
