import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { Footer } from "@/components/footer";
import { Header } from "@/components/nav/header";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Konduit - Enterprise Technology Supply for Southern Africa",
    template: "%s",
  },
  description:
    "European-sourced hardware and infrastructure for Southern African businesses. Full warranty, compliance-ready, in-region support.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-white font-sans antialiased`}
      >
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <Analytics />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
