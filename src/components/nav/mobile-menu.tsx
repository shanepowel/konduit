"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy lg:hidden">
      <div className="flex items-center justify-end p-6">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center text-white"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-6 px-8" aria-label="Mobile">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-xl font-semibold text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-6">
        <Button className="w-full" asChild>
          <Link href="/quote" onClick={onClose}>
            Request a Quote
          </Link>
        </Button>
      </div>
    </div>
  );
}
