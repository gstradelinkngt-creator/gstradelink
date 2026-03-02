"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

export function FieldLabel({
    icon: Icon,
    children,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <label className="flex items-center gap-2 mb-2">
            <Icon size={13} className="text-accent-500" />
            <span
                className="text-[11px] font-semibold uppercase tracking-widest text-primary-200/60"
            >
                {children}
            </span>
        </label>
    );
}

export function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-3 rounded-xl bg-primary-900 border border-white/10 text-white text-sm transition-all focus:outline-none focus:border-accent-500/50 focus:bg-primary-800 placeholder-primary-200/30 ${props.className ?? ""}`}
            style={props.style as React.CSSProperties}
        />
    );
}

export function FieldTextarea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
    return (
        <textarea
            {...props}
            className={`w-full px-4 py-3 rounded-xl bg-primary-900 border border-white/10 text-white text-sm resize-none transition-all focus:outline-none focus:border-accent-500/50 focus:bg-primary-800 placeholder-primary-200/30 ${props.className ?? ""}`}
            style={props.style as React.CSSProperties}
        />
    );
}

export function FieldSelect({
    children,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <select
                {...props}
                className="w-full px-4 py-3 rounded-xl bg-primary-900 border border-white/10 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-accent-500/50 focus:bg-primary-800"
            >
                {children}
            </select>
            <ChevronRight
                size={14}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-primary-200/30"
            />
        </div>
    );
}
