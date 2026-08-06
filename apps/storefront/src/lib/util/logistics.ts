import {
  LOGISTICS_STAGES,
  type LogisticsStatus,
} from "@lib/constants/brand"

export type TrackStepState = "done" | "current" | "pending"

export type TrackStep = {
  key: string
  stage: string
  desc: string
  state: TrackStepState
  dateLabel?: string | null
}

const STATUS_INDEX: Record<LogisticsStatus, number> = {
  sourced: 0,
  in_transit: 1,
  customs: 2,
  delivered: 3,
}

export function parseLogisticsStatus(
  metadata?: Record<string, unknown> | null
): LogisticsStatus | null {
  const value = metadata?.logistics_status
  if (
    value === "sourced" ||
    value === "in_transit" ||
    value === "customs" ||
    value === "delivered"
  ) {
    return value
  }
  return null
}

export function buildTrackSteps(options: {
  status?: LogisticsStatus | null
  createdAt?: string | Date | null
  expectedLabel?: string | null
}): TrackStep[] {
  const status = options.status ?? "sourced"
  const currentIndex = STATUS_INDEX[status] ?? 0
  const created =
    options.createdAt != null ? new Date(options.createdAt) : null

  return LOGISTICS_STAGES.map((stage, index) => {
    let state: TrackStepState = "pending"
    if (index < currentIndex) state = "done"
    else if (index === currentIndex) state = "current"

    let dateLabel: string | null = null
    if (created && !Number.isNaN(created.getTime()) && index <= currentIndex) {
      const d = new Date(created)
      d.setDate(d.getDate() + index * 6)
      dateLabel = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    } else if (index === LOGISTICS_STAGES.length - 1 && options.expectedLabel) {
      dateLabel = options.expectedLabel
    }

    return {
      key: stage.key,
      stage: stage.stage,
      desc: stage.desc,
      state,
      dateLabel,
    }
  })
}

/** Demo timeline matching the brand HTML (Day 19 of 30, customs current). */
export function buildDemoTrackSteps(): {
  ref: string
  itemLabel: string
  headline: string
  progressLabel: string
  expectedLabel: string
  steps: TrackStep[]
} {
  return {
    ref: "KD-10482",
    itemLabel: "DELL POWEREDGE R740 · QTY 1",
    headline: "On its way to Harare",
    progressLabel: "Day 19 of 30",
    expectedLabel: "Expected 5 Sep 2026",
    steps: [
      {
        key: "sourced",
        stage: "Sourced",
        desc: "Confirmed with supplier and dispatched",
        state: "done",
        dateLabel: "6 Aug 2026",
      },
      {
        key: "in_transit",
        stage: "In transit",
        desc: "Left origin warehouse, en route to Zimbabwe",
        state: "done",
        dateLabel: "8 Aug 2026",
      },
      {
        key: "customs",
        stage: "Customs",
        desc: "Clearing at Beitbridge — usually 2–3 days",
        state: "current",
        dateLabel: "24 Aug 2026",
      },
      {
        key: "delivered",
        stage: "Delivered — Harare",
        desc: "Final delivery to your address",
        state: "pending",
        dateLabel: "Expected 5 Sep 2026",
      },
    ],
  }
}
