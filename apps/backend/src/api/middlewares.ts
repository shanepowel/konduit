import {
  defineMiddlewares,
  type MedusaNextFunction,
  type MedusaRequest,
  type MedusaResponse,
} from "@medusajs/framework/http"

/**
 * Light rate limiting for checkout-adjacent store routes.
 * Production should also rate-limit at the reverse proxy.
 */
const hits = new Map<string, { count: number; reset: number }>()

function rateLimit(
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) {
  const key = `${req.ip || "unknown"}:${req.url}`
  const now = Date.now()
  const windowMs = 60_000
  const max = 30
  const entry = hits.get(key)

  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs })
    return next()
  }

  entry.count += 1
  if (entry.count > max) {
    res.status(429).json({ message: "Too many requests" })
    return
  }

  return next()
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/quote-requests",
      middlewares: [rateLimit],
    },
    {
      matcher: "/hooks/payment/*",
      middlewares: [rateLimit],
    },
  ],
})
