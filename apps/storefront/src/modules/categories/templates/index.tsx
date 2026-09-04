import { notFound } from "next/navigation"

import { CATEGORY_INTROS } from "@lib/constants/brand"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  const intro =
    (category.handle && CATEGORY_INTROS[category.handle]) ||
    category.description ||
    null

  return (
    <div
      className="content-container flex flex-col py-10 small:flex-row small:items-start"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        data-testid="sort-by-container"
        hideOptionsPicker
      />
      <div className="w-full">
        <div className="mb-4 flex flex-row flex-wrap gap-2 text-sm opacity-65">
          {parents.map((parent) => (
            <span key={parent.id} className="flex items-center gap-2">
              <LocalizedClientLink
                className="no-underline hover:text-[var(--color-accent)]"
                href={`/categories/${parent.handle}`}
              >
                {parent.name}
              </LocalizedClientLink>
              <span>/</span>
            </span>
          ))}
        </div>

        <h1 className="text-3xl tracking-tight" data-testid="category-page-title">
          {category.name}
        </h1>

        {intro && (
          <p className="mb-8 mt-4 max-w-3xl text-base leading-relaxed opacity-80">
            {intro}
          </p>
        )}

        {category.category_children && category.category_children.length > 0 && (
          <div className="mb-8">
            <ul className="flex flex-wrap gap-3">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    href={`/categories/${c.handle}`}
                    className="btn btn-secondary"
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          categoryId={category.id}
          countryCode={countryCode}
          optionValueIds={optionValueIds}
        />
      </div>
    </div>
  )
}
