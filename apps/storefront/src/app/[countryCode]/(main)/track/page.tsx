import { Metadata } from "next"

import { BRAND } from "@lib/constants/brand"
import { retrieveOrder } from "@lib/data/orders"
import { buildTrackSteps, parseLogisticsStatus } from "@lib/util/logistics"
import { getDeliveryWindowDays } from "@lib/util/delivery"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TrackLookup from "@modules/order/components/track-lookup"
import VerticalTrack from "@modules/order/components/vertical-track"

export const metadata: Metadata = {
  title: "Track your order",
  description: "Follow your Konduit order from sourced to delivered.",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ order?: string }>
}

function formatRef(order: { display_id?: number | null; id: string }) {
  if (order.display_id != null) {
    return `KD-${order.display_id}`
  }
  return order.id.slice(0, 12).toUpperCase()
}

export default async function TrackOrderPage(props: Props) {
  const { countryCode } = await props.params
  const { order: orderId } = await props.searchParams

  let lookupError: string | null = null
  let trackProps: {
    refLabel: string
    itemLabel: string
    headline: string
    progressLabel: string
    expectedLabel: string
    steps: ReturnType<typeof buildTrackSteps>
  } | null = null

  if (orderId) {
    const order = await retrieveOrder(orderId).catch(() => null)
    if (!order) {
      lookupError =
        "We couldn't find that order. Sign in to view your orders, or check the ID from your confirmation email."
    } else {
      const item = order.items?.[0]
      const days =
        getDeliveryWindowDays(item?.metadata as Record<string, unknown>) ??
        BRAND.defaultDeliveryDays
      const status = parseLogisticsStatus(
        order.metadata as Record<string, unknown>
      )
      const created = order.created_at ? new Date(order.created_at) : new Date()
      const expected = new Date(created)
      expected.setDate(expected.getDate() + days)
      const expectedLabel = `Expected ${expected.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
      const elapsed = Math.min(
        days,
        Math.max(
          1,
          Math.round(
            (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1
        )
      )
      const steps = buildTrackSteps({
        status: status ?? "sourced",
        createdAt: order.created_at,
        expectedLabel,
      })
      trackProps = {
        refLabel: formatRef(order),
        itemLabel: `${(item?.title || "Order").toUpperCase()} · QTY ${
          item?.quantity ?? 1
        }`,
        headline:
          status === "delivered"
            ? "Delivered"
            : status === "customs"
              ? "On its way to Harare"
              : status === "in_transit"
                ? "In transit to Zimbabwe"
                : "Order confirmed",
        progressLabel: `Day ${elapsed} of ${days}`,
        expectedLabel,
        steps,
      }
    }
  }

  return (
    <div>
      <section
        className="border-b py-12 small:py-14"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <div className="content-container">
          <span className="tag tag-outline mb-3">
            {trackProps ? `Order #${trackProps.refLabel}` : "Order tracking"}
          </span>
          <h1 className="mt-2 text-[clamp(28px,4vw,40px)]">Track your order</h1>
          <p className="mt-3 max-w-[48ch] text-[15px] opacity-75">
            Enter the order reference from your confirmation email. We look up
            the live Medusa order and show its freight stage. Delivery windows
            vary by origin, up to {BRAND.defaultDeliveryDays} days.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="content-container max-w-[1080px]">
          <TrackLookup countryCode={countryCode} initialError={lookupError} />

          {trackProps ? (
            <VerticalTrack
              refLabel={trackProps.refLabel}
              itemLabel={trackProps.itemLabel}
              headline={trackProps.headline}
              progressLabel={trackProps.progressLabel}
              expectedLabel={trackProps.expectedLabel}
              steps={trackProps.steps}
            />
          ) : (
            <p className="mb-6 max-w-[52ch] text-[14.5px] opacity-75">
              Tracking appears here after you enter a real order reference. We
              do not show sample shipments.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <LocalizedClientLink
              href="/account/orders"
              className="btn btn-secondary"
            >
              View orders in your account
            </LocalizedClientLink>
            <LocalizedClientLink href="/quote" className="btn btn-primary">
              Request a business quote
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}
