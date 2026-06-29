import { Suspense } from "react";
import { ResourcesPageClient } from "@/components/pages/resources-page-client";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getResources } from "@/lib/sanity/queries";

export const metadata = buildMetadata(pageMetadata.resources);

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }]}
      />
      <Hero
        headline="Resources"
        subCopy="Guides and insights on enterprise technology procurement in Southern Africa."
      />
      <section className="section-gap bg-white">
        <div className="container-konduit">
          <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
            <ResourcesPageClient resources={resources} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
