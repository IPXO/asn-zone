import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/70 dark:border-white/10 py-6 text-sm text-gray-500">
      <div className="container mx-auto max-w-5xl px-4 flex justify-between items-center">
        <div>© {new Date().getFullYear()} asn.zone</div>
        <nav className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
