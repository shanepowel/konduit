import "server-only"

import { Resend } from "resend"

export const HELLO_EMAIL = "hello@konduit.co.zw"

type NotifyHelloInput = {
  subject: string
  text: string
  replyTo?: string
  html?: string
}

/**
 * Deliver a storefront message to hello@konduit.co.zw.
 * Prefers Resend when RESEND_API_KEY is set; otherwise posts CONTACT_WEBHOOK_URL.
 */
export async function notifyHello({
  subject,
  text,
  replyTo,
  html,
}: NotifyHelloInput): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
  const to = process.env.CONTACT_TO_EMAIL || HELLO_EMAIL
  const from =
    process.env.RESEND_FROM_EMAIL || `Konduit <${HELLO_EMAIL}>`
  const apiKey = process.env.RESEND_API_KEY

  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      const { data, error } = await resend.emails.send({
        from,
        to: [to],
        subject,
        text,
        html: html || undefined,
        replyTo: replyTo ? [replyTo] : undefined,
      })
      if (error) {
        return { ok: false, error: error.message || "Resend rejected the email" }
      }
      return { ok: true, id: data?.id }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to send email",
      }
    }
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          text,
          replyTo,
          source: "konduit-storefront",
        }),
      })
      if (!res.ok) {
        return { ok: false, error: "Contact webhook rejected the message" }
      }
      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Webhook failed",
      }
    }
  }

  return {
    ok: false,
    error:
      "Email is not configured. Set RESEND_API_KEY (preferred) or CONTACT_WEBHOOK_URL on the storefront.",
  }
}
