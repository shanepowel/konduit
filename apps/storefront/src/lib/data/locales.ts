"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"
import { isStoreBackendDown, storeRequestSignal } from "./offline-commerce"

export type Locale = {
  code: string
  name: string
}

/**
 * Fetches available locales from the backend.
 * Returns null if the endpoint returns 404 (locales not configured).
 */
export const listLocales = async (): Promise<Locale[] | null> => {
  if (isStoreBackendDown()) {
    return null
  }

  const next = {
    ...(await getCacheOptions("locales")),
  }

  return sdk.client
    .fetch<{ locales: Locale[] }>(`/store/locales`, {
      method: "GET",
      next,
      cache: "force-cache",
      signal: storeRequestSignal(),
    })
    .then(({ locales }) => locales)
    .catch(() => null)
}
