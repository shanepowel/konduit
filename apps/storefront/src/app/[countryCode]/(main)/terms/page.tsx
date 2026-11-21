import { Metadata } from "next"

import { COMPANY } from "@lib/constants/company"
import LegalPage from "@modules/legal/templates/legal-page"

export const metadata: Metadata = {
  title: "Terms of Sale",
  description:
    "Indicative pricing, quotes, payment, delivery and warranty terms for Konduit Ltd orders in Zimbabwe and Southern Africa.",
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Sale"
      intro="Working draft for legal review. This is not legal advice. Paynow merchant onboarding typically expects terms of sale to exist on the site."
      lastUpdated={COMPANY.lastUpdated}
      sections={[
        {
          title: "Who we are",
          body: [
            `${COMPANY.legalName}, company registration number ${COMPANY.registrationNumber}, registered at ${COMPANY.registeredAddress}. "We", "us" and "Konduit" refer to Konduit Ltd.`,
          ],
        },
        {
          title: "Indicative pricing",
          body: [
            "Prices shown on this site are indicative and are quoted in US dollars unless stated otherwise. Every order is confirmed by a written quote before it is placed with a supplier. The quote is the binding price, not the website price.",
          ],
        },
        {
          title: "Quotes",
          body: [
            `A quote is valid for ${COMPANY.quoteValidityDays} days from the date issued. Quotes reflect supplier pricing, freight and duty at the time of issue and may be revised if any of those change before acceptance.`,
          ],
        },
        {
          title: "Orders",
          body: [
            "An order is confirmed when you accept a quote in writing and pay the deposit stated on it. We then place the order with the supplier and the delivery timeline stated on the quote begins.",
          ],
        },
        {
          title: "Payment",
          body: [
            `We accept ${COMPANY.paymentMethods}. Deposits are ${COMPANY.depositTerms}. ZWG settlement is available on request and is converted at ${COMPANY.zwgRateNote}.`,
          ],
        },
        {
          title: "Delivery",
          body: [
            "Delivery timelines are estimates based on origin and freight route and are stated per product and per quote. We will tell you promptly if a shipment is delayed at any stage. Delivery is to the address stated on the quote. Risk passes to you on delivery.",
          ],
        },
        {
          title: "Customs and duty",
          body: [
            "For orders quoted DDP (delivered, duties paid) we handle import duty, permits and compliance paperwork and the cost is included in the quote. For orders quoted EXW you are responsible for clearing the goods yourself.",
          ],
        },
        {
          title: "Cancellation",
          body: [
            "Orders can be cancelled without charge until we place them with the supplier. After that, cancellation is subject to the supplier's terms and any freight already committed, which we will confirm to you before proceeding.",
          ],
        },
        {
          title: "Warranty",
          body: [
            "Products carry the manufacturer's warranty as stated on the product page and quote. See our Warranty and Returns page.",
          ],
        },
        {
          title: "Liability",
          body: [
            "Our liability for any order is limited to the value of that order. We are not liable for indirect or consequential loss, including loss of business or data.",
          ],
        },
        {
          title: "Governing law",
          body: [
            "These terms are governed by the laws of Zimbabwe and any dispute is subject to the jurisdiction of the Zimbabwean courts.",
          ],
        },
      ]}
    />
  )
}
