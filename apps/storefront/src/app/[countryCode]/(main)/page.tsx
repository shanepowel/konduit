import { Metadata } from "next"

import { BRAND } from "@lib/constants/brand"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getDeliveryWindowDays } from "@lib/util/delivery"
import CatalogueRail from "@modules/home/components/catalogue-rail"
import Hero from "@modules/home/components/hero"
import TrustStrip from "@modules/home/components/trust-strip"
import WaysToBuy from "@modules/home/components/ways-to-buy"

export const metadata: Metadata = {
  title: `Konduit — ${BRAND.headline}`,
  description: BRAND.subhead,
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
      fields: "*variants.calculated_price,+metadata,*categories",
    },
  })

  const deliveryDays =
    products
      .map((product) => getDeliveryWindowDays(product.metadata))
      .find((days) => days != null) ?? BRAND.defaultDeliveryDays

  return (
    <>
      <Hero deliveryDays={deliveryDays} />
      <WaysToBuy />
      <CatalogueRail products={products} region={region} />
      <TrustStrip />
    </>
  )
}
