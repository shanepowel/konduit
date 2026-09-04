import { BRAND } from "@lib/constants/brand"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Caprasimo, Figtree } from "next/font/google"
import "styles/globals.css"
import "styles/organic.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caprasimo",
  display: "swap",
})

const siteUrl = getBaseURL()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Konduit: Secure the technology your business runs on",
    template: "%s | Konduit",
  },
  description: BRAND.seoDescription,
  applicationName: "Konduit",
  keywords: [
    "Konduit",
    "Zimbabwe technology procurement",
    "telecoms infrastructure",
    "OEM servers",
    "imports Southern Africa",
    "customs clearance",
  ],
  authors: [{ name: "Konduit" }],
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: siteUrl,
    siteName: "Konduit",
    title: "Konduit: Secure the technology your business runs on",
    description: BRAND.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Konduit: Secure the technology your business runs on",
    description: BRAND.seoDescription,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${figtree.variable} ${caprasimo.variable}`}
    >
      <body className={figtree.className}>
        <main className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
          {props.children}
        </main>
      </body>
    </html>
  )
}
