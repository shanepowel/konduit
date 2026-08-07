"use client"

import { EMPTY_STATES } from "@lib/constants/brand"
import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b pb-6 last:border-none last:pb-0"
            style={{ borderColor: "var(--color-divider)" }}
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="flex w-full flex-col items-start gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="text-2xl">Orders</h2>
      <p className="max-w-md text-base opacity-80">{EMPTY_STATES.noOrders}</p>
      <LocalizedClientLink
        href="/store"
        className="btn btn-primary mt-2"
        data-testid="continue-shopping-button"
      >
        Browse the catalogue
      </LocalizedClientLink>
      <LocalizedClientLink href="/track" className="btn btn-secondary">
        Track an order
      </LocalizedClientLink>
    </div>
  )
}

export default OrderOverview
