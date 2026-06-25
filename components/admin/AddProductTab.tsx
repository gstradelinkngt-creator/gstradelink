"use client";

import { useState } from "react";
import { Plus, FileText, Tag, ImageIcon, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./AdminToast";
import { ImageDropzone } from "./ImageDropzone";
import { FieldLabel, FieldInput, FieldTextarea, FieldSelect } from "./AdminFields";
import { CATEGORY_OPTIONS, DEFAULT_CATEGORY } from "@/lib/categories";

export function AddProductTab() {
    const { toast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState<string>(DEFAULT_CATEGORY);
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (f: File | null) => {
        setFile(f);
        if (f) { const r = new FileReader(); r.onloadend = () => setPreview(r.result as string); r.readAsDataURL(f); }
        else setPreview(null);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) { toast("error", "Please select an image."); return; }
        setUploading(true);
        try {
            const ext = file.name.split(".").pop();
            const fileName = `${Date.now()}.${ext}`;
            const { error: uploadError } = await supabase.storage.from("product-images").upload(fileName, file);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
            const { error: dbError } = await supabase.from("products").insert([{ name, category, short_description: desc, image_url: publicUrl, is_active: true }]);
            if (dbError) throw dbError;
            toast("success", `"${name}" published!`);
            setName(""); setDesc(""); setFile(null); setPreview(null); setCategory(DEFAULT_CATEGORY);
        } catch (err) { toast("error", err instanceof Error ? err.message : "Unexpected error."); }
        finally { setUploading(false); }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '100ms' }}>
                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-[1fr_1.2fr]">
                        {/* Image column */}
                        <div className="p-5 sm:p-6 md:p-8 border-b border-slate-800 lg:border-b-0 lg:border-r">
                            <div className="flex items-center gap-2 mb-6">
                                <ImageIcon size={14} className="text-amber-500" />
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">Product Image</span>
                            </div>
                            <ImageDropzone
                                preview={preview} dragActive={dragActive}
                                onDragEvent={handleDrag} onDrop={handleDrop}
                                onChange={handleFileChange} onClear={() => handleFileChange(null)}
                                onError={(msg) => toast("error", msg)}
                            />
                        </div>
                        {/* Fields column */}
                        <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                            <div>
                                <FieldLabel icon={FileText}>Product Name</FieldLabel>
                                <FieldInput value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Heavy Duty Platform Scale" required />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag size={13} className="text-amber-500" />
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">Category</span>
                                </div>
                                <FieldSelect value={category} onChange={e => setCategory(e.target.value)}>
                                    {CATEGORY_OPTIONS.map(({ value, label }) => (<option key={value} value={value} className="bg-slate-800 text-slate-100">{label}</option>))}
                                </FieldSelect>
                            </div>
                            <div>
                                <FieldLabel icon={FileText}>Short Description</FieldLabel>
                                <FieldTextarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Key specs — capacity, accuracy, material…" style={{ minHeight: "120px" }} />
                            </div>
                            <button
                                type="submit" disabled={uploading}
                                className="w-full h-14 rounded-md font-semibold text-sm text-slate-900 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-amber-400 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-4 bg-amber-500 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.4)] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                {uploading ? <><div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />Uploading…</> : <><Plus size={18} />Publish Product</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* Tips */}
            <div className="flex gap-3 p-5 rounded-md bg-blue-900/20 border border-blue-500/30 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '200ms' }}>
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-blue-300" />
                <div>
                    <p className="text-xs font-semibold mb-2 text-blue-300">Tips for better listings</p>
                    <ul className="space-y-1.5">
                        {["Use high-quality images with a clean background", "Include specs — capacity, accuracy, and material", "Choose the most specific category available"].map(t => (
                            <li key={t} className="flex items-start gap-2 text-xs text-blue-300/80">
                                <span className="shrink-0 mt-0.5 text-blue-400">·</span>{t}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
