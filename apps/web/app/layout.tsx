import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Providers } from "./providers";
import SeoJsonLd from "./SeoJsonLd";
import ThemeToggle from "./ThemeToggle";
import { JsonLd, siteJsonLd } from "../lib/seo";
import ActiveNav from "./components/ActiveNav";
import { loadGlobal } from "../lib/data";

export const metadata = {
  title: "asn.zone — authoritative ASN directory",
  description: "Explore ASNs, IP space, ownership, and trends.",
  icons: {
    icon: [
      { url: "favicon.ico", type: "image/x-icon" },
      { url: "favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["favicon.ico"],
    apple: [{ url: "favicon.svg" }],
  },
};

function formatPrettyDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await loadGlobal();
  const lastUpdatedISO = new Date(global.generated_at).toISOString();
  const lastUpdatedPretty = formatPrettyDate(global.generated_at);
  const totalAsns = global.stats.asns_total.toLocaleString("en-US");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 antialiased">
        <Providers>
          <JsonLd data={siteJsonLd} />
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

              <nav className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-4"><ActiveNav /><ThemeToggle /></nav>
            </div>
          </header>

          <main className="container mx-auto max-w-5xl px-4 py-8">{children}</main>

          <footer className="border-t border-gray-200 dark:border-white/10">
            <div className="container mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
              <span>© IPXO • Data sources: RIR delegated stats, BGP collectors.</span>
              <Link
                className="px-2 py-1 rounded-md border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-white/10"
                href="/data/current/global.json"
                title={`Last updated: ${lastUpdatedISO}`}
              >
                Download dataset
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {totalAsns} ASNs · {lastUpdatedPretty}
                </span>
              </Link>
            </div>
          </footer>
          <SeoJsonLd />

        </Providers>
      </body>
    </html>
  );
}
