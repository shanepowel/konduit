import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Provisional B2B list prices (USD). ZWG ≈ USD × 28 (adjust in admin).
 * Sourced from previous Konduit site OEM lines — real SKUs, not placeholders.
 */
const ZWG_RATE = 28;

type SeedProduct = {
  title: string;
  handle: string;
  sku: string;
  manufacturer: string;
  /** Supplier market shown on catalogue / PDP tags. */
  supplier_origin: "UK" | "USA" | "China" | "Zimbabwe";
  description: string;
  category: string;
  usd: number;
  stock: number;
  delivery_window_days: number;
  sourcing_type: "in_stock" | "pre_order" | "quote_only";
};

const PRODUCTS: SeedProduct[] = [
  {
    title: "ThinkPad T14 Gen 5",
    handle: "lenovo-thinkpad-t14-gen-5",
    sku: "21ML000EUK",
    manufacturer: "Lenovo",
    supplier_origin: "UK",
    description:
      "Business laptop with Intel Core Ultra 7, 32 GB DDR5, 1 TB NVMe SSD.",
    category: "Infrastructure",
    usd: 1899,
    stock: 12,
    delivery_window_days: 7,
    sourcing_type: "in_stock",
  },
  {
    title: "OptiPlex 7020 Tower",
    handle: "dell-optiplex-7020-tower",
    sku: "7020-TWR-I7",
    manufacturer: "Dell",
    supplier_origin: "USA",
    description: "Desktop tower with Intel Core i7, 16 GB DDR5, 512 GB SSD.",
    category: "Infrastructure",
    usd: 1299,
    stock: 0,
    delivery_window_days: 12,
    sourcing_type: "pre_order",
  },
  {
    title: "Catalyst 9200L 24-port Switch",
    handle: "cisco-catalyst-9200l-24p",
    sku: "C9200L-24P-4G-E",
    manufacturer: "Cisco",
    supplier_origin: "USA",
    description: "24 x 1GbE PoE+ switch with 4 x 1G SFP uplinks, StackWise-160.",
    category: "Infrastructure",
    usd: 2499,
    stock: 0,
    delivery_window_days: 14,
    sourcing_type: "pre_order",
  },
  {
    title: "UniFi U6 Pro Access Point",
    handle: "ubiquiti-unifi-u6-pro",
    sku: "U6-Pro",
    manufacturer: "Ubiquiti",
    supplier_origin: "UK",
    description: "Wi-Fi 6 access point, 5.3 Gbps aggregate, ceiling or wall mount.",
    category: "Telecoms Devices",
    usd: 179,
    stock: 25,
    delivery_window_days: 5,
    sourcing_type: "in_stock",
  },
  {
    title: "PowerEdge R740 Rack Server",
    handle: "dell-poweredge-r740",
    sku: "R740-BASE",
    manufacturer: "Dell",
    supplier_origin: "USA",
    description:
      "2U rack server, dual Intel Xeon Scalable, up to 24 x 2.5\" drives.",
    category: "Infrastructure",
    usd: 4899,
    stock: 0,
    delivery_window_days: 21,
    sourcing_type: "pre_order",
  },
  {
    title: "HPE MSA 2060 Storage",
    handle: "hpe-msa-2060",
    sku: "R0Q85A",
    manufacturer: "HPE",
    supplier_origin: "USA",
    description: "Hybrid storage array up to 336 TB, iSCSI/FC/SAS, dual controllers.",
    category: "Infrastructure",
    usd: 6599,
    stock: 0,
    delivery_window_days: 21,
    sourcing_type: "pre_order",
  },
  {
    title: "Site Survey & Network Design",
    handle: "telecoms-site-survey",
    sku: "TEL-SURVEY-001",
    manufacturer: "Konduit",
    supplier_origin: "Zimbabwe",
    description:
      "On-site survey and network design for campus or multi-site deployments. Quote-based.",
    category: "Telecoms Infrastructure Services",
    usd: 0,
    stock: 0,
    delivery_window_days: 14,
    sourcing_type: "quote_only",
  },
  {
    title: "Business Router Kit (Imports)",
    handle: "imports-business-router-kit",
    sku: "IMP-RTR-KIT-01",
    manufacturer: "Curated",
    supplier_origin: "China",
    description:
      "Curated import router kit for SME branches. Delivery window applies from order confirmation.",
    category: "Imports",
    usd: 449,
    stock: 8,
    delivery_window_days: 21,
    sourcing_type: "in_stock",
  },
];

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  const countries = ["zw"];

  logger.info("Seeding Konduit store data...");
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Konduit Storefront",
          description: "Primary Konduit marketplace channel",
        },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Konduit Storefront Publishable Key",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  });

  const {
    result: [store],
  } = await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Konduit",
          supported_currencies: [
            { currency_code: "usd", is_default: true },
            { currency_code: "zwg", is_default: false },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  });

  logger.info(`Store created: ${store.id}`);
  logger.info(`Publishable API key: ${publishableApiKey.token}`);

  const paymentProviders = process.env.PAYNOW_INTEGRATION_ID
    ? ["pp_paynow_paynow", "pp_system_default"]
    : ["pp_system_default"];

  logger.info("Seeding Zimbabwe regions (USD + ZWG)...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Zimbabwe (USD)",
          currency_code: "usd",
          countries,
          payment_providers: paymentProviders,
        },
      ],
    },
  });
  const usdRegion = regionResult[0];

  // Second region: ZWG — country already on USD region, so create without countries
  // and rely on storefront region selection by currency. Medusa allows one country
  // per region mapping; we keep ZW on USD and expose ZWG region for pricing.
  const { result: zwgRegionResult } = await createRegionsWorkflow(container).run(
    {
      input: {
        regions: [
          {
            name: "Zimbabwe (ZWG)",
            currency_code: "zwg",
            countries: [],
            payment_providers: paymentProviders,
          },
        ],
      },
    }
  );
  const zwgRegion = zwgRegionResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_region_id: usdRegion.id,
      },
    },
  });

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });

  logger.info("Seeding Harare stock location...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Harare Warehouse",
          address: {
            city: "Harare",
            country_code: "ZW",
            address_1: "Konduit Fulfilment",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Zimbabwe delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Zimbabwe",
        geo_zones: [
          {
            country_code: "zw",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Delivery within the product delivery window.",
          code: "standard",
        },
        prices: [
          { currency_code: "usd", amount: 25 },
          { currency_code: "zwg", amount: 25 * ZWG_RATE },
          { region_id: usdRegion.id, amount: 25 },
          { region_id: zwgRegion.id, amount: 25 * ZWG_RATE },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel.id],
    },
  });

  logger.info("Seeding product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Infrastructure",
          handle: "infrastructure",
          is_active: true,
          description:
            "Servers, networking, structured cabling, and end-user devices.",
        },
        {
          name: "Telecoms",
          handle: "telecoms",
          is_active: true,
          description: "Telecoms infrastructure services and devices.",
        },
        {
          name: "Telecoms Infrastructure Services",
          handle: "telecoms-infrastructure-services",
          is_active: true,
          description: "Network installs, maintenance contracts, site surveys.",
          parent_category_id: undefined as unknown as string,
        },
        {
          name: "Telecoms Devices",
          handle: "telecoms-devices",
          is_active: true,
          description: "Routers, radios, VSAT kit, business mobile devices.",
        },
        {
          name: "Imports",
          handle: "imports",
          is_active: true,
          description: "Curated marketplace goods with delivery windows.",
        },
      ],
    },
  });

  const catByName = Object.fromEntries(
    categoryResult.map((c) => [c.name, c.id])
  );

  // Nest telecoms children under Telecoms if API supports update — parent set via second pass
  const productModule = container.resolve(Modules.PRODUCT);
  const telecomsId = catByName["Telecoms"];
  if (telecomsId) {
    for (const child of [
      "Telecoms Infrastructure Services",
      "Telecoms Devices",
    ]) {
      const childId = catByName[child];
      if (childId) {
        await productModule.updateProductCategories(childId, {
          parent_category_id: telecomsId,
        });
      }
    }
  }

  logger.info("Seeding Konduit OEM catalog...");
  const productsInput = PRODUCTS.map((p) => {
    const prices =
      p.sourcing_type === "quote_only"
        ? []
        : [
            { amount: p.usd, currency_code: "usd" },
            { amount: Math.round(p.usd * ZWG_RATE), currency_code: "zwg" },
          ];

    return {
      title: p.title,
      handle: p.handle,
      description: p.description,
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfile.id,
      category_ids: [catByName[p.category]].filter(Boolean),
      metadata: {
        manufacturer: p.manufacturer,
        supplier_origin: p.supplier_origin,
        delivery_window_days: p.delivery_window_days,
        sourcing_type: p.sourcing_type,
      },
      options: [{ title: "Default", values: ["Default"] }],
      variants: [
        {
          title: "Default",
          sku: p.sku,
          options: { Default: "Default" },
          manage_inventory: p.sourcing_type !== "quote_only",
          prices:
            prices.length > 0
              ? prices
              : [
                  // Draft price for quote-only so admin can still reference; storefront hides buy-now
                  { amount: 0, currency_code: "usd" },
                  { amount: 0, currency_code: "zwg" },
                ],
        },
      ],
      sales_channels: [{ id: defaultSalesChannel.id }],
    };
  });

  const { result: createdProducts } = await createProductsWorkflow(
    container
  ).run({
    input: { products: productsInput },
  });

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  });

  const levels = inventoryItems
    .map((item) => {
      const product = PRODUCTS.find((p) => p.sku === item.sku);
      if (!product || product.sourcing_type === "quote_only") {
        return null;
      }
      return {
        location_id: stockLocation.id,
        stocked_quantity: product.stock,
        inventory_item_id: item.id,
      };
    })
    .filter(Boolean) as {
    location_id: string;
    stocked_quantity: number;
    inventory_item_id: string;
  }[];

  if (levels.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: { inventory_levels: levels },
    });
  }

  logger.info(
    `Finished Konduit seed. Products: ${createdProducts.length}. Regions: ${usdRegion.name}, ${zwgRegion.name}. Publishable key: ${publishableApiKey.token}`
  );
}
