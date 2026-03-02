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
            <div className="fixed top-4 right-4 z-[99] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
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
            className="pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl animate-in slide-in-from-right-5 fade-in duration-300"
            style={{
                background: isSuccess ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                border: `1px solid ${isSuccess ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                backdropFilter: "blur(16px)",
            }}
        >
            {isSuccess ? (
                <CheckCircle2 size={16} className="shrink-0" style={{ color: "#4ADE80" }} />
            ) : (
                <XCircle size={16} className="shrink-0" style={{ color: "#F87171" }} />
            )}
            <p
                className="flex-1 text-sm"
                style={{ color: isSuccess ? "#86EFAC" : "#FCA5A5" }}
            >
                {t.message}
            </p>
            <button
                onClick={() => onDismiss(t.id)}
                className="shrink-0 opacity-40 hover:opacity-80 transition-opacity"
                style={{ color: isSuccess ? "#86EFAC" : "#FCA5A5" }}
            >
                <X size={14} />
            </button>
        </div>
    );
}
