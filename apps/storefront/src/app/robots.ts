import { getBaseURL } from "@lib/util/env"
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const base = getBaseURL().replace(/\/$/, "")
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/account", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
