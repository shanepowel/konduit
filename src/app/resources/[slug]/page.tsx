import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { CtaSection } from "@/components/hero";
import { Hero } from "@/components/hero";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/components/seo/metadata";
import { formatDate } from "@/lib/utils";
import { getResourceMarkdown } from "@/lib/resources/markdown";
import { getResourceBySlug, getResources } from "@/lib/sanity/queries";
import type { ResourceType } from "@/lib/sanity/types";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

const typeLabels: Record<ResourceType, string> = {
  guide: "Guide",
  "case-study": "Case study",
  template: "Template",
  news: "News",
};

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};

  return buildMetadata({
    title: `${resource.title} | Konduit`,
    description: resource.summary,
    path: `/resources/${slug}`,
  });
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const [resource, allResources] = await Promise.all([
    getResourceBySlug(slug),
    getResources(),
  ]);

  if (!resource) notFound();

  const markdown = getResourceMarkdown(slug);
  const related = allResources.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
          { name: resource.title, href: `/resources/${slug}` },
        ]}
      />
      <ArticleJsonLd
        title={resource.title}
        description={resource.summary}
        slug={slug}
        publishedAt={resource.publishedAt}
        readTime={resource.readTime}
      />

      <Hero headline={resource.title} subCopy={resource.summary} />

      <section className="section-gap bg-white">
        <div className="container-konduit">
          <div className="grid gap-12 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="eyebrow">{typeLabels[resource.type]}</span>
                <span>{formatDate(resource.publishedAt)}</span>
                <span>{resource.readTime} min read</span>
              </div>
              {markdown ? (
                <div className="prose-konduit">
                  <ReactMarkdown>{markdown.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-600">{resource.summary}</p>
              )}
            </article>

            <aside>
              <div className="rounded-[var(--card-radius)] border border-gray-200 bg-off-white p-6">
                <h3 className="text-sm font-semibold text-gray-800">Need hardware?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Request a quote and we will respond within 48 hours.
                </p>
                <Link
                  href="/quote"
                  className="mt-4 inline-block text-sm font-medium text-blue hover:underline"
                >
                  Request a quote
                </Link>
              </div>

              {related.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-800">Related resources</h3>
                  <ul className="mt-3 space-y-2">
                    {related.map((r) => (
                      <li key={r._id}>
                        <Link
                          href={`/resources/${r.slug}`}
                          className="text-sm text-gray-600 hover:text-blue"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
