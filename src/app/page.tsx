import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { CtaSection } from "@/components/hero";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { CoverageMap } from "@/components/coverage-map";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { howItWorksSteps, oemLogos } from "@/lib/fallbacks/content";
import { getProductCategories } from "@/lib/sanity/queries";

export const metadata = buildMetadata(pageMetadata.home);

export default async function HomePage() {
  const categories = await getProductCategories();
  const activeCategories = categories.filter((c) => c.status === "active");

  return (
    <>
      <Hero
        variant="navy"
        headline="Enterprise technology, reliably supplied."
        subCopy="European-sourced hardware and infrastructure for Southern African businesses. Full warranty. Compliance-ready. In-region support."
        primaryCta={{ label: "Request a quote", href: "/quote" }}
        secondaryCta={{ label: "View products", href: "/products" }}
      />
      <TrustBar />

      <section className="section-gap bg-white">
        <div className="container-konduit">
          <h2 className="section-headline text-center">What we supply</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {activeCategories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-400">
            Software licensing, power solutions, and managed services coming soon.
          </p>
        </div>
      </section>

      <section className="section-gap bg-off-white">
        <div className="container-konduit">
          <h2 className="section-headline text-center">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <div key={step.step} className="text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="sub-headline mt-4 text-gray-800">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap bg-white">
        <div className="container-konduit">
          <h2 className="section-headline">Where we deliver</h2>
          <div className="mt-12">
            <CoverageMap />
          </div>
          <p className="mt-6 text-center">
            <Link href="/coverage" className="text-sm font-medium text-blue hover:underline">
              View full coverage details
            </Link>
          </p>
        </div>
      </section>

      <section className="section-gap bg-off-white">
        <div className="container-konduit">
          <h2 className="section-headline text-center">Trusted by</h2>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
            {oemLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-16 items-center justify-center rounded-[var(--card-radius)] border border-gray-200 bg-white text-sm font-semibold text-gray-400"
              >
                {logo}
              </div>
            ))}
          </div>
          <blockquote className="mx-auto mt-12 max-w-2xl border-l-4 border-blue pl-6">
            <p className="text-lg text-gray-600 italic">
              &ldquo;Reliable supply chain and documentation made our donor audit straightforward.
              Konduit delivered exactly what was quoted.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-gray-400">
              IT Director, regional NGO (placeholder)
            </footer>
          </blockquote>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
