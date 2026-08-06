export const BRAND = {
  name: "Konduit",
  tagline:
    "Technology supply, telecoms infrastructure, and imported goods for Zimbabwe — delivered on a promise, not a guess.",
  eyebrow: "Sourced globally · routed to Zimbabwe",
  headline: "Order it. It arrives in two weeks.",
  subhead:
    "Servers and networking gear. Telecoms infrastructure and devices. Imported goods you can't source locally. One account, one delivery promise, tracked door to door.",
} as const

export const NAV_LINKS = [
  { label: "Infrastructure", href: "/categories/infrastructure" },
  { label: "Telecoms", href: "/categories/telecoms" },
  { label: "Imports", href: "/categories/imports" },
  { label: "Track an order", href: "/account/orders" },
] as const

export const WAYS_TO_BUY = [
  {
    node: "Infrastructure",
    title: "Servers & networking",
    body: "Rack servers, switches, structured cabling and end-user devices from authorised OEMs. Warranty and compliance docs included. Volume orders route through a quote.",
    href: "/categories/infrastructure",
    cta: "View infrastructure",
  },
  {
    node: "Telecoms",
    title: "Build-out & devices",
    body: "Network installs, maintenance contracts and site surveys, alongside routers, radios and business mobile devices ready to ship.",
    href: "/categories/telecoms",
    cta: "View telecoms",
  },
  {
    node: "Imports",
    title: "Marketplace goods",
    body: "Curated imported products not readily available locally — priced, in stock, and covered by the same two-week delivery promise.",
    href: "/categories/imports",
    cta: "View marketplace",
  },
] as const

/** Longer intros for category pages — keyed by category handle. */
export const CATEGORY_INTROS: Record<string, string> = {
  infrastructure:
    "Servers, networking equipment, structured cabling, and end-user devices sourced from authorised OEM channels. Every order ships with full warranty and compliance documentation. Volume orders route through a quote request — smaller in-stock items can be bought directly.",
  telecoms:
    "Network installation, maintenance contracts, site surveys, and business devices for teams building out connectivity. Browse services and hardware below — volume and site work routes through a quote; standard devices can be bought directly.",
  "telecoms-infrastructure-services":
    "Network installation, maintenance contracts, and site surveys for businesses building out connectivity. Every engagement starts with a quote based on the site and scope — reach out with your requirements and we'll come back with a proposal and timeline.",
  "telecoms-devices":
    "Routers, radios, VSAT equipment, and business mobile devices, in stock and ready to ship. Buy directly — no quote needed for standard orders.",
  imports:
    "Curated goods sourced internationally and landed in Zimbabwe on a two-week delivery window. What's listed is what's available — no backorders dressed up as stock.",
}

export const TRUST_ITEMS = [
  {
    title: "14 days",
    body: "Target delivery window, order to doorstep",
  },
  {
    title: "USD · ZWG",
    body: "Priced and payable in either currency",
  },
  {
    title: "Zim-based support",
    body: "Local numbers, local hours, real tracking",
  },
] as const

export const ROUTE_NODES = [
  { place: "Sourced", day: "Day 1", pending: false },
  { place: "In transit", day: "Day 2–8", pending: false },
  { place: "Customs", day: "Day 9–11", pending: false },
  { place: "Harare", day: "Day 14", pending: true },
] as const

export const QUOTE_MAILTO =
  "mailto:quotes@konduit.co.zw?subject=Business%20quote%20request"
