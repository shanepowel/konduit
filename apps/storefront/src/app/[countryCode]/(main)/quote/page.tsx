import { Metadata } from "next"

import QuoteForm from "@modules/home/components/quote-form"

export const metadata: Metadata = {
  title: "Request a business quote",
  description:
    "Volume orders, installs, and anything outside the standard catalogue — we'll come back with pricing and a delivery date.",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    product?: string
    title?: string
    category?: string
  }>
}

export default async function QuotePage(props: Props) {
  const { countryCode } = await props.params
  const { product, title, category } = await props.searchParams

  return (
    <div className="bg-konduit-paper">
      <section className="py-14 small:py-20">
        <div className="content-container grid grid-cols-1 items-start gap-12 small:grid-cols-2 small:gap-14">
          <div>
            <p className="konduit-eyebrow">Business quote</p>
            <h1 className="mt-4 font-display text-[26px] tracking-tight text-konduit-ink">
              Request infrastructure pricing
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-konduit-muted">
              For volume orders, installs, or anything outside the standard
              catalogue — tell us what you need and we&apos;ll come back with
              pricing and a delivery date.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Quotes are handled by a person, not auto-generated",
                "You'll hear back within one business day",
                "No obligation — quotes don't create an order",
              ].map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[13px] text-konduit-muted before:absolute before:left-0 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-konduit-copper"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <QuoteForm
            countryCode={countryCode}
            defaultProductId={product}
            defaultProductTitle={title}
            defaultCategory={category}
          />
        </div>
      </section>
    </div>
  )
}
