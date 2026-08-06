import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Caprasimo, Figtree } from "next/font/google"
import "styles/globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Konduit: Secure the technology your business runs on",
    template: "%s | Konduit",
  },
  description:
    "Servers, telecoms build-out and specified imports, placed through UK, USA and China supplier networks and cleared into Southern Africa.",
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
