import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "konduit",
  title: "Konduit",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
