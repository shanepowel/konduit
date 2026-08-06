import { EMPTY_STATES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function QuoteRequestedPage() {
  return (
    <div className="content-container max-w-xl py-20">
      <p className="konduit-eyebrow">Business quote</p>
      <h1 className="mt-4 font-display text-3xl tracking-tight text-konduit-ink">
        Quote request sent
      </h1>
      <p className="mt-4 text-base leading-relaxed text-konduit-muted">
        {EMPTY_STATES.quoteSubmitted}
      </p>
      <p className="mt-3 text-sm text-konduit-muted">
        No payment was taken. A draft request was created for our team to price.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 text-[13px] font-semibold text-konduit-blue-deep">
        <LocalizedClientLink href="/" className="hover:underline">
          Back to store →
        </LocalizedClientLink>
        <LocalizedClientLink href="/track" className="hover:underline">
          Track an order →
        </LocalizedClientLink>
      </div>
    </div>
  )
}
