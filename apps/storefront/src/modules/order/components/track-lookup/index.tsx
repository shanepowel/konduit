"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

type TrackLookupProps = {
  countryCode: string
  initialError?: string | null
}

const TrackLookup = ({ countryCode, initialError }: TrackLookupProps) => {
  const router = useRouter()
  const [orderId, setOrderId] = useState("")
  const [error, setError] = useState(initialError ?? "")

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = orderId.trim()
    if (!trimmed) {
      setError("Enter an order ID from your confirmation email.")
      return
    }
    setError("")
    router.push(`/${countryCode}/track?order=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 border border-konduit-line bg-konduit-raised p-6 small:p-8"
    >
      <label
        htmlFor="order-id"
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted"
      >
        Order ID
      </label>
      <div className="flex flex-col gap-3 small:flex-row">
        <input
          id="order-id"
          name="order"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="order_…"
          className="w-full rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center rounded-soft bg-konduit-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-konduit-blue-deep"
        >
          Track order
        </button>
      </div>
      {error ? (
        <p className="mt-3 text-[13px] text-konduit-copper">{error}</p>
      ) : (
        <p className="mt-3 text-[13px] text-konduit-muted">
          Sign in to see your orders, or paste an order ID from your confirmation.
          Below is an example of how tracking looks in transit.
        </p>
      )}
    </form>
  )
}

export default TrackLookup
