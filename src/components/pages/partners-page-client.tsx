"use client";

import { useState } from "react";
import { PartnerCard } from "@/components/partner-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Partner } from "@/lib/sanity/types";

interface PartnersPageClientProps {
  partners: Partner[];
}

export function PartnersPageClient({ partners }: PartnersPageClientProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          country: formData.get("country"),
          services: formData.get("services"),
          teamSize: formData.get("teamSize"),
          certifications: formData.get("certifications"),
          notes: formData.get("notes"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="section-gap bg-white">
        <div className="container-konduit">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap bg-off-white" id="become-a-partner">
        <div className="container-konduit">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="section-headline">Become a partner</h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">What we look for</h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>Technical capability in networking, endpoints, or infrastructure</li>
                    <li>Geographic coverage in Southern African markets</li>
                    <li>Established customer base and field engineering capacity</li>
                    <li>Relevant vendor certifications (Cisco, Dell, Lenovo, or equivalent)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">What partners get</h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>Qualified deal flow from Konduit quote requests</li>
                    <li>Training and product updates from OEM partners</li>
                    <li>Co-branded marketing materials</li>
                    <li>Volume procurement access through our distributor relationships</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-[var(--card-radius)] border border-gray-200 bg-white p-8">
              {submitted ? (
                <p className="text-gray-600">
                  Thank you for your application. We will review it and respond within 5 business days.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Contact name *</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company name *</Label>
                    <Input id="company" name="company" required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" name="country" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team size *</Label>
                      <Input id="teamSize" name="teamSize" required placeholder="e.g. 12 engineers" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">Services offered *</Label>
                    <Input id="services" name="services" required placeholder="Installation, support, resale" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Input id="certifications" name="certifications" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional notes</Label>
                    <Textarea id="notes" name="notes" />
                  </div>
                  {error && <p className="text-sm text-red">{error}</p>}
                  <Button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit application"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
