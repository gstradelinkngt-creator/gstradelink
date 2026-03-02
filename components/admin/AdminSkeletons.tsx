"use client";

/**
 * Skeleton loading components for the admin panel.
 * Provides consistent shimmer effect during data fetches.
 */

function Shimmer({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={`animate-pulse rounded-xl ${className}`}
            style={{ background: "rgba(255,255,255,0.06)", ...style }}
        />
    );
}

export function ProductListSkeleton() {
    return (
        <div className="space-y-5">
            {/* Stats skeleton */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <Shimmer style={{ width: "48px", height: "32px", marginBottom: "8px" }} />
                        <Shimmer style={{ width: "60px", height: "12px" }} />
                    </div>
                ))}
            </div>
            {/* Search skeleton */}
            <Shimmer className="rounded-2xl" style={{ height: "48px" }} />
            {/* Row skeletons */}
            <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <Shimmer style={{ width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0 }} />
                        <div className="flex-1 space-y-2">
                            <Shimmer style={{ width: "60%", height: "14px" }} />
                            <Shimmer style={{ width: "35%", height: "10px" }} />
                        </div>
                        <Shimmer style={{ width: "64px", height: "24px", borderRadius: "999px" }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function UserListSkeleton() {
    return (
        <div className="space-y-5">
            {/* Stats skeleton */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 sm:p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <Shimmer style={{ width: "40px", height: "32px", marginBottom: "8px" }} />
                        <Shimmer style={{ width: "70px", height: "12px" }} />
                    </div>
                ))}
            </div>
            {/* Info box skeleton */}
            <Shimmer className="rounded-2xl" style={{ height: "52px" }} />
            {/* Search skeleton */}
            <Shimmer className="rounded-2xl" style={{ height: "48px" }} />
            {/* Row skeletons */}
            <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <Shimmer style={{ width: "40px", height: "40px", borderRadius: "12px", flexShrink: 0 }} />
                        <div className="flex-1 space-y-2">
                            <Shimmer style={{ width: "50%", height: "14px" }} />
                            <Shimmer style={{ width: "30%", height: "10px" }} />
                        </div>
                        <Shimmer style={{ width: "56px", height: "24px", borderRadius: "999px" }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
