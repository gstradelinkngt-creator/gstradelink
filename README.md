# GSTradeLink

Website and product catalogue for **GSTradeLink**, Bharatpur-3, Chitwan — digital
scales, beam balances, spare parts, calibration and repair.

Live: <https://www.gstradelink.com.np>

**Maintained by OMX Lab.**

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + Tailwind CSS v4
- [Supabase](https://supabase.com) — Postgres (products, profiles), Storage (product photos), Google sign-in
- Deployed on [Vercel](https://vercel.com) — every push to `main` deploys to production

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Create `.env.local` with:

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | everything |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | everything |
| `SUPABASE_SERVICE_ROLE_KEY` | server only — deleting user accounts in the admin panel |

The same variables must be set in the Vercel project for production.

## Admin panel

- Go to **/admin** (or the lock icon in the site footer) and sign in with Google.
  Sessions persist, so a returning admin lands straight on the dashboard.
- **Products** — add, edit, hide/show and delete products. Photos are resized in the
  browser before upload, and the public pages refresh immediately after each change.
- **Team** — everyone who signs in appears here; use *Make admin* to grant access.
  The very first account to sign in becomes admin automatically.
- While signed in as an admin, the public site shows a *Manage products* button in the
  header and an *Edit this product* button on product pages.

## Project layout

```
app/                  routes (public pages, /admin, /auth/callback, /api/admin/*)
components/layout/    navbar, footer, mobile bottom bar
components/products/  product card, category filter
components/admin/     admin panel
lib/site.ts           business contact details (phone, WhatsApp, address, hours)
lib/categories.ts     product categories (mirrors the DB CHECK constraint)
supabase/migrations/  database schema and row-level security
proxy.ts              protects /admin/* (session + admin role check)
```

## Maintainer

OMX Lab — maintenance, fixes and feature work for this project.
