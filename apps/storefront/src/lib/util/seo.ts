export function firstMeaningfulLine(text?: string | null): string {
  if (!text) {
    return ""
  }
  const line = text
    .replace(/\r\n/g, "\n")
    .split(/\n+/)
    .map((part) => part.trim())
    .find((part) => part.length > 0)
  return line || ""
}

export function productMetaDescription(
  title: string,
  description?: string | null
): string {
  const line = firstMeaningfulLine(description)
  if (line && line !== title) {
    return line.length > 160 ? `${line.slice(0, 157).trimEnd()}...` : line
  }
  return `${title}. Indicative pricing, confirmed by quote. Sourced for Zimbabwe and Southern Africa.`
}

export function productOgImages(
  product: {
    thumbnail?: string | null
    images?: { url?: string | null }[] | null
  }
): string[] {
  const urls = [
    product.thumbnail,
    ...(product.images || []).map((image) => image.url),
  ].filter((url): url is string => !!url)
  return Array.from(new Set(urls))
}
