import Link from "next/link";
import { CoverageMap } from "@/components/coverage-map";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { countries } from "@/lib/fallbacks/content";

export const metadata = buildMetadata(pageMetadata.coverage);

export default function CoveragePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Coverage", href: "/coverage" }]}
      />
      <Hero
        headline="Where we operate"
        subCopy="Enterprise hardware and IT infrastructure delivered across Southern Africa with in-region support."
      />
      <section className="section-gap bg-white">
        <div className="container-konduit">
          <CoverageMap />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <li key={country.slug}>
                <Link
                  href={`/coverage/${country.slug}`}
                  className="block rounded-[var(--card-radius)] border border-gray-200 p-4 transition-colors hover:border-blue"
                >
                  <span className="font-medium text-gray-800">{country.name}</span>
                  <span className="mt-1 block text-sm capitalize text-gray-400">
                    {country.status.replace("-", " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
