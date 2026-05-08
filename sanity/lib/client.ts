import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getProjects() {
  const query = `*[_type == "project"] | order(title asc) {
    "slug": slug.current,
    title,
    client,
    category,
    year,
    scope,
    description,
    "cover": cover {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt,
      type
    },
    "assets": assets[] {
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      alt,
      type
    }
  }`;

  return client.fetch(query);
}

export async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    client,
    category,
    year,
    scope,
    description,
    "cover": cover {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt,
      type
    },
    "assets": assets[] {
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      alt,
      type
    }
  }`;

  return client.fetch(query, { slug });
}

export async function getPhotographyProjects() {
  const query = `*[_type == "photography"] | order(title asc) {
    "slug": slug.current,
    title,
    category,
    "cover": cover {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt
    },
    "assetCount": count(assets)
  }`;

  return client.fetch(query);
}

export async function getPhotographyProject(slug: string) {
  const query = `*[_type == "photography" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    category,
    "cover": cover {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt
    },
    "assets": assets[] {
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      alt,
      type
    }
  }`;

  return client.fetch(query, { slug });
}