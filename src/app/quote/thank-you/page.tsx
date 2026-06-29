import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata({
  title: "Thank you | Konduit",
  description: "We received your quote request and will respond within 48 hours.",
  path: "/quote/thank-you",
});

export default function QuoteThankYouPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Request a quote", href: "/quote" },
          { name: "Thank you", href: "/quote/thank-you" },
        ]}
      />
      <section className="section-gap bg-off-white">
        <div className="container-konduit max-w-2xl text-center">
          <h1 className="section-headline text-gray-800">Thank you</h1>
          <p className="mt-4 text-lg text-gray-600">
            We have received your quote request. We will respond within 48 hours with pricing and
            availability.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <WhatsAppButton label="Contact us on WhatsApp" />
            <Link href="/" className="text-sm font-medium text-blue hover:underline">
              Return to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
