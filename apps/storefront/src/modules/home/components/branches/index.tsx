import { BRANCHES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Branches = () => {
  return (
    <section
      id="branches"
      className="grid grid-cols-1 items-start gap-5 py-14 small:grid-cols-2 small:gap-12"
    >
      <div>
        <span className="tag tag-outline mb-3.5">Our branches</span>
        <h2 className="mb-4 max-w-[20ch] text-[28px]">
          One customs desk, five markets.
        </h2>
        <p className="m-0 max-w-[52ch] text-[15.5px] opacity-80">
          Konduit sources through supplier networks in the UK, USA and China,
          clears freight in-house, and delivers through branches and hubs across
          Zimbabwe and neighbouring markets. Every order clears through the same
          paperwork discipline, whichever border it crosses.
        </p>
        <LocalizedClientLink
          href="/about#branches"
          className="btn btn-ghost mt-4 !pl-0"
        >
          About Konduit →
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col gap-2.5">
        {BRANCHES.map((branch) => {
          const tagClass =
            branch.tagVariant === "sage"
              ? "tag-accent-2"
              : branch.tagVariant === "neutral"
                ? "tag-neutral"
                : "tag-accent"
          return (
            <div
              key={branch.country}
              className="card flex-row items-center justify-between px-[18px] py-3.5"
            >
              <div>
                <span className="font-heading text-base">{branch.country}</span>
                <p className="m-0 text-[12px] opacity-65">
                  {branch.city}
                  {branch.area ? `, ${branch.area}` : ""}
                </p>
              </div>
              <span className={`tag ${tagClass}`}>{branch.tag}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Branches
