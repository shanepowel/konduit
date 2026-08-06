# Konduit Marketplace

Medusa v2 commerce monorepo for Konduit (Zimbabwe) — real catalog, dual USD/ZWG pricing, Paynow checkout, delivery windows, Meilisearch.

Built by **extending upstream open-source**, not reinventing cart/checkout/inventory/payments/search. See [docs/UPSTREAM.md](docs/UPSTREAM.md).

## Structure

```
apps/backend          # Medusa API + Admin (from create-medusa-app / dtc-starter)
apps/storefront       # Next.js storefront (same starter)
packages/medusa-payment-paynow  # Copied from a11rew/medusa-payment-paystack; Paystack swapped for paynow SDK
vendor/               # Reference clones (gitignored) — re-clone via docs/UPSTREAM.md
```

## Prerequisites

- Node 20+
- pnpm 10+
- Postgres (Neon project `konduit` provisioned for this build)
- Redis optional in local dev; required in production for event bus
- Paynow sandbox Integration ID + Key (checkout cannot go live without these)
- Meilisearch host + API key (optional until search is enabled)

## Setup

```bash
pnpm install
cp apps/backend/.env.template apps/backend/.env
# Set DATABASE_URL, JWT/COOKIE secrets, Paynow + Meilisearch + WhatsApp as available

cd packages/medusa-payment-paynow && pnpm exec tsc && cd ../..

cd apps/backend
pnpm medusa db:migrate
# Initial seed runs via migration-scripts (Konduit OEM catalog + USD/ZWG regions)
pnpm medusa user -e admin@konduit.co.zw -p supersecret

pnpm --filter @dtc/backend dev   # http://localhost:9000
pnpm --filter @dtc/storefront dev # http://localhost:8000
```

Storefront env (`apps/storefront/.env.local`):

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<from seed log / admin>
NEXT_PUBLIC_DEFAULT_REGION=zw
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## Domains

| Surface | Host |
|---------|------|
| Storefront | `konduit.co.zw` → Vercel (`apps/storefront`) |
| Admin | `admin.konduit.co.zw` → Railway/Render backend admin (do not link from storefront) |
| API | backend host on Railway/Render |

**Do not** cut over live DNS until a full Paynow sandbox order has completed (initiate → pay → hash-verified webhook → paid order).

## Security checklist

- [x] Paynow webhook hash verified via official SDK `verifyHash` before AUTHORIZED
- [x] Card data never touches Konduit servers (Paynow-hosted redirect)
- [x] Secrets only in env (`.env` gitignored)
- [x] Rate limit middleware on quote + payment hooks
- [ ] Staging uses Paynow sandbox keys only
- [ ] Production keys only after sandbox E2E success
- [ ] Admin on separate subdomain with strong credentials

## Deploy

- Storefront: Vercel — root directory `apps/storefront`
- Backend + Redis + Meilisearch: Railway/Render — see `deploy/`
- Postgres: Neon

## Categories

Infrastructure · Telecoms (Infrastructure services / Devices) · Imports

Product metadata: `delivery_window_days`, `sourcing_type` (`in_stock` | `pre_order` | `quote_only`).
Order metadata: `logistics_status` (`sourced` | `in_transit` | `customs` | `delivered`) → WhatsApp Cloud API on change when credentials are set.
