import { CategoryCard } from "@/components/category-card";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import { getProductCategories } from "@/lib/sanity/queries";

export const metadata = buildMetadata(pageMetadata.products);

export default async function ProductsPage() {
  const categories = await getProductCategories();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }]} />
      <Hero
        headline="Products"
        subCopy="Enterprise-grade hardware and infrastructure from authorised European distributors."
      />
      <section className="section-gap bg-white">
        <div className="container-konduit">
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
