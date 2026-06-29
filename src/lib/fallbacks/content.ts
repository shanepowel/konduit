import type { Country, Partner, ProductCategory, Resource, Solution } from "../sanity/types";

export const fallbackCategories: ProductCategory[] = [
  {
    _id: "cat-end-user",
    title: "End-user devices",
    slug: "end-user-devices",
    description:
      "Laptops, desktops, monitors, and peripherals from Dell, Lenovo, HP, and other authorised OEMs.",
    icon: "Laptop",
    order: 1,
    status: "active",
    products: [
      {
        _id: "prod-lenovo-t14",
        name: "ThinkPad T14 Gen 5",
        manufacturer: "Lenovo",
        partNumber: "21ML000EUK",
        availability: "in-stock",
        leadTime: "5 to 10 business days",
        specs: [
          { label: "Processor", value: "Intel Core Ultra 7" },
          { label: "Memory", value: "32 GB DDR5" },
          { label: "Storage", value: "1 TB NVMe SSD" },
        ],
      },
      {
        _id: "prod-dell-optiplex",
        name: "OptiPlex 7020 Tower",
        manufacturer: "Dell",
        partNumber: "7020-TWR-I7",
        availability: "to-order",
        leadTime: "10 to 15 business days",
        specs: [
          { label: "Processor", value: "Intel Core i7" },
          { label: "Memory", value: "16 GB DDR5" },
          { label: "Storage", value: "512 GB SSD" },
        ],
      },
    ],
  },
  {
    _id: "cat-networking",
    title: "Networking and infrastructure",
    slug: "networking-and-infrastructure",
    description:
      "Switches, routers, wireless access points, and structured cabling from Cisco, Ubiquiti, and HPE Aruba.",
    icon: "Network",
    order: 2,
    status: "active",
    products: [
      {
        _id: "prod-cisco-switch",
        name: "Catalyst 9200L 24-port Switch",
        manufacturer: "Cisco",
        partNumber: "C9200L-24P-4G-E",
        availability: "to-order",
        leadTime: "7 to 14 business days",
        specs: [
          { label: "Ports", value: "24 x 1GbE PoE+" },
          { label: "Uplinks", value: "4 x 1G SFP" },
          { label: "Stacking", value: "StackWise-160" },
        ],
      },
      {
        _id: "prod-ubiquiti-ap",
        name: "UniFi U6 Pro Access Point",
        manufacturer: "Ubiquiti",
        partNumber: "U6-Pro",
        availability: "in-stock",
        leadTime: "3 to 7 business days",
        specs: [
          { label: "Wi-Fi", value: "Wi-Fi 6" },
          { label: "Throughput", value: "5.3 Gbps aggregate" },
          { label: "Mounting", value: "Ceiling or wall" },
        ],
      },
    ],
  },
  {
    _id: "cat-server",
    title: "Server and storage",
    slug: "server-and-storage",
    description:
      "Rack servers, NAS, SAN, and backup appliances for on-premises and hybrid workloads.",
    icon: "Server",
    order: 3,
    status: "active",
    products: [
      {
        _id: "prod-dell-r740",
        name: "PowerEdge R740 Rack Server",
        manufacturer: "Dell",
        partNumber: "R740-BASE",
        availability: "to-order",
        leadTime: "14 to 21 business days",
        specs: [
          { label: "Form factor", value: "2U rack" },
          { label: "Processors", value: "Dual Intel Xeon Scalable" },
          { label: "Storage", value: "Up to 24 x 2.5\" drives" },
        ],
      },
      {
        _id: "prod-hpe-nas",
        name: "HPE MSA 2060 Storage",
        manufacturer: "HPE",
        partNumber: "R0Q85A",
        availability: "to-order",
        leadTime: "14 to 21 business days",
        specs: [
          { label: "Capacity", value: "Up to 336 TB" },
          { label: "Protocol", value: "iSCSI, FC, SAS" },
          { label: "Redundancy", value: "Dual controllers" },
        ],
      },
    ],
  },
];

