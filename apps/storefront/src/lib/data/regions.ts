"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions, getCurrencyCode } from "./cookies"
import {
  getOfflineRegion,
  isOfflineRegionId,
  isStoreBackendDown,
  markStoreBackendDown,
  markStoreBackendUp,
  OFFLINE_REGIONS,
  storeRequestSignal,
} from "./offline-commerce"

export const listRegions = async () => {
  if (isStoreBackendDown()) {
    return OFFLINE_REGIONS
  }

  const next = {
    ...(await getCacheOptions("regions")),
  }

  return await sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
      signal: storeRequestSignal(),
    })
    .then(({ regions }) => {
      if (!regions?.length) {
        markStoreBackendDown()
        return OFFLINE_REGIONS
      }
      markStoreBackendUp()
      return regions
    })
    .catch(() => {
      markStoreBackendDown()
      return OFFLINE_REGIONS
    })
}

export const retrieveRegion = async (id: string) => {
  if (isOfflineRegionId(id) || isStoreBackendDown()) {
    return getOfflineRegion(id)
  }

  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return await sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
      signal: storeRequestSignal(),
    })
    .then(({ region }) => region)
    .catch(() => {
      markStoreBackendDown()
      return getOfflineRegion(id)
    })
}

/**
 * Resolve the active commerce region for a country path segment.
 * Prefer the shopper's currency cookie (USD/ZWG) when that region exists,
 * since ZWG is seeded without a country mapping in Medusa.
 */
export const getRegion = async (countryCode: string) => {
  const regions = await listRegions()
  const preferredCurrency = await getCurrencyCode()

  if (!regions?.length) {
    return getOfflineRegion(preferredCurrency)
  }

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

  return regions[0] ?? getOfflineRegion(preferredCurrency)
}
