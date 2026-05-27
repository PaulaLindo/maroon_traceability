# Maroon demo — alignment, gaps, and roadmap

This document captures how the **current demo app** maps to the product story (landing + pricing + SAPS pilot), what to improve for **client demos**, and what to defer until a **production build**. It is self-contained: source Word/ODT specs in `docs/spec/` may be removed before push; this file stays as the reference.

**Demo intent:** impress stakeholders with the journey and vision; optional light registration; no claim that every feature is production-grade yet.

---

## Where the story lives in the app

| Story (from product specs) | Route | Status |
|----------------------------|-------|--------|
| Page 1 — Herd legacy, digital kraal, two farmer types | `/intro` | Copy largely implemented |
| Page 2 — Pricing matrix, add-ons, trust, FAQ | `/get-started` | Copy largely implemented |
| Registration (individual / SMME / commercial / retailer) | `/register/*` | Flows exist; Supabase when configured |
| Farmer traceability & certify | `/farmer`, `/farmer/certify` | Demo + partial real hooks |
| Supply chain roles | `/inspector`, `/logistics`, `/packaging`, `/retailer` | Role dashboards (demo data) |
| Public “passport” for buyers | `/public-access/trace/[id]` | **Mock** product history |
| QR generation | `/packaging/qr-generation`, `QRGenerator` | **Mock** QR payloads |
| Government / GRAP (Varydian) | `/government`, enterprise pricing (if env set) | Links to separate Varydian app |
| SAPS pilot (roadside / recovery) | `/saps/*` | **UI prototype** only |
| Finance cross-app env | `docs/cross-app-varydian-maroon.md` | Env: `NEXT_PUBLIC_FINANCE_APP_URL` |

**Not in repo (optional future landing):** alternate “Kraal to commercial shelf” / retailer-named copy — only add if sales needs a second narrative.

---

## Demo vs production — honest positioning

| Layer | Demo today | Production later |
|-------|------------|------------------|
| Marketing pages | `/intro`, `/get-started` | CMS or same Next routes |
| Auth & registration | Supabase + demo accounts (`farmer@demo.com`, etc.) | Full onboarding, email verify, billing |
| Traceability data | Mix of context state, mocks, localStorage quotas | Supabase + APIs |
| Blockchain | `SimulatedBlockchainAdapter` | Real chain or certified audit service |
| Offline | IndexedDB queue, partial forms | Full event sync, conflict handling |
| SAPS | Screens + simulated scan | Integrations per SAPS ICT brief |
| Pricing enforcement | `src/lib/pricingLimits.ts` (client-side) | Server-side metering & billing |

**Say in demos:** “This is the operational prototype of the platform we’re building; blockchain, SAPS integration, and retailer certifications are represented in the UI and architecture, with production hardening on the roadmap.”

---

## Gaps worth closing **for client demos** (high impact, low risk)

These improve credibility without building a full product.

### 1. One golden path (15-minute demo script)

Implemented in README and code: product **`BLK003`**, `/public-access/trace/BLK003`, QR generator, SAPS green/red samples.

Pick a single story and make it smooth end-to-end:

1. Open `/intro` → “Start Your Digital Kraal” → Individual or Commercial on `/get-started`.
2. Login as demo farmer → add/certify one **livestock** product (not default fruit).
3. Show inspector or packaging step → generate QR.
4. Open public trace URL for that product ID → show “passport” timeline.
5. Optional: SAPS officer scans same QR on `/saps/inspections` → green status.

**Changes:** Pre-seed one beef/cattle demo product; document demo logins in README or this file; fix any redirect broken for that path.

### 2. Align product defaults with livestock story

- Default new product category toward **Beef** (or farmer’s `livestockType`) instead of `Fruit`.
- Ensure intro “vaccinations / feeding / offline” appears in **at least one** real form field or event type on farmer certify (even if stored locally for demo).

### 3. Public trace + QR use **consistent demo IDs**

