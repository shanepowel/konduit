import Link from "next/link";
import {
  ArrowRight,
  Laptop,
  Network,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductCategory } from "@/lib/sanity/types";

const iconMap: Record<string, LucideIcon> = {
  Laptop,
  Network,
  Server,
};

interface CategoryCardProps {
  category: ProductCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Laptop;

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <Icon className="h-10 w-10 text-blue" aria-hidden />
        <CardTitle className="sub-headline mt-4">{category.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="line-clamp-2 flex-1 text-gray-600">{category.description}</p>
        <Link
          href={`/products/${category.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
        >
          View products
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </CardContent>
    </Card>
  );
}
