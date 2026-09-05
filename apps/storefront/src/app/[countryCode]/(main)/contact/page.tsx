import { Metadata } from "next"

import { COMPANY, BRANCH_DETAILS } from "@lib/constants/company"
import ContactForm from "@modules/home/components/contact-form"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Harare head office, Lusaka and Gaborone delivery hubs, and quote contacts for Konduit Ltd.",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12 small:py-16">
      <div className="mb-12 grid grid-cols-1 gap-10 small:grid-cols-[1fr_1.2fr] small:items-start">
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
              <span className="opacity-60">General enquiries</span>
              <br />
              <a
                href={`mailto:${COMPANY.helloEmail}`}
                className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
              >
                {COMPANY.helloEmail}
              </a>
            </p>
            <p className="m-0">
              <span className="opacity-60">Quotes</span>
              <br />
              <a
                href={`mailto:${COMPANY.quotesEmail}`}
                className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
              >
                {COMPANY.quotesEmail}
              </a>
            </p>
            <p className="m-0">
              <span className="opacity-60">Privacy</span>
              <br />
              <a
                href={`mailto:${COMPANY.privacyEmail}`}
                className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
              >
                {COMPANY.privacyEmail}
              </a>
            </p>
            <p className="m-0 text-[13px] opacity-70">
              {COMPANY.legalName}. Registration number{" "}
              {COMPANY.registrationNumber}. Registered address{" "}
              {COMPANY.registeredAddress}.
            </p>
            <LocalizedClientLink href="/quote" className="btn btn-secondary self-start">
              Request a business quote
            </LocalizedClientLink>
          </div>
        </div>
        <ContactForm />
      </div>

      <section>
        <h2 className="mb-5 text-[26px]">Branches and hubs</h2>
        <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
          {BRANCH_DETAILS.map((branch) => (
            <article key={branch.title} className="card elev-sm gap-2 p-5">
              <h3 className="card-title text-[18px]">{branch.title}</h3>
              <p className="m-0 text-sm opacity-80">{branch.address}</p>
              <p className="m-0 text-[13px] opacity-75">Phone: {branch.phone}</p>
              {branch.whatsapp ? (
                <p className="m-0 text-[13px] opacity-75">
                  WhatsApp:{" "}
                  <a
                    href={branch.whatsapp}
                    className="text-[var(--color-text)] underline"
                  >
                    Message this branch
                  </a>
                </p>
              ) : (
                <p className="m-0 text-[13px] opacity-75">
                  WhatsApp: use {COMPANY.helloEmail} and we will reply on the
                  business line. We will not publish a number we have not
                  confirmed.
                </p>
              )}
              <p className="m-0 text-[13px] opacity-75">Hours: {branch.hours}</p>
              <p className="m-0 text-[13px] opacity-65">{branch.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
