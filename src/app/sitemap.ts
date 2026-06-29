import type { MetadataRoute } from "next";
import { countries, fallbackCategories, fallbackResources, solutions } from "@/lib/fallbacks/content";
import { siteUrl } from "@/lib/site";

const staticPages = [
  "",
  "/products",
  "/solutions",
  "/coverage",
  "/partners",
  "/about",
  "/quote",
  "/resources",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const category of fallbackCategories) {
    entries.push({
      url: `${siteUrl}/products/${category.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const solution of solutions) {
    entries.push({
      url: `${siteUrl}/solutions/${solution.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const country of countries) {
    entries.push({
      url: `${siteUrl}/coverage/${country.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const resource of fallbackResources) {
    entries.push({
      url: `${siteUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
