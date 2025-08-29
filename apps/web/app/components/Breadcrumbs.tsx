import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {it.href && !isLast ? (
                <Link className="hover:text-indigo-600" href={it.href}>{it.label}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{it.label}</span>
              )}
              {!isLast && <span className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
