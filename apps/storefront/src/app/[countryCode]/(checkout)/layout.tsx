import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-konduit-paper small:min-h-screen">
      <div className="h-16 border-b border-konduit-line bg-konduit-paper">
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-sm font-semibold text-konduit-ink"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden text-konduit-muted hover:text-konduit-ink small:block">
              Back to cart
            </span>
            <span className="mt-px block text-konduit-muted hover:text-konduit-ink small:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-display text-lg font-semibold text-konduit-ink"
            data-testid="store-link"
          >
            Konduit
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="flex w-full items-center justify-center py-4 text-xs text-konduit-muted">
        © {new Date().getFullYear()} Konduit Ltd.
      </div>
    </div>
  )
}
