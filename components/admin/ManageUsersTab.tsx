"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Users, ShieldCheck, ShieldOff, UserX, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./AdminToast";
import { UserListSkeleton } from "./AdminSkeletons";

interface UserProfile {
    id: string; email: string; role: "user" | "admin"; created_at: string;
}

export function ManageUsersTab() {
    const { toast } = useToast();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [togglingRole, setTogglingRole] = useState<string | null>(null);
    const [deletingUser, setDeletingUser] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            setUsers(data || []);
        } catch { toast("error", "Failed to load users. Ensure the profiles table exists."); }
        finally { setLoading(false); }
    }, [toast]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleToggleRole = async (user: UserProfile) => {
        setTogglingRole(user.id);
        const newRole = user.role === "admin" ? "user" : "admin";
        try {
            const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", user.id);
            if (error) throw error;
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
            toast("success", `${user.email} is now ${newRole}.`);
        } catch { toast("error", "Failed to update role."); }
        finally { setTogglingRole(null); }
    };

    const handleDeleteUser = async (id: string) => {
        setDeletingUser(id); setConfirmDelete(null);
        try {
            const { error } = await supabase.from("profiles").delete().eq("id", id);
            if (error) throw error;
            setUsers(prev => prev.filter(u => u.id !== id));
            toast("success", "User removed.");
        } catch { toast("error", "Failed to remove user."); }
        finally { setDeletingUser(null); }
    };

    const filtered = users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const totalAdmins = users.filter(u => u.role === "admin").length;

    if (loading) return <UserListSkeleton />;

    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                    { label: "Total Users", value: users.length, textClass: "text-primary-300", bgClass: "bg-primary-600/10 border-primary-600/20" },
                    { label: "Admins", value: totalAdmins, textClass: "text-accent-500", bgClass: "bg-accent-500/10 border-accent-500/20" },
                    { label: "Members", value: users.length - totalAdmins, textClass: "text-purple-400", bgClass: "bg-purple-500/10 border-purple-500/20" },
                ].map(({ label, value, textClass, bgClass }) => (
                    <div key={label} className={`p-4 sm:p-5 rounded-2xl border ${bgClass}`}>
                        <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${textClass}`}>{value}</p>
                        <p className="text-[11px] mt-1 font-medium text-primary-200/50">{label}</p>
                    </div>
                ))}
            </div>

            {/* Notice */}
            <div className="flex gap-3 p-4 rounded-2xl bg-primary-600/10 border border-primary-600/20">
                <ShieldCheck size={16} className="shrink-0 mt-0.5 text-primary-400" />
                <p className="text-xs leading-relaxed text-primary-200/60">
                    Roles are managed via the <code className="text-accent-500 bg-white/5 px-1 py-0.5 rounded font-mono text-[10px]">profiles</code> table. Toggle the badge to switch between <strong className="text-white/80 font-semibold">user</strong> and <strong className="text-accent-500 font-semibold">admin</strong>.
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-200/30" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email…" className="w-full pl-11 pr-4 py-3 rounded-xl bg-primary-900 border border-white/10 text-white text-sm transition-all focus:outline-none focus:border-accent-500/50 focus:bg-primary-800 placeholder-primary-200/30" />
            </div>

            {/* User list */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white/5 border border-white/10 rounded-3xl">
                    <Users size={32} className="text-primary-200/20" />
                    <p className="text-sm text-primary-200/40">
                        {search ? "No users match your search." : "No users found. Make sure the profiles table exists."}
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map(user => {
                        const initial = user.email?.[0]?.toUpperCase() ?? "U";
                        const isAdmin = user.role === "admin";
                        return (
                            <div key={user.id} className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-150 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20">
                                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm ${isAdmin ? "bg-accent-500/20 text-accent-500 border border-accent-500/30" : "bg-primary-900/50 text-primary-400 border border-white/5"}`}>
                                    {initial}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Mail size={11} className="shrink-0 text-primary-200/30" />
                                        <p className="text-sm font-medium text-white/90 truncate">{user.email}</p>
                                    </div>
                                    <p className="text-[11px] mt-0.5 text-primary-200/50">
                                        Joined {new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleToggleRole(user)} disabled={togglingRole === user.id}
                                    title={`Switch to ${isAdmin ? "user" : "admin"}`}
                                    className={`hidden sm:flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all hover:opacity-80 disabled:opacity-40 border ${isAdmin ? "bg-accent-500/15 text-accent-500 border-accent-500/30" : "bg-primary-600/15 text-primary-300 border-primary-600/30"}`}
                                >
                                    {togglingRole === user.id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : isAdmin ? <><ShieldCheck size={11} />admin</> : <><ShieldOff size={11} />user</>}
                                </button>
                                {confirmDelete === user.id ? (
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button onClick={() => handleDeleteUser(user.id)} disabled={deletingUser === user.id} className="h-7 px-2.5 rounded-lg text-[11px] font-semibold bg-danger-500/20 text-danger-400 hover:bg-danger-500/30">
                                            {deletingUser === user.id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : "Remove"}
                                        </button>
                                        <button onClick={() => setConfirmDelete(null)} className="h-7 px-2.5 rounded-lg text-[11px] font-semibold hover:bg-white/10 text-primary-200/60 hover:text-white">Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setConfirmDelete(user.id)} title="Remove user" className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-danger-500/15 shrink-0 text-danger-400/70 hover:text-danger-400"><UserX size={14} /></button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
