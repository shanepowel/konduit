import { defineField, defineType } from "sanity";

export default defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Category Name" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
    }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({ name: "icon", type: "string", title: "Lucide Icon Name" }),
    defineField({ name: "image", type: "image", title: "Category Image" }),
    defineField({ name: "order", type: "number", title: "Display Order" }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: { list: ["active", "coming-soon"] },
    }),
    defineField({
      name: "products",
      type: "array",
      title: "Representative Products",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});
