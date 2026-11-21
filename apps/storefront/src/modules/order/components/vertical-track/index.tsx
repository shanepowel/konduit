import type { TrackStep } from "@lib/util/logistics"
import { clx } from "@modules/common/components/ui"

type VerticalTrackProps = {
  refLabel: string
  itemLabel: string
  headline: string
  progressLabel: string
  expectedLabel: string
  steps: TrackStep[]
  showWhatsAppNote?: boolean
}

const VerticalTrack = ({
  refLabel,
  itemLabel,
  headline,
  progressLabel,
  expectedLabel,
  steps,
  showWhatsAppNote = true,
}: VerticalTrackProps) => {
  return (
    <div className="card elev-sm mb-5 gap-0 p-8 small:p-9">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1.5 text-xs opacity-60">Order #{refLabel}</div>
          <div className="mb-1 text-xs uppercase tracking-wide opacity-60">
            {itemLabel}
          </div>
          <h2 className="text-xl small:text-[20px]">{headline}</h2>
        </div>
        <div className="text-left small:text-right">
          <div
            className="font-heading text-[22px]"
            style={{ color: "var(--color-accent-700)" }}
          >
            {progressLabel}
          </div>
          <div className="text-xs opacity-60">{expectedLabel}</div>
        </div>
      </div>

      <ol className="relative m-0 list-none pl-2">
        <div
          aria-hidden
          className="absolute bottom-2 left-[15px] top-2 w-[2px]"
          style={{ background: "var(--color-divider)" }}
        />
        {steps.map((step) => (
          <li key={step.key} className="relative mb-9 flex gap-5 last:mb-0">
            <span
              className={clx(
                "relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-[var(--color-surface)]",
                step.state === "current" && "border-[var(--color-accent)]",
                step.state === "done" && "border-[var(--color-accent-2)]",
                step.state === "pending" && "border-[var(--color-divider)]"
              )}
            >
              <span
                className={clx(
                  "h-2.5 w-2.5 rounded-full",
                  step.state === "current" && "bg-[var(--color-accent)]",
                  step.state === "done" && "bg-[var(--color-accent-2)]",
                  step.state === "pending" && "bg-[var(--color-divider)]"
                )}
              />
            </span>
            <div>
              <div
                className={clx(
                  "mb-0.5 text-[15px] font-semibold",
                  step.state === "current" && "text-[var(--color-accent-700)]"
                )}
              >
                {step.stage}
              </div>
              <div className="mb-1 text-[13px] opacity-70">{step.desc}</div>
              {step.dateLabel ? (
                <div className="text-xs opacity-60">{step.dateLabel}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {showWhatsAppNote ? (
        <div
          className="mt-6 rounded-[var(--radius)] px-5 py-4 text-[13px]"
          style={{
            background: "var(--color-accent-2-100)",
            color: "var(--color-text)",
          }}
        >
          Need a status update sooner? Message us on WhatsApp: local numbers,
          local hours.
        </div>
      ) : null}
    </div>
  )
}

export default VerticalTrack
