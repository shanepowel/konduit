import { Resend } from "resend";
import { contactEmail } from "@/lib/site";

let resend: Resend | null = null;

export function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendQuoteConfirmation(payload: {
  name: string;
  email: string;
  company: string;
}) {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || `Konduit <${contactEmail}>`,
    to: payload.email,
    subject: "We received your quote request",
    text: [
      `Hi ${payload.name.split(" ")[0] || "there"},`,
      "",
      "Thank you for your quote request. We have received your requirements and will respond within 48 hours.",
      "",
      `Company: ${payload.company}`,
      "",
      "If you need to reach us sooner, reply to this email or contact us on WhatsApp.",
      "",
      "Konduit",
      "Enterprise technology, reliably supplied.",
    ].join("\n"),
  });
}

export async function sendQuoteNotification(payload: {
  name: string;
  email: string;
  company: string;
  country: string;
  categories: string[];
}) {
  const client = getResend();
  if (!client || !process.env.CONTACT_TO_EMAIL) return;

  await client.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || `Konduit <${contactEmail}>`,
    to: process.env.CONTACT_TO_EMAIL,
    subject: `New quote request: ${payload.company}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Country: ${payload.country}`,
      `Categories: ${payload.categories.join(", ")}`,
    ].join("\n"),
  });
}
