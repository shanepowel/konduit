import { EMPTY_STATES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-48"
      data-testid="empty-cart-message"
    >
      <h1 className="text-3xl tracking-tight">Cart</h1>
      <p className="mb-6 mt-4 max-w-[32rem] text-base opacity-80">
        {EMPTY_STATES.cart}
      </p>
      <LocalizedClientLink
        href="/categories/infrastructure"
        className="btn btn-primary"
      >
        Browse the catalogue
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
