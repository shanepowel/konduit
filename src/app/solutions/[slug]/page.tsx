import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Handshake,
  Layers,
  Receipt,
  Shield,
  Tag,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { CtaSection } from "@/components/hero";
import { Hero } from "@/components/hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/components/seo/metadata";
import { solutions } from "@/lib/fallbacks/content";
import { getProductCategories } from "@/lib/sanity/queries";
import type { SolutionSlug } from "@/lib/sanity/types";

const iconMap: Record<string, LucideIcon> = {
  Clock,
  FileCheck,
  UserCheck,
  Shield,
  Tag,
  Users,
  CreditCard,
  FileText,
  ClipboardCheck,
  Receipt,
  Calendar,
  Handshake,
  Wrench,
  Layers,
};

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return {};

  const personaLabels: Record<SolutionSlug, string> = {
    enterprise: "Enterprise",
    sme: "SME",
    ngo: "NGO and Development",
    government: "Government",
  };

  return buildMetadata({
    title: `Technology Supply for ${personaLabels[solution.slug as SolutionSlug]} - Konduit`,
    description: solution.subCopy,
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const categories = await getProductCategories();
  const related = categories.filter((c) => solution.relatedCategories.includes(c.slug));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: solution.eyebrow, href: `/solutions/${slug}` },
        ]}
      />
      <Hero headline={solution.headline} subCopy={solution.subCopy} />

      <section className="section-gap bg-white">
        <div className="container-konduit max-w-3xl">
          <h2 className="section-headline">What is broken today</h2>
          <ul className="mt-6 space-y-3">
            {solution.painPoints.map((point) => (
              <li key={point} className="flex gap-3 text-gray-600">
                <span className="text-red" aria-hidden>
                  ✕
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-gap bg-off-white">
        <div className="container-konduit">
          <h2 className="section-headline text-center">How we solve it</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {solution.valueProps.map((prop) => {
              const Icon = iconMap[prop.icon] || Shield;
              return (
                <div
                  key={prop.title}
                  className="rounded-[var(--card-radius)] border border-gray-200 bg-white p-6"
                >
                  <Icon className="h-8 w-8 text-blue" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">{prop.title}</h3>
                  <p className="mt-2 text-gray-600">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-gap bg-white">
        <div className="container-konduit">
          <h2 className="section-headline">Relevant products</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/quote" className="text-blue font-medium hover:underline">
              Request a quote for your organisation
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
