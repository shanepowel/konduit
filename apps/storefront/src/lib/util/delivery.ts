import { BRAND } from "@lib/constants/brand"

export type SourcingType = "in_stock" | "pre_order" | "quote_only"

export function getDeliveryWindowDays(
  metadata?: Record<string, unknown> | null
): number | null {
  const value = metadata?.delivery_window_days
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

export function getSourcingType(
  metadata?: Record<string, unknown> | null
): SourcingType | null {
  const value = metadata?.sourcing_type
  if (
    value === "in_stock" ||
    value === "pre_order" ||
    value === "quote_only"
  ) {
    return value
  }
  return null
}

export function getSupplierOrigin(
  metadata?: Record<string, unknown> | null
): string | null {
  const value = metadata?.supplier_origin ?? metadata?.origin
  if (typeof value === "string" && value.trim()) {
    return value.trim()
  }
  return null
}

/** Short label for product cards / PDP footers. */
export function formatDeliveryLabel(
  metadata?: Record<string, unknown> | null
): string {
  if (getSourcingType(metadata) === "quote_only") {
    return "Quote only"
  }
  const days = getDeliveryWindowDays(metadata)
  if (days == null) {
    return `Up to ${BRAND.defaultDeliveryDays}-day delivery`
  }
  return `${days}-day delivery`
}

/** Longer sentence for product detail copy. */
export function formatDeliveryEta(
  metadata?: Record<string, unknown> | null
): string | null {
  if (getSourcingType(metadata) === "quote_only") {
    return "Quote only. We confirm pricing and a delivery date after your request."
  }
  const days = getDeliveryWindowDays(metadata)
  const origin = getSupplierOrigin(metadata)
  if (days == null) {
    return `Target delivery: up to ${BRAND.defaultDeliveryDays} days, quote to doorstep.`
  }
  const originBit = origin
    ? ` · placed with a ${origin}-based OEM supplier`
    : ""
  return `${days}-day delivery to Harare, on quote confirmation${originBit}`
}

export function formatCategoryLabel(
  categories?: { name?: string | null; handle?: string | null }[] | null
): string | null {
  if (!categories?.length) {
    return null
  }
  const primary = categories[0]
  const name = primary?.name?.trim()
  if (!name) {
    return null
  }
  return name
}
