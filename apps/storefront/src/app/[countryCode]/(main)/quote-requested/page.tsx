import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function QuoteRequestedPage() {
  return (
    <div className="content-container py-24 flex flex-col gap-4 max-w-xl">
      <Heading level="h1" className="text-3xl-regular">
        Quote request received
      </Heading>
      <Text className="text-medium text-ui-fg-subtle">
        Thanks — a draft order was created for our team. We will follow up with
        pricing via email or WhatsApp. No payment was taken.
      </Text>
      <LocalizedClientLink href="/" className="text-ui-fg-interactive underline">
        Back to store
      </LocalizedClientLink>
    </div>
  )
}
