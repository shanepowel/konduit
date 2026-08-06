import { Metadata } from "next"

import { BRAND } from "@lib/constants/brand"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import Branches from "@modules/home/components/branches"
import CatalogueRail from "@modules/home/components/catalogue-rail"
import CtaBand from "@modules/home/components/cta-band"
import Hero from "@modules/home/components/hero"
import RouteDiagram from "@modules/home/components/route-diagram"
import TrustStrip from "@modules/home/components/trust-strip"
import WaysToBuy from "@modules/home/components/ways-to-buy"

export const metadata: Metadata = {
  title: `Konduit: ${BRAND.headline.replace(/\.$/, "")}`,
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

  return (
    <div className="content-container">
      <Hero />
      <TrustStrip />
      <WaysToBuy />
      <RouteDiagram />
      <CatalogueRail products={products} region={region} />
      <Branches />
      <CtaBand />
    </div>
  )
}
