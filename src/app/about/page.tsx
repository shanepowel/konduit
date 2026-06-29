import Image from "next/image";
import Link from "next/link";
import { DigiteqBadge } from "@/components/digiteq-badge";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.about);

const values = [
  "We quote what we can deliver.",
  "Warranty is not optional.",
  "If we cannot source it, we say so.",
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <Hero
        headline="About Konduit"
        subCopy="European-sourced enterprise technology for Southern African businesses."
      />

      <section className="section-gap bg-white">
        <div className="container-konduit max-w-3xl">
          <div className="prose-konduit">
            <p>
              Konduit was founded to solve a specific problem: Southern African businesses need
              reliable access to enterprise technology, and existing supply chains are fragmented,
              slow, and inconsistent outside South Africa&apos;s major metros.
            </p>
            <p>
              We operate a UK-based sourcing operation with established OEM and distributor
              relationships across Europe. Every product we supply comes through authorised channels
              with valid manufacturer warranty. We handle logistics, customs documentation, and
              delivery coordination, supported by a growing network of in-region partners for
              installation and ongoing support.
            </p>
            <p>
              Konduit is part of Digiteq Holdings, a digital holding company building and operating
              technology businesses across multiple markets.
            </p>
          </div>
        </div>
      </section>

      <section className="section-gap bg-off-white">
        <div className="container-konduit">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="section-headline">A Digiteq company</h2>
              <p className="mt-4 text-gray-600">
                Digiteq Holdings builds and operates technology businesses. Konduit extends that
                capability into enterprise hardware supply for Southern African markets.
              </p>
              <DigiteqBadge className="mt-6" />
              <Link
                href="https://digiteq.io"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-blue hover:underline"
              >
                Visit digiteq.io
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo/digiteq-mark.svg"
                alt="Digiteq Holdings"
                width={120}
                height={120}
                className="opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap bg-white">
        <div className="container-konduit">
          <h2 className="section-headline">Team</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-[var(--card-radius)] border border-gray-200 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-light text-xl font-bold text-blue">
                K
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">Founder / Managing Director</h3>
              <p className="mt-2 text-sm text-gray-600">
                Leading Konduit&apos;s sourcing operations and partner network development across
                Southern Africa.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-gap bg-navy">
        <div className="container-konduit">
          <h2 className="section-headline text-white">Our principles</h2>
          <ul className="mt-8 space-y-4">
            {values.map((value) => (
              <li key={value} className="text-lg text-gray-400">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
