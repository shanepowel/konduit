import { Suspense } from "react";
import { QuoteForm } from "@/components/quote-form";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.quote);

interface QuotePageProps {
  searchParams: Promise<{ category?: string; country?: string }>;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams;

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Request a quote", href: "/quote" }]}
      />
      <Hero
        headline="Request a quote"
        subCopy="Tell us what you need. We will get back to you within 48 hours with a competitive quote."
      />
      <section className="section-gap bg-white">
        <div className="container-konduit max-w-2xl">
          <Suspense fallback={<p className="text-gray-600">Loading form...</p>}>
            <QuoteForm
              defaultCategory={params.category}
              defaultCountry={params.country}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
