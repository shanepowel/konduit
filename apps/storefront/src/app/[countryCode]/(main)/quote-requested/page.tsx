import { EMPTY_STATES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function QuoteRequestedPage() {
  return (
    <div className="content-container max-w-xl py-20">
      <span className="tag tag-accent">Business quote</span>
      <h1 className="mt-4 text-3xl">Quote request sent</h1>
      <p className="mt-4 text-base leading-relaxed opacity-80">
        {EMPTY_STATES.quoteSubmitted}
      </p>
      <p className="mt-3 text-sm opacity-70">
        No payment was taken. A draft request was created for our team to price.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LocalizedClientLink href="/" className="btn btn-secondary">
          Back to store
        </LocalizedClientLink>
        <LocalizedClientLink href="/track" className="btn btn-primary">
          Track an order
        </LocalizedClientLink>
      </div>
    </div>
  )
}
