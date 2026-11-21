const DEFAULT_PRODUCT_FIELDS =
  "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,+metadata,+tags,*categories"

/**
 * Always keep priced-variant and category fields, even when a caller passes
 * a narrower `fields` override (for example generateStaticParams uses handle).
 */
export function mergeProductFields(
  override?: string | string[] | null
): string {
  const extra = Array.isArray(override) ? override.join(",") : override || ""
  const parts = new Set<string>()
  for (const chunk of `${DEFAULT_PRODUCT_FIELDS},${extra}`.split(",")) {
    const trimmed = chunk.trim()
    if (trimmed) {
      parts.add(trimmed)
    }
  }
  return Array.from(parts).join(",")
}
