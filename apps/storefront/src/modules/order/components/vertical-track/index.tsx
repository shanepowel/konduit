import { BRAND } from "@lib/constants/brand"
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
    <div className="mb-5 border border-konduit-line bg-konduit-raised p-8 small:p-9">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1.5 font-mono text-xs text-konduit-muted">
            Order #{refLabel}
          </div>
          <div className="mb-1 font-mono text-xs uppercase tracking-wide text-konduit-muted">
            {itemLabel}
          </div>
          <h2 className="font-display text-xl font-semibold text-konduit-ink small:text-[20px]">
            {headline}
          </h2>
        </div>
        <div className="text-left small:text-right">
          <div className="font-display text-[22px] text-konduit-blue-deep">
            {progressLabel}
          </div>
          <div className="text-xs text-konduit-muted">{expectedLabel}</div>
        </div>
      </div>

      <ol className="relative pl-2">
        <div
          aria-hidden
          className="absolute bottom-2 left-[15px] top-2 w-[2px] konduit-route-line-vertical"
        />
        {steps.map((step) => (
          <li
            key={step.key}
            className="relative mb-9 flex gap-5 last:mb-0"
          >
            <span
              className={clx(
                "relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-konduit-raised",
                step.state === "current" &&
                  "border-konduit-blue shadow-[0_0_0_4px_rgba(27,78,140,0.12)]",
                step.state === "done" && "border-konduit-copper",
                step.state === "pending" && "border-konduit-line"
              )}
            >
              <span
                className={clx(
                  "h-2.5 w-2.5 rounded-full",
                  step.state === "current" && "bg-konduit-blue",
                  step.state === "done" && "bg-konduit-copper",
                  step.state === "pending" && "bg-konduit-line"
                )}
              />
            </span>
            <div>
              <div
                className={clx(
                  "mb-0.5 text-[15px] font-semibold",
                  step.state === "current"
                    ? "text-konduit-blue-deep"
                    : "text-konduit-ink"
                )}
              >
                {step.stage}
              </div>
              <div className="mb-1 text-[13px] text-konduit-muted">
                {step.desc}
              </div>
              {step.dateLabel ? (
                <div className="font-mono text-xs text-konduit-muted">
                  {step.dateLabel}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {showWhatsAppNote ? (
        <div className="mt-6 flex gap-2.5 border border-[#CCDCEB] bg-[#EAF0F6] px-5 py-4 text-[13px] text-konduit-blue-deep">
          {BRAND.whatsappNote}
        </div>
      ) : null}
    </div>
  )
}

export default VerticalTrack
