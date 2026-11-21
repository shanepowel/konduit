import { DELIVERY_TIMELINE } from "@lib/constants/brand"

const RouteDiagram = () => {
  return (
    <section className="py-14">
      <span className="tag tag-accent mb-3.5">How an order moves</span>
      <h2 className="mb-7 max-w-[26ch] text-[28px]">
        Sourced, shipped and cleared on a schedule we publish before you order.
      </h2>
      <div className="grid grid-cols-1 gap-4 small:grid-cols-4">
        {DELIVERY_TIMELINE.map((step) => (
          <div
            key={step.title}
            className="pl-4"
            style={{
              borderLeft: `3px solid ${
                step.accent === "sage"
                  ? "var(--color-accent-2)"
                  : "var(--color-accent)"
              }`,
            }}
          >
            <p className="mb-1.5 text-xs uppercase tracking-[0.06em] opacity-60">
              {step.day}
            </p>
            <p className="mb-1.5 font-heading text-[19px]">{step.title}</p>
            <p className="m-0 text-[13.5px] opacity-80">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RouteDiagram
