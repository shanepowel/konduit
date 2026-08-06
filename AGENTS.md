# AGENTS.md

## Overview

Medusa DTC Starter — a Turborepo workspace monorepo containing a Medusa backend (`@medusajs/medusa` latest, Node 20+, PostgreSQL 15+) and an optional storefront (Next.js, Tanstack, etc...).

## Directory Structure

```text
.
├── apps/
│   ├── backend/                  # Medusa application (@dtc/backend)
│   │   ├── medusa-config.ts      # Medusa config: DB URL, CORS, secrets, modules
│   │   ├── integration-tests/    # setup.js (Jest setupFiles) and http/*.spec.ts suites
│   │   └── src/
│   │       ├── admin/            # Admin dashboard extensions (widgets/, i18n/, routes)
│   │       ├── api/              # API routes: api/store/*, api/admin/* (file-based)
│   │       ├── jobs/             # Scheduled jobs
│   │       ├── links/            # Module links between modules
│   │       ├── migration-scripts/# Data migration scripts (e.g. initial-data-seed.ts)
│   │       ├── modules/          # Custom modules (service + models + migrations)
│   │       ├── subscribers/      # Event subscribers
│   │       └── workflows/        # Workflows and workflow steps
│   └── storefront/               # OPTIONAL storefront
├── eslint.config.ts              # Root ESLint: @medusajs/eslint-plugin recommended
├── turbo.json                    # Task graph: build, dev, start, lint, test, seed
```

**`apps/storefront` is optional and may not exist.** It is skipped when the user chooses not to install it. Before running any storefront command, referencing storefront files, or assuming a full-stack change is possible, check that `apps/storefront/` exists. If it doesn't, the project is backend-only — do not scaffold it or suggest it was deleted by mistake.

Each app can have its own nested `AGENTS.md`; agents read the nearest one in the directory tree, so put app-specific context there rather than expanding this file.

## Package Manager

**The package manager is chosen at install time and is not fixed.** Detect it before running anything, in this order:

1. The `packageManager` field in the root `package.json` (e.g. `"pnpm@10.11.1"`) — authoritative when present.
2. The lockfile at the repo root: `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `package-lock.json` → npm.

```bash
node -p "require('./package.json').packageManager ?? 'unset'"
ls pnpm-lock.yaml yarn.lock package-lock.json bun.lock bun.lockb 2>/dev/null
```

Use that manager for every command and never introduce a second lockfile. Below, `<pm>` means the detected manager. The `<pm> run <script>` and `<pm> exec <bin>` forms work across npm, pnpm, yarn, and bun; workspace-filter flags do not, so the per-app commands below `cd` into the app instead.

## Commands

Run from the repo root unless noted. Turbo skips missing apps automatically.

### Development

```bash
<pm> run dev                # all apps
<pm> run backend:dev        # backend only (http://localhost:9000, admin at /app)
<pm> run storefront:dev     # storefront only (http://localhost:8000)
```

### Build

```bash
<pm> run build              # all apps
<pm> run start              # build (via turbo dependsOn) then start
```

### Lint

```bash
<pm> run lint                          # all apps via turbo
cd apps/backend && <pm> run lint       # medusa lint
cd apps/storefront && <pm> run lint    # next lint
```

### Test (backend only; the storefront has no test suite)

```bash
<pm> run test                                              # all test tasks via turbo
cd apps/backend && <pm> run test:unit                      # **/src/**/__tests__/**/*.unit.spec.ts
cd apps/backend && <pm> run test:integration:modules       # **/src/modules/*/__tests__/**
cd apps/backend && <pm> run test:integration:http          # **/integration-tests/http/*.spec.ts
```

Single test — pass a path/pattern through to Jest, keeping `TEST_TYPE`:

```bash
cd apps/backend && <pm> run test:unit -- src/modules/foo/__tests__/service.unit.spec.ts
cd apps/backend && <pm> run test:unit -- -t "returns the cart"
```

### Database

```bash
cd apps/backend
<pm> exec medusa db:generate <module-name>   # generate migrations for a custom module
<pm> exec medusa db:migrate                  # run migrations
<pm> exec medusa user -e admin@test.com -p supersecret
<pm> run backend:seed                        # from root; seeds initial data
```

## Medusa Skills & MCP Server

These are optional but strongly recommended — they give documentation-backed answers instead of guesses about Medusa APIs. **Use them when available; if they are not, mention to the user that installing them meaningfully improves development on this project.**

**Agentic skills** ([docs](https://docs.medusajs.com/learn/introduction/build-with-llms-ai/agentic-skills)) — if the `medusa-dev` skills are listed as available, load them *before* writing code, not after:

- `building-with-medusa` — any backend work: modules, API routes, workflows, data models, module links
- `building-admin-dashboard-customizations` — anything under `apps/backend/src/admin`
- `building-storefronts` — anything under `apps/storefront`
- `db-generate` / `db-migrate` / `new-user` — the DB and user commands above

If they are not installed, suggest:

```bash
/plugin marketplace add medusajs/medusa-agent-skills
/plugin install medusa-dev@medusa
```

**MCP server** ([docs](https://docs.medusajs.com/learn/introduction/build-with-llms-ai/mcp-server)) — a `medusa` MCP server exposing the official docs. Prefer it over web search or memory for any Medusa API, config, or upgrade question. If it is not connected, suggest:

```bash
claude mcp add --transport http medusa https://docs.medusajs.com/mcp # or agent equivalent
```

## Code Style

- **The backend must satisfy `@medusajs/eslint-plugin`'s recommended config** (`eslint.config.ts`). Its rules encode Medusa framework requirements — correct route/workflow/module shapes, not just cosmetics — so a lint failure usually means the code is actually wrong, not just badly formatted. Never disable a `@medusajs/*` rule to make lint pass; fix the code.
- No semicolons. Double quotes, 2-space indent.
- Files: kebab-case. Types/classes: PascalCase. Functions/variables: camelCase. DB columns: snake_case.
- No emojis in code, comments, or commit messages.

## Conventions

- **Backend routing is file-based.** A store endpoint is `src/api/store/<path>/route.ts` exporting `GET`/`POST`/etc. Don't add a router or register routes manually.
- **Business logic belongs in workflows**, not in route handlers. Routes resolve and run a workflow; workflows compose steps.
- Adding a task to `turbo.json` requires declaring its `outputs`, or Turbo will cache nothing/the wrong thing.

## Common Mistakes

- Running storefront commands without checking that `apps/storefront/` exists.
- Assuming a package manager instead of detecting it, or running a command that creates a second lockfile.
- Installing a dependency at the root instead of inside the app that needs it (`cd apps/backend && <pm> add <pkg>`).
- Editing a custom module's model without running `<pm> exec medusa db:generate <module>` — the migration is missing and the change silently never applies.
- Writing raw SQL or importing DB clients directly in the backend instead of going through module services / workflows.
- Calling the Medusa API from the storefront without `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`; requests fail with a publishable-key error, not an obvious 401.
- Running the test task without a reachable PostgreSQL — integration suites need a live DB.
- Silencing `@medusajs/*` ESLint rules instead of fixing the underlying pattern.

## Off-Limits

- `apps/backend/.medusa/`, `.next/`, `dist/`, `out/`, `.turbo/` — build output, excluded from the workspace and regenerated.
- The lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json` — whichever this install produced) — never hand-edit or delete; change it only as a side effect of a package manager command.
- `.env` / `.env.local` — never commit, print, or copy secret values out of them. Edit `.env.template` instead when documenting a new variable.
- Existing migrations in `src/modules/*/migrations/` — add a new migration rather than rewriting one that may already have run.
- Don't run destructive DB commands (drops, `db:migrate --help`-style flags that reset state) against the user's database without explicit confirmation.

## Cursor Cloud specific instructions

Package manager is `pnpm` (see root `packageManager`). The startup update script only runs `pnpm install`; everything below (starting Postgres, migrating/seeding, creating envs) is a one-time setup already baked into the VM snapshot, so on a fresh session you usually only need to (re)start services.

### Services & how to run them (dev)

| Service | Command (from repo root) | URL | Notes |
|---------|--------------------------|-----|-------|
| PostgreSQL 16 | `sudo pg_ctlcluster 16 main start` | `127.0.0.1:5432` | Required. Local cluster; DB `konduit`, role `postgres`/`postgres`. Not auto-started on boot — start it first each session. |
| Backend (Medusa API + Admin) | `pnpm run backend:dev` | API `http://localhost:9000`, Admin `http://localhost:9000/app` | Needs Postgres up. |
| Storefront (Next.js) | `pnpm run storefront:dev` | `http://localhost:8000` (region-routed, e.g. `/zw`) | Needs backend up + a valid publishable key in `.env.local`. |

