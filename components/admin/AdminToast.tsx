"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type ToastType = "success" | "error";
interface Toast {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastContextValue {
    toast: (type: ToastType, message: string) => void;
}

// ─── Context ────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
    return ctx;
}

// ─── Provider ───────────────────────────────────────────────────────────────
let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((type: ToastType, message: string) => {
        const id = ++nextId;
        setToasts((prev) => [...prev, { id, type, message }]);
    }, []);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast stack */}
            <div className="pointer-events-none fixed bottom-4 right-4 z-[99] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

// ─── Toast Item ─────────────────────────────────────────────────────────────
function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
    useEffect(() => {
        const timer = setTimeout(() => onDismiss(t.id), 5000);
        return () => clearTimeout(timer);
    }, [t.id, onDismiss]);

    const isSuccess = t.type === "success";

    return (
        <div
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5 shadow-float animate-fade-in"
        >
            {isSuccess ? (
                <CheckCircle2 size={18} className="shrink-0 text-wa" />
            ) : (
                <XCircle size={18} className="shrink-0 text-red-600" />
            )}
            <p className="flex-1 text-sm text-ink">{t.message}</p>
            <button
                type="button"
                onClick={() => onDismiss(t.id)}
                aria-label="Dismiss"
                className="shrink-0 text-ink-mute transition-colors hover:text-ink"
            >
                <X size={15} />
            </button>
        </div>
    );
}
