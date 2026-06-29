"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const deliveryCountries = [
  "South Africa",
  "Zimbabwe",
  "Zambia",
  "Botswana",
  "Mozambique",
  "Namibia",
  "Malawi",
  "Other",
];

const productCategories = [
  "End-user devices",
  "Networking",
  "Server and storage",
  "Software",
  "Other",
];

const hearAboutOptions = ["Referral", "Search", "Event", "Partner", "Other"];

interface QuoteFormProps {
  defaultCategory?: string;
  defaultCountry?: string;
}

export function QuoteForm({ defaultCategory, defaultCountry }: QuoteFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultCategory ? [defaultCategory] : [],
  );

  const countryDefault =
    defaultCountry || searchParams.get("country") || "South Africa";

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          country: formData.get("country"),
          categories: selectedCategories,
          quantity: formData.get("quantity"),
          details: formData.get("details"),
          source: formData.get("source"),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      router.push("/quote/thank-you");
    } catch {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company name *</Label>
          <Input id="company" name="company" required />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="+27..." />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country of delivery *</Label>
        <select
          id="country"
          name="country"
          required
          defaultValue={countryDefault}
          className="flex h-11 w-full rounded-[var(--button-radius)] border border-gray-200 bg-white px-3 text-sm text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
        >
          {deliveryCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-gray-800">Product category *</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {productCategories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 rounded border-gray-200 text-blue focus:ring-blue"
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="quantity">Estimated quantity</Label>
        <Input id="quantity" name="quantity" placeholder="e.g. 50 laptops, 3 switches" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Additional details</Label>
        <Textarea
          id="details"
          name="details"
          placeholder="Specifications, part numbers, delivery timeline, or other requirements"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">How did you hear about us?</Label>
        <select
          id="source"
          name="source"
          className="flex h-11 w-full rounded-[var(--button-radius)] border border-gray-200 bg-white px-3 text-sm text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
        >
          <option value="">Select...</option>
          {hearAboutOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red">{error}</p>}

      <Button type="submit" disabled={loading || selectedCategories.length === 0}>
        {loading ? "Submitting..." : "Submit quote request"}
      </Button>
    </form>
  );
}
