import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center space-y-6">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-gray-600 dark:text-gray-400">
        We couldn’t find that page. Try the search or go back home.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/search" className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-white/5">
          Search
        </Link>
        <Link href="/" className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:opacity-90">
          Home
        </Link>
      </div>
    </div>
  );
}
