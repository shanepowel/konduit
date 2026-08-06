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

export function formatDeliveryEta(
  metadata?: Record<string, unknown> | null
): string | null {
  const days = getDeliveryWindowDays(metadata)
  if (days == null) {
    return null
  }
  return `Typically ships in ${days} business day${days === 1 ? "" : "s"}`
}
