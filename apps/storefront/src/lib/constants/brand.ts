export const BRAND = {
  name: "Konduit",
  tagline:
    "Technology supply, telecoms infrastructure, and imported goods for Zimbabwe — delivered on a promise, not a guess.",
  eyebrow: "Sourced globally · routed to Zimbabwe",
  headline: "Order it. It arrives in 30 days.",
  headlineAccent: "30 days",
  subhead:
    "Servers and networking gear. Telecoms infrastructure and devices. Imported goods you can't source locally. One account, one delivery promise, tracked door to door.",
  primaryCta: "Browse the catalogue",
  secondaryCta: "Request a business quote",
  defaultDeliveryDays: 30,
  whatsappNote:
    "Questions about this order? Message us on WhatsApp — we can see this same tracking on our end.",
} as const

export const NAV_LINKS = [
  { label: "Infrastructure", href: "/categories/infrastructure" },
  { label: "Telecoms", href: "/categories/telecoms" },
  { label: "Imports", href: "/categories/imports" },
  { label: "Track an order", href: "/track" },
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
    body: "Curated imported products not readily available locally — priced, in stock, and covered by the same 30-day delivery promise.",
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
    "Curated goods sourced internationally and landed in Zimbabwe on a 30-day delivery window. What's listed is what's available — no backorders dressed up as stock.",
}

/**
 * Payment methods stay out until Paynow is live.
 * When ready, insert: { title: "EcoCash · OneMoney · Card", body: "Pay the way that suits the order" }
 */
export const TRUST_ITEMS = [
  {
    title: "30 days",
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

/** Baseline route waypoints for a 30-day window (scaled at render time). */
export const ROUTE_BASELINE = {
  days: 30,
  nodes: [
    { place: "Sourced", startDay: 1, endDay: 1 },
    { place: "In transit", startDay: 2, endDay: 18 },
    { place: "Customs", startDay: 19, endDay: 25 },
    { place: "Harare", startDay: 30, endDay: 30 },
  ],
} as const

export const LOGISTICS_STAGES = [
  {
    key: "sourced",
    stage: "Sourced",
    desc: "Confirmed with supplier and dispatched",
  },
  {
    key: "in_transit",
    stage: "In transit",
    desc: "Left origin warehouse, en route to Zimbabwe",
  },
  {
    key: "customs",
    stage: "Customs",
    desc: "Clearing at Beitbridge — usually 2–3 days",
  },
  {
    key: "delivered",
    stage: "Delivered — Harare",
    desc: "Final delivery to your address",
  },
] as const

export type LogisticsStatus = (typeof LOGISTICS_STAGES)[number]["key"]

export const QUOTE_CATEGORIES = [
  "Infrastructure — servers & networking",
  "Telecoms — infrastructure services",
  "Telecoms — devices",
  "Imports — marketplace goods",
  "Other / mixed",
] as const

export const EMPTY_STATES = {
  cart: "Nothing in your cart yet. Browse the catalogue to get started.",
  outOfStock:
    "Not currently in stock. Request a quote and we'll confirm availability.",
  quoteSubmitted:
    "Quote request sent. We'll come back to you within one business day with pricing and a delivery date.",
  orderPlaced:
    "Order confirmed — reference {ref}. Track its route from Track an order.",
  paymentFailed:
    "Payment didn't go through. No charge was made — try again or choose a different payment method.",
  noOrders:
    "You don't have any orders yet. Browse the catalogue to place your first one.",
  notFound: "The page you tried to open doesn't exist.",
} as const
