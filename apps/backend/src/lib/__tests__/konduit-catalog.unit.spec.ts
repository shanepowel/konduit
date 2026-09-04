import { countByTopCategory, KONDUIT_CATALOG } from "../konduit-catalog"

describe("konduit catalog", () => {
  it("has at least 12 products in each top-level category", () => {
    const counts = countByTopCategory()
    expect(counts.Infrastructure).toBeGreaterThanOrEqual(12)
    expect(counts.Telecoms).toBeGreaterThanOrEqual(12)
    expect(counts.Imports).toBeGreaterThanOrEqual(12)
  })

  it("gives every product a real description, specs and origin", () => {
    for (const product of KONDUIT_CATALOG) {
      expect(product.description.split("\n\n").length).toBeGreaterThanOrEqual(2)
      expect(Object.keys(product.specs).length).toBeGreaterThan(0)
      expect(product.supplier_origin).toBeTruthy()
      expect(product.description).not.toMatch(/—/)
      expect(product.title).not.toMatch(/placeholder/i)
    }
  })

  it("uses unique handles and skus", () => {
    const handles = KONDUIT_CATALOG.map((product) => product.handle)
    const skus = KONDUIT_CATALOG.map((product) => product.sku)
    expect(new Set(handles).size).toBe(handles.length)
    expect(new Set(skus).size).toBe(skus.length)
  })
})
