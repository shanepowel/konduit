import { BRAND, NAV_LINKS, QUOTE_MAILTO } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="w-full border-t border-konduit-line bg-konduit-paper">
      <div className="content-container flex flex-col py-12">
        <div className="mb-8 flex flex-col justify-between gap-10 small:flex-row small:items-start">
          <div className="max-w-xs">
            <LocalizedClientLink
              href="/"
              className="mb-3 flex items-center gap-2 font-display text-[19px] font-semibold text-konduit-ink"
            >
              <span
                aria-hidden
                className="relative inline-block h-4 w-4 rounded-full border-2 border-konduit-copper"
              >
                <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-konduit-copper" />
              </span>
              {BRAND.name}
            </LocalizedClientLink>
            <p className="text-[13px] leading-relaxed text-konduit-muted">
              {BRAND.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 small:gap-14">
            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-konduit-muted">
                Shop
              </h4>
              <ul className="space-y-2.5 text-[13px] text-konduit-ink">
                {NAV_LINKS.filter((l) => l.href.startsWith("/categories")).map(
                  (link) => (
                    <li key={link.href}>
                      <LocalizedClientLink
                        href={link.href}
                        className="hover:text-konduit-blue-deep"
                      >
                        {link.label}
                      </LocalizedClientLink>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-konduit-muted">
                Business
              </h4>
              <ul className="space-y-2.5 text-[13px] text-konduit-ink">
                <li>
                  <a
                    href={QUOTE_MAILTO}
                    className="hover:text-konduit-blue-deep"
                  >
                    Request a quote
                  </a>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="hover:text-konduit-blue-deep"
                  >
                    Track an order
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-konduit-muted">
                Company
              </h4>
              <ul className="space-y-2.5 text-[13px] text-konduit-ink">
                <li>
                  <a
                    href="mailto:hello@konduit.co.zw"
                    className="hover:text-konduit-blue-deep"
                  >
                    About Konduit
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@konduit.co.zw"
                    className="hover:text-konduit-blue-deep"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-konduit-line pt-5 text-xs text-konduit-muted">
          <span>© {new Date().getFullYear()} Konduit Ltd.</span>
          <span>Delivered on a promise, not a guess.</span>
        </div>
      </div>
    </footer>
  )
}
