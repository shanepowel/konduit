import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Product Name" }),
    defineField({ name: "manufacturer", type: "string", title: "Manufacturer" }),
    defineField({ name: "partNumber", type: "string", title: "Part Number" }),
    defineField({ name: "image", type: "image", title: "Product Image" }),
    defineField({
      name: "specs",
      type: "array",
      title: "Key Specifications",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "availability",
      type: "string",
      title: "Availability",
      options: { list: ["in-stock", "to-order", "coming-soon"] },
    }),
    defineField({ name: "leadTime", type: "string", title: "Typical Lead Time" }),
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "productCategory" }],
    }),
  ],
});
