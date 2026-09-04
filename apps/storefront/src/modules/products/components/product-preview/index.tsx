import { listProducts } from "@lib/data/products"
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
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  let pricedProduct = product
  let { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  if (!cheapestPrice && product.id && region?.id) {
    const fetched = await listProducts({
      regionId: region.id,
      queryParams: {
        id: [product.id],
        fields: "*variants.calculated_price,+metadata,*categories",
      },
    }).then(({ response }) => response.products[0])

    if (fetched) {
      pricedProduct = fetched
      cheapestPrice = getProductPrice({ product: pricedProduct }).cheapestPrice
    }
  }

  const categoryLabel = formatCategoryLabel(pricedProduct.categories)
  const deliveryLabel = formatDeliveryLabel(pricedProduct.metadata)
  const origin = getSupplierOrigin(
    pricedProduct.metadata as Record<string, unknown>
  )
  const tag = [categoryLabel, origin ? `${origin} supplier` : null]
    .filter(Boolean)
    .join(" · ")

  return (
    <LocalizedClientLink
      href={`/products/${pricedProduct.handle}`}
      className="group text-[var(--color-text)] no-underline"
    >
      <article data-testid="product-wrapper" className="card elev-sm h-full gap-2 p-4">
        <div className="washed overflow-hidden rounded-2xl">
          <Thumbnail
            thumbnail={pricedProduct.thumbnail}
            images={pricedProduct.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none aspect-[4/3]"
          />
        </div>
        {tag ? <span className="tag tag-accent">{tag}</span> : null}
        <h3 className="card-title text-[15px]" data-testid="product-title">
          {pricedProduct.title}
        </h3>
        <p className="card-body text-[13px]" data-testid="product-price-line">
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
