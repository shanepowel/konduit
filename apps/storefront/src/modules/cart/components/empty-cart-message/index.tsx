import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-48"
      data-testid="empty-cart-message"
    >
      <h1 className="font-display text-3xl tracking-tight text-konduit-ink">
        Cart
      </h1>
      <p className="mt-4 mb-6 max-w-[32rem] text-base text-konduit-muted">
        Nothing in your cart yet. Browse the catalogue to get started.
      </p>
      <InteractiveLink href="/categories/infrastructure">
        Browse the catalogue
      </InteractiveLink>
    </div>
  )
}

export default EmptyCartMessage
