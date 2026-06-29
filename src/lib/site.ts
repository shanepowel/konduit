export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://konduit.tech";
export const siteName = "Konduit";
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@konduit.tech";
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "440000000000";

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Coverage", href: "/coverage" },
  { label: "Partners", href: "/partners" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
] as const;

export const footerLinks = [
  ...navLinks,
  { label: "Contact", href: "/contact" },
] as const;

export const ukOfficeAddress = {
  line1: "Konduit Ltd",
  line2: "London, United Kingdom",
};

export const officeHours = "Monday to Friday, 09:00 to 17:00 (UK time)";

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
