import { PartnersPageClient } from "@/components/pages/partners-page-client";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getPartners } from "@/lib/sanity/queries";

export const metadata = buildMetadata(pageMetadata.partners);

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Partners", href: "/partners" }]}
      />
      <Hero
        headline="Our partner network"
        subCopy="We work with local technology companies across Southern Africa to provide installation, configuration, and ongoing support."
      />
      <PartnersPageClient partners={partners} />
    </>
  );
}