export const fallbackResources: Resource[] = [
  {
    _id: "res-donor-procurement",
    title: "How to procure IT equipment for donor-funded projects in Southern Africa",
    slug: "donor-funded-it-procurement-southern-africa",
    type: "guide",
    summary:
      "A practical guide to sourcing enterprise IT for NGO and development projects, with audit-ready documentation.",
    publishedAt: "2026-05-15T09:00:00.000Z",
    readTime: 8,
  },
  {
    _id: "res-new-vs-refurb",
    title: "Choosing between new and refurbished enterprise hardware",
    slug: "new-vs-refurbished-enterprise-hardware",
    type: "guide",
    summary:
      "When refurbished makes sense, when it does not, and how warranty coverage affects the decision.",
    publishedAt: "2026-05-08T09:00:00.000Z",
    readTime: 6,
  },
  {
    _id: "res-import-regulations",
    title: "A guide to IT import regulations in Zimbabwe and Zambia",
    slug: "it-import-regulations-zimbabwe-zambia",
    type: "guide",
    summary:
      "Customs considerations, documentation requirements, and typical lead times for hardware imports.",
    publishedAt: "2026-04-28T09:00:00.000Z",
    readTime: 10,
  },
  {
    _id: "res-warranty-matters",
    title: "Why manufacturer warranty matters more than price",
    slug: "why-manufacturer-warranty-matters",
    type: "guide",
    summary:
      "Grey market risk, support gaps, and the true cost of hardware without OEM warranty coverage.",
    publishedAt: "2026-04-20T09:00:00.000Z",
    readTime: 5,
  },
];

export const fallbackPartners: Partner[] = [
  {
    _id: "partner-placeholder-1",
    name: "Partner network expanding",
    country: "South Africa",
    countryCode: "ZA",
    type: "Installer",
    description:
      "We are onboarding certified installation partners across Southern Africa. Apply to join our network.",
    status: "coming-soon",
  },
];

export const countries: Country[] = [
  {
    slug: "south-africa",
    name: "South Africa",
    countryCode: "ZA",
    status: "active",
    cities: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
    logisticsNotes:
      "Primary port of entry via Durban and Cape Town. Typical lead time 7 to 14 days from dispatch. Full customs clearance support available.",
    partnerInfo: "Installation and support partners active in Gauteng, Western Cape, and KwaZulu-Natal.",
  },
  {
    slug: "zimbabwe",
    name: "Zimbabwe",
    countryCode: "ZW",
    status: "active",
    cities: ["Harare", "Bulawayo"],
    logisticsNotes:
      "Imports via Beitbridge or Harare airport. Typical lead time 10 to 18 days. We handle ZIMRA documentation and duty calculations.",
    partnerInfo: "Local support partners in Harare for installation and warranty claims.",
  },
  {
    slug: "zambia",
    name: "Zambia",
    countryCode: "ZM",
    status: "active",
    cities: ["Lusaka", "Kitwe", "Ndola"],
    logisticsNotes:
      "Imports via Dar es Salaam corridor or direct to Lusaka. Typical lead time 12 to 20 days. ZRA compliance documentation included.",
    partnerInfo: "Installation partners in Lusaka and Copperbelt region.",
  },
  {
    slug: "botswana",
    name: "Botswana",
    countryCode: "BW",
    status: "coming-soon",
    cities: ["Gaborone", "Francistown"],
    logisticsNotes: "Coverage launching Q3 2026. Register interest via quote request.",
  },
  {
    slug: "mozambique",
    name: "Mozambique",
    countryCode: "MZ",
    status: "coming-soon",
    cities: ["Maputo", "Beira"],
    logisticsNotes: "Coverage launching Q3 2026. Register interest via quote request.",
  },
  {
    slug: "namibia",
    name: "Namibia",
    countryCode: "NA",
    status: "coming-soon",
    cities: ["Windhoek", "Walvis Bay"],
    logisticsNotes: "Coverage launching Q4 2026. Register interest via quote request.",
  },
  {
    slug: "malawi",
    name: "Malawi",
    countryCode: "MW",
    status: "coming-soon",
    cities: ["Lilongwe", "Blantyre"],
    logisticsNotes: "Coverage launching Q4 2026. Register interest via quote request.",
  },
];

