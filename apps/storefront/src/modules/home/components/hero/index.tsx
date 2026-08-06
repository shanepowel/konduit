import { QUOTE_MAILTO } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import RouteDiagram from "@modules/home/components/route-diagram"

type HeroProps = {
  deliveryDays?: number | null
}

const Hero = ({ deliveryDays }: HeroProps) => {
  return (
    <section className="relative overflow-hidden border-b border-konduit-line bg-konduit-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(27,78,140,0.12), transparent 42%), radial-gradient(circle at 88% 8%, rgba(193,98,43,0.10), transparent 36%)",
        }}
      />
      <div className="content-container relative py-16 small:py-24">
        <p className="konduit-eyebrow konduit-fade-up">
          Sourced globally · routed to Zimbabwe
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display text-4xl leading-[1.12] tracking-tight text-konduit-ink small:text-[50px] konduit-fade-up konduit-fade-up-delay-1">
          Order it. It arrives in{" "}
          <span className="text-konduit-blue">two weeks</span>.
        </h1>
        <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-konduit-muted small:text-[17px] konduit-fade-up konduit-fade-up-delay-2">
          Servers and networking gear. Telecoms infrastructure and devices.
          Imported goods you can&apos;t source locally. One account, one delivery
          promise, tracked door to door.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 konduit-fade-up konduit-fade-up-delay-3">
          <LocalizedClientLink
            href="/categories/infrastructure"
            className="inline-flex items-center rounded-soft bg-konduit-blue px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-konduit-blue-deep"
          >
            Browse the catalogue
          </LocalizedClientLink>
          <a
            href={QUOTE_MAILTO}
            className="inline-flex items-center rounded-soft border border-konduit-line bg-transparent px-7 py-3.5 text-[15px] font-semibold text-konduit-ink transition-colors hover:border-konduit-ink"
          >
            Request a business quote
          </a>
        </div>
        <div className="mt-14 max-w-3xl">
          <RouteDiagram deliveryDays={deliveryDays ?? 14} />
        </div>
      </div>
    </section>
  )
}

export default Hero
