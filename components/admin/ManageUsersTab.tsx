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
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.error || "Failed to remove user.");
            setUsers(prev => prev.filter(u => u.id !== id));
            toast("success", "User removed.");
        } catch (err) {
            toast("error", err instanceof Error ? err.message : "Failed to remove user.");
        }
        finally { setDeletingUser(null); }
    };

    const filtered = users.filter(u => !search || (u.email?.toLowerCase().includes(search.toLowerCase()) ?? false));
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
                ].map(({ label, value, textClass, bgClass }, i) => (
                    <div key={label} className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 animate-slide-up ${bgClass}`} style={{ animationFillMode: 'both', animationDelay: `${i * 100}ms` }}>
                        <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${textClass}`}>{value}</p>
                        <p className="text-[11px] mt-1 font-medium text-primary-200/50">{label}</p>
                    </div>
                ))}
            </div>

            {/* Notice */}
            <div className="flex gap-3 p-4 rounded-2xl bg-primary-600/10 border border-primary-600/20 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '300ms' }}>
                <ShieldCheck size={16} className="shrink-0 mt-0.5 text-primary-400" />
                <p className="text-xs leading-relaxed text-primary-200/60">
                    Roles are managed via the <code className="text-accent-500 bg-white/5 px-1 py-0.5 rounded font-mono text-[10px]">profiles</code> table. Toggle the badge to switch between <strong className="text-white/80 font-semibold">user</strong> and <strong className="text-accent-500 font-semibold">admin</strong>.
                </p>
            </div>

            {/* Search */}
            <div className="relative animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '400ms' }}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={16} className="text-primary-200/40" />
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email…" className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl bg-primary-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-white/5 text-white text-sm transition-all duration-300 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 focus:bg-primary-800 placeholder-primary-200/30" />
            </div>

            {/* User list */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white/5 border border-white/10 rounded-3xl animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '500ms' }}>
                    <Users size={32} className="text-primary-200/20" />
                    <p className="text-sm text-primary-200/40">
                        {search ? "No users match your search." : "No users found. Make sure the profiles table exists."}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {/* Table Header (Desktop Only) */}
                    <div className="hidden sm:grid grid-cols-[40px_1fr_100px_120px] gap-6 px-5 py-3 text-[11px] font-bold text-primary-200/50 uppercase tracking-wider bg-white/5 rounded-xl border border-white/5 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: '500ms' }}>
                        <div></div>
                        <div>User Account</div>
                        <div className="text-center">Role</div>
                        <div className="text-right pr-2">Actions</div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                        {filtered.map((user, i) => {
                            const initial = user.email?.[0]?.toUpperCase() ?? "U";
                            const isAdmin = user.role === "admin";
                            return (
                                <div key={user.id} className="group flex flex-col sm:grid sm:grid-cols-[40px_1fr_100px_120px] sm:items-center gap-4 sm:gap-6 p-4 sm:px-5 sm:py-3.5 rounded-2xl transition-all duration-300 bg-white/5 border border-white/5 hover:bg-[rgba(255,255,255,0.08)] hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5 animate-slide-up" style={{ animationFillMode: 'both', animationDelay: `${550 + i * 50}ms` }}>

                                    {/* Mobile Top Row / Desktop Columns 1&2 */}
                                    <div className="flex items-center gap-4 sm:contents">
                                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm transition-all duration-300 ${isAdmin ? "bg-accent-500/20 text-accent-500 border border-accent-500/30 shadow-[inset_0_1px_4px_rgba(220,169,99,0.2)]" : "bg-primary-900/50 text-primary-400 border border-white/5"}`}>
                                            {initial}
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <Mail size={12} className="shrink-0 text-primary-200/30 group-hover:text-accent-500/50 transition-colors" />
                                                <p className="text-sm font-semibold text-white/90 truncate group-hover:text-accent-400 transition-colors">{user.email}</p>
                                            </div>
                                            <p className="text-xs mt-1 text-primary-200/50">
                                                Joined {new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mobile Bottom Row / Desktop Columns 3&4 */}
                                    <div className="flex items-center justify-between sm:contents mt-1 sm:mt-0">
                                        <div className="flex items-center sm:justify-center shrink-0">
                                            <button
                                                onClick={() => handleToggleRole(user)} disabled={togglingRole === user.id}
                                                title={`Switch to ${isAdmin ? "user" : "admin"}`}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all hover:opacity-80 disabled:opacity-40 border ${isAdmin ? "bg-accent-500/15 text-accent-500 border-accent-500/30" : "bg-primary-600/15 text-primary-300 border-primary-600/30"}`}
                                            >
                                                {togglingRole === user.id ? <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : isAdmin ? <><ShieldCheck size={12} />Admin</> : <><ShieldOff size={12} />User</>}
                                            </button>
                                        </div>

                                        <div className="flex items-center sm:justify-end gap-1.5 shrink-0">
                                            {confirmDelete === user.id ? (
                                                <div className="flex items-center gap-1 bg-primary-900/50 p-1 rounded-xl border border-white/5">
                                                    <button onClick={() => handleDeleteUser(user.id)} disabled={deletingUser === user.id} className="h-7 px-3 rounded-lg text-[11px] font-semibold bg-danger-500/20 text-danger-400 hover:bg-danger-500/30">
                                                        {deletingUser === user.id ? <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : "Remove"}
                                                    </button>
                                                    <button onClick={() => setConfirmDelete(null)} className="h-7 px-3 rounded-lg text-[11px] font-semibold hover:bg-white/10 text-primary-200/60 hover:text-white">Cancel</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setConfirmDelete(user.id)} title="Remove user" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-primary-900/50 border border-white/5 hover:bg-danger-500/15 shrink-0 text-danger-400/70 hover:text-danger-400"><UserX size={15} /></button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
