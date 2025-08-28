import "./globals.css";
import { Providers } from "./providers";
import ThemeToggle from "./ThemeToggle";

export const metadata = {
  title: "asn.io — authoritative ASN directory",
  description: "Explore ASNs, IP space, ownership, and trends.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 antialiased">
        <Providers>
          <header className="border-b border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-black/30 backdrop-blur">
            <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <img src="/brand/asn-io-logo.svg" alt="asn.io" className="h-8 w-auto hidden dark:block" />
                <img src="/brand/asn-io-logo-mono.svg" alt="asn.io" className="h-8 w-auto block dark:hidden" />
              </a>
              <nav className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-4">
                <a className="hover:text-indigo-600" href="/top/ipv4">Top IPv4</a>
                <a className="hover:text-indigo-600" href="/top/ipv6">Top IPv6</a>
                <a className="hover:text-indigo-600" href="/search">Search</a>
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