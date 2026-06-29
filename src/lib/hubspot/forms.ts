import { Client } from "@hubspot/api-client";

let hubspot: Client | null = null;

export function getHubspotClient() {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) return null;
  if (!hubspot) {
    hubspot = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
  }
  return hubspot;
}

export type QuotePayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  categories: string[];
  quantity?: string;
  details?: string;
  source?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type PartnerPayload = {
  company: string;
  country: string;
  services: string;
  teamSize: string;
  certifications?: string;
  notes?: string;
  email: string;
  name: string;
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstname = parts[0] || "";
  const lastname = parts.slice(1).join(" ") || "";
  return { firstname, lastname };
}

export async function submitQuoteToHubspot(payload: QuotePayload) {
  const client = getHubspotClient();
  if (!client) return;

  const { firstname, lastname } = splitName(payload.name);
  await client.crm.contacts.basicApi.create({
    properties: {
      email: payload.email,
      firstname,
      lastname,
      company: payload.company,
      phone: payload.phone,
      lifecyclestage: "lead",
      lead_source: "Konduit Website",
      hs_lead_status: "NEW",
      country: payload.country,
      message: [
        `Product categories: ${payload.categories.join(", ")}`,
        payload.quantity ? `Estimated quantity: ${payload.quantity}` : "",
        payload.details ? `Details: ${payload.details}` : "",
        payload.source ? `Source: ${payload.source}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  });
}

export async function submitContactToHubspot(payload: ContactPayload) {
  const client = getHubspotClient();
  if (!client) return;

  const { firstname, lastname } = splitName(payload.name);
  await client.crm.contacts.basicApi.create({
    properties: {
      email: payload.email,
      firstname,
      lastname,
      lifecyclestage: "lead",
      lead_source: "Konduit Website",
      message: payload.message,
    },
  });
}

export async function submitPartnerToHubspot(payload: PartnerPayload) {
  const client = getHubspotClient();
  if (!client) return;

  const { firstname, lastname } = splitName(payload.name);
  await client.crm.contacts.basicApi.create({
    properties: {
      email: payload.email,
      firstname,
      lastname,
      company: payload.company,
      lifecyclestage: "lead",
      lead_source: "Konduit Partner Application",
      country: payload.country,
      message: [
        `Services: ${payload.services}`,
        `Team size: ${payload.teamSize}`,
        payload.certifications ? `Certifications: ${payload.certifications}` : "",
        payload.notes ? `Notes: ${payload.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  });
}
