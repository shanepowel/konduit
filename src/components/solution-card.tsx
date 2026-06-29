import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/lib/sanity/types";

interface SolutionCardProps {
  solution: Pick<Solution, "slug" | "eyebrow" | "headline" | "painPoints">;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[var(--card-radius)] bg-off-white p-8">
      <p className="eyebrow">{solution.eyebrow}</p>
      <h3 className="sub-headline mt-3 text-gray-800">{solution.headline}</h3>
      <ul className="mt-4 flex-1 space-y-2">
        {solution.painPoints.slice(0, 4).map((point) => (
          <li key={point} className="flex gap-2 text-sm text-gray-600">
            <span className="text-blue" aria-hidden>
              •
            </span>
            {point}
          </li>
        ))}
      </ul>
      <Link
        href={`/solutions/${solution.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
      >
        Learn more
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
