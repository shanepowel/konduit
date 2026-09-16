import { KONDUIT_CATALOG } from "@lib/konduit-catalog"
import { HttpTypes } from "@medusajs/types"

export const OFFLINE_REGION_USD_ID = "offline-usd"
export const OFFLINE_REGION_ZWG_ID = "offline-zwg"
export const ZWG_RATE = 28

const FALLBACK_COUNTRIES: HttpTypes.StoreRegionCountry[] = [
  { iso_2: "zw", display_name: "Zimbabwe", name: "Zimbabwe" },
  { iso_2: "zm", display_name: "Zambia", name: "Zambia" },
  { iso_2: "bw", display_name: "Botswana", name: "Botswana" },
  { iso_2: "mz", display_name: "Mozambique", name: "Mozambique" },
  { iso_2: "za", display_name: "South Africa", name: "South Africa" },
]

export const OFFLINE_REGIONS: HttpTypes.StoreRegion[] = [
  {
    id: OFFLINE_REGION_USD_ID,
    name: "USD",
    currency_code: "usd",
    countries: FALLBACK_COUNTRIES,
  } as HttpTypes.StoreRegion,
  {
    id: OFFLINE_REGION_ZWG_ID,
    name: "ZWG",
    currency_code: "zwg",
    countries: [],
  } as HttpTypes.StoreRegion,
]

export function isOfflineRegionId(regionId?: string | null): boolean {
  return (
    regionId === OFFLINE_REGION_USD_ID || regionId === OFFLINE_REGION_ZWG_ID
  )
}

export function getOfflineRegion(
  idOrCurrency?: string | null
): HttpTypes.StoreRegion {
  const key = (idOrCurrency || "").toLowerCase()
  if (key === OFFLINE_REGION_ZWG_ID || key === "zwg") {
    return OFFLINE_REGIONS[1]
  }
  return OFFLINE_REGIONS[0]
}

export const STORE_REQUEST_TIMEOUT_MS = 3500
const BACKEND_DOWN_RETRY_MS = 30 * 1000

let backendDownUntil = 0

export function storeRequestSignal() {
  return AbortSignal.timeout(STORE_REQUEST_TIMEOUT_MS)
}

export function isStoreBackendDown() {
  return Date.now() < backendDownUntil
}

export function markStoreBackendDown() {
  backendDownUntil = Date.now() + BACKEND_DOWN_RETRY_MS
}

export function markStoreBackendUp() {
  backendDownUntil = 0
}

export function isOfflineProductId(productId?: string | null): boolean {
  return Boolean(productId?.startsWith("offlineprod_"))
}

export function isOfflineCategoryId(categoryId?: string | null): boolean {
  return Boolean(categoryId?.startsWith("offlinecat_"))
}

function categoryId(name: string): string {
  return `offlinecat_${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
}

function categoryHandle(name: string): string {
  const lower = name.toLowerCase()
  if (lower.startsWith("infrastructure")) {
    return "infrastructure"
  }
  if (lower.startsWith("telecoms")) {
    return "telecoms"
  }
  if (lower.startsWith("imports")) {
    return "imports"
  }
  return lower.replace(/[^a-z0-9]+/g, "-")
}

export const OFFLINE_CATEGORIES: HttpTypes.StoreProductCategory[] = [
  {
    id: "offlinecat_infrastructure",
    name: "Infrastructure",
    handle: "infrastructure",
    description:
      "Servers, networking equipment, structured cabling, and end-user devices.",
    category_children: [],
  } as HttpTypes.StoreProductCategory,
  {
    id: "offlinecat_telecoms",
    name: "Telecoms",
    handle: "telecoms",
    description:
      "Site surveys, network installs, routers, radios and business devices.",
    category_children: [],
  } as HttpTypes.StoreProductCategory,
  {
    id: "offlinecat_imports",
    name: "Imports",
    handle: "imports",
    description: "Specified goods sourced internationally and landed in Zimbabwe.",
    category_children: [],
  } as HttpTypes.StoreProductCategory,
]

export function catalogToStoreProduct(
  handleOrId: string,
  currencyCode = "usd"
): HttpTypes.StoreProduct | undefined {
  const handle = handleOrId.startsWith("offlineprod_")
    ? handleOrId.slice("offlineprod_".length)
    : handleOrId
  const item = KONDUIT_CATALOG.find(
    (product) => product.handle === handle || product.sku === handle
  )
  if (!item) {
    return undefined
  }
  return toStoreProduct(item, currencyCode)
}

export function listOfflineStoreProducts(options?: {
  currencyCode?: string
  handle?: string
  ids?: string[]
  categoryId?: string
  limit?: number
  offset?: number
}): { products: HttpTypes.StoreProduct[]; count: number } {
  const currencyCode = options?.currencyCode || "usd"
  let items = KONDUIT_CATALOG

  if (options?.handle) {
    items = items.filter((product) => product.handle === options.handle)
  }

  if (options?.ids?.length) {
    const handles = new Set(
      options.ids.map((id) =>
        id.startsWith("offlineprod_") ? id.slice("offlineprod_".length) : id
      )
    )
    items = items.filter((product) => handles.has(product.handle))
  }

  if (options?.categoryId) {
    const wanted = options.categoryId.replace(/^offlinecat_/, "")
    items = items.filter((product) =>
      product.categories.some((name) => {
        const handle = categoryHandle(name)
        return handle === wanted || name.toLowerCase().includes(wanted)
      })
    )
  }

  const count = items.length
  const offset = options?.offset || 0
  const limit = options?.limit ?? items.length
  const page = items.slice(offset, offset + limit)

  return {
    products: page.map((item) => toStoreProduct(item, currencyCode)),
    count,
  }
}

function toStoreProduct(
  item: (typeof KONDUIT_CATALOG)[number],
  currencyCode: string
): HttpTypes.StoreProduct {
  const amount =
    currencyCode.toLowerCase() === "zwg" ? item.usd * ZWG_RATE : item.usd
  const code = currencyCode.toLowerCase()
  const categories = item.categories.map((name) => ({
    id: categoryId(name),
    name,
    handle: categoryHandle(name),
  })) as HttpTypes.StoreProductCategory[]

  return {
    id: `offlineprod_${item.handle}`,
    title: item.title,
    handle: item.handle,
    description: item.description,
    status: "published",
    thumbnail: null,
    images: [],
    variants: [
      {
        id: `offlinevar_${item.handle}`,
        title: "Default",
        sku: item.sku,
        calculated_price: {
          calculated_amount: amount,
          original_amount: amount,
          currency_code: code,
          calculated_price: {
            price_list_type: "",
          },
        },
      } as HttpTypes.StoreProductVariant,
    ],
    options: [],
    tags: [],
    categories,
    metadata: {
      manufacturer: item.manufacturer,
      supplier_origin: item.supplier_origin,
      delivery_window_days: item.delivery_window_days,
      sourcing_type: item.sourcing_type,
      specs: item.specs,
    },
  } as HttpTypes.StoreProduct
}
