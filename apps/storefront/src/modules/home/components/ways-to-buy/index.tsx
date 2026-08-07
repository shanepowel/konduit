import { WAYS_TO_BUY } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Cable, Radio, Ship } from "lucide-react"
import { ReactNode } from "react"

const PATH_ICONS: Record<string, ReactNode> = {
  Infrastructure: <Cable size={22} strokeWidth={2.75} aria-hidden />,
  Telecoms: <Radio size={22} strokeWidth={2.75} aria-hidden />,
  Imports: <Ship size={22} strokeWidth={2.75} aria-hidden />,
}

const WaysToBuy = () => {
  return (
    <section className="pb-4 pt-14">
      <span className="tag tag-outline mb-3.5">Three procurement paths</span>
      <h2 className="mb-3 max-w-[24ch] text-[30px]">
        Each journey is built for a different buyer.
      </h2>
      <p className="mb-8 max-w-[64ch] text-[15.5px] opacity-80">
        Infrastructure, telecoms and imports move through the same delivery
        promise, but the specification, the compliance work and the people who
        quote them are different.
      </p>
      <div className="grid grid-cols-1 gap-5 small:grid-cols-3">
        {WAYS_TO_BUY.map((card) => (
          <article
            key={card.node}
            id={card.node.toLowerCase()}
            className="card elev-sm gap-3 p-6"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "var(--color-accent-100)" }}
            >
              {PATH_ICONS[card.node]}
            </span>
            <span className="card-kicker">{card.node}</span>
            <h3 className="card-title text-[20px]">{card.title}</h3>
            <p className="card-body text-sm opacity-85">{card.body}</p>
            <LocalizedClientLink
              href={card.href}
              className="btn btn-ghost self-start !pl-0"
            >
              {card.cta}
            </LocalizedClientLink>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WaysToBuy
