"use client"

import { getSupplierOrigin } from "@lib/util/delivery"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const origin = getSupplierOrigin(
    product.metadata as Record<string, unknown>
  )
  const rows: { label: string; value: string }[] = [
    { label: "Material", value: product.material || "n/a" },
    {
      label: "Country of origin",
      value: product.origin_country || origin || "n/a",
    },
    { label: "Type", value: product.type?.value || "n/a" },
    {
      label: "Weight",
      value: product.weight ? `${product.weight} g` : "n/a",
    },
    {
      label: "Dimensions",
      value:
        product.length && product.width && product.height
          ? `${product.length}L x ${product.width}W x ${product.height}H`
          : "n/a",
    },
  ]

  const metadata = (product.metadata || {}) as Record<string, unknown>
  for (const [key, raw] of Object.entries(metadata)) {
    if (
      key === "delivery_window_days" ||
      key === "supplier_origin" ||
      key === "origin" ||
      key === "sourcing_type"
    ) {
      continue
    }
    if (typeof raw === "string" || typeof raw === "number") {
      rows.push({
        label: key.replace(/_/g, " "),
        value: String(raw),
      })
    }
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
