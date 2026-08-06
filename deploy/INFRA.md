# Production infrastructure — Redis + Meilisearch

## Redis (Upstash)

Provisioned via Upstash agent API (TCP/TLS works with Medusa `REDIS_URL`).

| Field | Value |
|-------|--------|
| Database ID | `964d628d-c688-4b58-a1e4-f930000d79d1` |
| REST endpoint | `https://liked-newt-182158.upstash.io` |
| Claim / console | https://upstash.com/start-redis/console/964d628d-c688-4b58-a1e4-f930000d79d1 |
| Expires if unclaimed | **2026-08-09** (3 days) |

**You must claim the database** at the console URL above, or it is deleted after 3 days.

`REDIS_URL` format for Medusa (set in Railway/Render secrets — do not commit):

```
rediss://default:<UPSTASH_REDIS_PASSWORD>@liked-newt-182158.upstash.io:6379
```

Re-fetch credentials (retry-safe):

```bash
curl -X POST -H "Idempotency-Key: 964d628d-c688-4b58-a1e4-f930000d79d1" https://upstash.com/start-redis
```

## Meilisearch

### This cloud agent environment

Meilisearch **1.52.0** is running locally on `127.0.0.1:7700` for development/smoke against the Medusa plugin. That host is **not** reachable from Vercel/Railway production.

Backend uses the **Admin API key** for indexing (`MEILISEARCH_API_KEY`).
Storefront should use the **Search API key** only (`NEXT_PUBLIC_MEILISEARCH_API_KEY`).

### Production (required for go-live)

Pick one:

1. **Meilisearch Cloud** (recommended) — create a project at https://cloud.meilisearch.com (14-day trial), then set:
   - `MEILISEARCH_HOST=https://<project>.meilisearch.io`
   - `MEILISEARCH_API_KEY=<admin key from Cloud dashboard>`
   - Storefront: `NEXT_PUBLIC_MEILISEARCH_HOST` + search-only key

2. **Railway / Render** — deploy the official Meilisearch Docker image (`getmeili/meilisearch`), set `MEILI_MASTER_KEY`, expose HTTPS, wire the same env vars into the Medusa backend service.

Plugin: `@rokmohar/medusa-plugin-meilisearch` is already registered in [`apps/backend/medusa-config.ts`](../apps/backend/medusa-config.ts) when both env vars are present.

## Checklist

- [ ] **Claim Upstash Redis** at the console URL (required before 2026-08-09)
- [ ] Put `REDIS_URL` on the production Medusa service
- [ ] Confirm Medusa logs show `Connection to Redis in module 'event-bus-redis' established` (not Local Event Bus)
- [ ] Create Meilisearch Cloud (or Railway) project and set host + admin key on backend
- [ ] Put search-only key on the Vercel storefront
- [ ] Confirm products appear in Meilisearch after create/update / initial sync

