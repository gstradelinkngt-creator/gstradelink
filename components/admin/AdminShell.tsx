"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Package, Users, Home, LogOut, Menu, X, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ToastProvider } from "./AdminToast";
import { AddProductTab } from "./AddProductTab";
import { ManageProductsTab } from "./ManageProductsTab";
import { ManageUsersTab } from "./ManageUsersTab";

type ActiveTab = "add-product" | "manage-products" | "manage-users";

interface CurrentUser {
    email: string;
    role: string;
}

export function AdminShell() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<ActiveTab>("add-product");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    // Auth guard + fetch current user info
    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (!session) {
                router.push("/admin/login");
                return;
            }
            // Fetch user profile for topbar display
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single();

            setCurrentUser({
                email: session.user.email ?? "admin",
                role: profile?.role ?? "admin",
            });
            setAuthChecked(true);
        });
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
        { id: "add-product", label: "Add Product", icon: Plus },
        { id: "manage-products", label: "Manage Products", icon: Package },
        { id: "manage-users", label: "Users & Roles", icon: Users },
    ];

    // Don't render until auth is confirmed (prevents flash)
    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-accent-500 rounded-full animate-spin" />
                    <p className="text-sm text-primary-200/50">Loading dashboard…</p>
                </div>
            </div>
        );
    }

    return (
        <ToastProvider>
            <div className="min-h-screen flex bg-primary-950 text-slate-100">
                {/* Mobile backdrop */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} />
                )}

                {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
                <aside
                    className={`fixed md:sticky top-0 h-screen flex flex-col w-64 shrink-0 z-50 transition-transform duration-300 ease-in-out bg-primary-900 border-r border-white/5 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                >
                    {/* Brand */}
                    <div className="px-6 py-6 flex items-center justify-between border-b border-white/5">
                        <Link href="/" className="flex items-center gap-3 min-w-0 transition-opacity hover:opacity-80">
                            <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg shadow-black/20 border border-white/10">
                                <Image src="/logo.png" alt="GS" width={20} height={20} className="object-contain" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[15px] font-bold text-white truncate leading-tight tracking-tight">GSTradeLink</p>
                                <p className="text-[11px] font-semibold text-accent-500 uppercase tracking-wider">Admin Panel</p>
                            </div>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 text-primary-200 transition-colors shrink-0">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
                        <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-400/50">Menu</p>
                        {navItems.map(({ id, label, icon: Icon }) => {
                            const active = activeTab === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${active
                                            ? "bg-primary-600/20 text-white shadow-inner"
                                            : "text-primary-200/70 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${active ? "bg-accent-500/15 text-accent-400" : "text-primary-400"
                                        }`}>
                                        <Icon size={17} />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide">{label}</span>
                                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(220,169,99,0.5)] shrink-0" />}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Footer nav */}
                    <div className="px-4 pb-6 pt-4 border-t border-white/5 space-y-1">
                        <Link href="/" className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-primary-200/60 hover:text-white hover:bg-white/5">
                            <Home size={17} /><span className="text-sm font-medium">Back to Site</span>
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all text-danger-400 hover:bg-danger-500/10 hover:text-danger-300">
                            <LogOut size={17} /><span className="text-sm font-medium">Sign Out</span>
                        </button>
                    </div>
                </aside>

                {/* ══ MAIN ═══════════════════════════════════════════════════════════ */}
                <main className="flex-1 min-w-0 flex flex-col min-h-screen relative">
                    {/* Top bar */}
                    <header
                        className="sticky top-0 z-30 px-5 sm:px-8 h-20 flex items-center justify-between gap-4 shrink-0 bg-primary-950/80 backdrop-blur-xl border-b border-white/5"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <button onClick={() => setSidebarOpen(true)} className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 text-primary-200 transition-colors shrink-0">
                                <Menu size={20} />
                            </button>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-bold text-white truncate tracking-tight">
                                    {activeTab === "add-product" ? "Add New Product" : activeTab === "manage-products" ? "Manage Products" : "Users & Roles"}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            {/* Current user info */}
                            {currentUser && (
                                <div className="hidden sm:flex items-center gap-2.5 mr-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold bg-accent-500/20 text-accent-400">
                                        {currentUser.email[0]?.toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex flex-col justify-center">
                                        <p className="text-xs font-medium text-white/90 truncate max-w-[140px] leading-none mb-1">{currentUser.email}</p>
                                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-accent-500 leading-none">
                                            <ShieldCheck size={10} />{currentUser.role}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <button onClick={handleLogout} className="flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold transition-all bg-danger-500/10 text-danger-400 hover:bg-danger-500/20 hover:text-danger-300">
                                <LogOut size={15} /><span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    </header>

                    {/* Body */}
                    <div className="flex-1 px-4 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto w-full">
                        {activeTab === "add-product" && <AddProductTab />}
                        {activeTab === "manage-products" && <ManageProductsTab />}
                        {activeTab === "manage-users" && <ManageUsersTab />}
                    </div>
                </main>
            </div>
        </ToastProvider>
    );
}
