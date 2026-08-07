import { EMPTY_STATES } from "@lib/constants/brand"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found",
  description: EMPTY_STATES.notFound,
}

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl">Page not found</h1>
      <p className="max-w-md text-sm opacity-75">{EMPTY_STATES.notFound}</p>
      <LocalizedClientLink href="/" className="btn btn-primary">
        Back to store
      </LocalizedClientLink>
    </div>
  )
}
