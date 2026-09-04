/**
 * Company facts used on About, Contact and legal pages.
 * Values marked "to be confirmed" are working drafts pending ops / legal review.
 * Do not invent registration numbers, phones or street addresses.
 */

export const COMPANY = {
  legalName: "Konduit Ltd",
  registrationNumber: "To be confirmed",
  registeredAddress: "To be confirmed, Zimbabwe",
  helloEmail: "hello@konduit.co.zw",
  quotesEmail: "quotes@konduit.co.zw",
  privacyEmail: "privacy@konduit.co.zw",
  quoteValidityDays: 14,
  recordRetentionYears: 7,
  damageReportHours: 48,
  lastUpdated: "4 September 2026",
  paymentMethods:
    "USD bank transfer, EcoCash, OneMoney, Visa and Mastercard via Paynow",
  depositTerms:
    "the deposit stated on the quote, with the balance due before delivery",
  zwgRateNote: "the rate stated on the quote",
} as const

export const BRANCH_DETAILS = [
  {
    title: "Head office and Harare branch",
    country: "Zimbabwe",
    city: "Harare",
    area: "Msasa",
    address: "Msasa industrial area. Street number to be confirmed.",
    phone: "To be published. Email hello@konduit.co.zw for the current line.",
    whatsapp: null as string | null,
    hours: "Monday to Friday, 8:00 to 17:00 CAT",
    note: "Home market. Infrastructure, telecoms and imports.",
  },
  {
    title: "Lusaka delivery hub",
    country: "Zambia",
    city: "Lusaka",
    area: "Delivery hub",
    address: "Street address to be confirmed. Coverage via regional freight.",
    phone: "To be published. Contact the Harare office for Lusaka deliveries.",
    whatsapp: null as string | null,
    hours: "By appointment, coordinated from Harare",
    note: "Infrastructure and telecoms deliveries.",
  },
  {
    title: "Gaborone delivery hub",
    country: "Botswana",
    city: "Gaborone",
    area: "Delivery hub",
    address: "Street address to be confirmed. Coverage via regional freight.",
    phone: "To be published. Contact the Harare office for Gaborone deliveries.",
    whatsapp: null as string | null,
    hours: "By appointment, coordinated from Harare",
    note: "Infrastructure and telecoms deliveries.",
  },
  {
    title: "Maputo and Johannesburg",
    country: "Regional",
    city: "Maputo / Johannesburg",
    area: "Quote on request",
    address: "Imports quoted on request through the Harare office.",
    phone: "Contact the Harare office.",
    whatsapp: null as string | null,
    hours: "Quote response within one business day",
    note: "No walk-in counter. Freight is arranged per quote.",
  },
] as const
