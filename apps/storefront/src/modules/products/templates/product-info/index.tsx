import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  formatDeliveryEta,
  getSourcingType,
} from "@lib/util/delivery"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const eta = formatDeliveryEta(product.metadata)
  const sourcing = getSourcingType(product.metadata)
  const manufacturer =
    typeof product.metadata?.manufacturer === "string"
      ? product.metadata.manufacturer
      : null

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        {manufacturer && (
          <Text className="text-small-regular text-ui-fg-muted uppercase tracking-wide">
            {manufacturer}
          </Text>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>

        {eta && (
          <Text
            className="text-medium text-ui-fg-base"
            data-testid="product-delivery-window"
          >
            {eta}
          </Text>
        )}

        {sourcing === "quote_only" && (
          <Text className="text-medium text-ui-fg-subtle">
            This item is quote-only. Request pricing — we will create a draft
            order for our team to confirm.
          </Text>
        )}

        {sourcing === "pre_order" && (
          <Text className="text-medium text-ui-fg-subtle">
            Pre-order — stocked after sourcing completes within the delivery
            window above.
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
