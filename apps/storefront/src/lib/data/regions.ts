"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions, getCurrencyCode } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  return await sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(() => [])
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return await sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ region }) => region)
}

/**
 * Resolve the active commerce region for a country path segment.
 * Prefer the shopper's currency cookie (USD/ZWG) when that region exists,
 * since ZWG is seeded without a country mapping in Medusa.
 */
export const getRegion = async (countryCode: string) => {
  const regions = await listRegions()

  if (!regions?.length) {
    return null
  }

  const preferredCurrency = await getCurrencyCode()
  if (preferredCurrency) {
    const byCurrency = regions.find(
      (region) => region.currency_code?.toLowerCase() === preferredCurrency
    )
    if (byCurrency) {
      return byCurrency
    }
  }

  const byCountry = regions.find((region) =>
    region.countries?.some((c) => c.iso_2 === countryCode)
  )
  if (byCountry) {
    return byCountry
  }

  return regions[0] ?? null
}
