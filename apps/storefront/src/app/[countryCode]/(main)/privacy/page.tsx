import { Metadata } from "next"

import { COMPANY } from "@lib/constants/company"
import LegalPage from "@modules/legal/templates/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Konduit Ltd collects, uses and keeps personal data when you request a quote, create an account or place an order.",
}

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Working draft for legal review. This is not legal advice. Paynow merchant onboarding typically expects a privacy policy to exist on the site."
      lastUpdated={COMPANY.lastUpdated}
      sections={[
        {
          title: "What we collect",
          body: [
            "When you request a quote, create an account or place an order we collect your name, company, email address, phone number, delivery address and the details of what you have asked for. If you pay online, payment is handled by Paynow and we do not see or store your card details.",
          ],
        },
        {
          title: "Why we collect it",
          body: [
            "To price and deliver what you have asked for, to contact you about your quote or order, and to keep records we are legally required to keep.",
          ],
        },
        {
          title: "Where it goes",
          body: [
            "Your details are stored in our order system, our customer records system and our support system, all of which are operated by Konduit. We share your name and delivery address with freight and customs partners only as needed to deliver your order. We do not sell your data or share it for marketing.",
          ],
        },
        {
          title: "WhatsApp",
          body: [
            "If you contact us on WhatsApp, or agree to receive order updates by WhatsApp, those messages are delivered through WhatsApp Business and are subject to WhatsApp's own terms as well as this policy.",
          ],
        },
        {
          title: "How long we keep it",
          body: [
            `Quote and order records are kept for ${COMPANY.recordRetentionYears} years to meet accounting and tax requirements. Account details are kept until you ask us to delete them.`,
          ],
        },
        {
          title: "Your rights",
          body: [
            `Under Zimbabwe's Cyber and Data Protection Act you can ask us what personal data we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Contact ${COMPANY.privacyEmail}.`,
          ],
        },
        {
          title: "Cookies",
          body: [
            "We use cookies only to keep you signed in, remember your currency choice and keep your cart between visits. We do not use advertising cookies.",
          ],
        },
        {
          title: "Changes",
          body: [
            "We will post any changes to this policy here and update the date at the top.",
          ],
        },
      ]}
    />
  )
}
