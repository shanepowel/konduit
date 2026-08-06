import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  formatCategoryLabel,
  formatDeliveryEta,
  formatDeliveryLabel,
  getSourcingType,
} from "@lib/util/delivery"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const eta = formatDeliveryEta(product.metadata)
  const deliveryLabel = formatDeliveryLabel(product.metadata)
  const sourcing = getSourcingType(product.metadata)
  const categoryLabel = formatCategoryLabel(product.categories)
  const manufacturer =
    typeof product.metadata?.manufacturer === "string"
      ? product.metadata.manufacturer
      : null

  return (
    <div id="product-info">
      <div className="mx-auto flex flex-col gap-y-4 lg:max-w-[500px]">
        {categoryLabel && (
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-konduit-muted">
            {categoryLabel}
          </span>
        )}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm text-konduit-muted hover:text-konduit-ink"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        {manufacturer && (
          <Text className="text-small-regular uppercase tracking-wide text-konduit-muted">
            {manufacturer}
          </Text>
        )}
        <Heading
          level="h2"
          className="font-display text-3xl leading-10 text-konduit-ink"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <p
          className="font-mono text-sm text-konduit-copper"
          data-testid="product-delivery-label"
        >
          {deliveryLabel}
        </p>

        <Text
          className="text-medium whitespace-pre-line text-konduit-muted"
          data-testid="product-description"
        >
          {product.description}
        </Text>

        {eta && (
          <Text
            className="text-medium text-konduit-ink"
            data-testid="product-delivery-window"
          >
            {eta}
          </Text>
        )}

        {sourcing === "quote_only" && (
          <Text className="text-medium text-konduit-muted">
            This item is quote-only. Request pricing and we will confirm
            availability, price, and a delivery date.
          </Text>
        )}

        {sourcing === "pre_order" && (
          <Text className="text-medium text-konduit-muted">
            Pre-order: sourced within the delivery window above.
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
