"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container-konduit flex h-16 items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo/konduit-wordmark.svg"
              alt="Konduit"
              width={140}
              height={32}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden sm:inline-flex" asChild>
              <Link href="/quote">Request a Quote</Link>
            </Button>
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-[var(--button-radius)] text-gray-800 lg:hidden",
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
