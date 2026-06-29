import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "./client";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) return null;
  return imageUrlBuilder(client).image(source);
}
