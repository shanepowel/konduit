const c = require("ansi-colors")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length === 0) {
    return
  }

  const onVercelOrCi = Boolean(process.env.VERCEL || process.env.CI)
  const header = onVercelOrCi
    ? "\n⚠️  Warning: Missing recommended environment variables\n"
    : "\n🚫 Error: Missing required environment variables\n"

  console.error(c.red.bold(header))

  missingEnvs.forEach(function (env) {
    console.error(c.yellow(`  ${c.bold(env.key)}`))
    if (env.description) {
      console.error(c.dim(`    ${env.description}\n`))
    }
  })

  if (onVercelOrCi) {
    console.error(
      c.yellow(
        "\nSet these in the Vercel project Environment Variables (Production + Preview),\n" +
          "or commit apps/storefront/.env.production for build-time NEXT_PUBLIC_* defaults.\n"
      )
    )
    return
  }

  console.error(
    c.yellow(
      "\nPlease set these variables in your .env file or environment before starting the application.\n"
    )
  )

  process.exit(1)
}

module.exports = checkEnvVariables
