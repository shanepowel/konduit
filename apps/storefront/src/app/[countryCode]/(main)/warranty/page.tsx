import { Metadata } from "next"

import { COMPANY } from "@lib/constants/company"
import LegalPage from "@modules/legal/templates/legal-page"

export const metadata: Metadata = {
  title: "Warranty and Returns",
  description:
    "Manufacturer warranty, damaged-on-arrival claims and return terms for Konduit sourced equipment.",
}

export default function WarrantyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Warranty and Returns"
      intro="Working draft for legal review. This is not legal advice. Warranty terms on your written quote take precedence if they differ from this page."
      lastUpdated={COMPANY.lastUpdated}
      sections={[
        {
          title: "Manufacturer warranty",
          body: [
            "Every product carries the manufacturer's warranty stated on its product page and on your quote. Warranty terms, duration and coverage are the manufacturer's, and we will state them clearly before you order.",
          ],
        },
        {
          title: "Warranty claims",
          body: [
            "If a product develops a fault within its warranty period, contact us with your order reference and a description of the fault. We will raise the claim with the supplier or manufacturer on your behalf and keep you informed. Where the manufacturer offers next-business-day parts or on-site support, we will tell you on the quote.",
          ],
        },
        {
          title: "Damaged on arrival",
          body: [
            `Inspect goods on delivery. Report any damage to us within ${COMPANY.damageReportHours} hours with photographs and we will arrange replacement or repair with the supplier and freight partner.`,
          ],
        },
        {
          title: "Returns",
          body: [
            "Because products are sourced to order from overseas suppliers, we cannot accept returns for change of mind. Faulty or incorrectly supplied goods will be replaced or refunded.",
          ],
        },
        {
          title: "Services",
          body: [
            "Telecoms installation and maintenance work is covered by the terms set out in the specific service quote.",
          ],
        },
      ]}
    />
  )
}
