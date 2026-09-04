import React from "react"

import {
  formatCategoryLabel,
  formatDeliveryEta,
  getDeliveryWindowDays,
  getSupplierOrigin,
} from "@lib/util/delivery"
import { getProductPrice } from "@lib/util/get-product-price"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { BadgeCheck, PackageCheck, ShieldCheck } from "lucide-react"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

function buildItemTimeline(days: number) {
  const confirmEnd = Math.max(1, Math.round(days * 0.1))
  const freightEnd = Math.max(confirmEnd + 1, Math.round(days * 0.62))
  const customsEnd = Math.max(freightEnd + 1, Math.round(days * 0.86))
  return [
    {
      day: confirmEnd === 1 ? "Day 1" : `Day 1 to ${confirmEnd}`,
      title: "Confirmed with supplier",
      body: "PO placed against channel stock. Build slot reserved.",
    },
    {
      day: `Day ${confirmEnd + 1} to ${freightEnd}`,
      title: "Freighted",
      body: "Air or sea freight to the sub-region, tracked leg by leg on your account.",
    },
    {
      day: `Day ${freightEnd + 1} to ${customsEnd}`,
      title: "Cleared",
      body: "Duties and import permits handled by our customs desk.",
    },
    {
      day: `Day ${days}`,
      title: "Delivered",
      body: "Door-to-door handover. Rack-and-stack available on request.",
      sage: true,
    },
  ]
}

const ProductTemplate = async ({
  product,
  region,
  countryCode,
  images,
}: ProductTemplateProps) => {
  if (!product || !product.id) {
    return notFound()
  }

  const categoryLabel = formatCategoryLabel(product.categories)
  const origin = getSupplierOrigin(
    product.metadata as Record<string, unknown>
  )
  const days =
    getDeliveryWindowDays(product.metadata as Record<string, unknown>) ?? 21
  const eta = formatDeliveryEta(product.metadata as Record<string, unknown>)
  const { cheapestPrice } = getProductPrice({ product })
  const tagBits = [
    categoryLabel,
    origin ? `${origin} supplier` : null,
  ].filter(Boolean)
  const timeline = buildItemTimeline(days)

  return (
    <>
      <div className="content-container py-5 text-[13px] opacity-65">
        <LocalizedClientLink href="/" className="no-underline">
          Home
        </LocalizedClientLink>{" "}
        ·{" "}
        {categoryLabel ? (
          <>
            <LocalizedClientLink
              href={`/categories/${product.categories?.[0]?.handle || "infrastructure"}`}
              className="no-underline"
            >
              {categoryLabel}
            </LocalizedClientLink>{" "}
            ·{" "}
          </>
        ) : null}
        {product.title}
      </div>

      <div
        className="content-container grid grid-cols-1 gap-10 pb-12 small:grid-cols-[5fr_4fr]"
        data-testid="product-container"
      >
        <div className="washed overflow-hidden rounded-[calc(var(--radius-lg)*1.2)]">
          <ImageGallery images={images} />
        </div>

        <div>
          {tagBits.length ? (
            <span className="tag tag-accent mb-3.5">{tagBits.join(" · ")}</span>
          ) : null}
          <h1
            className="mb-2.5 text-[clamp(28px,3.4vw,38px)] leading-[1.12]"
            data-testid="product-title"
          >
            {product.title}
          </h1>
          <div
            className="mb-5 space-y-3 text-[14.5px] leading-relaxed opacity-75"
            data-testid="product-description"
          >
            {(product.description || "")
              .split(/\n{2,}/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="m-0">
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mb-1.5 flex flex-wrap items-baseline gap-3.5">
            <span className="font-heading text-[30px]">
              {cheapestPrice
                ? `from ${cheapestPrice.calculated_price}`
                : "Quote on request"}
            </span>
            <span className="text-[13px] opacity-60">
              {(region.currency_code || "usd").toUpperCase()} · indicative.
              Confirmed by supplier quote
            </span>
          </div>
          {eta ? (
            <p
              className="mb-6 text-[13.5px]"
              style={{ color: "var(--color-accent-700)" }}
              data-testid="product-delivery-window"
            >
              {eta}
            </p>
          ) : null}

          <ProductActionsWrapper id={product.id} region={region} />

          <div className="mt-6 grid grid-cols-1 gap-3 xsmall:grid-cols-3">
            {[
              {
                title: "OEM authorised",
                body: origin
                  ? `Sourced via our ${origin} supplier network`
                  : "Sourced via our supplier network",
                icon: BadgeCheck,
              },
              {
                title: "Warranty terms",
                body: "OEM warranty and compliance docs included",
                icon: ShieldCheck,
              },
              {
                title: "Customs cleared",
                body: "Import duty and permits handled in-house",
                icon: PackageCheck,
              },
            ].map((chip) => {
              const Icon = chip.icon
              return (
                <div
                  key={chip.title}
                  className="card items-center gap-1.5 p-3 text-center"
                >
                  <Icon
                    size={20}
                    strokeWidth={2.75}
                    aria-hidden
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span className="card-title text-[13px]">{chip.title}</span>
                  <span className="card-body text-[11.5px]">{chip.body}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div
        className="content-container border-t py-12"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <h2 className="mb-[18px] text-[22px]">Specification</h2>
        <ProductTabs product={product} />
      </div>

      <div className="content-container pb-12">
        <h2 className="mb-5 text-[22px]">Delivery for this order</h2>
        <div className="grid grid-cols-1 gap-4 small:grid-cols-4">
          {timeline.map((step) => (
            <div
              key={step.title}
              className="pl-3.5"
              style={{
                borderLeft: `3px solid ${
                  step.sage ? "var(--color-accent-2)" : "var(--color-accent)"
                }`,
              }}
            >
              <p className="mb-1.5 text-xs uppercase tracking-[0.06em] opacity-60">
                {step.day}
              </p>
              <p className="mb-1 font-heading text-[17px]">{step.title}</p>
              <p className="m-0 text-[13px] opacity-80">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="content-container pb-14"
        data-testid="related-products-container"
      >
        <h2 className="mb-[18px] text-[22px]">Often quoted together</h2>
        <RelatedProducts product={product} countryCode={countryCode} />
      </div>
    </>
  )
}

export default ProductTemplate
