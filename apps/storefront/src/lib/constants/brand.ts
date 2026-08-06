/**
 * Konduit storefront copy — Organic design direction.
 * No em dashes. Delivery promise: Option B (variable by product, up to 30 days).
 */

export const BRAND = {
  name: "Konduit",
  tagline:
    "Technology supply, telecoms infrastructure and specified imports for Zimbabwe and Southern Africa. Delivered on a promise, not a guess.",
  eyebrow:
    "UK · USA · China suppliers, cleared into Zimbabwe and Southern Africa",
  headline: "Secure the technology your business runs on.",
  subhead:
    "Servers, telecoms build-out and specified imports, placed through vetted supplier networks across the UK, USA and China and cleared into Southern Africa under one account. Every request is priced against real supplier quotes, real compliance paperwork, and a delivery date we hold ourselves to. Prices shown are indicative. Every order is confirmed by quote.",
  primaryCta: "Request a business quote",
  secondaryCta: "Browse the catalogue",
  defaultDeliveryDays: 30,
  deliveryPromiseLabel: "Up to 30 days",
  deliveryPromiseBody:
    "Target window by origin and freight route, quote to doorstep",
} as const

export const NAV_LINKS = [
  { label: "Infrastructure", href: "/categories/infrastructure" },
  { label: "Telecoms", href: "/categories/telecoms" },
  { label: "Imports", href: "/categories/imports" },
  { label: "Branches", href: "/about#branches" },
] as const

export const WAYS_TO_BUY = [
  {
    node: "Infrastructure",
    title: "Servers & networking",
    body: "Rack servers, switches and structured cabling placed with authorised OEM suppliers across the UK, USA and China: Dell, HPE, Cisco. Every unit ships with warranty and compliance documentation. Volume orders route to a procurement engineer who specs against your rack, power and rollout plan.",
    href: "/categories/infrastructure",
    cta: "View infrastructure",
  },
  {
    node: "Telecoms",
    title: "Build-out & devices",
    body: "Site surveys, network installs and maintenance contracts for operators and enterprises, alongside routers, radios and business mobile devices sourced through our UK, USA and China supplier network and ready to quote without a survey.",
    href: "/categories/telecoms",
    cta: "View telecoms",
  },
  {
    node: "Imports",
    title: "Marketplace goods",
    body: "Specified goods not readily available locally. Sourced through external supplier partners in the UK, USA and China, priced landed in US dollars, and cleared through the same customs desk that handles our infrastructure shipments.",
    href: "/categories/imports",
    cta: "View marketplace",
  },
] as const

export const CATEGORY_INTROS: Record<string, string> = {
  infrastructure:
    "Servers, networking equipment, structured cabling, and end-user devices sourced from authorised OEM channels in the UK, USA and China. Every order ships with full warranty and compliance documentation. Volume orders route through a quote request. Smaller catalogue items can be quoted directly.",
  telecoms:
    "Network installation, maintenance contracts, site surveys, and business devices for teams building out connectivity. Volume and site work routes through a quote. Standard devices can be quoted from the catalogue.",
  "telecoms-infrastructure-services":
    "Network installation, maintenance contracts, and site surveys for businesses building out connectivity. Every engagement starts with a quote based on the site and scope.",
  "telecoms-devices":
    "Routers, radios, VSAT equipment, and business mobile devices sourced through our supplier network. Request a quote for standard orders. No survey required for catalogue devices.",
  imports:
    "Curated goods sourced internationally and landed in Zimbabwe. Delivery windows vary by origin, up to 30 days. What's listed is what's available. No backorders dressed up as stock.",
}

export const TRUST_STATS = [
  {
    title: "Up to 30 days",
    body: "Target delivery by origin and freight route, quote to doorstep",
  },
  {
    title: "USD priced",
    body: "Quoted in US dollars, our preferred settlement currency, with ZWG available on request",
  },
  {
    title: "5 markets",
    body: "Customs handled in-house across Zimbabwe and four neighbouring markets",
  },
] as const

