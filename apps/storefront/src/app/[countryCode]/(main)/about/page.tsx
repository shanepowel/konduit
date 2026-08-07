import { Metadata } from "next"

import { BRANCHES, BRAND } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "About Konduit",
  description: BRAND.tagline,
}

export default function AboutPage() {
  return (
    <div className="content-container py-12 small:py-16">
      <span className="tag tag-outline mb-4">About Konduit</span>
      <h1 className="mb-5 max-w-[18ch] text-[clamp(32px,4vw,48px)]">
        A sourcing company with real branches, not a dropshipping storefront.
      </h1>
      <div className="mb-12 max-w-[64ch] space-y-4 text-[16px] leading-relaxed opacity-85">
        <p>
          Konduit sources technology and telecoms equipment through supplier
          networks in the UK, USA and China. We clear freight through our own
          customs desk, and deliver through branches and hubs across Zimbabwe
          and neighbouring markets.
        </p>
        <p>
          Every request is priced against real supplier quotes and real
          compliance paperwork. Prices you see in the catalogue are indicative.
          Every order is confirmed by quote before it ships.
        </p>
        <p>
          Delivery windows vary by origin and freight route, up to 30 days from
          quote acceptance to doorstep. That is the promise we publish, not a
          marketing guess.
        </p>
      </div>

      <section id="branches" className="scroll-mt-24 pb-16">
        <span className="tag tag-accent mb-3.5">Our branches</span>
        <h2 className="mb-3 text-[28px]">Where we operate from</h2>
        <p className="mb-8 max-w-[56ch] text-[15px] opacity-80">
          Branch addresses marked provisional are awaiting ops confirmation.
          Capability still varies by market the way coverage always has.
        </p>
        <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
          {BRANCHES.map((branch) => {
            const tagClass =
              branch.tagVariant === "sage"
                ? "tag-accent-2"
                : branch.tagVariant === "neutral"
                  ? "tag-neutral"
                  : "tag-accent"
            return (
              <article key={branch.country} className="card elev-sm gap-2 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title text-[18px]">{branch.country}</h3>
                  <span className={`tag ${tagClass}`}>{branch.tag}</span>
                </div>
                <p className="m-0 text-sm opacity-80">
                  {branch.city}
                  {branch.area ? `, ${branch.area}` : ""}
                </p>
                <p className="m-0 text-[13px] opacity-70">{branch.address}</p>
                <p className="m-0 text-[13px] opacity-70">
                  Lines: {branch.lines}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section
        className="rounded-[calc(var(--radius-lg)*1.2)] p-8 small:p-10"
        style={{ background: "var(--color-accent-2-100)" }}
      >
        <h3 className="mb-2 text-[22px]">Ready to specify an order?</h3>
        <p className="mb-5 max-w-[48ch] text-sm opacity-85">
          A quote engineer will check live pricing with our suppliers and return
          priced line items within one business day.
        </p>
        <LocalizedClientLink href="/quote" className="btn btn-primary">
          Request a business quote
        </LocalizedClientLink>
      </section>
    </div>
  )
}
