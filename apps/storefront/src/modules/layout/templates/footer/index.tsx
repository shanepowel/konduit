import { BRAND, NAV_LINKS } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "var(--color-divider)" }}
    >
      <div className="content-container grid grid-cols-1 gap-8 small:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <span className="nav-brand mb-2.5 block">{BRAND.name}</span>
          <p className="m-0 max-w-[32ch] text-[13.5px] opacity-75">
            {BRAND.tagline}
          </p>
        </div>
        <div>
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.08em] opacity-60">
            Shop
          </p>
          <div className="flex flex-col gap-2 text-[13.5px]">
            {NAV_LINKS.filter((l) => l.href.startsWith("/categories")).map(
              (link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </LocalizedClientLink>
              )
            )}
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.08em] opacity-60">
            Business
          </p>
          <div className="flex flex-col gap-2 text-[13.5px]">
            <LocalizedClientLink
              href="/quote"
              className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
            >
              Request a quote
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/track"
              className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
            >
              Track an order
            </LocalizedClientLink>
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-[11px] uppercase tracking-[0.08em] opacity-60">
            Company
          </p>
          <div className="flex flex-col gap-2 text-[13.5px]">
            <LocalizedClientLink
              href="/about"
              className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
            >
              About Konduit
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="text-[var(--color-text)] no-underline hover:text-[var(--color-accent)]"
            >
              Contact
            </LocalizedClientLink>
          </div>
        </div>
      </div>
      <div className="content-container mt-8 text-[12.5px] opacity-60">
        © {new Date().getFullYear()} Konduit Ltd. Delivered on a promise, not a
        guess.
      </div>
    </footer>
  )
}
