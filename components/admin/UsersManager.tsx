"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useToast } from "./AdminToast";

interface Profile {
  id: string;
  email: string | null;
  role: "user" | "admin";
  created_at: string;
}

/**
 * Team access. Anyone who signs in with Google gets a "user" profile;
 * promote them here to give admin access.
 */
export function UsersManager({ currentUserId }: { currentUserId: string }) {
  const { toast } = useToast();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) toast("error", "Couldn't load team members.");
        else setUsers((data ?? []) as Profile[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const admins = users.filter((u) => u.role === "admin").length;
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? users.filter((u) => u.email?.toLowerCase().includes(q)) : users;
    // Admins first, then newest
    return [...list].sort((a, b) => Number(b.role === "admin") - Number(a.role === "admin"));
  }, [users, query]);

  const setRole = async (u: Profile, role: Profile["role"]) => {
    if (u.role === "admin" && role === "user" && admins <= 1) {
      toast("error", "There must be at least one admin.");
      return;
    }
    setBusyId(u.id);
    const { error } = await supabase.from("profiles").update({ role }).eq("id", u.id);
    if (error) toast("error", "Couldn't change the role.");
    else {
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role } : x)));
      toast("success", role === "admin" ? `${u.email} is now an admin.` : `${u.email} no longer has admin access.`);
    }
    setBusyId(null);
  };

  const removeUser = async (u: Profile) => {
    setBusyId(u.id);
    setConfirmId(null);
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Couldn't remove this account.");
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
      toast("success", `${u.email} removed.`);
    } catch (err) {
      toast("error", err instanceof Error ? err.message : "Couldn't remove this account.");
    }
    setBusyId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-[-0.03em] text-ink">Team</h1>
      <p className="mt-1 max-w-xl text-sm text-ink-soft">
        Anyone who signs in with Google appears here. Make them an admin to let them manage products.
      </p>

      <label className="mt-6 flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3.5 focus-within:border-ink sm:max-w-sm">
        <Search size={17} className="shrink-0 text-ink-mute" />
        <span className="sr-only">Search by email</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by email"
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink focus:outline-none"
        />
      </label>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
        {loading ? (
          <ul className="divide-y divide-line">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center gap-4 p-4">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-paper-2" />
                <div className="h-4 w-1/3 animate-pulse rounded-full bg-paper-2" />
              </li>
            ))}
          </ul>
        ) : visible.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm text-ink-soft">
            {query ? "No one matches that email." : "No one has signed in yet."}
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {visible.map((u) => {
              const isMe = u.id === currentUserId;
              const isAdmin = u.role === "admin";
              return (
                <li key={u.id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
                      isAdmin ? "bg-ink text-white" : "bg-paper-2 text-ink-soft",
                    )}
                  >
                    {u.email?.[0]?.toUpperCase() ?? "?"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">
                      {u.email ?? "Unknown"} {isMe && <span className="font-normal text-ink-mute">(you)</span>}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-mute">
                      {isAdmin && <ShieldCheck size={13} className="text-signal-deep" />}
                      {isAdmin ? "Admin" : "Signed-in user"} · joined{" "}
                      {new Date(u.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  {!isMe && (
                    <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                      {confirmId === u.id ? (
                        <>
                          <span className="text-xs text-ink-soft">Remove account?</span>
                          <button
                            type="button"
                            onClick={() => removeUser(u)}
                            className="h-9 rounded-lg bg-red-600 px-3 text-xs font-semibold text-white hover:bg-red-700"
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmId(null)}
                            className="h-9 rounded-lg px-3 text-xs font-semibold text-ink-soft hover:bg-paper-2"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            disabled={busyId === u.id}
                            onClick={() => setRole(u, isAdmin ? "user" : "admin")}
                            className={cn(
                              "h-9 rounded-lg px-3 text-xs font-semibold transition-colors disabled:opacity-50",
                              isAdmin ? "border border-line-strong text-ink hover:border-ink" : "bg-ink text-white hover:bg-ink-2",
                            )}
                          >
                            {isAdmin ? "Remove admin" : "Make admin"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmId(u.id)}
                            title="Remove account"
                            aria-label={`Remove ${u.email}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-mute hover:bg-red-50 hover:text-red-600"
                          >
                            <UserX size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
