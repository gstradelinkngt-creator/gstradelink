"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
    Search, Pencil, Eye, EyeOff, Trash2, Package,
    ImageIcon, RefreshCw, X, FileText, Tag, Save,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./AdminToast";
import { ImageDropzone } from "./ImageDropzone";
import { FieldLabel, FieldInput, FieldTextarea, FieldSelect } from "./AdminFields";
import { ProductListSkeleton } from "./AdminSkeletons";

interface Product {
    id: string; name: string; category: string;
    short_description: string | null; image_url: string | null;
    is_active: boolean; created_at: string;
}

const CATEGORIES = [
    { value: "Precision & Pocket Mini Scales", label: "Precision Scales" },
    { value: "Kitchen & Compact Tabletop Scales", label: "Kitchen Scales" },
    { value: "Portable & Luggage Scales", label: "Luggage Scales" },
    { value: "Heavy-Duty Hanging & Crane Scales", label: "Industrial Scales" },
    { value: "Personal Health & Bathroom Scales", label: "Health Scales" },
    { value: "Packaging & Miscellaneous Equipment", label: "Packaging Equipment" },
    { value: "Service", label: "Repair & Service" },
];

export function ManageProductsTab() {
    const { toast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    // Edit drawer
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editName, setEditName] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editFile, setEditFile] = useState<File | null>(null);
    const [editPreview, setEditPreview] = useState<string | null>(null);
    const [editDragActive, setEditDragActive] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            setProducts(data || []);
        } catch { toast("error", "Failed to load products."); }
        finally { setLoading(false); }
    }, [toast]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape") setEditingProduct(null); };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, []);

    const handleDelete = async (id: string) => {
        setDeletingId(id); setConfirmDeleteId(null);
        try {
            const { error } = await supabase.from("products").delete().eq("id", id);
            if (error) throw error;
            setProducts(prev => prev.filter(p => p.id !== id));
            toast("success", "Product deleted.");
        } catch { toast("error", "Failed to delete product."); }
        finally { setDeletingId(null); }
    };

    const handleToggleActive = async (id: string, current: boolean) => {
        setTogglingId(id);
        try {
            const { error } = await supabase.from("products").update({ is_active: !current }).eq("id", id);
            if (error) throw error;
            setProducts(prev => prev.map(p => p.id === id ? { ...p, is_active: !current } : p));
        } catch { toast("error", "Failed to update status."); }
        finally { setTogglingId(null); }
    };

    // Edit drawer
    const openEdit = (p: Product) => {
        setEditingProduct(p); setEditName(p.name); setEditCategory(p.category);
        setEditDesc(p.short_description ?? ""); setEditFile(null); setEditPreview(p.image_url);
    };

    const handleEditFileChange = (f: File | null) => {
        setEditFile(f);
        if (f) { const r = new FileReader(); r.onloadend = () => setEditPreview(r.result as string); r.readAsDataURL(f); }
        else setEditPreview(editingProduct?.image_url ?? null);
    };

    const handleEditDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setEditDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleEditDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setEditDragActive(false);
        if (e.dataTransfer.files?.[0]) handleEditFileChange(e.dataTransfer.files[0]);
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        setSaving(true);
        try {
            let imageUrl = editingProduct.image_url;
            if (editFile) {
                // Delete old image from storage if it exists
                if (editingProduct.image_url) {
                    const oldPath = editingProduct.image_url.split("/").pop();
                    if (oldPath) await supabase.storage.from("product-images").remove([oldPath]);
                }
                const ext = editFile.name.split(".").pop();
                const fileName = `${Date.now()}.${ext}`;
                const { error: uploadError } = await supabase.storage.from("product-images").upload(fileName, editFile);
                if (uploadError) throw uploadError;
                const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
                imageUrl = publicUrl;
            }
            const { error } = await supabase.from("products").update({ name: editName, category: editCategory, short_description: editDesc, image_url: imageUrl }).eq("id", editingProduct.id);
            if (error) throw error;
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, name: editName, category: editCategory, short_description: editDesc, image_url: imageUrl } : p));
            toast("success", `"${editName}" updated.`);
            setEditingProduct(null);
        } catch (err) { toast("error", err instanceof Error ? err.message : "Failed to save."); }
        finally { setSaving(false); }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalActive = products.filter(p => p.is_active).length;
    const totalInactive = products.filter(p => !p.is_active).length;

    if (loading) return <ProductListSkeleton />;

    return (
        <>
            <div className="space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {[
                        { label: "Total", value: products.length, textClass: "text-primary-300", bgClass: "bg-primary-600/10 border-primary-600/20" },
                        { label: "Active", value: totalActive, textClass: "text-success-400", bgClass: "bg-success-500/10 border-success-500/20" },
                        { label: "Inactive", value: totalInactive, textClass: "text-warning-400", bgClass: "bg-warning-500/10 border-warning-500/20" },
                    ].map(({ label, value, textClass, bgClass }) => (
                        <div key={label} className={`p-4 sm:p-5 rounded-2xl border ${bgClass}`}>
                            <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${textClass}`}>{value}</p>
                            <p className="text-[11px] mt-1 font-medium text-primary-200/50">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Search + refresh */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-200/30" />
                        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products…" className="w-full pl-11 pr-4 py-3 rounded-xl bg-primary-900 border border-white/10 text-white text-sm transition-all focus:outline-none focus:border-accent-500/50 focus:bg-primary-800 placeholder-primary-200/30" />
                    </div>
                    <button onClick={fetchProducts} className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all bg-primary-900 border border-white/10 hover:bg-white/10 text-primary-200/60 hover:text-white">
                        <RefreshCw size={14} />
                    </button>
                </div>

                {/* List */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white/5 border border-white/10 rounded-3xl">
                        <Package size={32} className="text-primary-200/20" />
                        <p className="text-sm text-primary-200/40">{searchQuery ? "No products match your search." : "No products yet."}</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map(product => (
                            <div key={product.id} className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-150 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20">
                                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-primary-900/50 border border-white/5">
                                    {product.image_url ? <Image src={product.image_url} alt={product.name} width={48} height={48} className="w-full h-full object-cover" /> : <ImageIcon size={16} className="text-primary-200/30" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white/90 truncate leading-tight">{product.name}</p>
                                    <p className="text-xs mt-0.5 truncate text-primary-200/50">{product.category}</p>
                                </div>
                                <span className={`hidden sm:inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${product.is_active ? "bg-success-500/10 text-success-400" : "bg-danger-500/10 text-danger-400"}`}>
                                    <span className="w-1 h-1 rounded-full shrink-0 bg-current" />
                                    {product.is_active ? "Active" : "Inactive"}
                                </span>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button onClick={() => openEdit(product)} title="Edit" className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 text-primary-200/60 hover:text-white"><Pencil size={14} /></button>
                                    <button onClick={() => handleToggleActive(product.id, product.is_active)} disabled={togglingId === product.id} title={product.is_active ? "Deactivate" : "Activate"} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 disabled:opacity-40 ${product.is_active ? "text-success-400" : "text-primary-200/40 hover:text-white"}`}>
                                        {togglingId === product.id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : product.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                                    </button>
                                    {confirmDeleteId === product.id ? (
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => handleDelete(product.id)} disabled={deletingId === product.id} className="h-7 px-2.5 rounded-lg text-[11px] font-semibold bg-danger-500/20 text-danger-400 hover:bg-danger-500/30">
                                                {deletingId === product.id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : "Delete"}
                                            </button>
                                            <button onClick={() => setConfirmDeleteId(null)} className="h-7 px-2.5 rounded-lg text-[11px] font-semibold hover:bg-white/10 text-primary-200/60 hover:text-white">Cancel</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setConfirmDeleteId(product.id)} title="Delete" className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-danger-500/15 text-danger-400/70 hover:text-danger-400"><Trash2 size={14} /></button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Drawer */}
            {editingProduct && (
                <>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" onClick={() => setEditingProduct(null)} />
                    <div className="fixed top-0 right-0 h-full z-50 flex flex-col w-full max-w-lg bg-primary-950 border-l border-white/10 shadow-[-24px_0_80px_rgba(0,0,0,0.5)] animate-slide-in-right">
                        <div className="px-6 h-16 flex items-center justify-between shrink-0 border-b border-white/10 bg-primary-900/50">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent-500/20"><Pencil size={13} className="text-accent-500" /></div>
                                <div>
                                    <p className="text-sm font-bold text-white leading-tight">Edit Product</p>
                                    <p className="text-[11px] text-primary-200/50">ID: {editingProduct.id.slice(0, 8)}…</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingProduct(null)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-primary-200/60 hover:text-white"><X size={16} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon size={13} className="text-accent-500" />
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-200/60">Image</span>
                                    </div>
                                    {editFile && <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-accent-500/20 text-accent-400">New image selected</span>}
                                </div>
                                <div className="border border-white/10 rounded-2xl p-1 bg-primary-900/30">
                                    <ImageDropzone
                                        preview={editPreview} dragActive={editDragActive}
                                        onDragEvent={handleEditDrag} onDrop={handleEditDrop}
                                        onChange={handleEditFileChange} onClear={() => handleEditFileChange(null)}
                                        onError={(msg) => toast("error", msg)}
                                    />
                                </div>
                            </div>
                            <div><FieldLabel icon={FileText}>Product Name</FieldLabel><FieldInput value={editName} onChange={e => setEditName(e.target.value)} placeholder="Product name" required /></div>
                            <div>
                                <FieldLabel icon={Tag}>Category</FieldLabel>
                                <FieldSelect value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                                    {CATEGORIES.map(({ value, label }) => (<option key={value} value={value} className="bg-primary-900 text-slate-100">{label}</option>))}
                                </FieldSelect>
                            </div>
                            <div><FieldLabel icon={FileText}>Short Description</FieldLabel><FieldTextarea value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Key specs and features…" style={{ minHeight: "100px" }} /></div>
                        </div>
                        <div className="px-6 py-4 border-t border-white/10 flex gap-3 shrink-0 bg-primary-900/80 backdrop-blur-md">
                            <button onClick={() => setEditingProduct(null)} className="flex-1 h-11 rounded-xl text-sm font-semibold transition-all bg-white/5 hover:bg-white/10 text-primary-200/80 hover:text-white border border-white/10">Cancel</button>
                            <button onClick={handleSaveEdit} disabled={saving} className="flex-1 h-11 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-br from-accent-500 to-accent-600 shadow-[0_4px_16px_rgba(220,169,99,0.3)] border border-accent-400/50">
                                {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</> : <><Save size={15} />Save Changes</>}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
