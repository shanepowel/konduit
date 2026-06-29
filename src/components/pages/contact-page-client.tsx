"use client";

import { useState } from "react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactEmail, officeHours, ukOfficeAddress } from "@/lib/site";

export function ContactPageClient() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-gap bg-white">
      <div className="container-konduit">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            {submitted ? (
              <p className="text-gray-600">Thank you. We will respond within 48 hours.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" name="message" required rows={5} />
                </div>
                {error && <p className="text-sm text-red">{error}</p>}
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>

          <div>
            <h2 className="sub-headline text-gray-800">Contact details</h2>
            <address className="mt-4 space-y-2 text-gray-600 not-italic">
              <p>
                {ukOfficeAddress.line1}
                <br />
                {ukOfficeAddress.line2}
              </p>
              <p>
                <a href={`mailto:${contactEmail}`} className="text-blue hover:underline">
                  {contactEmail}
                </a>
              </p>
              <p>{officeHours}</p>
            </address>
            <div className="mt-8">
              <WhatsAppButton size="lg" label="Chat on WhatsApp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
