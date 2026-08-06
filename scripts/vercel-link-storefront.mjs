/**
 * Materialize the Medusa storefront at the monorepo root so Vercel can run
 * `next build` when Project Root Directory is still ".".
 *
 * Preferred: set Root Directory to `apps/storefront` (deploy/VERCEL.md).
 *
 * Uses copies (not symlinks) so Vercel’s Next.js file tracer resolves
 * app routes like twitter-image.jpg correctly.
 */
import { cpSync, existsSync, rmSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const storefront = join(root, "apps", "storefront")

const entries = [
  "src",
  "public",
  "next.config.js",
  "check-env-variables.js",
  "tsconfig.json",
  "postcss.config.js",
  "tailwind.config.js",
  "next-env.d.ts",
  ".env.production",
]

for (const name of entries) {
  const target = join(storefront, name)
  const dest = join(root, name)
  if (!existsSync(target)) {
    console.warn(`skip missing ${name}`)
    continue
  }
  rmSync(dest, { recursive: true, force: true })
  cpSync(target, dest, { recursive: true })
  console.log(`copied ${name}`)
}
