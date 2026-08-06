/**
 * Vercel monorepo bridge when Project Root Directory is still the repo root.
 * Preferred setup: set Root Directory to `apps/storefront` (see deploy/VERCEL.md)
 * and delete this indirection from root vercel.json.
 */
import { cpSync, existsSync, rmSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const storefront = join(root, "apps", "storefront")

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run("pnpm", ["--filter", "@dtc/storefront", "build"])

const nextOut = join(storefront, ".next")
if (!existsSync(nextOut)) {
  console.error("Expected apps/storefront/.next after build")
  process.exit(1)
}

for (const name of [".next", "public", "next.config.js", "check-env-variables.js"]) {
  const dest = join(root, name)
  if (existsSync(dest)) {
    rmSync(dest, { recursive: true, force: true })
  }
}

cpSync(nextOut, join(root, ".next"), { recursive: true })
cpSync(join(storefront, "public"), join(root, "public"), { recursive: true })
cpSync(join(storefront, "next.config.js"), join(root, "next.config.js"))
cpSync(
  join(storefront, "check-env-variables.js"),
  join(root, "check-env-variables.js")
)

console.log("Staged storefront Next.js build at repo root for Vercel")
