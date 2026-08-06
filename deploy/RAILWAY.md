# Backend (Medusa) — Railway

Use a Nixpacks or Dockerfile deploy with:

- Root: `apps/backend` (or monorepo root with filter)
- Build: `pnpm install && pnpm --filter medusa-payment-paynow exec tsc && pnpm --filter @dtc/backend build`
- Start: `pnpm --filter @dtc/backend start`
- Migrate on release: `pnpm --filter @dtc/backend exec medusa db:migrate`

## Required env

- `DATABASE_URL` (Neon)
- `REDIS_URL` (Upstash `rediss://…` — claim DB first; see [INFRA.md](./INFRA.md))
- `JWT_SECRET` / `COOKIE_SECRET`
- `STORE_CORS` / `ADMIN_CORS` / `AUTH_CORS`
- `PAYNOW_INTEGRATION_ID` / `PAYNOW_INTEGRATION_KEY` / `PAYNOW_RESULT_URL` / `PAYNOW_RETURN_URL`
- `MEILISEARCH_HOST` / `MEILISEARCH_API_KEY` (Cloud or Railway Meilisearch — see [INFRA.md](./INFRA.md))
- `WHATSAPP_TOKEN` / `WHATSAPP_PHONE_NUMBER_ID` (optional until logistics notifications)

Admin should be served only on `admin.konduit.co.zw` (or Railway URL), not linked from the public storefront.

## Companion services

| Service | Where |
|---------|--------|
| Postgres | Neon project `konduit` |
| Redis | Upstash (claim link in INFRA.md) |
| Meilisearch | Meilisearch Cloud or Railway `getmeili/meilisearch` |
| Storefront | Vercel `apps/storefront` |
