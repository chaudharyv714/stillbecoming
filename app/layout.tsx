import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"

export const metadata: Metadata = {
  title: {
    default: "Still Becoming — A life in progress",
    template: "%s — Still Becoming",
  },
  description: "A personal digital archive and evolving autobiography. Notes, memories, fascinations and things still ahead.",
  applicationName: "Still Becoming",
  openGraph: {
    type: "website",
    title: "Still Becoming — A life in progress",
    description: "A personal digital archive and evolving autobiography.",
    siteName: "Still Becoming",
    images: [{ url: "/images/home-hero.png", width: 1536, height: 1024, alt: "A quiet road through the Western Ghats at sunrise" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Still Becoming — A life in progress",
    description: "A personal digital archive and evolving autobiography.",
    images: ["/images/home-hero.png"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <div id="top" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
