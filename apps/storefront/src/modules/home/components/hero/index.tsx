import { BRAND } from "@lib/constants/brand"
import { HERO_WAREHOUSE_IMAGE } from "@lib/product-images"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <div className="relative min-h-[78vh] w-full overflow-hidden">
        <Image
          src={HERO_WAREHOUSE_IMAGE}
          alt="Konduit freight warehouse ready for Southern Africa delivery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, color-mix(in srgb, var(--color-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-bg) 78%, transparent) 42%, color-mix(in srgb, var(--color-bg) 28%, transparent) 100%)",
          }}
        />
        <div className="content-container relative z-10 flex min-h-[78vh] flex-col justify-end pb-14 pt-24 small:justify-center small:pb-20 small:pt-16">
          <p className="nav-brand mb-5 text-[clamp(28px,4vw,42px)] text-[var(--color-text)] kn-fade-up">
            Konduit
          </p>
          <h1 className="mb-5 max-w-[14ch] text-[clamp(34px,4.6vw,54px)] leading-[1.08] kn-fade-up kn-fade-up-delay-1">
            {BRAND.headline}
          </h1>
          <p className="mb-7 max-w-[42ch] text-[16px] leading-relaxed opacity-85 kn-fade-up kn-fade-up-delay-2">
            {BRAND.eyebrow}. Prices shown are indicative. Every order is confirmed
            by quote.
          </p>
          <div className="flex flex-wrap gap-3 kn-fade-up kn-fade-up-delay-3">
            <LocalizedClientLink href="/quote" className="btn btn-primary">
              {BRAND.primaryCta}
            </LocalizedClientLink>
            <LocalizedClientLink href="/store" className="btn btn-secondary">
              {BRAND.secondaryCta}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
