// apps/web/app/layout.tsx
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { Providers } from './providers';
import ThemeToggle from './ThemeToggle';

export const metadata = {
  title: 'asn.zone — authoritative ASN directory',
  description: 'Explore ASNs, IP space, ownership, and trends.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/favicon.svg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 antialiased">
        <Providers>
          <header className="border-b border-gray-200/70 bg-white/70 dark:border-white/10 dark:bg-black/30 backdrop-blur">
            <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" prefetch={false}>
                {/* Using next/image ensures basePath (/asn-zone) is prefixed on GitHub Pages */}
                <Image
                  src="/brand/logo.svg"
                  alt="asn.zone"
                  width={112}
                  height={32}
                  priority
                />
              </Link>

              <nav className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-4">
                <Link className="hover:text-indigo-600" href="/top/ipv4" prefetch={false}>Top IPv4</Link>
                <Link className="hover:text-indigo-600" href="/top/ipv6" prefetch={false}>Top IPv6</Link>
                <Link className="hover:text-indigo-600" href="/search" prefetch={false}>Search</Link>
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