/**
 * Link the Medusa storefront into the monorepo root so Vercel can run
 * `next build` when Project Root Directory is still ".".
 *
 * Preferred: set Root Directory to `apps/storefront` (deploy/VERCEL.md).
 */
import { existsSync, rmSync, symlinkSync } from "node:fs"
import { join, dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const storefront = join(root, "apps", "storefront")

const links = [
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

for (const name of links) {
  const target = join(storefront, name)
  const dest = join(root, name)
  if (!existsSync(target)) {
    console.warn(`skip missing ${name}`)
    continue
  }
  rmSync(dest, { recursive: true, force: true })
  const rel = relative(root, target)
  symlinkSync(rel, dest)
  console.log(`linked ${name} -> ${rel}`)
}
