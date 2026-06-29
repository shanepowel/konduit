import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/category-card";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/components/seo/metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteUrl } from "@/lib/site";
import { getProductCategories, getProductCategoryBySlug } from "@/lib/sanity/queries";
import type { ProductAvailability } from "@/lib/sanity/types";

interface ProductCategoryPageProps {
  params: Promise<{ slug: string }>;
}

const availabilityLabels: Record<
  ProductAvailability,
  { label: string; variant: "success" | "warning" | "outline" }
> = {
  "in-stock": { label: "In stock", variant: "success" },
  "to-order": { label: "To order", variant: "warning" },
  "coming-soon": { label: "Coming soon", variant: "outline" },
};

export async function generateStaticParams() {
  const categories = await getProductCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ProductCategoryPageProps) {
  const { slug } = await params;
  const category = await getProductCategoryBySlug(slug);
  if (!category) return {};

  return buildMetadata({
    title: `${category.title} - Konduit`,
    description: `${category.description} Enterprise-grade, manufacturer warranty, delivered to Southern Africa.`,
    path: `/products/${slug}`,
  });
}

export default async function ProductCategoryPage({ params }: ProductCategoryPageProps) {
  const { slug } = await params;
  const [category, allCategories] = await Promise.all([
    getProductCategoryBySlug(slug),
    getProductCategories(),
  ]);

  if (!category) notFound();

  const related = allCategories.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: category.title, href: `/products/${slug}` },
        ]}
      />
      {category.products && category.products.length > 0 && (
        <ItemListJsonLd
          name={category.title}
          items={category.products.map((p) => ({
            name: p.name,
            url: `${siteUrl}/products/${slug}#${p._id}`,
          }))}
        />
      )}

      <Hero headline={category.title} subCopy={category.description} />

      <section className="section-gap bg-white">
        <div className="container-konduit">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="sub-headline text-gray-800">Representative products</h2>
              <p className="mt-2 text-sm text-gray-400">
                A selection of products we supply. Contact us for the full range and current pricing.
              </p>
              <div className="mt-8 space-y-6">
                {category.products?.map((product) => {
                  const avail = availabilityLabels[product.availability];
                  return (
                    <article
                      key={product._id}
                      id={product._id}
                      className="rounded-[var(--card-radius)] border border-gray-200 p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                          <p className="text-sm text-gray-400">{product.manufacturer}</p>
                          {product.partNumber && (
                            <p className="mt-1 font-mono text-sm text-gray-600">
                              {product.partNumber}
                            </p>
                          )}
                        </div>
                        <Badge variant={avail.variant}>{avail.label}</Badge>
                      </div>
                      {product.specs && product.specs.length > 0 && (
                        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                          {product.specs.map((spec) => (
                            <div key={spec.label} className="text-sm">
                              <dt className="text-gray-400">{spec.label}</dt>
                              <dd className="font-medium text-gray-800">{spec.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {product.leadTime && (
                        <p className="mt-3 text-sm text-gray-600">
                          Typical lead time: {product.leadTime}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
              <Button className="mt-8" asChild>
                <Link href={`/quote?category=${encodeURIComponent(category.title)}`}>
                  Request a quote for {category.title.toLowerCase()}
                </Link>
              </Button>
            </div>

            <aside>
              <h3 className="text-sm font-semibold text-gray-800">Related categories</h3>
              <div className="mt-4 space-y-4">
                {related.map((c) => (
                  <CategoryCard key={c._id} category={c} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
