import { clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <span
          className="mr-2 line-through opacity-55"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <span
        className={clx({
          "text-[var(--color-accent)]": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </>
  )
}
