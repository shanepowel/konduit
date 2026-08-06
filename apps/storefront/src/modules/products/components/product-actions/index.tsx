"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { getSourcingType } from "@lib/util/delivery"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  const sourcing = getSourcingType(product.metadata)
  const isQuoteOnly = sourcing === "quote_only"

  const goToQuote = (volume?: boolean) => {
    const params = new URLSearchParams({
      product: product.id,
      title: product.title || "Quote request",
    })
    if (volume) {
      params.set("volume", "1")
    }
    if (quantity > 1) {
      params.set("qty", String(quantity))
    }
    router.push(`/${countryCode}/quote?${params.toString()}`)
  }

  return (
    <>
      <div className="flex flex-col gap-y-4" ref={actionsRef}>
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-4">
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              )
            })}
            <Divider />
          </div>
        )}

        <div className="field">
          <label htmlFor="pdp-qty">Quantity</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary px-3.5"
              disabled={!!disabled || quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              id="pdp-qty"
              className="input max-w-[88px] text-center"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const next = Number(e.target.value)
                setQuantity(Number.isFinite(next) && next > 0 ? next : 1)
              }}
              disabled={!!disabled}
            />
            <button
              type="button"
              className="btn btn-secondary px-3.5"
              disabled={!!disabled}
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => goToQuote(false)}
            disabled={!!disabled}
            className="btn btn-primary w-full"
            data-testid="request-quote-button"
          >
            Request a quote for this item
          </button>
          <button
            type="button"
            onClick={() => goToQuote(true)}
            disabled={!!disabled}
            className="btn btn-secondary w-full"
            data-testid="request-volume-pricing-button"
          >
            Request volume pricing
          </button>
          {!isQuoteOnly && inStock && selectedVariant && isValidVariant ? (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!!disabled || isAdding}
              className="btn btn-ghost w-full"
              data-testid="add-product-button"
            >
              {isAdding ? "Adding…" : "Add to cart"}
            </button>
          ) : null}
        </div>

        {!isQuoteOnly && (
          <MobileActions
            product={product}
            variant={selectedVariant}
            options={options}
            updateOptions={setOptionValue}
            inStock={inStock}
            handleAddToCart={handleAddToCart}
            isAdding={isAdding}
            show={!inView}
            optionsDisabled={!!disabled || isAdding}
          />
        )}
      </div>
    </>
  )
}
