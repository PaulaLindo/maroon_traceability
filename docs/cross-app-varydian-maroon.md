# Varydian ↔ Maroon cross-app environment

## Maroon (this repo, Next.js)

| Variable | Required? | Notes |
|----------|-----------|--------|
| `NEXT_PUBLIC_FINANCE_APP_URL` | For finance links to show | Base URL of Varydian **without** trailing slash, e.g. `https://varydian-financial-reporting.onrender.com` |
| `MAROON_APP_URL` | **Do not use** | Not read by Maroon today. Omit from `.env.local` here to avoid confusion. |

Links are implemented via `src/lib/financeAppUrl.ts` (`getFinanceAppUrl`). The footer and main nav do not link to Varydian; enterprise pricing and government pages use those links when configured.

---

## Varydian (Flask on Render — other repo)

| Variable | Purpose |
|----------|---------|
| `MAROON_APP_URL` | Base URL where users land when choosing “Maroon” (e.g. `https://maroontraceabilitydemo.vercel.app` — **no trailing path** recommended; append `/intro` in templates only if desired) |

Never expose Flask `SUPABASE_*` secrets or **service-role** keys to the browser.