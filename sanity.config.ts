import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "gokulnath-portfolio",
  title: "Gokulnath Portfolio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Design Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("Design Projects")),
            S.listItem()
              .title("Photography")
              .schemaType("photography")
              .child(S.documentTypeList("photography").title("Photography")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});