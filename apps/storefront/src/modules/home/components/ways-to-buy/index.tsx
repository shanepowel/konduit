import { WAYS_TO_BUY } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const WaysToBuy = () => {
  return (
    <section className="border-t border-konduit-line bg-konduit-paper py-16 small:py-20">
      <div className="content-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display text-[26px] tracking-tight text-konduit-ink">
            Three ways to buy
          </h2>
          <p className="max-w-sm text-sm text-konduit-muted">
            Business supply, telecoms build-out, and imported goods — under one
            delivery promise.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px border border-konduit-line bg-konduit-line small:grid-cols-3">
          {WAYS_TO_BUY.map((card) => (
            <article
              key={card.node}
              className="bg-konduit-paper p-8 transition-colors hover:bg-konduit-raised"
            >
              <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-konduit-copper">
                <span className="h-2 w-2 rounded-full bg-konduit-copper" />
                {card.node}
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-konduit-ink">
                {card.title}
              </h3>
              <p className="mt-3 mb-5 text-sm leading-relaxed text-konduit-muted">
                {card.body}
              </p>
              <LocalizedClientLink
                href={card.href}
                className="text-[13px] font-semibold text-konduit-blue-deep hover:text-konduit-blue"
              >
                {card.cta} →
              </LocalizedClientLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WaysToBuy
