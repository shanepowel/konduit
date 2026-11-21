import { HttpTypes } from "@medusajs/types"

const HIDDEN_META_KEYS = new Set([
  "delivery_window_days",
  "supplier_origin",
  "origin",
  "sourcing_type",
  "specs",
])

const EMPTY_VALUES = new Set(["", "n/a", "na", "n.a.", "null", "undefined", "-"])

export type SpecRow = {
  label: string
  value: string
}

function isEmptyValue(value: unknown): boolean {
  if (value == null) {
    return true
  }
  if (typeof value === "string" && EMPTY_VALUES.has(value.trim().toLowerCase())) {
    return true
  }
  return false
}

function formatSpecLabel(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

function pushRow(rows: SpecRow[], label: string, value: unknown) {
  if (isEmptyValue(value)) {
    return
  }
  const text = String(value).trim()
  if (!text) {
    return
  }
  rows.push({ label, value: text })
}

/**
 * Build the specification table from real product data.
 * Empty Medusa default attributes are omitted. Metadata specs win.
 */
export function getProductSpecRows(
  product: HttpTypes.StoreProduct
): SpecRow[] {
  const rows: SpecRow[] = []
  const metadata = (product.metadata || {}) as Record<string, unknown>

  pushRow(rows, "Manufacturer", metadata.manufacturer)
  pushRow(rows, "Material", product.material)
  pushRow(
    rows,
    "Country of origin",
    product.origin_country || metadata.supplier_origin || metadata.origin
  )
  pushRow(rows, "Type", product.type?.value)
  if (product.weight) {
    pushRow(rows, "Weight", `${product.weight} g`)
  }
  if (product.length && product.width && product.height) {
    pushRow(
      rows,
      "Dimensions",
      `${product.length}L x ${product.width}W x ${product.height}H`
    )
  }

  const specs = metadata.specs
  if (specs && typeof specs === "object" && !Array.isArray(specs)) {
    for (const [key, raw] of Object.entries(specs as Record<string, unknown>)) {
      if (typeof raw === "string" || typeof raw === "number") {
        pushRow(rows, formatSpecLabel(key), raw)
      }
    }
  }

  for (const [key, raw] of Object.entries(metadata)) {
    if (HIDDEN_META_KEYS.has(key) || key === "manufacturer") {
      continue
    }
    if (typeof raw === "string" || typeof raw === "number") {
      pushRow(rows, formatSpecLabel(key), raw)
    }
  }

  return rows
}
