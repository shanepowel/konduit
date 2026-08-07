"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Check } from "lucide-react"
import { FormEvent, useState } from "react"

const ContactForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          phone,
          company,
          message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.message || "Could not send your message.")
      }
      setDone(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="card elev-md gap-3.5 p-8 text-center small:p-10">
        <span
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--color-accent-2-100)" }}
        >
          <Check size={24} strokeWidth={2.75} aria-hidden />
        </span>
        <h2 className="text-[24px]">Message sent.</h2>
        <p className="mx-auto max-w-[42ch] text-[15px] opacity-80">
          Thanks {name.split(" ")[0] || ""}. We received your note at
          hello@konduit.co.zw and will reply within one business day.
        </p>
        <LocalizedClientLink href="/" className="btn btn-primary mt-2 self-center">
          Back to store
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card elev-sm gap-4 p-6 small:p-8">
      <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Work email</label>
          <input
            id="contact-email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="contact-company">Company (optional)</label>
          <input
            id="contact-company"
            className="input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
          />
        </div>
        <div className="field">
          <label htmlFor="contact-phone">Phone (optional)</label>
          <input
            id="contact-phone"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-message">How can we help?</label>
        <textarea
          id="contact-message"
          className="input min-h-[140px] !rounded-[16px] py-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Tell us what you need, the site or branch, and any timing."
        />
      </div>
      {error ? (
        <p className="m-0 text-[13px]" style={{ color: "var(--color-accent)" }}>
          {error}
        </p>
      ) : (
        <p className="m-0 text-[13px] opacity-70">
          Messages go to hello@konduit.co.zw. We aim to reply within one business
          day.
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary self-start"
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}

export default ContactForm
