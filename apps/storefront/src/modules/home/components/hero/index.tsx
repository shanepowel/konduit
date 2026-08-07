import { BRAND } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative py-16 small:py-16">
      <span className="tag tag-accent-2 mb-5 kn-fade-up">{BRAND.eyebrow}</span>
      <h1 className="mb-5 max-w-[16ch] text-[clamp(36px,5vw,58px)] leading-[1.08] kn-fade-up kn-fade-up-delay-1">
        {BRAND.headline}
      </h1>
      <p className="mb-7 max-w-[56ch] text-[17px] leading-relaxed opacity-85 kn-fade-up kn-fade-up-delay-2">
        {BRAND.subhead}
      </p>
      <div className="flex flex-wrap gap-3 kn-fade-up kn-fade-up-delay-3">
        <LocalizedClientLink href="/quote" className="btn btn-primary">
          {BRAND.primaryCta}
        </LocalizedClientLink>
        <LocalizedClientLink href="/store" className="btn btn-secondary">
          {BRAND.secondaryCta}
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