- Link QR payload to `/public-access/trace/BLK003` (or one ID you control) so scanning always shows a rich timeline, not empty state.
- Remove or label “mock mode” only in dev tools, not on client-facing buttons.

### 4. Copy consistency (quick wins)

| Item | Suggestion |
|------|------------|
| “We don’t offer subscriptions” on `/intro` vs pricing on `/get-started` | Add one line on intro: “Start free; paid tiers on the next page for commercial and government.” |
| Final CTA | Match spec: “Start Your Digital Agri-Asset Book Today” (optional) |
| Emerging Commercial bullets | Optionally match spec wording: retail-ready, abattoir requirements |

### 5. Registration = “interest capture” for now

- Keep forms; ensure Supabase registration **or** a “Request access” mailto / simple API records leads.
- After submit: clear success message — “We’ll activate your account” — not silent failure.
- Commercial tier: CTA “Start 14-day trial” / “Go Pro” → registration, not implying instant paid billing unless Stripe exists.

### 6. Demo mode clarity (internal)

- `README.md`: short **Demo accounts** table and **Recommended demo flow** (link to this doc).
- Optional banner in app (env `NEXT_PUBLIC_DEMO_MODE=true`): “Demonstration environment — data is illustrative.”

### 7. SAPS screens — label as pilot

- Subtitle on SAPS dashboard: “KZN pilot — simulated ledger for demonstration.”
- Simulated scan should show **green** and **red** examples (two buttons or sample IDs) so officers see both outcomes.

---

## Defer until **after** client buy-in (production phase)

Do **not** block demos on these:

- Private APN, IPsec, IMEI whitelist, MDM container, SAPS CAS/ICD API
- Real RFID/IoT ear-tag hardware integration
- Panic alert, digital cordon, &lt;5s STU circulation
- Production blockchain, consensus, court-certified export
- Woolworths/Checkers-specific compliance modules
- Bank underwriting from production history (vs Varydian GRAP for government)
- Partner logo strip (NCL, SITA) until contracts exist
- Server-side subscription billing and seat limits

---

## Suggested updates (priority order)

| Priority | Change | Why |
|----------|--------|-----|
| P0 | Golden-path demo script + stable demo users/products | Every client sees the same polished story |
| P0 | Livestock-default product + one seeded trace timeline | Matches Page 1 marketing |
| P1 | QR → public trace ID consistency | “Scan” moment works live |
| P1 | Intro/pricing copy tweak (subscriptions) | Avoid obvious contradiction in room |
| P1 | Registration success / lead capture | “Real registration in the meantime” |
| P2 | SAPS green/red demo samples + pilot label | Sets expectations for law enforcement audience |
| P2 | `NEXT_PUBLIC_DEMO_MODE` banner | Legal/expectation management |
| P3 | Page 2 partner logos | Only when you have permission to use logos |
| P3 | Second commercial landing page | Only if sales needs different pitch |

---

## Architecture already in your favour (mention in technical demos)

- Role-based supply chain (farmer → retailer)
- Adapter pattern for blockchain (`src/core/adapters/blockchain/`)
- Offline hooks (`useOfflineSync`, IndexedDB)
- Pricing tier model (`src/lib/pricingLimits.ts`)
- Varydian separation documented in `docs/cross-app-varydian-maroon.md`

These support the narrative “we’re not starting from zero for production.”

---

## Before push (checklist)

- [ ] Remove `docs/spec/` binaries if they must not be in the repo (keep this file).
- [ ] No secrets in `.env.local` committed.
- [ ] README points here for demo flow and honest scope.
- [ ] Smoke-test golden path on `npm run dev` once before each major demo.

---

## Related docs

- [`docs/cross-app-varydian-maroon.md`](./cross-app-varydian-maroon.md) — Maroon ↔ Varydian env vars
- Root [`README.md`](../README.md) — install and stack

*Last updated for demo-phase planning; revise when moving from prototype to production.*
