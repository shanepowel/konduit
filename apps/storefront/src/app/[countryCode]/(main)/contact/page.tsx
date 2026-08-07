import { Metadata } from "next"

import { BRAND } from "@lib/constants/brand"
import ContactForm from "@modules/home/components/contact-form"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Contact Konduit",
  description:
    "Message Konduit at hello@konduit.co.zw for sourcing, quotes, delivery and branch support across Zimbabwe and Southern Africa.",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12 small:py-16">
      <div className="mb-10 grid grid-cols-1 gap-10 small:grid-cols-[1fr_1.2fr] small:items-start">
        <div>
          <span className="tag tag-outline mb-4">Contact</span>
          <h1 className="mb-4 max-w-[16ch] text-[clamp(32px,4vw,46px)]">
            Talk to the team that sources, clears and delivers.
          </h1>
          <p className="mb-6 max-w-[48ch] text-[16px] leading-relaxed opacity-80">
            Use the form for general enquiries, branch questions or help with an
            existing order. For volume pricing and specification work, a quote
            request is usually faster.
          </p>
          <div className="flex flex-col gap-3 text-[14.5px]">
            <p className="m-0">
              <span className="opacity-60">Email</span>
              <br />
              <a
                href="mailto:hello@konduit.co.zw"
                className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
              >
                hello@konduit.co.zw
              </a>
            </p>
            <p className="m-0 opacity-80">
              {BRAND.deliveryPromiseLabel}: {BRAND.deliveryPromiseBody}.
            </p>
            <LocalizedClientLink href="/quote" className="btn btn-secondary self-start">
              Request a business quote
            </LocalizedClientLink>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
