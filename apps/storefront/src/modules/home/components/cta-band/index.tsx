import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CtaBand = () => {
  return (
    <section className="pb-16 pt-4">
      <div
        className="flex flex-wrap items-center justify-between gap-8 rounded-[calc(var(--radius-lg)*1.4)] px-6 py-11 small:px-14"
        style={{ background: "var(--color-accent-2-100)" }}
      >
        <div className="max-w-[48ch]">
          <h3 className="mb-2.5 text-2xl">
            Specify what you need. We&apos;ll price it, clear it, and hold the
            date.
          </h3>
          <p className="m-0 text-[14.5px] opacity-85">
            A quote engineer checks live pricing with our UK, USA and China
            suppliers. Line items, delivery site and currency come back priced
            in USD within one business day.
          </p>
        </div>
        <LocalizedClientLink
          href="/quote"
          className="btn btn-primary px-6 py-3 text-[15px]"
        >
          Request a business quote
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default CtaBand
