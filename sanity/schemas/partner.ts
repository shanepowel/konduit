import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Partner Name" }),
    defineField({ name: "country", type: "string", title: "Country" }),
    defineField({ name: "countryCode", type: "string", title: "Country Code (ISO)" }),
    defineField({
      name: "type",
      type: "string",
      title: "Partner Type",
      options: { list: ["Installer", "Reseller", "Support"] },
    }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: { list: ["active", "coming-soon"] },
    }),
  ],
});
