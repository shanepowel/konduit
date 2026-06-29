export type ProductAvailability = "in-stock" | "to-order" | "coming-soon";
export type CategoryStatus = "active" | "coming-soon";
export type ResourceType = "guide" | "case-study" | "template" | "news";
export type PartnerStatus = "active" | "coming-soon";
export type PartnerType = "Installer" | "Reseller" | "Support";
export type CountryStatus = "active" | "coming-soon" | "planned";
export type SolutionSlug = "enterprise" | "sme" | "ngo" | "government";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  manufacturer: string;
  partNumber?: string;
  image?: { asset: { _ref: string } };
  specs?: ProductSpec[];
  availability: ProductAvailability;
  leadTime?: string;
  category?: { slug: string; title: string };
}

export interface ProductCategory {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  status: CategoryStatus;
  products?: Product[];
}

export interface Resource {
  _id: string;
  title: string;
  slug: string;
  type: ResourceType;
  summary: string;
  body?: unknown[];
  publishedAt: string;
  readTime: number;
}

export interface Partner {
  _id: string;
  name: string;
  country: string;
  countryCode: string;
  type: PartnerType;
  description: string;
  status: PartnerStatus;
}

export interface Country {
  slug: string;
  name: string;
  countryCode: string;
  status: CountryStatus;
  cities: string[];
  logisticsNotes: string;
  partnerInfo?: string;
}

export interface Solution {
  slug: SolutionSlug;
  eyebrow: string;
  headline: string;
  subCopy: string;
  painPoints: string[];
  valueProps: { title: string; description: string; icon: string }[];
  relatedCategories: string[];
}
