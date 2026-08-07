import { notifyHello } from "@lib/email/notify-hello"
import { NextRequest, NextResponse } from "next/server"

type ContactBody = {
  name?: string
  email?: string
  phone?: string
  company?: string
  message?: string
  /** When set, treat as a quote notification rather than a general contact. */
  type?: "contact" | "quote"
  subject?: string
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: NextRequest) {
  let body: ContactBody
  try {
    body = (await req.json()) as ContactBody
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  const name = (body.name || "").trim()
  const email = (body.email || "").trim()
  const phone = (body.phone || "").trim()
  const company = (body.company || "").trim()
  const message = (body.message || "").trim()
  const type = body.type === "quote" ? "quote" : "contact"

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Name, email and message are required." },
      { status: 400 }
    )
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { message: "Enter a valid work email address." },
      { status: 400 }
    )
  }

  if (message.length > 8000) {
    return NextResponse.json(
      { message: "Message is too long." },
      { status: 400 }
    )
  }

  const subject =
    (body.subject || "").trim() ||
    (type === "quote"
      ? `Quote request from ${company || name}`
      : `Website contact from ${name}`)

  const text = [
    type === "quote" ? "New quote request from the Konduit storefront." : "New contact message from the Konduit storefront.",
    "",
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n")

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#201e1d">
      <p>${type === "quote" ? "New quote request" : "New contact message"} from the Konduit storefront.</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
      ${company ? `<strong>Company:</strong> ${escapeHtml(company)}<br/>` : ""}
      <strong>Email:</strong> ${escapeHtml(email)}<br/>
      ${phone ? `<strong>Phone:</strong> ${escapeHtml(phone)}<br/>` : ""}
      </p>
      <p><strong>Message</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;background:#f5ead8;padding:16px;border-radius:12px">${escapeHtml(message)}</pre>
    </div>
  `

  const result = await notifyHello({
    subject,
    text,
    html,
    replyTo: email,
  })

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 502 })
  }

  return NextResponse.json({ ok: true, id: result.id })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
