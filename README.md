# Konduit

Enterprise technology supply site for Southern African markets. Standalone Next.js 15 app deployed separately from digiteq.io.

## Development

```bash
# From repo root
npm run konduit:dev

# Or from this directory
npm install --legacy-peer-deps
npm run dev
```

Runs on http://localhost:3002

## Build

```bash
npm run konduit:build
```

## Environment

Copy `.env.example` to `.env.local` and configure:

- Sanity project (separate from Digiteq marketing CMS recommended)
- HubSpot for quote, contact, and partner forms
- Resend for quote confirmation emails
- Plausible analytics domain

The site renders with static fallbacks when Sanity is not configured.

## Structure

- `src/app/` — App Router pages
- `src/components/` — UI, layout, and page components
- `src/lib/` — Sanity, HubSpot, Resend, fallbacks
- `sanity/` — CMS schemas and Studio config
- `content/` — Legal pages and launch resource articles (markdown)

## Deployment

Separate Vercel project pointing to `apps/konduit` with root directory set accordingly. Domain: konduit.tech
