// Sanity Schema Types
// Note: TypeScript types may show errors but the schema is valid for Sanity

export const projectSchema = {
  name: "project",
  title: "Design Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "client", title: "Client", type: "string" },
    { name: "category", title: "Category", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "scope", title: "Scope", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "cover", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "assets", title: "Project Assets", type: "array", of: [{ type: "image" }] },
  ],
};

export const mediaAssetSchema = {
  name: "mediaAsset",
  title: "Media Asset",
  type: "object",
  fields: [
    { name: "filename", title: "Filename", type: "string" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "width", title: "Width", type: "number" },
    { name: "height", title: "Height", type: "number" },
    { name: "alt", title: "Alt Text", type: "string" },
    { name: "type", title: "Type", type: "string" },
  ],
};

export const photographySchema = {
  name: "photography",
  title: "Photography Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "category", title: "Category", type: "string" },
    { name: "cover", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "assets", title: "Gallery Assets", type: "array", of: [{ type: "image" }] },
  ],
};

export const schemaTypes = [projectSchema, mediaAssetSchema, photographySchema];