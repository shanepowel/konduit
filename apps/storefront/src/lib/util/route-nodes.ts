import { ROUTE_BASELINE } from "@lib/constants/brand"

export type RouteNode = {
  place: string
  day: string
  pending: boolean
}

function formatDayRange(start: number, end: number): string {
  if (start === end) {
    return `Day ${start}`
  }
  return `Day ${start}–${end}`
}

/** Scale the copper route waypoints to a product's delivery window. */
export function buildRouteNodes(deliveryDays?: number | null): RouteNode[] {
  const days =
    deliveryDays != null && deliveryDays > 0
      ? Math.round(deliveryDays)
      : ROUTE_BASELINE.days
  const scale = days / ROUTE_BASELINE.days

  return ROUTE_BASELINE.nodes.map((node, index) => {
    const start = Math.max(1, Math.round(node.startDay * scale))
    const end = Math.max(start, Math.round(node.endDay * scale))
    const isLast = index === ROUTE_BASELINE.nodes.length - 1
    return {
      place: node.place,
      day: isLast ? `Day ${days}` : formatDayRange(start, end),
      pending: isLast,
    }
  })
}
