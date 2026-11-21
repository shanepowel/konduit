import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowLeft } from "lucide-react"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-[var(--color-bg)] small:min-h-screen">
      <div
        className="h-16 border-b bg-[var(--color-bg)]"
        style={{ borderColor: "var(--color-divider)" }}
      >
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-sm no-underline"
            data-testid="back-to-cart-link"
          >
            <ArrowLeft size={16} strokeWidth={2.75} />
            <span className="mt-px hidden opacity-75 hover:opacity-100 small:block">
              Back to cart
            </span>
            <span className="mt-px block opacity-75 hover:opacity-100 small:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="nav-brand text-lg no-underline"
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
      <div className="flex w-full items-center justify-center py-4 text-xs opacity-60">
        © {new Date().getFullYear()} Konduit Ltd.
      </div>
    </div>
  )
}
