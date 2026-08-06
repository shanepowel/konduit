# Vercel (storefront)

The Next.js app lives at `apps/storefront`.

## Preferred project settings

In [Build & Deployment](https://vercel.com/shanerad1s-projects/konduit/settings/build-and-deployment) for project **konduit**:

| Setting | Value |
| --- | --- |
| **Root Directory** | `apps/storefront` |
| **Include files outside the root directory** | Enabled (pnpm workspace) |
| Framework | Next.js |
| Install Command | `cd ../.. && pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Node.js Version | **22.x** (avoid 24.x for Next 15) |

Once Root Directory is `apps/storefront`, root `vercel.json` is ignored and `apps/storefront/vercel.json` applies. You can then drop the root `next` / `react` bridge dependencies and `scripts/vercel-build-storefront.mjs`.

## Bridge (repo root as Vercel root)

If Root Directory is still `.`, Vercel used to fail with:

> No Next.js version detected…

The repo root now declares matching `next` / `react` versions. `scripts/vercel-link-storefront.mjs` (run from root `installCommand`) symlinks the storefront app/`src`, config, and `public` into the repo root so Vercel’s Next.js builder can run `next build` with correct file traces.

## Env vars

Mirror `apps/storefront/.env.template` (and production values from Medusa Cloud), at least:

- `MEDUSA_BACKEND_URL` → `https://konduit.medusajs.app`
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` → same
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_URL` → production storefront URL
- `NEXT_PUBLIC_DEFAULT_REGION` → `zw`
