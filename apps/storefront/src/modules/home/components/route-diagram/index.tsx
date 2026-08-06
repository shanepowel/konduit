import { ROUTE_NODES } from "@lib/constants/brand"
import { clx } from "@modules/common/components/ui"

type RouteDiagramProps = {
  deliveryDays?: number | null
  className?: string
}

const RouteDiagram = ({ deliveryDays, className }: RouteDiagramProps) => {
  const nodes = ROUTE_NODES.map((node, index) => {
    if (index === ROUTE_NODES.length - 1 && deliveryDays != null) {
      return { ...node, day: `Day ${deliveryDays}` }
    }
    return node
  })

  return (
    <div className={clx("relative pt-8 pb-2 konduit-route-in", className)}>
      <div
        aria-hidden
        className="absolute top-[calc(0.5rem+6px)] left-3 right-3 h-[2px] konduit-route-line"
      />
      <ol className="relative flex justify-between gap-2">
        {nodes.map((node) => (
          <li key={node.place} className="bg-konduit-paper px-2 text-center">
            <span
              className={clx(
                "mx-auto mb-2 block h-3 w-3 rounded-full border-[3px] border-konduit-paper",
                node.pending
                  ? "bg-konduit-raised border-2 border-konduit-line"
                  : "bg-konduit-copper"
              )}
            />
            <div className="font-mono text-[11px] font-medium uppercase tracking-wide text-konduit-ink">
              {node.place}
            </div>
            <div className="mt-0.5 text-[11px] text-konduit-muted">
              {node.day}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default RouteDiagram