export const solutions: Solution[] = [
  {
    slug: "enterprise",
    eyebrow: "Enterprise",
    headline: "Technology procurement that meets enterprise standards.",
    subCopy:
      "Compliance documentation, SLA-backed delivery, and dedicated account management for large-scale deployments.",
    painPoints: [
      "Compliance burden across multiple jurisdictions",
      "Warranty gaps from grey market suppliers",
      "Volume pricing difficult to negotiate at regional scale",
      "Support disappears after delivery",
    ],
    valueProps: [
      {
        title: "SLA-backed delivery",
        description: "Committed timelines with status updates at every logistics stage.",
        icon: "Clock",
      },
      {
        title: "Compliance documentation packs",
        description: "Full OEM certificates, import documentation, and audit-ready records.",
        icon: "FileCheck",
      },
      {
        title: "Dedicated account management",
        description: "A single point of contact from quote through delivery and support.",
        icon: "UserCheck",
      },
      {
        title: "Multi-year support agreements",
        description: "Extended warranty and maintenance options aligned to your refresh cycles.",
        icon: "Shield",
      },
    ],
    relatedCategories: ["end-user-devices", "server-and-storage", "networking-and-infrastructure"],
  },
  {
    slug: "sme",
    eyebrow: "SME",
    headline: "Business-grade technology without enterprise complexity.",
    subCopy:
      "Volume pricing at SME quantities, manufacturer warranty on every item, and a single supplier relationship.",
    painPoints: [
      "Paying retail prices for small volumes",
      "Unreliable local suppliers with inconsistent stock",
      "No confidence in warranty validity",
      "Grey market risk on discounted hardware",
    ],
    valueProps: [
      {
        title: "Volume pricing at SME quantities",
        description: "Access distributor pricing without enterprise minimum order requirements.",
        icon: "Tag",
      },
      {
        title: "Manufacturer warranty on everything",
        description: "Every product sourced through authorised channels with valid OEM warranty.",
        icon: "Shield",
      },
      {
        title: "Single point of contact",
        description: "One supplier for devices, networking, and infrastructure. No chasing multiple vendors.",
        icon: "Users",
      },
      {
        title: "Flexible payment terms",
        description: "Payment options aligned to your cash flow, subject to credit approval.",
        icon: "CreditCard",
      },
    ],
    relatedCategories: ["end-user-devices", "networking-and-infrastructure"],
  },
  {
    slug: "ngo",
    eyebrow: "NGO",
    headline: "Technology procurement that satisfies donor requirements.",
    subCopy:
      "Transparent pricing, audit-ready documentation, and delivery schedules aligned to project milestones.",
    painPoints: [
      "Audit trail requirements from donors and auditors",
      "Value-for-money evidence needed for every purchase",
      "Tight project timelines with no room for delays",
      "Unfamiliar local supplier landscape",
    ],
    valueProps: [
      {
        title: "Transparent pricing with full documentation",
        description: "Itemised quotes with OEM part numbers, distributor references, and landed cost breakdown.",
        icon: "FileText",
      },
      {
        title: "Audit-ready procurement packs",
        description: "Invoices, delivery notes, warranty certificates, and import documentation in one package.",
        icon: "ClipboardCheck",
      },
      {
        title: "Grant-compliant invoicing",
        description: "Invoicing structured to match grant reporting and donor audit requirements.",
        icon: "Receipt",
      },
      {
        title: "Project-aligned delivery schedules",
        description: "Staged delivery matched to implementation phases and site readiness.",
        icon: "Calendar",
      },
    ],
    relatedCategories: ["end-user-devices", "networking-and-infrastructure", "server-and-storage"],
  },
  {
    slug: "government",
    eyebrow: "Government",
    headline: "Infrastructure procurement for public sector modernisation.",
    subCopy:
      "Tender-ready documentation, BBBEE-aligned partnerships, and long-term maintenance agreements.",
    painPoints: [
      "Tender compliance and documentation requirements",
      "Local content and empowerment obligations",
      "Long-term support commitments beyond warranty",
      "Budget cycles requiring staged procurement",
    ],
    valueProps: [
      {
        title: "Tender-ready documentation",
        description: "OEM authorisation letters, compliance certificates, and specification sheets for RFQ responses.",
        icon: "FileCheck",
      },
      {
        title: "BBBEE-aligned partnerships",
        description: "South African delivery through empowerment-aligned local partner relationships.",
        icon: "Handshake",
      },
      {
        title: "Long-term maintenance agreements",
        description: "Extended support and maintenance contracts beyond standard warranty periods.",
        icon: "Wrench",
      },
      {
        title: "Staged delivery aligned to budget release",
        description: "Phased procurement matched to financial year and budget approval timelines.",
        icon: "Layers",
      },
    ],
    relatedCategories: ["server-and-storage", "networking-and-infrastructure", "end-user-devices"],
  },
];

export const oemLogos = ["Dell", "Lenovo", "HP", "Cisco", "Ubiquiti"];

export const trustSignals = [
  { label: "European sourced", icon: "Flag" },
  { label: "Full manufacturer warranty", icon: "Shield" },
  { label: "Compliance documentation", icon: "FileCheck" },
  { label: "In-region support", icon: "MapPin" },
  { label: "Volume pricing", icon: "Tag" },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: "Tell us what you need",
    description:
      "Submit a quote request with your requirements, volumes, and delivery location.",
  },
  {
    step: 2,
    title: "We source and price it",
    description:
      "We source from authorised European distributors and return a competitive quote within 48 hours.",
  },
  {
    step: 3,
    title: "We deliver and support",
    description:
      "We handle logistics, customs, and delivery. Our in-region partners provide installation and ongoing support.",
  },
];
