"use client";

import { useState } from "react";
import Link from "next/link";
import { countries } from "@/lib/fallbacks/content";
import type { Country, CountryStatus } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const statusColors: Record<CountryStatus, string> = {
  active: "fill-blue/30 stroke-blue",
  "coming-soon": "fill-transparent stroke-blue",
  planned: "fill-transparent stroke-gray-400",
};

interface CoverageMapProps {
  selectedSlug?: string;
  onSelect?: (country: Country) => void;
  compact?: boolean;
}

export function CoverageMap({ selectedSlug, onSelect, compact }: CoverageMapProps) {
  const [selected, setSelected] = useState<Country | null>(
    countries.find((c) => c.slug === selectedSlug) ?? countries[0],
  );

  function handleSelect(country: Country) {
    setSelected(country);
    onSelect?.(country);
  }

  return (
    <div className={cn("grid gap-8", compact ? "grid-cols-1" : "lg:grid-cols-2")}>
      <div className="relative aspect-[4/5] w-full max-w-lg">
        <svg viewBox="0 0 400 500" className="h-full w-full" aria-label="Map of Southern Africa">
          <rect width="400" height="500" fill="#F8FAFC" rx="8" />
          {countries.map((country) => (
            <g key={country.slug}>
              <title>{country.name}</title>
              <path
                d={countryPaths[country.slug]}
                className={cn(
                  "cursor-pointer transition-opacity hover:opacity-80",
                  statusColors[country.status],
                  selected?.slug === country.slug && "stroke-2",
                )}
                strokeWidth="2"
                onClick={() => handleSelect(country)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(country);
                }}
                aria-label={country.name}
              />
            </g>
          ))}
        </svg>
      </div>

      <div>
        <ul className="space-y-3">
          {countries.map((country) => (
            <li key={country.slug}>
              <button
                type="button"
                onClick={() => handleSelect(country)}
                className={cn(
                  "flex w-full items-center justify-between rounded-[var(--card-radius)] border px-4 py-3 text-left transition-colors",
                  selected?.slug === country.slug
                    ? "border-blue bg-blue-light"
                    : "border-gray-200 bg-white hover:border-blue/50",
                )}
              >
                <span className="font-medium text-gray-800">{country.name}</span>
                <StatusDot status={country.status} />
              </button>
            </li>
          ))}
        </ul>

        {selected && !compact && (
          <div className="mt-6 rounded-[var(--card-radius)] border border-gray-200 bg-white p-6">
            <h3 className="sub-headline text-gray-800">{selected.name}</h3>
            <p className="mt-2 text-sm capitalize text-gray-600">
              Status: {selected.status.replace("-", " ")}
            </p>
            {selected.cities.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Key cities: {selected.cities.join(", ")}
              </p>
            )}
            <p className="mt-3 text-sm text-gray-600">{selected.logisticsNotes}</p>
            <Button className="mt-4" asChild>
              <Link href={`/quote?country=${encodeURIComponent(selected.name)}`}>
                Request a quote for delivery to {selected.name}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: CountryStatus }) {
  const labels: Record<CountryStatus, string> = {
    active: "Active",
    "coming-soon": "Coming soon",
    planned: "Planned",
  };
  const colors: Record<CountryStatus, string> = {
    active: "bg-blue",
    "coming-soon": "border-2 border-blue bg-transparent",
    planned: "bg-gray-400",
  };

  return (
    <span className="flex items-center gap-2 text-xs text-gray-600">
      <span className={cn("h-2.5 w-2.5 rounded-full", colors[status])} aria-hidden />
      {labels[status]}
    </span>
  );
}

const countryPaths: Record<string, string> = {
  "south-africa":
    "M120,320 L200,300 L240,340 L220,400 L140,390 Z",
  zimbabwe: "M180,200 L240,190 L250,250 L200,270 Z",
  zambia: "M160,120 L240,110 L250,180 L170,190 Z",
  botswana: "M100,250 L170,240 L180,300 L110,310 Z",
  mozambique: "M250,200 L310,180 L320,350 L260,360 Z",
  namibia: "M60,180 L130,170 L140,280 L70,290 Z",
  malawi: "M270,150 L310,140 L320,200 L280,210 Z",
};
