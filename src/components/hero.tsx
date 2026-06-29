import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  headline?: string;
  subCopy?: string;
  className?: string;
}

export function CtaSection({
  headline = "Ready to talk?",
  subCopy = "Tell us what you need. We will get back to you within 48 hours with a quote.",
  className,
}: CtaSectionProps) {
  return (
    <section className={cn("bg-navy section-gap", className)}>
      <div className="container-konduit text-center">
        <h2 className="section-headline text-white">{headline}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">{subCopy}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/quote">Request a quote</Link>
          </Button>
          <WhatsAppButton label="Or reach us on WhatsApp" />
        </div>
      </div>
    </section>
  );
}

interface HeroProps {
  headline: string;
  subCopy: string;
  variant?: "navy" | "light";
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({
  headline,
  subCopy,
  variant = "light",
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const isNavy = variant === "navy";

  return (
    <section className={cn("section-gap", isNavy ? "bg-navy" : "bg-off-white")}>
      <div className="container-konduit">
        {isNavy && (
          <div className="mb-8">
            <Image
              src="/images/logo/konduit-logo-white.svg"
              alt="Konduit"
              width={160}
              height={40}
              priority
            />
          </div>
        )}
        <h1 className={cn("hero-headline max-w-3xl", isNavy ? "text-white" : "text-gray-800")}>
          {headline}
        </h1>
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed",
            isNavy ? "text-gray-400" : "text-gray-600",
          )}
        >
          {subCopy}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {primaryCta && (
              <Button asChild>
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant={isNavy ? "ghost" : "secondary"}
                className={isNavy ? "text-white" : undefined}
                asChild
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