/** Homepage timeline: upper-bound schedule for the published promise. */
export const DELIVERY_TIMELINE = [
  {
    day: "Day 1",
    title: "Sourced",
    body: "Order confirmed against OEM stock or import lot. PO issued to origin.",
    accent: "terracotta" as const,
  },
  {
    day: "Day 2 to 20",
    title: "In transit",
    body: "Freighted to the sub-region. Tracked at each leg, visible on your account.",
    accent: "terracotta" as const,
  },
  {
    day: "Day 21 to 27",
    title: "Customs",
    body: "Cleared in-house: duties, permits and compliance paperwork handled for you.",
    accent: "terracotta" as const,
  },
  {
    day: "Day 30",
    title: "Delivered",
    body: "Door-to-door to Harare, Bulawayo, Lusaka, Gaborone or your listed site.",
    accent: "sage" as const,
  },
] as const

export const LOGISTICS_STAGES = [
  {
    key: "sourced" as const,
    stage: "Sourced",
    desc: "Confirmed with supplier and dispatched",
  },
  {
    key: "in_transit" as const,
    stage: "In transit",
    desc: "Left origin warehouse, en route to Zimbabwe",
  },
  {
    key: "customs" as const,
    stage: "Customs",
    desc: "Clearing at Beitbridge, usually 2 to 3 days",
  },
  {
    key: "delivered" as const,
    stage: "Delivered",
    desc: "Final delivery to your address",
  },
] as const

export type LogisticsStatus = (typeof LOGISTICS_STAGES)[number]["key"]

/**
 * Physical presence. Addresses marked provisional pending ops confirmation.
 * Zimbabwe Msasa example matches the quote form placeholder in the design.
 */
export const BRANCHES = [
  {
    country: "Zimbabwe",
    city: "Harare",
    area: "Msasa",
    address: "Msasa industrial area (provisional)",
    tag: "Home market · all lines",
    tagVariant: "accent" as const,
    lines: "Infrastructure, Telecoms, Imports",
  },
  {
    country: "Zambia",
    city: "Lusaka",
    area: "Delivery hub",
    address: "Coverage via regional freight (provisional)",
    tag: "Infrastructure · Telecoms",
    tagVariant: "sage" as const,
    lines: "Infrastructure, Telecoms",
  },
  {
    country: "Botswana",
    city: "Gaborone",
    area: "Delivery hub",
    address: "Coverage via regional freight (provisional)",
    tag: "Infrastructure · Telecoms",
    tagVariant: "sage" as const,
    lines: "Infrastructure, Telecoms",
  },
  {
    country: "Mozambique",
    city: "Maputo",
    area: "Quote on request",
    address: "Imports and project freight on request",
    tag: "Imports · Quote on request",
    tagVariant: "neutral" as const,
    lines: "Imports",
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    area: "Quote on request",
    address: "Imports and project freight on request",
    tag: "Imports · Quote on request",
    tagVariant: "neutral" as const,
    lines: "Imports",
  },
] as const

export const QUOTE_COUNTRIES = [
  { value: "zw", label: "Zimbabwe" },
  { value: "zm", label: "Zambia" },
  { value: "bw", label: "Botswana" },
  { value: "mz", label: "Mozambique" },
  { value: "za", label: "South Africa" },
] as const

export const EMPTY_STATES = {
  cart: "Nothing in your cart yet. Browse the catalogue to get started.",
  outOfStock:
    "Not currently in stock. Request a quote and we'll confirm availability.",
  quoteSubmitted:
    "Quote request sent. We'll come back to you within one business day with pricing and a delivery date.",
  noOrders:
    "You don't have any orders yet. Browse the catalogue to place your first one.",
  notFound: "The page you tried to open doesn't exist.",
} as const

/** Optional n8n / Twenty CRM webhook. Falls back to Medusa quote-requests. */
export const QUOTE_WEBHOOK_ENV = "NEXT_PUBLIC_QUOTE_WEBHOOK_URL"
