"use client"

import { getProductSpecRows } from "@lib/util/product-specs"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const rows = getProductSpecRows(product)

  if (!rows.length) {
    return (
      <p className="text-[14px] opacity-70">
        Specifications for this item are confirmed on the written quote.
      </p>
    )
  }

  return (
    <div className="table-wrap overflow-x-auto">
      <table className="table w-full text-left text-[14px]">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="w-[40%] py-2.5 pr-4 font-medium capitalize opacity-70"
              >
                {row.label}
              </th>
              <td className="py-2.5">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTabs
