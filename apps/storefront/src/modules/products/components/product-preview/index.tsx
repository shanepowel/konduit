import { getProductPrice } from "@lib/util/get-product-price"
import {
  formatCategoryLabel,
  formatDeliveryLabel,
  getSupplierOrigin,
} from "@lib/util/delivery"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const categoryLabel = formatCategoryLabel(product.categories)
  const deliveryLabel = formatDeliveryLabel(product.metadata)
  const origin = getSupplierOrigin(
    product.metadata as Record<string, unknown>
  )
  const tag = [categoryLabel, origin ? `${origin} supplier` : null]
    .filter(Boolean)
    .join(" · ")

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group text-[var(--color-text)] no-underline"
    >
      <article data-testid="product-wrapper" className="card elev-sm h-full gap-2 p-4">
        <div className="washed overflow-hidden rounded-2xl">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none aspect-[4/3]"
          />
        </div>
        {tag ? <span className="tag tag-accent">{tag}</span> : null}
        <h3 className="card-title text-[15px]" data-testid="product-title">
          {product.title}
        </h3>
        <p className="card-body text-[13px]">
          {cheapestPrice ? (
            <>
              from <PreviewPrice price={cheapestPrice} />
            </>
          ) : (
            "Quote on request"
          )}{" "}
          · {deliveryLabel}
        </p>
      </article>
    </LocalizedClientLink>
  )
}
