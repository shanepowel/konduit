import { Metadata } from "next"

import { BRAND } from "@lib/constants/brand"
import { retrieveOrder } from "@lib/data/orders"
import {
  buildDemoTrackSteps,
  buildTrackSteps,
  parseLogisticsStatus,
} from "@lib/util/logistics"
import { getDeliveryWindowDays } from "@lib/util/delivery"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TrackLookup from "@modules/order/components/track-lookup"
import VerticalTrack from "@modules/order/components/vertical-track"

export const metadata: Metadata = {
  title: "Track your order",
  description: "Follow your Konduit order from sourced to Harare.",
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

  const demo = buildDemoTrackSteps()
  const display = trackProps ?? {
    refLabel: demo.ref,
    itemLabel: demo.itemLabel,
    headline: demo.headline,
    progressLabel: demo.progressLabel,
    expectedLabel: demo.expectedLabel,
    steps: demo.steps,
  }

  return (
    <div className="bg-konduit-paper">
      <section className="border-b border-konduit-line py-12 small:py-14">
        <div className="content-container">
          <p className="konduit-eyebrow">
            {trackProps ? `Order #${display.refLabel}` : "Order tracking"}
          </p>
          <h1 className="mt-3.5 font-display text-[34px] tracking-tight text-konduit-ink">
            Track your order
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="content-container max-w-[1080px]">
          <TrackLookup countryCode={countryCode} initialError={lookupError} />

          {!trackProps ? (
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-konduit-copper">
              Example tracking · not a live order
            </p>
          ) : null}

          <VerticalTrack
            refLabel={display.refLabel}
            itemLabel={display.itemLabel}
            headline={display.headline}
            progressLabel={display.progressLabel}
            expectedLabel={display.expectedLabel}
            steps={display.steps}
          />

          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <LocalizedClientLink
              href="/account/orders"
              className="font-semibold text-konduit-blue-deep hover:underline"
            >
              View orders in your account →
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/quote"
              className="font-semibold text-konduit-blue-deep hover:underline"
            >
              Request a business quote →
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}
