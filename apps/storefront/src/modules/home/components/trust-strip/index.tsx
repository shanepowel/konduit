import { TRUST_STATS } from "@lib/constants/brand"

const TrustStrip = () => {
  return (
    <section
      className="grid grid-cols-1 gap-5 border-y py-8 small:grid-cols-3"
      style={{ borderColor: "var(--color-divider)" }}
    >
      {TRUST_STATS.map((item) => (
        <div key={item.title}>
          <p
            className="m-0 font-heading text-[34px]"
            style={{ color: "var(--color-accent-700)" }}
          >
            {item.title}
          </p>
          <p className="mt-1 text-[13px] opacity-75">{item.body}</p>
        </div>
      ))}
    </section>
  )
}

export default TrustStrip
