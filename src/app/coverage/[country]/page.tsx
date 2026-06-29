import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/components/seo/metadata";
import { Button } from "@/components/ui/button";
import { countries } from "@/lib/fallbacks/content";
import type { CountryStatus } from "@/lib/sanity/types";

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

const statusLabels: Record<CountryStatus, string> = {
  active: "Active",
  "coming-soon": "Coming soon",
  planned: "Planned",
};

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { country: slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country) return {};

  return buildMetadata({
    title: `Technology Supply in ${country.name} - Konduit`,
    description: `Enterprise hardware and IT infrastructure delivered to ${country.name}.`,
    path: `/coverage/${slug}`,
  });
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Coverage", href: "/coverage" },
          { name: country.name, href: `/coverage/${slug}` },
        ]}
      />
      <Hero
        headline={country.name}
        subCopy={`Status: ${statusLabels[country.status]}. ${country.logisticsNotes}`}
      />

      <section className="section-gap bg-white">
        <div className="container-konduit max-w-3xl">
          {country.cities.length > 0 && (
            <div className="mb-8">
              <h2 className="sub-headline text-gray-800">Key cities served</h2>
              <p className="mt-2 text-gray-600">{country.cities.join(", ")}</p>
            </div>
          )}

          <div className="mb-8">
            <h2 className="sub-headline text-gray-800">Logistics</h2>
            <p className="mt-2 text-gray-600">{country.logisticsNotes}</p>
          </div>

          {country.partnerInfo && (
            <div className="mb-8">
              <h2 className="sub-headline text-gray-800">Local partners</h2>
              <p className="mt-2 text-gray-600">{country.partnerInfo}</p>
            </div>
          )}

          <Button asChild>
            <Link href={`/quote?country=${encodeURIComponent(country.name)}`}>
              Request a quote for delivery to {country.name}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
