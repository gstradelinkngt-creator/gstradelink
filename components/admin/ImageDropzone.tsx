"use client";

import Image from "next/image";
import { Upload, X } from "lucide-react";
import React, { useCallback } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = ["image/png", "image/jpeg", "image/webp"];

interface ImageDropzoneProps {
    preview: string | null;
    dragActive: boolean;
    onDragEvent: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onChange: (f: File | null) => void;
    onClear: () => void;
    onError?: (msg: string) => void;
}

export function ImageDropzone({
    preview,
    dragActive,
    onDragEvent,
    onDrop,
    onChange,
    onClear,
    onError,
}: ImageDropzoneProps) {
    const validate = useCallback(
        (file: File): boolean => {
            if (!ALLOWED_MIME.includes(file.type)) {
                onError?.("Only PNG, JPG, and WebP images are allowed.");
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                onError?.("File size must be under 5 MB.");
                return false;
            }
            return true;
        },
        [onError],
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0] || null;
            if (f && !validate(f)) return;
            onChange(f);
        },
        [onChange, validate],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const f = e.dataTransfer.files?.[0];
            if (f && !validate(f)) return;
            onDrop(e);
        },
        [onDrop, validate],
    );

    return (
        <div
            className={`relative rounded-2xl overflow-hidden transition-all duration-200 border-2 border-dashed flex flex-col items-center justify-center
                ${dragActive ? "border-accent-500 bg-accent-500/10 scale-[1.02]" : preview ? "border-transparent bg-transparent" : "border-primary-600/30 bg-primary-900/30 hover:bg-white/5 hover:border-primary-400/50"}
            `}
            style={{
                minHeight: "260px",
            }}
            onDragEnter={onDragEvent}
            onDragLeave={onDragEvent}
            onDragOver={onDragEvent}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {preview ? (
                <div className="relative w-full h-full min-h-[260px] flex items-center justify-center">
                    <Image src={preview} alt="Preview" fill className="object-contain p-2" />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            onClear();
                        }}
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-danger-500 text-white hover:scale-110 shadow-lg"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
                    <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${dragActive ? "bg-accent-500 border border-accent-400 shadow-[0_0_20px_rgba(220,169,99,0.4)]" : "bg-primary-900 border border-primary-600/30"}`}
                    >
                        <Upload size={24} className={dragActive ? "text-primary-950" : "text-primary-400"} />
                    </div>
                    <div className="text-center px-4">
                        <p className={`text-sm font-semibold ${dragActive ? "text-accent-500" : "text-white/80"}`}>
                            {dragActive ? "Drop to upload" : "Drop image here or click"}
                        </p>
                        <p
                            className="text-xs mt-1.5 font-medium text-primary-200/50"
                        >
                            PNG · JPG · WebP — max 5 MB
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
