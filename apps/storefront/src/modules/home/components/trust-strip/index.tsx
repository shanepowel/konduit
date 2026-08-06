import { TRUST_ITEMS } from "@lib/constants/brand"

const TrustStrip = () => {
  return (
    <section className="border-t border-konduit-line bg-konduit-paper py-14">
      <div className="content-container grid grid-cols-1 gap-10 xsmall:grid-cols-2 small:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title}>
            <div className="font-display text-[22px] text-konduit-blue-deep">
              {item.title}
            </div>
            <p className="mt-1.5 text-[13px] text-konduit-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustStrip
