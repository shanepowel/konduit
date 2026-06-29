import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

const defaultOg = "/images/og/konduit-og.svg";

export function buildMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = page.title.includes("Konduit") ? page.title : `${page.title} | Konduit`;
  const ogImage = page.ogImage || defaultOg;

  return {
    title: fullTitle,
    description: page.description,
    openGraph: {
      title: fullTitle,
      description: page.description,
      url: `${siteUrl}${page.path}`,
      siteName: "Konduit",
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}${page.path}`,
    },
  };
}

export const pageMetadata = {
  home: {
    title: "Konduit - Enterprise Technology Supply for Southern Africa",
    description:
      "European-sourced hardware and infrastructure for Southern African businesses. Full warranty, compliance-ready, in-region support.",
    path: "/",
  },
  products: {
    title: "Products | Konduit",
    description:
      "Enterprise-grade hardware and infrastructure from authorised European distributors. Manufacturer warranty, delivered to Southern Africa.",
    path: "/products",
  },
  solutions: {
    title: "Solutions for your sector | Konduit",
    description:
      "However you procure technology, we have the supply chain, documentation, and support to match.",
    path: "/solutions",
  },
  coverage: {
    title: "Where we operate | Konduit",
    description:
      "Enterprise hardware and IT infrastructure delivered across Southern Africa with in-region support.",
    path: "/coverage",
  },
  partners: {
    title: "Our partner network | Konduit",
    description:
      "We work with local technology companies across Southern Africa to provide installation, configuration, and ongoing support.",
    path: "/partners",
  },
  about: {
    title: "About Konduit",
    description:
      "European-sourced enterprise technology for Southern African businesses. A Digiteq Holdings company.",
    path: "/about",
  },
  quote: {
    title: "Request a quote | Konduit",
    description:
      "Tell us what you need. We will get back to you within 48 hours with a competitive quote.",
    path: "/quote",
  },
  resources: {
    title: "Resources | Konduit",
    description:
      "Guides, case studies, and procurement insights for enterprise technology in Southern Africa.",
    path: "/resources",
  },
  contact: {
    title: "Contact | Konduit",
    description:
      "Get in touch with Konduit. Email, WhatsApp, or contact form. We respond within 48 hours.",
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy | Konduit",
    description: "How Konduit collects, uses, and protects your data. GDPR and POPIA aligned.",
    path: "/privacy",
  },
  terms: {
    title: "Terms and Conditions | Konduit",
    description: "Terms governing the use of konduit.tech and our quote-based supply services.",
    path: "/terms",
  },
  cookies: {
    title: "Cookie Policy | Konduit",
    description: "How Konduit uses cookies and similar technologies on konduit.tech.",
    path: "/cookies",
  },
} as const;
