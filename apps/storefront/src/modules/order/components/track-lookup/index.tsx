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
    <form onSubmit={onSubmit} className="card elev-sm mb-8 gap-3 p-6 small:p-8">
      <div className="field">
        <label htmlFor="order-id">Order ID</label>
        <div className="flex flex-col gap-3 small:flex-row">
          <input
            id="order-id"
            name="order"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="order_…"
            className="input"
          />
          <button type="submit" className="btn btn-primary shrink-0">
            Track order
          </button>
        </div>
      </div>
      {error ? (
        <p className="m-0 text-[13px]" style={{ color: "var(--color-accent)" }}>
          {error}
        </p>
      ) : (
        <p className="m-0 text-[13px] opacity-70">
          Sign in to see your orders, or paste an order ID from your
          confirmation. Below is an example of how tracking looks in transit.
        </p>
      )}
    </form>
  )
}

export default TrackLookup
