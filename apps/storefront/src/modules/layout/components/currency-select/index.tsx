"use client"

import { updateCurrency } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useParams, usePathname } from "next/navigation"

type CurrencySelectProps = {
  regions: HttpTypes.StoreRegion[]
  activeCurrency?: string | null
}

const CurrencySelect = ({ regions, activeCurrency }: CurrencySelectProps) => {
  const { countryCode } = useParams() as { countryCode: string }
  const currentPath = usePathname().split(`/${countryCode}`)[1] || ""

  const currencies = Array.from(
    new Map(
      regions
        .filter((r) => r.currency_code)
        .map((r) => [r.currency_code!.toUpperCase(), r])
    ).entries()
  )

  if (currencies.length < 2) {
    return null
  }

  const current = (activeCurrency || currencies[0][0]).toUpperCase()

  return (
    <label className="flex items-center gap-2 text-sm text-konduit-muted">
      <span className="font-mono text-[11px] uppercase tracking-wider">
        Currency
      </span>
      <select
        className="bg-transparent border border-konduit-line rounded-soft px-2 py-1 font-mono text-sm text-konduit-ink focus:outline-none focus:border-konduit-blue"
        value={current}
        onChange={(event) => {
          void updateCurrency(
            event.target.value.toLowerCase(),
            countryCode,
            currentPath
          )
        }}
        data-testid="currency-select"
        aria-label="Select currency"
      >
        {currencies.map(([code]) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CurrencySelect
