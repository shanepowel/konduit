import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { HttpTypes } from "@medusajs/types"
import { mergeProductFields } from "../product-fields"
import { getProductSpecRows } from "../product-specs"
import { productMetaDescription } from "../seo"

describe("product spec rows", () => {
  it("hides empty default attributes and expands metadata specs", () => {
    const rows = getProductSpecRows({
      id: "prod_1",
      title: "PowerEdge R740 Rack Server",
      material: null,
      weight: null,
      metadata: {
        manufacturer: "Dell",
        supplier_origin: "USA",
        sourcing_type: "pre_order",
        delivery_window_days: 21,
        specs: {
          processor: "Dual Intel Xeon Scalable (quoted configuration)",
          warranty: "3-year Dell ProSupport, stated on quote",
        },
      },
    } as HttpTypes.StoreProduct)

    assert.equal(
      rows.find((row) => row.value.toLowerCase() === "n/a"),
      undefined
    )
    assert.equal(rows.some((row) => row.label === "Material"), false)
    assert.equal(rows.some((row) => row.label === "Processor"), true)
    assert.equal(rows.some((row) => row.label === "Sourcing Type"), false)
  })
})

describe("product SEO", () => {
  it("uses the first description line and does not append Konduit", () => {
    const description = productMetaDescription(
      "PowerEdge R740 Rack Server",
      "A 2U dual-socket rack server for virtualisation.\n\nIt suits buyers who need Xeon Scalable processors."
    )
    assert.equal(
      description,
      "A 2U dual-socket rack server for virtualisation."
    )
    assert.equal(/\| Konduit/.test(description), false)
  })
})

describe("product fields", () => {
  it("keeps calculated_price when a caller asks only for handle", () => {
    const fields = mergeProductFields("handle")
    assert.match(fields, /\*variants\.calculated_price/)
    assert.match(fields, /handle/)
    assert.match(fields, /\*categories/)
  })
})
