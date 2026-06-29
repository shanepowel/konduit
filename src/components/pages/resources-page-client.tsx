"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ResourceCard } from "@/components/resource-card";
import type { Resource, ResourceType } from "@/lib/sanity/types";

const filters: { label: string; value: ResourceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Guides", value: "guide" },
  { label: "Case studies", value: "case-study" },
  { label: "Templates", value: "template" },
  { label: "News", value: "news" },
];

interface ResourcesPageClientProps {
  resources: Resource[];
}

export function ResourcesPageClient({ resources }: ResourcesPageClientProps) {
  const searchParams = useSearchParams();
  const active = (searchParams.get("type") as ResourceType | null) || "all";
  const filtered =
    active === "all" ? resources : resources.filter((r) => r.type === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={filter.value === "all" ? "/resources" : `/resources?type=${filter.value}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === filter.value
                ? "bg-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    </>
  );
}
