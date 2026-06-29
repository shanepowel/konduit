import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../../../sanity/env";

let client: SanityClient | null = null;

export function getSanityClient() {
  if (!isSanityConfigured()) return null;
  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return client;
}
