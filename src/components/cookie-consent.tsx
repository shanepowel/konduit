"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("konduit-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("konduit-cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg",
        "md:inset-x-auto md:right-6 md:bottom-6",
      )}
    >
      <p className="text-sm text-gray-600">
        We use essential cookies and privacy-focused analytics (Plausible) that do not track
        individuals. See our{" "}
        <Link href="/cookies" className="text-blue hover:underline">
          Cookie Policy
        </Link>{" "}
        for details.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={accept}
          className="rounded-[var(--button-radius)] bg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-hover"
        >
          Accept
        </button>
        <Link
          href="/cookies"
          className="rounded-[var(--button-radius)] border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
