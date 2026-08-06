import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, Unbounded } from "next/font/google"
import "styles/globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Konduit — Order it. It arrives in 30 days.",
    template: "%s | Konduit",
  },
  description:
    "Servers, telecoms infrastructure and devices, and imported goods for Zimbabwe — one account, one delivery promise, tracked door to door.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${unbounded.variable}`}
    >
      <body className={ibmPlexSans.className}>
        <main className="relative min-h-screen bg-konduit-paper text-konduit-ink">
          {props.children}
        </main>
      </body>
    </html>
  )
}
