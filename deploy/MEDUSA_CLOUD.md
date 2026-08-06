# Medusa Cloud — Konduit

## Project

| Field | Value |
|-------|--------|
| Organization | Shane Powell's projects (`org_01KZBNKRB4KSH3MZQ13PVFAYSG`) |
| Project | Konduit (`proj_01KZBR4Z747284580YBY7B8ZR8`) |
| Region | `eu-central-1` |
| Backend root | `/apps/backend` |
| Storefront root | `/apps/storefront` |
| Tracked branch | `main` |

## URLs (Production)

| Surface | URL |
|---------|-----|
| Backend / Admin | https://konduit.medusajs.app (`/app` for admin) |
| Storefront | https://konduit.medusajs.site |

Dashboard: https://cloud.medusajs.com

## CLI

```bash
export PATH="$HOME/.local/bin:$PATH"
mcloud login --token <personal-access-key>
mcloud use \
  --organization org_01KZBNKRB4KSH3MZQ13PVFAYSG \
  --project proj_01KZBR4Z747284580YBY7B8ZR8 \
  --environment e37edd6a0b910fc23fb

mcloud deployments list --limit 5
mcloud deployments build-logs <build_id>
mcloud environments trigger-build
mcloud variables list
```

## Required follow-ups

1. **Seed / publishable key** — Cloud uses a fresh Postgres. Run seed (or admin create products) and put the new publishable key on the storefront (`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`).
2. **Paynow** — set `PAYNOW_INTEGRATION_ID` + `PAYNOW_INTEGRATION_KEY` (secrets), plus result/return URLs pointing at Cloud:
   - `PAYNOW_RESULT_URL=https://konduit.medusajs.app/hooks/payment/paynow_paynow`
   - `PAYNOW_RETURN_URL=https://konduit.medusajs.site/api/paynow/return`
3. **Redis** — claim Upstash and set `REDIS_URL` (see `deploy/INFRA.md`).
4. **Meilisearch** — production host + admin key when ready.
5. **Rotate** any personal access key that was pasted into chat.
