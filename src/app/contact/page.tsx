import { ContactPageClient } from "@/components/pages/contact-page-client";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";

export const metadata = buildMetadata(pageMetadata.contact);

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />
      <Hero headline="Get in touch" subCopy="Email, WhatsApp, or contact form. We respond within 48 hours." />
      <ContactPageClient />
    </>
  );
}
