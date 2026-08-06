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
      <header
        className="border-b bg-[var(--color-bg)]"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <nav className="content-container flex h-[68px] items-center gap-7 text-sm">
          <div className="flex items-center gap-3">
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
              className="nav-brand text-[var(--color-text)] no-underline"
              data-testid="nav-store-link"
            >
              Konduit
            </LocalizedClientLink>
          </div>

          <div className="mr-auto hidden items-center gap-6 small:flex">
            {NAV_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="text-[14px] text-[var(--color-text)] no-underline opacity-85 transition-colors hover:text-[var(--color-accent)]"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden small:block">
              <CurrencySelect
                regions={regions}
                activeCurrency={activeCurrency}
              />
            </div>
            <LocalizedClientLink
              className="hidden text-[14px] text-[var(--color-text)] no-underline small:inline"
              href="/account"
              data-testid="nav-account-link"
            >
              Sign in
            </LocalizedClientLink>
            <LocalizedClientLink href="/quote" className="btn btn-primary">
              Request a quote
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="btn btn-secondary"
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
