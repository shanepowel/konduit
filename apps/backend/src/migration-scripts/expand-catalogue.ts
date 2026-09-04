import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"
import { KONDUIT_CATALOG } from "../lib/konduit-catalog"

const ZWG_RATE = 28

/**
 * Upsert the Konduit catalogue on an already-seeded store.
 * Safe to re-run: updates descriptions/specs on known handles and creates missing ones.
 */
export default async function expand_catalogue({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })
  const catByName = Object.fromEntries(
    (categories || []).map((category) => [category.name, category.id])
  )

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  })
  const existingByHandle = new Map(
    (existingProducts || []).map((product) => [product.handle, product.id])
  )

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const salesChannelId = salesChannels?.[0]?.id

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfileId = shippingProfiles?.[0]?.id

  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id"],
  })
  const stockLocationId = stockLocations?.[0]?.id

  if (!salesChannelId || !shippingProfileId) {
    throw new Error(
      "Store is missing a sales channel or shipping profile. Run the initial seed first."
    )
  }

  let updated = 0
  let created = 0

  for (const product of KONDUIT_CATALOG) {
    const categoryIds = product.categories
      .map((name) => catByName[name])
      .filter(Boolean)
    const metadata = {
      manufacturer: product.manufacturer,
      supplier_origin: product.supplier_origin,
      delivery_window_days: product.delivery_window_days,
      sourcing_type: product.sourcing_type,
      specs: product.specs,
    }
    const existingId = existingByHandle.get(product.handle)

    if (existingId) {
      await updateProductsWorkflow(container).run({
        input: {
          selector: { id: existingId },
          update: {
            title: product.title,
            description: product.description,
            metadata,
            category_ids: categoryIds,
          },
        },
      })
      updated += 1
      continue
    }

    const prices =
      product.sourcing_type === "quote_only"
        ? [
            { amount: 0, currency_code: "usd" },
            { amount: 0, currency_code: "zwg" },
          ]
        : [
            { amount: product.usd, currency_code: "usd" },
            { amount: Math.round(product.usd * ZWG_RATE), currency_code: "zwg" },
          ]

    const { result } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: product.title,
            handle: product.handle,
            description: product.description,
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfileId,
            category_ids: categoryIds,
            metadata,
            options: [{ title: "Default", values: ["Default"] }],
            variants: [
              {
                title: "Default",
                sku: product.sku,
                options: { Default: "Default" },
                manage_inventory: product.sourcing_type !== "quote_only",
                prices,
              },
            ],
            sales_channels: [{ id: salesChannelId }],
          },
        ],
      },
    })
    created += result.length

    if (stockLocationId && product.sourcing_type !== "quote_only") {
      const { data: inventoryItems } = await query.graph({
        entity: "inventory_item",
        fields: ["id", "sku"],
        filters: { sku: product.sku },
      })
      const item = inventoryItems?.[0]
      if (item) {
        await createInventoryLevelsWorkflow(container).run({
          input: {
            inventory_levels: [
              {
                location_id: stockLocationId,
                stocked_quantity: product.stock,
                inventory_item_id: item.id,
              },
            ],
          },
        })
      }
    }
  }

  logger.info(
    `Catalogue upsert complete. Updated ${updated}, created ${created}. Total in catalog file: ${KONDUIT_CATALOG.length}.`
  )
}
