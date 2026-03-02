"use client";

import { AdminShell } from "@/components/admin/AdminShell";

/**
 * Admin Dashboard – Slim entry point.
 *
 * All layout, tabs, and state are managed by <AdminShell>.
 * This file only exists as the Next.js route entrypoint.
 */
export default function AdminDashboard() {
  return <AdminShell />;
}
