import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Providers } from "./providers";
import ThemeToggle from "./ThemeToggle";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ipxo.github.io/asn-zone"),
  title: "asn.zone — authoritative ASN directory",
  description: "Explore ASNs, IP space, ownership, and trends.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "asn.zone — authoritative ASN directory",
    description: "Explore ASNs, IP space, ownership, and trends.",
    url: "/",
    siteName: "asn.zone",
    images: ["/brand/logo.svg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "asn.zone — authoritative ASN directory",
    description: "Explore ASNs, IP space, ownership, and trends.",
    images: ["/brand/logo.svg"],
  },
  icons: {
    icon: [
      { url: "favicon.ico", type: "image/x-icon" },
      { url: "favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["favicon.ico"],
    apple: [{ url: "favicon.svg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 antialiased">
        {/* Optional analytics injected when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        <Providers>
          <header className="border-b border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-black/30 backdrop-blur">
            <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="brand/logo.svg"
                  alt="asn.zone"
                  width={120}
                  height={32}
                  priority
                  unoptimized
                />
              </Link>
              <nav className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-4">
                <Link className="hover:text-indigo-600" href="/top/ipv4">Top IPv4</Link>
                <Link className="hover:text-indigo-600" href="/top/ipv6">Top IPv6</Link>
                <Link className="hover:text-indigo-600" href="/search">Search</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="container mx-auto max-w-5xl px-4 py-8">{children}</main>

          <footer className="border-t border-gray-200 dark:border-white/10">
            <div className="container mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
              © IPXO • Data sources: RIR delegated stats, BGP collectors.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
