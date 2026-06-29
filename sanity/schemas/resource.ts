import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: { list: ["guide", "case-study", "template", "news"] },
    }),
    defineField({ name: "summary", type: "text", title: "Summary", rows: 3 }),
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({ name: "publishedAt", type: "datetime", title: "Published At" }),
    defineField({ name: "readTime", type: "number", title: "Read Time (minutes)" }),
    defineField({
      name: "relatedCategories",
      type: "array",
      title: "Related Categories",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
    }),
  ],
});
