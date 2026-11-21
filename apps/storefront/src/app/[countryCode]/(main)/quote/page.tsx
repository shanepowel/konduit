import { Metadata } from "next"

import { getCurrencyCode } from "@lib/data/cookies"
import QuoteWizard from "@modules/home/components/quote-wizard"

export const metadata: Metadata = {
  title: "Request a business quote",
  description:
    "Volume orders, installs, and anything outside the standard catalogue. We'll come back with pricing and a delivery date.",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    product?: string
    title?: string
    volume?: string
    qty?: string
  }>
}

export default async function QuotePage(props: Props) {
  const { countryCode } = await props.params
  const { product, title, volume, qty } = await props.searchParams
  const currency = await getCurrencyCode()

  let defaultTitle = title
  if (volume === "1" && title) {
    defaultTitle = `Volume pricing for ${title}`
  } else if (qty && Number(qty) > 1 && title) {
    defaultTitle = `Quote for ${title} (qty ${qty})`
  }

  return (
    <div className="content-container py-10 small:py-14">
      <p className="mb-6 text-sm opacity-65">Business quote request</p>
      <QuoteWizard
        countryCode={countryCode}
        defaultProductId={product}
        defaultProductTitle={defaultTitle}
        defaultCurrency={currency === "zwg" ? "zwg" : "usd"}
      />
    </div>
  )
}
