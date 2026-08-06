"use client"

import { QUOTE_COUNTRIES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FormEvent, useMemo, useState } from "react"

type FormState = {
  company: string
  contact: string
  email: string
  phone: string
  country: string
  industry: string
  catInfra: boolean
  catTelecoms: boolean
  catImports: boolean
  origin: "no-pref" | "uk-us" | "china"
  spec: string
  budget: string
  city: string
  incoterm: "ddp" | "exw"
  currency: "usd" | "zwg"
  customsHelp: boolean
  productId?: string
  productTitle?: string
}

const STEP_LABELS = ["Company", "Requirements", "Delivery", "Review"] as const

const initialForm = (defaults?: {
  productId?: string
  productTitle?: string
}): FormState => ({
  company: "",
  contact: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  catInfra: false,
  catTelecoms: false,
  catImports: false,
  origin: "no-pref",
  spec: defaults?.productTitle
    ? `Quote for ${defaults.productTitle}`
    : "",
  budget: "",
  city: "",
  incoterm: "ddp",
  currency: "usd",
  customsHelp: false,
  productId: defaults?.productId,
  productTitle: defaults?.productTitle,
})

type QuoteWizardProps = {
  countryCode: string
  defaultProductId?: string
  defaultProductTitle?: string
}

const QuoteWizard = ({
  countryCode,
  defaultProductId,
  defaultProductTitle,
}: QuoteWizardProps) => {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [refNumber, setRefNumber] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [f, setF] = useState<FormState>(() =>
    initialForm({
      productId: defaultProductId,
      productTitle: defaultProductTitle,
    })
  )

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setF((prev) => ({ ...prev, [key]: value }))
  }

  const step1Valid = !!(f.company && f.contact && f.email && f.country)
  const step2Valid = !!((f.catInfra || f.catTelecoms || f.catImports) && f.spec)
  const step3Valid = !!f.city

  const countryLabel =
    QUOTE_COUNTRIES.find((c) => c.value === f.country)?.label || "country not set"
  const categoriesLabel = [
    f.catInfra && "Infrastructure",
    f.catTelecoms && "Telecoms",
    f.catImports && "Imports",
  ]
    .filter(Boolean)
    .join(", ")
  const sourcingLabel =
    f.origin === "uk-us"
      ? "UK / USA suppliers preferred"
      : f.origin === "china"
        ? "China suppliers preferred"
        : "No sourcing preference: best price and lead time"
  const incotermLabel =
    f.incoterm === "exw"
      ? "EXW: self-cleared"
      : "DDP: delivered, duties paid"

  const payload = useMemo(
    () => ({
      company: f.company,
      contact: f.contact,
      email: f.email,
      phone: f.phone,
      country: f.country,
      industry: f.industry,
      categories: [
        f.catInfra && "Infrastructure",
        f.catTelecoms && "Telecoms",
        f.catImports && "Imports",
      ].filter(Boolean),
      origin: f.origin,
      specification: f.spec,
      budget: f.budget,
      city: f.city,
      incoterm: f.incoterm,
      currency: f.currency,
      customsHelp: f.customsHelp,
      product_id: f.productId,
      product_title: f.productTitle,
      source: "konduit-storefront-quote-wizard",
    }),
    [f]
  )

  const submit = async (event?: FormEvent) => {
    event?.preventDefault()
    setError(null)
    setSubmitting(true)

    const notes = [
      `Contact: ${f.contact}`,
      `Industry: ${f.industry || "n/a"}`,
      `Country: ${countryLabel}`,
      `Categories: ${categoriesLabel}`,
      `Origin: ${sourcingLabel}`,
      `Spec: ${f.spec}`,
      f.budget ? `Budget: ${f.budget}` : null,
      `Delivery: ${f.city}`,
      `Incoterm: ${incotermLabel}`,
      `Currency: ${f.currency.toUpperCase()}`,
      f.customsHelp ? "Customs assistance requested" : null,
    ]
      .filter(Boolean)
      .join("\n")

    try {
      // Must be a static NEXT_PUBLIC_ reference for Next.js to inline it.
      const webhook = process.env.NEXT_PUBLIC_QUOTE_WEBHOOK_URL
      if (webhook) {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          throw new Error("Webhook rejected the quote request")
        }
        const data = await res.json().catch(() => ({}))
        setRefNumber(
          data.reference ||
            data.ref ||
            `KQ-${Math.floor(10000 + Math.random() * 89999)}`
        )
      } else {
        const backend =
          process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
        const publishableKey =
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
        const res = await fetch(`${backend}/store/quote-requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": publishableKey,
          },
          body: JSON.stringify({
            email: f.email,
            phone: f.phone || undefined,
            company: f.company || undefined,
            notes,
            product_id: f.productId,
            product_title: f.productTitle || categoriesLabel || "Business quote",
            quantity: 1,
          }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.message || "Quote request failed")
        }
        const data = await res.json().catch(() => ({}))
        setRefNumber(
          data.draft_order_id
            ? `KQ-${String(data.draft_order_id).slice(-5).toUpperCase()}`
            : `KQ-${Math.floor(10000 + Math.random() * 89999)}`
        )
      }
      setDone(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send quote request. Try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="card elev-md mx-auto max-w-[640px] gap-3.5 p-10 text-center">
        <span className="tag tag-accent-2 self-center">
          Reference {refNumber}
        </span>
        <h1 className="mt-2 text-[26px]">Request received.</h1>
        <p className="mx-auto max-w-[48ch] text-[15px] opacity-80">
          A quote engineer is reviewing your specification against current OEM
          stock and freight schedules. Expect priced line items and a firm
          delivery date within one business day, sent to {f.email}.
        </p>
        <div className="mt-3.5 flex flex-wrap justify-center gap-4 text-left">
          <div
            className="pl-3"
            style={{ borderLeft: "3px solid var(--color-accent)" }}
          >
            <p className="mb-1 text-[11px] uppercase tracking-[0.06em] opacity-60">
              Now
            </p>
            <p className="m-0 text-[13.5px]">Specification logged</p>
          </div>
          <div
            className="pl-3"
            style={{ borderLeft: "3px solid var(--color-accent)" }}
          >
            <p className="mb-1 text-[11px] uppercase tracking-[0.06em] opacity-60">
              Within 1 business day
            </p>
            <p className="m-0 text-[13.5px]">Priced quote returned</p>
          </div>
          <div
            className="pl-3"
            style={{ borderLeft: "3px solid var(--color-accent-2)" }}
          >
            <p className="mb-1 text-[11px] uppercase tracking-[0.06em] opacity-60">
              On acceptance
            </p>
            <p className="m-0 text-[13.5px]">
              Delivery clock starts (up to 30 days by origin)
            </p>
          </div>
        </div>
        <LocalizedClientLink
          href="/"
          className="btn btn-primary mt-[18px] self-center"
        >
          Back to Konduit
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (step < 4) {
          if (step === 1 && step1Valid) setStep(2)
          else if (step === 2 && step2Valid) setStep(3)
          else if (step === 3 && step3Valid) setStep(4)
          return
        }
        void submit()
      }}
      className="mx-auto max-w-[800px]"
    >
      <div className="mb-8 flex gap-2">
        {STEP_LABELS.map((label, index) => {
          const active = index + 1 <= step
          return (
            <div key={label} className="flex-1">
              <div
                className="mb-2 h-1 rounded-full"
                style={{
                  background: active
                    ? "var(--color-accent)"
                    : "var(--color-divider)",
                }}
              />
              <p
                className="m-0 text-[11.5px] tracking-[0.04em]"
                style={{
                  color: active ? "var(--color-accent-700)" : "inherit",
                  opacity: active ? 1 : 0.55,
                }}
              >
                {label}
              </p>
            </div>
          )
        })}
      </div>

      {step === 1 && (
        <>
          <h1 className="mb-1.5 text-[26px]">Who&apos;s requesting?</h1>
          <p className="mb-6 text-sm opacity-75">
            Tell us who to route the quote to and where you&apos;re operating
            from.
          </p>
          <div className="mb-3.5 grid grid-cols-1 gap-4 small:grid-cols-2">
            <div className="field">
              <label>Company name</label>
              <input
                className="input"
                value={f.company}
                onChange={(e) => setField("company", e.target.value)}
                placeholder="e.g. Mutare Logistics Pvt Ltd"
                required
              />
            </div>
            <div className="field">
              <label>Contact name</label>
              <input
                className="input"
                value={f.contact}
                onChange={(e) => setField("contact", e.target.value)}
                placeholder="Full name"
                required
              />
            </div>
          </div>
          <div className="mb-3.5 grid grid-cols-1 gap-4 small:grid-cols-2">
            <div className="field">
              <label>Work email</label>
              <input
                className="input"
                type="email"
                value={f.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="you@company.co.zw"
                required
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                className="input"
                value={f.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="+263 ..."
              />
            </div>
          </div>
          <div className="mb-3.5 grid grid-cols-1 gap-4 small:grid-cols-2">
            <div className="field">
              <label>Country of operation</label>
              <select
                className="input"
                value={f.country}
                onChange={(e) => setField("country", e.target.value)}
                required
              >
                <option value="">Select country</option>
                {QUOTE_COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Industry</label>
              <input
                className="input"
                value={f.industry}
                onChange={(e) => setField("industry", e.target.value)}
                placeholder="e.g. Banking, Mining, Telecoms"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!step1Valid}
            >
              Continue →
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="mb-1.5 text-[26px]">What do you need?</h1>
          <p className="mb-6 text-sm opacity-75">
            Pick the lines that apply, then describe the specification: models,
            quantities, or the problem you&apos;re solving.
          </p>
          <div className="mb-[18px] flex flex-wrap gap-2.5">
            {(
              [
                ["catInfra", "Infrastructure"],
                ["catTelecoms", "Telecoms"],
                ["catImports", "Imports"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-surface)] px-4 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)]"
                  checked={f[key]}
                  onChange={() => setField(key, !f[key])}
                />
                {label}
              </label>
            ))}
          </div>
          <div className="field mb-3.5">
            <label>Preferred sourcing origin</label>
            <div className="seg" role="radiogroup">
              {(
                [
                  ["no-pref", "No preference"],
                  ["uk-us", "UK / USA"],
                  ["china", "China"],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="seg-opt">
                  <input
                    type="radio"
                    name="origin"
                    checked={f.origin === value}
                    onChange={() => setField("origin", value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div className="field mb-3.5">
            <label>Specification</label>
            <textarea
              className="input"
              rows={5}
              value={f.spec}
              onChange={(e) => setField("spec", e.target.value)}
              placeholder="e.g. 3× rack servers, dual-socket, 512GB RAM minimum, for a Harare data hall build-out by Q4."
              required
            />
          </div>
          <div className="field">
            <label>Estimated budget (optional)</label>
            <input
              className="input"
              value={f.budget}
              onChange={(e) => setField("budget", e.target.value)}
              placeholder="e.g. $15,000 to $25,000"
            />
          </div>
          <div className="mt-5 flex justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!step2Valid}
            >
              Continue →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="mb-1.5 text-[26px]">Delivery and terms</h1>
          <p className="mb-6 text-sm opacity-75">
            Where it lands, and how you&apos;d like it priced.
          </p>
          <div className="field mb-4">
            <label>Delivery city / site</label>
            <input
              className="input"
              value={f.city}
              onChange={(e) => setField("city", e.target.value)}
              placeholder="e.g. Harare, Msasa warehouse"
              required
            />
          </div>
          <div className="field mb-4">
            <label>Delivery terms</label>
            <div className="seg" role="radiogroup">
              <label className="seg-opt">
                <input
                  type="radio"
                  name="incoterm"
                  checked={f.incoterm === "ddp"}
                  onChange={() => setField("incoterm", "ddp")}
                />
                DDP: delivered, duties paid
              </label>
              <label className="seg-opt">
                <input
                  type="radio"
                  name="incoterm"
                  checked={f.incoterm === "exw"}
                  onChange={() => setField("incoterm", "exw")}
                />
                EXW: I clear my own customs
              </label>
            </div>
          </div>
          <div className="field mb-4">
            <label>Quoting currency</label>
            <div className="seg" role="radiogroup">
              <label className="seg-opt">
                <input
                  type="radio"
                  name="currency"
                  checked={f.currency === "usd"}
                  onChange={() => setField("currency", "usd")}
                />
                USD: preferred
              </label>
              <label className="seg-opt">
                <input
                  type="radio"
                  name="currency"
                  checked={f.currency === "zwg"}
                  onChange={() => setField("currency", "zwg")}
                />
                ZWG on request
              </label>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-[var(--color-accent)]"
              checked={f.customsHelp}
              onChange={() => setField("customsHelp", !f.customsHelp)}
            />
            Assist with import permits and duty calculation
          </label>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(2)}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!step3Valid}
            >
              Review →
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h1 className="mb-1.5 text-[26px]">Review and submit</h1>
          <p className="mb-6 text-sm opacity-75">
            Check the details a quote engineer will work from.
          </p>
          <div className="card mb-5 gap-3.5 p-5">
            <div>
              <span className="card-kicker">Requesting company</span>
              <p className="m-0 mt-0.5 text-[15px]">
                {f.company}, {f.contact}
              </p>
              <p className="m-0 mt-0.5 text-[13px] opacity-70">
                {f.email} · {f.phone || "no phone"} · {countryLabel}
              </p>
            </div>
            <div>
              <span className="card-kicker">Categories</span>
              <p className="m-0 mt-0.5 text-[15px]">{categoriesLabel}</p>
            </div>
            <div>
              <span className="card-kicker">Specification</span>
              <p className="m-0 mt-0.5 text-sm opacity-85">{f.spec}</p>
            </div>
            <div>
              <span className="card-kicker">Sourcing</span>
              <p className="m-0 mt-0.5 text-[15px]">{sourcingLabel}</p>
            </div>
            <div>
              <span className="card-kicker">Delivery</span>
              <p className="m-0 mt-0.5 text-[15px]">
                {f.city} · {incotermLabel} · Priced in{" "}
                {f.currency === "zwg" ? "ZWG (on request)" : "USD"}
              </p>
            </div>
          </div>
          {error ? (
            <p className="mb-3 text-sm" style={{ color: "var(--color-accent-700)" }}>
              {error}
            </p>
          ) : null}
          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(3)}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit quote request"}
            </button>
          </div>
          <p className="mt-4 text-center text-xs opacity-50">
            Storefront: {countryCode}
          </p>
        </>
      )}
    </form>
  )
}

export default QuoteWizard
