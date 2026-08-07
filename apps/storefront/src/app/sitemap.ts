import { getBaseURL } from "@lib/util/env"
import { MetadataRoute } from "next"

const STATIC_PATHS = [
  "",
  "/about",
  "/quote",
  "/store",
  "/track",
  "/categories/infrastructure",
  "/categories/telecoms",
  "/categories/imports",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseURL().replace(/\/$/, "")
  const country = "zw"
  const now = new Date()

  return STATIC_PATHS.map((path) => ({
    url: `${base}/${country}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }))
}
