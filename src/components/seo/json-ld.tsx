import { contactEmail, siteName, siteUrl } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/images/logo/konduit-logo.svg`,
    description:
      "European-sourced hardware and infrastructure for Southern African businesses. Full warranty, compliance-ready, in-region support.",
    parentOrganization: {
      "@type": "Organization",
      name: "Digiteq Holdings",
      url: "https://digiteq.io",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      contactType: "Sales enquiries",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/resources?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; href: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  readTime: number;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  readTime,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}/resources/${slug}`,
    datePublished: publishedAt,
    timeRequired: `PT${readTime}M`,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo/konduit-logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/resources/${slug}` },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

interface ItemListJsonLdProps {
  name: string;
  items: { name: string; url: string }[];
}

export function ItemListJsonLd({ name, items }: ItemListJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
