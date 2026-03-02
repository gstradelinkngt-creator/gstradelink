"use client";

import { useState } from "react";
import { Plus, FileText, Tag, ImageIcon, FolderPlus, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./AdminToast";
import { ImageDropzone } from "./ImageDropzone";
import { FieldLabel, FieldInput, FieldTextarea, FieldSelect } from "./AdminFields";

const DEFAULT_CATEGORIES = [
    { value: "Precision & Pocket Mini Scales", label: "Precision Scales" },
    { value: "Kitchen & Compact Tabletop Scales", label: "Kitchen Scales" },
    { value: "Portable & Luggage Scales", label: "Luggage Scales" },
    { value: "Heavy-Duty Hanging & Crane Scales", label: "Industrial Scales" },
    { value: "Personal Health & Bathroom Scales", label: "Health Scales" },
    { value: "Packaging & Miscellaneous Equipment", label: "Packaging Equipment" },
    { value: "Service", label: "Repair & Service" },
];

export function AddProductTab() {
    const { toast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Precision & Pocket Mini Scales");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    // Category mgmt
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newLabel, setNewLabel] = useState("");
    const [newValue, setNewValue] = useState("");

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

    const handleAddCategory = () => {
        const v = newValue.trim(), l = newLabel.trim();
        if (!v || !l) { toast("error", "Both fields are required."); return; }
        if (categories.some(c => c.value.toLowerCase() === v.toLowerCase())) { toast("error", "Category already exists."); return; }
        setCategories(prev => [...prev, { value: v, label: l }]);
        setCategory(v); setNewValue(""); setNewLabel(""); setShowAddCategory(false);
        toast("success", `Category "${l}" added.`);
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
            setName(""); setDesc(""); setFile(null); setPreview(null); setCategory("Precision & Pocket Mini Scales");
        } catch (err) { toast("error", err instanceof Error ? err.message : "Unexpected error."); }
        finally { setUploading(false); }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2">
                        {/* Image column */}
                        <div className="p-6 sm:p-8 border-b border-white/10 md:border-b-0 md:border-r">
                            <div className="flex items-center gap-2 mb-5">
                                <ImageIcon size={14} className="text-accent-500" />
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-200/60">Product Image</span>
                            </div>
                            <ImageDropzone
                                preview={preview} dragActive={dragActive}
                                onDragEvent={handleDrag} onDrop={handleDrop}
                                onChange={handleFileChange} onClear={() => handleFileChange(null)}
                                onError={(msg) => toast("error", msg)}
                            />
                        </div>
                        {/* Fields column */}
                        <div className="p-6 sm:p-8 space-y-5">
                            <div>
                                <FieldLabel icon={FileText}>Product Name</FieldLabel>
                                <FieldInput value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Heavy Duty Platform Scale" required />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="flex items-center gap-2">
                                        <Tag size={13} className="text-accent-500" />
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-200/60">Category</span>
                                    </label>
                                    <button type="button" onClick={() => setShowAddCategory(v => !v)} className="flex items-center gap-1 h-6 px-2 rounded-lg text-[11px] font-semibold transition-all hover:bg-white/10 text-accent-500 border border-accent-500/30">
                                        <FolderPlus size={11} />New
                                    </button>
                                </div>
                                {showAddCategory && (
                                    <div className="mb-3 p-4 rounded-2xl space-y-3 bg-accent-500/5 border border-accent-500/20">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-500">New Category</p>
                                        <FieldInput value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Display name (e.g., Lab Scales)" />
                                        <FieldInput value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Database value (e.g., Lab & Scientific Scales)" />
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <button type="button" onClick={handleAddCategory} className="py-2 rounded-xl text-xs font-semibold bg-accent-500/20 text-accent-400 hover:bg-accent-500/30 transition-colors">Add</button>
                                            <button type="button" onClick={() => { setShowAddCategory(false); setNewLabel(""); setNewValue(""); }} className="py-2 rounded-xl text-xs font-semibold hover:bg-white/10 text-primary-200/60 border border-white/10 transition-colors">Cancel</button>
                                        </div>
                                    </div>
                                )}
                                <FieldSelect value={category} onChange={e => setCategory(e.target.value)}>
                                    {categories.map(({ value, label }) => (<option key={value} value={value} className="bg-primary-900 text-slate-100">{label}</option>))}
                                </FieldSelect>
                            </div>
                            <div>
                                <FieldLabel icon={FileText}>Short Description</FieldLabel>
                                <FieldTextarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Key specs — capacity, accuracy, material…" style={{ minHeight: "100px" }} />
                            </div>
                            <button
                                type="submit" disabled={uploading}
                                className="w-full h-12 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2 bg-gradient-to-br from-accent-500 to-accent-600 shadow-[0_4px_20px_rgba(220,169,99,0.3)] hover:shadow-[0_6px_24px_rgba(220,169,99,0.4)]"
                            >
                                {uploading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading…</> : <><Plus size={16} />Publish Product</>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* Tips */}
            <div className="flex gap-3 p-5 rounded-2xl bg-primary-600/10 border border-primary-600/20">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-primary-400" />
                <div>
                    <p className="text-xs font-semibold mb-2 text-primary-200/70">Tips for better listings</p>
                    <ul className="space-y-1.5">
                        {["Use high-quality images with a clean background", "Include specs — capacity, accuracy, and material", "Choose the most specific category available"].map(t => (
                            <li key={t} className="flex items-start gap-2 text-xs text-primary-200/50">
                                <span className="shrink-0 mt-0.5 text-accent-500/70">·</span>{t}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
