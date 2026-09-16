"use server"

import { sdk } from "@lib/config"
import { mergeProductFields } from "@lib/util/product-fields"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import {
  getOfflineRegion,
  isOfflineCategoryId,
  isOfflineRegionId,
  isStoreBackendDown,
  listOfflineStoreProducts,
  markStoreBackendDown,
  markStoreBackendUp,
  storeRequestSignal,
} from "./offline-commerce"
import { getRegion, retrieveRegion } from "./regions"

type ProductListQueryParams = (HttpTypes.FindParams &
  HttpTypes.StoreProductListParams) & {
  options?: string[]
  option_value_id?: string | string[]
}

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: ProductListQueryParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else if (regionId && isOfflineRegionId(regionId)) {
    region = getOfflineRegion(regionId)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    region = getOfflineRegion()
  }

  const rawCategoryId = queryParams?.category_id
  const requestedCategoryId = Array.isArray(rawCategoryId)
    ? rawCategoryId[0]
    : rawCategoryId

  if (
    isOfflineRegionId(region.id) ||
    isStoreBackendDown() ||
    (typeof requestedCategoryId === "string" &&
      isOfflineCategoryId(requestedCategoryId))
  ) {
    return listFromOfflineCatalog({
      region,
      queryParams,
      limit,
      offset,
      pageParam,
    })
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  const { fields: fieldsOverride, ...restQuery } = queryParams || {}

  try {
    const { products, count } = await sdk.client.fetch<{
      products: HttpTypes.StoreProduct[]
      count: number
    }>(`/store/products`, {
      method: "GET",
      query: {
        limit,
        offset,
        region_id: region?.id,
        fields: mergeProductFields(fieldsOverride),
        ...restQuery,
      },
      headers,
      next,
      cache: "force-cache",
      signal: storeRequestSignal(),
    })

    markStoreBackendUp()

    if (!products.length && !queryParams?.collection_id) {
      return listFromOfflineCatalog({
        region,
        queryParams,
        limit,
        offset,
        pageParam,
      })
    }

    const nextPage = count > offset + limit ? pageParam + 1 : null

    return {
      response: {
        products,
        count,
      },
      nextPage: nextPage,
      queryParams,
    }
  } catch {
    markStoreBackendDown()
    return listFromOfflineCatalog({
      region,
      queryParams,
      limit,
      offset,
      pageParam,
    })
  }
}

function listFromOfflineCatalog({
  region,
  queryParams,
  limit,
  offset,
  pageParam,
}: {
  region: HttpTypes.StoreRegion
  queryParams?: ProductListQueryParams
  limit: number
  offset: number
  pageParam: number
}): {
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
} {
  if (queryParams?.collection_id) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
      queryParams,
    }
  }

  const rawIds = queryParams?.id
  const ids = rawIds
    ? Array.isArray(rawIds)
      ? rawIds
      : [rawIds]
    : undefined
  const rawCategoryId = queryParams?.category_id
  const categoryId = Array.isArray(rawCategoryId)
    ? rawCategoryId[0]
    : rawCategoryId

  const { products, count } = listOfflineStoreProducts({
    currencyCode: region.currency_code,
    handle:
      typeof queryParams?.handle === "string" ? queryParams.handle : undefined,
    ids,
    categoryId: typeof categoryId === "string" ? categoryId : undefined,
    limit,
    offset,
  })

  return {
    response: { products, count },
    nextPage: count > offset + limit ? pageParam + 1 : null,
    queryParams,
  }
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
  optionValueIds,
}: {
  page?: number
  queryParams?: ProductListQueryParams
  sortBy?: SortOptions
  countryCode: string
  optionValueIds?: OptionValueIds
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  const limit = queryParams?.limit || 12
  const optionFilters = Array.from(
    new Set((optionValueIds || []).filter(Boolean))
  )

  const {
    response: { products },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      ...(optionFilters.length ? { option_value_id: optionFilters } : {}),
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const filteredCount = products.length

  const nextPage = filteredCount > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count: filteredCount,
    },
    nextPage,
    queryParams,
  }
}
