import { SolutionCard } from "@/components/solution-card";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { solutions } from "@/lib/fallbacks/content";

export const metadata = buildMetadata(pageMetadata.solutions);

export default function SolutionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }]}
      />
      <Hero
        headline="Solutions for your sector"
        subCopy="However you procure technology, we have the supply chain, documentation, and support to match."
      />
      <section className="section-gap bg-white">
        <div className="container-konduit">
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
