import { getProductPrice } from "@lib/util/get-product-price"
import { formatDeliveryLabel } from "@lib/util/delivery"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

type CatalogueRailProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

function originTag(product: HttpTypes.StoreProduct): {
  label: string
  variant: "accent" | "accent-2" | "neutral"
} {
  const meta = product.metadata as Record<string, unknown> | null
  const origin = String(meta?.supplier_origin || meta?.origin || "").toLowerCase()
  const cat = product.categories?.[0]?.name || "Catalogue"
  if (origin.includes("uk") || origin.includes("china")) {
    const label = `${cat} · ${origin.includes("china") ? "China" : "UK"} supplier`
    return {
      label,
      variant: origin.includes("china") ? "neutral" : "accent-2",
    }
  }
  if (origin.includes("usa") || origin.includes("us")) {
    return { label: `${cat} · USA supplier`, variant: "accent" }
  }
  return { label: cat, variant: "accent" }
}

const CatalogueRail = ({ products }: CatalogueRailProps) => {
  if (!products?.length) {
    return null
  }

  return (
    <section id="catalogue" className="py-10">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h2 className="mb-1.5 text-[28px]">In the catalogue</h2>
          <p className="m-0 text-[13px] opacity-70">
            Example pricing in USD. Every order is confirmed by quote before it
            ships.
          </p>
        </div>
        <LocalizedClientLink href="/store" className="btn btn-ghost">
          View all →
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-1 gap-4 xsmall:grid-cols-2 small:grid-cols-4">
        {products.slice(0, 4).map((product) => {
          const { cheapestPrice } = getProductPrice({ product })
          const tag = originTag(product)
          const delivery = formatDeliveryLabel(
            product.metadata as Record<string, unknown>
          )
          const tagClass =
            tag.variant === "accent-2"
              ? "tag-accent-2"
              : tag.variant === "neutral"
                ? "tag-neutral"
                : "tag-accent"

          return (
            <LocalizedClientLink
              key={product.id}
              href={`/products/${product.handle}`}
              className="text-[var(--color-text)] no-underline"
            >
              <article className="card elev-sm h-full gap-2 p-4">
                <div className="washed overflow-hidden rounded-2xl">
                  <Thumbnail
                    thumbnail={product.thumbnail}
                    images={product.images}
                    size="full"
                    className="!rounded-none aspect-[4/3]"
                  />
                </div>
                <span className={`tag ${tagClass}`}>{tag.label}</span>
                <p className="card-title text-[15px]">{product.title}</p>
                <p className="card-body text-[13px]">
                  {cheapestPrice
                    ? `from ${cheapestPrice.calculated_price}`
                    : "Quote on request"}{" "}
                  · {delivery} on quote
                </p>
              </article>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}

export default CatalogueRail
