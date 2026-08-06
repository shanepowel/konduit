import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

type CatalogueRailProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const CatalogueRail = ({ products, region }: CatalogueRailProps) => {
  if (!products.length) {
    return null
  }

  return (
    <section className="border-t border-konduit-line bg-konduit-paper py-16 small:py-20">
      <div className="content-container">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-[26px] tracking-tight text-konduit-ink">
            In the catalogue
          </h2>
          <LocalizedClientLink
            href="/store"
            className="text-sm font-semibold text-konduit-blue-deep hover:text-konduit-blue"
          >
            View all →
          </LocalizedClientLink>
        </div>
        <ul className="grid grid-cols-2 gap-4 small:grid-cols-4 small:gap-[18px]">
          {products.slice(0, 8).map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CatalogueRail
