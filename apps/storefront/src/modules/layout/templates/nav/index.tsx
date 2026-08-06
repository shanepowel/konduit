import { Suspense } from "react"

import { NAV_LINKS } from "@lib/constants/brand"
import { getCurrencyCode } from "@lib/data/cookies"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import CurrencySelect from "@modules/layout/components/currency-select"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale, activeCurrency] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    getCurrencyCode(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="border-b border-konduit-line bg-konduit-paper/95 backdrop-blur-md">
        <nav className="content-container flex h-[68px] items-center justify-between text-sm text-konduit-muted">
          <div className="flex flex-1 items-center gap-4">
            <div className="small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                activeCurrency={activeCurrency}
              />
            </div>
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 font-display text-[19px] font-semibold text-konduit-ink"
              data-testid="nav-store-link"
            >
              <span
                aria-hidden
                className="relative inline-block h-4 w-4 rounded-full border-2 border-konduit-copper"
              >
                <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-konduit-copper" />
              </span>
              Konduit
            </LocalizedClientLink>
          </div>

          <div className="hidden items-center gap-8 small:flex">
            {NAV_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="hover:text-konduit-ink transition-colors"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="hidden small:block">
              <CurrencySelect
                regions={regions}
                activeCurrency={activeCurrency}
              />
            </div>
            <LocalizedClientLink
              className="hidden rounded-soft border border-konduit-line px-4 py-2 font-semibold text-konduit-ink transition-colors hover:border-konduit-ink small:inline-flex"
              href="/account"
              data-testid="nav-account-link"
            >
              Sign in
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="inline-flex rounded-soft bg-konduit-blue px-4 py-2 font-semibold text-white"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
