import { getProductPrice } from "@lib/util/get-product-price"
import {
  formatCategoryLabel,
  formatDeliveryLabel,
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

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <article
        data-testid="product-wrapper"
        className="flex h-full flex-col border border-konduit-line bg-konduit-raised transition-colors group-hover:border-konduit-ink/30"
      >
        <div className="border-b border-konduit-line bg-konduit-blue/90">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          {categoryLabel && (
            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-konduit-muted">
              {categoryLabel}
            </span>
          )}
          <h3
            className="text-sm font-semibold text-konduit-ink"
            data-testid="product-title"
          >
            {product.title}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-konduit-line pt-3">
            <div className="font-mono text-[15px] font-medium text-konduit-ink">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            <span
              className="font-mono text-[10px] text-konduit-copper"
              data-testid="product-delivery-label"
            >
              {deliveryLabel}
            </span>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