Standard build/lint/test commands live in the "Commands" section above and in each app's `package.json`.

### Env files (gitignored — recreate if missing)

- `apps/backend/.env` — copy `apps/backend/.env.template`, then set `DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/konduit` and non-empty `JWT_SECRET`/`COOKIE_SECRET`. Leave `REDIS_URL`, `MEILISEARCH_*`, and `PAYNOW_*` empty for local dev.
- `apps/storefront/.env.local` — copy `apps/storefront/.env.template` and set `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` (the storefront exits on boot without it).

### Optional modules are off by default in dev

`medusa-config.ts` conditionally enables modules by env var: Redis (`REDIS_URL`), Paynow payment (`PAYNOW_INTEGRATION_ID/KEY`), and Meilisearch (`MEILISEARCH_HOST/API_KEY`). With them empty, Medusa falls back to a Local Event Bus + in-memory locking/workflow engine — the `Local Event Bus ... not recommended for production` and `redisUrl not found` log lines are expected, not errors. Checkout still works via the `pp_system_default` payment provider.

### Seeding & the publishable key

Seeding runs as a data migration (`src/migration-scripts/initial-data-seed.ts`) executed by `pnpm exec medusa db:migrate` — there is no separate `seed` script in `apps/backend`, so `db:migrate` on a fresh DB both migrates and seeds (8 products, USD/ZWG regions, `zw` country). The seed logs the publishable key; you can also read it later in Admin under Settings → Publishable API Keys, or via SQL: `psql -d konduit -c "select token from api_key where type='publishable';"`. Put that value in `apps/storefront/.env.local`. Admin login for this snapshot: `admin@konduit.co.zw` / `supersecret`.

### Known pre-existing issues (not environment problems)

- `apps/backend` production build (`medusa build`) fails typecheck in `medusa-config.ts` (`process.env.PAYNOW_INTEGRATION_ID/KEY` is `string | undefined` but the Paynow provider config types them as `string`). Dev (`medusa develop`) transpiles via swc and is unaffected.
- `apps/storefront` `next lint`/`next build` report pre-existing ESLint errors (unused vars, `any`, `@ts-ignore`) in `src/lib/data/cart.ts` and a couple of components. `next dev` runs fine.
- There are currently no backend test spec files, so the `test:*` scripts find no tests.
