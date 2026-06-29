import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resource, ResourceType } from "@/lib/sanity/types";

const typeLabels: Record<ResourceType, string> = {
  guide: "Guide",
  "case-study": "Case study",
  template: "Template",
  news: "News",
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <p className="eyebrow">{typeLabels[resource.type]}</p>
        <CardTitle className="mt-2 line-clamp-2">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="line-clamp-2 flex-1 text-sm text-gray-600">{resource.summary}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">{resource.readTime} min read</span>
          <Link
            href={`/resources/${resource.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
          >
            Read
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
