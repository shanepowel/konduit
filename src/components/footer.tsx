import Link from "next/link";
import Image from "next/image";
import { DigiteqBadge } from "@/components/digiteq-badge";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  contactEmail,
  footerLinks,
  officeHours,
  ukOfficeAddress,
  whatsappUrl,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-off-white">
      <div className="container-konduit section-gap">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo/konduit-wordmark.svg"
              alt="Konduit"
              width={140}
              height={32}
            />
            <p className="mt-4 text-sm text-gray-600">
              Enterprise technology, reliably supplied across Southern Africa.
            </p>
            <DigiteqBadge className="mt-6" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">Site</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-blue">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">Contact</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-gray-600">
              <p>
                {ukOfficeAddress.line1}
                <br />
                {ukOfficeAddress.line2}
              </p>
              <p>
                <a href={`mailto:${contactEmail}`} className="hover:text-blue">
                  {contactEmail}
                </a>
              </p>
              <p>
                <a href={whatsappUrl()} className="hover:text-blue" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </p>
              <p>{officeHours}</p>
            </address>
            <div className="mt-4">
              <WhatsAppButton size="sm" label="Chat on WhatsApp" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Konduit Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-blue">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-blue">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
