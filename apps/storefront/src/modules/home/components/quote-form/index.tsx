"use client"

import { QUOTE_CATEGORIES } from "@lib/constants/brand"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

type QuoteFormProps = {
  countryCode: string
  defaultProductId?: string
  defaultProductTitle?: string
  defaultCategory?: string
}

const QuoteForm = ({
  countryCode,
  defaultProductId,
  defaultProductTitle,
  defaultCategory,
}: QuoteFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const form = new FormData(event.currentTarget)
    const name = String(form.get("name") || "").trim()
    const company = String(form.get("company") || "").trim()
    const phone = String(form.get("phone") || "").trim()
    const email = String(form.get("email") || "").trim()
    const category = String(form.get("category") || "").trim()
    const details = String(form.get("details") || "").trim()

    if (!email.includes("@")) {
      setError("Enter a work email so we can follow up.")
      setIsSubmitting(false)
      return
    }

    const notes = [
      name ? `Name: ${name}` : null,
      category ? `Category: ${category}` : null,
      details || null,
    ]
      .filter(Boolean)
      .join("\n")

    try {
      const backend =
        process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
      const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
      const res = await fetch(`${backend}/store/quote-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": publishableKey,
        },
        body: JSON.stringify({
          email,
          phone: phone || undefined,
          company: company || undefined,
          notes,
          product_id: defaultProductId || undefined,
          product_title: defaultProductTitle || category || "Business quote",
          quantity: 1,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.message || "Quote request failed. Try again.")
        return
      }

      router.push(`/${countryCode}/quote-requested`)
    } catch {
      setError("Could not send quote request. Try again or email us.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-konduit-line bg-konduit-raised p-8"
    >
      <div className="mb-5 grid grid-cols-1 gap-4 small:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted">
            Full name
          </label>
          <input
            name="name"
            required
            placeholder="Jane Moyo"
            className="w-full rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted">
            Company
          </label>
          <input
            name="company"
            placeholder="Moyo Logistics"
            className="w-full rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
          />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 small:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted">
            Phone (WhatsApp)
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+263 77 123 4567"
            className="w-full rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@company.co.zw"
            className="w-full rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted">
          What do you need?
        </label>
        <select
          name="category"
          defaultValue={defaultCategory || QUOTE_CATEGORIES[0]}
          className="w-full rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
        >
          {QUOTE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-konduit-muted">
          Details
        </label>
        <textarea
          name="details"
          required
          defaultValue={
            defaultProductTitle
              ? `Quote for ${defaultProductTitle}`
              : undefined
          }
          placeholder="e.g. 6x rack servers plus install for a new Harare office"
          className="min-h-[90px] w-full resize-y rounded-soft border border-konduit-line bg-konduit-paper px-3.5 py-2.5 text-sm text-konduit-ink outline-none focus:border-konduit-blue focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-konduit-blue"
        />
      </div>

      {error ? (
        <p className="mb-3 text-[13px] text-konduit-copper">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1.5 w-full rounded-soft bg-konduit-blue px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-konduit-blue-deep disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send quote request"}
      </button>
    </form>
  )
}

export default QuoteForm
