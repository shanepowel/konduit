import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

const paynowConfigured =
  Boolean(process.env.PAYNOW_INTEGRATION_ID) &&
  Boolean(process.env.PAYNOW_INTEGRATION_KEY);

const redisUrl = process.env.REDIS_URL || "";

const modules: Record<string, unknown>[] = [];

if (redisUrl) {
  modules.push(
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          redisUrl,
        },
      },
    }
  );
}

if (paynowConfigured) {
  modules.push({
    resolve: "@medusajs/medusa/payment",
    options: {
      providers: [
        {
          resolve: "medusa-payment-paynow",
          id: "paynow",
          options: {
            integration_id: process.env.PAYNOW_INTEGRATION_ID,
            integration_key: process.env.PAYNOW_INTEGRATION_KEY,
            result_url:
              process.env.PAYNOW_RESULT_URL ||
              "http://localhost:9000/hooks/payment/paynow_paynow",
            return_url:
              process.env.PAYNOW_RETURN_URL ||
              "http://localhost:8000/api/paynow/return",
            debug: process.env.PAYNOW_DEBUG === "true",
          } satisfies import("medusa-payment-paynow").PluginOptions,
        },
      ],
    },
  });
}

if (process.env.MEILISEARCH_HOST && process.env.MEILISEARCH_API_KEY) {
  modules.push({
    resolve: "@rokmohar/medusa-plugin-meilisearch",
    options: {
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
      },
      settings: {
        products: {
          type: "products",
          enabled: true,
          fields: [
            "id",
            "title",
            "description",
            "handle",
            "variant_sku",
            "thumbnail",
            "metadata",
          ],
          indexSettings: {
            searchableAttributes: ["title", "description", "variant_sku"],
            displayedAttributes: [
              "id",
              "handle",
              "title",
              "description",
              "variant_sku",
              "thumbnail",
              "metadata",
            ],
            filterableAttributes: ["id", "handle"],
          },
          primaryKey: "id",
        },
      },
    },
  });
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: redisUrl || undefined,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules,
});
