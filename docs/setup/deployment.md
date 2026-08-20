# Deployment Strategy

This document defines the primary deployment target per environment and how secondary paths relate.

## Summary

| Environment | Primary target | URL pattern | Trigger |
| ----------- | -------------- | ----------- | ------- |
| Demo / static showcase | **GitHub Pages** | `https://lungelomyamya-rgb.github.io/maroon_traceability` | Push to `main` ([pages.yml](../../.github/workflows/pages.yml)) |
| Full-stack / registration | **Vercel** | Project-specific Vercel URL | Manual or Vercel Git integration |
| Local development | `npm run dev` | `http://localhost:3000` | Developer machine |

## GitHub Pages (primary for demos)

**Use when:** stakeholder walkthroughs, static UI demos, no server-side registration required.

- Workflow: [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
- Output: static export to `out/` with `NEXT_PUBLIC_BASE_PATH=/maroon_traceability`
- Limitations: no server API routes at runtime; registration and server-only Supabase flows require Vercel or local dev

## Vercel (primary for full-stack)

**Use when:** real Supabase registration, `/api/auth/register`, service role key, or production-like auth testing.

- Config: [`vercel.json`](../../vercel.json) at repository root
- Secrets: set in Vercel project settings (never commit `.env.vercel` or `.env.local`)
- Required env vars: see [`.env.example`](../../.env.example) and [supabase-setup.md](./supabase-setup.md)

## Environment variables by target

| Variable | Pages | Vercel | Local |
| -------- | ----- | ------ | ----- |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional (client-only features) | Required | Required |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Required | Required |
| `SUPABASE_SERVICE_ROLE_KEY` | N/A (no server) | Required | Required |
| `NEXT_PUBLIC_BASE_PATH` | Set in Pages workflow | Usually unset | Unset |
| `NEXT_PUBLIC_FINANCE_APP_URL` | Optional | Optional | Optional |

## Post-deploy verification

### GitHub Pages

1. Open the Pages URL and confirm the app loads under the base path
2. Verify navigation and static trace/demo routes
3. Confirm registration is not expected to work without a server backend

### Vercel

1. Confirm `/api/auth/register` responds (not 404)
2. Run a test registration with demo credentials
3. Verify Supabase Auth redirect URLs include the Vercel domain

## Deprecated / removed paths

- `deploy.yml.disabled` — removed; use `pages.yml` for Pages deployments
- `.env.vercel` — never commit; use Vercel dashboard for secrets

## Related documentation

- [Supabase setup](./supabase-setup.md)
- [Cross-app Varydian integration](../cross-app-varydian-maroon.md)
- [SECURITY.md](../../SECURITY.md)
