# Upstream sources

Do not reinvent these — clone/install, then extend.

| Source | SHA (cloned) | Role |
|--------|--------------|------|
| [a11rew/medusa-payment-paystack](https://github.com/a11rew/medusa-payment-paystack) | `7adedad2a7c8bc1265a807868567881d476e03e0` | Payment provider module pattern → `packages/medusa-payment-paynow` |
| [paynow/Paynow-NodeJS-SDK](https://github.com/paynow/Paynow-NodeJS-SDK) | `5df9a4af821d577dd27189865224fca0e11a2cb7` | Official `paynow` npm SDK |
| [medusajs/dtc-starter](https://github.com/medusajs/dtc-starter) via `create-medusa-app@2.18.0 --with-nextjs-starter` | (scaffold) | `apps/backend` + `apps/storefront` monorepo |
| [@rokmohar/medusa-plugin-meilisearch](https://www.npmjs.com/package/@rokmohar/medusa-plugin-meilisearch) | npm | Catalog search |

Re-clone references:
```bash
mkdir -p vendor
git clone --depth 1 https://github.com/a11rew/medusa-payment-paystack.git vendor/medusa-payment-paystack
git clone --depth 1 https://github.com/paynow/Paynow-NodeJS-SDK.git vendor/Paynow-NodeJS-SDK
```
