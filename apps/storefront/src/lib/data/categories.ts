import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import {
  OFFLINE_CATEGORIES,
  isStoreBackendDown,
  markStoreBackendDown,
  markStoreBackendUp,
  storeRequestSignal,
} from "./offline-commerce"

function offlineCategoryByHandle(handle: string) {
  return OFFLINE_CATEGORIES.find((category) => category.handle === handle)
}

export const listCategories = async (query?: Record<string, unknown>) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  if (isStoreBackendDown()) {
    return OFFLINE_CATEGORIES
  }

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
        signal: storeRequestSignal(),
      }
    )
    .then(({ product_categories }) => {
      if (!product_categories?.length) {
        return OFFLINE_CATEGORIES
      }
      markStoreBackendUp()
      return product_categories
    })
    .catch(() => {
      markStoreBackendDown()
      return OFFLINE_CATEGORIES
    })
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`
  const fallback = offlineCategoryByHandle(handle)

  if (isStoreBackendDown()) {
    return fallback
  }

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
        cache: "force-cache",
        signal: storeRequestSignal(),
      }
    )
    .then(({ product_categories }) => {
      const category = product_categories?.[0]
      if (category) {
        markStoreBackendUp()
        return category
      }
      return fallback
    })
    .catch(() => {
      markStoreBackendDown()
      return fallback
    })
}
