import { Metadata } from "next"

import { EMPTY_STATES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Page not found",
  description: EMPTY_STATES.notFound,
}

export default async function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-3xl text-konduit-ink">Page not found</h1>
      <p className="max-w-md text-sm text-konduit-muted">
        {EMPTY_STATES.notFound}
      </p>
      <LocalizedClientLink
        href="/"
        className="text-sm font-semibold text-konduit-blue-deep hover:underline"
      >
        Back to store →
      </LocalizedClientLink>
    </div>
  )
}
