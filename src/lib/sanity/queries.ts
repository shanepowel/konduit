import { getSanityClient } from "./client";
import type { Partner, ProductCategory, Resource } from "./types";
import { fallbackCategories, fallbackPartners, fallbackResources } from "../fallbacks/content";

const categoryFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  icon,
  order,
  status,
  "products": products[]->{
    _id,
    name,
    manufacturer,
    partNumber,
    image,
    specs,
    availability,
    leadTime,
    "category": category->{ "slug": slug.current, title }
  }
`;

export async function getProductCategories(): Promise<ProductCategory[]> {
  const client = getSanityClient();
  if (!client) return fallbackCategories;

  const data = await client.fetch<ProductCategory[]>(
    `*[_type == "productCategory"] | order(order asc) { ${categoryFields} }`,
  );
  return data.length > 0 ? data : fallbackCategories;
}

export async function getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  const client = getSanityClient();
  if (!client) {
    return fallbackCategories.find((c) => c.slug === slug) ?? null;
  }

  const data = await client.fetch<ProductCategory | null>(
    `*[_type == "productCategory" && slug.current == $slug][0] { ${categoryFields} }`,
    { slug },
  );
  return data ?? fallbackCategories.find((c) => c.slug === slug) ?? null;
}

export async function getResources(type?: string): Promise<Resource[]> {
  const client = getSanityClient();
  if (!client) {
    return type
      ? fallbackResources.filter((r) => r.type === type)
      : fallbackResources;
  }

  const filter = type
    ? `*[_type == "resource" && type == $type]`
    : `*[_type == "resource"]`;

  const data = await client.fetch<Resource[]>(
    `${filter} | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      type,
      summary,
      body,
      publishedAt,
      readTime
    }`,
    { type },
  );
  return data.length > 0 ? data : fallbackResources;
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const client = getSanityClient();
  if (!client) {
    return fallbackResources.find((r) => r.slug === slug) ?? null;
  }

  const data = await client.fetch<Resource | null>(
    `*[_type == "resource" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      type,
      summary,
      body,
      publishedAt,
      readTime
    }`,
    { slug },
  );
  return data ?? fallbackResources.find((r) => r.slug === slug) ?? null;
}

export async function getPartners(): Promise<Partner[]> {
  const client = getSanityClient();
  if (!client) return fallbackPartners;

  const data = await client.fetch<Partner[]>(
    `*[_type == "partner"] | order(name asc) {
      _id,
      name,
      country,
      countryCode,
      type,
      description,
      status
    }`,
  );
  return data.length > 0 ? data : fallbackPartners;
}
